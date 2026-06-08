# LuminaryIoTChain MetaRepo — clone service repos into services/
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Org = if ($env:LUMINARY_IOT_ORG) { $env:LUMINARY_IOT_ORG } else { "LuminaryIoTChain" }

function Clone-IfMissing {
    param([string]$Name, [string]$Dest)
    $Url = "git@github.com:${Org}/${Name}.git"
    if (Test-Path (Join-Path $Dest ".git")) {
        Write-Host "==> $Name already present at $Dest"
        return
    }
    if ((Test-Path $Dest) -and (Get-ChildItem $Dest -ErrorAction SilentlyContinue)) {
        Write-Host "==> $Dest exists but is not a git repo; skip clone (monorepo layout)"
        return
    }
    Write-Host "==> Cloning $Url -> $Dest"
    git clone $Url $Dest
}

$Services = Join-Path $Root "services"
New-Item -ItemType Directory -Force -Path $Services | Out-Null

Clone-IfMissing "iot-gateway" (Join-Path $Services "iot-gateway")
Clone-IfMissing "iot-console-web" (Join-Path $Services "iot-console-web")

Write-Host "==> Done. See ONBOARDING.md for dev startup."
