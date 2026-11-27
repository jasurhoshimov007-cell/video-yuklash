// ===== "Kimni tanlaysiz" umumiy shablon (2D), sahna SPEC.scene: 'pitch' (futbolchilar) | 'vault' (pul yoki do'st). SPEC:
// {scene, hook:[..2 qator], left:{label,emoji}, right:{label,emoji}, roles:[hook|left|right|tense|count|ask|comment|natija|cta], big:{idx:"MATN"}, kw:[..]}
function player(x,y,s,k,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const b=Math.sin(t*3+x)*3;
 rrect(-34,40,28,120,12,k.shorts);rrect(6,40,28,120,12,k.shorts);rrect(-40,150,40,22,10,'#111');rrect(0,150,40,22,10,'#111');
 rrect(-62,-120+b,124,170,34,k.c1);if(k.stripes){ctx.save();ctx.beginPath();ctx.roundRect(-62,-120+b,124,170,34);ctx.clip();for(let i=-3;i<4;i++)ctx.fillStyle=k.c2,ctx.fillRect(i*36-8,-130,18,200);ctx.restore()}else{rrect(-62,-120+b,124,24,12,k.c2)}
 limb(-58,-100+b,-84,(o.up?-190:-10)+b,24,k.stripes?k.c1:k.c1);limb(58,-100+b,84,(o.up?-190:-10)+b,24,k.c1);ell(-84,(o.up?-196:-4)+b,13,13,k.skin);ell(84,(o.up?-196:-4)+b,13,13,k.skin);
 txt(String(k.num),0,-40+b,64,k.numc||'#fff',6);ell(0,-160+b,44,48,k.skin);ctx.fillStyle=k.hair;ctx.beginPath();ctx.ellipse(0,-180+b,46,30,0,PI,0);ctx.fill();
 ctx.restore();rrect(x-90*s,y+190*s,180*s,48*s,24*s,'rgba(0,0,0,.65)');txt(k.name,x,y+215*s,30*s,'#fff',0)}
const KITS={R:{c1:'#d6202e',c2:'#1f8a3a',shorts:'#1f8a3a',num:7,name:'RONALDO',skin:'#e0b08e',hair:'#1a1410'},M:{c1:'#ffffff',c2:'#7ac0ef',stripes:1,shorts:'#111',num:10,numc:'#1a3a6a',name:'MESSI',skin:'#e6b896',hair:'#5a3a20'}};
function scenePitch(t,o={}){ctx.fillStyle=lgrad(0,-300,0,500,[[0,'#050a1e'],[1,'#132050']]);ctx.fillRect(-300,-300,1320,800);
 for(let i=0;i<4;i++){glow(-40+i*270,-60,220,'#fffbe0',.35);ell(-40+i*270,-60,30,30,'#fffbe0')}
 for(let r=0;r<6;r++)for(let i=0;i<46;i++){const x=-280+i*30+(r%2)*15,y=150+r*38;ell(x,y+Math.sin(t*6+i+r)*(o.loud?3:1),9,9,['#c83a3a','#3a6ac8','#e8e8e8','#2a2a3a'][(i*7+r*3)%4])}
 ctx.fillStyle='#1d7a3a';ctx.fillRect(-300,400,1320,1200);for(let i=0;i<10;i++){ctx.fillStyle=i%2?'#1f8540':'#1a7035';ctx.fillRect(-300,400+i*110,1320,110)}
 ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=6;ctx.strokeRect(150,420,420,160);ctx.strokeRect(250,420,220,70);ctx.strokeStyle='#fff';ctx.lineWidth=10;ctx.strokeRect(240,330,240,90);ctx.strokeStyle='rgba(255,255,255,.3)';ctx.lineWidth=2;for(let i=0;i<10;i++){ctx.beginPath();ctx.moveTo(250+i*24,335);ctx.lineTo(250+i*24,415);ctx.stroke()}
 ell(360,640,10,10,'#fff');if(o.ball!==false){ell(360,900,24,24,'#fff');ctx.fillStyle='#111';ctx.beginPath();ctx.arc(360,900,9,0,7);ctx.fill()}
 player(160,860,1,KITS.R,t,{up:o.upL});player(560,860,1,KITS.M,t,{up:o.upR});
 rrect(230,40,260,70,14,'#0a0f2a');txt(o.score||'1 : 1',360,77,46,'#fff',0);txt(o.min||"89'",450,62,20,'#ffd23a',0)}
function sceneVault(t,o={}){ctx.fillStyle=lgrad(0,-300,0,1500,[[0,'#1a1440'],[1,'#3a2060']]);ctx.fillRect(-300,-300,1320,1900);glow(180,700,320,'#3aff8a',.18);glow(540,700,320,'#ffb04a',.18);
 limb(360,200,360,1100,6,'rgba(255,255,255,.25)');
 // chap: chamadon pul
 ctx.save();ctx.translate(180,780);rrect(-150,-40,300,190,18,'#2a2a2a');rrect(-140,-30,280,170,12,'#3a3a3a');for(let r=0;r<3;r++)for(let i=0;i<4;i++){rrect(-130+i*66,-20+r*52,60,44,6,'#3aa05a');ell(-100+i*66,2+r*52,10,10,'#2a7a42')}rrect(-40,-70,80,30,10,'#2a2a2a');ctx.restore();
 for(let i=0;i<8;i++){const ph=(t*.4+hash(i))%1;ctx.save();ctx.translate(60+hash(i+3)*240,lerp(560,980,ph));ctx.rotate(t+i);rrect(-26,-12,52,24,4,'rgba(80,190,110,.85)');ctx.restore()}
 txt('$1 000 000',180,620,48,'#7aff9a',8);
 // o'ng: do'st
 drawHost({x:540,y:980,s:1.05,upper:1,t,pal:{hood:'#e0752a',hoodL:'#f09a4a'},eye:'open',mouth:0,mshape:'smile',aL:[.2,.1],aR:[2.4+Math.sin(t*6)*.2,2.6]});txt('❤️',540,600,60,'#fff',0);
 if(o.fade==='L'){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(10,500,340,700)}if(o.fade==='R'){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(370,500,340,700)}}
// 2026-11-26: yangi sahnalar: 'cityvil' (shahar yoki qishloq), 'sky' (uchish yoki teleport)
function sceneCityVil(t,o={}){ctx.fillStyle=lgrad(0,-300,0,1300,[[0,'#0a0f30'],[1,'#2a2060']]);ctx.fillRect(-300,-300,660,2000);
 for(let i=0;i<7;i++){const x=-60+i*62,h=300+hash(i+2)*420;rrect(x,980-h,56,h+20,4,['#1e2a5a','#24306a','#1a2450'][i%3]);for(let r=0;r<14;r++)for(let c=0;c<2;c++)if(hash(i*17+r*5+c)>.4)rrect(x+10+c*22,1000-h+r*30,12,16,2,'#ffd27a')}
 glow(140,240,120,'#ff3b5c',.3);rrect(90,200,100,80,16,'#d6202e');txt('M',140,242,60,'#fff',0);
 for(let i=0;i<6;i++){const x=((t*120+i*90)%420)-40;ell(x,1030,10,6,'#ffe066');ell(x+30,1030,10,6,'#ffe066')}
 ctx.fillStyle='#202230';ctx.fillRect(-300,1000,660,900);
 ctx.fillStyle=lgrad(0,-300,0,1300,[[0,'#7ec8ff'],[1,'#cfefff']]);ctx.fillRect(360,-300,660,2000);glow(600,220,120,'#ffe680',.6);ell(600,220,60,60,'#ffd23a');
 ell(540,1000,360,180,'#5ab04a');ell(720,980,260,150,'#4a9a3a');for(let i=0;i<4;i++){const x=410+i*80;rrect(x-6,820,12,70,4,'#7a4a2a');ell(x,800,40,48,'#3a8a3a')}
 rrect(420,860,170,120,8,'#e8d2a8');poly([[405,866],[505,800],[605,866]],'#a8432a');rrect(470,910,40,70,4,'#7a4a2a');
 ell(640,950,50,40,'#c8a070');ell(640,940,26,14,'#3a2010');for(let i=0;i<3;i++){const ph=(t*.5+i/3)%1;ctx.globalAlpha=(1-ph)*.5;ell(640+Math.sin(t+i)*10,920-ph*120,14+ph*20,10+ph*14,'#fff')}ctx.globalAlpha=1;
 ctx.fillStyle='#6ab05a';ctx.fillRect(360,1000,660,900);limb(360,-300,360,1900,8,'#fff');
 txt('SHAHAR',180,560,54,'#fff',8);txt('QISHLOQ',540,560,54,'#2a5a1a',0);
 if(o.fade==='L'){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(-300,-300,660,2000)}if(o.fade==='R'){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(360,-300,660,2000)}}
function sceneSky(t,o={}){ctx.fillStyle=lgrad(0,-300,0,1300,[[0,'#3a8ae8'],[1,'#bfe4ff']]);ctx.fillRect(-300,-300,660,2000);
 for(let i=0;i<6;i++){const x=((i*130-t*40)%560)-60,y=300+i*120;ell(x,y,70,30,'rgba(255,255,255,.9)');ell(x+40,y-15,50,28,'rgba(255,255,255,.9)')}
 ctx.save();ctx.translate(180,620+Math.sin(t*2)*20);ctx.rotate(-.5);poly([[-20,-30],[-70,90],[60,90]],'#e8434f');drawHost({x:0,y:110,s:.75,upper:1,t,mouth:0,eye:'open',brow:0,mshape:'smile',aL:[2.6,3],aR:[2.6,3]});ctx.restore();
 for(let i=0;i<3;i++){const x=60+i*90,y=420+Math.sin(t*3+i)*12;ctx.strokeStyle='#223';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x-14,y);ctx.quadraticCurveTo(x-7,y-10,x,y);ctx.quadraticCurveTo(x+7,y-10,x+14,y);ctx.stroke()}
 ctx.fillStyle=lgrad(0,-300,0,1300,[[0,'#120a30'],[1,'#3a1a6a']]);ctx.fillRect(360,-300,660,2000);stars(40,3,0,1200);
 ctx.save();ctx.translate(540,680);for(let k=0;k<4;k++){ctx.rotate(t*(.6+k*.2));ctx.strokeStyle=['#b06aff','#3db4ff','#ff6ad0','#7affd0'][k];ctx.lineWidth=10-k*2;ctx.beginPath();ctx.ellipse(0,0,140-k*18,190-k*24,0,0,PI*1.6);ctx.stroke()}ctx.restore();
 glow(540,680,200,'#b06aff',.5);for(let i=0;i<14;i++){const a=t*2+i,r=160+Math.sin(t*3+i)*30;ell(540+Math.cos(a)*r,680+Math.sin(a)*r*1.3,4,4,'#fff')}
 txt('🌍',540,690,90);txt('⚡ 1 SONIYA',540,885,40,'#ffe14d',8);
 limb(360,-300,360,1900,8,'#fff');txt('UCHISH',180,470,56,'#fff',8);txt('TELEPORT',540,470,56,'#fff',8);
 if(o.fade==='L'){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(-300,-300,660,2000)}if(o.fade==='R'){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(360,-300,660,2000)}}

// 2026-11-27: yangi sahnalar: 'oceanspace' (okean tubi yoki kosmos), 'toyuy' (dabdabali to'y yoki o'z uyingiz)
function fade2(o){if(o.fade==='L'){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(-300,-300,660,2000)}if(o.fade==='R'){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(360,-300,660,2000)}}
function sceneOceanSpace(t,o={}){ctx.fillStyle=lgrad(0,-300,0,1300,[[0,'#0a6aa8'],[.5,'#063a6a'],[1,'#021a34']]);ctx.fillRect(-300,-300,660,2000);
 for(let i=0;i<6;i++){ctx.globalAlpha=.12;ctx.fillStyle='#bfefff';ctx.beginPath();ctx.moveTo(40+i*60+Math.sin(t+i)*10,-300);ctx.lineTo(10+i*70,900);ctx.lineTo(60+i*70,900);ctx.fill()}ctx.globalAlpha=1;
 ctx.save();ctx.translate(180+Math.sin(t*.5)*60,520);ell(0,0,150,52,'#2a5a8a');ell(-40,10,90,30,'#9ac8e8');poly([[130,-10],[210,-60],[200,40]],'#2a5a8a');ell(-100,-12,8,8,'#111');ctx.restore();
 for(let i=0;i<7;i++){const x=((i*90+t*50)%480)-60,y=680+hash(i)*160;poly([[x,y],[x-34,y-16],[x-34,y+16]],['#ff8a3a','#ffd23a','#ff5a8a'][i%3]);ell(x-46,y,22,14,['#ff8a3a','#ffd23a','#ff5a8a'][i%3])}
 ell(180,1010,300,90,'#c8a46a');[40,110,250,310].forEach((x,i)=>{for(let k=0;k<4;k++)limb(x,1000,x+Math.sin(t*2+i+k)*20-30+k*20,880-k*14,10,['#ff5a6a','#ff9a3a','#e84aa0','#ffd23a'][i])});
 ctx.globalAlpha=.75;rrect(110,850,150,110,40,'#bfefff');ctx.globalAlpha=1;ctx.strokeStyle='#fff';ctx.lineWidth=5;ctx.beginPath();ctx.roundRect(110,850,150,110,40);ctx.stroke();txt('🏠',185,905,46);
 for(let i=0;i<10;i++){const ph=(t*.4+hash(i+5))%1;ctx.globalAlpha=1-ph;ctx.strokeStyle='#dff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(40+hash(i)*280,1000-ph*900,4+hash(i+1)*8,0,7);ctx.stroke()}ctx.globalAlpha=1;
 ctx.fillStyle='#020414';ctx.fillRect(360,-300,660,2000);stars(60,4,0,1200);
 glow(560,1060,300,'#3a8ae8',.5);ell(560,1150,320,230,lgrad(300,950,800,1350,[[0,'#3a9ae8'],[1,'#0a3a7a']]));ell(500,1080,90,40,'#3aa05a');ell(640,1130,70,30,'#3aa05a');
 ctx.save();ctx.translate(540,520);ctx.rotate(Math.sin(t*.3)*.08);rrect(-160,-16,320,32,8,'#c8ccd8');rrect(-50,-60,100,120,20,'#e8ecf4');for(const k of[-1,1]){rrect(k*150-50*(k<0?1:0)-(k>0?0:50),-80,100,160,6,'#2a4aa8');for(let j=0;j<4;j++)limb(k*150-(k<0?50:-50)/2-25+(k>0?0:0),-80+j*40,k*150+(k>0?50:-50)-25,-80+j*40,2,'#8aa8ff')}ell(0,0,20,20,'#7af');ctx.restore();
 ctx.save();ctx.translate(470+Math.sin(t)*20,760+Math.cos(t*.8)*20);ctx.rotate(t*.4);ell(0,0,34,38,'#f4f4f8');ell(0,-4,22,18,'#2a3a5a');ell(-6,-8,6,4,'#8ac8ff');rrect(-28,30,56,60,18,'#f4f4f8');ctx.restore();
 txt('🍎',640,700+Math.sin(t*2)*20,50);txt('🥤',600,820+Math.cos(t*2)*24,44);
 limb(360,-300,360,1900,8,'#fff');txt('OKEAN',180,400,58,'#fff',8);txt('KOSMOS',540,400,58,'#fff',8);fade2(o)}
function sceneToyUy(t,o={}){ctx.fillStyle=lgrad(0,-300,0,1300,[[0,'#3a0a3a'],[1,'#8a2a5a']]);ctx.fillRect(-300,-300,660,2000);
 for(let i=0;i<9;i++){const x=-20+i*48;glow(x,180,60,['#ff4fd8','#ffd23a','#22e4ff'][i%3],.5+.3*Math.sin(t*6+i));ell(x,180,10,10,['#ff4fd8','#ffd23a','#22e4ff'][i%3])}
 glow(180,360,160,'#fff2c0',.5);for(let k=0;k<6;k++){limb(180,300,120+k*24,420,3,'#ffe9a0');ell(120+k*24,426,8,10,'#fff6d0')}
 for(let r=0;r<3;r++)for(let i=0;i<3;i++){const x=50+i*115,y=640+r*130;ell(x,y+40,52,18,'#e8e0f0');ell(x,y+30,52,18,'#fff');ell(x-14,y+24,12,7,'#e8a040');ell(x+16,y+26,10,6,'#7ad04a');
  for(let k=0;k<2;k++){const gx=x-30+k*60,b=Math.abs(Math.sin(t*5+i+r+k))*8;ell(gx,y-18-b,14,14,'#e6b68a');rrect(gx-14,y-4-b,28,30,10,['#2a3e8f','#c8366b','#3a9a5a','#e8a22a'][(i+r+k)%4])}}
 txt('🎤',300,560,40);for(let i=0;i<14;i++){const ph=(t*.6+hash(i))%1;ctx.save();ctx.translate(hash(i+2)*340,ph*1100);ctx.rotate(t*3+i);ctx.fillStyle=['#ffd23a','#ff4fd8','#22e4ff'][i%3];ctx.fillRect(-5,-3,10,6);ctx.restore()}
 ctx.fillStyle=lgrad(0,-300,0,1300,[[0,'#8ac8ff'],[1,'#e8f6ff']]);ctx.fillRect(360,-300,660,2000);glow(620,200,100,'#ffe680',.6);ell(620,200,50,50,'#ffd23a');
 ctx.fillStyle='#6ab05a';ctx.fillRect(360,900,660,1000);
 rrect(420,560,240,300,10,'#f0e0c0');poly([[400,570],[540,440],[680,570]],'#c0503a');rrect(510,740,60,120,8,'#7a4a2a');ell(558,800,5,5,'#ffd23a');
 for(const x of[440,600]){rrect(x,600,50,50,6,'#8ad0ff');limb(x+25,600,x+25,650,3,'#fff');limb(x,625,x+50,625,3,'#fff')}rrect(600,470,26,60,4,'#8a5a3a');for(let i=0;i<3;i++){const ph=(t*.5+i/3)%1;ctx.globalAlpha=(1-ph)*.6;ell(613+Math.sin(t+i)*8,450-ph*80,10+ph*12,8+ph*8,'#fff')}ctx.globalAlpha=1;
 for(let i=0;i<3;i++){const x=400+i*120;limb(x,900,x,820,8,'#7a4a2a');ell(x,800,38,44,'#3a8a3a')}txt('🔑',600,950+Math.sin(t*3)*8,56);
 limb(360,-300,360,1900,8,'#fff');txt('TO‘Y',180,490,64,'#fff',8);txt('UY',540,380,64,'#2a4a1a',0);fade2(o)}
const SC={vault:sceneVault,cityvil:sceneCityVil,sky:sceneSky,oceanspace:sceneOceanSpace,toyuy:sceneToyUy}[SPEC.scene]||scenePitch;
const HJ=(t,m,x={})=>Object.assign({x:360,y:1385,s:1.3,upper:1,t,mouth:m,eye:'wide',brow:.8,mshape:'frown',aL:[.3,.1],aR:[.5,-.3]},x);
function pill(txtS,emo,x,y,u,col='#fff'){const a=ease(ramp(u,0,.25));ctx.save();ctx.translate(x,y);ctx.globalAlpha=a;ctx.scale(.8+.2*a,.8+.2*a);ctx.font='900 36px Inter';let w=ctx.measureText(txtS).width+120;const sc=w>660?660/w:1;ctx.scale(sc,sc);rrect(-w/2,-38,w,76,38,col);txt(emo,-w/2+46,4,44,'#111',0);txt(txtS,26,3,36,'#111',0);ctx.restore()}
const BIG=SPEC.big||{};
const SH={
 hook:i=>({cam:[[1,360,640],[1.2,360,600]],shake:.7,scene:(t,u,m)=>{SC(t,{loud:1});drawHost(HJ(t,m,{s:1.6}))},ov:(T,u)=>{ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(0,0,W2,H2);headline(SPEC.hook,u*2,190,92,['#fff','#ffd23a'])},sfx:[[0,'hit'],[.15,'whoosh'],[.4,'cheer']]}),
 left:i=>({cam:[[1.5,190,800],[1.75,190,820]],scene:(t,u,m)=>{SC(t,{upL:1,fade:'R'})},ov:(T,u)=>pill(SPEC.left.label,SPEC.left.emoji,360,180,u,'#ffd23a'),sfx:[[0,'whoosh'],[.2,'pop']]}),
 right:i=>({cam:[[1.5,540,800],[1.75,540,820]],scene:(t,u,m)=>{SC(t,{upR:1,fade:'L'})},ov:(T,u)=>pill(SPEC.right.label,SPEC.right.emoji,360,180,u,'#7ac0ef'),sfx:[[0,'whoosh'],[.2,'pop']]}),
 tense:i=>({cam:[[1.1,360,700],[1.3,360,740]],shake:.8,scene:(t,u,m)=>{SC(t,{});drawHost(HJ(t,m,{sweat:1,brow:1.2}))},ov:(T,u)=>{ctx.fillStyle=`rgba(255,30,40,${.08+.06*Math.sin(T*10)})`;ctx.fillRect(0,0,W2,H2);if(BIG[i]){const a=ease(ramp(u,0,.25));ctx.save();ctx.globalAlpha=a;ctx.translate(360,210);ctx.scale(.7+.3*a,.7+.3*a);const s=BIG[i];ctx.font='900 110px Inter';const w=ctx.measureText(s).width;const z=w>640?110*640/w:110;txt(s,0,0,z,'#ffd23a',z*.18);ctx.restore()}},sfx:[[0,'heart'],[.5,'whoosh']]}),
 count:i=>({cam:[[1.1,360,700],[1.35,360,740]],shake:1.4,scene:(t,u,m)=>{SC(t,{});drawHost(HJ(t,m,{sweat:1,brow:1.4}))},ov:(T,u)=>{ctx.fillStyle=`rgba(255,30,40,${.14+.1*Math.sin(T*14)})`;ctx.fillRect(0,0,W2,H2);const n=3-Math.min(2,Math.floor(ramp(u,.25,1)*3));ctx.save();ctx.translate(360,300);const k=(ramp(u,.25,1)*3)%1;ctx.scale(1.3-.3*k,1.3-.3*k);txt(String(n),0,0,230,n==1?'#ff3b5c':'#ffe14d',26);ctx.restore()},sfx:[[.25,'tick'],[.5,'tick'],[.75,'tick'],[0,'drone']]}),
 ask:i=>({cam:[[1,360,640],[1.03,360,640]],scene:(t,u,m)=>{SC(t,{});drawHost(HJ(t,m,{brow:.6,mshape:'neutral',eye:'open'}))},ov:(T,u)=>{ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(0,0,W2,H2);headline(SPEC.askTitle||['KIMNI','TANLAYSIZ?'],u*2,200,104,['#fff','#ffe14d']);pill(SPEC.left.label,SPEC.left.emoji,360,470,ramp(u,.25,.6),'#ffd23a');pill(SPEC.right.label,SPEC.right.emoji,360,570,ramp(u,.35,.7),'#7ac0ef')},sfx:[[0,'stinger']]}),
 comment:i=>({cam:[[1,360,640],[1.03,360,640]],scene:(t,u,m)=>{SC(t,{});drawHost(HJ(t,m,{brow:0,mshape:'smile',eye:'open',aR:[2.2,2.0]}))},ov:(T,u)=>{ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(0,0,W2,H2);const a=ease(ramp(u,0,.3));ctx.save();ctx.translate(360,330);ctx.scale(.7+.3*a,.7+.3*a);ctx.globalAlpha=a;rrect(-300,-90,600,180,54,'#fff');txt('💬 IZOHDA YOZING',0,-30,54,'#111',0);const s=SPEC.cmt||'A yoki B';ctx.font='900 50px Inter';const w=ctx.measureText(s).width;txt(s,0,40,w>540?50*540/w:50,'#e8434f',0);ctx.restore()},sfx:[[0,'pop'],[.5,'click']]}),
 natija:i=>({cam:[[1,360,640],[1,360,640]],scene:(t,u,m)=>{ctx.fillStyle='#070b24';ctx.fillRect(-300,-300,1320,1900);drawHost(HJ(t,m,{brow:0,mshape:'smile',eye:'open'}))},ov:(T,u)=>{const a=ease(ramp(u,0,.25));ctx.save();ctx.globalAlpha=a;glow(360,420,380,'#2a9df4',.3);planeIcon(360,330,80,'#2aa3ef');txt('NATIJA',360,480,84,'#fff',0);txt('TELEGRAMDA',360,560,70,'#2aa3ef',0);txt('Profildagi havola 👆',360,640,32,'#9fb6e8',0,'center',700);ctx.restore()},sfx:[[0,'whoosh'],[.4,'ding']]}),
 cta:i=>({cam:[[1,360,640],[1,360,640]],scene:(t,u,m)=>{SC(t,{});drawHost(HJ(t,m,{eye:'open',brow:0,mshape:'smile',aL:[2.4,2.7],aR:[2.4,2.7]}))},ov:(T,u)=>{ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(0,0,W2,H2);subscribeBtn(ramp(u,.1,.9),T)},sfx:[[0,'whoosh'],[.6,'pop']]})
};
const S=SPEC.roles.map((r,i)=>SH[r](i));
boot2d({subY:1010});build2d(TIMINGDATA,S,{tail:SPEC.tail||1.4,kw:SPEC.kw||[]});
