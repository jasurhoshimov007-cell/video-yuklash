// TUNGI BOZOR (1-qism)
const hero0={...LK.boy,shirt:'#2fa36a',pants:'#22252e',hair:'#1a120c'};
const old={...LK.guest,coat:'#4a3a2a',belt:'#8a2a2a',beard:'#f2f2f2',skin:'#d8b08a'};
function lc(a,b,u){const A=hex(a),Bc=hex(b);return '#'+A.map((v,i)=>Math.round((v+(Bc[i]-v)*u)*255).toString(16).padStart(2,'0')).join('')}
const NB=(T,o={})=>E('night',Object.assign({fog:'#141a30',fogD:.018,amb:'#5a6890',sun:'#7a88b8',lamp:'#ffc060',lampPos:[6,7,-3]},o));
const RED=(T)=>E('red',{fog:'#200a0e',fogD:.02,amb:'#8a3a40',sun:'#b04a50',lampPos:[6,7,-3],lamp:noise1(T*8)>-.3?'#ff5040':'#501010'});
function set(T,o={}){bazaar({},T);bulb(7,5.2,-3.2,1,'#ffd080');non(5,2.85,-4.2);non(6.3,2.85,-4.6);
 C(old,{x:7,z:-8,yaw:0,scale:.9,face:o.face||'smirk',aR:o.arm||0,headYaw:o.hy||0},T)}
function clocks(T,sp=1){[[4.4,3.2,-4],[8.6,3.2,-4],[9.6,3.2,-4.6]].forEach(([x,y,z],i)=>{const p=R.proj([x,y,z]);if(p[2]<=0)return;const r=Math.max(10,260/p[2]);
 ctx.save();ctx.translate(p[0],p[1]);ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.fillStyle='#f4ecd8';ctx.fill();ctx.lineWidth=r*.15;ctx.strokeStyle='#8a6a2a';ctx.stroke();
 ctx.strokeStyle='#111';ctx.lineWidth=r*.1;const a=T*sp*(i+1)*.8;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(sin(a)*r*.7,-cos(a)*r*.7);ctx.stroke();ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(sin(a/12)*r*.45,-cos(a/12)*r*.45);ctx.stroke();ctx.restore()})}
function bigClock(T,u,sp){const p=ease(clamp(u*4,0,1));ctx.save();ctx.globalAlpha=p;ctx.translate(W2/2,330);ctx.scale(.6+.4*p,.6+.4*p);ctx.beginPath();ctx.arc(0,0,170,0,7);ctx.fillStyle='#f4ecd8';ctx.fill();ctx.lineWidth=22;ctx.strokeStyle='#c8a040';ctx.stroke();
 for(let i=0;i<12;i++){ctx.save();ctx.rotate(i*PI/6);ctx.fillStyle='#222';ctx.fillRect(-4,-150,8,24);ctx.restore()}
 const a=T*sp;ctx.strokeStyle='#111';ctx.lineCap='round';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(sin(a/12)*90,-cos(a/12)*90);ctx.stroke();ctx.strokeStyle='#d02020';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(sin(a)*140,-cos(a)*140);ctx.stroke();ctx.restore()}
const PART='2-QISM';
const DAYB=(T)=>E('day',{fog:'#d8e6f0',amb:'#a8b4c8'});
const S=[
 [{cam:[[[-3,8,14],[3,3,-8],56],[[-2,7.4,12],[3,3.2,-8],50]],env:NB,draw:(T,u)=>{set(T,{face:'smirk'});C({...hero0,hair:'#cfcfcf'},{x:3,z:-1,yaw:PI-.4,scale:.85,face:'scared'},T)},ov:(T,u)=>{clocks(T,3);hookTitle(['VAQT BILAN','SAVDOLASHMA!'],u*.5+.3)},sfx:[[0,'hit'],[.1,'whoosh']]}],
 [{noSplit:1,cam:[[[-1,5.8,8],[6,3.8,-5],46],[[0,5.6,7],[6,3.8,-5],42]],env:NB,draw:(T,u)=>{set(T);C({...hero0,hair:'#cfcfcf'},{x:4.5,z:-2.5,yaw:PI-.2,scale:.85,face:'calm'},T)},ov:(T,u)=>cmtBubbles(T,u,['B','bbbbbbb','savdolashaman!'],'SIZ TANLADINGIZ: B'),sfx:[[0,'pop'],[.3,'pop'],[.5,'pop']]}],
 [{noSplit:1,cam:[[[1.5,4.6,5],[4,3.8,-2],38],[[1.8,4.5,4.4],[4,3.8,-2],33]],env:NB,draw:(T,u)=>{set(T);C({...hero0,hair:'#cfcfcf'},{x:2.8,z:-1,yaw:PI-.3,scale:.85,face:'talk',aR:-1.3},T)},ov:(T,u)=>bigTxt('1 YIL ❌  1 KUN ✅',230,'#ffe14d',u,80),sfx:[[0,'whoosh']]}],
 [{noSplit:1,cam:[[[.8,4.2,7.2],[0,3.7,2],34],[[.5,4.1,6.5],[0,3.7,2],30]],env:NB,draw:(T,u)=>{set(T);C({...hero0,hair:'#cfcfcf'},{x:0,z:2,yaw:0,scale:.85,face:'scared',headYaw:.3*sin(T*1.6)},T)},ov:(T,u)=>subPill(T,u),sfx:[[0,'pop']]}],
 [{noSplit:1,cam:[[[7.5,4.2,-1.5],[7,3.9,-8],38],[[7.3,4.1,-2.5],[7,3.9,-8],32]],env:RED,shake:.2,draw:(T,u)=>{set(T,{face:'laugh'})},ov:(T,u)=>{clocks(T,0);bigTxt('SOATLAR TO‘XTADI',230,'#ff2a2a',u,80)},flash:(u)=>u>.3&&u<.34?.5:0,sfx:[[0,'laugh'],[.3,'stinger']]}],
 [{cam:[[[6,6.5,4],[7,3,-4.2],46],[[7,6,3],[7,3,-4.2],40]],env:NB,draw:(T,u)=>{set(T)},ov:(T,u)=>{clocks(T,0);paper(['AKMAL — 3 YIL','DILNOZA — 7 YIL','SARDOR — 1 YIL'],clamp(u*1.5,0,1),-.04,'#5a1010')},sfx:[[0,'tick'],[.4,'tick']]}],
 [{noSplit:1,cam:[[[4,4.5,5],[4,3.6,-.5],38],[[4,4.4,4.2],[4,3.6,-.5],32]],env:RED,shake:.25,draw:(T,u)=>{set(T);C({...hero0,hair:'#cfcfcf'},{x:4,z:-.5,yaw:0,scale:.85,face:'shock'},T)},ov:(T,u)=>{bigClock(T,u,0);bigTxt('SENING ISMING!',600,'#ff2a2a',u,90)},sfx:[[0,'hit'],[.2,'heart']]}],
 [{noSplit:1,cam:[[[7.4,4.1,-2.3],[7,3.9,-8],34],[[7.2,4.1,-3.4],[7,3.9,-8],27]],env:RED,shake:.15,draw:(T,u)=>{set(T,{face:'evil'})},ov:(T,u)=>bigTxt('SAVDO TUGAGAN...',240,'#ff2a2a',u,90),sfx:[[0,'stinger']]}],
 [{cam:[[[-3,8,14],[3,3,-8],56],[[-1,7.6,12],[3,3.2,-8],50]],env:DAYB,draw:(T,u)=>{bazaar({},T);non(5,2.85,-4.2);C({...hero0,hair:'#e8e8e8'},{x:7,z:-8,yaw:0,scale:.9,face:'smirk'},T);C(LK.mom,{x:lerp(-3,1,u),z:3,yaw:PI*.6,scale:.9,face:'calm',...walk(T,6,.4)},T)},ov:(T)=>clockTxt('07:00',110,'#111'),sfx:[[0,'ding'],[.3,'step'],[.6,'step']]}],
 [{noSplit:1,cam:[[[7.6,4.6,.5],[7,3.9,-8],40],[[7.4,4.5,-.6],[7,3.9,-8],34]],env:DAYB,draw:(T,u)=>{bazaar({},T);C({...hero0,hair:'#e8e8e8'},{x:7,z:-8,yaw:0,scale:.9,face:u>.5?'glow':'smirk'},T)},ov:(T,u)=>{clocks(T,1);bigTxt('BU — SEN!',240,'#ff2a2a',clamp((u-.4)*2,0,1),110)},flash:(u)=>u>.5&&u<.54?.5:0,sfx:[[.5,'stinger']]}],
 [{noSplit:1,cam:[[[-3,8,14],[3,3,-8],56],[[-2,7.6,12.5],[3,3.2,-8],52]],env:RED,draw:(T,u)=>{set(T,{face:'evil'})},ov:(T,u)=>askCmt(T,u,'SEN NIMA QILARDING?'),sfx:[[0,'whoosh'],[.3,'pop']]}],
 [{noSplit:1,cam:[[[-2,7.6,12.5],[3,3.2,-8],52],[[-1,7.2,11],[3,3.2,-8],48]],env:RED,draw:(T,u)=>{set(T,{face:'evil'})},ov:(T,u)=>endSub(T,u,'YANGI HIKOYA ERTAGA!'),sfx:[[0,'whoosh'],[.4,'pop']]}],
];
boot({horror:1,global:partBadge,subY:.72});build(TIMINGDATA,S,{tail:1.6});
