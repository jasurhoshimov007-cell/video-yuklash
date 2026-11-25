#!/bin/bash
cd "$(dirname "$0")";v=$1;R=render2d.js;case $v in t01|t02) R=render.js;; esac
rm -rf $v/sheet;node $R $v sheet 2>&1 | grep -E 'ERR' | head -3
/usr/local/bin/python3.13 -I -c "
from PIL import Image;import glob
fs=sorted(glob.glob('$v/sheet/s*.jpg'));W=150;H=266;cols=10;rows=(len(fs)+cols-1)//cols
im=Image.new('RGB',(cols*W,rows*H))
for i,f in enumerate(fs): im.paste(Image.open(f).resize((W,H)),((i%cols)*W,(i//cols)*H))
im.save('$v/sheet.jpg',quality=80)"
