// ===== 2026-11-26 Roblox-uslub horror umumiy yordamchilar (lib.js ustiga) =====
function phoneUI(T,u,msg,sender,clock){const s=ease(clamp(u*4,0,1));if(s<=0)return;ctx.save();ctx.translate(W2*.7,H2*.33+(1-s)*120);ctx.scale(.62+.1*s,.62+.1*s);ctx.globalAlpha=s;
 ctx.shadowColor='rgba(0,0,0,.7)';ctx.shadowBlur=40;ctx.beginPath();ctx.roundRect(-210,-330,420,660,46);ctx.fillStyle='#0d0f16';ctx.fill();ctx.shadowBlur=0;
 ctx.beginPath();ctx.roundRect(-195,-315,390,630,36);ctx.fillStyle='#1b2133';ctx.fill();txt(clock||'23:00',0,-262,40,'#fff',0);
 ctx.beginPath();ctx.roundRect(-170,-200,340,120,24);ctx.fillStyle='rgba(255,255,255,.12)';ctx.fill();ctx.beginPath();ctx.arc(-120,-140,30,0,7);ctx.fillStyle='#ff5a8a';ctx.fill();
 txt(sender||'?',-70,-150,30,'#fff',0,'left');if(msg){const m=clamp((u-.2)*3,0,1);ctx.globalAlpha=s*m;msg.forEach((l,i)=>{ctx.beginPath();ctx.roundRect(-170,-40+i*96,340,80,24);ctx.fillStyle=i==msg.length-1?'#ff3b4a':'#2f7de1';ctx.fill();fitTxt(l,0,i*96,30,320,'#fff',0)})}ctx.restore()}
function abCard(T,u,A,Bt){const s=ease(clamp(u*3,0,1));if(s<=0)return;ctx.fillStyle=`rgba(0,0,0,${.5*s})`;ctx.fillRect(0,0,W2,H2);ctx.save();ctx.globalAlpha=s;
 fitTxt('SEN NIMA QILARDING?',W2/2,250,60,660,'#ffffff',12);
 const row=(y,l,c,d)=>{const k=ease(clamp(u*3-d,0,1));ctx.save();ctx.translate(W2/2+(1-k)*-300,y);ctx.globalAlpha=k;ctx.beginPath();ctx.roundRect(-310,-55,620,110,26);ctx.fillStyle='rgba(10,14,28,.88)';ctx.fill();ctx.lineWidth=5;ctx.strokeStyle=c;ctx.stroke();
  ctx.beginPath();ctx.roundRect(-290,-38,76,76,16);ctx.fillStyle=c;ctx.fill();txt(l[0],-252,2,50,'#fff',0);fitTxt(l[1],50,2,40,450,'#fff',8);ctx.restore()};
 row(390,['A',A],'#2ecc71',.3);row(530,['B',Bt],'#ff3b4a',.6);
 const k=clamp(u*3-1,0,1);ctx.globalAlpha=k;fitTxt('💬 IZOHDA A YOKI B',W2/2,660,44,600,'#ffe14d',10);ctx.restore()}
function tgEnd(T,u){const a=ease(clamp(u*3,0,1));if(a<=0)return;ctx.save();ctx.fillStyle=`rgba(4,8,24,${.75*a})`;ctx.fillRect(0,0,W2,H2);ctx.globalAlpha=a;
 const g=ctx.createRadialGradient(360,470,20,360,470,380);g.addColorStop(0,'rgba(42,157,244,.45)');g.addColorStop(1,'rgba(42,157,244,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W2,H2);
 ctx.save();ctx.translate(360,420);ctx.scale(1+.04*sin(T*6),1+.04*sin(T*6));ctx.beginPath();ctx.arc(0,0,86,0,7);ctx.fillStyle='#2aa3ef';ctx.fill();ctx.beginPath();ctx.moveTo(-44,-4);ctx.lineTo(48,-40);ctx.lineTo(30,44);ctx.lineTo(8,18);ctx.lineTo(-10,34);ctx.lineTo(-6,10);ctx.closePath();ctx.fillStyle='#fff';ctx.fill();ctx.restore();
 txt('DAVOMI',360,580,84,'#fff',10);txt('TELEGRAMDA',360,665,70,'#2aa3ef',10);pill(360,760,440,74,'rgba(255,255,255,.14)');txt('Profildagi havola 👆',360,762,34,'#fff',0,'center','Inter',800);ctx.restore();subBtn(clamp((u-.3)*1.6,0,1),T,890)}
function subBtn(p,T,y=430){if(p<=0)return;const a=clamp(p*5,0,1),done=p>.6,s=(.7+.3*ease(a))*(p>.55&&p<.65?.93:1);ctx.save();ctx.globalAlpha=a;ctx.translate(W2/2,y);ctx.scale(s,s);
 pill(0,0,470,100,done?'#ffffff':'#ff0033');txt(done?'OBUNA BO‘LINDI ✓':'OBUNA BO‘LING 🔔',0,3,40,done?'#111':'#fff',0);ctx.restore();
 if(p>.3&&p<.9){const k=clamp((p-.3)/.25,0,1);ctx.save();ctx.font='86px "Noto Color Emoji"';ctx.textAlign='center';ctx.fillText('👆',lerp(W2*.85,W2/2+120,ease(k)),lerp(y+300,y+70,ease(k)));ctx.restore()}}
function endSub(T,u,line){ctx.fillStyle=`rgba(0,0,0,${.45*clamp(u*4,0,1)})`;ctx.fillRect(0,0,W2,H2);fitTxt(line||'DAVOMI ERTAGA!',W2/2,250,78,660,'#ffe14d',14);subBtn(clamp(u*1.4,0,1),T,430);
 const lp=clamp((u-.35)*3,0,1);if(lp>0){ctx.save();ctx.globalAlpha=lp;ctx.translate(W2/2,580);ctx.scale(.7+.3*ease(lp),.7+.3*ease(lp));pill(0,0,380,100,'#fff');heart(-110,8,40,'#ff2a55');txt('LIKE',40,3,50,'#111',0);ctx.restore()}}
function subPill(T,u){const a=ease(clamp(u*4,0,1))*(u>.9?1-(u-.9)*10:1);if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(W2/2,220);const k=1+.05*sin(T*10);ctx.scale(k,k);pill(0,0,520,96,'#ff0033');txt('OXIRIGACHA KO‘R 🔔',0,3,40,'#fff',0);ctx.restore()}
function bigTxt(s,y,col,u,size=96){const a=ease(clamp(u*5,0,1));ctx.save();ctx.translate(W2/2,y);ctx.scale(.6+.4*a,.6+.4*a);ctx.globalAlpha=a;fitTxt(s,0,0,size,660,col||'#ff2a2a',16);ctx.restore()}
function partBadge(t){ctx.save();pill(112,62,170,54,'rgba(220,20,40,.92)');txt((typeof PART!=='undefined'?PART:'1-QISM'),112,64,30,'#fff',0);ctx.globalAlpha=.75;txt('@jasur.ai_',W2/2,H2-60,28,'#fff',6,'center','Inter',800);ctx.restore()}
// tuman/zarra (qor, chang)
function motes(T,col='#ffffff',n=40,a=.35){ctx.save();for(let i=0;i<n;i++){const x=(hash(i)*W2+sin(T*.5+i)*30+T*12*(hash(i+3)-.5))%W2,y=(hash(i+9)*H2+T*(20+hash(i+5)*40))%H2;ctx.globalAlpha=a*(.4+.6*hash(i+2));ctx.fillStyle=col;ctx.beginPath();ctx.arc((x+W2)%W2,y,1.5+hash(i+7)*3,0,7);ctx.fill()}ctx.restore()}

// ===== 2026-11-27: izoh pufaklari (haqiqiy izohlardan, ismsiz), foto-karta, savol-karta
function cmtBubbles(T,u,arr,title){const a=ease(clamp(u*4,0,1));if(a<=0)return;ctx.save();ctx.globalAlpha=a;if(title){pill(W2/2,250,560,74,'rgba(0,0,0,.72)');txt(title,W2/2,252,34,'#ffe14d',0)}
 arr.forEach((c,i)=>{const k=ease(clamp(u*4-.4-i*.35,0,1));if(k<=0)return;ctx.save();ctx.globalAlpha=a*k;const y=340+i*112;ctx.translate((1-k)*-200,0);
  ctx.beginPath();ctx.roundRect(70,y-44,580,88,30);ctx.fillStyle='rgba(255,255,255,.95)';ctx.fill();ctx.beginPath();ctx.arc(120,y,28,0,7);ctx.fillStyle=['#ff7a59','#3db4ff','#9a6aff','#2ecc71'][i%4];ctx.fill();txt('👤',120,y+2,28,'#fff',0);
  txt(c,165,y+2,36,'#111',0,'left','Inter',800);heart(610,y+4,26,'#ff2a55');ctx.restore()});ctx.restore()}
function photoCard(T,u,o={}){const s=ease(clamp(u*3,0,1));if(s<=0)return;ctx.save();ctx.translate(W2/2,o.y||470);ctx.rotate(o.rot||-.05);ctx.scale(.6+.4*s,.6+.4*s);ctx.globalAlpha=s;
 ctx.shadowColor='rgba(0,0,0,.7)';ctx.shadowBlur=40;ctx.fillStyle='#efe6d2';ctx.fillRect(-250,-300,500,560);ctx.shadowBlur=0;ctx.fillStyle=o.bg||'#7a6448';ctx.fillRect(-220,-270,440,420);
 const em=o.emoji||['👶','👶'];ctx.font=`${o.es||150}px "Noto Color Emoji"`;ctx.textAlign='center';ctx.textBaseline='middle';em.forEach((e,i)=>ctx.fillText(e,(i-(em.length-1)/2)*(o.sp||190),-60));
 if(o.sepia){ctx.fillStyle='rgba(120,80,30,.35)';ctx.fillRect(-220,-270,440,420)}txt(o.label||'',0,205,44,o.lc||'#3a2a1a',0);ctx.restore()}
function askCmt(T,u,l1,l2){const a=ease(clamp(u*3,0,1));if(a<=0)return;ctx.fillStyle=`rgba(0,0,0,${.45*a})`;ctx.fillRect(0,0,W2,H2);ctx.save();ctx.globalAlpha=a;
 fitTxt(l1,W2/2,300,70,660,'#ffffff',12);ctx.translate(W2/2,430);const k=1+.05*sin(T*8);ctx.scale(k,k);pill(0,0,520,96,'#3db4ff');txt(l2||'💬 IZOHDA YOZ 👇',0,3,40,'#fff',0);ctx.restore()}
