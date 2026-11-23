// ===== A yoki B savol-javob shabloni (blokli 3D). SPEC: {A:{label,emoji},B:{label,emoji},roles:[...],hookBig:"A YOKI B?"}
// roles (har gap uchun): hook | A | B | choose | comment | natija | cta   (natija: "Natija Telegram kanalimizda")
const ENVP=E('party',{fog:'#2a1a60',fogD:.006,amb:'#a090d0',sun:'#fff4ff',sunDir:[.2,1,.7],lampPos:[0,12,6],lamp:'#ffffff'});
const LCA={...LK.kid,shirt:'#e03a4a',pants:'#7a1a2a',hat:'cap',hatCol:'#e03a4a'},LCB={...LK.boy,shirt:'#2f7de1',pants:'#1a2a5a',hat:'cap',hatCol:'#2f7de1'},LPR={...LK.dad,shirt:'#ffffff',coat:'#3a2a8a',belt:'#ffd23a'};
function abStage(T,o={}){
 B(0,-.5,0,70,.5,50,'#3a2a6a');B(0,0,-14,70,26,.6,'#1d1244');
 for(let i=0;i<9;i++)B(-16+i*4,18,-13.6,2.4,1,.3,['#ff4a8a','#ffd23a','#4ad0ff','#7aff7a','#ff8a3a'][i%5],1.5*(.6+.4*sin(T*5+i)));
 [[-7,'#e03a4a','#ff6a7a'],[7,'#2f7de1','#6aa8ff']].forEach(([x,c,c2])=>{B(x,0,0,8,1.4,8,c,.3);B(x,1.4,0,7.4,.25,7.4,c2,.5)});
 const jA=o.jumpA?Math.abs(sin(T*9))*.9:0,jB=o.jumpB?Math.abs(sin(T*9))*.9:0;
 C(LCA,{x:-7,y:1.65+jA,z:0,yaw:.35,face:o.jumpA?'happy':'calm',aL:o.jumpA?-2.6:0,aR:o.jumpA?-2.6:0,seed:1},T);
 C(LCB,{x:7,y:1.65+jB,z:0,yaw:-.35,face:o.jumpB?'happy':'calm',aL:o.jumpB?-2.6:0,aR:o.jumpB?-2.6:0,seed:2},T);
 C(LPR,Object.assign({x:0,z:7,yaw:0,face:'talk',seed:3},o.pres||{}),T)}
function abBadge(c,l,x,y,s=1){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.beginPath();ctx.arc(0,0,64,0,7);ctx.fillStyle=c;ctx.fill();ctx.lineWidth=8;ctx.strokeStyle='#fff';ctx.stroke();txt(l,0,6,92,'#fff',0);ctx.restore()}
function emojiBig(e,x,y,size,u){const a=ease(ramp(u,0,.25));ctx.save();ctx.translate(x,y+(1-a)*60+Math.sin(u*14)*6);ctx.scale(.4+.6*a,.4+.6*a);ctx.globalAlpha=a;ctx.font=`${size}px "Noto Color Emoji"`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(e,0,0);ctx.restore()}
function optCard(tag,col,label,u){const a=ease(ramp(u,0,.2));ctx.save();ctx.translate(360,640+(1-a)*80);ctx.globalAlpha=a;ctx.scale(.8+.2*a,.8+.2*a);rrect(-290,-70,580,140,40,col);ctx.lineWidth=6;ctx.strokeStyle='#fff';ctx.beginPath();ctx.roundRect(-290,-70,580,140,40);ctx.stroke();txt(tag,-232,4,92,'#fff',0);ctx.font='900 44px Inter';let sz=44;const w=ctx.measureText(label).width;if(w>380)sz=44*380/w;txt(label,40,4,sz,'#fff',0);ctx.restore()}
function rrect(x,y,w,h,r,fill){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill()}
function tgBadge(u,T){const a=ease(ramp(u,0,.25));ctx.save();ctx.translate(360,300);ctx.scale(.7+.3*a,.7+.3*a);ctx.globalAlpha=a;ctx.beginPath();ctx.arc(0,0,92,0,7);ctx.fillStyle='#2aa3ef';ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(-46,-2);ctx.lineTo(48,-40);ctx.lineTo(24,44);ctx.lineTo(-4,10);ctx.closePath();ctx.fill();ctx.restore();
 const b=ease(ramp(u,.15,.45));ctx.save();ctx.globalAlpha=b;txt('NATIJA',360,450,86,'#fff',16);txt('TELEGRAMDA',360,535,76,'#2aa3ef',14);ctx.restore()}
const P=(T,u)=>({});
const camWide=[[[0,9,25],[0,4.5,0],54],[[0,8,21],[0,4.5,0],54]];
const SHOT={
 hook:(k)=>({cam:[[[0,5.6,19],[0,4.6,7],38],[[0,5.2,13.5],[0,4.5,7],30]],env:ENVP,draw:T=>abStage(T,{pres:{face:'shock',aL:-2.6,aR:-2.6}}),ov:(T,u)=>{if(k==0){const s=ease(ramp(u,0,.2));ctx.save();ctx.translate(360,230);ctx.scale(.6+.4*s+.04*sin(T*20),.6+.4*s+.04*sin(T*20));txt(SPEC.hookBig||'A YOKI B?',0,0,120,'#ffe14d',22);ctx.restore()}},sfx:[[0,'hit'],[.15,'whoosh']]}),
 A:(k)=>({cam:[[[-3.4,6.4,17],[-7,4.4,0],46],[[-5,5.8,13],[-7,4.6,0],40]],env:ENVP,draw:T=>abStage(T,{jumpA:1,pres:{aR:-1.5,yaw:-.5}}),ov:(T,u)=>{emojiBig(SPEC.A.emoji,360,330,210,u);optCard('A','#e03a4a',SPEC.A.label,u)},sfx:[[0,'pop'],[.3,'ding']]}),
 B:(k)=>({cam:[[[3.4,6.4,17],[7,4.4,0],46],[[5,5.8,13],[7,4.6,0],40]],env:ENVP,draw:T=>abStage(T,{jumpB:1,pres:{aL:-1.5,yaw:.5}}),ov:(T,u)=>{emojiBig(SPEC.B.emoji,360,330,210,u);optCard('B','#2f7de1',SPEC.B.label,u)},sfx:[[0,'pop'],[.3,'ding']]}),
 choose:(k)=>({cam:camWide,env:ENVP,draw:T=>abStage(T,{jumpA:1,jumpB:1,pres:{face:'shock',aL:-2.6,aR:-2.6}}),ov:(T,u)=>{abBadge('#e03a4a','A',150,520,1+.08*sin(T*9));abBadge('#2f7de1','B',570,520,1+.08*sin(T*9+1));const s=1+.1*sin(T*10);ctx.save();ctx.translate(360,520);ctx.scale(s,s);txt('VS',0,0,120,'#fff',20);ctx.restore();const n=3-Math.min(2,Math.floor(u*3));ctx.save();ctx.translate(360,300);ctx.scale(1.2-.2*((u*3)%1),1.2-.2*((u*3)%1));txt(String(n),0,0,200,n==1?'#ff3b5c':'#ffe14d',24);ctx.restore()},sfx:[[0,'tick'],[.5,'tick'],[1,'tick']]}),
 comment:(k)=>({cam:[[[0,5.6,19],[0,4.6,7],38],[[0,5.2,14],[0,4.5,7],32]],env:ENVP,draw:T=>abStage(T,{pres:{face:'happy',aR:-1.4}}),ov:(T,u)=>{const a=ease(ramp(u,0,.3));ctx.save();ctx.translate(360,260);ctx.scale(.7+.3*a,.7+.3*a);ctx.globalAlpha=a;rrect(-300,-80,600,160,50,'#fff');txt('💬 IZOHDA YOZING',0,-26,52,'#111',0);txt('A  yoki  B',0,36,70,'#e03a4a',0);ctx.restore()},sfx:[[0,'pop']]}),
 natija:(k)=>({cam:[[[0,5.6,19],[0,4.6,7],38],[[0,5.2,14],[0,4.5,7],32]],env:ENVP,draw:T=>abStage(T,{pres:{face:'happy',aR:-1.5,aRz:.2}}),ov:(T,u)=>tgBadge(u,T),sfx:[[0,'whoosh'],[.4,'ding']]}),
 cta:(k)=>({cam:[[[0,5.6,19],[0,4.6,7],38],[[0,5.2,15],[0,4.5,7],32]],env:ENVP,draw:T=>abStage(T,{pres:{face:'happy',aL:-2.6+.4*sin(T*8),aR:-2.6+.4*sin(T*8+1)}}),ov:(T,u)=>ctaCard(ramp(u,0,.5),T),sfx:[[0,'whoosh'],[.6,'pop']]})
};
const cnt={};const S=SPEC.roles.map(r=>{cnt[r]=(cnt[r]||0)+1;const sp=SHOT[r](cnt[r]-1);return sp});
boot({fovK:1.15});build(TIMINGDATA,S,{tail:1.4});
