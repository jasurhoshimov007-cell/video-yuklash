// TUNGI YO'LOVCHI
const NIGHT=E('night',{fog:'#141c34',fogD:.016,amb:'#5a6490',sun:'#7a88c0',lampPos:[0,9,0],lamp:'#ffb060'});
const CAR=(T)=>E('night',{fog:'#121a30',fogD:.016,amb:'#7a84a8',sun:'#8a96c4',lampPos:[6,9,-14+((T*30)%24)],lamp:'#d0a070'});
const FOG=E('night',{fog:'#4a5468',fogD:.04,amb:'#7a82a0',sun:'#9aa2c0'});
const RED=E('red',{fog:'#200608',amb:'#8a4a54',sun:'#b05a64',lampPos:[0,8,2],lamp:'#ff3030'});
const drv={...LK.man,shirt:'#3a6a9a',hat:'cap',hatCol:'#1a2a4a'};
const pas={skin:'#c8ccd0',shirt:'#3a3d4a',coat:'#30333e',pants:'#16171c',shoes:'#0a0a0a',hat:'hood',hatCol:'#24262e',eye:'#0a0a0a',eyeGlow:'#e8f0ff'};
function bigCar(x,y,z,ry=0,roll=0,o={}){const m=chain(M.T(x,y,z),M.RY(ry),M.RZ(roll));const P=(px,py,pz,sx,sy,sz,c,em=0)=>BM(chain(m,M.T(px,py+sy/2,pz)),sx,sy,sz,c,em);const Y='#e0b020';
 P(0,.3,0,9,.9,20,Y);for(const s of[-1,1]){P(s*4.3,1.2,0,.4,2.2,20,Y);for(let i=0;i<10;i++)P(s*4.52,2.5,-9+i*2,.05,.5,1,i%2?'#111111':'#ffffff',.1);P(s*4.55,0,-6,.6,2,2.4,'#141414');P(s*4.55,0,6,.6,2,2.4,'#141414');P(s*4.2,3.4,-6.6,.3,3.6,.3,'#c89818')}
 P(0,1.2,-8.5,9,2.2,3,Y);P(0,1.2,8.5,9,2.2,3,Y);P(0,1.2,-6.4,8.4,2.6,1.2,'#1a1a20');P(1.5,3.8,-5.75,1,.3,.05,'#40ff90',.8);
 R.box(chain(m,M.T(-2.2,4.3,-5.5),M.RX(-.4),M.S(1.6,1.6,.2)),'#0e0e12');
 for(const s of[-1,1]){P(s*2.2,1.2,-2.4,3.2,1,3,'#5a3030');P(s*2.2,2.2,-.8,3.2,3.4,.6,'#5a3030')}P(0,1.2,4.2,8.2,1,3,'#5a3030');P(0,2.2,5.8,8.2,3.4,.6,'#5a3030');
 P(0,7,-6.6,8.7,.3,.3,'#c89818');P(0,7.3,-6.6,2,.6,.6,'#ffffff',.6);P(0,6.1,-6.4,1.4,.45,.15,'#3a3d46',.2);
 const L=o.lights===undefined?1:o.lights;for(const s of[-3,3]){P(s,1.8,-10.05,1.6,.7,.1,L?'#fff6d0':'#555555',L?2:0);P(s,1.8,10.05,1.4,.6,.1,'#d02020',L?1.2:.2)}}
function road(T,off=0,o={}){B(0,-.6,-60,140,.5,280,'#1e2a22');B(0,-.5,-60,16,.5,280,'#2a2a30');
 for(let z=40;z>-220;z-=8){const zz=((z+off)%260+260)%260-220;B(0,-.22,zz,.3,.05,3,'#d8d8c0',.3)}
 for(let z=40;z>-220;z-=24){const zz=((z+off)%264+264)%264-220;streetLamp(-10,zz,1);streetLamp(10,zz+12,1);tree(-18,zz+6,1.2,'#1e3a26');tree(19,zz-4,1.4,'#1e3a26')}
 if(o.rain)rainDrops(T,0,0)}
const SIT=(l,p,T)=>C(l,{y:2,sit:1,yaw:PI,...p},T);
const D0={x:-2.2,z:-2.2},P0={x:2.2,z:4.4};
function ride(T,o={}){road(T,T*30,o);bigCar(0,0,0);if(o.d!==false)SIT(drv,{...D0,face:o.df||'calm',...(o.dp||{})},T);if(o.p)SIT(pas,{...P0,face:o.pf||'none',...(o.pp||{})},T)}
function bridge(T){B(0,-3,-40,160,.5,220,'#1e2a22');B(0,-2.8,-40,220,.2,24,'#203048',.2);
 B(0,4.5,-40,14,.6,160,'#3a3a40');for(const sx of[-7.2,7.2]){B(sx,5,-40,.4,1.4,160,'#6a6a70')}for(let z=20;z>-120;z-=14){B(-6,-3,z,1.5,7.5,1.5,'#4a4a50');B(6,-3,z,1.5,7.5,1.5,'#4a4a50');streetLamp(-8,z,1)}}
const WR=E('night',{fog:'#3a4458',fogD:.028,amb:'#8088a6',sun:'#a0a8c6',lampPos:[-8,4,-20],lamp:'#ffb060'});
function wreck(T){bigCar(-12,-2.6,-28,.7,.35,{lights:0});for(let i=0;i<5;i++){const ph=(T*.5+i/5)%1;B(-12+sin(i)*.8,0+ph*7,-28+ph,1.2+ph,1.2+ph,1.2+ph,'#6a6a72',0)}}
const MIR=()=>mirrorMask();
const S=[
 [{cam:[[[0,6.4,-6.1],[1.6,4.4,4.4],48],[[0,6.4,-6.1],[1.8,4.5,4.4],42]],env:CAR,draw:T=>ride(T,{d:false}),ov:(T,u)=>{MIR();hookTitle(['KO‘ZGUDA','KO‘RINMAYDI'],u*.6+.15)},sfx:[[0,'hit'],[0,'engine']]},
  {at:.5,cam:[[[-3,7.4,-5],[2.2,4.8,4.4],48],[[-2.6,7,-3.6],[2.2,4.9,4.4],40]],env:CAR,shake:.1,draw:T=>ride(T,{p:1,pf:'glow'}),ov:(T,u)=>hookTitle(['KO‘ZGUDA','KO‘RINMAYDI'],.8),sfx:[[0,'stinger']]}],
 [{cam:[[[18,10,14],[0,3,-2],44],[[16,8,4],[0,3,-6],44]],env:NIGHT,draw:(T,u)=>{road(T,T*30);bigCar(0,0,0);SIT(drv,D0,T)},ov:()=>clockTxt('02:00',110,'#ffcf1a'),sfx:[[0,'engine']]}],
 [{cam:[[[-2.2,5.8,-1.2],[-1.6,4.6,-20],56],[[-2.2,5.7,-1.8],[-1.4,4.6,-20],50]],env:CAR,draw:T=>{ride(T,{rain:1,d:false})},sfx:[[0,'engine']]}],
 [{cam:[[[16,6,8],[4,4,1],44],[[14,5.6,6],[4,4,1],38]],env:NIGHT,draw:(T,u)=>{road(T,0,{rain:1});bigCar(0,0,0);SIT(drv,{...D0,headYaw:-1.2},T);C(pas,{x:lerp(9,6,u),z:4.4,yaw:-PI/2,...walk(T,4,.3),face:'none'},T)},sfx:[[0,'step'],[.5,'door']]}],
 [{cam:[[[11,9,-6],[0,4.6,1.5],44],[[10,8.4,-4],[0,4.6,1.5],38]],env:CAR,draw:(T,u)=>ride(T,{p:1,df:'talk',dp:{headYaw:-1.6*ramp(u,0,.3)},pp:{aR:-1.5*ramp(u,.3,.6)}}),ov:(T,u)=>bubble(360,260,'QAYERGA?',48,u*1.5)}],
 [{noSplit:1,cam:[[[0,6.4,-6.1],[1.6,4.4,4.4],48],[[0,6.4,-6.1],[2,4.5,4.4],42]],env:CAR,draw:T=>ride(T,{d:false}),ov:()=>MIR(),sfx:[[0,'drone']]}],
 [{cam:[[[-.2,6,-2],[2.2,4.8,4.4],42],[[.3,5.8,-.8],[2.2,4.9,4.4],32]],env:RED,shake:.35,draw:T=>ride(T,{p:1,pf:'glow',d:false}),flash:(u)=>u<.06?1:0,sfx:[[0,'stinger']]}],
 [{cam:[[[0,7,-8.5],[-2.2,4.6,-3.4],38],[[-.4,6.6,-8],[-2.2,4.7,-2.8],30]],env:CAR,shake:.4,draw:T=>ride(T,{df:'scared',dp:{aL:-1.25+.08*sin(T*40),aR:-1.25-.08*sin(T*40),headPitch:.1}}),sfx:[[0,'heart'],[.9,'heart'],[1.8,'heart']]}],
 [{cam:[[[22,14,16],[0,6,-20],46],[[16,12,4],[0,6,-30],46]],env:FOG,draw:(T,u)=>{bridge(T);bigCar(0,5.1,lerp(-6,-26,u));},sfx:[[0,'engine'],[0,'drone']]}],
 [{cam:[[[-.2,6,-2.2],[2.2,4.7,4.4],42],[[.2,5.8,-1.2],[2.2,4.8,4.4],34]],env:RED,draw:T=>ride(T,{p:1,pf:'none',pp:{headPitch:-.15,headYaw:-.3},d:false}),ov:(T,u)=>bubble(360,250,'SHU YERDA TO‘XTA...',36,u*1.5),sfx:[[0,'drone']]}],
 [{cam:[[[-6,14,-6],[-12,-1,-28],44],[[-6.5,13.5,-9],[-12,-1,-28],38]],env:WR,draw:T=>{bridge(T);wreck(T);bigCar(0,5.1,-12);SIT(drv,{x:-2.2,y:7.1,z:-14.2},T)},sfx:[[0,'stinger']]}],
 [{cam:[[[-22,3,-16],[-12,0,-28],42],[[-21,2.6,-18],[-12,0,-28],34]],env:WR,draw:T=>{bridge(T);wreck(T)},sfx:[[0,'heart']]},
  {at:.5,cam:[[[-2.2,10.6,-8],[-2.2,9.9,-2.2],34],[[-2.2,10.5,-7.2],[-2.2,9.95,-2.2],28]],env:FOG,shake:.3,draw:T=>{bridge(T);bigCar(0,5.1,0);SIT(drv,{x:-2.2,y:7.1,z:-2.2,face:'shock',aL:-2.4,aR:-2.4},T)},sfx:[[0,'hit']]}],
 [{cam:[[[-1,6.4,-1.2],[2.2,3.6,4.4],48],[[-.8,6.2,-.4],[2.2,3.6,4.4],42]],env:CAR,draw:T=>ride(T,{d:false}),sfx:[[0,'drone']]}],
 [{cam:[[[0,6.4,-6.1],[-2.2,4.8,-2.2],48],[[0,6.4,-6.1],[-2.2,4.9,-2.2],40]],env:CAR,draw:T=>ride(T,{d:false}),ov:(T,u)=>MIR(),flash:(u)=>u>.85?(u-.85)*6:0,sfx:[[0,'drone'],[-.5,'stinger']]}],
 [{noSplit:1,cam:[[[20,14,10],[0,6,-14],46],[[16,12,4],[0,6,-18],46]],env:FOG,draw:(T,u)=>{bridge(T);bigCar(0,5.1,-12)},ov:(T,u)=>ctaCard(ramp(u,0,.5),T),sfx:[[0,'whoosh']]}],
];
boot({horror:1,fovK:1.15});build(TIMINGDATA,S,{tail:1.6});
