from PIL import Image,ImageDraw,ImageFont,ImageFilter
import random
W,H=1080,1920
im=Image.new('RGB',(W,H),'#070b24');d=ImageDraw.Draw(im)
for y in range(H):
    k=y/H;d.line([(0,y),(W,y)],fill=(int(10+40*k),int(12+8*k),int(50+60*k)))
random.seed(4)
for _ in range(40):
    x,y=random.randint(0,W),random.randint(0,1100);r=random.randint(2,5);d.ellipse([x-r,y-r,x+r,y+r],fill=(120,200,255))
F=lambda s,w='Black':ImageFont.truetype(f'/usr/share/fonts/opentype/inter/Inter-{w}.otf',s)
def ct(t,y,s,col,w='Black'):
    f=F(s,w);b=d.textbbox((0,0),t,font=f);d.text(((W-(b[2]-b[0]))/2,y),t,font=f,fill=col,stroke_width=6 if s>70 else 0,stroke_fill=(0,0,0))
ct('TELEGRAM',150,120,'#ffffff');ct('KANALIMIZDA',280,120,'#22e4ff')
ct('BUGUN: "OXIRGI POG‘ONA"',470,62,'#ffe14d');ct('horror davomi + A/B so‘rovnoma',560,44,'#cfe3ff','Bold')
h=Image.open('host.png').convert('RGBA');w=900;hh=int(h.height*w/h.width);h=h.resize((w,hh))
m=Image.new('L',h.size,255);md=ImageDraw.Draw(m)
for y in range(h.height-500,h.height):
    md.line([(0,y),(w,y)],fill=int(255*(1-(y-(h.height-500))/500)))
a=h.split()[3];from PIL import ImageChops;h.putalpha(ImageChops.multiply(a,m))
im.paste(h,((W-w)//2,760),h)
d=ImageDraw.Draw(im);d.rounded_rectangle([200,1560,880,1700],70,fill='#ffe14d');ct('Profildagi havola 👆'.replace(' 👆',''),1590,64,'#111111')
d.polygon([(540,1745),(500,1800),(580,1800)],fill='#ffe14d')
im.save('story.jpg',quality=92);print(im.size)
