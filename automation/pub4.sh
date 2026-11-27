#!/bin/bash
# 2026-11-27: media -> ccr-be4dfb80-ltms6l/media/${PFX}*.mp4, URL = commit SHA (raw CDN keshi eskirmaydi). Birinchi chaqiruvda CLEAN=1 eski media'ni o'chiradi.
W=${W:?W kerak}; P=${PFX:-n27_}
cd /home/user/video-yuklash
[ "$CLEAN" = 1 ] && git rm -q media/* 2>/dev/null; mkdir -p media
for v in "$@"; do case $v in *.jpg|*.mp4) cp $W/$v media/$P$v;; *) cp $W/final_$v.mp4 media/$P$v.mp4;; esac; done
git add media && git commit -qm "media: $*" && for i in 1 2 3 4; do git push -q -u origin ccr-be4dfb80-ltms6l 2>&1 | tail -1 && break; sleep $((i*4)); done
echo "SHA $(git rev-parse HEAD)"
