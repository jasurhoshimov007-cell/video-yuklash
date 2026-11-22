// TUNGI QO'NG'IROQ
const SCH=(T,o={})=>E('green',{fog:'#122018',fogD:.022,amb:'#5a8068',sun:'#7aa088',lampPos:o.lp||[0,9,-6],lamp:o.lc||'#cfffd8'});
const DAYC=E('day',{fog:'#e0eaf2',amb:'#a8b0c0',sun:'#fff4e0'});
const boy={...LK.boy,shirt:'#d8d8e0',sleeve:'#c02a2a',pants:'#1a2a4a',item:'flashlight'},boyN={...boy,item:undefined};
const tch={...LK.teacher,coat:'#2a2d3a',shirt:'#c8c8d0',arm:2.9,eyeGlow:'#d8f0ff',skin:'#b8bcc4',hair:'#101010'};
function hall2(T,k=99,o={}){B(0,-.5,-20,12,.5,80,'#4a5a50');B(-6,0,-20,.5,10,80,'#7a9a88');B(6,0,-20,.5,10,80,'#7a9a88');B(0,10,-20,12,.5,80,'#3a4a40');B(0,0,-6,12,.9,.1,'#5a3a2a');
 for(let i=0;i<9;i++){const z=14-i*8;door(-5.6,z,PI/2,0,'#6b3f26');win(5.7,6,z-4,-PI/2,3,2.4,'#1a2a40',.3);const on=i<k&&(o.flick?noise1(T*8+i)>-.4:1);B(0,9.6,z,1.6,.3,1.2,on?'#e8fff0':'#2a302a',on?1.6:0)}
 if(o.bell!==undefined){const sh=o.bell?sin(T*60)*.06:0;const m=chain(M.T(5.7,7.4,-2),M.RX(sh));BM(chain(m,M.T(-.05,0,0)),.1,2.4,2.4,'#8a8a90');BM(chain(m,M.T(-.3,0,0)),.4,2,2,'#c81e1e',.25);BM(chain(m,M.T(-.55,0,0)),.3,1.5,1.5,'#d82a2a',.3);BM(chain(m,M.T(-.75,0,0)),.2,.8,.8,'#e83a3a',.35);BM(chain(m,M.T(-.5,-1.15+sh*3,0)),.3,.3,.3,'#d8d8d8',.3)}}
const S=[
 [{cam:[[[0,6.4,4.5],[5,7,-2],46,.06],[[1,6.8,2.5],[5,7.2,-2],36,.1]],env:T=>SCH(T,{lp:[3,8,3],lc:'#ff5050'}),shake:.25,draw:T=>hall2(T,99,{bell:1}),ov:(T,u)=>{clockTxt('00:00',360,'#ff4040');hookTitle(['YARIM TUNDA','QO‘NG‘IROQ CHALINADI'],u*.6+.2)},sfx:[[0,'bell'],[0,'hit']]}],
 [{cam:[[[0,5.5,-6],[0,4,8],50],[[0,5.2,-3],[0,4,10],46]],env:T=>SCH(T,{lp:[0,4.5,4]}),draw:(T,u)=>{hall2(T,0);C(boy,{x:0,z:lerp(8,5,u),yaw:PI,aR:-1.5,...walk(T,5,.35),aR:-1.5,face:'scared'},T)},sfx:[[0,'step'],[.4,'step'],[.8,'step']]}],
 [{cam:[[[0,6,16],[0,5,-20],50],[[0,5.6,13],[0,5,-24],48]],env:SCH,draw:(T,u)=>{hall2(T,Math.floor(u*12));C(boy,{x:-2.5,z:6,yaw:PI-.4,face:'shock',aR:-1.5},T)},sfx:[[0,'click'],[.3,'click'],[.6,'click'],[.9,'click']]}],
 [{cam:[[[2,4,10],[-5.6,3.5,6],44],[[0,4,9],[-5.6,3.5,6],36]],env:SCH,draw:T=>{hall2(T);B(-5.5,0,6,.12,.2,3,'#fff0b0',1.5+.5*sin(T*9))},ov:(T,u)=>{const p=R.proj([-5.6,4,6]);txt('HA-HA-HA',p[0],p[1]-200,40,'#fff',8)},sfx:[[0,'laugh'],[.8,'laugh']]}],
 [{cam:[[[5,9.4,16],[0,0,-6],56],[[5,9.4,16],[0,0,-10],56]],env:SCH,filter:'saturate(.3) contrast(1.15)',draw:T=>{hall2(T);C(boy,{x:0,z:2,yaw:PI,face:'scared',aR:-1.5,headYaw:sin(T*2)*.8},T)},ov:(T,u)=>recFrame(T),sfx:[[0,'drone']]}],
 [{cam:[[[0,6,12],[0,3,-6],52],[[0,5.6,10],[0,3,-8],48]],env:T=>SCH(T,{lp:[0,9,0]}),draw:T=>{classroom({wall:'#7a9a88',winGlow:'#1a2a40'},T);C(boy,{x:0,z:9,yaw:PI,face:'scared',aR:-1.5},T)},sfx:[[0,'door']]}],
 [{cam:[[[0,6,0],[0,5.5,-12.6],46],[[0,5.8,-3],[0,5.5,-12.6],40]],env:T=>SCH(T,{lp:[0,9,-6]}),draw:T=>classroom({wall:'#7a9a88',winGlow:'#1a2a40'},T),ov:(T,u)=>{const p=R.proj([0,5.5,-12.4]);ctx.globalAlpha=ramp(u,0,.4);txt('ALISHER',p[0],p[1],90*(1+u*.15),'#f4f4f4',0);ctx.globalAlpha=1},sfx:[[0,'stinger']]}],
 [{cam:[[[2,5.4,-2],[0,4.3,4],40],[[1.5,5.2,-1],[0,4.4,4],32]],env:T=>SCH(T,{lp:[0,9,2]}),draw:(T,u)=>{classroom({wall:'#7a9a88',winGlow:'#1a2a40'},T);C(boyN,{x:0,z:4,yaw:PI*ease(ramp(u,.2,.6)),face:u>.5?'shock':'calm'},T);if(u>.4)B(-1,0,9.4,3,9.6,.4,'#050806')},ov:(T,u)=>bubble(360,260,'KECHIKDING...',46,ramp(u,.1,.5)*1.5),sfx:[[0,'drone']]}],
 [{noSplit:1,cam:[[[0,2.4,7],[0,6.2,-9],62,.12],[[0,2.2,4.5],[0,6.8,-9],62,.15]],env:T=>SCH(T,{lp:[0,6,2],lc:'#9affc0'}),shake:.25,draw:T=>{classroom({wall:'#7a9a88',winGlow:'#1a2a40'},T);C(tch,{x:0,z:-9,scale:1.9,face:'glow',aR:-.5,aL:-.5,headPitch:.25},T)},sfx:[[0,'stinger']]}],
 [{cam:[[[0,5,-8],[0,4,8],50],[[0,5,-6],[0,4,8],50]],env:SCH,shake:.3,draw:(T,u)=>{hall2(T,99,{flick:1});C(boyN,{x:0,z:2,yaw:PI,...run(T),face:'shock'},T)},sfx:[[0,'step'],[.15,'step'],[.3,'step'],[.45,'step'],[.6,'step'],[.75,'step']]},
  {cam:[[[0,6,12],[0,5,-30],48],[[0,6,4],[0,5,-38],48]],env:SCH,draw:(T,u)=>{const off=(u*16)%8;R.box(M.T(0,0,0),'#000000');hall2(T,99,{flick:1})},sfx:[[0,'heart']]}],
 [{cam:[[[1,6.6,3.5],[5,7.2,-2],40,.08],[[2,6.9,1.5],[5,7.3,-2],30,-.08]],env:T=>SCH(T,{lp:[3,8,3],lc:'#ff3030'}),shake:.45,draw:T=>hall2(T,99,{bell:1,flick:1}),sfx:[[0,'bell'],[.8,'bell']]}],
 [{cam:[[[4,6,8],[0,3.5,-4],46],[[3,5.4,6],[0,3.5,-4],40]],env:DAYC,draw:(T,u)=>{classroom({},T);C(boyN,{x:0,y:.4,z:-1.8,sit:1,yaw:PI,lean:u<.4?.6:0,face:u<.4?'sleep':'shock',headPitch:u<.4?.5:0},T)},sfx:[[0,'whoosh'],[.5,'hit']]}],
 [{cam:[[[0,5,8],[0,3,0],46],[[0,4.6,6.5],[0,3,0],40]],env:DAYC,draw:T=>{classroom({},T)},ov:(T,u)=>{const s=ease(clamp(u*3,0,1));ctx.save();ctx.translate(W2/2,470);ctx.scale(s,s);card(0,0,620,520,-.03,'#f2ead6');ctx.rotate(-.03);txt('JURNAL',0,-200,44,'#2a3a6a',0);
   ['1. ANVAR','2. DILSHOD','3. ALISHER'].forEach((t,i)=>{ctx.font='900 40px Inter';ctx.textAlign='left';ctx.fillStyle='#222';ctx.fillText(t,-260,-110+i*80)});
   if(u>.45){ctx.save();ctx.globalAlpha=ramp(u,.45,.6);txt('ABADIY',150,50,40,'#c01010',0);txt('NAVBATCHI',150,100,40,'#c01010',0);ctx.restore()}ctx.restore()},sfx:[[0,'click'],[.5,'stinger']]}],
 [{noSplit:1,cam:[[[0,5,14],[0,6,-10],50],[[0,5,10],[0,6,-10],48]],env:SCH,draw:T=>{hall2(T,99,{flick:1});C(tch,{x:0,z:-8,scale:1.9,face:'glow'},T)},ov:(T,u)=>ctaCard(ramp(u,0,.5),T),sfx:[[0,'whoosh']]}],
];
boot({horror:1,fovK:1.15});build(TIMINGDATA,S,{tail:1.6});
