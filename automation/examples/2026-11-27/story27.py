from PIL import Image,ImageDraw,ImageFont,ImageChops
W,H=1080,1920
def base(c1,c2):
    im=Image.new('RGB',(W,H));d=ImageDraw.Draw(im)
    for y in range(H):
        k=y/H;d.line([(0,y),(W,y)],fill=tuple(int(a+(b-a)*k) for a,b in zip(c1,c2)))
    return im,d
F=lambda s,w='Black':ImageFont.truetype(f'/usr/share/fonts/opentype/inter/Inter-{w}.otf',s)
def ct(d,t,y,s,col,w='Black',st=6,x=None):
    f=F(s,w);b=d.textbbox((0,0),t,font=f);d.text((((W-(b[2]-b[0]))/2) if x is None else x,y),t,font=f,fill=col,stroke_width=st,stroke_fill=(0,0,0))
def host(im,w,y,fade=420):
    h=Image.open('host.png').convert('RGBA');hh=int(h.height*w/h.width);h=h.resize((w,hh))
    m=Image.new('L',h.size,255);md=ImageDraw.Draw(m)
    for yy in range(h.height-fade,h.height): md.line([(0,yy),(w,yy)],fill=int(255*(1-(yy-(h.height-fade))/fade)))
    h.putalpha(ImageChops.multiply(h.split()[3],m));im.paste(h,((W-w)//2,y),h)
# 1) story karta: TO'Y yoki UY
im,d=base((60,10,60),(20,40,90))
ct(d,'1 MILLIARD SO‘M:',120,80,'#ffffff');ct(d,'SIZ NIMANI TANLAYSIZ?',230,70,'#ffe14d')
d.rounded_rectangle([90,400,990,540],70,fill='#c8366b');ct(d,'💍  DABDABALI TO‘Y'.replace('💍  ',''),428,70,'#ffffff',st=0)
ct(d,'yoki',575,54,'#cfd6ff','Bold',0)
d.rounded_rectangle([90,660,990,800],70,fill='#6ab05a');ct(d,'O‘Z UYINGIZ',688,70,'#ffffff',st=0)
ct(d,'Natija Telegram kanalimizda!',860,48,'#ffffff','Bold',0)
host(im,740,960)
d=ImageDraw.Draw(im);d.rounded_rectangle([140,1580,940,1700],60,fill='#ffe14d');ct(d,'TELEGRAM: profildagi havola',1612,44,'#111111',st=0)
ct(d,'@jasur.ai_ · bugun 12 ta yangi video',1750,36,'#cfd6ff','Bold',0)
im.save('story_card.jpg',quality=92)
# 2) juma dayjesti rasmi
im,d=base((8,12,40),(30,16,70))
import random;random.seed(7)
for _ in range(60):
    x,y=random.randint(0,W),random.randint(0,H);r=random.randint(1,4);d.ellipse([x-r,y-r,x+r,y+r],fill=(120,200,255))
ct(d,'HAFTA DAYJESTI',110,104,'#22e4ff');ct(d,'5 ta eng muhim AI yangiligi',245,50,'#ffffff','Bold',0)
items=['🛰 SpaceX: 1 mln AI yo‘ldoshga ruxsat','⚙️ Claude API Rust’da: CPU −70%','🧸 Nyu-York: AI chatbot o‘yinchoqlar taqiqi','🗣 Amodei: AI jamiyatni boshqarmasin','💳 OpenAI: GPT-6.2 limit xatosi tuzatildi']
for i,t in enumerate(items):
    y=360+i*130;d.rounded_rectangle([70,y,1010,y+106],40,fill='#1a1f4a',outline='#a855ff',width=4)
    d.text((110,y+30),f'{i+1}',font=F(46),fill='#ffe14d');d.text((170,y+33),t[2:].strip(),font=F(38,'Bold'),fill='#ffffff')
host(im,700,1030,380)
d=ImageDraw.Draw(im);d.rounded_rectangle([180,1700,900,1810],55,fill='#ffe14d');ct(d,'@aicreator_n1',1726,50,'#111111',st=0)
im.save('digest.jpg',quality=92);print('ok')
