const W=(o,cam,x={})=>mk((t,u)=>sceneWindow(t,typeof o=='function'?o(u,t):o),cam,x);
const WH=(o,hx,cam,x={})=>mk((t,u,m)=>{sceneWindow(t,typeof o=='function'?o(u,t):o);HP(t,m,hx)},cam,x);
const BD=(hx,cam,x={})=>mk((t,u,m)=>{sceneBedroom(t,{phoneGlow:1,glowX:338,glowY:668,alarm:x.alarm});HP(t,m,hx)},cam,x);
const WC=[[1,360,640],[1.1,360,640]],WZ=[[1.2,300,640],[2.4,230,700]];
const S=[
 mk((t,u)=>sceneBedroom(t,{alarm:'02:14'}),[[1,360,640],[1.25,300,660]],{ov:(t,u)=>{ctx.globalAlpha=1-ramp(u,.55,.9);glitchText('02:14',360,200,128,t);ctx.globalAlpha=1},sfx:[[0,'hit'],[.15,'heart']]}),
 W({lit:0},[[1,360,640],[1.3,340,640]],{sfx:[[0,'whoosh']]}),
 W(u=>({lit:1,fig:ramp(u,0,.6)}),[[1,360,640],[1.6,300,620]],{sfx:[[0,'stinger']]}),
 W({lit:1,fig:1},WZ,{shake:1,sfx:[[0,'heart'],[.5,'heart']]}),
 BD({s:2.3,look:1},[[1,360,640],[1.1,360,620]],{sfx:[[0,'click']]}),
 W({lit:0},[[1.5,300,640],[1.8,300,640]],{sfx:[[0,'click'],[.3,'drone']]}),
 W({lit:1,fig:1,wave:1},[[1.4,300,640],[2.2,230,700]],{shake:1,sfx:[[0,'stinger']]}),
 BD({s:2.4,look:.5,aR:[.35,-.2]},[[1,360,640],[1.1,360,620]],{sfx:[[0,'heart']]}),
 W({lit:1,fig:1,wave:1},[[1.6,300,640],[2.4,230,700]],{shake:1.2,sfx:[[0,'heart']]}),
 mk((t,u,m)=>{sceneBedroom(t,{phoneGlow:1});HP(t,m,{s:2.4,aR:[2.4,2.7],look:1})},[[1,360,640],[1.2,360,600]],{shake:1,ov:(t,u)=>flashFx(u<.1?.7:0),sfx:[[0,'hit']]}),
 W({lit:1,fig:1,wave:1},[[1.8,230,700],[2.6,230,700]],{shake:1,sfx:[[0,'drone']]}),
 W({lit:1,fig:1,wave:1},[[1.1,360,640],[1.5,300,640]],{ov:(t,u)=>glitchText('?',360,300,200,t),sfx:[[0,'silence']]}),
 mk((t,u)=>scenePhone(t,{header:'Men',sub:'mening raqamim',alert:1,msgs:[]}),[[1,360,640],[1.06,360,610]],{sfx:[[0,'click'],[.2,'stinger']]}),
 mk((t,u,m,sh)=>scenePhone(t,{header:'Men',sub:'mening raqamim',alert:1,msgs:[{text:'Orqangga qara',t0:sh.t0+.4,red:1}]}),[[1,360,640],[1.1,360,610]],{sfx:[[.4,'click'],[.5,'stinger']]}),
 W({lit:0},[[1,360,640],[1.2,300,640]],{ov:(t,u)=>{vignette(.4)},sfx:[[0,'drone']]}),
 BD({s:2.2,eye:'open',mshape:'smile',brow:0,sweat:0},[[1,360,640],[1.08,360,620]],{ov:(t,u)=>{chipPop('❤️ LIKE BOSING',360,420,ramp(u,.2,.6),'#fff','#111',34)},sfx:[[0,'pop']]}),
 BD({s:2.2,eye:'open',brow:0},[[1,360,640],[1.08,360,620]],{ov:(t,u)=>{subscribeBtn(ramp(u,.1,.8),t);chipPop('💬 IZOHDA YOZING',360,420,ramp(u,.3,.7),'#ffd23a','#111',34)},sfx:[[0,'pop'],[.7,'ding']]})
];
boot2d({subY:1060});build2d(TIMINGDATA,S,{tail:1.4,kw:["odam","derazasiga","ko'tarilgan","mening","orqangga","qara","like","obuna","izohda"]});
