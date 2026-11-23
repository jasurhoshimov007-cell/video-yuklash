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
 const P=p.shadow?SPAL:PAL,s=p.s||1,t=p.t||0,br=Math.sin(t*2.2)*1.6;
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
 ell(-50,6,9,13,P.skin);ell(50,6,9,13,P.skin);ell(0,0,50,58,P.skin);
 // quloqchin
 if(!p.shadow){ctx.save();ctx.translate(-55,8);limb(0,0,8,22,4,P.cy);ell(8,24,4,4,P.cy);ctx.restore()}
 // soqol (jag' bo'ylab) + mo'ylov + cho'qqi soqol
 if(!p.shadow){ctx.save();ctx.beginPath();ctx.ellipse(0,0,50,58,0,0,7);ctx.clip();ctx.fillStyle='rgba(52,34,26,.78)';ctx.fillRect(-60,4,120,70);ctx.fillStyle=P.skin;ctx.beginPath();ctx.ellipse(0,12,37,33,0,0,7);ctx.fill();ctx.fillStyle='rgba(52,34,26,.78)';ctx.beginPath();ctx.moveTo(-16,24);ctx.quadraticCurveTo(0,17,16,24);ctx.quadraticCurveTo(0,28,-16,24);ctx.fill();ctx.beginPath();ctx.ellipse(0,50,13,9,0,0,7);ctx.fill();ctx.restore()}
 // soch
 ctx.beginPath();ctx.moveTo(-54,2);ctx.bezierCurveTo(-60,-40,-34,-74,4,-68);ctx.bezierCurveTo(30,-76,56,-52,54,2);ctx.bezierCurveTo(48,-10,44,-26,34,-32);ctx.bezierCurveTo(14,-22,-18,-40,-38,-24);ctx.bezierCurveTo(-46,-20,-50,-10,-54,2);ctx.closePath();ctx.fillStyle=P.hair;ctx.fill();
 [[-26,-66,-34,-82,-14,-70],[-4,-70,-6,-88,10,-72],[16,-70,26,-86,32,-66],[34,-60,52,-72,48,-48]].forEach(a=>{ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(a[2],a[3]);ctx.lineTo(a[4],a[5]);ctx.fillStyle=P.hair;ctx.fill()});
 // koz
 const blink=(t%3.7)<.11,st=p.eye||'open',look=p.look||0;
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
 ws.forEach((w,i)=>{const key=KW.has(norm(s.words[i]));ctx.strokeStyle='#000';ctx.lineWidth=size*.24;ctx.strokeText(w,x,0);ctx.fillStyle=key?'#ff4a3d':'#FFE600';ctx.fillText(w,x,0);x+=ctx.measureText(w).width+gap});ctx.restore()}

// ---------- vaqt chizig'i ----------
function build2d(timing,lineShots,opt={}){TIMING=timing;OPT=Object.assign(OPT,opt);KW=new Set((opt.kw||[]).map(norm));const L=timing.lines;DUR=timing.dur+(opt.tail||1.3);SHOTS=[];SFX.length=0;
 for(let i=0;i<L.length;i++){const a=i==0?0:L[i].t0-.05,b=i==L.length-1?DUR:L[i+1].t0-.05;let sp=lineShots[i]||lineShots[lineShots.length-1];if(!Array.isArray(sp))sp=[sp];const n=sp.length,cuts=sp.map((s,k)=>s.at!==undefined?s.at:k/n);
  sp.forEach((s,k)=>{const t0=a+(b-a)*cuts[k],t1=k<n-1?a+(b-a)*cuts[k+1]:b;SHOTS.push(Object.assign({},s,{t0,t1,line:i}));(s.sfx||[]).forEach(([dt,ty,v])=>SFX.push({t:dt<0?t1+dt:t0+dt,type:ty,v:v||1}))})}
 SUBS=[];L.forEach((l,li)=>{let ch=[];const flush=()=>{if(ch.length)SUBS.push({t0:ch[0].t0,words:ch.map(w=>w.w),line:li});ch=[]};
  l.words.forEach(w=>{const cur=ch.map(c=>c.w).join(' ');if(ch.length>=3||(cur.length+w.w.length>14&&ch.length)||(ch.length&&/[,.!?:]$/.test(ch[ch.length-1].w)))flush();ch.push(w)});flush()});
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
 if(sh.ov)sh.ov(t,u);
 ctx.globalAlpha=.55;txt('@jasur.ai_',360,1252,24,'#fff',0,'center',700);ctx.globalAlpha=1;
 if(!sh.noSub)drawSub(t);
 if(sh.flash)flashFx(sh.flash(u,t),sh.flashCol||'#fff');
 const fi=clamp(t/.15,0,1);if(fi<1)flashFx(1-fi,'#000');
 return cv.toDataURL('image/jpeg',.92)}
