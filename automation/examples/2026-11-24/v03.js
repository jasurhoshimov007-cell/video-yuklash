const M=(o,cam,x={})=>mk((t,u)=>sceneMonitor(t,typeof o=='function'?o(u,t):o),cam,x);
const MH=(o,hx,cam,x={})=>mk((t,u,m)=>{sceneMonitor(t,typeof o=='function'?o(u,t):o);HP(t,m,hx)},cam,x);
const S=[
 M({time:'03:20:11'},[[1,360,640],[1.2,360,620]],{ov:(t,u)=>{ctx.globalAlpha=1-ramp(u,.55,.9);glitchText('03:20',360,200,128,t);ctx.globalAlpha=1},sfx:[[0,'hit'],[.15,'heart']]}),
 M({time:'03:20:14'},[[1.2,360,620],[1.9,340,600]],{sfx:[[0,'whoosh']]}),
 M({time:'03:20:20'},[[1,360,640],[1.4,360,600]],{sfx:[[0,'click']]}),
 M(u=>({time:'03:21:05',fig:ramp(u,.3,1)}),[[1.2,300,620],[1.6,300,600]],{shake:1,sfx:[[0,'stinger']]}),
 MH({fig:0},{s:1.6,y:1330,x:180},[[1,360,640],[1.1,300,680]],{sfx:[[0,'step'],[.3,'step']]}),
 mk((t,u,m)=>{sceneKitchen(t,{});HP(t,m,{s:2.1,look:1})},[[1,360,640],[1.1,360,620]],{sfx:[[0,'door']]}),
 M({time:'03:22:00'},[[1.3,360,620],[1.3,360,620]],{sfx:[[0,'heart']]}),
 M({time:'03:22:10',fig:1},[[1.1,360,640],[1.1,360,640]],{sfx:[[0,'drone']]}),
 M({time:'03:22:15',fig:1},[[1.6,330,600],[2.2,330,570]],{shake:1.2,sfx:[[0,'heart'],[.6,'heart']]}),
 M({time:'03:22:30',fig:1},[[1.3,330,620],[1.5,330,600]],{ov:(t,u)=>{ctx.save();ctx.globalAlpha=.9;txt('😄',200,520,100);ctx.restore()},sfx:[[0,'pop']]}),
 MH({fig:1},{s:2.2,look:.2},[[1,360,640],[1.1,360,620]],{sfx:[[0,'heart']]}),
 MH({fig:1,fig2:1},{s:2.2,look:1},[[1,360,640],[1.1,360,620]],{shake:1,sfx:[[0,'stinger']]}),
 M({time:'03:23:01',fig:1,fig2:1},[[1.5,420,600],[1.9,500,580]],{shake:1.2,sfx:[[0,'drone']]}),
 MH({fig2:1},{s:2.4,look:1,tilt:.1},[[1,360,640],[1.4,420,640]],{shake:1.5,sfx:[[0,'heart'],[.5,'heart']]}),
 mk((t,u)=>{sceneMonitor(t,{fig2:1,time:'03:23:09'});if(u>.7)flashFx(.9)},[[2,560,420],[2.6,560,400]],{shake:2,sfx:[[0,'stinger'],[.6,'hit']]}),
 mk((t,u,m)=>{sceneDark(t);ctx.fillStyle='#000'},C0,{ov:(t,u)=>{glitchText('SIGNAL YO\'Q',360,520,90,t);chipPop('DAVOMI BORMI?',360,700,ramp(u,.2,.6),'#ffd23a','#111',34)},sfx:[[0,'silence']]}),
 mk((t,u,m)=>{sceneDark(t)},C0,{ov:(t,u)=>{subscribeBtn(ramp(u,.1,.8),t);chipPop('💬 IZOHDA: DAVOMI',360,560,ramp(u,.2,.6),'#ffd23a','#111',36);chipPop('❤️ LIKE',360,700,ramp(u,.4,.8),'#fff','#111',34)},sfx:[[0,'pop'],[.7,'ding']]})
];
boot2d({subY:1060});build2d(TIMINGDATA,S,{tail:1.4,kw:["monitori","soya","qizim","kulib","orqangdagi","o'girildim","davomini","izohda","davomi"]});
