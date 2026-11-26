#!/bin/bash
v=$1; cd "$(dirname "$0")"; R=${2:-render.js}
rm -f $v/video.done; node $R $v full > r_$v.log 2>&1 && touch $v/video.done
[ -f $v/video.done ] || { echo "$v RENDER FAIL"; exit 1; }
/usr/local/bin/python3.13 -I mix.py $v >> r_$v.log 2>&1
ffmpeg -y -loglevel error -i $v/video.mp4 -i $v/mix.m4a -c copy -shortest -movflags +faststart final_$v.mp4
echo "$v $(ffprobe -v error -show_entries format=duration -of csv=p=0 final_$v.mp4) $(du -m final_$v.mp4|cut -f1)MB" >> done.log
