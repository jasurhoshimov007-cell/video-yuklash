// KANAL REKLAMASI shabloni. SPEC:{h1:[..],emo:'🤖',chip:'..',bg:'tech|office|cal',kw:[..]}
const HT=(t,m,x={})=>Object.assign({x:360,y:1305,s:1.5,upper:1,t,mouth:m,mshape:'smile',aL:[.3,.1],aR:[.3,.1]},x);
const TECH=(t,m,ex)=>{sceneTech(t);drawHost(HT(t,m,ex))};
const BGF={tech:t=>sceneTech(t),office:t=>sceneOffice(t,{}),cal:t=>sceneCalendar(t,{x:0})};
function hero(t,u,m){BGF[SPEC.bg||'tech'](t);const a=ease(ramp(u,0,.3));ctx.save();ctx.translate(360,640+Math.sin(t*3)*10);ctx.scale(.5+.5*a,.5+.5*a);ctx.font='300px "Noto Color Emoji"';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(SPEC.emo,0,0);ctx.restore();drawHost(HT(t,m,{s:1.3,aR:[2.2,2.5],mshape:'smile'}))}
const S=[
 {cam:[[1,360,640],[1.18,360,600]],scene:(t,u,m)=>hero(t,u,m),ov:(t,u)=>{headline(SPEC.h1,u*2.2,200,92,['#fff','#ffd23a'])},sfx:[[0,'hit'],[.1,'whoosh']]},
 {cam:[[1,360,640],[1.1,360,640]],scene:(t,u,m)=>hero(t,.9,m),ov:(t,u)=>{chipPop(SPEC.chip,360,380,ramp(u,.15,.5),'#ffd23a')},sfx:[[0,'pop'],[.5,'thud']]},
 {cam:[[1,360,640],[1.05,360,640]],scene:(t,u,m)=>TECH(t,m,{aR:[2.2,2.5],look:0}),ov:(t,u)=>{reelCards(t,u);headline(['SHUNDAY','VIDEOLAR KERAKMI?'],u*1.6,150,66,['#fff','#22e4ff'])},sfx:[[0,'whoosh'],[.3,'pop']]},
 {cam:[[1,360,640],[1.05,360,640]],scene:(t,u,m)=>TECH(t,m,{aR:[2.3,2.6],brow:.3}),ov:(t,u)=>{reelCards(t,1);headline(['YASASHNI','O‘RGANASIZMI?'],u*1.6,150,66,['#fff','#ffd23a']);chipPop('🎓 DARSLAR',360,720,ramp(u,.3,.7),'#a855ff','#fff',30)},sfx:[[0,'pop']]},
 {cam:[[1,360,640],[1.04,360,630]],scene:(t,u,m)=>TECH(t,m,{aR:[2.1,2.6]}),ov:(t,u)=>{igProfile(t,u)},sfx:[[0,'whoosh'],[.45,'click']]},
 {cam:[[1,360,640],[1.04,360,630]],scene:(t,u,m)=>TECH(t,m,{aR:[.5,-.3]}),ov:(t,u)=>{tgChannelCard(t,u,{cta:false})},sfx:[[0,'whoosh'],[.4,'pop'],[1.1,'pop'],[1.8,'pop']]},
 {cam:[[1,360,640],[1.06,360,610]],scene:(t,u,m)=>TECH(t,m,{aR:[2.4,2.7],aL:[2.4,2.7],mshape:'smile',brow:-.3}),ov:(t,u)=>{subscribeBtn(u,t);chipPop('❤️ LIKE',200,560,ease(ramp(u,.5,.8)),'#fff','#111',32);chipPop('💬 FIKR YOZING',520,560,ramp(u,.6,.9),'#fff','#111',32)},sfx:[[.3,'pop'],[.9,'ding']]},
];
boot2d({subY:835});build2d(TIMINGDATA,S,{tail:1.2,kw:SPEC.kw||["telegram","obuna","like"]});
