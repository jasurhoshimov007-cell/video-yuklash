// VIDEOQO'NG'IROQ 03:00 — 2D horror, oxirida Telegram kanal reklamasi
function nextDoor(t,o={}){ctx.fillStyle=lgrad(0,-300,0,1500,[[0,'#10122c'],[1,'#07081a']]);ctx.fillRect(-300,-300,1320,1900);ctx.fillStyle='#2a1a1e';ctx.fillRect(200,240,320,820);ctx.strokeStyle='#4a2b30';ctx.lineWidth=8;ctx.strokeRect(200,240,320,820);ell(480,650,12,12,'#d8b25a');
 ctx.fillStyle=lgrad(0,1050,0,1110,[[0,'rgba(255,220,140,.6)'],[1,'rgba(255,220,140,0)']]);ctx.fillRect(210,1050,300,60);ctx.fillStyle='#0a0b18';ctx.fillRect(-300,1060,1320,600);if(o.z)['Z','z','Z'].forEach((z,i)=>{const ph=(t*.6+i/3)%1;ctx.globalAlpha=1-ph;txt(z,560+ph*40,400-ph*140,40+i*12,'#cfe0ff',5)});ctx.globalAlpha=1}
const VC=(o,cam,x={})=>mk((t,u)=>sceneVideoCall(t,typeof o=='function'?o(u,t):o),cam,x);
const S=[
 VC({tm:'03:00'},[[1,360,600],[1.12,360,560]],{shake:.7,ov:(t,u)=>{chipPop('📹 ONAM qo‘ng‘iroq qilyapti',360,90,ramp(u,0,.2),'#2fbf5a','#fff',34)},sfx:[[0,'hit'],[.1,'bell']]}),
 mk((t,u)=>nextDoor(t,{z:1}),[[1,360,640],[1.2,360,660]],{sfx:[[0,'tick']]}),
 [VC({tm:'03:00'},[[1,360,600],[1.3,360,500]],{sfx:[[0,'click']]})],
 mk((t,u,m)=>{sceneBedroom(t,{host:false,phoneGlow:1});HP(t,m,{x:360,y:1340,s:2.1,eye:'wide',brow:.8,sweat:0,look:0})},[[1,360,640],[1.15,360,680]],{sfx:[[0,'heart']]}),
 VC({tm:'03:01'},[[1.6,360,420],[2.2,360,360]],{sfx:[[0,'drone']]}),
 mk((t,u,m)=>{sceneBedroom(t,{host:false,phoneGlow:1});HP(t,m,{x:250,y:1340,s:1.8,eye:'wide',brow:1.2,sweat:1,look:-1})},[[1,360,640],[1.3,300,600]],{shake:.8,sfx:[[0,'stinger']]}),
 VC(u=>({tm:'03:01',point:ramp(u,.2,.9),smile:0}),[[1.2,360,560],[1.5,360,560]],{sfx:[[0,'whoosh']]}),
 VC(u=>({tm:'03:01',point:1,smile:0,fig:ramp(u,.3,.7)}),[[1.2,360,560],[1.7,420,500]],{shake:1,flash:u=>u>.3&&u<.36?.5:0,sfx:[[.3,'stinger'],[.5,'heart']]}),
 mk((t,u)=>nextDoor(t,{}),[[1,360,640],[1.4,360,700]],{sfx:[[0,'door']]}),
 mk((t,u,m)=>{nextDoor(t,{});HP(t,m,{x:360,y:1360,s:2.2,eye:'wide',brow:1.5,sweat:1,look:0})},[[1,360,640],[1.2,360,700]],{shake:1.3,sfx:[[0,'silence'],[.3,'hit']]}),
 mk((t,u)=>{ctx.fillStyle='#05060a';ctx.fillRect(-300,-300,1320,1900)},C0,{ov:(t,u)=>{headline(['ORQAGA','QARARDINGMI?'],u*2,250,92,['#fff','#3db4ff']);chipPop('💬 IZOHDA YOZ',360,490,ramp(u,.3,.5),'#fff','#111',40)},sfx:[[0,'pop']]}),
 [mk((t,u,m)=>{ctx.fillStyle='#070b24';ctx.fillRect(-300,-300,1320,1900);HP(t,m,{x:360,y:1340,s:1.8,eye:'open',brow:0,sweat:0,mshape:'smile',look:0})},C0,{ov:(t,u)=>tgChannelCard(t,u),sfx:[[0,'whoosh'],[.4,'ding']]}),
  mk((t,u,m)=>{ctx.fillStyle='#070b24';ctx.fillRect(-300,-300,1320,1900);HP(t,m,{x:360,y:1340,s:1.8,eye:'open',brow:0,sweat:0,mshape:'smile',look:0})},C0,{at:.6,ov:(t,u)=>{tgChannelCard(t,1);subscribeBtn(u,t)},sfx:[[.3,'pop'],[.6,'ding']]})]
];
boot2d({subY:1060});build2d(TIMINGDATA,S,{tail:1.5,kw:["uchda","uxlayapti","jilmayib","qaradi","xonang","barmog'ini","orqangni","ovozi","bolam","telegram","izohda"]});
