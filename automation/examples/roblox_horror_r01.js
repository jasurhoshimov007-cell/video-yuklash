// QOIDA: ESHIKNI OCHMA (Roblox-uslub horror namunasi, 30 s)
const kid={...LK.kid,shirt:'#d23a3a',pants:'#2a3a6a'};
const mom={...LK.mom,coat:'#3a4660',shirt:'#c8366b'};
const NIGHT=(T,o={})=>E('night',Object.assign({fog:'#101830',fogD:.018,amb:'#4a5680',sun:'#6a7ab8',lamp:'#ffb060',lampPos:[0,9,0]},o));
const DARK=(T)=>E('night',{fog:'#070a16',fogD:.03,amb:'#232c48',sun:'#3a4670',lamp:noise1(T*7)>-.3?'#ff9a40':'#301808',lampPos:[9,7,0]});
const REDN=(T)=>E('red',{fogD:.03,lampPos:[10,6,0],lamp:noise1(T*9)>-.4?'#ff3030':'#400808'});
function home(T,o={}){livingRoom({night:1,door:o.door||0,table:true},T);
 // eshik tagidan yorug'lik
 if(o.under)B(12.4,.02,4,.25,.06,3,'#ffd080',o.under);
 if(o.feet){const k=o.feet;B(12.9,.0,3.4+k*.3,.6,.25,.7,'#050505');B(12.9,.0,4.6-k*.2,.6,.25,.7,'#050505')}}
function phoneUI(T,u,msg,sender='Onam'){const s=ease(clamp(u*4,0,1));if(s<=0)return;ctx.save();ctx.translate(W2*.72,H2*.33+(1-s)*120);ctx.scale(.6+.1*s,.6+.1*s);ctx.globalAlpha=s;
 ctx.shadowColor='rgba(0,0,0,.7)';ctx.shadowBlur=40;ctx.beginPath();ctx.roundRect(-210,-330,420,660,46);ctx.fillStyle='#0d0f16';ctx.fill();ctx.shadowBlur=0;
 ctx.beginPath();ctx.roundRect(-195,-315,390,630,36);ctx.fillStyle='#1b2133';ctx.fill();
 txt('23:48',0,-262,40,'#fff',0);
 ctx.beginPath();ctx.roundRect(-170,-200,340,120,24);ctx.fillStyle='rgba(255,255,255,.12)';ctx.fill();
 ctx.beginPath();ctx.arc(-120,-140,30,0,7);ctx.fillStyle='#ff5a8a';ctx.fill();txt('O',-120,-138,30,'#fff',0);
 txt(sender,-70,-165,30,'#fff',0,'left');txt('hozir',150,-165,22,'#aab',0,'right',700);txt('yangi xabar',-70,-120,24,'#cfd6e6',0,'left',700);
 if(msg){const m=clamp((u-.25)*3,0,1);ctx.globalAlpha=s*m;msg.forEach((l,i)=>{ctx.beginPath();ctx.roundRect(-170,-40+i*96,340,80,24);ctx.fillStyle=i==msg.length-1?'#ff3b4a':'#2f7de1';ctx.fill();txt(l,0,i*96,30,'#fff',0)})}
 ctx.restore()}
function abCard(T,u){const s=ease(clamp(u*3,0,1));if(s<=0)return;ctx.fillStyle=`rgba(0,0,0,${.45*s})`;ctx.fillRect(0,0,W2,H2);ctx.save();ctx.globalAlpha=s;
 fitTxt('SIZ NIMA QILARDINGIZ?',W2/2,250,60,660,'#ffffff',12);
 const row=(y,l,c,d)=>{const k=ease(clamp(u*3-d,0,1));ctx.save();ctx.translate(W2/2+(1-k)*-300,y);ctx.globalAlpha=k;ctx.beginPath();ctx.roundRect(-300,-55,600,110,26);ctx.fillStyle='rgba(10,14,28,.85)';ctx.fill();ctx.lineWidth=5;ctx.strokeStyle=c;ctx.stroke();
  ctx.beginPath();ctx.roundRect(-280,-38,76,76,16);ctx.fillStyle=c;ctx.fill();txt(l[0],-242,2,50,'#fff',0);fitTxt(l[1],50,2,42,440,'#fff',8);ctx.restore()};
 row(390,['A','ESHIKNI OCHAMAN'],'#2ecc71',.4);row(530,['B','YASHIRINAMAN'],'#ff3b4a',.8);ctx.restore()}
const S=[
 // 0 qoida (hook)
 [{cam:[[[-2,6.5,13],[5,3.6,1.5],50],[[-1,6,11.5],[5,3.8,1.5],46]],env:NIGHT,draw:(T)=>{home(T);C(mom,{x:8,z:2,yaw:-PI/2,face:'talk',aR:-.6+.25*sin(T*3),headYaw:.1*sin(T*1.3)},T);C(kid,{x:2.5,z:2,yaw:PI/2,scale:.8,face:'calm',headPitch:-.2},T)},
   ov:(T,u)=>hookTitle(['QOIDA:','ESHIKNI OCHMA!'],u*.55+.3),sfx:[[0,'hit'],[.1,'whoosh']]},
  {at:.55,cam:[[[1.2,4.8,5.2],[8,4.3,2],42],[[2,4.7,4.6],[8,4.35,2],38]],env:NIGHT,draw:(T)=>{home(T);C(mom,{x:8,z:2,yaw:-PI/2,face:'talk',aR:-.6+.25*sin(T*3)},T);C(kid,{x:2.5,z:2,yaw:PI/2,scale:.8,face:'calm',headPitch:-.2},T)},ov:(T,u)=>hookTitle(['QOIDA:','ESHIKNI OCHMA!'],.8)}],
 // 1 hatto menga ham
 [{noSplit:1,cam:[[[1.6,4.9,4],[8,4.3,2],40],[[2.4,4.8,3.6],[8,4.35,2],36]],env:NIGHT,draw:(T)=>{home(T);C(mom,{x:8,z:2,yaw:-PI/2,face:'smirk',headPitch:.08},T)},sfx:[[0,'drone']]}],
 // 2 23:47 taqillash
 [{cam:[[[3,5,4],[12.6,3.4,4],46,.04],[[5,4.6,4],[12.6,3.4,4],40,.04]],env:DARK,shake:(u)=>[.05,.35][(u*6|0)%2],draw:(T,u)=>{home(T,{door:.01*sin(T*40),under:1})},
   ov:(T,u)=>clockTxt('23:47',120,'#ff5050'),sfx:[[0.1,'knock'],[.45,'knock'],[.8,'knock']]}],
 // 3 bolam men keldim (eshik tagida soya)
 [{noSplit:1,cam:[[[9,1.2,4],[12.5,.6,4],50,.06],[[10,1,4],[12.5,.6,4],42,.06]],env:DARK,draw:(T,u)=>{home(T,{under:1.4,feet:sin(T*2)})},sfx:[[0,'whoosh']]}],
 // 4 onamning ovozi - bola eshikka yuradi
 [{noSplit:1,cam:[[[0,4.6,11],[1.5,3.2,2],46],[[4.5,4.4,10.5],[6.5,3.2,2],44]],env:DARK,draw:(T,u)=>{home(T,{under:1});const w=walk(T,6,.45);C(kid,{x:lerp(1,7,u),z:2,yaw:PI/2,scale:.8,face:'scared',...w},T)},sfx:[[0,'step'],[.33,'step'],[.66,'step']]}],
 // 5 telefon xabari
 [{noSplit:1,cam:[[[1.8,4.6,5.4],[7,3.3,2],46],[[2.4,4.4,5],[7,3.35,2],42]],env:DARK,draw:(T)=>{home(T,{under:1});C({...kid,item:'phone'},{x:7,z:2,yaw:-PI/2-.45,scale:.8,face:'scared',aR:-1.3,headPitch:.3},T);bulb(4,7,3,1,'#9ab8ff')},ov:(T,u)=>phoneUI(T,u,null),sfx:[[0,'ding']]}],
 // 6 men hali ishdaman
 [{noSplit:1,cam:[[[2.4,4.4,5],[7,3.35,2],42],[[2.8,4.3,4.6],[7,3.4,2],38]],env:DARK,draw:(T)=>{home(T,{under:1});C({...kid,item:'phone'},{x:7,z:2,yaw:-PI/2-.45,scale:.8,face:'shock',aR:-1.3,headPitch:.3},T);bulb(4,7,3,1,'#9ab8ff')},ov:(T,u)=>phoneUI(T,1,['Men hali ishdaman.','KIM BO‘LSA HAM, OCHMA!'],'Onam'),sfx:[[0,'pop'],[.4,'pop']]}],
 // 7 ovoz kuldi
 [{noSplit:1,cam:[[[4.5,4.6,7],[12.6,3.4,4],46,-.05],[[6,4.4,6.2],[12.6,3.5,4],40,-.08]],env:REDN,shake:.45,draw:(T,u)=>{home(T,{under:1.6,feet:1,door:.015*sin(T*30)})},sfx:[[0,'laugh'],[.2,'stinger']]}],
 // 8 bilaman xabarni o'qiding
 [{cam:[[[2.6,3.8,2.8],[7,3.4,2],38],[[3.2,3.6,2.5],[7,3.42,2],32]],env:REDN,shake:.3,draw:(T,u)=>{home(T,{under:1.6});C(kid,{x:7,z:2,yaw:-PI/2,scale:.8,face:'shock',headYaw:.25*sin(T*2)},T);bulb(4,7,2,1,'#ff7070')},flash:(u)=>u>.8&&u<.84?.6:0,sfx:[[0,'heart'],[.5,'heart']]},
  {at:.7,cam:[[[5.5,4,6.4],[12.6,3.4,4],46],[[7,3.9,5.6],[12.6,3.5,4],38]],env:REDN,draw:(T,u)=>{home(T,{under:2,feet:1,door:.04+.05*u})},sfx:[[0,'door']]}],
 // 9 A yoki B
 [{noSplit:1,cam:[[[-2,5.6,11],[7,3.2,2],50],[[-1,5.3,10],[7,3.3,2],46]],env:REDN,draw:(T,u)=>{home(T,{under:2,door:.1});C(kid,{x:6,z:2.5,yaw:PI/2,scale:.8,face:'scared'},T)},ov:(T,u)=>abCard(T,u),sfx:[[0,'whoosh'],[.3,'pop'],[.55,'pop']]}],
 // 10 CTA
 [{noSplit:1,cam:[[[-1,5.3,10],[7,3.3,2],46],[[1,5,8.5],[8,3.5,2],42]],env:REDN,draw:(T,u)=>{home(T,{under:2,door:.12});C(kid,{x:6,z:2.5,yaw:PI/2,scale:.8,face:'scared'},T)},ov:(T,u)=>ctaCard(ramp(u,.05,.6),T),sfx:[[0,'whoosh']]}],
];
boot({horror:1});build(TIMINGDATA,S,{tail:1.6,});
