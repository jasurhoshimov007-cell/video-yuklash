const B=(o,cam,x={})=>mk((t,u)=>sceneBus(t,typeof o=='function'?o(u,t):o),cam,x);
const BH=(o,hx,cam,x={})=>mk((t,u,m)=>{sceneBus(t,typeof o=='function'?o(u,t):o);HP(t,m,hx)},cam,x);
const S=[
 B({},[[1,360,640],[1.25,300,700]],{ov:(t,u)=>{ctx.globalAlpha=1-ramp(u,.6,.9);glitchText('00:30',360,200,150,t);ctx.globalAlpha=1;flashFx(u<.05?.35:0,'#9fb6ff')},sfx:[[0,'hit'],[.15,'heart']]}),
 B({clock:'00:30'},[[1,360,640],[1.4,200,700]],{sfx:[[0,'whoosh']]}),
 B({d:.02},[[1.1,360,700],[1.4,250,760]],{sfx:[[0,'stinger']]}),
 B({d:.08,noEyes:0},[[1.8,200,760],[2.4,160,780]],{shake:.8,sfx:[[0,'drone']]}),
 B({d:.3,clock:'2-KUN'},[[1,360,640],[1.3,300,740]],{ov:(t,u)=>{},sfx:[[0,'click'],[.3,'step']]}),
 B({d:.6,clock:'3-KUN'},[[1,360,640],[1.3,300,740]],{sfx:[[0,'step'],[.3,'step']]}),
 BH({d:.1},{s:1.5,y:1330,x:560},[[1.1,500,700],[1.4,480,720]],{sfx:[[0,'heart']]}),
 BH({d:.75},{s:1.5,y:1330,x:560,look:-1},[[1.1,400,700],[1.5,340,720]],{shake:1,sfx:[[0,'drone']]}),
 B({d:.8,clock:'00:31'},[[1,360,640],[1.3,330,740]],{sfx:[[0,'silence']]}),
 B({d:.9},[[1.6,260,760],[2.2,260,740]],{shake:1.2,sfx:[[0,'heart'],[.5,'heart']]}),
 mk((t,u,m)=>{sceneBus(t,{d:1});HP(t,m,{s:1.4,x:560,y:1330})},[[2.2,300,700],[3,290,640]],{shake:1.6,ov:(t,u)=>flashFx(u<.1?.8:0),sfx:[[0,'stinger'],[.05,'hit']]}),
 BH({d:.4},{s:1.4,x:560,y:1330},[[1,360,640],[1.4,400,700]],{shake:1,sfx:[[0,'step'],[.2,'step'],[.4,'step']]}),
 mk((t,u,m)=>{sceneDoor(t,{feet:0,under:.4});HP(t,m,{s:1.6,x:180})},[[1,360,640],[1.2,340,700]],{sfx:[[0,'door'],[.4,'click']]}),
 mk((t,u,m,sh)=>scenePhone(t,{header:'Nomaʼlum',sub:'xabar',alert:1,msgs:[{text:'Ertaga uyingda kutaman',t0:sh.t0+.3,red:1}]}),[[1,360,640],[1.1,360,610]],{sfx:[[.3,'click'],[.4,'stinger']]}),
 mk((t,u,m)=>{sceneBedroom(t,{phoneGlow:1});HP(t,m,{s:2.2,eye:'open',brow:0,sweat:0,mshape:'smile'})},C0,{ov:(t,u)=>{chipPop('❤️ LIKE BOSING',360,420,ramp(u,.2,.6),'#fff','#111',34);subscribeBtn(ramp(u,.3,.9),t)},sfx:[[0,'pop'],[.8,'ding']]}),
 mk((t,u,m)=>{sceneBedroom(t,{phoneGlow:1});HP(t,m,{s:2.2,eye:'open',brow:0,sweat:0})},C0,{ov:(t,u)=>{chipPop('💬 KIM YOZADI?',360,300,ramp(u,.2,.6),'#ffd23a','#111',40)},sfx:[[0,'pop']]}),
];
boot2d({subY:1060});build2d(TIMINGDATA,S,{tail:1.4,kw:["bekatda","yaqinroq","kech","tanish","yuzi","yugurdim","ertaga","like","izohda"]});
