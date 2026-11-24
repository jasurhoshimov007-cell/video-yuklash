#!/bin/bash
W=/tmp/claude-0/-home-user-video-yuklash/3cbcac26-e111-5732-ab2e-e2bc7e824128/scratchpad/w
cd /home/user/video-yuklash
for v in "$@"; do ffmpeg -y -loglevel error -i $W/final_$v.mp4 -c:v libx264 -crf 27 -preset veryfast -maxrate 3500k -bufsize 7000k -c:a copy -movflags +faststart media/$v.mp4; done
git add media && git commit -qm "media: $*" && for i in 1 2 3 4; do git push -q -u origin ccr-be4dfb80-ltms6l 2>&1 | tail -1 && break; sleep 5; done
echo pushed
