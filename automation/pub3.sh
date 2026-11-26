#!/bin/bash
# 2026-11-26: media -> ccr-be4dfb80-ltms6l/media/n26_*.mp4 (har kuni yangi nom: raw CDN eski faylni bermasin)
W=/tmp/claude-0/-home-user-video-yuklash/239cfeb6-e78c-53bb-b2ad-089ca2e5c074/scratchpad/w; P=${PFX:-n26_}
cd /home/user/video-yuklash
for v in "$@"; do case $v in *.jpg|*.mp4) cp $W/$v media/$P$v;; *) cp $W/final_$v.mp4 media/$P$v.mp4;; esac; done
git add media && git commit -qm "media: $*" && for i in 1 2 3 4; do git push -q -u origin ccr-be4dfb80-ltms6l 2>&1 | tail -1 && break; sleep $((i*4)); done
echo pushed
