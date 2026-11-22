// QOROVUL HUSHTAGI
const NIGHT=(T)=>E('night',{fog:'#1a2442',fogD:.02,amb:'#5c68a0',sun:'#8494d4',lampPos:[-1,12,8],lamp:noise1(T*4)>-.7?'#c89050':'#604020'});
const INSIDE=E('night',{fog:'#10162a',fogD:.02,amb:'#4a5070',sun:'#6070a0',lampPos:[0,8,0],lamp:'#ffb060'});
const boy={...LK.boy,shirt:'#4a8a5a'},mom={...LK.mom,shirt:'#7a3a8a',dress:'#6a2a7a',hatCol:'#e0d8c8'},bobo={...LK.guest,coat:'#3a5a3a'},kid={...LK.kid,shirt:'#4a8a5a',hair:'#2a1a12'};
const watch={skin:'#6e6e7a',shirt:'#4a4f66',coat:'#454a62',belt:'#6a5a3a',pants:'#262838',shoes:'#0a0a0e',hat:'hood',hatCol:'#2a2d3c',arm:2.6,item:'whistle'};
const shadowT={skin:'#050507',shirt:'#050507',pants:'#050507',shoes:'#050507',eyeGlow:'#ff3020'};
function street3(T,o={}){street({lamps:1,wallCol:'#a8967a',winGlow:'#ffc870'},T);if(o.rain)rainDrops(T,0,0)}
function scratches(){for(let i=0;i<4;i++)R.box(chain(M.T(-9.3,3.2+i*.25,9-1+i*.5),M.RX(.7),M.S(.08,2.4,.12)),'#1a1010')}
const fog=(T)=>E('night',{fog:'#5a6478',fogD:.05,amb:'#6a7088',sun:'#9aa0b8'});
const S=[
 [{cam:[[[1,3,28],[0,3.5,0],50,.05],[[0.5,3.2,18],[0,4,0],46,-.03]],env:NIGHT,shake:.12,draw:T=>{street3(T);C(watch,{x:0,z:-4,yaw:.2,scale:1.55,face:'none'},T)},ov:(T,u)=>hookTitle(['HUSHTAK CHALINSA','ESHIKNI OCHMANG!'],u*.8+.1),sfx:[[0,'whistle'],[0,'hit']]}],
 [{cam:[[[0,5,11],[0,3,0],46],[[2,4.6,9],[0,3.2,0],40]],env:E('warm',{lamp:'#ffcf8a',lampPos:[0,8,2]}),filter:'sepia(.55) brightness(1.05)',draw:T=>{livingRoom({table:false});C(bobo,{x:-2,z:-1,yaw:.4,sit:1,face:'talk',aR:-2.9,aRz:-.2},T);C(kid,{x:2.5,z:1,yaw:-.7,sit:1,scale:.7,face:'calm'},T)},ov:()=>{ctx.fillStyle='rgba(60,40,10,.15)';ctx.fillRect(0,0,W2,H2)}}],
 [{cam:[[[-2,7,4],[4,2,-6],50],[[-1,6.5,2],[4,2.2,-6],42]],env:INSIDE,shake:(u)=>u>.4?.2:0,draw:(T,u)=>{bedroom({night:1});C(boy,{x:4,y:.9,z:-5.5,lean:u<.4?-1.45:-.6,face:u<.4?'sleep':'shock'},T)},ov:(T,u)=>{if(u>.1)txt('FIIIT!',W2/2,260,70,'#fff',10)},sfx:[[0,'whistle'],[.7,'whistle'],[1.4,'whistle']]}],
 [{cam:[[[-4,6,6],[-10.5,5,-2],46],[[-5,5.6,4],[-10.5,5.2,-2],40]],env:INSIDE,draw:T=>{bedroom({night:1});C(boy,{x:-8.5,z:-2,yaw:-PI/2,face:'scared'},T)}},
  {cam:[[[-8.5,8,-13],[0,6,-4],48],[[-8,7.6,-12],[0,6.5,-4],40]],env:NIGHT,draw:T=>{street3(T);C(watch,{x:0,z:-4,yaw:-.9,scale:1.55,face:'none'},T)},sfx:[[0,'drone']]}],
 [{noSplit:1,cam:[[[-2.5,6.4,5],[0,6.8,-4],32],[[-2,6.5,3.2],[0,6.8,-4],26]],env:T=>Object.assign(NIGHT(T),{lampPos:[-8,10,8],lamp:'#806040'}),shake:.08,draw:T=>{street3(T);C(watch,{x:0,z:-4,yaw:-.5,scale:1.55,face:'none',headPitch:-.1},T)},sfx:[[0,'stinger']]}],
 [{cam:[[[2,5.5,10],[12,4,4],44],[[5,5,8.5],[12,4,4],38]],env:INSIDE,shake:.2,draw:T=>{livingRoom({night:1,table:false,door:.02*Math.abs(sin(T*25))})},sfx:[[0,'knock'],[1.2,'knock']]}],
 [{cam:[[[4,5,12],[9,4.2,4],42],[[5,5,11],[9,4.2,4],36]],env:INSIDE,draw:T=>{livingRoom({night:1,table:false});C(boy,{x:9,z:4,yaw:PI/2,face:'scared',headYaw:.4,headPitch:.1},T)}}],
 [{cam:[[[6,1.2,6],[12.6,1,4],40,.05],[[8,1.6,5.2],[12.6,1.4,4],32,.05]],env:INSIDE,draw:T=>{livingRoom({night:1,table:false});const fl=.8+.4*noise1(T*5);B(12.5,0,4,.1,.18,3,'#ffcf80',fl*1.5);B(12.45,0,3.4,.12,.16,.5,'#050505');B(12.45,0,4.6,.12,.16,.5,'#050505')},ov:(T,u)=>bubble(360,300,'O‘G‘LIM, OCH!',44,u*1.5),sfx:[[0,'drone']]}],
 [{cam:[[[4,5.6,10.5],[11,4,4],42],[[5,5.2,9.5],[11,4,4],36]],env:INSIDE,draw:(T,u)=>{livingRoom({night:1,table:false});C(boy,{x:10,z:4,yaw:PI/2,face:'scared',aR:lerp(-.3,-1.45,ease(u))},T)},sfx:[[0,'heart'],[1,'heart']]}],
 [{cam:[[[0,6,10],[-4,1.5,-2],46],[[1,5.4,9],[-4,1.5,-2],40]],env:INSIDE,draw:(T,u)=>{livingRoom({night:1,table:false});C(mom,{x:-5,y:.6,z:-3,yaw:.2,lean:-1.45,face:'sleep'},T)},sfx:[[0,'heart']]},
  {at:.5,cam:[[[6,5,10],[10,4.3,4],34],[[7.4,4.8,8.6],[10,4.3,4],26]],env:INSIDE,shake:.35,draw:T=>{livingRoom({night:1,table:false});C(boy,{x:10,z:4,yaw:-.6,face:'shock',aL:-2.6,aR:-2.6},T)},sfx:[[0,'stinger']]}],
 [{cam:[[[2,1,5],[0,8,-4],62,-.1],[[1.5,1,3],[0,8.5,-4],62,-.12]],env:NIGHT,shake:.15,draw:(T,u)=>{street3(T);C(watch,{x:0,z:-4,yaw:.3,scale:1.55,face:'none',aR:lerp(-.2,-2.7,ease(ramp(u,0,.4))),aRz:-.4},T)},sfx:[[.3,'whistle'],[.9,'whistle']]}],
 [{cam:[[[6,14,20],[0,0,-10],52],[[5,13,16],[0,0,-16],52]],env:NIGHT,draw:(T,u)=>{street3(T);C(shadowT,{x:0,z:lerp(4,-30,u),yaw:PI,face:'glow',...run(T)},T);C(watch,{x:0,z:-4,yaw:PI,scale:1.55,face:'none'},T)},sfx:[[0,'step'],[.2,'step'],[.4,'step'],[.6,'whoosh']]}],
 [{cam:[[[0,5.5,14],[-9.5,3.5,8],44],[[-1.5,5,12.5],[-9.5,3.5,8],38]],env:E('day',{fog:'#d8e2ee'}),draw:T=>{street({lamps:0,wallCol:'#c9b48e'},T);scratches();C(boy,{x:-5.5,z:5,yaw:-PI/2-.5,face:'shock'},T);C(mom,{x:-3.5,z:6.5,yaw:-PI/2-.6,face:'scared'},T)},sfx:[[0,'whoosh']]}],
 [{cam:[[[2,4.5,16],[0,4.5,-10],44],[[1,4.5,12],[0,4.5,-12],40]],env:fog,draw:(T,u)=>{street({lamps:1,wallCol:'#9a8e7a'},T);C(watch,{x:0,z:lerp(-10,-16,u),yaw:PI,scale:1.55,face:'none',...walk(T,4,.3)},T);C(boy,{x:-2,z:8,yaw:PI,aR:-2.8+.3*sin(T*8)},T)}}],
 [{noSplit:1,cam:[[[1,4,22],[0,6,-4],50],[[0,3.6,17],[0,6.5,-4],46]],env:NIGHT,draw:T=>{street3(T);C(watch,{x:0,z:-4,yaw:.2,scale:1.55,face:'none'},T)},ov:(T,u)=>ctaCard(ramp(u,0,.5),T),sfx:[[0,'whoosh']]}],
];
boot({horror:1,fovK:1.15});build(TIMINGDATA,S,{tail:1.6});
