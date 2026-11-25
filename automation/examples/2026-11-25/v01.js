// QOR ODAM — 2D horror (qorli hovli, har kecha yaqinlashadi)
const Y=(o)=>(t,u)=>sceneSnowYard(t,typeof o=='function'?o(u,t):o);
const kid=(t,x,y,s,m)=>drawHost({x,y,s,upper:1,t,pal:{hood:'#e0752a',hoodL:'#f09a4a'},eye:'open',mouth:m||0,mshape:'smile',aL:[.3,.2],aR:[2.2,2.4]});
const S=[
 mk(Y({sm:2,glow:1}),[[1.3,560,820],[1.6,560,780]],{shake:.8,ov:(t,u)=>headline(['HAR KECHA','1 QADAM!'],u*2,170,104,['#fff','#ff3b4a']),sfx:[[0,'hit'],[.2,'whoosh'],[.6,'heart']]}),
 mk(Y({noSm:1,winLit:1,sm:0}),[[1,360,640],[1.12,360,600]],{sfx:[[0,'whoosh']]}),
 mk((t,u,m)=>{sceneSnowYard(t,{noSm:1,winLit:1});snowman(330,1000,.75);kid(t,520,1040,.75,0);HP(t,m,{x:170,y:1330,s:1.5,eye:'open',brow:0,sweat:0,mshape:'smile',look:.5})},[[1,360,700],[1.1,360,720]],{sfx:[[0,'pop'],[.5,'step']]}),
 mk((t,u)=>{sceneSnowYard(t,{noSm:1});snowman(330,1000,.75,{glow:ramp(u,.6,.9)})},[[2.2,330,820],[2.8,330,815]],{sfx:[[.6,'tick']]}),
 mk(Y({sm:0}),[[1,360,640],[1.5,140,760]],{ov:(t,u)=>chipPop('1-KUN: DARVOZA',360,200,ramp(u,0,.3)),sfx:[[0,'whoosh'],[.3,'pop']]}),
 mk((t,u,m)=>{sceneWinInside(t,{sm:0});kid(t,540,1260,1.3,m*.5);HP(t,m,{x:200,y:1330,s:1.8,eye:'open',brow:.5,sweat:0,look:1})},C0,{sfx:[[0,'laugh']]}),
 mk(Y({sm:1}),[[1,360,640],[1.5,430,780]],{ov:(t,u)=>chipPop('2-KUN: AYVON',360,200,ramp(u,0,.3),'#ff9a3a'),sfx:[[0,'step'],[.3,'pop']]}),
 mk(Y({sm:2}),[[1.1,500,760],[1.7,545,700]],{shake:.6,ov:(t,u)=>chipPop('3-KUN: DERAZA',360,200,ramp(u,0,.3),'#ff3b4a','#fff'),sfx:[[0,'stinger']]}),
 mk((t,u,m)=>{sceneSnowYard(t,{sm:2});HP(t,m,{x:200,y:1330,s:1.9})},[[1,360,640],[1.15,360,700]],{ov:(t,u)=>{const a=ease(ramp(u,.1,.4));ctx.save();ctx.globalAlpha=a;txt('0 IZ',360,240,150,'#ff3b4a',20);ctx.restore()},sfx:[[0,'heart'],[.5,'heart']]}),
 mk((t,u,m)=>{sceneWinInside(t,{sm:2,glow:ramp(u,.4,.9)});HP(t,m,{x:360,y:1360,s:1.9,look:0})},[[1,360,640],[1.25,360,560]],{sfx:[[0,'drone'],[.6,'heart']]}),
 mk((t,u)=>{sceneWinInside(t,{noSm:1,sm:2})},[[1.2,360,560],[1.45,420,620]],{sfx:[[0,'silence'],[.4,'tick']]}),
 mk((t,u,m)=>{ctx.fillStyle='#0d1230';ctx.fillRect(-300,-300,1320,1900);ctx.globalAlpha=.6+.4*ramp(u,.3,.8);snowman(560,1250,2.4,{glow:1});ctx.globalAlpha=1;HP(t,m,{x:300,y:1340,s:2.3,look:1,brow:1.4})},[[1,360,640],[1.2,330,700]],{shake:1.4,flash:u=>u<.1?.7:0,ov:(t,u)=>{ctx.fillStyle='rgba(200,230,255,.12)';ctx.fillRect(0,0,W2,H2)},sfx:[[0,'stinger'],[.1,'whoosh']]}),
 [mk((t,u,m)=>{sceneWinInside(t,{noSm:1})},C0,{ov:(t,u)=>{ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(0,0,W2,H2);headline(['ORQAGA','QARARDINGMI?'],u*2,230,92,['#fff','#3db4ff']);chipPop('💬 IZOHDA YOZ',360,470,ramp(u,.3,.5),'#fff','#111',40)},sfx:[[0,'pop']]}),
  mk((t,u)=>{sceneWinInside(t,{noSm:1})},C0,{at:.6,ov:(t,u)=>{ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(0,0,W2,H2);subscribeBtn(u,t)},sfx:[[.3,'pop'],[.6,'ding']]})]
];
boot2d({subY:1060});build2d(TIMINGDATA,S,{tail:1.4,kw:["qor","qadam","tosh","ikkinchi","uchinchi","iz","yo'q","nafas","izohda"]});
