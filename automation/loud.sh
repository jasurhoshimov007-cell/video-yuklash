#!/bin/bash
# qc "balandlik" FAIL bo'lsa: bir martalik dinamik loudnorm
cd "$(dirname "$0")"; for v in "$@"; do ffmpeg -y -loglevel error -i final_$v.mp4 -c:v copy -af loudnorm=I=-14:TP=-1.2:LRA=14,aresample=44100 -c:a aac -b:a 160k -movflags +faststart tmp_$v.mp4 && mv tmp_$v.mp4 final_$v.mp4; done
