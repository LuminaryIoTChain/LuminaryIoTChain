#!/usr/bin/env bash
# LuminaryIoTChain MetaRepo — clone service repos into services/
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
ORG="${LUMINARY_IOT_ORG:-LuminaryIoTChain}"

clone_if_missing() {
  local name="$1"
  local dest="$2"
  local url="git@github.com:${ORG}/${name}.git"
  if [ -d "$dest/.git" ]; then
    echo "==> $name already present at $dest"
    return 0
  fi
  if [ -d "$dest" ] && [ "$(ls -A "$dest" 2>/dev/null)" ]; then
    echo "==> $dest exists but is not a git repo; skip clone"
    return 0
  fi
  echo "==> Cloning $url -> $dest"
  git clone "$url" "$dest"
}

mkdir -p "$ROOT/services"

# Phase B: independent repos (until split, directories may already contain monorepo code)
clone_if_missing "iot-gateway" "$ROOT/services/iot-gateway"
clone_if_missing "iot-console-web" "$ROOT/services/iot-console-web"

echo "==> Done. See ONBOARDING.md for dev startup."
