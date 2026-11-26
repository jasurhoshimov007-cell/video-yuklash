// TO'YDAN KEYIN (1-qism)
const hero={...LK.man,shirt:'#f2f2f2',coat:'#22304a',pants:'#1e222c',hair:'#120c08'};
const tam={...LK.teacher,coat:'#5a1a2a',tie:'#ffd23a'};
const LOOKS=[LK.guest,LK.mom,LK.dad,LK.kampir,LK.girl,LK.man,{...LK.guest,coat:'#3a6a3a'},{...LK.mom,dress:'#2a5a8a',hatCol:'#e8e8e8'}];
const WARM=(T)=>E('warm',{fog:'#3a2440',fogD:.012,amb:'#8a7a96',sun:'#ffd9b0',lamp:'#ffd090',lampPos:[0,12,-4]});
const PARTY=(T)=>E('party',{fogD:.014,lamp:['#ff4a9a','#4ad0ff','#ffd23a','#7aff7a'][Math.floor(T*4)%4],lampPos:[0,10,-10]});
const RED=(T)=>E('red',{fog:'#22080c',fogD:.016,amb:'#9a3a44',sun:'#c04a50',lampPos:[0,9,-6],lamp:noise1(T*7)>-.3?'#ff4040':'#501010'});
const TB=[[-11,4],[-11,-5],[-11,-14],[11,4],[11,-5],[11,-14]];
function guests(T,o={}){let k=0;TB.forEach(([x,z],ti)=>{[-2.2,0,2.2].forEach((dx,j)=>{const L=LOOKS[(k++)%LOOKS.length];const gx=x+dx*1.15,gz=z-3.3;
 const yaw=o.turn?Math.atan2(o.hx-gx,o.hz-gz)*clamp(o.turn,0,1):0;C(L,{x:gx,z:gz,yaw,scale:.95,face:o.face||'happy',headYaw:o.jitter?.05*sin(T*20+k):0,blink:false},T)})})}
function set(T,o={}){hall({},T);guests(T,o);B(0,1.5,-21,.25,2.5,.25,'#222');B(0,4,-21,.5,.5,.5,'#888')}
const HX=0,HZ=3;
const S=[
 [{cam:[[[0,10,17],[0,3,-12],58],[[0,9,15],[0,3.2,-12],52]],env:WARM,draw:(T,u)=>{set(T);C(hero,{x:HX,z:HZ,yaw:PI,scale:.85,face:'calm',headYaw:.4*sin(T*1.5)},T)},ov:(T,u)=>hookTitle(['TO‘Y TUGADI...','HECH KIM CHIQMADI!'],u*.5+.3),sfx:[[0,'hit'],[.1,'whoosh']]}],
 [{noSplit:1,cam:[[[-7,5.5,15],[3,3,2],46],[[-5,5.2,14],[3,3,0],42]],env:WARM,draw:(T,u)=>{set(T);C({...hero,item:'phone'},{x:lerp(3,1,u),z:lerp(10,5,u),yaw:PI-.3,scale:.85,face:'calm',aR:-1.2,headPitch:.3,...walk(T,6,.4)},T)},sfx:[[0,'step'],[.35,'step'],[.7,'step']]}],
 [{cam:[[[0,9,16],[0,4,-14],56],[[0,8.4,13],[0,4.2,-14],50]],env:PARTY,shake:.3,draw:(T,u)=>{set(T);C(hero,{x:HX,z:HZ,yaw:PI,scale:.85,face:'shock'},T)},ov:(T)=>clockTxt('02:00',120,'#ff5050'),flash:(u)=>u<.05?.5:0,sfx:[[0,'stinger'],[.05,'hit']]}],
 [{noSplit:1,cam:[[[.6,4.4,HZ+5.5],[0,3.8,HZ],34],[[.4,4.3,HZ+4.8],[0,3.8,HZ],30]],env:PARTY,draw:(T,u)=>{set(T);C(hero,{x:HX,z:HZ,yaw:0,scale:.85,face:'scared',headYaw:.3*sin(T*2)},T)},ov:(T,u)=>subPill(T,u),sfx:[[0,'pop']]}],
 [{cam:[[[-3,5.5,9],[-11,4,-2],46],[[-4,5.2,6],[-11,4,-6],42]],env:WARM,draw:(T,u)=>{set(T)},sfx:[[0,'drone']]}],
 [{noSplit:1,cam:[[[-10,4.6,6.5],[-11,4.1,.7],40],[[-10.3,4.5,5.6],[-11,4.1,.7],34]],env:WARM,draw:(T,u)=>{set(T)},sfx:[[0,'laugh']]}],
 [{cam:[[[11,8,10],[11,3,2],48],[[11,7.2,8.5],[11,3.2,1.5],42]],env:WARM,draw:(T,u)=>{set(T);plov(11,2.65,4)}}],
 [{cam:[[[0,6,-8],[0,5,-21],46],[[0,5.6,-11],[0,5.2,-21],40]],env:PARTY,draw:(T,u)=>{set(T);C(tam,{x:0,y:1.5,z:-21.5,yaw:0,scale:.9,face:'talk',aR:-2.6,aL:.2},T)},sfx:[[0,'ding']]}],
 [{noSplit:1,cam:[[[0,6,-15.5],[0,5.6,-21.5],36],[[0,5.9,-16.5],[0,5.6,-21.5],30]],env:RED,shake:.2,draw:(T,u)=>{set(T);C({...tam,eyeGlow:'#ff2020'},{x:0,y:1.5,z:-21.5,yaw:0,scale:.9,face:'evil',aR:-2.6},T)},ov:(T,u)=>bigTxt('NAVBAT SENDA!',230,'#ff2a2a',u),sfx:[[0,'stinger']]}],
 [{noSplit:1,cam:[[[-1,6.5,13],[-11,4.2,-6],50],[[-2,6.2,11],[-11,4.2,-6],46]],env:RED,shake:.35,draw:(T,u)=>{set(T,{turn:ease(clamp(u*2,0,1)),hx:HX,hz:HZ,face:'glow',jitter:1});C(hero,{x:HX,z:HZ,yaw:PI,scale:.85,face:'shock'},T)},sfx:[[0,'whoosh'],[.1,'hit']]}],
 [{noSplit:1,cam:[[[0,10,17],[0,3,-12],58],[[0,9.4,15.5],[0,3.2,-12],54]],env:RED,draw:(T,u)=>{set(T,{turn:1,hx:HX,hz:HZ,face:'glow'});C(hero,{x:HX,z:HZ,yaw:PI,scale:.85,face:'scared'},T)},ov:(T,u)=>abCard(T,u,'SAHNAGA CHIQAMAN','ESHIKKA YUGURAMAN'),sfx:[[0,'whoosh'],[.3,'pop'],[.55,'pop']]}],
 [{noSplit:1,cam:[[[0,9.4,15.5],[0,3.2,-12],54],[[0,9,14],[0,3.2,-12],50]],env:RED,draw:(T,u)=>{set(T,{turn:1,hx:HX,hz:HZ,face:'glow'})},ov:(T,u)=>endSub(T,u,'DAVOMI ERTAGA!'),sfx:[[0,'whoosh'],[.4,'pop']]}],
];
boot({horror:1,global:partBadge,subY:.72});build(TIMINGDATA,S,{tail:1.6});
