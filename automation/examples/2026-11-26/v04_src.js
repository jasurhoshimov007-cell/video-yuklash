// MAHALLADA 03:00 (1-qism, Telegram)
const kid={...LK.kid,shirt:'#e8a23a',pants:'#2a2d3a',hair:'#1a120c'};
const NM=(T,o={})=>E('night',Object.assign({fog:'#101a34',fogD:.012,amb:'#5a6a98',sun:'#7a8ac0',lamp:'#ffd890',lampPos:[0,6,-4]},o));
const RED=(T)=>E('red',{fog:'#1c070a',fogD:.016,amb:'#8a3a42',sun:'#b04850',lampPos:[0,5,4],lamp:noise1(T*8)>-.3?'#ff4040':'#501010'});
const HX=[-17,-5.5,5.5,17],SK=['#e1b48c','#f0c8a0','#c89a74','#f5d0aa'],SH=['#3a4a8a','#8a3a4a','#3a7a5a','#6a4a8a','#8a6a3a','#2a6a8a','#7a3a7a','#4a4a4a'];
function sil(x,y,z,T,i,o){const s=SK[i%4],c=SH[i%8];B(x,y-1.6,z,1.7,1.7,.8,c);B(x,y+.1,z,1.25,1.25,1.25,s);B(x,y+.75,z,1.3,.35,1.3,i%3==0?'#e8e4da':'#1a120c');
 const eg=o.glow?'#ff2020':'#111';const em=o.glow?1.6:0;B(x-.28,y+.25,z+.64,.24,o.glow?.24:.3,.05,eg,em);B(x+.28,y+.25,z+.64,.24,o.glow?.24:.3,.05,eg,em);B(x,y-.25,z+.64,.4,.08,.05,'#3a1a1a');
 const up=o.up||0,pt=o.point||0;if(up||pt){const L=1.8;const m=chain(M.T(x+.95,y-.9,z),M.RX(-(up*PI*.9+pt*PI*.5)*(1)),M.T(0,L/2,0));BM(m,.5,L,.5,c);BM(chain(m,M.T(0,L/2,0)),.52,.4,.52,s)}}
function mahalla(T,o={}){B(0,-.5,-10,90,.5,60,'#2a2c34');B(0,-.45,0,90,.5,6,'#3a3c46');
 HX.forEach((hx,hi)=>{const H=10;B(hx,0,-12,10,H,9,['#c9b48e','#b8a07a','#cdbd9c','#a89070'][hi]);B(hx,H,-12,11,.6,10,'#6a3a2a');
  [[-2.4,3.2],[2.4,3.2],[-2.4,7.2],[2.4,7.2]].forEach(([dx,dy],wi)=>{const k=hi*4+wi,on=(o.lit===undefined?1:o.lit)>(hash(k)*.6);const wx=hx+dx,wy=dy;
   B(wx,wy-1.6,-7.45,2.6,3.2,.1,on?'#ffd27a':'#141a2a',on?1.1:0);
   if(on&&o.people!==false)sil(wx,wy-.3,-7.1,T,k,o);
   B(wx,wy-1.8,-7.4,3.1,.25,.6,'#e8e2d4');B(wx,wy+1.6,-7.4,3.1,.25,.6,'#e8e2d4');B(wx-1.45,wy-1.6,-7.4,.25,3.2,.6,'#e8e2d4');B(wx+1.45,wy-1.6,-7.4,.25,3.2,.6,'#e8e2d4')})});
 for(let i=-3;i<=3;i++)tree(i*14+3,-2,.7,'#2a4a2a');streetLamp(-9,1,1);streetLamp(9,1,1)}
function ourHouse(T,on){B(0,-.5,0,40,.5,30,'#2a2c34');B(0,0,6,16,10,10,'#cdbd9c');B(0,10,6,17,.6,11,'#6a3a2a');door(0,.95,0,0,'#6b3f26',3,6.2);
 win(-4.8,5,.9,0,2.6,2.6,'#141a2a',0);win(4.8,5,.9,0,2.6,2.6,'#141a2a',0);B(4,.3,.9,2.6,1,.3,on?'#ff3030':'#0a0a10',on?1.8:0);B(4,.2,.8,3,.15,.4,'#888')}
function winFrame(){ctx.save();ctx.fillStyle='#2a2018';ctx.fillRect(0,0,W2,70);ctx.fillRect(0,H2-200,W2,200);ctx.fillRect(0,0,50,H2);ctx.fillRect(W2-50,0,50,H2);ctx.fillRect(W2/2-14,0,28,H2);ctx.fillRect(0,H2*.45,W2,24);ctx.restore()}
const S=[
 [{cam:[[[0,6,22],[0,5,-10],58],[[0,5.6,19],[0,5.2,-10],52]],env:NM,draw:(T,u)=>mahalla(T,{lit:u<.12?0:1}),ov:(T,u)=>{clockTxt('03:00',360,'#ff5050');hookTitle(['TUNGI SOAT UCH...','HAMMA CHIROQ YONDI!'],u*.5+.3)},flash:(u)=>u>.12&&u<.16?.4:0,sfx:[[0,'hit'],[.12,'stinger']]}],
 [{noSplit:1,cam:[[[2,6.5,10.5],[-6,3.4,3],52],[[1.5,6.2,9.5],[-7,3.4,3],48]],env:(T)=>NM(T,{lamp:'#9ab0ff',lampPos:[-9,6,-2]}),draw:(T,u)=>{bedroom({night:1},T);C({...kid,item:'cup'},{x:lerp(-1,-7,u),z:3.5,yaw:-PI/2,scale:.85,face:'sleep',aR:-1.2,...walk(T,5,.35)},T)},sfx:[[0,'step'],[.4,'step']]}],
 [{cam:[[[0,5,15],[0,5,-10],48],[[0,5,12],[0,5.2,-10],42]],env:NM,draw:(T,u)=>mahalla(T),ov:()=>winFrame(),sfx:[[0,'drone']]}],
 [{noSplit:1,cam:[[[-2,4.3,4.2],[-7,3.5,3],40],[[-2.6,4.2,4],[-7,3.5,3],34]],env:(T)=>NM(T,{lamp:'#ffd27a',lampPos:[-11,6,-2]}),draw:(T,u)=>{bedroom({night:1},T);C(kid,{x:-7,z:3,yaw:PI/2,scale:.85,face:'scared',headYaw:.25*sin(T*2)},T)},ov:(T,u)=>subPill(T,u),sfx:[[0,'pop']]}],
 [{cam:[[[-12,5.5,4],[-14,5,-8],44],[[-4,5.5,4],[-2,5,-8],44]],env:NM,draw:(T,u)=>mahalla(T)}],
 [{noSplit:1,cam:[[[-7.9,6.6,-1.5],[-7.9,6.6,-7.5],40],[[-7.9,6.6,-2.5],[-7.9,6.6,-7.5],32]],env:NM,draw:(T,u)=>mahalla(T,{glow:u>.5}),sfx:[[.5,'stinger']]}],
 [{cam:[[[0,6,13],[0,5,-10],52],[[0,5.8,11],[0,5,-10],48]],env:NM,shake:.2,draw:(T,u)=>mahalla(T,{glow:1,up:ease(clamp(u*2,0,1))}),sfx:[[0,'whoosh'],[.1,'thud']]}],
 [{noSplit:1,cam:[[[3,6.6,4],[5.5,6,-8],44],[[3.5,6.4,2.5],[5.5,6,-8],40]],env:RED,draw:(T,u)=>mahalla(T,{glow:1,point:1}),ov:(T,u)=>bigTxt('BIZNING UY!',240,'#ff2a2a',u),sfx:[[0,'hit']]}],
 [{noSplit:1,cam:[[[-2,5.5,-20],[2,3,4],50],[[0,4,-15],[3.5,1.5,1],42]],env:NM,draw:(T,u)=>ourHouse(T,u>.25),flash:(u)=>u>.25&&u<.29?.5:0,sfx:[[.25,'click'],[.3,'stinger']]}],
 [{noSplit:1,cam:[[[-2.4,4.2,3.8],[-7,3.5,3],36],[[-3,4.1,3.6],[-7,3.5,3],30]],env:RED,shake:.4,draw:(T,u)=>{bedroom({night:1},T);C(kid,{x:-7,z:3,yaw:PI/2,scale:.85,face:'shock'},T)},ov:(T,u)=>bigTxt('YERTO‘LA YO‘Q!',230,'#ff2a2a',u),sfx:[[0,'heart'],[.4,'heart']]}],
 [{noSplit:1,cam:[[[-2,5.5,-21],[2,3.5,4],52],[[-1.5,5.2,-19],[2,3.5,4],50]],env:RED,draw:(T,u)=>ourHouse(T,1),ov:(T,u)=>abCard(T,u,'TEKSHIRAMAN','QOCHAMAN'),sfx:[[0,'whoosh'],[.3,'pop'],[.55,'pop']]}],
 [{noSplit:1,cam:[[[0,6,15],[0,5,-10],52],[[0,5.8,13],[0,5,-10],48]],env:RED,draw:(T,u)=>mahalla(T,{glow:1,point:1}),ov:(T,u)=>{endSub(T,u,'DAVOMI ERTAGA!');const a=clamp((u-.5)*3,0,1);ctx.save();ctx.globalAlpha=a;pill(W2/2,700,560,80,'#2aa3ef');txt('✈ TELEGRAM: havola profilda',W2/2,702,32,'#fff',0);ctx.restore()},sfx:[[0,'whoosh'],[.4,'pop']]}],
];
boot({horror:1,global:partBadge,subY:.72});build(TIMINGDATA,S,{tail:1.6});
