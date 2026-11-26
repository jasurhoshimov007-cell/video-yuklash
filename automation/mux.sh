#!/bin/bash
cd "$(dirname "$0")"; for v in "$@"; do /usr/local/bin/python3.13 -I mix.py $v >/dev/null && ffmpeg -y -loglevel error -i $v/video.mp4 -i $v/mix.m4a -c copy -shortest -movflags +faststart final_$v.mp4 && echo "$v $(ffprobe -v error -show_entries format=duration -of csv=p=0 final_$v.mp4)"; done
