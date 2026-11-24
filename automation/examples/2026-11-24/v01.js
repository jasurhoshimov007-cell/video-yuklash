const ST=(o,cam,x={})=>mk((t,u)=>sceneStairs(t,typeof o=='function'?o(u,t):o),cam,x);
const SH=(o,m,hx,cam,x={})=>mk((t,u,mm)=>{sceneStairs(t,typeof o=='function'?o(u,t):o);HP(t,mm,hx)},cam,x);
const S=[
 ST({steps:14,flick:1},[[1,360,640],[1.25,360,600]],{ov:(t,u)=>{ctx.globalAlpha=1-ramp(u,.5,.9);glitchText('23:40',360,200,128,t);ctx.globalAlpha=1},sfx:[[0,'hit'],[.15,'heart']]}),
 SH({steps:14},0,{s:1.4,y:1300,x:180},[[1,360,640],[1.2,300,700]],{sfx:[[0,'step'],[.5,'step']]}),
 ST({steps:14,label:'13',lcol:'#ffe14d'},[[1,360,640],[1.3,360,700]],{sfx:[[0,'pop']]}),
 SH({steps:14},0,{s:2.3,look:.2},[[1,360,640],[1.1,360,600]],{sfx:[[0,'heart']]}),
 ST(u=>({steps:Math.floor(1+u*13),label:String(Math.max(1,Math.ceil(u*13))),lcol:'#fff'}),[[1,360,640],[1.4,360,760]],{sfx:[[0,'step'],[.3,'step'],[.6,'step']]}),
 [ST({steps:14,label:'14',lcol:'#ff3b5c',flick:1},[[1.1,360,640],[1.6,360,700]],{shake:1,ov:(t,u)=>flashFx(u<.12?.6:0,'#ff2a3a'),sfx:[[0,'stinger']]})],
 ST(u=>({steps:14,fig:.12+u*.05}),[[1,360,500],[1.8,360,560]],{sfx:[[0,'drone'],[.5,'step']]}),
 SH({steps:14,fig:.2},0,{s:2.5,look:1},[[1.1,360,640],[1.5,360,620]],{shake:1,sfx:[[0,'heart'],[.7,'heart']]}),
 ST({steps:14,fig:.25},[[1.5,360,520],[1.5,360,520]],{sfx:[[0,'silence']]}),
 mk((t,u)=>{sceneStairs(t,{steps:14,fig:.3});flashFx(.04)},[[1,360,640],[2,360,520]],{sfx:[[0,'click'],[.2,'thud']]}),
 ST(u=>({steps:40,fig:.35}),[[1,360,500],[2.4,360,480]],{sfx:[[0,'drone']]}),
 ST(u=>({steps:40,fig:.35+u*.5,label:String(20+Math.floor(u*2)),lcol:'#ff3b5c'}),[[1.2,360,560],[1.8,360,640]],{shake:1,sfx:[[0,'step'],[.3,'step'],[.6,'step'],[.9,'heart']]}),
 mk(sceneDark,C0,{ov:(t,u)=>{ctx.globalAlpha=.8;glitchText('...',360,640,160,t)},sfx:[[0,'silence']]}),
 SH({steps:14,fig:.0},0,{s:2.8,look:-1,tilt:-.1},[[1,360,640],[1.5,320,700]],{shake:1.2,sfx:[[0,'heart'],[.5,'heart']]}),
 mk((t,u)=>{sceneStairs(t,{steps:14,fig:.95});HP(t,0,{s:1.4,y:1330,x:130})},[[1,360,640],[1.5,360,560]],{shake:2,ov:(t,u)=>{flashFx(u<.1?.9:0);glitchText('15',360,260,200,t)},sfx:[[0,'stinger'],[.05,'hit']]}),
 ...endShots(sceneDark)
];
boot2d({subY:1060});build2d(TIMINGDATA,S,{tail:1.4,kw:["lift","o'n","uchta","cheksiz","ovozim","nafas","shivirladi","o'n","davomi","telegram","obuna"]});
