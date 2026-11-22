// QAYSI ESHIK?
const ST=E('party',{fog:'#1a1036',fogD:.01,amb:'#8a80b0',sun:'#fff0f8',sunDir:[.1,1,.9],lampPos:[0,12,4],lamp:'#ffffff'});
const host={skin:'#f1c99a',shirt:'#ffffff',coat:'#1f2a8a',belt:'#d02a2a',pants:'#22252e',shoes:'#111',hat:'doppi'};
const rob={skin:'#222228',shirt:'#2e2e36',pants:'#1a1a20',shoes:'#0a0a0a',hat:'hood',hatCol:'#18181e',eye:'#f0f0f0'};
const DX=[-9,0,9],DC=['#d0342c','#2c6fd0','#e0a817'];
function stage(T,open=[0,0,0],o={}){B(0,-.5,0,44,.5,40,'#3a2f5a');B(0,-.45,4,30,.5,10,'#5a4a8a');
 // wall with holes
 const segs=[[-22,-11.25],[-6.75,-2.25],[2.25,6.75],[11.25,22]];segs.forEach(([a,b])=>B((a+b)/2,0,-8,b-a,18,.6,'#2a1f48'));DX.forEach(x=>B(x,8,-8,4.5,10,.6,'#2a1f48'));
 for(let i=0;i<3;i++){const x=DX[i];door(x,-7.6,0,open[i],DC[i],4.5,8);B(x,-.4,-13,8,.5,10,'#2a2030');B(x-4,0,-13,.5,9,10,'#1a1424');B(x+4,0,-13,.5,9,10,'#1a1424');B(x,0,-18,8,9,.5,'#1a1424');
  if(o.glow===i)B(x,8.2,-7.3,5.2,.3,.3,'#3aff7a',2);}
 fire(-9,-12,T,1.2);B(-9,4,-17.6,7,7,.2,'#ff6a1a',.6);
 C(rob,{x:-1.6,z:-12,face:'angry',aR:-.6},T);C(rob,{x:1.6,z:-12.5,face:'angry',aL:-.6,seed:2},T);
 lion(9,-13,0,T,o.dead);
 for(let i=0;i<5;i++)B(-12+i*6,16,-7.2,2,1,.3,['#ff4a8a','#ffd23a','#4ad0ff','#7aff7a','#ff8a3a'][i],1.5*(.6+.4*sin(T*5+i)))}
const nums=(a=1)=>{if(a<=0)return;ctx.globalAlpha=a;DX.forEach((x,i)=>projTxt([x,9.5,-7.4],String(i+1),70,'#fff',10));ctx.globalAlpha=1};
const W7=()=>TIMING.lines[7].words;
const S=[
 [{cam:[[[0,7,26],[0,5,-8],50],[[0,6,20],[0,5,-8],46]],env:ST,draw:T=>stage(T),ov:(T,u)=>{nums(1);hookTitle(['FAQAT 1%','TOPA OLADI'],u*.7+.1,'#3aff7a')},sfx:[[0,'hit']]}],
 [{cam:[[[2,5,8],[0,4.3,0],38],[[1,4.8,6.5],[0,4.3,0],32]],env:ST,draw:T=>{stage(T);C(host,{x:0,z:0,face:'talk',aR:-2.9,aRz:.2},T)},ov:(T,u)=>bubble(360,260,'DIQQAT!',50,u*1.5),sfx:[[0,'pop']]}],
 [{cam:[[[-10,8,22],[0,4.5,-8],50],[[10,8,22],[0,4.5,-8],50]],env:ST,draw:T=>{stage(T);C(host,{x:-5,z:2,yaw:.5,face:'happy',aR:-1.6},T)},ov:()=>nums(1),sfx:[[0,'whoosh']]}],
 [{cam:[[[-9,5,6],[-9,4,-10],48],[[-9,4.8,3],[-9,4,-11],42]],env:E('party',{fog:'#2a1020',lamp:'#ff7a2a',lampPos:[-9,5,-10],amb:'#9a7080'}),shake:.1,draw:(T,u)=>stage(T,[ease(ramp(u,0,.4)),0,0]),ov:(T,u)=>badge(1,'OLOV',u*1.5,'#d0342c'),sfx:[[0,'door'],[.4,'whoosh']]}],
 [{cam:[[[0,5,6],[0,4,-10],48],[[0,4.8,3],[0,4,-11],42]],env:ST,draw:(T,u)=>stage(T,[0,ease(ramp(u,0,.4)),0]),ov:(T,u)=>badge(2,'QAROQCHILAR',u*1.5,'#2c6fd0'),sfx:[[0,'door']]}],
 [{cam:[[[9,5,6],[9,3.5,-10],48],[[9,4.6,3],[9,3.5,-11],40]],env:ST,shake:(u)=>u>.4?.3:.05,draw:(T,u)=>stage(T,[0,0,ease(ramp(u,0,.4))]),ov:(T,u)=>badge(3,'OCH SHER',u*1.5,'#e0a817'),sfx:[[0,'door'],[.4,'roar']]}],
 [{cam:[[[0,6,14],[0,5,-8],50],[[0,7,22],[0,5,-8],50]],env:ST,draw:T=>stage(T),ov:(T,u)=>{nums(1);const s=1+.08*sin(T*8);ctx.save();ctx.translate(W2/2,330);ctx.scale(s,s);txt('?',0,0,200,'#ffd23a',16);ctx.restore()},sfx:[[0,'pop']]}],
 [{noSplit:1,cam:[[[-12,9,24],[0,5,-8],50],[[12,9,24],[0,5,-8],50]],env:ST,draw:T=>stage(T),ov:(T,u)=>{nums(1);const ws=W7();let k=ws.findIndex(w=>T<w.t1);if(k<0)k=4;const n=5-k;const w=ws[k];const p=clamp((T-w.t0)/.25,0,1);ctx.save();ctx.translate(W2/2,330);ctx.scale(1.4-.4*p,1.4-.4*p);txt(String(n),0,0,230,n<=2?'#ff3b3b':'#ffffff',18);ctx.restore()},sfx:[[0,'tick'],[.8,'tick'],[1.6,'tick'],[2.5,'tick'],[3.3,'tick']]}],
 [{cam:[[[9,6,14],[9,4.5,-8],46],[[9,5.5,10],[9,4.5,-8],40]],env:ST,draw:T=>stage(T,[0,0,0],{glow:2}),ov:(T,u)=>{nums(1);const s=ease(clamp(u*3,0,1));ctx.save();ctx.translate(W2/2,330);ctx.scale(s,s);ctx.beginPath();ctx.arc(0,0,110,0,7);ctx.fillStyle='#22c55e';ctx.fill();txt('✓',0,8,140,'#fff',0);ctx.restore()},sfx:[[0,'tada']]}],
 [{cam:[[[9,4,2],[9,2,-13],46],[[9,3.6,0],[9,2,-13],40]],env:ST,draw:(T,u)=>stage(T,[0,0,1],{dead:1}),ov:(T,u)=>bubble(360,280,'3 YIL OCH = O‘LGAN',38,u*1.5),sfx:[[0,'pop']]},
  {cam:[[[3,6,12],[9,3,-12],44],[[5,5.5,8],[9,3,-12],40]],env:ST,draw:(T,u)=>{stage(T,[0,0,1],{dead:1});C(host,{x:5,z:-2,yaw:-.6,face:'laugh',aR:-2.6,aRz:.3},T)},sfx:[[0,'laugh']]}],
 [{cam:[[[6,6,10],[9,4,-6],48],[[6,5.6,6],[9,4,-9],44]],env:ST,draw:(T,u)=>{stage(T,[0,0,1],{dead:1});const w=walk(T,6,.45);C(host,{x:9,z:lerp(0,-9,u),yaw:PI,...w,face:'happy'},T)},sfx:[[0,'step'],[.3,'step'],[.6,'tada']]}],
 [{cam:[[[0,5,10],[0,4.2,0],42],[[0,4.8,8],[0,4.3,0],36]],env:ST,draw:T=>{stage(T,[0,0,1],{dead:1});C(host,{x:0,z:0,face:'laugh',aR:-2.9,aRz:.4},T)},ov:(T,u)=>{hearts(T,u);bigLike(ramp(u,.1,.5),T)},sfx:[[0,'pop'],[.5,'ding']]}],
 [{cam:[[[-3,5.2,9],[0,4.2,0],40],[[-2,5,7.5],[0,4.2,0],34]],env:ST,draw:T=>{stage(T);C({...host,item:'phone'},{x:0,z:0,face:'happy',aR:-1.5},T)},ov:(T,u)=>bubble(360,260,'DO‘STINGIZGA YUBORING!',34,u*1.5),sfx:[[0,'whoosh']]}],
 [{noSplit:1,cam:[[[0,7,22],[0,5,-6],50],[[0,6,17],[0,5,-6],46]],env:ST,draw:T=>{stage(T);C(host,{x:0,z:2,face:'happy',aR:-2.6+.4*sin(T*8)},T)},ov:(T,u)=>ctaCard(ramp(u,0,.5),T),sfx:[[0,'whoosh']]}],
];
boot({fovK:1.2});build(TIMINGDATA,S,{tail:1.4});
