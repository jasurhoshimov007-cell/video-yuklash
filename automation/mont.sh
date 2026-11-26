#!/bin/bash
v=$1;/usr/local/bin/python3.13 -I -c "
from PIL import Image;import glob
fs=sorted(glob.glob('$v/sheet/s*.jpg'));W=180;H=320;cols=8;rows=(len(fs)+cols-1)//cols
im=Image.new('RGB',(cols*W,rows*H))
for i,f in enumerate(fs): im.paste(Image.open(f).resize((W,H)),((i%cols)*W,(i//cols)*H))
im.save('$v/sheet.jpg',quality=80)"
