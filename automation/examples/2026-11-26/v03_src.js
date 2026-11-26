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
const S=[
 [{cam:[[[-3,8,14],[3,3,-8],56],[[-2,7.4,12],[3,3.2,-8],50]],env:NB,draw:(T,u)=>{set(T);C(hero0,{x:0,z:2,yaw:PI-.4,scale:.85,face:'calm',...walk(T,6,.4)},T)},ov:(T,u)=>{clocks(T);hookTitle(['TUNDA BOZORDA','NARX SO‘RAMA!'],u*.5+.3)},sfx:[[0,'hit'],[.1,'whoosh']]}],
 [{noSplit:1,cam:(u,T)=>{const z=lerp(14,6,u);return[[[2,6.5,z+13],[0,3.4,z-8],50]]},env:(T)=>NB(T,{lamp:'#000000'}),draw:(T,u)=>{bazaar({},T);C(hero0,{x:0,z:lerp(14,6,u),yaw:PI,scale:.85,...walk(T,7,.5)},T)},sfx:[[0,'step'],[.33,'step'],[.66,'step']]}],
 [{noSplit:1,cam:[[[-2,5,8],[7,4,-4],46],[[-1,4.8,6],[7,4,-4],40]],env:NB,draw:(T,u)=>{set(T)},ov:(T)=>clocks(T),sfx:[[0,'drone']]}],
 [{noSplit:1,cam:[[[.8,4.2,7.2],[0,3.7,2],34],[[.5,4.1,6.5],[0,3.7,2],30]],env:NB,draw:(T,u)=>{set(T);C(hero0,{x:0,z:2,yaw:0,scale:.85,face:'calm',headYaw:.3*sin(T*1.6)},T)},ov:(T,u)=>subPill(T,u),sfx:[[0,'pop']]}],
 [{noSplit:1,cam:[[[7.5,4.2,-1.5],[7,3.9,-8],38],[[7.3,4.1,-2.5],[7,3.9,-8],32]],env:NB,draw:(T,u)=>{set(T,{hy:.2*sin(T)})},sfx:[[0,'stinger']]}],
 [{cam:[[[6,6.5,4],[7,3,-4.2],46],[[7,6,3],[7,3,-4.2],42]],env:NB,draw:(T,u)=>{set(T);piyola(8,2.8,-3.6);for(let i=0;i<4;i++)B(4.2+i*.7,2.8,-3.3,.45,.45,.45,['#d83a2a','#e04a3a','#c8302a','#7ad04a'][i])},ov:(T)=>clocks(T),sfx:[[0,'tick'],[.3,'tick'],[.6,'tick']]}],
 [{cam:[[[-.5,5.8,8],[6,3.8,-5],46],[[0,5.6,7],[6,3.8,-5],42]],env:NB,draw:(T,u)=>{set(T);C(hero0,{x:2.8,z:-1,yaw:PI-.5,scale:.85,face:'talk',aR:-1.4},T)},ov:(T)=>clocks(T)}],
 [{noSplit:1,cam:[[[7.4,4.1,-2.3],[7,3.9,-8],34],[[7.2,4.1,-3.2],[7,3.9,-8],28]],env:RED,shake:.15,draw:(T,u)=>{set(T,{face:'evil'})},ov:(T,u)=>bigTxt('1 YIL',240,'#ff2a2a',u,140),sfx:[[0,'stinger'],[.1,'laugh']]}],
 [{noSplit:1,cam:[[[4,4.5,5],[4,3.6,-.5],38],[[4,4.4,4.2],[4,3.6,-.5],32]],env:RED,shake:.3,draw:(T,u)=>{set(T);C(hero0,{x:4,z:-.5,yaw:0,scale:.85,face:'shock',aR:-1.6},T)},ov:(T,u)=>bigClock(T,u,30),sfx:[[0,'tick'],[.15,'tick'],[.3,'tick'],[.45,'tick'],[.6,'tick'],[.75,'tick']]}],
 [{noSplit:1,cam:[[[4.4,4.4,5],[4,3.6,-.5],38],[[4.3,4.3,4.3],[4,3.6,-.5],33]],env:RED,shake:.35,draw:(T,u)=>{const h=lc('#1a120c','#e8e8e8',ease(u));C({...hero0,hair:h,skin:lc('#f1c99a','#d8b89a',u)},{x:4,z:-.5,yaw:0,scale:.85,face:'shock',headYaw:.2*sin(T*4)},T);set(T)},flash:(u)=>u<.05?.6:0,sfx:[[0,'hit'],[.2,'heart'],[.6,'heart']]}],
 [{noSplit:1,cam:[[[-3,8,14],[3,3,-8],56],[[-2,7.6,12.5],[3,3.2,-8],52]],env:RED,draw:(T,u)=>{set(T,{face:'evil'});C({...hero0,hair:'#e8e8e8'},{x:4,z:-.5,yaw:PI,scale:.85,face:'scared'},T)},ov:(T,u)=>abCard(T,u,'QOCHAMAN','SAVDOLASHAMAN'),sfx:[[0,'whoosh'],[.3,'pop'],[.55,'pop']]}],
 [{noSplit:1,cam:[[[-2,7.6,12.5],[3,3.2,-8],52],[[-1,7.2,11],[3,3.2,-8],48]],env:RED,draw:(T,u)=>{set(T,{face:'evil'})},ov:(T,u)=>endSub(T,u,'DAVOMI ERTAGA!'),sfx:[[0,'whoosh'],[.4,'pop']]}],
];
boot({horror:1,global:partBadge,subY:.72});build(TIMINGDATA,S,{tail:1.6});
