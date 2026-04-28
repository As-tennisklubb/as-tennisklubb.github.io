$newsDir = "c:\Users\andre\source\repos\website\src\content\news"

# Helper: In YAML frontmatter, replace category value on a specific line
# Only replaces "ukategorisert" when it appears as a list item value
function Replace-Category {
  param($Path, $Old, $New)
  $lines = [System.IO.File]::ReadAllLines($Path)
  $changed = $false
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^\s+-\s+"?ukategorisert"?\s*$') {
      $lines[$i] = "  - `"$New`""
      $changed = $true
    }
  }
  if ($changed) {
    [System.IO.File]::WriteAllLines($Path, $lines)
  }
  return $changed
}

# Helper: Remove ukategorisert list item, and if categories becomes empty, remove categories field too
function Remove-Ukategorisert {
  param($Path)
  $lines = [System.IO.File]::ReadAllLines($Path)
  $newLines = [System.Collections.Generic.List[string]]::new()
  $removed = $false
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^\s+-\s+"?ukategorisert"?\s*$') {
      $removed = $true
      continue
    }
    $newLines.Add($lines[$i])
  }
  if ($removed) {
    # Check if categories: now has no items (next line is --- or another field)
    $result = [System.Collections.Generic.List[string]]::new()
    for ($i = 0; $i -lt $newLines.Count; $i++) {
      if ($newLines[$i] -match '^categories:\s*$') {
        # Check if next line is NOT a list item
        if ($i + 1 -ge $newLines.Count -or $newLines[$i + 1] -notmatch '^\s+-\s+') {
          continue  # skip the empty categories: line
        }
      }
      $result.Add($newLines[$i])
    }
    [System.IO.File]::WriteAllLines($Path, $result)
  }
  return $removed
}

# Step 1: Tennis articles - replace ukategorisert with tennis
$tennisFiles = @(
  "1346-2.md","2023-sesongen-er-i-gang-alle-banene-er-spillbare.md",
  "aaaasome-klubbmesterskap.md",
  "alle-banene-er-na-spilleklare-book-bane-og-kom-dere-ut-og-spill-🎾😀.md",
  "alle-banene-er-na-spilleklare-for-sesongen-2020-husk-a-fornye-ditt-medlemskap.md",
  "as-open-2023-resultater.md","as-open-2024.md","as-open-2025-resultater.md",
  "as-open-3-juli-og-4-juli.md","as-open-lordag-6-juni.md","asmartn-2017.md",
  "banene-er-klare.md","banene-er-spilleklare.md","banereglement-husk-a-slutte-i-tide.md",
  "besok-fra-idrettsskolen.md","dagens-kurs-avlyst-pga-vate-baner.md",
  "drop-in.md","dugnad-1-11-utgar.md","dugnad-2017.md",
  "dugnad-i-dag-torsdag-21-8-kl-17-18.md","dugnad-vinterdvale-for-as-tennis-fra-1-11-kl-09-11.md",
  "follo-tour-i-as-lordag-20-juni.md","follo-tour-i-ski-5-7-juni-2015.md",
  "follo-tour-kolbotn-26-28-august.md","gamlekara-holder-stand.md",
  "har-du-behov-a-strenge-rackerten.md",
  "husk-ved-booking-av-baner-bane-a-og-b-har-kveldslys.md",
  "ingen-tennishall-likevel-da-har-vi-forsokt-og-hva-na.md",
  "invitasjon-til-follo-tour-i-nesodden-21-23-oktober.md",
  "invitasjon-til-follo-tour-i-ski-10-12-juni.md",
  "invitasjon-til-ostfoldkarusellen.md",
  "kampoppsett-tidsplan-og-praktisk-informasjon-klubbmesterskap-i-as-tennisklubb.md",
  "klubbmesterskapet-2015.md","klubbmesterskapet-2017.md","klubbmesterskapet-2018.md",
  "klubbmesterskapet-2019.md","klubbturnering-1-2-juli-2017.md",
  "klubbturnering-flyttet-til-13-14-juni.md","klubbturneringen-2016.md","km-2022.md",
  "kurs-start.md","kurs-utsatt-til-neste-uke-pga-darlig-vaer.md","kursavslutning.md",
  "kursene-fortsetter-i-august-oppstart-mandag-31-7.md","kursoppstart-mandag-8-mai.md",
  "lynkurs-i-tennis.md","meld-deg-pa-as-open-2.md","meld-deg-pa-as-open-3.md",
  "meld-deg-pa-as-open-4.md","meld-deg-pa-as-open.md",
  "meld-deg-pa-klubbmesterskap-i-tennis-helgen-13-15-september.md",
  "meld-deg-pa-klubbmesterskap-i-tennis-helgen-15-17-september.md",
  "meld-deg-pa-klubbmesterskap-i-tennis-helgen-3-5-september.md",
  "meld-deg-pa-klubbmesterskap-i-tennis-helgen-5-7-september.md",
  "meld-deg-pa-klubbmesterskap-i-tennis-helgen-9-11-september.md",
  "meld-deg-pa-klubbmesterskap-i-tennis-lordag-4-og-sondag-5-september.md",
  "oppstart-kurs-hosten-2019.md","oppstart-kurstrening-mandag-2-mai.md",
  "oppstart-pa-lynkurset-blir-flyttet-til-tirsdag-15-juni-pa-grunn-av-regnvaer.md",
  "oppstart-tenniskurs-hosten-2018.md",
  "pa-grunn-av-corona-situasjonen-kan-vi-ikke-lane-ut-klubbens-baller-og-rackerter-www-playersport-no-i-drobak-tilbyr-spesialpriser-pa-rackerter-og-baller-ta-kontakt-med-magnus-holmqvist-mobil-928-94-2.md",
  "program-og-kampoppsett-as-open-3-og-4-juli.md",
  "resultater-fra-klubbmesterskap-2020.md","resultater-fra-klubbmesterskapet-2017.md",
  "resultater-fra-klubbmesterskapet-2018.md","resultater-fra-klubbmesterskapet-2019.md",
  "resultater-fra-klubbmesterskapet-2022.md","resultater-fra-ribbeturneringen-2020.md",
  "resultater-klubbmesterskapet-2016.md","ribbemesterne-2023.md",
  "ribbeturneringen-2016-2.md","ribbeturneringen-2016.md","ribbeturneringen-2017.md",
  "ribbeturneringen-2018-2.md","ribbeturneringen-2018.md","ribbeturneringen-2020.md",
  "ribbeturneringen-2023.md","ribbeturneringen-2026-pameldingsfrist-1-januar.md",
  "sesongstart-2025.md","siste-uke-med-kurs-trening.md",
  "soknad-om-dispensasjon-for-tennishall.md","sommerferie.md","sommerturnering.md",
  "svensk-seier-i-arets-sommerturnering.md","takk-til-dugnadsgjengen-i-dag.md",
  "tennisbarna-spiller-fortsatt.md","tenniskurs-fortsetter-fra-i-dag-1-august.md",
  "tenniskurs-varen-2022.md","terminliste-2015.md","terminliste-2018.md",
  "vannet-er-avstengt-for-sesongen.md","vannet-stenges-for-vinteren.md",
  "vardugnad-2016.md","velkommen-til-a-prove-tennis.md",
  "velkommen-til-barn-og-ungdom-i-lynkurs-i-tennis-2.md",
  "velkommen-til-tenniskurs-for-alle-barn-og-ungdom-i-as.md",
  "velkommen-til-tenniskurs-for-barn-og-ungdom-i-as.md",
  "velkommen-til-tenniskurs-for-voksne-i-as-hosten-2021.md",
  "verdige-og-flinke-vinnere-i-klubbmesterskapet.md",
  "vi-har-fortsatt-ledige-plasser-pa-kurs.md",
  "vi-ma-flytte-siste-okt-pa-lynkurset-fra-mandag-til-torsdag-24-juni.md",
  "viktig-endring-i-timeplan-for-kurs.md","viktig-torsdagskurs-flyttes-til-onsdager.md",
  "vinnere-av-ribbeturneringen-2019.md","vinnere-av-sommerturneringen-2018.md",
  "vinnere-og-oppsummering-av-as-open-2021.md","vinnerne-av-ribbeturneringen-2017.md",
  "den-perfekte-julegave.md","2026-04-11-tennissesongen-2026-er-i-gang.md"
)

$count = 0
foreach ($f in $tennisFiles) {
  $path = Join-Path $newsDir $f
  if (Test-Path $path) {
    if (Replace-Category -Path $path -Old "ukategorisert" -New "tennis") { $count++ }
  }
}
Write-Host "Step 1: $count tennis files updated"

# Step 2: Bordtennis article (already has bordtennis category from original, skip if not ukategorisert)
$btPath = Join-Path $newsDir "onsker-du-a-spille-bordtennis-i-vinter.md"
if (Test-Path $btPath) {
  if (Replace-Category -Path $btPath -Old "ukategorisert" -New "bordtennis") {
    Write-Host "Step 2: bordtennis updated"
  } else {
    Write-Host "Step 2: bordtennis already correct"
  }
}

# Step 3: Tennis + padel article - replace ukategorisert with tennis, then add padel line
$tpFile = Get-ChildItem (Join-Path $newsDir "*korona*padel*") | Select-Object -First 1
if ($tpFile) {
  $lines = [System.IO.File]::ReadAllLines($tpFile.FullName)
  $newLines = [System.Collections.Generic.List[string]]::new()
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^\s+-\s+"?ukategorisert"?\s*$') {
      $newLines.Add('  - "tennis"')
      $newLines.Add('  - "padel"')
    } else {
      $newLines.Add($lines[$i])
    }
  }
  [System.IO.File]::WriteAllLines($tpFile.FullName, $newLines)
  Write-Host "Step 3: tennis+padel updated ($($tpFile.Name))"
} else {
  # File may not have ukategorisert - add categories if missing
  $tpFile = Get-ChildItem (Join-Path $newsDir "*korona*") | Where-Object { $_.Name -match "padel" } | Select-Object -First 1
  if ($tpFile) {
    $lines = [System.IO.File]::ReadAllLines($tpFile.FullName)
    $hasCategories = $lines | Where-Object { $_ -match '^categories:' }
    if (-not $hasCategories) {
      # Insert categories before closing ---
      $newLines = [System.Collections.Generic.List[string]]::new()
      $inFrontmatter = $false
      foreach ($line in $lines) {
        if ($line -eq '---' -and -not $inFrontmatter) { $inFrontmatter = $true; $newLines.Add($line); continue }
        if ($line -eq '---' -and $inFrontmatter) {
          $newLines.Add('categories:')
          $newLines.Add('  - "tennis"')
          $newLines.Add('  - "padel"')
        }
        $newLines.Add($line)
      }
      [System.IO.File]::WriteAllLines($tpFile.FullName, $newLines)
      Write-Host "Step 3: added tennis+padel categories to $($tpFile.Name)"
    }
  }
}

# Step 4: Remove ukategorisert from remaining admin/general articles
$remaining = Get-ChildItem (Join-Path $newsDir "*.md") | Where-Object {
  $c = Get-Content $_.FullName -Raw
  $c -match "ukategorisert"
}
$count2 = 0
foreach ($file in $remaining) {
  if (Remove-Ukategorisert -Path $file.FullName) { $count2++ }
}
Write-Host "Step 4: $count2 admin files cleaned"

# Step 5: Add tennis category to files that are tennis-specific but had NO categories field
$addTennisFiles = @(
  "2026-04-01-banene-er-snart-klare-for-sesongstart.md"
)
foreach ($f in $addTennisFiles) {
  $path = Join-Path $newsDir $f
  if (Test-Path $path) {
    $lines = [System.IO.File]::ReadAllLines($path)
    $hasCategories = $lines | Where-Object { $_ -match '^categories:' }
    if (-not $hasCategories) {
      $newLines = [System.Collections.Generic.List[string]]::new()
      $inFrontmatter = $false
      foreach ($line in $lines) {
        if ($line -eq '---' -and -not $inFrontmatter) { $inFrontmatter = $true; $newLines.Add($line); continue }
        if ($line -eq '---' -and $inFrontmatter) {
          $newLines.Add('categories:')
          $newLines.Add('  - "tennis"')
        }
        $newLines.Add($line)
      }
      [System.IO.File]::WriteAllLines($path, $newLines)
      Write-Host "Step 5: Added tennis to $f"
    }
  }
}

# Verify
$leftover = (Select-String -Path (Join-Path $newsDir "*.md") -Pattern "ukategorisert" -List).Count
Write-Host "Remaining ukategorisert: $leftover"
