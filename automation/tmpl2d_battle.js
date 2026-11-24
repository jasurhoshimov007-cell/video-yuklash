// ===== "Izoh = ovoz" jang-jadval shabloni (2D). SPEC:
// {hookTitle:["ENG KUCHLI","TELEFON?"], cards:[{n:"Samsung",e:"📱",c:"#1a73e8"} x8], finalists:[1,4,6],
//  roles:["hook","intro","reveal","only1","rule","one","friend","final3","ask","cta"]}   (reveal = 8 ta nom sanalgan gap)
const CD=SPEC.cards,RL=SPEC.roles.indexOf('reveal'),FIN=SPEC.finalists||[1,4,6];
function battleBG(t){ctx.fillStyle=lgrad(0,-100,0,1400,[[0,'#0b1058'],[.5,'#2a2fb8'],[1,'#0a0d3a']]);ctx.fillRect(-300,-300,1320,1900);glow(360,520,520,'#4a5cff',.28);
 for(let i=0;i<14;i++){const x=hash(i)*720,y=(hash(i+4)*1400+t*24*(1+hash(i)))%1400-60;ctx.globalAlpha=.1;ell(x,y,16+hash(i+8)*30,16+hash(i+8)*30,'#9aa6ff')}ctx.globalAlpha=1}
const cxy=i=>[30+(i%2)*350,235+Math.floor(i/2)*152];
function drawCard(i,t,st={}){const[x,y]=cxy(i),c=CD[i],rev=st.rev===undefined?1:st.rev,votes=st.votes||0;ctx.save();ctx.translate(x+160,y+66);ctx.globalAlpha=st.dim?.3:1;
 const fl=Math.max(.05,Math.abs(Math.cos(clamp(rev,0,1)*PI)));ctx.scale(fl,1+(st.pop||0)*.08);const face=rev>=.5;
 if(st.hi){ctx.shadowColor=c.c;ctx.shadowBlur=30}
 rrect(-160,-66,320,132,26,face?'#141a5e':'#10164f');ctx.shadowBlur=0;ctx.lineWidth=4;ctx.strokeStyle=face?c.c:'#3a46c8';ctx.beginPath();ctx.roundRect(-160,-66,320,132,26);ctx.stroke();
 if(face){rrect(-142,-46,92,92,22,c.c);ctx.font='56px "Noto Color Emoji"';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(c.e,-96,6);ctx.font='900 32px Inter';let sz=32;const w=ctx.measureText(c.n).width;if(w>190)sz=32*190/w;txt(c.n,-36,-12,sz,'#fff',0,'left');txt(`${votes} ovoz`,-36,28,24,'#ffd23a',0,'left',800)}
 else txt('?',0,6,84,'#ffd23a',0);
 ctx.restore();if(st.crown){ctx.save();ctx.font='56px "Noto Color Emoji"';ctx.textAlign='center';ctx.fillText('👑',x+290,y+4+Math.sin(t*8)*4);ctx.restore()}
 if(st.plus){ctx.save();ctx.globalAlpha=1-st.plus;txt('+1',x+250,y+10-st.plus*50,54,'#7aff7a',8);ctx.restore()}}
function dots(n){for(let i=0;i<8;i++){ell(285+i*21,212,6,6,i<n?'#ffd23a':'rgba(255,255,255,.25)')}}
function hdr(l1,l2,u,y=100){const a=ease(ramp(u,0,.2));if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(360,y+(1-a)*20);const fit=(s,sz)=>{ctx.font=`900 ${sz}px Inter`;const w=ctx.measureText(s).width;return w>640?sz*640/w:sz};{const s1=fit(l1,l2?58:76);txt(l1,0,0,s1,'#fff',s1*.2);}if(l2){const s2=fit(l2,86);txt(l2,0,72,s2,'#ffd23a',s2*.18)}ctx.restore()}
const HOSTB=(t,m,x={})=>Object.assign({x:360,y:1330,s:.95,upper:1,t,mouth:m,mshape:'smile'},x);
function grid(t,sts){for(let i=0;i<8;i++)drawCard(i,t,sts(i))}
const camB=[[1,360,640],[1.03,360,640]];
const SH={
 hook:()=>({cam:[[1,360,640],[1.07,360,620]],scene:(t,u,m)=>{battleBG(t);drawHost(HOSTB(t,m,{s:1.9,y:1300,eye:'wide',brow:.4,aL:[2.3,2.6],aR:[2.3,2.6]}))},ov:(T,u)=>headline(SPEC.hookTitle,u*2,190,96,['#fff','#ffd23a']),sfx:[[0,'hit'],[.15,'whoosh']]}),
 intro:()=>({cam:camB,scene:(t,u,m)=>{battleBG(t);grid(t,i=>({rev:0}));drawHost(HOSTB(t,m))},ov:(T,u)=>{hdr('JANGDA QATNASHADI','8 '+(SPEC.unit||'TA'),u);dots(0)},sfx:[[0,'whoosh'],[.4,'pop']]}),
 reveal:()=>{const W=TIMINGDATA.lines[RL].words,L0=TIMINGDATA.lines[RL].t0-.05;return{cam:camB,scene:(t,u,m)=>{battleBG(t);grid(t,i=>{const t0=(W[i]?W[i].t0:99)-.05,r=ramp(t,t0,t0+.38);return{rev:r,pop:r>0&&r<1?1:0}});drawHost(HOSTB(t,m))},ov:(T,u)=>{hdr('JANGDA QATNASHADI','8 '+(SPEC.unit||'TA'),1);dots(W.filter(w=>T>=w.t0).length)},sfx:W.slice(0,8).map(w=>[w.t0-L0-.05,'pop'])}},
 only1:()=>({cam:camB,scene:(t,u,m)=>{battleBG(t);const h=Math.floor(u*14)%8;grid(t,i=>({hi:i===h,crown:i===h,dim:i!==h?.4:0}));drawHost(HOSTB(t,m))},ov:(T,u)=>hdr('FAQAT BITTASI','G‘OLIB BO‘LADI',u),sfx:[[0,'whoosh'],[.4,'tick'],[.8,'tick'],[1.2,'tick']]}),
 rule:()=>({cam:camB,scene:(t,u,m)=>{battleBG(t);grid(t,i=>({dim:1}));drawHost(HOSTB(t,m))},ov:(T,u)=>{hdr('QOIDA','JUDA ODDIY',u,100);const a=ease(ramp(u,.2,.4));ctx.save();ctx.globalAlpha=a;ctx.translate(360,520);rrect(-290,-70,580,140,36,'#fff');const full=CD[1].n,k=Math.floor(clamp((u-.35)*2.4,0,1)*full.length);txt('💬 '+full.slice(0,k)+(Math.floor(T*3)%2?'|':''),-250,0,46,'#111',0,'left',800);ctx.restore()},sfx:[[0,'pop'],[.7,'click'],[.8,'click'],[.9,'click']]}),
 one:()=>({cam:camB,scene:(t,u,m)=>{battleBG(t);grid(t,i=>({dim:i!==1?.45:0,votes:u>.45&&i===1?1:0,plus:i===1&&u>.45?clamp((u-.45)*2.2,0,1):undefined,hi:i===1}));drawHost(HOSTB(t,m))},ov:(T,u)=>{const a=ease(ramp(u,0,.25));ctx.save();ctx.globalAlpha=a;ctx.translate(360,130);ctx.scale(.8+.2*a,.8+.2*a);rrect(-110,-50,150,100,26,'#fff');txt('1',-35,-12,50,'#111',0);txt('izoh',-35,26,24,'#555',0,'center',800);txt('=',72,0,70,'#ffd23a',10);rrect(130,-50,130,100,26,'#2a6aff');txt('OVOZ',195,2,34,'#fff',0);ctx.restore()},sfx:[[0,'pop'],[.9,'ding']]}),
 friend:()=>({cam:camB,scene:(t,u,m)=>{battleBG(t);grid(t,i=>({dim:i!==3?.45:0,votes:u>.55&&i===3?1:0,plus:i===3&&u>.55?clamp((u-.55)*2.2,0,1):undefined}));drawHost(HOSTB(t,m,{x:230}));drawHost({x:lerp(900,520,ease(ramp(u,0,.5))),y:1330,s:.95,upper:1,t,pal:{hood:'#e0752a',hoodL:'#f09a4a'},mouth:0,mshape:'smile',aL:[.2,.1],aR:[2.4,2.7]})},ov:(T,u)=>hdr('DO‘STINGIZNI','CHAQIRING!',u),sfx:[[0,'whoosh'],[.6,'pop']]}),
 final3:()=>({cam:camB,scene:(t,u,m)=>{battleBG(t);grid(t,i=>({dim:!FIN.includes(i)?.3:0,hi:FIN.includes(i)&&u>.3,votes:0}));drawHost(HOSTB(t,m))},ov:(T,u)=>{hdr('FAQAT 3 TASI','FINALGA CHIQADI',u);FIN.forEach((i,k)=>{if(u>.3+k*.15){const[x,y]=cxy(i);ctx.save();ctx.font='60px "Noto Color Emoji"';ctx.textAlign='center';ctx.fillText(['🥇','🥈','🥉'][k],x+292,y+8);ctx.restore()}})},sfx:[[0,'whoosh'],[.5,'pop'],[.8,'pop'],[1.1,'pop']]}),
 ask:()=>({cam:camB,scene:(t,u,m)=>{battleBG(t);grid(t,i=>({}));drawHost(HOSTB(t,m,{eye:'wide',brow:.3}))},ov:(T,u)=>{hdr('SIZNIKI QAYSI?',null,u,100);const a=ease(ramp(u,.2,.5));ctx.save();ctx.globalAlpha=a;ctx.translate(360,160);rrect(-250,-30,500,70,35,'#2a6aff');txt('IZOHDA YOZING 👇',0,6,36,'#fff',0);ctx.restore()},sfx:[[0,'pop']]}),
 cta:()=>({cam:camB,scene:(t,u,m)=>{battleBG(t);for(let i=0;i<30;i++){const ph=(t*.7+hash(i))%1;ctx.save();ctx.translate(hash(i+2)*720,ph*1300);ctx.rotate(t*3+i);ctx.fillStyle=['#ffd23a','#ff4fd8','#22e4ff','#7aff7a'][i%4];ctx.fillRect(-6,-3,12,6);ctx.restore()}drawHost(HOSTB(t,m,{x:360,y:1330,s:1.3,aL:[2.4,2.7],aR:[2.4,2.7]}))},ov:(T,u)=>{txt('O‘YININGIZNI',360,110,52,'#fff',10);txt('TANLANG!',360,180,92,'#ffd23a',16);[['Izohda yozing','#2a6aff','#fff'],['Do‘stingizga yuboring','#fff','#111'],['OBUNA BO‘LING 🔔','#ff0033','#fff']].forEach(([l,c,tc],k)=>{const a=ease(ramp(u,.1+k*.2,.3+k*.2));ctx.save();ctx.globalAlpha=a;ctx.translate(360,330+k*110+(1-a)*40);rrect(-250,-40,500,80,40,c);txt(l,0,4,36,tc,0);ctx.restore()})},sfx:[[0,'tada'],[.5,'pop'],[.9,'pop'],[1.3,'ding']]})
};
const S=SPEC.roles.map(r=>SH[r]());
boot2d({subY:945});build2d(TIMINGDATA,S,{tail:1.5,kw:SPEC.kw||[]});
