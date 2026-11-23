// KANAL REKLAMASI — "1 kunlik prezident" (2D, ~23 s)
const HT=(t,m,x={})=>Object.assign({x:360,y:1305,s:1.5,upper:1,t,mouth:m,mshape:'smile',aL:[.3,.1],aR:[.3,.1]},x);
const TECH=(t,m,ex,fn)=>{sceneTech(t);fn&&fn();drawHost(HT(t,m,ex))};
const S=[
 {cam:[[1,360,640],[1.18,360,600]],scene:(t,u,m)=>sceneOffice(t,{host:{mouth:m,eye:'open',brow:-.2}}),ov:(t,u)=>{headline(['1 KUNLIK','PREZIDENT?'],u*2.2,200,92,['#fff','#ffd23a']);emoCrown(u)},sfx:[[0,'hit'],[.1,'whoosh']]},
 {cam:[[1,360,640],[1.1,360,640]],scene:(t,u)=>sceneCalendar(t,{x:ramp(u,.25,.7)}),ov:(t,u)=>{if(u>.7)chipPop('DUSHANBA BEKOR!',360,1010-130,ramp(u,.7,.9),'#ffd23a')},sfx:[[.5,'thud'],[1,'hit'],[1.2,'cheer']]},
 {cam:[[1,360,640],[1.05,360,640]],scene:(t,u,m)=>TECH(t,m,{aR:[2.2,2.5],look:0},null),ov:(t,u)=>{reelCards(t,u);headline(['SHUNDAY','VIDEOLAR KERAKMI?'],u*1.6,150,66,['#fff','#22e4ff'])},sfx:[[0,'whoosh'],[.3,'pop']]},
 {cam:[[1,360,640],[1.05,360,640]],scene:(t,u,m)=>TECH(t,m,{aR:[2.3,2.6],brow:.3},null),ov:(t,u)=>{reelCards(t,1);headline(['YASASHNI','O‘RGANASIZMI?'],u*1.6,150,66,['#fff','#ffd23a']);chipPop('🎓 DARSLAR',360,720,ramp(u,.3,.7),'#a855ff','#fff',30)},sfx:[[0,'pop']]},
 {cam:[[1,360,640],[1.04,360,630]],scene:(t,u,m)=>TECH(t,m,{aR:[2.1,2.6]},null),ov:(t,u)=>{igProfile(t,u);},sfx:[[0,'whoosh'],[.45,'click']]},
 {cam:[[1,360,640],[1.04,360,630]],scene:(t,u,m)=>TECH(t,m,{aR:[.5,-.3]},null),ov:(t,u)=>{tgChannelCard(t,u,{cta:false})},sfx:[[0,'whoosh'],[.4,'pop'],[1.1,'pop'],[1.8,'pop']]},
 {cam:[[1,360,640],[1.04,360,630]],scene:(t,u,m)=>TECH(t,m,{eye:'wide',mshape:'smile'},null),ov:(t,u)=>{tgChannelCard(t,1,{cta:true});chipPop('⚡ BIRINCHI BO‘LIB!',360,730,ramp(u,.2,.5),'#ffd23a')},sfx:[[0,'pop'],[.6,'ding']]},
 {cam:[[1,360,640],[1.06,360,610]],scene:(t,u,m)=>TECH(t,m,{aR:[2.4,2.7],aL:[2.4,2.7],mshape:'smile',brow:-.3},null),ov:(t,u)=>{subscribeBtn(u,t);const a=ease(ramp(u,.5,.8));chipPop('❤️ LIKE',200,560,a,'#fff','#111',32);chipPop('💬 FIKR YOZING',520,560,ramp(u,.6,.9),'#fff','#111',32)},sfx:[[.3,'pop'],[.9,'ding']]},
];
function emoCrown(u){}
boot2d({subY:835});build2d(TIMINGDATA,S,{tail:1.2,kw:["prezident","dushanbani","telegram","kanalimizga","pul","yangiliklaridan","obuna","like"]});
