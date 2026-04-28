$newsDir = "c:\Users\andre\source\repos\website\src\content\news"

# Adds a sport category to a file's frontmatter.
# Handles 3 cases:
#   1. File has categories: with list items → add sport as first item
#   2. File has categories: with no items → add sport as first item
#   3. File has no categories: → insert categories block after date:
function Add-SportCategory {
  param([string]$Path, [string]$Sport)
  $lines = [System.IO.File]::ReadAllLines($Path)
  $newLines = [System.Collections.Generic.List[string]]::new()
  $inserted = $false

  for ($i = 0; $i -lt $lines.Count; $i++) {
    # Case 1 & 2: existing categories: line
    if (-not $inserted -and $lines[$i] -match '^categories:\s*$') {
      $newLines.Add($lines[$i])
      $newLines.Add("  - `"$Sport`"")
      $inserted = $true
      continue
    }
    # Case 3: no categories: line, insert after date:
    if (-not $inserted -and $lines[$i] -match '^date:\s') {
      $newLines.Add($lines[$i])
      # Skip any existing lines until we find next field or ---
      $j = $i + 1
      # Check if next line is categories: (then case 1/2 will handle it)
      if ($j -lt $lines.Count -and $lines[$j] -match '^categories:') {
        continue  # let the loop handle it
      }
      # Insert new categories block
      $newLines.Add("categories:")
      $newLines.Add("  - `"$Sport`"")
      $inserted = $true
      continue
    }
    $newLines.Add($lines[$i])
  }

  if ($inserted) {
    [System.IO.File]::WriteAllLines($Path, $newLines)
  }
  return $inserted
}

# ── Tennis articles (everything sport-related that isn't admin) ──
$tennisFiles = @(
  "aaaasome-klubbmesterskap.md",
  "as-open-3-juli-og-4-juli.md",
  "as-open-lordag-6-juni.md",
  "asmartn-2017.md",
  "besok-fra-idrettsskolen.md",
  "dagens-kurs-avlyst-pga-vate-baner.md",
  "follo-tour-i-as-lordag-20-juni.md",
  "follo-tour-i-ski-5-7-juni-2015.md",
  "follo-tour-kolbotn-26-28-august.md",
  "invitasjon-til-follo-tour-i-nesodden-21-23-oktober.md",
  "invitasjon-til-follo-tour-i-ski-10-12-juni.md",
  "kampoppsett-tidsplan-og-praktisk-informasjon-klubbmesterskap-i-as-tennisklubb.md",
  "klubbmesterskapet-2015.md",
  "klubbmesterskapet-2018.md",
  "klubbmesterskapet-2019.md",
  "klubbturnering-1-2-juli-2017.md",
  "klubbturnering-flyttet-til-13-14-juni.md",
  "klubbturneringen-2016.md",
  "kurs-start.md",
  "kursavslutning.md",
  "kursene-fortsetter-i-august-oppstart-mandag-31-7.md",
  "kursoppstart-mandag-8-mai.md",
  "lynkurs-i-tennis.md",
  "meld-deg-pa-as-open-2.md",
  "meld-deg-pa-as-open-3.md",
  "meld-deg-pa-as-open-4.md",
  "meld-deg-pa-as-open.md",
  "meld-deg-pa-klubbmesterskap-i-tennis-helgen-13-15-september.md",
  "meld-deg-pa-klubbmesterskap-i-tennis-helgen-15-17-september.md",
  "meld-deg-pa-klubbmesterskap-i-tennis-helgen-3-5-september.md",
  "meld-deg-pa-klubbmesterskap-i-tennis-helgen-5-7-september.md",
  "meld-deg-pa-klubbmesterskap-i-tennis-helgen-9-11-september.md",
  "oppstart-kurs-hosten-2019.md",
  "oppstart-tenniskurs-hosten-2018.md",
  "program-og-kampoppsett-as-open-3-og-4-juli.md",
  "resultater-fra-klubbmesterskap-2020.md",
  "resultater-fra-klubbmesterskapet-2017.md",
  "resultater-fra-klubbmesterskapet-2018.md",
  "resultater-fra-klubbmesterskapet-2019.md",
  "resultater-fra-ribbeturneringen-2020.md",
  "resultater-klubbmesterskapet-2016.md",
  "ribbemesterne-2023.md",
  "ribbeturneringen-2016-2.md",
  "ribbeturneringen-2017.md",
  "ribbeturneringen-2018-2.md",
  "ribbeturneringen-2018.md",
  "ribbeturneringen-2023.md",
  "siste-uke-med-kurs-trening.md",
  "sommerturnering.md",
  "svensk-seier-i-arets-sommerturnering.md",
  "tenniskurs-fortsetter-fra-i-dag-1-august.md",
  "tenniskurs-varen-2022.md",
  "terminliste-2015.md",
  "terminliste-2018.md",
  "vardugnad-2016.md",
  "velkommen-til-a-prove-tennis.md",
  "velkommen-til-barn-og-ungdom-i-lynkurs-i-tennis-2.md",
  "velkommen-til-tenniskurs-for-barn-og-ungdom-i-as.md",
  "velkommen-til-tenniskurs-for-voksne-i-as-hosten-2021.md",
  "verdige-og-flinke-vinnere-i-klubbmesterskapet.md",
  "vi-har-fortsatt-ledige-plasser-pa-kurs.md",
  "viktig-endring-i-timeplan-for-kurs.md",
  "vinnere-av-sommerturneringen-2018.md",
  "vinnere-og-oppsummering-av-as-open-2021.md",
  "vinnerne-av-ribbeturneringen-2017.md",
  "medlemskontigent-2021.md",
  "minner-om-fristen-for-betaling-av-medlemskap-2020-var-8-mai.md"
)

# ── Admin articles: no sport category needed ──
# arsmote*, referat-*, sakspapirer-*, ekstraordinaert-arsmote-*,
# agenda-*, banebooking-*, feiring-*, nytt-kontonummer, nytt-last-ned-yale-*,
# problemer-med-nettsidene, vi-har-fatt-nytt-bookingsystem-*, vipps,
# ordinaert-arsmote-*

Write-Host "Adding 'tennis' to articles without sport category..."
$count = 0
foreach ($f in $tennisFiles) {
  $path = Join-Path $newsDir $f
  if (Test-Path $path) {
    $result = Add-SportCategory -Path $path -Sport "tennis"
    if ($result) {
      $count++
      Write-Host "  + tennis: $f"
    } else {
      Write-Host "  ~ skipped (already has or could not insert): $f"
    }
  } else {
    Write-Host "  ! not found: $f" -ForegroundColor Yellow
  }
}
Write-Host "`nDone. Added tennis to $count articles."
