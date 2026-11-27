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
const PART='2-QISM';
const DARK=(T)=>E('night',{fog:'#05060a',fogD:.03,amb:'#1a1c28',sun:'#202434',lamp:'#000000',lampPos:[0,9,-6]});
const S=[
 [{noSplit:1,cam:[[[0,8,12],[0,3,-10],54],[[0,7.4,10.5],[0,3.2,-10],50]],env:RED,draw:(T,u)=>{set(T,{turn:1,hx:HX,hz:HZ,face:'glow'});C(hero,{x:HX,z:HZ,yaw:PI,scale:.85,face:'scared'},T)},ov:(T,u)=>hookTitle(['HAMMA MEHMON','SENGA QARAYAPTI!'],u*.5+.3),sfx:[[0,'hit'],[.1,'whoosh']]}],
 [{noSplit:1,cam:(u,T)=>{const z=lerp(5,10,u);return[[[7,5,z+2],[0,3.5,z],48]]},env:RED,draw:(T,u)=>{set(T,{turn:1,hx:HX,hz:HZ,face:'glow'});C(hero,{x:0,z:lerp(5,10,u),yaw:0,scale:.85,face:'scared',...run(T)},T)},ov:(T,u)=>bigTxt('ESHIK QULF!',240,'#ff2a2a',clamp((u-.5)*2,0,1),100),sfx:[[0,'step'],[.2,'step'],[.4,'step'],[.6,'thud']]}],
 [{noSplit:1,cam:[[[0,6,-15.5],[0,5.6,-21.5],36],[[0,5.9,-16.5],[0,5.6,-21.5],30]],env:RED,shake:.2,draw:(T,u)=>{set(T);C({...tam,eyeGlow:'#ff2020'},{x:0,y:1.5,z:-21.5,yaw:0,scale:.9,face:'evil',aR:-2.6},T)},ov:(T,u)=>bigTxt('TO‘Y ENDI BOSHLANADI!',230,'#ff2a2a',u,74),sfx:[[0,'laugh'],[.2,'stinger']]}],
 [{noSplit:1,cam:[[[.6,4.4,HZ+5.5],[0,3.8,HZ],34],[[.4,4.3,HZ+4.8],[0,3.8,HZ],30]],env:WARM,draw:(T,u)=>{set(T);C(hero,{x:HX,z:HZ,yaw:0,scale:.85,face:'scared',headYaw:.3*sin(T*2)},T)},ov:(T,u)=>subPill(T,u),sfx:[[0,'pop']]}],
 [{cam:[[[-3,5.5,9],[-11,4,-2],46],[[-4,5.2,6],[-11,4,-6],42]],env:WARM,draw:(T,u)=>{set(T)},ov:(T,u)=>photoCard(T,u,{emoji:['🤵','👰','🎉'],es:110,sp:140,sepia:1,label:'TO‘Y · 1996',y:520}),sfx:[[0,'click'],[.2,'whoosh']]}],
 [{noSplit:1,cam:[[[-10,4.6,6.5],[-11,4.1,.7],40],[[-10.3,4.5,5.6],[-11,4.1,.7],34]],env:WARM,draw:(T,u)=>{set(T,{face:'happy'})},ov:(T,u)=>bigTxt('30 YIL OLDINGI MEHMONLAR',230,'#ffe14d',u,64),sfx:[[0,'stinger']]}],
 [{cam:[[[0,9,16],[0,4,-14],56],[[0,8.4,13],[0,4.2,-14],50]],env:WARM,draw:(T,u)=>{hall({},T)},ov:(T,u)=>bigTxt('HAMMA G‘OYIB BO‘LGAN',230,'#ffffff',u,74),sfx:[[0,'drone']]}],
 [{cam:[[[0,9,16],[0,4,-14],56],[[0,8.8,15],[0,4.2,-14],54]],env:(T)=>T%1<.5?DARK(T):RED(T),shake:.2,draw:(T,u)=>{set(T,{face:'glow'})},flash:(u)=>u<.06?.7:0,sfx:[[0,'click'],[.1,'hit']]}],
 [{noSplit:1,cam:[[[-4,4.8,3.5],[-6.5,4,-1.5],40],[[-4.3,4.7,2.8],[-6.5,4,-1.5],35]],env:RED,draw:(T,u)=>{set(T,{face:'happy'});C(hero,{x:-6.5,z:-1.5,yaw:.4,scale:.95,face:'happy',headYaw:.05*sin(T*20)},T)},ov:(T,u)=>bigTxt('SEN HAM... JILMAYIB',230,'#ff2a2a',u,80),sfx:[[0,'stinger'],[.3,'laugh']]}],
 [{cam:[[[0,6,-4],[0,4,12],50],[[0,5.6,-2],[0,4,12],46]],env:WARM,draw:(T,u)=>{set(T,{face:'glow'});[LK.man,LK.girl,LK.boy].forEach((L,i)=>C(L,{x:-2.5+i*2.5,z:lerp(12,8,u),yaw:PI,scale:.9,face:'happy',...walk(T+i,5,.35)},T))},ov:(T,u)=>bigTxt('YANGI MEHMONLAR...',230,'#ffe14d',u,80),sfx:[[0,'door'],[.3,'step'],[.6,'step']]}],
 [{noSplit:1,cam:[[[0,10,17],[0,3,-12],58],[[0,9.4,15.5],[0,3.2,-12],54]],env:RED,draw:(T,u)=>{set(T,{face:'glow'})},ov:(T,u)=>askCmt(T,u,'ULARNI QANDAY OGOHLANTIRASAN?'),sfx:[[0,'whoosh'],[.3,'pop']]}],
 [{noSplit:1,cam:[[[0,9.4,15.5],[0,3.2,-12],54],[[0,9,14],[0,3.2,-12],50]],env:RED,draw:(T,u)=>{set(T,{face:'glow'})},ov:(T,u)=>endSub(T,u,'YANGI HIKOYA ERTAGA!'),sfx:[[0,'whoosh'],[.4,'pop']]}],
];
boot({horror:1,global:partBadge,subY:.72});build(TIMINGDATA,S,{tail:1.6});
