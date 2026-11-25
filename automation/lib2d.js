// ===== 2D flat-vector horror/story engine (canvas 2D) =====
// Koordinatalar 720x1280 fazoda; canvas 1080x1920 (scale 1.5). Kamera: zoom + siljish.
const W2=720,H2=1280,PI=Math.PI,sin=Math.sin,cos=Math.cos;
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),lerp=(a,b,u)=>a+(b-a)*u,ease=u=>u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2,ramp=(u,a,b)=>clamp((u-a)/(b-a),0,1);
function hash(n){const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s)}
function noise1(t){const i=Math.floor(t),f=t-i,u=f*f*(3-2*f);return lerp(hash(i),hash(i+1),u)*2-1}
let cv,ctx,SHOTS=[],SUBS=[],SFX=[],DUR=0,TIMING=null,KW=new Set(),OPT={},grainC=null;
function boot2d(opt){OPT=opt||{};cv=document.getElementById('c');ctx=cv.getContext('2d')}

// ---------- primitives ----------
function ell(x,y,rx,ry,fill,rot=0){ctx.beginPath();ctx.ellipse(x,y,Math.max(.01,rx),Math.max(.01,ry),rot,0,7);ctx.fillStyle=fill;ctx.fill()}
function rrect(x,y,w,h,r,fill){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill()}
function limb(x1,y1,x2,y2,w,col){ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()}
function poly(pts,fill){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fillStyle=fill;ctx.fill()}
function lgrad(x0,y0,x1,y1,stops){const g=ctx.createLinearGradient(x0,y0,x1,y1);stops.forEach(([o,c])=>g.addColorStop(o,c));return g}
function rgrad(x,y,r0,r1,stops){const g=ctx.createRadialGradient(x,y,r0,x,y,r1);stops.forEach(([o,c])=>g.addColorStop(o,c));return g}
function txt(t,x,y,size,col='#fff',stroke=0,align='center',weight=900){ctx.font=`${weight} ${size}px Inter`;ctx.textAlign=align;ctx.textBaseline='middle';ctx.lineJoin='round';if(stroke){ctx.strokeStyle='#000';ctx.lineWidth=stroke;ctx.strokeText(t,x,y)}ctx.fillStyle=col;ctx.fillText(t,x,y)}
function wrap(text,maxW,font){ctx.font=font;const w=text.split(' '),L=[];let c='';w.forEach(x=>{const n=c?c+' '+x:x;if(ctx.measureText(n).width>maxW&&c){L.push(c);c=x}else c=n});if(c)L.push(c);return L}
function glow(x,y,r,col,a=.5){ctx.save();ctx.globalAlpha=a;ctx.fillStyle=rgrad(x,y,0,r,[[0,col],[1,'rgba(0,0,0,0)']]);ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore()}

// ---------- hikoyachi qahramon (original, flat vector) ----------
const PAL={skin:'#e6b08a',skinS:'#c68c68',hair:'#15100d',hood:'#1b1e2b',hoodL:'#2b3042',cy:'#22e4ff',jeans:'#262e4d',shoe:'#e9e9f0',beard:'rgba(46,30,24,.55)',eyeC:'#3a2316',lip:'#a5503f'};
const SPAL={skin:'#0a0a10',skinS:'#050508',hair:'#040406',hood:'#07070b',hoodL:'#0e0e15',cy:'#ff2a3a',jeans:'#05050a',shoe:'#050507',beard:'rgba(0,0,0,0)',eyeC:'#ff2a3a',lip:'#000'};
function armPts(sx,sy,a1,a2,mir,l1=62,l2=58){const x1=sx+mir*Math.sin(a1)*l1,y1=sy+Math.cos(a1)*l1;return[x1,y1,x1+mir*Math.sin(a2)*l2,y1+Math.cos(a2)*l2]}
// p: {x,y,s,flip,t,upper,shadow,eye,look,brow,mouth,mshape,tilt,hx,hy,aL,aR,glow,prop,sweat}
function drawHost(p){
 const P=p.shadow?SPAL:Object.assign({},PAL,p.pal||(p.look&&typeof p.look==='object'?p.look:{})),s=p.s||1,t=p.t||0,br=Math.sin(t*2.2)*1.6;
 ctx.save();ctx.translate(p.x,p.y);ctx.scale(p.flip?-s:s,s);
 if(!p.upper){rrect(-42,-6,36,150,15,P.jeans);rrect(6,-6,36,150,15,P.jeans);rrect(-50,126,48,26,13,P.shoe);rrect(2,126,48,26,13,P.shoe)}
 ell(0,-150+br,66,30,P.hoodL);
 rrect(-58,-152+br,116,162,36,P.hood);
 if(!p.shadow){ // neon chiziqlar
  ctx.save();ctx.strokeStyle=P.cy;ctx.lineWidth=2.4;ctx.shadowColor=P.cy;ctx.shadowBlur=8;ctx.globalAlpha=.9;
  [[-40,-112,-40,-72,-24,-54,-24,-22],[40,-112,40,-72,24,-54,24,-22],[-30,-90,-12,-90,-12,-62]].forEach(a=>{ctx.beginPath();ctx.moveTo(a[0],a[1]+br);for(let i=2;i<a.length;i+=2)ctx.lineTo(a[i],a[i+1]+br);ctx.stroke()});
  ctx.fillStyle=P.cy;[[-24,-22],[24,-22],[-12,-62]].forEach(a=>{ctx.beginPath();ctx.arc(a[0],a[1]+br,3.2,0,7);ctx.fill()});ctx.restore();
  limb(-10,-140+br,-12,-98+br,3,'#d8dcec');limb(10,-140+br,12,-94+br,3,'#d8dcec');ell(-12,-96+br,3.4,3.4,'#d8dcec');ell(12,-92+br,3.4,3.4,'#d8dcec');
 }
 const arm=(sx,mir,a)=>{const[x1,y1,x2,y2]=armPts(sx,-134+br,a[0],a[1],mir);limb(sx,-134+br,x1,y1,27,P.hood);limb(x1,y1,x2,y2,24,P.hood);ell(x2,y2,12.5,12.5,P.skin);return[x2,y2]};
 const hl=arm(-52,-1,p.aL||[.14,.08]),hr=arm(52,1,p.aR||[.14,.08]);
 if(p.prop)p.prop(hl,hr);
 // bosh
 ctx.save();ctx.translate(p.hx||0,-150+br+(p.hy||0));ctx.rotate(p.tilt||0);
 rrect(-15,-14,30,28,9,P.skinS);ctx.translate(0,-64);
 if(p.longHair)rrect(-58,-32,116,150,46,P.hair);
 ell(-50,6,9,13,P.skin);ell(50,6,9,13,P.skin);ell(0,0,50,58,P.skin);
 // quloqchin
 if(p.headset&&!p.shadow){ctx.save();ctx.translate(-56,6);limb(0,0,4,22,3,P.cy);limb(4,22,22,36,3,P.cy);ell(25,37,6,4.5,P.cy);ctx.restore()}
 // soch
 ctx.beginPath();ctx.moveTo(-54,2);ctx.bezierCurveTo(-60,-40,-34,-74,4,-68);ctx.bezierCurveTo(30,-76,56,-52,54,2);ctx.bezierCurveTo(48,-10,44,-26,34,-32);ctx.bezierCurveTo(14,-22,-18,-40,-38,-24);ctx.bezierCurveTo(-46,-20,-50,-10,-54,2);ctx.closePath();ctx.fillStyle=P.hair;ctx.fill();
 (p.scarf||p.longHair?[]:[[-26,-66,-34,-82,-14,-70],[-4,-70,-6,-88,10,-72],[16,-70,26,-86,32,-66],[34,-60,52,-72,48,-48]]).forEach(a=>{ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(a[2],a[3]);ctx.lineTo(a[4],a[5]);ctx.fillStyle=P.hair;ctx.fill()});
 if(p.scarf){ctx.fillStyle=p.scarf;ctx.beginPath();ctx.ellipse(0,-10,60,58,0,PI,0);ctx.fill();rrect(-62,-14,18,100,9,p.scarf);rrect(44,-14,18,100,9,p.scarf);ctx.beginPath();ctx.ellipse(0,-6,44,38,0,PI+.35,-.35);ctx.fillStyle=p.scarf;ctx.fill()}
 if(p.crown){poly([[-31,-56],[-35,-100],[-17,-78],[0,-106],[17,-78],[35,-100],[31,-56]],'#ffc933');rrect(-32,-66,64,11,4,'#e8a512');ell(0,-86,4.6,4.6,'#ff3b5c');ell(-21,-76,3.4,3.4,'#3bd1ff');ell(21,-76,3.4,3.4,'#3bd1ff')}
 // koz
 const blink=((t+1.3)%3.7)<.11,st=p.eye||'open',look=(typeof p.look==='number'&&isFinite(p.look))?p.look:0;
 [-21,21].forEach((ex,i)=>{
  let ry=13,rx=12;if(st==='wide'){ry=17;rx=13.5}if(st==='squint')ry=6;if(blink||st==='closed')ry=1.6;
  if(p.shadow){ctx.save();ctx.shadowColor='#ff2a3a';ctx.shadowBlur=18;ell(ex,-6,rx*.95,Math.max(2,ry*.55),'#ff3040');ctx.restore()}
  else{ell(ex,-6,rx,ry,'#f6f6f8');if(ry>3){const pr=st==='wide'?5:6.4;ell(ex+look*5,-6,pr,Math.min(ry-1,pr+1),P.eyeC);ell(ex+look*5+2,-8,1.9,1.9,'#fff')}
   ctx.strokeStyle=P.hair;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(ex,-6,rx,ry,0,PI,0);ctx.stroke()}
  // qosh: b>0 tashvish (ichki uchi baland), b<0 jahl
  const bb=p.brow||0,side=i?1:-1,raise=(st==='wide'?8:0);
  ctx.strokeStyle=P.hair;ctx.lineWidth=6;ctx.lineCap='round';ctx.beginPath();
  ctx.moveTo(ex-side*11,-31-raise-9*bb);ctx.lineTo(ex+side*14,-30-raise+4*bb);ctx.stroke();
 });
 // burun
 if(!p.shadow){ctx.strokeStyle=P.skinS;ctx.lineWidth=3.2;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-3,0);ctx.quadraticCurveTo(-7,14,0,16);ctx.stroke()}
 // og'iz
 const m=clamp(p.mouth||0,0,1);
 if(p.shadow){ctx.beginPath();ctx.moveTo(-26,26);ctx.quadraticCurveTo(0,58,26,26);ctx.quadraticCurveTo(0,38,-26,26);ctx.fillStyle='#f2f2f6';ctx.fill()}
 else if(m>.07){ell(0,32,13+5*m,3+13*m,'#3b0f15');if(m>.35)ell(0,26+m*2,9,3,'#f4f4f6');ell(0,40+m*3,7,3+3*m,'#c4505a')}
 else{ctx.strokeStyle=P.lip;ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();const ms=p.mshape||'neutral';
  if(ms==='smile'){ctx.moveTo(-15,28);ctx.quadraticCurveTo(0,42,15,28)}else if(ms==='frown'){ctx.moveTo(-14,38);ctx.quadraticCurveTo(0,28,14,38)}else{ctx.moveTo(-12,33);ctx.lineTo(12,33)}ctx.stroke()}
 // ter
 if(p.sweat){const d=(t*1.4)%1;ell(-44,-14+d*38,4,6.5,'rgba(170,220,255,.85)')}
 // yorug'lik (telefon nuri)
 if(p.glow){ctx.save();ctx.beginPath();ctx.ellipse(0,0,50,58,0,0,7);ctx.clip();ctx.fillStyle=rgrad(26,34,0,90,[[0,`rgba(150,225,255,${.45*p.glow})`],[1,'rgba(150,225,255,0)']]);ctx.fillRect(-60,-60,120,130);ctx.restore()}
 ctx.restore();ctx.restore();
}
function phoneProp(sc=1,ang=.35,screen='#cfeeff'){return(hl,hr)=>{ctx.save();ctx.translate(hr[0],hr[1]);ctx.rotate(ang);rrect(-17*sc,-52*sc,34*sc,58*sc,6,'#0b0d14');rrect(-14*sc,-48*sc,28*sc,50*sc,4,screen);ctx.restore();ell(hr[0]+2,hr[1]+3,12.5,12.5,PAL.skin)}}

// ---------- sahnalar ----------
function stars(n,seed,y0,y1){for(let i=0;i<n;i++){const x=hash(i+seed)*720,y=y0+hash(i+seed+50)*(y1-y0);ctx.globalAlpha=.4+.5*hash(i+seed+9);ctx.fillStyle='#dfe8ff';ctx.fillRect(x,y,2,2)}ctx.globalAlpha=1}
function sceneBedroom(t,o={}){
 ctx.fillStyle=lgrad(0,-100,0,860,[[0,'#0a0e2a'],[1,'#1a2150']]);ctx.fillRect(-300,-300,1320,1160);
 ctx.fillStyle=lgrad(0,830,0,1500,[[0,'#1d1329'],[1,'#0a0710']]);ctx.fillRect(-300,830,1320,800);
 ctx.fillStyle='#10143a';ctx.fillRect(-300,820,1320,16);
 // deraza
 rrect(96,160,244,252,10,'#0a0d28');rrect(106,170,224,232,6,lgrad(0,170,0,402,[[0,'#16246a'],[1,'#0c1642']]));
 ctx.save();ctx.beginPath();ctx.rect(106,170,224,232);ctx.clip();stars(14,3,175,330);glow(262,246,70,'#bcd0ff',.5);ell(262,246,26,26,'#eef3ff');ell(272,240,24,24,'#16246a');ctx.restore();
 ctx.fillStyle='#0a0d28';ctx.fillRect(214,170,4,232);ctx.fillRect(106,284,224,4);
 poly([[70,150],[130,150],[118,430],[80,430]],'#2c1a52');poly([[306,150],[366,150],[356,430],[316,430]],'#2c1a52');
 // eshik
 const dx=584,dy=240,dw=124,dh=596;rrect(dx-8,dy-8,dw+16,dh+8,6,'#080a20');
 if(o.doorOpen>0){ctx.fillStyle=lgrad(0,dy,0,dy+dh,[[0,'#04050c'],[1,'#0c0a16']]);ctx.fillRect(dx,dy,dw,dh);glow(dx+dw/2,dy+dh*.55,170,'#26124a',.35*o.doorOpen);
  poly([[dx+dw,dy],[dx+dw+0,dy],[dx+dw-26*o.doorOpen,dy+14],[dx+dw-26*o.doorOpen,dy+dh-6],[dx+dw,dy+dh]],'#1d1432')}
 else{rrect(dx,dy,dw,dh,4,'#241838');if(o.lock){ctx.save();ctx.shadowColor='#ff2a3a';ctx.shadowBlur=16;rrect(dx+dw-48,dy+318,30,46,6,'#d9bd5c');ctx.strokeStyle='#d9bd5c';ctx.lineWidth=5;ctx.beginPath();ctx.arc(dx+dw-33,dy+314,11,PI,0);ctx.stroke();ctx.restore();ctx.strokeStyle='#9aa0b8';ctx.lineWidth=4;ctx.beginPath();for(let i=0;i<6;i++){ctx.moveTo(dx+10+i*13,dy+250+(i%2)*6);ctx.lineTo(dx+22+i*13,dy+256-(i%2)*6)}ctx.stroke()}rrect(dx+14,dy+22,dw-28,250,4,'#2c1e44');rrect(dx+14,dy+300,dw-28,260,4,'#2c1e44');ell(dx+dw-16,dy+330,6,6,'#c9b25a')}
 if(o.clone>0){ctx.save();ctx.globalAlpha=clamp(o.clone,0,1);drawHost({x:dx+dw/2-6,y:dy+dh-160*.64+6,s:.64,shadow:1,t,eye:'open',mouth:0,aL:[.1,.08],aR:[.1,.08],tilt:.1*sin(t*.8)});ctx.restore()}
 // krovat
 rrect(24,500,470,230,26,'#2b1d3d');rrect(40,516,438,40,16,'#38264d');
 ell(150,740,86,46,'#aeb6dc');ell(150,742,70,34,'#c3cae8');
 if(o.host!==false)drawHost(Object.assign({x:276,y:806,s:1,upper:1,t},o.host||{}));
 rrect(8,764,520,210,46,'#323f86');
 ctx.strokeStyle='#4252a6';ctx.lineWidth=5;[[70,800,120,880],[230,790,260,900],[380,792,420,892]].forEach(a=>{ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.quadraticCurveTo((a[0]+a[2])/2+16,(a[1]+a[3])/2,a[2],a[3]);ctx.stroke()});
 rrect(8,764,520,28,14,'#4254a8');
 rrect(0,960,540,28,10,'#1b1228');rrect(16,986,24,60,6,'#140d1e');rrect(488,986,24,60,6,'#140d1e');
 // tumba + soat
 rrect(540,780,100,120,8,'#2a1d3a');rrect(548,788,84,40,4,'#37284c');ell(590,990,0,0,'#000');rrect(550,718,80,56,8,'#0b0c18');
 ctx.save();ctx.shadowColor='#ff2a3a';ctx.shadowBlur=14;txt(o.alarm||'03:07',590,747,23,'#ff3b3b',0,'center',700);ctx.restore();
 if(o.phoneGlow>0)glow(o.glowX||330,o.glowY||700,260,'#7ad8ff',.55*o.phoneGlow);
}
function sceneKitchen(t,o={}){
 ctx.fillStyle='#10163a';ctx.fillRect(-300,-300,1320,1700);
 ctx.strokeStyle='rgba(120,140,220,.12)';ctx.lineWidth=2;for(let x=-300;x<1020;x+=60){ctx.beginPath();ctx.moveTo(x,-300);ctx.lineTo(x,900);ctx.stroke()}for(let y=-300;y<900;y+=60){ctx.beginPath();ctx.moveTo(-300,y);ctx.lineTo(1020,y);ctx.stroke()}
 rrect(-30,190,170,640,10,'#1d2656');rrect(-30,190,170,16,6,'#2a3570');rrect(112,260,10,110,5,'#8a96c8');rrect(112,520,10,70,5,'#8a96c8');
 rrect(520,150,200,150,10,'#0a0d28');rrect(530,160,180,130,6,'#16246a');ell(630,210,22,22,'#eef3ff');ell(640,205,20,20,'#16246a');
 ctx.beginPath();ctx.arc(250,330,52,0,7);ctx.fillStyle='#e8ecff';ctx.fill();ctx.lineWidth=7;ctx.strokeStyle='#2a3570';ctx.stroke();
 const mm=o.clockMin||9;ctx.strokeStyle='#10143a';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(250,330);ctx.lineTo(250,330-36);ctx.stroke();ctx.beginPath();ctx.moveTo(250,330);ctx.lineTo(250+Math.sin(mm/60*2*PI)*28,330-Math.cos(mm/60*2*PI)*28);ctx.stroke();
 ctx.strokeStyle='#05071a';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(420,-100);ctx.lineTo(420,150);ctx.stroke();ctx.beginPath();ctx.moveTo(392,150);ctx.lineTo(448,150);ctx.lineTo(432,184);ctx.lineTo(408,184);ctx.closePath();ctx.fillStyle='#0c1030';ctx.fill();
 const fl=.55+.45*(noise1(t*7)>-.35?1:.15);glow(420,200,330,'#ffd9a0',.28*fl);ell(420,186,12,6,`rgba(255,230,180,${fl})`);
 if(o.shadow>0){ctx.save();ctx.globalAlpha=.78*o.shadow;const sx=190+o.shadow*30;ell(sx,380,46,52,'#04050e');rrect(sx-86,420,172,420,60,'#04050e');ctx.restore()}
 rrect(-30,790,780,30,6,'#3a4690');rrect(-30,820,780,500,6,'#161d4a');[[60,500],[260,500],[460,500]].forEach(a=>{ctx.strokeStyle='#0d1236';ctx.lineWidth=4;ctx.strokeRect(a[0],850,170,300);rrect(a[0]+150,990,8,50,4,'#8a96c8')});
 rrect(290,700,240,92,8,'#242c60');ell(410,794,70,10,'#ff8a2a');glow(410,794,150,'#ff7a1a',.4);
 // choynak
 const kx=410,ky=700,sh=o.shake?sin(t*50)*1.5:0;ctx.save();ctx.translate(kx+sh,ky);
 ctx.beginPath();ctx.moveTo(-66,0);ctx.bezierCurveTo(-72,-76,-30,-104,0,-104);ctx.bezierCurveTo(30,-104,72,-76,66,0);ctx.closePath();ctx.fillStyle='#8f9bc4';ctx.fill();
 ctx.fillStyle='#a9b4d8';ctx.beginPath();ctx.ellipse(-24,-62,12,30,.4,0,7);ctx.fill();
 rrect(-22,-122,44,22,10,'#333b6e');ell(0,-124,10,8,'#333b6e');
 ctx.beginPath();ctx.moveTo(60,-34);ctx.quadraticCurveTo(108,-60,118,-100);ctx.lineTo(104,-104);ctx.quadraticCurveTo(96,-70,56,-52);ctx.closePath();ctx.fillStyle='#8f9bc4';ctx.fill();
 ctx.strokeStyle='#333b6e';ctx.lineWidth=14;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-64,-62);ctx.bezierCurveTo(-118,-96,-118,-8,-62,-24);ctx.stroke();
 if(o.crack){ctx.strokeStyle='#0a0d2a';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(10,-96);ctx.lineTo(0,-70);ctx.lineTo(16,-52);ctx.lineTo(4,-30);ctx.lineTo(18,-8);ctx.stroke();
  ctx.strokeStyle='rgba(220,224,240,.55)';ctx.lineWidth=1.6;[[-60,-20,-20,-50],[-60,-34,-30,-62],[-60,-8,-12,-34]].forEach(a=>{ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(a[2],a[3]);ctx.stroke()});ctx.fillStyle='rgba(120,125,150,.5)';ctx.beginPath();ctx.ellipse(0,-6,60,10,0,0,7);ctx.fill()}
 ctx.restore();
 for(let i=0;i<12;i++){const ph=(t*.55+i/12)%1,x=kx+112+Math.sin(t*2+i)*14*ph,y=ky-100-ph*220;ctx.globalAlpha=(1-ph)*.34;ell(x,y,8+ph*26,8+ph*24,'#e8ecff')}ctx.globalAlpha=1;
}
function scenePhone(t,o={}){
 ctx.fillStyle=rgrad(360,560,0,900,[[0,'#101a46'],[1,'#03040c']]);ctx.fillRect(-300,-300,1320,1900);
 glow(360,560,440,o.alert?'#ff3040':'#22e4ff',.2+.08*Math.sin(t*3));
 ctx.save();ctx.translate(360,560);ctx.rotate(Math.sin(t*1.3)*.012+(o.tilt||0));
 rrect(-226,-420,452,840,54,'#0b0d16');rrect(-216,-410,432,820,46,'#151826');
 ctx.save();ctx.beginPath();ctx.roundRect(-206,-400,412,800,38);ctx.clip();ctx.fillStyle=lgrad(0,-400,0,400,[[0,'#0e1536'],[1,'#080b20']]);ctx.fillRect(-206,-400,412,800);
 txt(o.time||'03:07',-176,-368,22,'#e8eeff',0,'left',700);rrect(150,-378,34,16,4,'#e8eeff');rrect(186,-374,4,8,2,'#e8eeff');
 rrect(-206,-340,412,86,0,'#141b46');ell(-160,-297,24,24,o.alert?'#ff3040':'#2a46c8');txt('M',-160,-296,24,'#fff',0,'center',900);txt(o.header||'Men',-120,-306,26,'#fff',0,'left',800);txt(o.sub||'mening raqamim',-120,-278,17,'#8fa0e0',0,'left',600);
 let y=-220;const ms=o.msgs||[];
 ms.forEach((m,i)=>{const k=clamp(Math.floor((t-m.t0)*30),0,m.text.length);if(t<m.t0)return;const full=m.text,shown=full.slice(0,k);const L=wrap(shown,310,'700 29px Inter');const h=L.length*38+32;
  const pop=ease(clamp((t-m.t0)/.15,0,1));ctx.save();ctx.translate(-196,y);ctx.scale(.9+.1*pop,.9+.1*pop);rrect(0,0,368,h,26,m.red?'rgba(120,10,24,.95)':'#243073');if(m.red){ctx.strokeStyle='#ff3b4a';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(0,0,368,h,26);ctx.stroke()}
  L.forEach((l,j)=>txt(l,20,26+j*38,29,'#fff',0,'left',700));ctx.restore();y+=h+18});
 ctx.restore();ctx.restore();
 if(o.alert>0){ctx.fillStyle=`rgba(255,20,40,${.12*o.alert*(.6+.4*Math.sin(t*10))})`;ctx.fillRect(-300,-300,1320,1900)}
}
function sceneDark(t,o={}){ctx.fillStyle='#03040a';ctx.fillRect(-300,-300,1320,1900)}

// ---------- overlaylar ----------
function glitchText(s,x,y,size,t,col='#ff3b3b'){const j=hash(Math.floor(t*14))>.82?6:0;ctx.save();ctx.globalAlpha=.8;txt(s,x-3-j,y,size,'#22e4ff');txt(s,x+3+j,y,size,col);ctx.restore();txt(s,x,y,size,'#fff')}
function cctv(t,cam='CAM 07',time='03:00:01'){ctx.save();ctx.strokeStyle='#fff';ctx.lineWidth=4;const m=34;[[m,m,1,1],[W2-m,m,-1,1],[m,H2-m,1,-1],[W2-m,H2-m,-1,-1]].forEach(([x,y,a,b])=>{ctx.beginPath();ctx.moveTo(x,y+b*40);ctx.lineTo(x,y);ctx.lineTo(x+a*40,y);ctx.stroke()});
 if(Math.sin(t*6)>0){ctx.fillStyle='#ff2020';ctx.beginPath();ctx.arc(62,70,9,0,7);ctx.fill()}txt('REC',86,71,24,'#fff',0,'left',800);txt(cam,W2-60,70,24,'#fff',0,'right',800);txt(time,60,H2-60,24,'#fff',0,'left',800);
 ctx.globalAlpha=.1;ctx.fillStyle='#000';for(let y=0;y<H2;y+=4)ctx.fillRect(0,y,W2,2);ctx.restore()}
function subscribeBtn(p,t){ // "OBUNA BO'LINDI ✓" animatsiyasi
 const a=ramp(p,0,.2),press=ramp(p,.45,.6),s=.7+.3*ease(a);ctx.save();ctx.globalAlpha=a;ctx.translate(360,215);ctx.scale(s*(1-.06*Math.sin(press*PI)),s*(1-.06*Math.sin(press*PI)));
 const done=p>.55;rrect(-230,-48,460,96,48,done?'#ffffff':'#ff0033');txt(done?'OBUNA BO‘LINDI ✓':'OBUNA BO‘LING',-8+(done?0:0),3,38,done?'#111':'#fff',0);if(!done)txt('🔔',182,3,40);ctx.restore();
 if(p>.5&&p<.85){ctx.save();ctx.font='80px "Noto Color Emoji"';ctx.textAlign='center';ctx.globalAlpha=1-ramp(p,.8,.85);ctx.fillText('👆',lerp(500,340,ramp(p,.3,.5)),lerp(380,262,ramp(p,.3,.5))+(p>.5?10:0));ctx.restore()}
}
function planeIcon(x,y,r,col){ctx.save();ctx.translate(x,y);ell(0,0,r,r,col);ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(-r*.5,-r*.02);ctx.lineTo(r*.52,-r*.45);ctx.lineTo(r*.2,r*.5);ctx.lineTo(-r*.05,r*.12);ctx.lineTo(-r*.5,-r*.02);ctx.fill();ctx.restore()}
function endCard(t,u,o={}){ // "DAVOMI TELEGRAMDA"
 const a=ease(ramp(u,0,.25));ctx.save();ctx.globalAlpha=a;glow(360,520,420,'#2a9df4',.3);planeIcon(360,420,86,'#2aa3ef');
 ctx.restore();ctx.save();ctx.globalAlpha=a;txt('DAVOMI',360,590,84,'#fff',0);txt('TELEGRAMDA',360,672,70,'#2aa3ef',0);rrect(150,730,420,74,37,'rgba(255,255,255,.12)');txt('t.me/aicreator_n1',360,768,34,'#fff',0,'center',800);txt('Profildagi havola 👆',360,850,28,'#9fb6e8',0,'center',700);ctx.restore()}
function vignette(a=.6){const g=rgrad(360,640,300,820,[[0,'rgba(0,0,0,0)'],[1,`rgba(0,0,0,${a})`]]);ctx.fillStyle=g;ctx.fillRect(0,0,W2,H2)}
function grain(t,a=.07){if(!grainC){grainC=document.createElement('canvas');grainC.width=grainC.height=256;const g=grainC.getContext('2d'),id=g.createImageData(256,256);for(let i=0;i<id.data.length;i+=4){const v=Math.random()*255;id.data[i]=id.data[i+1]=id.data[i+2]=v;id.data[i+3]=255}g.putImageData(id,0,0)}
 ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation='overlay';const ox=Math.floor(hash(Math.floor(t*24))*256),oy=Math.floor(hash(Math.floor(t*24)+5)*256);for(let x=-ox;x<W2;x+=256)for(let y=-oy;y<H2;y+=256)ctx.drawImage(grainC,x,y);ctx.restore()}
function flashFx(a,col='#fff'){if(a<=0)return;ctx.save();ctx.globalAlpha=clamp(a,0,1);ctx.fillStyle=col;ctx.fillRect(0,0,W2,H2);ctx.restore()}

// ---------- subtitr ----------
const norm=w=>w.toLowerCase().replace(/[^a-z0-9‘’'ʻ]/g,'').replace(/[‘’ʻ]/g,"'");
function uz(s){return s.replace(/([OoGg])'/g,"$1‘").replace(/'/g,'’')}
function drawSub(t){const s=SUBS.find(s=>t>=s.t0&&t<s.t1);if(!s)return;const k=clamp((t-s.t0)/.1,0,1),sc=.78+.22*ease(k)+.07*Math.max(0,1-(t-s.t0-.1)/.1);
 let size=66;ctx.font=`900 ${size}px Inter`;const ws=s.words.map(w=>uz(w).toUpperCase());const gap=18;let tot=ws.reduce((a,w)=>a+ctx.measureText(w).width,0)+gap*(ws.length-1);if(tot>650){size=size*650/tot;ctx.font=`900 ${size}px Inter`;tot=ws.reduce((a,w)=>a+ctx.measureText(w).width,0)+gap*(ws.length-1)}
 ctx.save();ctx.translate(360,OPT.subY||1010);ctx.scale(sc,sc);let x=-tot/2;ctx.textAlign='left';ctx.textBaseline='middle';ctx.lineJoin='round';
 ws.forEach((w,i)=>{const key=KW.has(norm(s.words[i]));ctx.strokeStyle='#000';ctx.lineWidth=size*.24;ctx.strokeText(w,x,0);ctx.fillStyle=key?'#ffe600':'#3db4ff';ctx.fillText(w,x,0);x+=ctx.measureText(w).width+gap});ctx.restore()}

// ---------- vaqt chizig'i ----------
function build2d(timing,lineShots,opt={}){TIMING=timing;OPT=Object.assign(OPT,opt);KW=new Set((opt.kw||[]).map(norm));const L=timing.lines;DUR=timing.dur+(opt.tail||1.3);SHOTS=[];SFX.length=0;
 for(let i=0;i<L.length;i++){const a=i==0?0:L[i].t0-.05,b=i==L.length-1?DUR:L[i+1].t0-.05;let sp=lineShots[i]||lineShots[lineShots.length-1];if(!Array.isArray(sp))sp=[sp];const n=sp.length,cuts=sp.map((s,k)=>s.at!==undefined?s.at:k/n);
  sp.forEach((s,k)=>{const t0=a+(b-a)*cuts[k],t1=k<n-1?a+(b-a)*cuts[k+1]:b;SHOTS.push(Object.assign({},s,{t0,t1,line:i}));(s.sfx||[]).forEach(([dt,ty,v])=>SFX.push({t:dt<0?t1+dt:t0+dt,type:ty,v:v||1}))})}
 SUBS=[];L.forEach((l,li)=>{let ch=[];const flush=()=>{if(ch.length)SUBS.push({t0:ch[0].t0,words:ch.map(w=>w.w),line:li});ch=[]};
  // 2026-11-25: ma'no birligi: raqam so'zlari ajratilmaydi, bog'lovchi/aniqlovchi (har, bir, eng, va...) keyingi so'z bilan qoladi, yolg'iz so'z oldingisiga qo'shiladi.
  const NUM=/^(bir|ikki|uch|to['‘’]rt|besh|olti|yetti|sakkiz|to['‘’]qqiz|o['‘’]n|yigirma|o['‘’]ttiz|qirq|ellik|oltmish|yetmish|sakson|to['‘’]qson|yuz|ming|million|milliard|ikkiyu|[0-9:.,%$]+)[,.!?:]*$/i;
  const STICK=/^(har|bir|eng|va|bu|shu|u|o['‘’]sha|juda|hech|yana|faqat|sen|men|biz|siz|ular|mening|sening|uning|bizning|qaysi|nima|kim|ham)$/i;
  l.words.forEach(w=>{const cur=ch.map(c=>c.w).join(' '),lw=ch.length?ch[ch.length-1].w:'';const punct=/[,.!?:]$/.test(lw);
   const keep=ch.length&&!punct&&((NUM.test(lw)&&NUM.test(w.w))||STICK.test(lw))&&ch.length<4&&cur.length+w.w.length<22;
   if(!keep&&(ch.length>=3||(cur.length+w.w.length>14&&ch.length)||punct))flush();ch.push(w)});flush();
  const st=SUBS.filter(x=>x.line===li);if(st.length>1){const a=st[st.length-2],b=st[st.length-1];if(b.words.length===1&&a.words.length<=2&&(a.words.join(' ')+b.words[0]).length<20&&!/[.!?]$/.test(a.words[a.words.length-1])){a.words=a.words.concat(b.words);SUBS.splice(SUBS.indexOf(b),1)}}});
 for(let i=0;i<SUBS.length;i++){const nx=SUBS[i+1],le=L[SUBS[i].line].t1;SUBS[i].t1=nx&&nx.line==SUBS[i].line?nx.t0:Math.min(le+.35,nx?nx.t0:le+.35)}}
function mouthAt(t){const e=(typeof ENVA!=='undefined'&&ENVA[Math.floor(t*30)])||0;return clamp(e*1.5,0,1)*(.65+.35*Math.abs(sin(t*19)))}
function renderFrame(t){
 const sh=SHOTS.find(s=>t>=s.t0&&t<s.t1)||SHOTS[SHOTS.length-1],u=clamp((t-sh.t0)/(sh.t1-sh.t0),0,1);
 ctx.setTransform(1.5,0,0,1.5,0,0);ctx.fillStyle='#000';ctx.fillRect(0,0,W2,H2);
 const c0=sh.cam?sh.cam[0]:[1,360,640],c1=sh.cam?(sh.cam[1]||sh.cam[0]):[1,360,640],e=ease(u),z=lerp(c0[0],c1[0],e),cx=lerp(c0[1],c1[1],e),cy=lerp(c0[2],c1[2],e);
 const sk=(typeof sh.shake=='function'?sh.shake(u,t):(sh.shake||0))+.8,shx=noise1(t*13)*sk*1.2,shy=noise1(t*13+40)*sk*1.2;
 ctx.save();ctx.translate(360+shx,640+shy);ctx.scale(z,z);ctx.rotate((c0[3]||0)*(1-e)+(c1[3]||0)*e);ctx.translate(-cx,-cy);
 sh.scene(t,u,mouthAt(t),sh);ctx.restore();
 vignette(sh.vig||.62);grain(t,.08);
 if(sh.ov)sh.ov(t,sh===SHOTS[0]?Math.max(u,.4):u); // 2026-11-25: hook matni 1-kadrdanoq to'liq ko'rinadi
 ctx.globalAlpha=.55;txt('@jasur.ai_',360,1252,24,'#fff',0,'center',700);ctx.globalAlpha=1;
 if(!sh.noSub)drawSub(t);
 if(sh.flash)flashFx(sh.flash(u,t),sh.flashCol||'#fff');
 return cv.toDataURL('image/jpeg',.92)}

// ---------- reklama sahnalari / UI kartalar ----------
function sceneTech(t,o={}){ctx.fillStyle=lgrad(0,-100,0,1380,[[0,'#0a1236'],[.6,'#1b1850'],[1,'#0a0a24']]);ctx.fillRect(-300,-300,1320,1900);
 ctx.strokeStyle='rgba(34,228,255,.12)';ctx.lineWidth=2;for(let x=-300;x<1020;x+=60){ctx.beginPath();ctx.moveTo(x,-300);ctx.lineTo(x,1500);ctx.stroke()}for(let y=-300;y<1500;y+=60){ctx.beginPath();ctx.moveTo(-300,y);ctx.lineTo(1020,y);ctx.stroke()}
 for(let i=0;i<16;i++){const x=hash(i)*720,y=1400-((hash(i+9)*1500+t*(24+hash(i+3)*34))%1500),z=14+hash(i+5)*34;ctx.save();ctx.translate(x,y);ctx.rotate(t*.5+i);ctx.globalAlpha=.22;ctx.fillStyle=['#22e4ff','#a855ff','#ff4fd8'][i%3];ctx.fillRect(-z/2,-z/2,z,z);ctx.restore()}
 glow(360,480,430,'#4a6cff',.2)}
function sceneOffice(t,o={}){ctx.fillStyle=lgrad(0,-100,0,900,[[0,'#171c52'],[1,'#0b0f33']]);ctx.fillRect(-300,-300,1320,1200);
 rrect(430,150,230,330,10,'#0a0d28');rrect(440,160,210,310,6,lgrad(0,160,0,470,[[0,'#27358f'],[1,'#121b57']]));ell(560,230,24,24,'#eef3ff');for(let i=0;i<7;i++){rrect(446+i*29,360-hash(i)*90,22,130+hash(i)*90,3,'#0b1038')}
 poly([[380,130],[450,130],[440,500],[392,500]],'#a31d2e');poly([[640,130],[710,130],[700,500],[650,500]],'#a31d2e');
 rrect(40,200,190,380,8,'#2a1a14');for(let r=0;r<4;r++){rrect(50,214+r*92,170,10,3,'#4a2e22');for(let b=0;b<6;b++)rrect(54+b*26,150+r*92+70-hash(r*7+b)*10+40,20,70+hash(r*7+b)*12,3,['#2e5cd6','#d6a12e','#b32e4a','#2ea36b'][b%4])}
 ctx.fillStyle=lgrad(0,860,0,1400,[[0,'#2a1a14'],[1,'#120a08']]);ctx.fillRect(-300,880,1320,700);
 rrect(224,470,272,400,60,'#8a1a2a');rrect(244,490,232,360,46,'#a32436');
 if(o.host!==false)drawHost(Object.assign({x:360,y:905,s:1.38,upper:1,t,crown:1,eye:'open',mshape:'smile'},o.host||{}));
 rrect(40,830,640,40,12,'#7d4a2c');rrect(70,868,580,330,10,'#55301c');rrect(250,930,220,56,10,'#d7b04a');txt('KUNLIK PREZIDENT',360,960,19,'#3a2408',0,'center',900);
 rrect(80,790,60,40,6,'#fff');ell(100,780,20,8,'#cbd3ea');
 rrect(560,760,90,70,6,'#1b2a6b');ell(605,745,26,10,'#ffd45a');glow(605,745,90,'#ffd45a',.35)}
function sceneCalendar(t,o={}){ctx.fillStyle=rgrad(360,600,0,900,[[0,'#1b2160'],[1,'#07091f']]);ctx.fillRect(-300,-300,1320,1900);
 ctx.save();ctx.translate(360,560);ctx.rotate(-.04);ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=40;rrect(-250,-330,500,660,22,'#f5f2e8');ctx.shadowBlur=0;rrect(-250,-330,500,120,22,'#d62a3a');rrect(-250,-250,500,40,0,'#d62a3a');
 [-170,-60,60,170].forEach(x=>{ell(x,-330,12,12,'#1a1a28')});txt('NOYABR',0,-270,46,'#fff',0);txt('DUSHANBA',0,-70,74,'#1b1d2e',0);txt('23',0,100,170,'#1b1d2e',0);
 const k=o.x||0;if(k>0){ctx.strokeStyle='#e0152b';ctx.lineWidth=34;ctx.lineCap='round';const a=ramp(k,0,.5),b=ramp(k,.5,1);ctx.beginPath();ctx.moveTo(-200,-260);ctx.lineTo(lerp(-200,200,a),lerp(-260,300,a));ctx.stroke();if(b>0){ctx.beginPath();ctx.moveTo(200,-260);ctx.lineTo(lerp(200,-200,b),lerp(-260,300,b));ctx.stroke()}
  if(k>.95){ctx.save();ctx.rotate(-.2);ctx.strokeStyle='#e0152b';ctx.lineWidth=8;ctx.strokeRect(-150,150,300,90);txt('BEKOR',0,196,64,'#e0152b',0);ctx.restore()}}
 ctx.restore();
 if((o.x||0)>.95){for(let i=0;i<40;i++){const ph=(t*.8+hash(i))%1,x=hash(i+3)*720,y=ph*1300;ctx.save();ctx.translate(x,y);ctx.rotate(t*3+i);ctx.fillStyle=['#ffd23a','#ff4fd8','#22e4ff','#7aff7a'][i%4];ctx.fillRect(-6,-3,12,6);ctx.restore()}}}
function reelCards(t,u){const L=[['HORROR','#d62a3a',-1],['QIZIQARLI','#ffb020',0],['AI','#22e4ff',1]];L.forEach(([n,c,k],i)=>{const a=ease(ramp(u,i*.12,.25+i*.12)),y=330+Math.sin(t*2+i)*10;ctx.save();ctx.translate(360+k*196,y);ctx.rotate(k*.08);ctx.scale(a,a);ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=24;rrect(-84,-150,168,300,20,lgrad(0,-150,0,150,[[0,c],[1,'#0b0f33']]));ctx.shadowBlur=0;ctx.fillStyle='rgba(255,255,255,.92)';ctx.beginPath();ctx.moveTo(-14,-24);ctx.lineTo(18,0);ctx.lineTo(-14,24);ctx.closePath();ctx.fill();txt(n,0,112,26,'#fff',0);ctx.restore()})}
function igProfile(t,u,o={}){const a=ease(ramp(u,0,.2));ctx.save();ctx.globalAlpha=a;ctx.translate(360,360+(1-a)*40);ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=30;rrect(-290,-250,580,520,34,'#ffffff');ctx.shadowBlur=0;
 const g=ctx.createLinearGradient(-250,-210,-130,-90);g.addColorStop(0,'#feda75');g.addColorStop(.5,'#d62976');g.addColorStop(1,'#4f5bd5');ctx.fillStyle=g;ctx.beginPath();ctx.arc(-190,-130,66,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-190,-130,58,0,7);ctx.fill();
 ctx.save();ctx.beginPath();ctx.arc(-190,-130,54,0,7);ctx.clip();ctx.fillStyle='#142054';ctx.fillRect(-250,-190,120,120);ctx.translate(-190,-130);ctx.scale(.62,.62);drawHost({x:0,y:214,s:1,upper:1,t,mouth:0,mshape:'smile'});ctx.restore();
 txt('jasur.ai_',-90,-168,34,'#111',0,'left',900);rrect(-90,-130,180,44,10,'#efefef');txt('Obuna bo‘lish',0,-108,22,'#222',0,'center',800);ctx.save();ctx.translate(-90,0);ctx.restore();
 txt('🎬 AI bilan video yasash',-250,-30,26,'#222',0,'left',700);txt('🤖 AI yangiliklari va darslar',-250,16,26,'#222',0,'left',700);txt('👇 Telegram kanalimiz:',-250,62,26,'#222',0,'left',700);
 const p=.5+.5*Math.sin(t*6);ctx.strokeStyle=`rgba(0,153,255,${.55+.45*p})`;ctx.lineWidth=5;ctx.beginPath();ctx.roundRect(-262,98,524,58,16);ctx.stroke();ctx.fillStyle=`rgba(0,153,255,${.1+.1*p})`;ctx.fill();
 txt('🔗 t.me/aicreator_n1',-240,128,30,'#0a58c8',0,'left',900);
 const f=ramp(u,.35,.7);ctx.font='84px "Noto Color Emoji"';ctx.textAlign='center';ctx.fillText('👆',lerp(300,150,ease(f)),lerp(330,190,ease(f))+(f>.95?8*Math.sin(t*14):0));ctx.restore()}
function tgChannelCard(t,u,o={}){const a=ease(ramp(u,0,.18));ctx.save();ctx.globalAlpha=a;ctx.translate(360,380+(1-a)*40);ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=30;rrect(-290,-290,580,590,34,'#17212b');ctx.shadowBlur=0;rrect(-290,-290,580,130,34,'#242f3d');planeIcon(-220,-225,40,'#2aa3ef');
 txt('AI Creator',-160,-250,34,'#fff',0,'left',900);txt('AI yangiliklari va darslar',-160,-206,22,'#8ea4bd',0,'left',700);
 const rows=[['🤖','AI yangiliklari — har kuni'],['🎬','AI bilan video yasash darslari'],['💰','AI bilan pul ishlash yo‘llari']];
 rows.forEach((r,i)=>{const k=ease(ramp(u,.15+i*.2,.35+i*.2));ctx.save();ctx.globalAlpha=k;ctx.translate((1-k)*60,0);rrect(-262,-130+i*104,524,86,22,'#2b5278');txt(r[0],-226,-87+i*104,40);txt(r[1],-180,-87+i*104,26,'#fff',0,'left',800);ctx.restore()});
 const pk=ramp(u,.8,1);if(o.cta!==false&&pk>0){ctx.globalAlpha=pk;const pu=1+.04*Math.sin(t*8);ctx.save();ctx.translate(0,225);ctx.scale(pu,pu);rrect(-210,-34,420,68,34,'#2aa3ef');txt('KANALGA O‘TISH',0,2,30,'#fff',0);ctx.restore()}
 ctx.restore()}
function chipPop(txtS,x,y,u,col='#ffd23a',tc='#1b1d2e',size=34){const a=ease(ramp(u,0,1));ctx.save();ctx.translate(x,y);ctx.scale(.6+.4*a,.6+.4*a);ctx.globalAlpha=a;ctx.font=`900 ${size}px Inter`;const w=ctx.measureText(txtS).width+54;rrect(-w/2,-size,w,size*2,size,col);txt(txtS,0,2,size,tc,0);ctx.restore()}
function headline(lines,u,y0=170,size=74,cols=['#fff','#ffd23a']){lines.forEach((l,i)=>{const a=ease(ramp(u,i*.12,.25+i*.12));if(a<=0)return;ctx.save();ctx.translate(360,y0+i*(size+10)+(1-a)*30);ctx.globalAlpha=a;ctx.scale(.8+.2*a,.8+.2*a);ctx.font=`900 ${size}px Inter`;let sz=size;const w=ctx.measureText(l).width;if(w>650)sz=size*650/w;txt(l,0,0,sz,cols[i%cols.length],sz*.2);ctx.restore()})}

// ---------- Claude personaji (2D, o'zimizning dizayn) va ish stoli sahnasi ----------
function drawClaude2d(x,y,s,mood,speaking,t){const h=22,bob=Math.sin(t*2.2)*2,sq=speaking?1+.04*Math.sin(t*15):1;ctx.save();ctx.translate(x,y);ctx.scale(s,s*sq);
 if(speaking)glow(0,-4*h,200,'#ff9a55',.4);
 const C='#da7758',D='#b85d40',K='#0a0a0a';ctx.translate(0,bob);
 const px=(gx,gy,gw,gh,c)=>{ctx.fillStyle=c;ctx.fillRect(gx*h,gy*h,gw*h,gh*h)};
 // gx: -4..4 (tana), gy: -8..0 (oyoqdan tepaga)
 const wave=speaking?Math.round(Math.sin(t*11)):0,up=(mood==='shock'||mood==='scared'||mood==='happy')?-1:0;
 px(-4,-8,8,6,C);px(-4,-8,8,.5,'#e88a6a');
 px(-6,-6+up+(wave>0?-1:0),2,2,C);px(4,-6+up+(wave<0?-1:0),2,2,C);
 [-4,-2,1,3].forEach(l=>px(l,-2,1,2,D));
 const bl=((t+1.1)%3.4)<.12;
 if(bl){px(-3,-6.5,1,.3,K);px(2,-6.5,1,.3,K)}
 else if(mood==='happy'){[-3,2].forEach(ex=>{px(ex,-6,1,.4,K);px(ex-.4,-5.6,.4,.5,K);px(ex+1,-5.6,.4,.5,K)})}
 else if(mood==='shock'||mood==='scared'){px(-3,-7,1,2,K);px(2,-7,1,2,K)}
 else{px(-3,-7,1,1,K);px(2,-7,1,1,K)}
 if(mood==='happy'){px(-1,-4.5,2,.35,K);px(-1.4,-4.9,.4,.4,K);px(1,-4.9,.4,.4,K)}
 else if(mood==='shock'){px(-.5,-4.6,1,1,K)}
 else if(mood==='sad'||mood==='scared'){px(-1,-4.3,2,.35,K)}
 ctx.restore()}
function deskBack(t){ctx.fillStyle=lgrad(0,-100,0,900,[[0,'#171d52'],[1,'#0b1038']]);ctx.fillRect(-300,-300,1320,1200);
 rrect(40,200,250,290,10,'#0a0d28');rrect(50,210,230,270,6,lgrad(0,210,0,480,[[0,'#27358f'],[1,'#121b57']]));for(let i=0;i<8;i++)rrect(60+i*27,390-hash(i)*70,20,90+hash(i)*70,3,'#0b1038');for(let i=0;i<16;i++)ell(60+hash(i+4)*210,240+hash(i+9)*200,2.2,2.2,'#ffd27a');
 rrect(430,230,230,170,8,'#1d2556');rrect(440,240,210,150,4,'#2a3570');ctx.fillStyle='#8a96c8';[0,1,2].forEach(i=>ctx.fillRect(455,262+i*34,170-i*30,8));
 ctx.strokeStyle='#05071a';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-20,60);ctx.quadraticCurveTo(360,150,740,60);ctx.stroke();for(let i=0;i<14;i++){const x=i*52-10,y=60+Math.sin(i/13*PI)*70;ell(x,y+8,7,9,`rgba(255,226,150,${.7+.3*Math.sin(t*3+i)})`);glow(x,y+8,38,'#ffe9a8',.22)}
 ctx.fillStyle='#120a1e';ctx.fillRect(-300,1100,1320,400)}
function deskFront(t,o={}){rrect(10,880,700,30,10,'#b57a44');rrect(30,910,660,300,12,'#7a4a2a');rrect(250,1000,220,18,6,'#5a3220');
 // noutbuk
 ctx.save();ctx.translate(360,880);rrect(-92,-112,184,108,10,'#cfd3dc');rrect(-82,-102,164,88,6,o.screen||'#2a4aa0');ctx.fillStyle='rgba(255,255,255,.55)';[0,1,2,3].forEach(i=>ctx.fillRect(-70,-90+i*18,100-i*14,6));rrect(-110,-6,220,12,6,'#aeb4c6');ctx.restore()}

// ---------- chodir / o'rmon sahnalari ----------
function pine(x,y,h,col){const w=h*.42;for(let i=0;i<3;i++){const yy=y-h*(.12+i*.28),ww=w*(1-i*.22);poly([[x-ww,yy],[x,yy-h*.36],[x+ww,yy]],col)}rrect(x-6,y-h*.14,12,h*.14,2,col)}
function fireAt(x,y,t,k=1){glow(x,y-40,300*k,'#ff8a2a',.5);for(let i=0;i<7;i++){const ph=(t*1.8+i/7)%1,fx=x+Math.sin(t*5+i*2)*10*k*(1-ph),fy=y-ph*90*k;const r=(26-ph*20)*k;ctx.globalAlpha=.9*(1-ph*.5);ell(fx,fy,r*.7,r*1.3,i%2?'#ffb02a':'#ff6a1a')}ctx.globalAlpha=1;ell(x,y+6,34*k,10*k,'#3a2414');limb(x-30*k,y+8,x+30*k,y-2,10*k,'#4a2c18');limb(x-26*k,y-4,x+30*k,y+8,10*k,'#3a2414')}
function sceneCamp(t,o={}){const day=o.day||0;ctx.fillStyle=lgrad(0,-100,0,900,[[0,day?'#2a3a6a':'#050a1e'],[.55,day?'#7a8aa8':'#0d2236'],[1,day?'#6a8a5a':'#12331f']]);ctx.fillRect(-300,-300,1320,1300);
 if(!day){stars(46,7,0,460);glow(560,170,220,'#cfe0ff',.3);ell(560,170,36,36,'#eef3ff');ell(574,160,32,32,'#0a1630')}else glow(560,200,300,'#ffe9b0',.5);
 poly([[-100,640],[110,400],[250,540],[420,350],[640,580],[830,450],[830,720],[-100,720]],day?'#4a6a86':'#0a1a2c');
 ctx.fillStyle=lgrad(0,700,0,1300,[[0,day?'#5a8a4a':'#12331f'],[1,day?'#3a5a30':'#07140e']]);ctx.fillRect(-300,700,1320,700);
 for(let i=0;i<11;i++)pine(-30+i*78,740+hash(i)*14,250+hash(i+3)*110,day?'#2a4a30':'#06130f');
 const lit=o.lit||0;glow(140,900,300,'#ffb050',.35*lit);
 poly([[-10,1010],[140,740],[290,1010]],lit>0?'#e8742a':'#b85a1c');poly([[90,1010],[140,880],[190,1010]],'#3a1a08');poly([[140,740],[290,1010],[240,1010],[140,800]],'rgba(0,0,0,.25)');
 if(o.shadow>0){ctx.save();ctx.beginPath();ctx.moveTo(-10,1010);ctx.lineTo(140,740);ctx.lineTo(290,1010);ctx.closePath();ctx.clip();ctx.globalAlpha=.85*o.shadow;const sx=240-o.shadow*70;ell(sx,880,22,28,'#050505');rrect(sx-30,900,60,170,26,'#050505');limb(sx-26,930,sx-60,1010,14,'#050505');limb(sx+26,930,sx+58,1010,14,'#050505');ctx.restore()}
 if(o.t2){poly([[430,1010],[580,740],[730,1010]],'#2a8a9a');poly([[580,740],[730,1010],[680,1010],[580,800]],'rgba(0,0,0,.28)');ctx.strokeStyle='#d8e8ee';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(580,760);ctx.lineTo(580+(o.zipOpen||0)*20,1010);ctx.stroke();if(o.zipOpen){poly([[580,780],[580+o.zipOpen*40,1010],[580,1010]],'#050808')}if(o.t2glow)glow(580,900,200,'#9affc0',.25*o.t2glow)}
 rrect(330,1030,100,36,12,'#1c2c46');rrect(300,1090,60,30,10,'#2a1c3c');
 fireAt(360,1085,t,o.fireK||1)}
function sceneTentIn(t,o={}){ctx.fillStyle=lgrad(0,-100,0,1300,[[0,'#7a2f0e'],[.5,'#c25a1a'],[1,'#8a3a10']]);ctx.fillRect(-300,-300,1320,1700);
 ctx.strokeStyle='rgba(60,20,4,.45)';ctx.lineWidth=6;[[-300,-100,360,1300],[360,-100,360,1300],[1020,-100,360,1300]].forEach(a=>{ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(a[2],a[3]);ctx.stroke()});
 ctx.strokeStyle='rgba(60,20,4,.35)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-300,300);ctx.lineTo(1020,300);ctx.stroke();
 glow(300,760,420,'#ffe2a0',.35+.1*Math.sin(t*3));
 if(o.shadow>0){ctx.save();ctx.globalAlpha=.9*o.shadow;const sx=640-o.shadow*90+Math.sin(t*1.5)*6;ell(sx,300,40,52,'#060302');rrect(sx-48,340,96,600,40,'#060302');limb(sx-40,400,sx-110+Math.sin(t*2)*10,760,22,'#060302');limb(sx+40,400,sx+100,700,22,'#060302');ctx.restore()}
 rrect(-60,1080,860,260,30,'#2a3a2a');rrect(-40,1100,820,40,20,'#3a4e3a');
 if(o.zip){ctx.strokeStyle='#d8d8d8';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(360,100);ctx.lineTo(360,1000);ctx.stroke();ctx.setLineDash([8,8]);ctx.lineWidth=4;ctx.strokeStyle='#888';ctx.beginPath();ctx.moveTo(352,100);ctx.lineTo(352,1000);ctx.stroke();ctx.setLineDash([])}}
// ---------- poyezd yo'li sahnasi ----------
function sceneTracks(t,o={}){ctx.fillStyle=lgrad(0,-100,0,1300,[[0,'#0a1028'],[1,'#141c34']]);ctx.fillRect(-300,-300,1320,1800);
 for(let i=0;i<60;i++)ell(hash(i)*720,hash(i+9)*1280,2,2,'rgba(160,170,200,.25)');
 const pathL=[[360,-300],[360,640],[340,700],[210,830],[150,960],[150,1300]],pathR=[[360,-300],[360,640],[380,700],[510,830],[570,960],[570,1300]];
 [pathL,pathR].forEach(P=>{for(let k=0;k<P.length-1;k++){const [x1,y1]=P[k],[x2,y2]=P[k+1],L=Math.hypot(x2-x1,y2-y1),n=Math.floor(L/34);for(let j=0;j<n;j++){const u=j/n,x=lerp(x1,x2,u),y=lerp(y1,y2,u),a=Math.atan2(y2-y1,x2-x1);ctx.save();ctx.translate(x,y);ctx.rotate(a);rrect(-3,-32,6,64,2,'#4a3a2a');ctx.restore()}}
  [-14,14].forEach(off=>{ctx.strokeStyle='#aab3c8';ctx.lineWidth=6;ctx.beginPath();P.forEach((p,i)=>{const nx=i<P.length-1?(P[i+1][1]-p[1]):(p[1]-P[i-1][1]),ny=i<P.length-1?-(P[i+1][0]-p[0]):-(p[0]-P[i-1][0]);const l=Math.hypot(nx,ny)||1;const px=p[0]+off*nx/l*0,py=p[1];const xx=p[0]+off*(Math.abs(ny)/l)*1;i?ctx.lineTo(xx,py):ctx.moveTo(xx,py)});ctx.stroke()})});
 rrect(318,640,84,70,12,'#2a3040');rrect(354,610,12,50,5,'#e03a3a');ell(360,606,12,12,'#ff6a6a');
 const tr=o.train||0;if(tr>0){const y=lerp(-260,640,tr),sh=o.shake?Math.sin(t*50)*2:0;ctx.save();ctx.translate(360+sh,y);ctx.fillStyle=rgrad(0,50,0,420,[[0,'rgba(255,240,180,.55)'],[1,'rgba(255,240,180,0)']]);poly([[-60,10],[60,10],[210,520],[-210,520]],'rgba(255,240,170,.18)');rrect(-62,-330,124,340,26,lgrad(0,-330,0,10,[['0','#8c2020'],['1','#d63a3a']]));rrect(-52,-310,104,60,16,'#a02a2a');rrect(-40,-230,80,150,12,'#7a1a1a');ell(-34,-6,13,13,'#fff7c8');ell(34,-6,13,13,'#fff7c8');glow(-34,-6,60,'#fff1b0',.8);glow(34,-6,60,'#fff1b0',.8);ctx.restore()}
 if(o.girl!==false)drawHost({x:150,y:1030,s:.62,t,look:undefined,pal:{hood:'#e0508a',hoodL:'#f07aa8'},longHair:1,eye:'wide',brow:1,mouth:0,mshape:'frown',aL:[2.2,2.5],aR:[2.2,2.5]});
 if(o.mom!==false)drawHost({x:570,y:1030,s:.62,t,pal:{hood:'#7a4ac0',hoodL:'#9a6ae0'},scarf:'#e8e0f0',eye:'wide',brow:1,mouth:0,mshape:'frown',aL:[2.2,2.5],aR:[2.2,2.5]})}
