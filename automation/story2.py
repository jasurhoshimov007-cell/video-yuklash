from PIL import Image,ImageDraw,ImageFont,ImageChops
W,H=1080,1920
im=Image.new('RGB',(W,H));d=ImageDraw.Draw(im)
for y in range(H):
    k=y/H;d.line([(0,y),(W,y)],fill=(int(30+40*k),int(10+10*k),int(70+50*k)))
F=lambda s,w='Black':ImageFont.truetype(f'/usr/share/fonts/opentype/inter/Inter-{w}.otf',s)
def ct(t,y,s,col,w='Black',st=6):
    f=F(s,w);b=d.textbbox((0,0),t,font=f);d.text(((W-(b[2]-b[0]))/2,y),t,font=f,fill=col,stroke_width=st,stroke_fill=(0,0,0))
ct('SIZ QAYSI BIRINI',130,84,'#ffffff');ct('TANLAYSIZ?',230,120,'#ffe14d')
d.rounded_rectangle([90,420,990,560],70,fill='#d6202e');ct('7  RONALDO',448,72,'#ffffff',st=0)
ct('yoki',590,54,'#cfd6ff','Bold',0)
d.rounded_rectangle([90,680,990,820],70,fill='#7ac0ef');ct('10  MESSI',708,72,'#0d2a55',st=0)
ct('Javobni xabar qilib yozing 👇'.replace(' 👇',''),880,44,'#ffffff','Bold',0)
h=Image.open('host.png').convert('RGBA');w=760;hh=int(h.height*w/h.width);h=h.resize((w,hh))
m=Image.new('L',h.size,255);md=ImageDraw.Draw(m)
for y in range(h.height-420,h.height): md.line([(0,y),(w,y)],fill=int(255*(1-(y-(h.height-420))/420)))
h.putalpha(ImageChops.multiply(h.split()[3],m));im.paste(h,((W-w)//2,980),h)
d=ImageDraw.Draw(im)
d.rounded_rectangle([140,1580,940,1700],60,fill='#ffe14d');ct('TELEGRAM: profildagi havola',1612,44,'#111111',st=0)
ct('@jasur.ai_ · bugun 12 ta yangi video',1750,36,'#cfd6ff','Bold',0)
im.save('story2.jpg',quality=92);print('ok')
