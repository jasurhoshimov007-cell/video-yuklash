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
