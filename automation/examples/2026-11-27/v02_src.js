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
const PART='2-QISM';
const crowd=[LK.man,LK.mom,LK.dad,LK.kampir,LK.guest,LK.girl||LK.mom];
function walkers(T,u,zs,ze,o={}){crowd.forEach((L,i)=>{const x=-7+i*2.8;C(L,{x,z:lerp(zs,ze,u)+hash(i)*2,yaw:o.yaw===undefined?PI:o.yaw,scale:.9,face:'glow',...walk(T+i*.3,4,.3)},T)})}
const S=[
 [{noSplit:1,cam:[[[-2,5.5,-20],[2,2,4],50],[[-1,4.5,-16],[3.5,1.2,1],42]],env:RED,draw:(T,u)=>ourHouse(T,1),ov:(T,u)=>hookTitle(['YERTO‘LA YO‘Q...','CHIROQ YONYAPTI!'],u*.5+.3),sfx:[[0,'hit'],[.1,'whoosh']]}],
 [{noSplit:1,cam:(u,T)=>{const z=lerp(-4,2,u);return[[[2,4.5,z+9],[0,3,z-6],48]]},env:NM,draw:(T,u)=>{mahalla(T,{lit:0,people:false});C(kid,{x:0,z:lerp(-4,2,u),yaw:0,scale:.85,face:'scared',...run(T,9,.6)},T)},ov:(T,u)=>cmtBubbles(T,u,['B','qochaman!','b b b'],'KO‘PCHILIK: QOCH!'),sfx:[[0,'step'],[.2,'step'],[.4,'step'],[.6,'step']]}],
 [{cam:[[[0,6,22],[0,5,-10],58],[[0,5.6,19],[0,5.2,-10],52]],env:NM,draw:(T,u)=>mahalla(T,{lit:0,people:false}),ov:(T,u)=>bigTxt('HECH KIM YO‘Q...',240,'#ffffff',u,90),sfx:[[0,'drone']]}],
 [{noSplit:1,cam:[[[.6,4.4,7.5],[0,3.8,2],34],[[.4,4.3,6.8],[0,3.8,2],30]],env:NM,draw:(T,u)=>{mahalla(T,{lit:0,people:false});C(kid,{x:0,z:2,yaw:0,scale:.85,face:'scared',headYaw:.35*sin(T*2)},T)},ov:(T,u)=>subPill(T,u),sfx:[[0,'pop']]}],
 [{noSplit:1,cam:[[[-5,5,-14],[2,2,3],50],[[-4,4.6,-12],[2,2,3],46]],env:RED,shake:.1,draw:(T,u)=>{ourHouse(T,1);C(kid,{x:-1,z:-4,yaw:0,scale:.85,face:'scared'},T)},sfx:[[0,'door'],[.5,'drone']]}],
 [{noSplit:1,cam:[[[6,3,-9],[3,1.2,1],46],[[5.4,2.6,-7.5],[3.5,1,1],40]],env:RED,draw:(T,u)=>ourHouse(T,noise1(T*6)>-.4),ov:(T,u)=>bigTxt('BOLAM... PASTGA TUSH',230,'#ff2a2a',u,74),sfx:[[0,'stinger']]}],
 [{noSplit:1,cam:[[[-2.4,4.2,3.8],[-7,3.5,3],36],[[-3,4.1,3.6],[-7,3.5,3],30]],env:RED,shake:.3,draw:(T,u)=>{bedroom({night:1},T);C(kid,{x:-7,z:3,yaw:PI/2,scale:.85,face:'shock'},T)},ov:(T,u)=>{bigTxt('BUVIM 10 YIL OLDIN...',230,'#ffe14d',u,74)},sfx:[[0,'heart'],[.4,'heart']]}],
 [{cam:[[[0,6,13],[0,5,-10],52],[[0,5.8,11],[0,5,-10],48]],env:NM,shake:.15,draw:(T,u)=>mahalla(T,{lit:clamp(u*3,0,1),glow:1}),flash:(u)=>u<.05?.4:0,sfx:[[0,'door'],[.15,'door'],[.3,'door'],[.45,'stinger']]}],
 [{cam:[[[0,5,18],[0,3,0],50],[[0,4.8,15],[0,3,0],46]],env:NM,draw:(T,u)=>{mahalla(T,{lit:1,people:false});walkers(T,u,-6,4,{yaw:0})},sfx:[[0,'step'],[.25,'step'],[.5,'step'],[.75,'step']]}],
 [{noSplit:1,cam:[[[-2,5.5,-24],[2,3,4],52],[[-1.5,5,-20],[2,3,4],46]],env:RED,draw:(T,u)=>{ourHouse(T,1);walkers(T,u,-12,-6,{yaw:0})},ov:(T,u)=>bigTxt('SIZNING UYINGIZGA!',240,'#ff2a2a',u,84),sfx:[[0,'whoosh'],[.2,'hit']]}],
 [{noSplit:1,cam:[[[-2,5.5,-21],[2,3.5,4],52],[[-1.5,5.2,-19],[2,3.5,4],50]],env:RED,draw:(T,u)=>{ourHouse(T,1);walkers(T,1,-8,-6,{yaw:0})},ov:(T,u)=>askCmt(T,u,'SEN NIMA QILARDING?'),sfx:[[0,'whoosh'],[.3,'pop']]}],
 [{noSplit:1,cam:[[[0,6,15],[0,5,-10],52],[[0,5.8,13],[0,5,-10],48]],env:RED,draw:(T,u)=>mahalla(T,{glow:1,point:1}),ov:(T,u)=>tgEnd(T,u),sfx:[[0,'whoosh'],[.4,'pop']]}],
];
boot({horror:1,global:partBadge,subY:.72});build(TIMINGDATA,S,{tail:1.8});
