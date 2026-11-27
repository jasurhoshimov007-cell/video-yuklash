#!/bin/bash
v=$1; cd "$(dirname "$0")"; R=${2:-render.js}
rm -f $v/video.done; node $R $v full > r_$v.log 2>&1 && touch $v/video.done
[ -f $v/video.done ] || { echo "$v RENDER FAIL"; exit 1; }
/usr/local/bin/python3.13 -I mix.py $v >> r_$v.log 2>&1
ffmpeg -y -loglevel error -i $v/video.mp4 -i $v/mix.m4a -c copy -shortest -movflags +faststart final_$v.mp4
echo "$v $(ffprobe -v error -show_entries format=duration -of csv=p=0 final_$v.mp4) $(du -m final_$v.mp4|cut -f1)MB" >> done.log
# 2026-11-27: LUFS -16..-17 3 kun ketma-ket qc FAIL -> mux'dan keyin avtomatik tekshiruv va dinamik loudnorm (loud.sh)
L=$(ffmpeg -i final_$v.mp4 -af ebur128 -f null - 2>&1 | grep -A2 "Integrated" | grep -oE "I: +\-?[0-9.]+" | grep -oE "\-?[0-9.]+" | tail -1)
python3 -c "import sys;sys.exit(0 if float('${L:--99}')< -15.3 else 1)" && bash loud.sh $v && echo "$v loudnorm ($L LUFS -> -14)" >> done.log
