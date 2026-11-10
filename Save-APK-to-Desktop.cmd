@echo off
setlocal
set "LOCALPAL_APK_PARTS=%~dp0"
echo Rebuilding and verifying LocalPal APK...
powershell.exe -NoProfile -Command "$ErrorActionPreference = 'Stop'; $root = $env:LOCALPAL_APK_PARTS; $desktop = [Environment]::GetFolderPath('Desktop'); if (-not $desktop -or -not (Test-Path -LiteralPath $desktop)) { throw 'Windows Desktop folder was not found.' }; $expected = '9bcff5111bbcb77fde45d8915fd1865ea466421849c3cef19f313c4bc0bc6c7f'; $target = Join-Path $desktop 'LocalPal-phase1-test.apk'; if (Test-Path -LiteralPath $target) { if ((Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant() -eq $expected) { Write-Host ('APK already verified on Desktop: ' + $target); return }; $target = Join-Path $desktop ('LocalPal-phase1-test-' + [Guid]::NewGuid().ToString('N').Substring(0,8) + '.apk') }; $temp = $target + '.' + [Guid]::NewGuid().ToString('N') + '.partial'; $out = $null; try { $out = [IO.File]::Open($temp, [IO.FileMode]::CreateNew, [IO.FileAccess]::Write, [IO.FileShare]::None); foreach ($i in 1..6) { $part = Join-Path $root ('parts/LocalPal.apk.part{0:D2}' -f $i); $inputFile = [IO.File]::OpenRead($part); try { $inputFile.CopyTo($out) } finally { $inputFile.Dispose() } }; $out.Dispose(); $out = $null; if ((Get-Item -LiteralPath $temp).Length -ne 275944815) { throw 'APK size check failed.' }; if ((Get-FileHash -LiteralPath $temp -Algorithm SHA256).Hash.ToLowerInvariant() -ne $expected) { throw 'APK SHA256 check failed. Please download and extract the full ZIP again.' }; [IO.File]::Move($temp, $target); Write-Host ('Saved verified APK to Desktop: ' + $target) -ForegroundColor Green } catch { if ($out) { $out.Dispose() }; if (Test-Path -LiteralPath $temp) { Remove-Item -LiteralPath $temp }; Write-Error $_; exit 1 }"
if errorlevel 1 (
  echo Failed. Please check the message above.
  pause
  exit /b 1
)
echo Done. You can now find the APK on your Desktop.
pause
