// ===== qo'shimcha 2D horror sahnalar =====
function figure(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const c=o.col||'#05060d';
 ell(0,-40,34,34,c);poly([[-46,-8],[46,-8],[58,230],[-58,230]],c);ell(0,-40,34,34,c);
 if(!o.noEyes){const g=o.glow||1;ctx.shadowColor='#fff';ctx.shadowBlur=14*g;ell(-12,-44,6,3.4,'#f4f6ff');ell(12,-44,6,3.4,'#f4f6ff')}ctx.restore()}
function sceneStairs(t,o={}){ctx.fillStyle=lgrad(0,-300,0,1500,[[0,'#0b0e26'],[1,'#12183a']]);ctx.fillRect(-300,-300,1320,1900);
 // devorlar (perspektiva)
 poly([[-300,-300],[200,380],[200,820],[-300,1500]],'#10143a');poly([[1020,-300],[520,380],[520,820],[1020,1500]],'#0d1130');
 const n=o.steps||14;for(let i=0;i<n;i++){const p=i/n,y=1250-Math.pow(p,.62)*870,w=470-p*250,h=Math.max(8,54*(1-p*.8));
  ctx.fillStyle=lgrad(0,y,0,y+h,[[0,'#4a5388'],[1,'#222a5a']]);ctx.fillRect(360-w/2-40*(1-p),y,w+80*(1-p),h);ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(360-w/2,y+h-4,w,4)}
 const lg=ctx.createRadialGradient(360,420,10,360,420,420);lg.addColorStop(0,`rgba(255,220,150,${.18+.1*Math.sin(t*9)*(o.flick||0)})`);lg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=lg;ctx.fillRect(-300,-300,1320,1900);
 if(o.fig>0){const f=o.fig;figure(360+Math.sin(t*2)*4,lerp(430,820,f*f),lerp(.35,1.9,f*f),{glow:f})}
 if(o.label)txt(o.label,360,220,120,o.lcol||'#ff3b5c',16)}
function sceneWindow(t,o={}){ctx.fillStyle=lgrad(0,-300,0,1500,[[0,'#070a22'],[1,'#0e1334']]);ctx.fillRect(-300,-300,1320,1900);stars(40,3,-100,300);
 ctx.fillStyle='#161c46';ctx.fillRect(-300,300,1320,1200);
 for(let r=0;r<6;r++)for(let c=0;c<4;c++){const x=40+c*165,y=360+r*150,on=hash(r*4+c)>.7,tgt=(r==2&&c==1);ctx.fillStyle=tgt?(o.lit?'#ffe9a0':'#10143a'):(on?'#e8c777':'#0b0f2c');ctx.fillRect(x,y,110,100);ctx.strokeStyle='#2a3170';ctx.lineWidth=5;ctx.strokeRect(x,y,110,100);
  if(tgt&&o.lit&&o.fig>0){ctx.save();ctx.beginPath();ctx.rect(x,y,110,100);ctx.clip();figure(x+55,y+40+(1-o.fig)*60,.5,{glow:o.fig});if(o.wave){limb(x+80,y+60,x+98+Math.sin(t*9)*10,y+30,8,'#05060d')}ctx.restore()}}
 if(o.zoom){}}
function sceneMonitor(t,o={}){ctx.fillStyle='#0b1a10';ctx.fillRect(-300,-300,1320,1900);ctx.fillStyle=lgrad(0,300,0,1100,[[0,'#16301c'],[1,'#0b180f']]);ctx.fillRect(-300,300,1320,800);
 rrect(190,560,340,200,16,'#2b4a30');rrect(205,575,310,170,10,'#1d3822');for(let i=0;i<6;i++)limb(205+i*62,575,205+i*62,745,6,'#3b6a44');
 if(o.fig>0)figure(lerp(130,330,o.fig),lerp(380,430,o.fig),1.4,{col:'#02060a',glow:o.fig});
 if(o.fig2>0)figure(560,380,1.6*o.fig2,{col:'#02060a',glow:1});
 ctx.fillStyle='rgba(120,255,160,.07)';ctx.fillRect(-300,-300,1320,1900);cctv(t,o.cam||'BEBI-KAM',o.time||'03:20:11')}
function sceneBus(t,o={}){ctx.fillStyle=lgrad(0,-300,0,900,[[0,'#050818'],[1,'#141b45']]);ctx.fillRect(-300,-300,1320,1200);stars(60,7,-100,400);ctx.fillStyle='#0a0c1c';ctx.fillRect(-300,880,1320,700);
 ctx.fillStyle='#1c2250';ctx.fillRect(-300,900,1320,14);for(let i=0;i<7;i++)ctx.fillRect(-250+i*200,1120,110,12);
 limb(130,430,130,880,14,'#222a58');limb(130,430,230,430,12,'#222a58');ell(230,445,28,16,'#fff2c0');
 const g=ctx.createLinearGradient(0,445,0,900);g.addColorStop(0,'rgba(255,240,180,.35)');g.addColorStop(1,'rgba(255,240,180,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(210,450);ctx.lineTo(250,450);ctx.lineTo(420,900);ctx.lineTo(40,900);ctx.fill();
 rrect(420,540,230,12,4,'#2a3170');limb(440,550,440,880,10,'#2a3170');limb(640,550,640,880,10,'#2a3170');rrect(410,500,250,50,6,'#161c46');txt('BEKAT',535,526,30,'#cfe0ff',0);
 if(o.d!=null){const d=o.d;figure(lerp(-120,260,d),lerp(760,840,d),lerp(.55,1.7,d),{glow:d,noEyes:o.noEyes})}
 if(o.clock)txt(o.clock,360,160,100,'#ff3b5c',14)}
function sceneDoor(t,o={}){ctx.fillStyle=lgrad(0,-300,0,1500,[[0,'#10122c'],[1,'#07081a']]);ctx.fillRect(-300,-300,1320,1900);
 ctx.fillStyle='#2a1a1e';ctx.fillRect(160,120,400,980);ctx.strokeStyle='#4a2b30';ctx.lineWidth=8;ctx.strokeRect(160,120,400,980);rrect(200,160,150,300,10,'#32202a');rrect(370,160,150,300,10,'#32202a');rrect(200,500,320,500,10,'#32202a');
 ell(360,330,16,16,'#9aa0c8');ell(360,330,7,7,'#06070e');ell(500,640,14,14,'#d8b25a');
 ctx.save();ctx.translate(0,Math.sin(t*50)*(o.knock||0)*3);
 const lg=lgrad(0,1100,0,1160,[[0,`rgba(255,220,140,${o.under??.7})`],[1,'rgba(255,220,140,0)']]);ctx.fillStyle=lg;ctx.fillRect(170,1090,380,70);
 if(o.feet){ctx.fillStyle='#02030a';ctx.fillRect(260,1086,70,16);ctx.fillRect(390,1086,70,16)}ctx.restore();
 if(o.eye)ell(360,330,10+6*Math.sin(t*5),10,'#ff3040')}
function sceneRoomDark(t,o={}){sceneBedroom(t,Object.assign({phoneGlow:1,glowX:338,glowY:668},o))}
// ===== 2026-11-25 sahnalar: qorli hovli, metro, qishloq tandir, videoqo'ng'iroq, mashina/navigator =====
function snowFall(t,n=70,sp=1){ctx.save();ctx.fillStyle='rgba(235,242,255,.85)';for(let i=0;i<n;i++){const x=(hash(i)*900-90+Math.sin(t*.8+i)*18),y=((hash(i+9)*1500+t*60*sp*(.6+hash(i+3)))%1500)-150,r=1.5+hash(i+5)*3;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()}ctx.restore()}
function snowman(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,10,90,18,'rgba(0,0,30,.35)');ell(0,-60,80,74,'#e6ecfa');ell(-18,-80,40,30,'#ffffff');ell(0,-170,58,54,'#e6ecfa');ell(0,-255,42,40,'#eef2ff');
 rrect(-44,-212,88,16,8,o.scarf||'#c0283a');rrect(14,-206,18,46,8,o.scarf||'#c0283a');
 const g=o.glow||0;if(g){ctx.shadowColor='#ff2a3a';ctx.shadowBlur=20*g}ell(-15,-262,7,7,g?'#ff3b4a':'#111');ell(15,-262,7,7,g?'#ff3b4a':'#111');ctx.shadowBlur=0;
 poly([[0,-252],[34,-246],[0,-240]],'#f07a1a');limb(-50,-170,-110,-215,5,'#4a2a18');limb(50,-170,110,-210,5,'#4a2a18');ctx.restore()}
function sceneSnowYard(t,o={}){ctx.fillStyle=lgrad(0,-300,0,800,[[0,'#060b22'],[1,'#1a2756']]);ctx.fillRect(-300,-300,1320,1200);stars(30,11,-200,300);ell(560,150,46,46,'#e9eef8');glow(560,150,200,'#bcd0ff',.25);
 ctx.fillStyle='#141a3c';ctx.fillRect(-300,420,1320,420);rrect(-300,410,1320,20,8,'#dfe8fb');
 // uy devori, ayvon, deraza
 ctx.fillStyle='#202a5a';ctx.fillRect(380,300,420,560);poly([[360,300],[820,300],[780,250],[400,250]],'#121838');rrect(372,290,440,18,6,'#e6eefc');
 rrect(470,420,150,170,8,o.winLit?'#ffd98a':'#2a3a70');ctx.strokeStyle='#0c1030';ctx.lineWidth=8;ctx.strokeRect(470,420,150,170);limb(545,420,545,590,6,'#0c1030');limb(470,505,620,505,6,'#0c1030');if(o.winLit)glow(545,505,190,'#ffcc66',.35);
 for(let i=0;i<4;i++)rrect(390+i*110,620,16,240,4,'#3a2a20');rrect(380,610,420,20,4,'#4a3424');
 // darvoza
 rrect(20,460,190,380,6,'#3a3e60');for(let i=0;i<5;i++)limb(40+i*38,470,40+i*38,830,4,'#2a2e4a');rrect(14,452,202,16,6,'#e6eefc');
 ctx.fillStyle=lgrad(0,840,0,1500,[[0,'#cfdaf3'],[1,'#8e9fca']]);ctx.fillRect(-300,840,1320,700);
 for(let i=0;i<8;i++)ell(hash(i+2)*720,900+hash(i+7)*400,60+hash(i)*60,8,'rgba(120,140,190,.35)');
 const P=[[120,880,.55],[430,930,.8],[560,1010,1.25]];const k=o.sm??0;const a=P[Math.floor(k)],b=P[Math.min(2,Math.floor(k)+1)],f=k%1;
 if(o.sm!==null&&o.sm!==undefined&&!o.noSm)snowman(lerp(a[0],b[0],f),lerp(a[1],b[1],f),lerp(a[2],b[2],f),{glow:o.glow});
 if(o.prints){for(let i=0;i<6;i++){ell(300+i*40,1100+i*30,9,14,'rgba(80,100,150,.6)')}}
 snowFall(t,80)}
function sceneWinInside(t,o={}){ctx.fillStyle='#0d1230';ctx.fillRect(-300,-300,1320,1900);
 ctx.save();ctx.beginPath();ctx.rect(110,180,500,640);ctx.clip();ctx.translate(-202,-625);ctx.scale(1.25,1.25);sceneSnowYard(t,Object.assign({},o,{sm:o.sm}));ctx.restore();
 ctx.strokeStyle='#3a2a22';ctx.lineWidth=26;ctx.strokeRect(110,180,500,640);limb(360,180,360,820,14,'#3a2a22');limb(110,500,610,500,14,'#3a2a22');
 ctx.fillStyle='rgba(220,230,255,.12)';ctx.fillRect(90,160,140,690);ctx.fillRect(490,160,140,690);rrect(60,820,600,30,8,'#4a3424');ctx.fillStyle='#0a0d24';ctx.fillRect(-300,850,1320,700)}
// metro
function sceneMetro(t,o={}){ctx.fillStyle='#1c2430';ctx.fillRect(-300,-300,1320,1900);
 const sp=o.stop?0:1;for(let w=0;w<2;w++){const x=60+w*330;rrect(x,280,270,250,18,'#05070c');ctx.save();ctx.beginPath();ctx.roundRect(x,280,270,250,18);ctx.clip();
  if(o.platform){ctx.fillStyle='#2a2030';ctx.fillRect(x,280,270,250);ctx.fillStyle='#463040';ctx.fillRect(x,470,270,60);for(let i=0;i<3;i++)figure(x+50+i*85,360,.55,{glow:o.eyes||0,noEyes:!o.eyes})}
  else for(let i=0;i<4;i++){const lx=((i*140-t*900*sp)%560+560)%560-140+x;ell(lx,300,40,6,'rgba(255,230,160,.8)')}
  ctx.restore();ctx.strokeStyle='#8a96a8';ctx.lineWidth=8;ctx.beginPath();ctx.roundRect(x,280,270,250,18);ctx.stroke()}
 ctx.fillStyle='#e4e8ee';ctx.fillRect(-300,-300,1320,120);for(let i=0;i<3;i++){rrect(40+i*240,-120,160,22,10,o.dim?'#6a7080':'#fffbe6')}
 if(o.dim){ctx.fillStyle=`rgba(0,0,0,${.35+.15*Math.sin(t*23)})`;ctx.fillRect(-300,-300,1320,1900)}
 limb(360,-200,360,1100,12,'#b8c0cc');limb(30,180,690,180,10,'#b8c0cc');
 rrect(-100,690,920,90,20,'#2f6fb0');rrect(-100,770,920,200,10,'#24507e');ctx.fillStyle='#3a3a44';ctx.fillRect(-300,960,1320,600);
 if(o.board){rrect(150,190,420,70,10,'#120608');txt(o.board,360,228,42,'#ff3b3b',0)}
 if(o.granny){drawHost({x:560,y:800,s:.85,upper:1,t,pal:{hood:'#5a3a6a',hoodL:'#7a5a8a',skin:'#d9a88a'},scarf:'#e8dff0',eye:o.gEye||'open',brow:.6,mouth:o.gm||0,mshape:'neutral',look:-1,aL:[.2,.1],aR:[.2,.1]})}
 if(o.doors){const d=o.doors;ctx.fillStyle='#0a0408';ctx.fillRect(250-120*d,560,220+240*d,0);}
 glow(360,400,500,'#cfe0ff',.08)}
function sceneMetroDoors(t,o={}){const d=o.open??1;ctx.fillStyle='#1c2430';ctx.fillRect(-300,-300,1320,1900);
 ctx.fillStyle='#1a1018';ctx.fillRect(120,200,480,900);ctx.fillStyle=lgrad(0,200,0,1100,[[0,'#2a1820'],[1,'#120a10']]);ctx.fillRect(120,200,480,900);
 rrect(170,240,380,60,8,'#120608');txt(o.board||'QORA BEKAT',360,272,36,'#ff3b3b',0);
 for(let i=0;i<(o.n||4);i++){figure(190+i*110+Math.sin(t+i)*3,560+hash(i)*30,.9+hash(i+2)*.25,{glow:o.eyes?1:0,noEyes:!o.eyes})}
 ctx.fillStyle='#3a2a30';ctx.fillRect(120,980,480,120);
 const w=240*(1-d);rrect(120,200,w,900,0,'#9aa4b4');rrect(600-w,200,w,900,0,'#9aa4b4');if(w>40){rrect(140,320,Math.max(0,w-40),300,10,'#0a0d14');rrect(620-w,320,Math.max(0,w-40),300,10,'#0a0d14')}
 ctx.strokeStyle='#5a6474';ctx.lineWidth=24;ctx.strokeRect(108,188,504,924);ctx.fillStyle='#262e3a';ctx.fillRect(-300,1112,1320,500)}
// qishloq (qishloq-horror-2d uslubi: tungi ko'k, bitta iliq aksent)
const QP={sky1:'#0b1426',sky2:'#22355a',moon:'#e9ecf2',fog:'rgba(160,180,215,0.10)'};
function qNight(t){ctx.fillStyle=lgrad(0,-300,0,900,[[0,QP.sky1],[1,QP.sky2]]);ctx.fillRect(-300,-300,1320,1300);stars(40,21,-200,420);glow(470,170,180,'rgba(200,215,255,.6)',.5);ell(470,170,46,46,QP.moon);ell(456,163,9,9,'#c9ced9');ell(482,180,6,6,'#c9ced9');
 for(let i=0;i<3;i++){const x=((t*(6+i*3)+i*270)%1100)-300;rrect(x,130+i*46,340-i*50,12,6,'rgba(150,165,200,.22)')}}
function cypress(x,base,h){ell(x,base-h/2,15,h/2,'#0e1626')}
function qVillage(t,o={}){qNight(t);const gy=670;[120,350,575].forEach((x,i)=>cypress(x,gy-25,250+i*20));
 ctx.fillStyle='#151d30';ctx.fillRect(0,gy-100,220,130);poly([[-10,gy-100],[230,gy-100],[220,gy-120],[0,gy-120]],'#111827');
 if(o.lit!==0){rrect(44,gy-80,24,28,2,'#e8b65a');glow(56,gy-66,80,'rgba(232,182,90,.5)',.6)}
 ctx.fillStyle='#151d30';ctx.fillRect(470,gy-106,260,136);poly([[460,gy-106],[740,gy-106],[730,gy-126],[470,gy-126]],'#111827');
 ctx.fillStyle=lgrad(0,gy,0,1500,[[0,'#1b2742'],[1,'#0d1322']]);ctx.fillRect(-300,gy,1320,900);ctx.globalAlpha=.1;poly([[313,gy],[407,gy],[600,1300],[120,1300]],'#c9d6f2');ctx.globalAlpha=1;
 for(let i=0;i<7;i++)ell(hash(i+3)*720,gy+80+i*70,170,20,QP.fog);for(let i=0;i<6;i++)ctx.fillRect(14+i*15,gy+150,4,140);
 if(o.dog!=null){ctx.save();ctx.translate(560,gy+230);ell(0,0,40,22,'#0a0e18');ell(36,-18,16,14,'#0a0e18');ell(-38,-8,6,18,'#0a0e18');ctx.restore()}}
function tandir(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,0,110,90,'#5a3e2c');ell(0,-10,96,74,'#6a4a34');ell(0,-62,40,16,'#2a1810');
 if(o.fire){const f=o.fire*(.8+.2*Math.sin(t3()*20));glow(0,-62,160*f,'rgba(255,140,40,.8)',.7*f);ell(0,-64,34,12,`rgba(255,${150+60*Math.sin(t3()*13)},60,${f})`)}ctx.restore()}
let _T3=0;const t3=()=>_T3;
function sceneTandir(t,o={}){_T3=t;qNight(t);ctx.fillStyle=lgrad(0,600,0,1500,[[0,'#1b2742'],[1,'#0d1322']]);ctx.fillRect(-300,600,1320,900);
 ctx.fillStyle='#161d30';ctx.fillRect(-300,420,1320,200);poly([[-300,420],[1020,420],[1020,400],[-300,400]],'#111827');
 tandir(o.tx??470,760,1.3,{fire:o.cold?0:1});
 if(o.granny){const tn=o.turn||0;if(tn<.5){figure(250,560,1.25,{col:'#0a0c14',noEyes:true});ell(250,505,48,30,'#1e1a2c')}else{figure(250,560,1.25,{col:'#0a0c14',noEyes:true});ell(250,505,48,30,'#1e1a2c');ell(250,520,32,38,'#c8c2b8')}}
 if(o.cold){ctx.fillStyle='rgba(120,150,200,.25)';ctx.fillRect(-300,-300,1320,1900)}}
function sceneDastur(t,o={}){ctx.fillStyle='#1d1a2a';ctx.fillRect(-300,-300,1320,1900);ctx.fillStyle='rgba(200,215,255,.08)';poly([[100,0],[400,0],[700,1300],[200,1300]],'rgba(200,215,255,.06)');
 rrect(40,620,640,420,30,'#7a2030');for(let i=0;i<6;i++)limb(60,660+i*60,660,660+i*60,3,'#9a3040');
 ell(360,780,140,140,'#c08a48');ell(360,780,118,118,'#d8a25a');ell(360,780,60,60,'#e9c07a');for(let i=0;i<12;i++){const a=i/12*6.28;ell(360+Math.cos(a)*90,780+Math.sin(a)*90,5,5,'#7a5230')}
 for(let i=0;i<4;i++){const ph=(t*.6+i/4)%1;ctx.globalAlpha=(1-ph)*.5;ell(320+i*25+Math.sin(t*2+i)*10,700-ph*260,12+ph*20,22+ph*20,'#e8eef8')}ctx.globalAlpha=1}
// videoqo'ng'iroq
function sceneVideoCall(t,o={}){ctx.fillStyle=rgrad(360,560,0,900,[[0,'#101a46'],[1,'#03040c']]);ctx.fillRect(-300,-300,1320,1900);glow(360,560,440,'#22e4ff',.15);
 ctx.save();ctx.translate(360,560);ctx.rotate(Math.sin(t*1.3)*.012);rrect(-226,-420,452,840,54,'#0b0d16');ctx.save();ctx.beginPath();ctx.roundRect(-206,-400,412,800,38);ctx.clip();
 // xona: gilam + devor
 ctx.fillStyle='#3a2a4a';ctx.fillRect(-206,-400,412,800);rrect(-150,-330,300,380,10,'#7a1f2c');ctx.strokeStyle='#d8a25a';ctx.lineWidth=6;ctx.strokeRect(-130,-310,260,340);for(let i=0;i<4;i++)for(let j=0;j<5;j++)poly([[-90+i*60,-280+j*62],[-70+i*60,-260+j*62],[-90+i*60,-240+j*62],[-110+i*60,-260+j*62]],'#d8a25a');
 drawHost({x:0,y:330,s:1.25,upper:1,t,pal:{hood:'#7a4a8a',hoodL:'#9a6aaa',skin:'#e0b08e'},scarf:'#efe6f6',eye:'open',brow:0,mouth:0,mshape:o.smile===0?'neutral':'smile',look:0,aL:[.2,.1],aR:o.point?[2.4-o.point*.6,1.6]:[.2,.1]});
 if(o.fig){ctx.globalAlpha=o.fig;figure(130,-60,1.3,{glow:1});ctx.globalAlpha=1}
 rrect(110,-380,80,110,12,'#1a2040');drawHost({x:150,y:-270,s:.32,upper:1,t,eye:'wide',brow:1,mouth:0,mshape:'frown'});
 txt('🔴 '+(o.tm||'03:00'),-120,-360,24,'#fff',0,'left',800);txt('Onam',0,-300,30,'#fff',6);
 ctx.restore();rrect(-150,330,90,90,45,'#ff3040');txt('📞',-105,377,40,'#fff',0);rrect(60,330,90,90,45,'#2fbf5a');ctx.restore()}
// mashina, navigator
function sceneCar(t,o={}){ctx.fillStyle='#050812';ctx.fillRect(-300,-300,1320,1900);
 // yo'l (oldinga)
 ctx.save();ctx.beginPath();ctx.rect(-300,140,1320,560);ctx.clip();ctx.fillStyle=lgrad(0,140,0,700,[[0,'#0a1028'],[1,'#141a30']]);ctx.fillRect(-300,140,1320,560);stars(20,4,150,350);
 poly([[330,380],[390,380],[760,700],[-40,700]],'#1a1e2a');for(let i=0;i<6;i++){const p=((i/6+t*.9*(o.stop?0:1))%1),y=380+p*p*320,w=4+p*16;rrect(360-w/2,y,w,10+p*40,2,'#d8d2a0')}
 ctx.globalAlpha=.22;poly([[330,380],[390,380],[760,700],[-40,700]],'#ffefb0');ctx.globalAlpha=1;
 
 for(let i=0;i<5;i++){const p=((i/5+t*.5)%1);ell(lerp(300,-200,p),lerp(380,700,p),6+p*30,40+p*120,'#0a0f1a');ell(lerp(420,920,p),lerp(380,700,p),6+p*30,40+p*120,'#0a0f1a')}
 if(o.graves){for(let i=0;i<5;i++){const x=40+i*52,y=470+i*34,s=1+i*.3;rrect(x,y,26*s,40*s,10*s,'#6a7090');limb(x+13*s,y-12*s,x+13*s,y+8*s,4*s,'#8a90b0');limb(x+4*s,y-4*s,x+22*s,y-4*s,4*s,'#8a90b0')}}
 ctx.restore();
 // ichki kuzov
 poly([[-300,-300],[1020,-300],[1020,160],[-300,160]],'#0b0d14');poly([[-300,140],[40,140],[-120,740],[-300,740]],'#0b0d14');poly([[1020,140],[680,140],[840,740],[1020,740]],'#0b0d14');
 rrect(-300,700,1320,700,40,'#141824');ell(150,900,150,150,'rgba(0,0,0,0)');ctx.strokeStyle='#2a3040';ctx.lineWidth=26;ctx.beginPath();ctx.arc(170,930,150,PI*1.05,PI*1.95);ctx.stroke();
 // oyna (ko'zgu)
 rrect(260,170,200,70,16,'#1a1e28');rrect(270,178,180,54,12,'#202a44');if(o.mirror){ctx.save();ctx.beginPath();ctx.roundRect(270,178,180,54,12);ctx.clip();ctx.globalAlpha=o.mirror;ell(380,222,26,22,'#04050a');ell(380,250,40,24,'#04050a');ctx.shadowColor='#ff2a3a';ctx.shadowBlur=10;ell(371,218,4,2.5,'#ff4a5a');ell(389,218,4,2.5,'#ff4a5a');ctx.restore()}
 // navigator telefon
 ctx.save();ctx.translate(520,820);ctx.rotate(-.05);rrect(-110,-170,220,340,24,'#0b0d16');ctx.beginPath();ctx.roundRect(-100,-160,200,320,18);ctx.clip();navUI(t,o,-100,-160,200,320);ctx.restore()}
function navUI(t,o,x,y,w,h){ctx.fillStyle='#1e2a3a';ctx.fillRect(x,y,w,h);ctx.strokeStyle='#3a4a60';ctx.lineWidth=3;for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(x,y+40+i*70);ctx.lineTo(x+w,y+20+i*70);ctx.stroke()}
 const bend=o.bend||0;ctx.strokeStyle='#3d9bff';ctx.lineWidth=12;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x+w/2,y+h-30);ctx.lineTo(x+w/2,y+h*.45);ctx.quadraticCurveTo(x+w/2-bend*20,y+h*.25,x+w/2-bend*90,y+h*.2);ctx.stroke();
 txt('✝',x+30,y+h*.2,28,'#cfd6e6',0);ell(x+w/2,y+h-40,12,12,'#fff');ell(x+w/2,y+h-40,7,7,'#3d9bff');
 if(o.two){ell(x+w/2+22,y+h-58,12,12,'#fff');ell(x+w/2+22,y+h-58,7,7,'#ff3b4a')}
 rrect(x,y,w,52,0,o.red?'#b0182a':'#1a7a3a');{const b=o.banner||'↰ 300 m';ctx.font='900 24px Inter';const bw=ctx.measureText(b).width;txt(b,x+w/2,y+27,bw>w-16?24*(w-16)/bw:24,'#fff',0)}}
function sceneMap(t,o={}){ctx.fillStyle='#1a2432';ctx.fillRect(-300,-300,1320,1900);ctx.save();ctx.translate(110,140);ctx.scale(2.5,2.5);navUI(t,o,0,0,200,320);ctx.restore();if(o.red){ctx.fillStyle=`rgba(255,20,40,${.1+.08*Math.sin(t*10)})`;ctx.fillRect(-300,-300,1320,1900)}}
