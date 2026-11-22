// ENG ZO'R BAHONALAR
const CLS=E('day',{fog:'#e6eef6',fogD:.006,amb:'#a8b0c0',sun:'#fff4e0',sunDir:[.5,1,.6]});
const HOME=E('warm',{fog:'#f6e2c0',fogD:.006,amb:'#b0a090',sun:'#fff0d8'});
const tch={...LK.teacher},st={...LK.boy,shirt:'#ffffff',pants:'#1a2a5a'},st2={...LK.girl,shirt:'#ffffff',dress:'#1a2a5a'},st3={...LK.kid,shirt:'#ffffff',pants:'#1a2a5a'},uka={...LK.kid,shirt:'#ffd23a'};
const STS=[st,st2,st3,st2,st3,st,st3,st,st2];
function cls(T,o={}){classroom({wall:'#cfe2d4'},T);STS.forEach((l,i)=>{const r=Math.floor(i/3),c=i%3;if(o.skip===i)return;const x=-7+c*7,z=-4+r*6;const f=typeof o.face=='function'?o.face(i):(o.face||'calm');
 C(l,{x,z:z+2.1,y:1.1,sit:1,yaw:PI,face:f,seed:i,...(o.pose?o.pose(i,T):{})},T)})}
const BG=(n,l,c)=>(T,u)=>badge(n,l,u*1.5,c||'#ff7a1a');
const bits=(T,cx,cy)=>{for(let i=0;i<10;i++){const ph=(T*.8+hash(i))%1;B(cx+(hash(i+1)-.5)*4,cy+ph*3,(hash(i+2)-.5)*3,.5,.05,.4,'#f4f4f4',.2)}};
const S=[
 [{cam:[[[0,5,-5.4],[0,4.3,-10],44],[[0,4.8,-6.6],[0,4.3,-10],36]],env:CLS,shake:.08,draw:T=>{cls(T);C(tch,{x:0,z:-10,face:'angry',aR:-1.6+.15*sin(T*9)},T)},ov:(T,u)=>hookTitle(['ENG ZO‘R','5 TA BAHONA'],u*.7+.1,'#ffcf1a'),sfx:[[0,'hit']]}],
 [{cam:[[[0,8,-11],[0,3,4],54],[[3,7.4,-10],[0,3,4],50]],env:CLS,draw:T=>cls(T,{face:'laugh',pose:(i,T)=>({y:1.1+Math.abs(sin(T*9+i))*.3,lean:.2*sin(T*9+i)})}),sfx:[[0,'laugh'],[1,'laugh']]}],
 [{cam:[[[0,5,11],[0,3,0],46],[[0,4.6,9],[0,3,0],40]],env:HOME,draw:T=>{livingRoom({table:false});C({...uka,item:'notebook'},{x:0,z:0,scale:.7,face:'laugh',aR:-1.4+.4*sin(T*12),aL:-1.4-.4*sin(T*12)},T);bits(T,0,2)},ov:BG(5,'UKAM YIRTDI'),sfx:[[0,'pop'],[.3,'whoosh']]}],
 [{cam:[[[2,5.6,6],[-5,3,0],46],[[1,5.2,5],[-5,3,0],40]],env:E('night',{fog:'#0e1426',amb:'#3a4466',sun:'#4a5480',lampPos:[-4,3.5,1.5],lamp:'#fff2c0'}),draw:T=>{bedroom({night:1});C({...st,item:'flashlight'},{x:-5,z:2.2,y:1.1,sit:1,yaw:PI,aR:-1.5,face:'scared'},T)},ov:BG(4,'CHIROQ O‘CHDI'),sfx:[[0,'pop'],[.2,'click']]}],
 [{cam:[[[0,5,9],[0,4,0],42],[[0,4.7,7.5],[0,4.1,0],36]],env:CLS,draw:T=>{classroom({wall:'#cfe2d4'},T);C(st,{x:0,z:0,face:'talk',aR:-2.2,aRz:.6,headYaw:.3},T)},ov:BG(3,'UYDA QOLDI'),sfx:[[0,'pop']]},
  {cam:[[[0,6,7],[0,1.4,0],40],[[0,5,5],[0,1.4,0],34]],env:HOME,draw:T=>{livingRoom();B(0,1.18,0,1.6,.25,2,'#2f6fd6');B(0,1.43,0,1.5,.02,1.9,'#ffffff')},ov:(T,u)=>bubble(360,280,'MANA U!',48,u*1.5)}],
 [{cam:[[[0,4,8],[0,1.6,0],40],[[0,3.6,6],[0,1.6,0],34]],env:HOME,draw:T=>{livingRoom({table:false});cat(0,0,0,T);B(0,.1,2,1.6,.2,1.2,'#2f6fd6');bits(T,0,1)},ov:BG(2,'MUSHUK YEDI'),sfx:[[0,'pop'],[.4,'whoosh']]}],
 [{cam:[[[-3,5.2,-3],[0,4.3,-10],38],[[-2,5,-5],[0,4.3,-10],32]],env:CLS,draw:T=>{cls(T);C(tch,{x:0,z:-10,face:'angry',headYaw:.3,headPitch:.1},T)},ov:(T,u)=>bubble(360,260,'MUSHUGING YO‘Q-KU?',38,u*2)},
  {cam:[[[0,5.6,-.4],[0,4,4.1],40],[[0,5.4,.4],[0,4,4.1],34]],env:CLS,draw:T=>cls(T,{face:i=>i==4?'smirk':'calm'}),ov:(T,u)=>bubble(360,260,'QO‘SHNINIKI!',46,u*2),sfx:[[0,'laugh']]}],
 [{noSplit:1,cam:[[[0,7,-12],[0,3,2],50],[[0,5.6,-.2],[0,4,4.1],38]],env:CLS,draw:T=>cls(T),ov:(T,u)=>badge(1,'BIRINCHI O‘RIN',u*1.5,'#e0a817'),sfx:[[0,'tick'],[.3,'tick'],[.6,'tick'],[.9,'tick'],[1.2,'tick']]}],
 [{cam:[[[1.6,6,-.6],[0,4.4,4.1],42],[[1.2,5.8,.2],[0,4.4,4.1],36]],env:CLS,draw:T=>{cls(T,{skip:4});C(st3,{x:0,z:4.1,yaw:PI,face:'smirk',aL:-.3,aR:-.3,aLz:-.8,aRz:.8},T)},ov:(T,u)=>bubble(360,260,'VAZIFA BERMAGANSIZ!',38,u*1.5),sfx:[[0,'pop']]}],
 [{cam:[[[0,8,-11],[0,3,4],54],[[0,7,-9],[0,3,4],48]],env:CLS,draw:T=>cls(T,{face:'laugh',pose:(i,T)=>({aR:-2.9+.2*sin(T*10+i),y:1.1+Math.abs(sin(T*8+i))*.3})}),ov:(T,u)=>bubble(360,260,'HA, BERMAGANSIZ!',44,u*1.5),sfx:[[0,'cheer']]}],
 [{cam:[[[0,5,-5.4],[0,4.3,-10],40],[[0,4.8,-6.4],[0,4.3,-10],32]],env:CLS,draw:T=>{cls(T);C(tch,{x:0,z:-10,face:'calm',blink:0},T)},sfx:[[0,'silence'],[.4,'tick'],[1.2,'tick']]}],
 [{cam:[[[1,5,-5.4],[0,4.3,-10],44],[[.6,4.8,-6.4],[0,4.3,-10],36]],env:CLS,draw:T=>{cls(T);C(tch,{x:0,z:-10,face:'smirk',aR:-2.4},T)},ov:(T,u)=>{ctx.globalAlpha=ramp(u,.2,.4);const s=1+.1*sin(T*8);ctx.save();ctx.translate(W2/2,300);ctx.scale(s,s);txt('×2',0,0,170,'#ff3b3b',14);ctx.restore();ctx.globalAlpha=1},sfx:[[0,'pop'],[.5,'click']]},
  {cam:[[[0,8,-11],[0,3,4],54],[[0,7,-9],[0,3,4],48]],env:CLS,shake:.2,draw:T=>cls(T,{face:'shock',pose:(i)=>({aL:-2.6,aR:-2.6})}),sfx:[[0,'hit']]}],
 [{cam:[[[0,8,-11],[0,3,4],54],[[0,7,-9],[0,3,4],48]],env:CLS,draw:T=>cls(T,{face:'laugh'}),ov:(T,u)=>{hearts(T,u);bigLike(ramp(u,.1,.5),T)},sfx:[[0,'pop'],[.5,'ding']]}],
 [{noSplit:1,cam:[[[-4,7,-11],[0,3,3],52],[[4,7,-11],[0,3,3],52]],env:CLS,draw:T=>cls(T,{face:'happy',pose:(i,T)=>({aR:-2.8+.4*sin(T*8+i)})}),ov:(T,u)=>ctaCard(ramp(u,0,.5),T),sfx:[[0,'whoosh']]}],
];
boot({fovK:1.2});build(TIMINGDATA,S,{tail:1.4});
