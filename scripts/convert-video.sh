#!/usr/bin/env bash
# Converts a screen recording into a small, silent, looping web video plus a poster frame.
# Usage: scripts/convert-video.sh "/path/to/Screen Recording.mov" jarvis
#        scripts/convert-video.sh "/path/to/Screen Recording.mov" bygeorge
set -euo pipefail
src="${1:?path to the .mov}"
slug="${2:?slug, e.g. jarvis or bygeorge}"
dir="$(cd "$(dirname "$0")/.." && pwd)/public/case"
ffmpeg -y -i "$src" -an -vf "scale=1600:-2,fps=30" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart "$dir/$slug.mp4"
ffmpeg -y -i "$src" -ss 1 -frames:v 1 -vf "scale=1600:-2" "$dir/$slug.jpg"
ls -la "$dir/$slug.mp4" "$dir/$slug.jpg"
