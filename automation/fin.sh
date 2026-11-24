#!/bin/bash
v=$1; cd "$(dirname "$0")"
R=render2d.js; case $v in v17|v18|t01|t02) R=render.js;; esac
if [ ! -f $v/video.mp4 ] || [ -f $v/.rendering ]; then :; fi
grep -q " done " r_$v.log 2>/dev/null && touch $v/video.done
while pgrep -f "render2d.js $v full" >/dev/null; do sleep 5; done
grep -q " done " r_$v.log 2>/dev/null && touch $v/video.done
[ -f $v/video.done ] || { node $R $v full > r_$v.log 2>&1 && touch $v/video.done; }
[ -f $v/video.done ] || { echo "$v RENDER FAIL"; exit 1; }
/usr/local/bin/python3.13 -I mix.py $v >> r_$v.log 2>&1
ffmpeg -y -loglevel error -i $v/video.mp4 -i $v/mix.m4a -c copy -shortest -movflags +faststart final_$v.mp4
echo "$v $(ffprobe -v error -show_entries format=duration -of csv=p=0 final_$v.mp4) $(du -m final_$v.mp4|cut -f1)MB"
/usr/local/bin/python3.13 -I hookcheck.py final_$v.mp4
