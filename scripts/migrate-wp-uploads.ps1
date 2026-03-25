<#
.SYNOPSIS
    Migrates WordPress upload references in markdown files to local files.
.DESCRIPTION
    1. Scans all .md files in src/content/news/ for aastk.no/wp-content/uploads/ URLs
    2. Downloads files that don't already exist in public/uploads/
    3. Replaces WordPress URLs with local /uploads/ paths
    4. Removes redundant [Last ned](...) duplicate links
#>

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path $PSScriptRoot -Parent
$newsDir = Join-Path $repoRoot 'src\content\news'
$uploadsDir = Join-Path $repoRoot 'public\uploads'

if (-not (Test-Path $uploadsDir)) {
    New-Item -ItemType Directory -Path $uploadsDir -Force | Out-Null
}

# Regex to find all WordPress upload URLs in markdown
$urlPattern = 'https?://(?:www\.)?aastk\.no/wp-content/uploads/[^\s\)\]"''<>]+'

# Step 1: Collect all unique URLs from all markdown files
Write-Host "`n=== Step 1: Scanning markdown files for WordPress URLs ===" -ForegroundColor Cyan

$mdFiles = Get-ChildItem -Path $newsDir -Filter '*.md' -Recurse
$allUrls = @{}

foreach ($file in $mdFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $matches = [regex]::Matches($content, $urlPattern)
    foreach ($m in $matches) {
        $url = $m.Value
        if (-not $allUrls.ContainsKey($url)) {
            $allUrls[$url] = @()
        }
        if ($allUrls[$url] -notcontains $file.Name) {
            $allUrls[$url] += $file.Name
        }
    }
}

Write-Host "Found $($allUrls.Count) unique WordPress upload URLs across $($mdFiles.Count) markdown files"

# Step 2: Download files that don't exist locally
Write-Host "`n=== Step 2: Downloading missing files ===" -ForegroundColor Cyan

$downloadResults = @{}
$skipped = 0
$downloaded = 0
$failed = 0

foreach ($url in $allUrls.Keys) {
    # Extract just the filename from the URL (decode URI)
    $uri = [System.Uri]::new($url)
    $rawFilename = $uri.Segments[-1]
    $filename = [System.Uri]::UnescapeDataString($rawFilename)
    
    $localPath = Join-Path $uploadsDir $filename
    $downloadResults[$url] = $filename

    if (Test-Path $localPath) {
        Write-Host "  SKIP (exists): $filename" -ForegroundColor DarkGray
        $skipped++
        continue
    }

    try {
        Write-Host "  DOWNLOAD: $filename" -ForegroundColor Yellow
        Write-Host "    FROM: $url" -ForegroundColor DarkGray
        
        # Use .NET WebClient for better handling of special characters in URLs
        $webClient = New-Object System.Net.WebClient
        $webClient.Encoding = [System.Text.Encoding]::UTF8
        $webClient.DownloadFile($url, $localPath)
        $webClient.Dispose()
        
        $downloaded++
        Write-Host "    OK" -ForegroundColor Green
    }
    catch {
        Write-Host "    FAILED: $($_.Exception.Message)" -ForegroundColor Red
        $failed++
        # Remove entry so we don't update the markdown for failed downloads
        $downloadResults.Remove($url)
    }
}

Write-Host "`nDownload summary: $downloaded downloaded, $skipped already existed, $failed failed"

# Step 3: Update markdown files
Write-Host "`n=== Step 3: Updating markdown links ===" -ForegroundColor Cyan

$filesUpdated = 0

foreach ($file in $mdFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $original = $content
    
    # Replace each WordPress URL with local path
    foreach ($url in $downloadResults.Keys) {
        $filename = $downloadResults[$url]
        $localRef = "/uploads/$filename"
        
        # Escape special regex characters in the URL
        $escapedUrl = [regex]::Escape($url)
        
        $content = $content -replace $escapedUrl, $localRef
    }
    
    # Remove redundant [Last ned](/uploads/...) links that immediately follow another link
    # Pattern: ][Last ned](/uploads/something)  ->  just ]
    $content = $content -replace '\[Last ned\]\(/uploads/[^\)]+\)', ''
    
    if ($content -ne $original) {
        # Use .NET to write with UTF8 no BOM
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
        Write-Host "  UPDATED: $($file.Name)" -ForegroundColor Green
        $filesUpdated++
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "Files scanned:    $($mdFiles.Count)"
Write-Host "Unique URLs:      $($allUrls.Count)"
Write-Host "Downloaded:       $downloaded"
Write-Host "Already existed:  $skipped"
Write-Host "Failed:           $failed"
Write-Host "Files updated:    $filesUpdated"

# Step 4: Verify no WordPress URLs remain
Write-Host "`n=== Step 4: Verification ===" -ForegroundColor Cyan
$remaining = @()
foreach ($file in $mdFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $matches = [regex]::Matches($content, $urlPattern)
    if ($matches.Count -gt 0) {
        foreach ($m in $matches) {
            $remaining += [PSCustomObject]@{
                File = $file.Name
                URL  = $m.Value
            }
        }
    }
}

if ($remaining.Count -eq 0) {
    Write-Host "All WordPress upload URLs have been migrated!" -ForegroundColor Green
}
else {
    Write-Host "$($remaining.Count) WordPress URLs still remain:" -ForegroundColor Yellow
    $remaining | Format-Table -AutoSize
}
