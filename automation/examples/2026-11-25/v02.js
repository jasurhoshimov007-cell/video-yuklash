// METRO 00:47 — 2D horror (xaritada yo'q bekat), Telegram davomi
function metroMap(t,u){ctx.fillStyle='#e8ecf2';ctx.fillRect(-300,-300,1320,1900);ctx.strokeStyle='#2a6aff';ctx.lineWidth=18;ctx.beginPath();ctx.moveTo(360,120);ctx.lineTo(360,1150);ctx.stroke();
 ['Chilonzor','Novza','Milliy bog‘',null,'Paxtakor','Kosmonavtlar'].forEach((n,i)=>{const y=180+i*180;if(n){ell(360,y,22,22,'#fff');ctx.strokeStyle='#2a6aff';ctx.lineWidth=8;ctx.beginPath();ctx.arc(360,y,22,0,7);ctx.stroke();txt(n,400,y+2,34,'#1a2240',0,'left',900)}
  else{const a=ramp(u,.2,.5);ctx.save();ctx.globalAlpha=a;ell(360,y,30,30,'#111');ell(360,y,16,16,'#ff2a3a');txt('???',400,y+2,46,'#ff2a3a',0,'left',900);ctx.restore()}});
 const p=ease(ramp(u,0,.6));const y=lerp(540,720,p);ctx.save();ctx.translate(360,y);rrect(-26,-40,52,80,14,'#ffb020');ctx.restore()}
const MT=(o,cam,x={})=>mk((t,u,m)=>sceneMetro(t,typeof o=='function'?o(u,t):o),cam,x);
const S=[
 mk((t,u)=>sceneMetro(t,{dim:1,granny:1}),[[1,360,640],[1.15,360,600]],{shake:.8,ov:(t,u)=>{glitchText('00:47',360,230,170,t);chipPop('OXIRGI POYEZD',360,360,ramp(u,.2,.4),'#ff3b4a','#fff',40)},sfx:[[0,'hit'],[.1,'engine'],[.5,'heart']]}),
 mk((t,u,m)=>{sceneMetro(t,{});HP(t,m,{x:220,y:1330,s:1.9,eye:'open',brow:.3,sweat:0,look:.6})},[[1,360,640],[1.1,360,680]],{sfx:[[0,'engine']]}),
 mk((t,u,m)=>{sceneMetro(t,{granny:1});HP(t,m,{x:170,y:1330,s:1.4,eye:'open',brow:.6,sweat:0,look:1})},[[1,400,660],[1.25,480,640]],{sfx:[[0,'tick']]}),
 mk((t,u)=>metroMap(t,u),[[1,360,640],[1.3,360,720]],{sfx:[[0,'whoosh'],[.25,'stinger']]}),
 MT({stop:1,board:'QORA BEKAT',granny:1,dim:1},[[1.2,360,400],[1.9,360,230]],{shake:.5,sfx:[[0,'thud'],[.2,'tick']]}),
 mk((t,u)=>sceneMetroDoors(t,{open:ease(ramp(u,0,.6)),n:0}),[[1,360,640],[1.15,360,640]],{sfx:[[0,'slide'],[.7,'silence']]}),
 mk((t,u,m)=>sceneMetro(t,{stop:1,granny:1,gm:m,gEye:'wide',dim:1}),[[2.2,560,700],[2.6,560,690]],{sfx:[[0,'whoosh']]}),
 mk((t,u)=>sceneMetroDoors(t,{open:1,n:4,eyes:u>.3}),[[1,360,640],[1.35,360,560]],{shake:1,flash:u=>u>.3&&u<.38?.5:0,sfx:[[.3,'stinger'],[.5,'heart']]}),
 mk((t,u)=>scenePhone(t,{time:'00:49',header:'Noma’lum',sub:'hozir',msgs:[{t0:0,text:'Tushgin. Kutyapmiz.',red:1}]}),[[1,360,560],[1.12,360,560]],{sfx:[[0,'ding'],[.4,'tick']]}),
 mk((t,u)=>scenePhone(t,{time:'00:49',header:'ONAM ❤️',sub:'+998 ** *** ** 47',alert:1,msgs:[{t0:-5,text:'Tushgin. Kutyapmiz.',red:1}]}),[[1.2,360,300],[1.6,360,300]],{shake:1,sfx:[[0,'hit'],[.3,'heart']]}),
 mk((t,u,m)=>{sceneMetroDoors(t,{open:1-.4*ramp(u,0,1),n:4,eyes:1});HP(t,m,{x:200,y:1330,s:2})},[[1,360,640],[1.2,360,700]],{shake:1.2,sfx:[[0,'slide'],[.5,'heart']]}),
 ...endShots((t)=>{sceneMetroDoors(t,{open:.55,n:4,eyes:1});ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillRect(-300,-300,1320,1900)})
];
boot2d({subY:1060});build2d(TIMINGDATA,S,{tail:1.4,kw:["qirq","yolg'iz","kampir","xaritada","qora","chiqmadi","tushma","qarab","kutyapmiz","onangniki","yopila","telegram","obuna"]});
