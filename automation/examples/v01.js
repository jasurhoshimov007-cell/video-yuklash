// 13-QAVAT
const boy={skin:'#f1c99a',shirt:'#3b4a6b',sleeve:'#3b4a6b',pants:'#22252e',shoes:'#111',hair:'#1e140e'};
const kam={...LK.kampir};
const guard={skin:'#e2b088',shirt:'#3a4a7a',coat:'#2a3550',pants:'#1e2230',shoes:'#111',hat:'cap',hatCol:'#1e2a44',mus:'#cfcfcf'};
const LIFT=E('nightCold',{fog:'#141c2c',fogD:.02,amb:'#5a6680',sun:'#9aa8c8',lampPos:[0,9,0],lamp:'#dfe8ff'});
const CORR=(T)=>E('night',{fog:'#161d30',fogD:.022,amb:'#56608a',sun:'#7a86b0',lampPos:[0,8,20],lamp:noise1(T*6)>-.6?'#ffc080':'#806040'});
function cabin(o={}){liftCab({light:o.light,lit:o.lit});
 // indicator over doors (inside front wall)
 B(-4,8.6,4,8,1.4,.3,'#6a6e76');B(0,8.7,3.8,1.6,.9,.1,'#100',0);B(0,8.8,3.75,1,.6,.05,'#ff2020',o.ind?1.6:.2);
 liftDoors(4,o.open||0);if(o.open>0){hallOut(o.T||0,o.kam)}}
function hallOut(T,k){// corridor beyond doors z 4..40
 B(0,-.5,22,12,.5,40,'#3a3a40');B(-6,0,22,.5,10,40,'#5a6458');B(6,0,22,.5,10,40,'#5a6458');B(0,10,22,12,.5,40,'#2a2e2a');B(0,0,40,12,10,.5,'#4a5048');
 for(let z=10;z<38;z+=9){door(-5.6,z,PI/2,0,'#4a2a1a');door(5.6,z+3,-PI/2,0,'#4a2a1a')}
 const on=noise1(T*6)>-.5;B(0,9.4,22,1.2,.3,1.2,on?'#ffcf90':'#331',on?1.6:0);
 if(k)C(kam,k,T)}
function building(T){B(0,-.5,0,80,.5,80,'#2a2a30');B(0,0,-10,22,44,10,'#8a8f98');
 for(let f=0;f<13;f++)for(let c=0;c<6;c++){const lit=hash(f*7+c)>.6;const red=f==12&&c==2;B(-8.3+c*3.3,1.6+f*3.3,-4.9,1.8,2,.2,red?'#ff2020':lit?'#ffd27a':'#1a2030',red?(.8+.6*sin(T*8)):lit?.9:0)}
 streetLamp(-8,8);tree(9,6,1.2,'#24402a');}
function lobby(T){room({W:24,D:24,H:11,wall:'#d8d0b8',floor:'#9a8a70'});win(-11.7,5.5,-2,PI/2,5,4,'#cfe8ff',.9);B(3,0,-4,7,3,2.5,'#7a5232');B(3,3,-4,7.2,.2,2.7,'#5a3a22');
 B(-6,0,-11.6,8,10,.4,'#b0b6c0');B(-6,0,-11.5,.1,9.6,.5,'#333');B(5,4,-11.7,2.4,3,.2,'#3a2a1a');}
const sepia='sepia(1) contrast(1.15) brightness(1.05)';
function photoFrame(){ctx.save();ctx.strokeStyle='#efe6d2';ctx.lineWidth=70;ctx.strokeRect(0,0,W2,H2);ctx.fillStyle='rgba(60,40,20,.18)';ctx.fillRect(0,0,W2,H2);ctx.restore();txt('1994',W2-120,H2-80,40,'#5a4030',0)}
const S=[
 // 0 hook
 [{cam:[[[0,3,30],[0,22,-10],62,.05],[[0,2,24],[0,40,-10],62,-.03]],env:E('night',{fogD:.012,amb:'#4a5478'}),draw:T=>building(T),ov:(T,u)=>hookTitle(['BU UYDA','13-QAVAT YO‘Q'],u*.5+.25),sfx:[[0,'hit']]},
  {at:.5,cam:[[[-1.5,5.4,2.6],[3.7,4.8,-1],52],[[-.3,5.2,1.6],[3.7,4.8,-1],44]],env:LIFT,shake:.12,draw:(T)=>{cabin({lit:5});B(3.6,5.75,-1,.12,.3,.5,'#ff1a1a',1.8+sin(T*12))},ov:(T,u)=>hookTitle(['BU UYDA','13-QAVAT YO‘Q'],.8),sfx:[[0,'whoosh']]}],
 // 1 lift stops
 [{cam:[[[-2.6,6.2,3.4],[1,4,-1.5],56,.04],[[-2.2,5.6,2.6],[1,4.2,-1.5],48,.04]],env:LIFT,shake:(u)=>u>.6?.35:.05,draw:T=>{cabin({ind:1,light:noise1(T*9)>-.6?1:0});C(boy,{x:1,z:-1.5,yaw:-.5,headPitch:-.35,face:'scared'},T)},sfx:[[1.4,'thud']]},
  {cam:[[[0,6.5,-2],[0,8.7,3.8],40],[[0,7.5,0],[0,8.7,3.8],26]],env:LIFT,draw:T=>{cabin({ind:1})},ov:(T,u)=>{const p=R.proj([0,8.8,3.7]);txt('13',p[0],p[1],(150+u*90),'#ff3030',0)},sfx:[[0,'ding']]}],
 // 2 doors open
 [{noSplit:1,cam:[[[-2.6,6.4,-3.2],[1,4.5,10],58],[[-2.2,6,-2.4],[.6,4.5,12],52]],env:(T,u)=>u<.3?LIFT:CORR(T),draw:(T,u)=>{cabin({open:ease(u),T});C(boy,{x:1.6,z:0,yaw:-.2,face:'scared',headYaw:-.3},T)},sfx:[[0,'slide']]}],
 // 3 old woman in corridor
 [{cam:[[[0,5,6],[0,4,30],46],[[0,4.8,9],[0,4,30],40]],env:CORR,draw:T=>{hallOut(T,{x:0,z:22,yaw:PI,face:'calm'})},sfx:[[0,'drone']]},
  {cam:[[[1.5,4.5,14],[0,4.2,22],34],[[1,4.4,16],[0,4.3,22],28]],env:CORR,draw:T=>{hallOut(T,{x:0,z:22,yaw:PI,face:'smirk',headPitch:.1})}}],
 // 4 "nihoyat keldingmi"
 [{cam:[[[.8,4.8,14],[0,4.3,22],32,.06],[[.4,4.7,15.5],[0,4.3,22],28,.08]],env:CORR,draw:T=>{hallOut(T,{x:0,z:22,yaw:PI,face:'talk',headYaw:.15*sin(T*.8),headPitch:.12})}},
  {cam:[[[1.3,4.8,3.2],[-1.2,4,-1],40],[[1,4.7,2.6],[-1.2,4.1,-1],34]],env:LIFT,draw:T=>{cabin({open:1,T});C(boy,{x:-1.2,z:-1,yaw:.3,face:'shock'},T)}}],
 // 5 press button
 [{cam:[[[.6,6,-3.3],[3.4,4.6,0],56,-.08],[[1,5.8,-3],[3.4,4.6,0],48,-.08]],env:LIFT,shake:.25,draw:T=>{cabin({open:1,T,lit:Math.floor(T*6)%6});C(boy,{x:1.9,z:.9,yaw:PI/2,aR:-1.5+.35*sin(T*20),face:'scared',headYaw:-.5},T)},sfx:[[0,'click'],[.3,'click'],[.6,'click'],[.9,'click']]},
  {cam:[[[0,5.4,-3],[0,4,14],50],[[0,5.2,-2.4],[0,4,14],44]],env:CORR,draw:T=>{cabin({open:1,T,kam:{x:0,z:18,yaw:PI,face:'smirk'}})}}],
 // 6 she walks
 [{cam:[[[0,1.2,8],[0,5.5,20],62,.1],[[0,1.2,9],[0,5.5,18],62,.12]],env:CORR,draw:(T,u)=>{const z=lerp(20,15,u),w=walk(T,5,.4);hallOut(T,{x:0,z,yaw:PI,face:'smirk',...w})},sfx:[[0,'step'],[.5,'step']]}],
 // 7 light out
 [{cam:[[[0,4.5,6.5],[0,4.3,12],34],[[0,4.4,8],[0,4.3,12],22]],env:(T,u)=>E('red',{lampPos:[0,8,9],lamp:'#ff3030'}),shake:.45,draw:(T,u)=>{hallOut(T,{x:0,z:12,yaw:PI,face:'evil',headPitch:.1});},
   flash:(u)=>u>.55&&u<.6?1:0,ov:(T,u)=>{if(u>.6)flash(1,'#000')},sfx:[[0,'stinger'],[-0.0,'silence']]}],
 // 8 morning guard
 [{cam:[[[-6,6,10],[2,4,-3],50],[[-4,5.5,8],[2,4,-3],44]],env:E('day',{fog:'#dfe6ee'}),draw:T=>{lobby(T);C(guard,{x:3,z:-6,face:'calm',seed:2},T);C(boy,{x:-1,z:-1,yaw:2.4,aR:-1.2+.3*sin(T*4),face:'talk'},T)},sfx:[[0,'whoosh']]}],
 // 9 photo
 [{cam:[[[1.5,5,2.5],[3,4.4,-6],40],[[2.4,4.8,.5],[3,4.5,-6],32]],env:E('day',{fog:'#dfe6ee'}),draw:T=>{lobby(T);C({...guard,item:'photo'},{x:3,z:-6,face:'scared',aR:-1.3,aL:-.3,headPitch:.1},T)}}],
 // 10 sepia photo of kampir
 [{cam:[[[-2,4.4,15],[-2,3.4,2],40],[[-2,4.3,13],[-2,3.6,2],36]],env:E('day',{fogD:.01}),filter:sepia,draw:T=>{building(0);C(kam,{x:-2,z:2,face:'calm',blink:0,T:0},0)},ov:()=>photoFrame(),sfx:[[0,'click']]}],
 // 11 reveal narrator in photo
 [{cam:[[[-2,4.3,13],[-2,3.6,2],36],[[0,4.4,15],[0.1,3.4,2],44]],env:E('day',{fogD:.01}),filter:sepia,draw:T=>{building(0);C(kam,{x:-2,z:2,face:'calm',blink:0},0);C(boy,{x:2.2,z:2,face:'calm',blink:0},0)},ov:()=>photoFrame(),sfx:[[0.6,'stinger']]},
  {at:.62,cam:[[[0,4.4,9],[0,3.9,0],34],[[0,4.4,8],[0,4,0],28]],env:E('day',{fog:'#dfe6ee'}),shake:.3,draw:T=>{lobby(T);C(boy,{x:0,z:0,face:'shock',aL:-2.6,aR:-2.6,headPitch:-.1},T)}}],
 // 12 CTA
 [{noSplit:1,cam:[[[-2.4,6,3.2],[0,5,-1],56],[[-1.8,5.6,2.4],[0,5.2,-1],46]],env:LIFT,draw:(T,u)=>{cabin({ind:1,lit:5,open:Math.max(0,1-u*2.5),T});C(boy,{x:0,z:-1.5,yaw:0,face:'scared',headPitch:-.3},T)},ov:(T,u)=>ctaCard(ramp(u,.05,.6),T),sfx:[[0,'whoosh']]}],
];
boot({horror:1});build(TIMINGDATA,S,{tail:1.6});
