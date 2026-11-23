// RAQAMIM — 2D horror (45-50 s)
const HB=(m,t,x={})=>Object.assign({x:276,y:806,s:1,upper:1,t,mouth:m,aR:[.7,-2.6],aL:[.25,.1],prop:phoneProp(1,.42),look:.7,glow:1,brow:.4},x);
const B=(t,m,sh,o={},h={})=>sceneBedroom(t,Object.assign({phoneGlow:1,glowX:338,glowY:668,host:HB(m,t,h)},o));
const PH=(t,sh,o)=>scenePhone(t,o);
const m1={text:'Uxlayapsanmi?',t0:-9,red:0},m2=sh=>({text:'Ovoz chiqarma. Uyda kimdir bor.',t0:sh.t0+.15,red:1}),m3=sh=>({text:'U oshxonada turibdi.',t0:sh.t0+.15,red:1}),m4=sh=>({text:'Orqangga qara.',t0:sh.t0+.1,red:1});
const O=(f)=>(t,u,m,sh)=>f(t,u,m,sh);
const S=[
 {cam:[[1,360,640],[1.28,300,660]],scene:(t,u,m)=>B(t,m,0,{alarm:'03:07'}),ov:(t,u)=>{ctx.globalAlpha=1-ramp(u,.55,.9);glitchText('03:07',360,200,128,t);ctx.globalAlpha=1},sfx:[[0,'hit'],[.15,'heart'],[1.5,'heart']]},
 {cam:[[1,360,640],[1.05,360,620]],scene:(t,u,m,sh)=>PH(t,sh,{header:'Men',sub:'mening raqamim',msgs:[{text:'Uxlayapsanmi?',t0:sh.t0+.2}]}),sfx:[[.2,'click'],[.2,'thud']]},
 {cam:[[1,360,640],[1.06,360,610]],scene:(t,u,m,sh)=>PH(t,sh,{header:'Men',sub:'mening raqamim',alert:1,msgs:[{text:'Uxlayapsanmi?',t0:-9},m2(sh)]}),sfx:[[.15,'click'],[.2,'stinger']]},
 {cam:[[1.9,338,700],[2.5,338,690]],shake:1.2,scene:(t,u,m)=>B(t,m,0,{},{eye:'wide',brow:1,aL:[.25,.1],sweat:1}),sfx:[[0,'heart'],[.7,'heart']]},
 {cam:[[1.15,330,660],[1.5,540,520]],scene:(t,u,m)=>B(t,m,0,{doorOpen:.3},{eye:'wide',brow:1,look:1,sweat:1}),sfx:[[0,'drone']]},
 {cam:[[1.2,520,560],[1.9,624,560]],scene:(t,u,m)=>B(t,m,0,{lock:1},{eye:'wide',brow:1,look:1}),ov:(t,u)=>{flashFx(u<.08?.5:0,'#ff2a3a')},sfx:[[0,'click'],[.25,'thud']]},
 {cam:[[1,360,640],[1.05,360,620]],scene:(t,u,m,sh)=>PH(t,sh,{header:'Men',sub:'mening raqamim',alert:1,msgs:[m1,{text:'Ovoz chiqarma. Uyda kimdir bor.',t0:-9,red:1},m3(sh)]}),sfx:[[.15,'click'],[.2,'stinger']]},
 {cam:[[1,360,640],[1.3,420,650]],scene:(t,u)=>sceneKitchen(t,{shadow:ramp(u,.2,1),shake:1}),sfx:[[0,'drone'],[.4,'tick']]},
 {cam:[[1.7,410,610],[2.3,410,620]],shake:1,scene:(t)=>sceneKitchen(t,{crack:1,shake:1,shadow:.6}),sfx:[[0,'hit'],[.6,'whoosh']]},
 {cam:[[1,360,640],[1.05,360,620]],scene:(t,u,m,sh)=>PH(t,sh,{header:'Men',sub:'mening raqamim',alert:1,msgs:[{text:'U oshxonada turibdi.',t0:-9,red:1},m4(sh)]}),sfx:[[.1,'click'],[.2,'stinger']]},
 {cam:[[1.2,300,650],[1.5,330,640]],scene:(t,u,m)=>B(t,m,0,{doorOpen:.5,clone:.12},{eye:'wide',brow:1,look:.3,sweat:1,glow:.6}),sfx:[[0,'door'],[.9,'door']]},
 {cam:[[2.8,276,598],[3.3,276,590]],shake:1.5,scene:(t,u,m)=>B(t,m,0,{doorOpen:.6,clone:.18},{eye:'wide',brow:1,look:.2,sweat:1,glow:.5}),sfx:[[0,'heart'],[.6,'heart'],[0.0,'silence']]},
 {cam:[[1.1,300,640],[1.8,584,560]],scene:(t,u,m)=>B(t,m,0,{doorOpen:.6+.4*u,clone:.3+.5*u},{eye:'wide',brow:1,look:1,tilt:.12*u,hx:6*u,glow:.3}),sfx:[[0,'silence']]},
 {cam:[[1.9,600,560],[2.5,620,570]],shake:1.2,scene:(t,u,m)=>B(t,m,0,{doorOpen:1,clone:1,host:false}),ov:(t,u)=>flashFx(u<.1?.9:0),sfx:[[0,'stinger'],[.05,'hit']]},
 {cam:[[1.1,400,690],[1.3,430,690]],scene:(t,u,m)=>B(t,m,0,{doorOpen:1,clone:1},{eye:'wide',brow:1,look:1,sweat:1,glow:.2,tilt:.1}),sfx:[[0,'drone']]},
 {cam:[[2.6,640,600],[3.2,640,598]],shake:.8,scene:(t,u,m)=>B(t,m,0,{doorOpen:1,clone:1,host:false}),sfx:[[0,'heart']]},
 {cam:[[1.7,600,600],[2.1,640,610]],scene:(t,u,m)=>B(t,m,0,{doorOpen:1,clone:1,host:false}),ov:(t,u)=>{ctx.save();ctx.translate(600,660);ctx.rotate(.1);rrect(-24,-80,48,84,8,'#0a0c14');rrect(-20,-74,40,72,5,'#d9f3ff');glow(0,-40,140,'#9be4ff',.7);ctx.restore()},sfx:[[0,'click'],[.4,'thud']]},
 {cam:[[1,360,640],[1.08,360,620]],scene:(t,u,m,sh)=>PH(t,sh,{header:'Men',sub:'mening raqamim',alert:1,msgs:[{text:'Jasur, endi navbat',t0:sh.t0+.2,red:1}]}),sfx:[[.2,'click'],[.2,'stinger']]},
 {cam:[[1,360,640],[1.1,360,620]],scene:sceneDark,ov:(t,u)=>{const j=hash(Math.floor(t*12));glitchText('???',360,520,200,t);ctx.globalAlpha=.9;txt('Jasur, endi navbat ▓▓▓▓',360,720,34,'#ff3b3b',0,'center',800);ctx.globalAlpha=1;flashFx(j>.93?.25:0)},sfx:[[0,'heart'],[.5,'tick']]},
 {cam:[[1,360,640],[1,360,640]],scene:sceneDark,ov:(t,u)=>endCard(t,u),noSub:0,sfx:[[0,'whoosh'],[.5,'ding']]},
 {cam:[[1,360,640],[1,360,640]],scene:sceneDark,ov:(t,u,m)=>{endCard(t,.99);subscribeBtn(u,t)},sfx:[[.2,'pop'],[.8,'ding']]},
];
boot2d({subY:1060});build2d(TIMINGDATA,S,{tail:1.4,kw:["yolg'iz","qulflangan","singan","orqangga","o'zim","jilmaydi","davomi","telegram","obuna","like","navbat","oshxonada"]});
