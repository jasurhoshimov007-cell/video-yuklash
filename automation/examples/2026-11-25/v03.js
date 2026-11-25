// TANDIR — qishloq-horror-2d uslubi (tungi ko'k, bitta iliq aksent)
function winView(t,fn){ctx.fillStyle='#1d1a2a';ctx.fillRect(-300,-300,1320,1900);ctx.save();ctx.beginPath();ctx.rect(120,200,480,620);ctx.clip();ctx.translate(-30,-100);fn();ctx.restore();
 ctx.strokeStyle='#5a4636';ctx.lineWidth=24;ctx.strokeRect(120,200,480,620);limb(360,200,360,820,12,'#5a4636');limb(120,510,600,510,12,'#5a4636');ctx.fillStyle='rgba(200,210,235,.2)';ctx.fillRect(100,180,130,680);ctx.fillRect(490,180,130,680)}
function grannyPhoto(t,u){ctx.fillStyle='#151320';ctx.fillRect(-300,-300,1320,1900);rrect(170,230,380,480,10,'#4a3526');rrect(195,255,330,430,6,'#c8c0b0');
 ctx.save();ctx.beginPath();ctx.rect(195,255,330,430);ctx.clip();ctx.fillStyle='#8a8a90';ctx.fillRect(195,255,330,430);drawHost({x:360,y:760,s:1.3,upper:1,t:0,pal:{hood:'#5a5a62',hoodL:'#6a6a72',skin:'#c8c2b8'},scarf:'#e8e8ea',eye:'open',mouth:0,mshape:'smile'});ctx.restore();
 poly([[440,230],[550,230],[550,330]],'#05060a')}
const QC=(lines,a)=>{ctx.save();ctx.globalAlpha=a;ctx.font='bold 54px "DejaVu Serif", serif';ctx.textAlign='center';ctx.fillStyle='#f1ece4';lines.forEach((l,i)=>ctx.fillText(l,360,330+i*72));ctx.restore()};
const S=[
 mk((t,u)=>qVillage(t,{}),[[1.2,360,640],[1.4,300,600]],{shake:.6,ov:(t,u)=>headline(['TANDIRGA','QARAMA!'],u*2,180,110,['#fff','#ff3b4a']),sfx:[[0,'hit'],[.3,'drone']]}),
 mk((t,u)=>qVillage(t,{}),[[1,360,640],[1.15,420,700]],{sfx:[[0,'whoosh']]}),
 mk((t,u,m)=>{qVillage(t,{dog:1});HP(t,m,{x:200,y:1330,s:1.8,eye:'open',brow:.6,sweat:0,look:1})},[[1,360,700],[1.1,400,720]],{sfx:[[.3,'silence']]}),
 mk((t,u,m)=>{sceneTandir(t,{});HP(t,m,{x:180,y:1340,s:1.6,eye:'open',brow:.2,sweat:0,mshape:'smile',look:1})},[[1,360,640],[1.15,420,700]],{sfx:[[0,'whoosh']]}),
 mk((t,u,m)=>{sceneBedroom(t,{host:false});HP(t,m,{x:360,y:1340,s:2,eye:'open',brow:.6,sweat:0})},[[1,360,640],[1.1,360,640]],{ov:(t,u)=>glitchText('03:00',360,220,140,t),sfx:[[0,'tick'],[.4,'tick'],[.8,'tick']]}),
 mk((t,u)=>winView(t,()=>sceneTandir(t,{})),[[1,360,560],[1.3,380,560]],{sfx:[[0,'heart']]}),
 mk((t,u)=>sceneTandir(t,{granny:1,turn:0}),[[1.1,330,640],[1.5,300,620]],{sfx:[[0,'drone'],[.5,'step']]}),
 mk((t,u,m)=>{qNight(t);ctx.fillStyle='#0d1322';ctx.fillRect(-300,600,1320,900);HP(t,m,{x:360,y:1340,s:2.3,eye:'wide',brow:1,sweat:1,look:0})},[[1,360,640],[1.2,360,700]],{sfx:[[.6,'silence']]}),
 mk((t,u)=>sceneTandir(t,{granny:1,turn:u>.35?1:0}),[[1.4,260,560],[2.6,250,520]],{shake:1.4,flash:u=>u>.35&&u<.42?.6:0,flashCol:'#8a1f2c',sfx:[[.33,'stinger'],[.4,'hit']]}),
 mk((t,u)=>sceneTandir(t,{cold:1}),[[1,360,640],[1.3,470,720]],{sfx:[[0,'whoosh']]}),
 mk((t,u,m)=>{grannyPhoto(t,u);HP(t,m,{x:180,y:1350,s:1.5,eye:'wide',brow:1,sweat:1,look:1})},[[1,360,600],[1.15,360,560]],{sfx:[[0,'heart'],[.5,'heart']]}),
 mk((t,u)=>sceneDastur(t,{}),[[1.2,360,780],[1.7,360,760]],{sfx:[[0,'stinger']]}),
 [mk((t,u)=>{ctx.fillStyle='#05060a';ctx.fillRect(-300,-300,1320,1900)},C0,{ov:(t,u)=>QC(['QISHLOG‘INGIZDA HAM','SHUNAQA BO‘LGANMI?'],ramp(u,0,.3)),sfx:[[0,'drone']]}),
  mk((t,u)=>{ctx.fillStyle='#05060a';ctx.fillRect(-300,-300,1320,1900)},C0,{at:.55,ov:(t,u)=>{QC(['QISHLOG‘INGIZDA HAM','SHUNAQA BO‘LGANMI?'],1);subscribeBtn(u,t)},sfx:[[.3,'pop'],[.6,'ding']]})]
];
boot2d({subY:1060});build2d(TIMINGDATA,S,{tail:1.4,kw:["tandirga","qarama","jim","non","uch","buvim","yuzi","muzdek","yo'q","issiq","izohda"]});
