const D=(o,cam,x={})=>mk((t,u)=>sceneDoor(t,typeof o=='function'?o(u,t):o),cam,x);
const DH=(o,hx,cam,x={})=>mk((t,u,m)=>{sceneDoor(t,typeof o=='function'?o(u,t):o);HP(t,m,hx)},cam,x);
const S=[
 D({under:.7},[[1,360,640],[1.25,360,900]],{ov:(t,u)=>{ctx.globalAlpha=1-ramp(u,.55,.9);glitchText('01:00',360,200,128,t);ctx.globalAlpha=1},sfx:[[0,'hit'],[.15,'slide']]}),
 DH({},{s:1.5,x:190,y:1330},[[1,360,640],[1.2,300,760]],{sfx:[[0,'step']]}),
 mk((t,u)=>{sceneDark(t);const a=ease(ramp(u,0,.3));ctx.save();ctx.translate(360,560);ctx.rotate(-.05);ctx.scale(.8+.2*a,.8+.2*a);rrect(-260,-150,520,300,18,'#f1ead6');txt('Onang eshik oldida,',0,-40,40,'#222',0);txt('ochma.',0,30,60,'#b3202e',0);ctx.restore()},C0,{sfx:[[0,'click'],[.3,'stinger']]}),
 DH({},{s:2.4,look:0,eye:'wide'},[[1,360,640],[1.1,360,620]],{sfx:[[0,'heart']]}),
 DH({},{s:2.1,eye:'open',brow:0,sweat:0,mshape:'smile'},[[1,360,640],[1.1,360,620]],{sfx:[[0,'pop']]}),
 D({knock:1},[[1,360,640],[1.5,360,700]],{shake:2,sfx:[[0,'knock'],[.5,'knock']]}),
 D({knock:1,under:.9},[[1.2,360,700],[1.6,360,900]],{shake:1.5,sfx:[[0,'knock']]}),
 DH({knock:0},{s:2.2,look:1},[[1,360,640],[1.1,360,620]],{sfx:[[0,'heart']]}),
 mk((t,u,m,sh)=>scenePhone(t,{header:'Onajon',sub:'qo\'ng\'iroq...',msgs:[]}),[[1,360,640],[1.06,360,610]],{sfx:[[0,'tick'],[.4,'click']]}),
 mk((t,u,m)=>{sceneBedroom(t,{phoneGlow:1});HP(t,m,{s:2.3,look:.5,aR:[.7,-2.6]})},C0,{sfx:[[0,'click']]}),
 DH({},{s:2.2,eye:'wide'},[[1,360,640],[1.2,360,600]],{shake:1,sfx:[[0,'heart']]}),
 mk((t,u,m,sh)=>scenePhone(t,{header:'Onajon',sub:'aeroportda',msgs:[{text:'Aeroportdaman, yarim soatda keladi',t0:sh.t0+.3}]}),[[1,360,640],[1.08,360,610]],{sfx:[[.3,'click']]}),
 D({knock:1,feet:1,under:.2},[[1.4,360,800],[2,360,950]],{shake:1.6,sfx:[[0,'knock'],[.4,'knock'],[.8,'knock']]}),
 D({eye:1,feet:1,under:.1,knock:.4},[[1.7,360,360],[2.3,360,340]],{shake:1.2,ov:(t,u)=>{if(u>.75)flashFx((u-.75)*2)},sfx:[[0,'drone'],[.7,'stinger']]}),
 DH({feet:1,under:.1},{s:2.3,look:1},[[1,360,640],[1.1,360,620]],{ov:(t,u)=>{chipPop('❓ KIM U?',360,320,ramp(u,.2,.6),'#ffd23a','#111',44)},sfx:[[0,'heart']]}),
 mk(sceneDark,C0,{ov:(t,u)=>{chipPop('💬 IZOHDA YOZING',360,560,ramp(u,.2,.6),'#ffd23a','#111',38);chipPop('❤️ LIKE BOSING',360,700,ramp(u,.4,.8),'#fff','#111',34)},sfx:[[0,'pop']]}),
 mk(sceneDark,C0,{ov:(t,u)=>{subscribeBtn(ramp(u,.1,.8),t);glitchText('DAVOMI...',360,640,100,t)},sfx:[[0,'pop'],[.8,'ding']]}),
];
boot2d({subY:1060});build2d(TIMINGDATA,S,{tail:1.4,kw:["xat","ochma","onam","eshik","taqilladi","shivirladi","kim","izohda","davomi","obuna"]});
