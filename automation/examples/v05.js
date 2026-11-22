// BOZORDAGI QO'G'IRCHOQ
const doll={skin:'#f6dccc',shirt:'#b0203c',dress:'#b0203c',shoes:'#1a1010',longhair:'#1a0e0e',hair:'#1a0e0e',head:1.9,eye:'#050505',eyeGlow:'#ff2020'};
const dollN={...doll,item:'photo'};
const seller={skin:'#d6b496',shirt:'#3a2a40',dress:'#2a1f30',shoes:'#111',hat:'scarf',hatCol:'#4a3048',eye:'#000'};
const boy={...LK.boy,shirt:'#3a7ad0'};
const NIGHT=E('night',{fog:'#121a34',fogD:.02,amb:'#5a6494',sun:'#7a8ac4',lampPos:[-10,6,-2],lamp:'#6a80c0'});
const DUSK=E('warm',{fog:'#e8a878',fogD:.012,amb:'#a07a70',sun:'#ffc890',sunDir:[-.6,.6,.5]});
const DAYB=E('day',{fog:'#d8e6f2'});
const D=(p,T,o={})=>C(o.note?dollN:doll,{scale:.42,face:o.face||'calm',blink:o.face=='glow'?0:undefined,...p},T);
function stall(open=1){bazaar({},0);if(!open){B(-7,0,8.1,7.2,5.8,.2,'#8a8f98');for(let i=0;i<8;i++)B(-7,i*.72,8.2,7.2,.08,.1,'#5a5f68')}}
const S=[
 [{cam:[[[0,1.8,7],[0,1.5,0],40,.06],[[0,1.8,5],[0,1.6,0],32,.08]],env:NIGHT,shake:.05,draw:T=>{bedroom({night:1});D({x:0,z:0},T,{face:'calm'})},ov:(T,u)=>hookTitle(['HAR KECHA','1 QADAM YAQIN'],u*.7+.1),sfx:[[0,'hit'],[0,'drone']]}],
 [{cam:[[[-14,5,16],[-7,3,6],46],[[-12,4.8,13],[-7,3,6],40]],env:DUSK,draw:T=>{stall(1);C(seller,{x:-7,z:4,yaw:0,face:'smirk'},T);C(boy,{x:-6,z:11,yaw:PI,face:'happy'},T);D({x:-8,y:2.8,z:6.5,yaw:.3},T)}}],
 [{cam:[[[-5.5,5.2,12],[-7,4.2,4],36],[[-6,5,10.5],[-7,4.2,4],30]],env:DUSK,draw:T=>{stall(1);C(seller,{x:-7,z:4,yaw:0,face:'smirk',aR:-1.2+.2*sin(T*5)},T)},ov:(T,u)=>bubble(360,260,'QAYTARIB OLIB KELMA!',36,u*1.5),sfx:[[0,'drone']]}],
 [{cam:[[[-1,7,8],[-3,4,-6],56],[[0,6.6,6],[-3,4,-6],50]],env:NIGHT,draw:T=>{bedroom({night:1});C(boy,{x:4,y:.9,z:-5.5,lean:-1.45,face:'sleep'},T);D({x:-6,y:7,z:-10},T)},ov:()=>clockTxt('1-KECHA',110,'#ff5050'),sfx:[[0,'tick']]}],
 [{cam:[[[-1,6,7],[-4,3,-2],52],[[-1.5,5.6,5.5],[-4.5,3,-1],46]],env:NIGHT,draw:T=>{bedroom({night:1});C(boy,{x:4,y:.9,z:-5.5,lean:-1.45,face:'sleep'},T);D({x:-5,y:2.75,z:0,yaw:.6},T)},ov:()=>clockTxt('2-KECHA',110,'#ff5050'),sfx:[[0,'tick']]}],
 [{cam:[[[-3,5,4],[2,2.4,-5],50],[[-2,4.6,3],[2,2.2,-5],44]],env:NIGHT,draw:T=>{bedroom({night:1});C(boy,{x:4,y:.9,z:-5.5,lean:-1.45,face:'sleep'},T);D({x:1.2,z:-4,yaw:1.2},T)},ov:()=>clockTxt('3-KECHA',110,'#ff5050'),sfx:[[0,'tick'],[.4,'heart']]}],
 [{noSplit:1,cam:[[[0,2.1,4.5],[0,1.45,0],28],[[0,2,3.4],[0,1.5,0],24]],env:E('red',{fog:'#200608',amb:'#6a2a30',sun:'#a04048'}),shake:.06,draw:(T,u)=>{bedroom({night:1});D({x:0,z:0},T,{face:u>.3?'glow':'calm'})},sfx:[[0,'heart'],[.5,'stinger']]}],
 [{cam:[[[0,6,9],[0,2.5,0],48],[[1,5.6,7.5],[0,2.5,0],42]],env:DAYB,draw:(T,u)=>{bedroom({});B(1,0,1.5,3,1.8,2.2,'#b98a52');B(1,1.8,.5,3,.1,1.2,'#a87a42');D({x:1,y:lerp(4.5,1.4,ease(u)),z:1.5},T);C(boy,{x:-2,z:1,yaw:PI/2,aR:-1.4,aL:-1.4,face:'angry'},T)},sfx:[[0,'whoosh'],[.7,'thud']]}],
 [{cam:[[[6,5,22],[0,3.5,8],46],[[4,5,18],[0,3.5,4],44]],env:DAYB,draw:(T,u)=>{stall(1);const w=walk(T,7,.45);C({...boy,item:'box'},{x:0,z:lerp(16,4,u),yaw:PI,...w,aL:-1.5,aR:-1.5,face:'angry'},T)},sfx:[[0,'step'],[.3,'step'],[.6,'step']]}],
 [{cam:[[[-3,5.5,18],[-7,3.5,8],44],[[-4,5.2,16],[-7,3.5,8],38]],env:E('day',{fog:'#c8ccd4',amb:'#9a9aa8'}),draw:T=>{stall(0);C({...boy,item:'box'},{x:-4,z:12,yaw:PI+.5,aL:-1.5,aR:-1.5,face:'scared',headYaw:.4*sin(T*2)},T)},sfx:[[0,'drone']]}],
 [{cam:[[[0,4.5,26],[-9.5,3.5,9],40],[[-3,4.3,18],[-9.5,3.5,9],36]],env:DUSK,draw:T=>{street({lamps:0,wallCol:'#c9b48e'},T);gate(-9.5,9,PI/2,.9,'#2f5a8a');B(-14,0,9,6,6,6,'#0a0a0e')},sfx:[[0,'door'],[.5,'heart']]}],
 [{cam:[[[-1,5,2],[4,2.6,-8],46],[[1,4.6,-.5],[4,2.6,-8],38]],env:NIGHT,draw:T=>{bedroom({night:1});D({x:4,y:2.3,z:-8,sit:1,yaw:-.3},T)},sfx:[[0,'stinger']]}],
 [{cam:[[[2.6,3.6,-3.5],[4,2.6,-8],36],[[3,3.4,-4.6],[4,2.6,-8],30]],env:NIGHT,draw:T=>{bedroom({night:1});D({x:4,y:2.3,z:-8,sit:1,yaw:-.3,aR:-1.2},T,{note:1})}}],
 [{cam:[[[0,2.1,4.8],[0,1.45,0],30],[[0,2,3.6],[0,1.5,0],26]],env:E('red',{fog:'#200608',amb:'#7a3038',sun:'#b04850'}),shake:.1,draw:(T,u)=>{bedroom({night:1});D({x:0,z:0,headYaw:u>.6?.0:.5},T,{face:u>.55?'glow':'calm'})},ov:(T,u)=>{if(u<.55)paper(['ENDI SEN','MENIKI','BO‘LDING'],u*2,-.04,'#a00010')},flash:(u)=>u>.55&&u<.6?1:0,sfx:[[0,'whoosh'],[1.1,'stinger']]}],
 [{noSplit:1,cam:[[[0,2,7.5],[0,1.6,0],38],[[0,2,5.5],[0,1.7,0],32]],env:NIGHT,draw:T=>{bedroom({night:1});D({x:0,z:0},T,{face:'glow'})},ov:(T,u)=>ctaCard(ramp(u,0,.5),T),sfx:[[0,'whoosh']]}],
];
boot({horror:1,fovK:1.15});build(TIMINGDATA,S,{tail:1.6});
