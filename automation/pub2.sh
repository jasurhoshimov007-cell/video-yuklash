#!/bin/bash
cd /home/user/video-yuklash
for v in "$@"; do case $v in *.jpg) cp /tmp/claude-0/-home-user-video-yuklash/fbd96d85-3c3c-5588-8ff5-a2642eb55213/scratchpad/w/$v media/$v;; *) ffmpeg -y -loglevel error -i /tmp/claude-0/-home-user-video-yuklash/fbd96d85-3c3c-5588-8ff5-a2642eb55213/scratchpad/w/final_$v.mp4 -c:v libx264 -crf 23 -preset medium -maxrate 5000k -bufsize 10000k -c:a copy -movflags +faststart media/$v.mp4;; esac; done
git add media && git commit -qm "media: $*" && for i in 1 2 3 4; do git push -q -u origin ccr-be4dfb80-ltms6l 2>&1 | tail -1 && break; sleep 5; done
echo pushed
