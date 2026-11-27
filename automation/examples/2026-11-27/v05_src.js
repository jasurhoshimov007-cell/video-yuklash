// IJARA KVARTIRA (1-qism, davomi Telegramda)
const PART='1-QISM';
const hero={...LK.man,shirt:'#d0453a',pants:'#23262e',hair:'#14100c'};
const owner={...LK.kampir};
const NK=(T,o={})=>E('night',Object.assign({fog:'#121a30',fogD:.014,amb:'#6070a0',sun:'#8a98c8',lamp:'#cfe0ff',lampPos:[2,8,-2]},o));
const WK=(T)=>E('warm',{fog:'#e8d2b0',fogD:.008,amb:'#b0a088',sun:'#fff0d0',lamp:'#ffd890',lampPos:[0,9,0]});
const RED=(T)=>E('red',{fog:'#1c070a',fogD:.018,amb:'#8a3a42',sun:'#b04850',lampPos:[2,7,-4],lamp:noise1(T*8)>-.3?'#ff4040':'#501010'});
const CX=[-5,-1.5,2];
function kitchen(T,o={}){room({W:22,D:20,H:11,wall:'#e6dcc4',wall2:'#d8ccb0',floor:'#7a6a5a'});
 for(let i=-5;i<=5;i++)for(let j=0;j<3;j++)B(i*2,3.6+j*.9,-9.7,1.9,.85,.05,(i+j)%2?'#f4f0e8':'#cfe0e8');
 B(-1,0,-8.6,14,3.4,2.2,'#8a5a3a');B(-1,3.4,-8.6,14.2,.25,2.4,'#d8d4cc');B(6.8,0,-8.4,3,8,2.6,'#e8eef2');B(6.8,4.2,-7.05,2.8,.08,.08,'#888');
 B(2,3.65,-8.3,1.6,.2,1.2,'#333');teapot(-4,3.65,-8.2);win(-9.7,6,-3,PI/2,4,3.5,o.day?'#bfe6ff':'#1a2850',o.day?.9:.4);
 CX.forEach((x,i)=>{const z=-8.9,y=6.3,w=3.2,h=3,op=i==2?(o.open||0):0;B(x,y,z-.4,w,h,1.4,'#6a4226');
  if(i==2&&o.inside)o.inside(x,y,z);
  const m=chain(M.T(x+w/2,y,z+.35),M.RY(op*1.8),M.T(-w/2,h/2,0));BM(m,w-.1,h-.1,.15,i==2&&o.glow?'#7a2a2a':'#8a5a32');BM(chain(m,M.T(-w/2+.4,0,.12)),.2,.5,.12,'#d9b84a',.3);
  if(i==2&&o.glow)B(x,y-.15,z+.36,w+.3,.12,.1,'#ff3030',1.2*(.6+.4*sin(T*6)))});
 B(0,0,1.5,6,3.2,3,'#9a6a40');B(0,3.2,1.5,6.4,.2,3.4,'#b88a5a')}
function inPhoto(x,y,z){B(x,y+.4,z-.2,1.6,2,.08,'#f2ead6');B(x,y+.6,z-.15,1.3,1.4,.05,'#c88a5a',.2)}
function bedroomK(T){bedroom({night:1},T)}
const S=[
 [{cam:[[[6,9,16],[0,4,-6],56],[[5,8.4,14],[0,4.2,-6],52]],env:WK,draw:(T,u)=>{kitchen(T,{day:1,glow:1});C({...owner,item:'box'},{x:-2,z:1,yaw:-.3,scale:.9,face:'talk',aR:-1.3},T);C(hero,{x:2.5,z:3,yaw:PI+.6,scale:.85,face:'calm'},T)},ov:(T,u)=>hookTitle(['3-SHKAFNI','HECH QACHON OCHMA!'],u*.5+.3),sfx:[[0,'hit'],[.1,'whoosh']]}],
 [{noSplit:1,cam:[[[0,4.8,8],[2.5,4,3],40],[[.4,4.7,7],[2.5,4,3],35]],env:WK,draw:(T,u)=>{kitchen(T,{day:1});C(hero,{x:2.5,z:3,yaw:-.4,scale:.85,face:'happy'},T)},ov:(T,u)=>bigTxt('IJARA: JUDA ARZON 💸',230,'#ffe14d',u,80),sfx:[[0,'ding']]}],
 [{noSplit:1,cam:[[[1,6.5,2],[2,7.5,-9],44],[[1.5,6.4,0],[2,7.6,-9],38]],env:NK,shake:.12,draw:(T,u)=>{kitchen(T,{glow:1,open:Math.abs(sin(T*14))*.03})},ov:(T)=>clockTxt('02:00',110,'#ff5050'),sfx:[[.1,'thud'],[.35,'thud'],[.6,'thud']]}],
 [{noSplit:1,cam:[[[5.2,4.8,6],[4,3.7,-1],40],[[5,4.7,5.2],[4,3.7,-1],36]],env:NK,draw:(T,u)=>{bedroomK(T);C(hero,{x:4,z:-1,yaw:0,scale:.85,face:'scared',headYaw:.3*sin(T*2)},T)},ov:(T,u)=>subPill(T,u),sfx:[[0,'pop']]}],
 [{cam:[[[-6,7,9],[2,3,-6],54],[[-5,6.6,8],[2,3,-6],50]],env:NK,draw:(T,u)=>{bedroomK(T);C(hero,{x:4,z:-6,yaw:-PI/2,scale:.85,face:'sleep'},T)},ov:(T,u)=>bigTxt('14-KECHA... JIMJITLIK',230,'#ffffff',u,74),sfx:[[0,'drone']]}],
 [{noSplit:1,cam:[[[5.2,4.8,6],[4,3.7,-1],40],[[5,4.7,5.4],[4,3.7,-1],37]],env:NK,draw:(T,u)=>{bedroomK(T);C({...hero,item:'phone'},{x:4,z:-1,yaw:0,scale:.85,face:'calm',aR:-1.3,headPitch:.3},T)},ov:(T,u)=>phoneUI(T,u,null,'Noma’lum raqam','02:14'),sfx:[[0,'ding']]}],
 [{noSplit:1,cam:[[[5,4.6,5],[4,3.7,-1],38],[[4.8,4.5,4.2],[4,3.7,-1],33]],env:NK,shake:.15,draw:(T,u)=>{bedroomK(T);C({...hero,item:'phone'},{x:4,z:-1,yaw:0,scale:.85,face:'shock',aR:-1.3},T)},ov:(T,u)=>phoneUI(T,.5+u*.5,['Rahmat.','Ertaga men chiqaman.'],'Noma’lum raqam','02:14'),sfx:[[0,'ding'],[.3,'stinger']]}],
 [{noSplit:1,cam:[[[7,9,10],[2,4,-6],52],[[6,8.6,9],[2,4.2,-6],48]],env:NK,draw:(T,u)=>{kitchen(T,{open:.55,glow:1,inside:inPhoto});C({...hero,item:'flashlight'},{x:lerp(4,2.5,u),z:lerp(3,-3,u),yaw:PI+.2,scale:.85,face:'scared',aR:-1.4,...walk(T,4,.3)},T)},sfx:[[0,'door'],[.3,'step'],[.6,'step']]}],
 [{noSplit:1,cam:[[[0,7,6],[2,6,-9],46],[[.5,6.9,4.5],[2,6.2,-9],42]],env:(T)=>NK(T,{lamp:'#fff6c0',lampPos:[2,6.5,-5]}),draw:(T,u)=>kitchen(T,{open:.6,glow:1,inside:inPhoto}),ov:(T,u)=>bigTxt('ICHIDA BITTA SURAT...',230,'#ffe14d',u,74),sfx:[[0,'stinger']]}],
 [{noSplit:1,cam:[[[2.4,6.8,-4.6],[2,6.9,-9],30],[[2.3,6.8,-5],[2,6.9,-9],27]],env:RED,shake:.2,draw:(T,u)=>kitchen(T,{open:.6,glow:1,inside:inPhoto}),ov:(T,u)=>{photoCard(T,u,{emoji:['🧍'],es:200,bg:'#3a2a3a',label:'27.11.2026',lc:'#b01010'});bigTxt('SENING SURATING!',200,'#ff2a2a',clamp((u-.3)*2,0,1),84)},flash:(u)=>u<.05?.6:0,sfx:[[0,'hit'],[.3,'heart']]}],
 [{noSplit:1,cam:[[[3,7,10],[0,5.5,-9],52],[[2.5,6.8,9],[0,5.6,-9],48]],env:RED,draw:(T,u)=>kitchen(T,{open:.6,glow:1,inside:inPhoto}),ov:(T,u)=>tgEnd(T,u),sfx:[[0,'whoosh'],[.4,'pop']]}],
];
boot({horror:1,global:partBadge,subY:.72});build(TIMINGDATA,S,{tail:1.8});
