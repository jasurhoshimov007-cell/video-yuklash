// ===== AI Creator channel template =====
const HOST=document.getElementById('host');
const CY='#22e4ff',PU='#a855ff',PK='#ff4fd8',YE='#FFE600';
const TECH=(T,k=0)=>({fog:'#070b1e',fogD:.03,amb:'#2a3060',sun:'#5a6ab0',sunDir:[.3,1,.6],lampPos:[6*sin(T*.5+k),6,4],lamp:k%2?'#a855ff':'#22e4ff'});
function techScene(T,v=0){// floating glowing cubes + grid
 for(let i=-6;i<=6;i++){B(i*4,-.05,-10,.06,.02,60,'#1c3a6a',.6);B(0,-.05,-10+i*4.5,50,.02,.06,'#1c3a6a',.6)}
 for(let i=0;i<14;i++){const a=i*2.39+v,r=6+hash(i)*10,x=cos(a)*r,z=-8+sin(a)*r*.6,y=3+hash(i+3)*9+sin(T*.8+i)*.8,s=.6+hash(i+5)*1.6;
  R.box(chain(M.T(x,y,z),M.RY(T*.4+i),M.RX(T*.3+i*.5),M.S(s,s,s)),[CY,PU,PK,'#2a3a7a'][i%4],i%4==3?.2:.9)}}
function techCam(i){const P=[[[0,7,16],[0,6,-6],55],[[8,5,14],[0,7,-6],55],[[-9,9,13],[0,6,-6],55],[[0,3,12],[0,8,-6],60],[[6,10,15],[0,5,-6],55]];const a=P[i%P.length],b=[[a[0][0]*.8+1.5,a[0][1]+.6,a[0][2]-2.5],a[1],a[2]-4];return[a,b]}
function hostDraw(T){const e=ENVA[Math.floor(T*30)]||0,L=TIMING.lines;let ls=0;for(const l of L)if(T>=l.t0)ls=l.t0;const k=T-ls,nod=Math.exp(-k*5)*sin(k*14)*.5;
 const w=560,h=w*HOST.naturalHeight/HOST.naturalWidth,x=W2/2,y=700+sin(T*2.1)*5-e*10+nod*10,s=1+e*.03+nod*.02,r=sin(T*1.3)*.012+nod*.02;
 const g=ctx.createRadialGradient(x,y+250,40,x,y+250,420);g.addColorStop(0,'rgba(34,228,255,.35)');g.addColorStop(1,'rgba(34,228,255,0)');ctx.fillStyle=g;ctx.fillRect(0,600,W2,H2-600);
 ctx.save();ctx.translate(x,y+h*.5);ctx.rotate(r);ctx.scale(s,s);ctx.drawImage(HOST,-w/2,-h*.5,w,h);ctx.restore();
 const fg=ctx.createLinearGradient(0,1150,0,H2);fg.addColorStop(0,'rgba(5,8,22,0)');fg.addColorStop(1,'rgba(5,8,22,.85)');ctx.fillStyle=fg;ctx.fillRect(0,1150,W2,130)}
function brand(T){pill(150,62,240,52,'rgba(10,14,40,.75)',26);ctx.save();ctx.strokeStyle=CY;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(30,36,240,52,26);ctx.stroke();ctx.restore();txt('AI Creator_N1',150,64,26,'#fff',0,'center','Inter',900);
 const p=T/DUR;ctx.fillStyle='rgba(255,255,255,.15)';ctx.fillRect(0,0,W2,8);const gr=ctx.createLinearGradient(0,0,W2,0);gr.addColorStop(0,CY);gr.addColorStop(1,PK);ctx.fillStyle=gr;ctx.fillRect(0,0,W2*p,8)}
function glass(x,y,w,h,p=1,col=CY){const s=ease(clamp(p,0,1));ctx.save();ctx.globalAlpha=s;ctx.translate(x,y);ctx.scale(.85+.15*s,.85+.15*s);ctx.fillStyle='rgba(12,18,48,.82)';ctx.beginPath();ctx.roundRect(-w/2,-h/2,w,h,28);ctx.fill();ctx.lineWidth=3;ctx.strokeStyle=col;ctx.shadowColor=col;ctx.shadowBlur=24;ctx.stroke();ctx.restore()}
function head(t,y,p,col='#fff',size=64){const s=ease(clamp(p*3,0,1));if(s<=0)return;ctx.save();ctx.globalAlpha=s;ctx.translate(W2/2,y+(1-s)*30);ctx.font=`900 ${size}px Inter`;let w=ctx.measureText(t).width;const sz=w>640?size*640/w:size;ctx.shadowColor=col==='#fff'?CY:col;ctx.shadowBlur=30;txt(t,0,0,sz,col,0);ctx.restore()}
function typeBox(lines,x,y,w,p,label){glass(x,y,w,lines.length*54+90,clamp(p*4,0,1));const all=lines.join('\n'),n=Math.floor(all.length*clamp((p-.15)*1.6,0,1));let c=0;ctx.save();ctx.font='700 32px Inter';ctx.textAlign='left';ctx.textBaseline='middle';
 const top=y-(lines.length*54+90)/2;if(label){ctx.fillStyle=CY;ctx.font='900 24px Inter';ctx.fillText(label,x-w/2+30,top+32);ctx.font='700 32px Inter'}
 lines.forEach((l,i)=>{const vis=l.slice(0,Math.max(0,n-c));c+=l.length+1;ctx.fillStyle='#e8f6ff';ctx.fillText(vis,x-w/2+30,top+78+i*54);if(n>=c-l.length-1&&n<c&&sin(Date.now())>-2){const mw=ctx.measureText(vis).width;ctx.fillStyle=CY;ctx.fillRect(x-w/2+32+mw,top+62+i*54,4,32)}});ctx.restore()}
function chip(t,x,y,p,col=CY,w=180){glass(x,y,w,90,p,col);if(p>.2)txt(t,x,y+2,34,'#fff',0)}
function arrow(x1,y1,x2,y2,p,col=CY){ctx.save();ctx.strokeStyle=col;ctx.lineWidth=5;ctx.setLineDash([14,10]);ctx.lineDashOffset=-Date.now()/40;ctx.globalAlpha=clamp(p,0,1);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(lerp(x1,x2,clamp(p,0,1)),lerp(y1,y2,clamp(p,0,1)));ctx.stroke();ctx.restore()}
function emo(e,x,y,size,p=1){if(p<=0)return;ctx.save();ctx.globalAlpha=clamp(p,0,1);ctx.font=`${size}px "Noto Color Emoji"`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(e,x,y);ctx.restore()}
function aiShot(i,ov,sfx){return{cam:techCam(i),env:T=>TECH(T,i),draw:T=>techScene(T,i),ov:(T,u)=>{ov(T,u);hostDraw(T);brand(T)},sfx:sfx||[[0,'whoosh']],noSplit:1}}
