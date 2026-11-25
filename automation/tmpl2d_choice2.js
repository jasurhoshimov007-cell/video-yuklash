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
const SC=SPEC.scene==='vault'?sceneVault:scenePitch;
const HJ=(t,m,x={})=>Object.assign({x:360,y:1385,s:1.3,upper:1,t,mouth:m,eye:'wide',brow:.8,mshape:'frown',aL:[.3,.1],aR:[.5,-.3]},x);
function pill(txtS,emo,x,y,u,col='#fff'){const a=ease(ramp(u,0,.25));ctx.save();ctx.translate(x,y);ctx.globalAlpha=a;ctx.scale(.8+.2*a,.8+.2*a);ctx.font='900 36px Inter';let w=ctx.measureText(txtS).width+120;const sc=w>660?660/w:1;ctx.scale(sc,sc);rrect(-w/2,-38,w,76,38,col);txt(emo,-w/2+46,4,44,'#111',0);txt(txtS,26,3,36,'#111',0);ctx.restore()}
const BIG=SPEC.big||{};
const SH={
 hook:i=>({cam:[[1,360,640],[1.06,360,620]],shake:.7,scene:(t,u,m)=>{SC(t,{loud:1});drawHost(HJ(t,m,{s:1.6}))},ov:(T,u)=>{ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(0,0,W2,H2);headline(SPEC.hook,u*2,190,92,['#fff','#ffd23a'])},sfx:[[0,'hit'],[.15,'whoosh'],[.4,'cheer']]}),
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
