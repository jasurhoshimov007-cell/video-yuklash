// ===== helpers =====
const PI=Math.PI,sin=Math.sin,cos=Math.cos,clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const ease=u=>u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;
const lerp=(a,b,u)=>a+(b-a)*u;const lerpA=(a,b,u)=>a.map((v,i)=>lerp(v,b[i],u));
const ramp=(u,a,b)=>clamp((u-a)/(b-a),0,1);
function hash(n){const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s)}
function noise1(t){const i=Math.floor(t),f=t-i,u=f*f*(3-2*f);return lerp(hash(i),hash(i+1),u)*2-1}
let R;
function B(x,y,z,sx,sy,sz,col,em=0,ry=0){R.box(chain(M.T(x,y+sy/2,z),M.RY(ry),M.S(sx,sy,sz)),col,em)}
function BM(m,sx,sy,sz,col,em=0){R.box(chain(m,M.S(sx,sy,sz)),col,em)}
// ===== characters =====
function walk(T,sp=8,amp=.6){const s=sin(T*sp);return{aL:s*amp,aR:-s*amp,lL:-s*amp,lR:s*amp,y:Math.abs(cos(T*sp))*.12}}
function run(T){const s=sin(T*13);return{aL:s*1.1,aR:-s*1.1,lL:-s*1,lR:s*1,y:Math.abs(cos(T*13))*.35,lean:.25}}
function blinkAt(T,seed=0){const p=(T+seed*1.37)%3.3;return p<.12}
function talk(T){return (sin(T*17)+sin(T*11))>.3}
function drawChar(p,L){const s=p.scale||1,br=1+.012*sin((p.T||0)*2.4+(p.seed||0));
 const root=chain(M.T(p.x||0,(p.y||0)+(p.sit?-1.3*s:0),p.z||0),M.RY(p.yaw||0),M.S(s,s*br,s),M.RX(p.lean||0));
 const Bx=(m,sz,c,em)=>R.box(chain(root,m,M.S(...sz)),c,em);
 Bx(M.T(0,2.5,0),[2,2,1],L.shirt);
 if(L.coat){Bx(M.T(0,2.3,0),[2.12,2.45,1.12],L.coat);Bx(M.T(0,2.5,.57),[.5,2,.04],L.shirt);if(L.belt)Bx(M.T(0,2.0,0),[2.16,.28,1.16],L.belt)}
 if(L.tie)Bx(M.T(0,2.7,.52),[.3,1.3,.04],L.tie);
 if(L.apron)Bx(M.T(0,2.35,.53),[1.5,1.7,.06],L.apron);
 const limb=(x,py,rx,rz,c,tip,len=2)=>{const m=chain(M.T(x,py,0),M.RZ(rz||0),M.RX(rx||0),M.T(0,-len/2,0));Bx(m,[.96,len,.96],c);if(tip)Bx(chain(m,M.T(0,-len/2+.22,0)),[.98,.46,.98],tip);return chain(root,m)};
 const sit=p.sit?-1.45:0;
 if(L.dress&&!p.sit){Bx(M.T(0,.85,0),[2.1,1.8,1.15],L.dress);limb(-.5,1.5,(p.lL||0)*.3,0,L.dress,L.shoes);limb(.5,1.5,(p.lR||0)*.3,0,L.dress,L.shoes)}
 else{limb(-.5,1.5,(p.lL||0)+sit,0,L.dress||L.pants,L.shoes);limb(.5,1.5,(p.lR||0)+sit,0,L.dress||L.pants,L.shoes)}
 const al=L.arm||2;
 limb(-1.5,3.4,p.aL||0,p.aLz||0,L.sleeve||L.coat||L.shirt,L.skin,al);const hand=limb(1.5,3.4,p.aR||0,p.aRz||0,L.sleeve||L.coat||L.shirt,L.skin,al);
 const hp=chain(hand,M.T(0,-al/2-.1,.45));
 if(L.item=='phone'){BM(chain(hp,M.RX(-.3)),.5,.9,.12,'#111318');BM(chain(hp,M.T(0,0,.07),M.RX(-.3)),.42,.78,.02,'#7fc6ff',.9)}
 if(L.item=='whistle'){BM(chain(hp,M.T(0,.1,.2)),.25,.25,.5,'#d8d8e0',.3)}
 if(L.item=='flashlight'){BM(hp,.3,.3,1,'#222630');BM(chain(hp,M.T(0,0,.55)),.36,.36,.1,'#fff6c0',1)}
 if(L.item=='photo'){BM(chain(hp,M.T(0,.3,.2)),.9,1.1,.05,'#f3ead8',.2)}
 if(L.item=='box'){BM(chain(hp,M.T(-1.5,0,.6)),2.6,1.4,1.4,'#b98a52')}
 if(L.item=='notebook'){BM(chain(hp,M.T(0,.2,.2)),.9,1.2,.12,'#2f6fd6')}
 if(L.item=='tray'){BM(chain(hp,M.T(-1.5,.3,.7)),3,.12,1.6,'#c9a24a',.1);BM(chain(hp,M.T(-2,.55,.7)),.45,.4,.45,'#ffffff');BM(chain(hp,M.T(-1,.55,.7)),.45,.4,.45,'#ffffff')}
 if(L.item=='cup'){BM(chain(hp,M.T(0,.2,.15)),.45,.4,.45,'#ffffff');BM(chain(hp,M.T(0,.25,.15)),.38,.36,.38,'#2f8fd0')}
 const h=chain(root,M.T(0,3.5,0),M.RY(p.headYaw||0),M.RX(p.headPitch||0),M.T(0,.75,0));
 const hs=L.head||1.45;BM(h,hs,hs,hs,L.skin);
 if(L.hair){BM(chain(h,M.T(0,.6,-.06)),1.58,.5,1.6,L.hair);BM(chain(h,M.T(0,.05,-.5)),1.58,1.2,.62,L.hair)}
 if(L.longhair){BM(chain(h,M.T(0,-.5,-.55)),1.6,1.8,.55,L.longhair)}
 if(L.beard){BM(chain(h,M.T(0,-.55,.68)),1.2,.6,.2,L.beard);BM(chain(h,M.T(0,-.95,.62)),.8,.5,.2,L.beard)}
 if(L.mus){BM(chain(h,M.T(0,-.25,.75)),.7,.14,.06,L.mus)}
 const hat=L.hat;
 if(hat=='doppi'){BM(chain(h,M.T(0,.82,0)),1.5,.4,1.5,'#141414');for(let i=-1;i<=1;i+=2)for(let j=-1;j<=1;j+=2)BM(chain(h,M.T(i*.4,.85,j*.76)),.22,.22,.02,'#f5f5f5',.2);BM(chain(h,M.T(0,.85,.76)),.22,.22,.02,'#f5f5f5',.2)}
 if(hat=='chef'){BM(chain(h,M.T(0,.85,0)),1.5,.35,1.5,'#f4f4f4');BM(chain(h,M.T(0,1.4,0)),1.85,.8,1.85,'#ffffff')}
 if(hat=='cap'){BM(chain(h,M.T(0,.8,0)),1.52,.3,1.52,L.hatCol||'#2b5fd9');BM(chain(h,M.T(0,.7,.95)),1.3,.1,.6,L.hatCol||'#2b5fd9')}
 if(hat=='hood'){BM(chain(h,M.T(0,.15,-.12)),1.7,1.75,1.6,L.hatCol||'#15151c')}
 if(hat=='scarf'){BM(chain(h,M.T(0,.6,-.05)),1.62,.42,1.62,L.hatCol);BM(chain(h,M.T(0,-.1,-.4)),1.62,1.5,.9,L.hatCol);BM(chain(h,M.T(.76,0,.15)),.12,1.3,1.1,L.hatCol);BM(chain(h,M.T(-.76,0,.15)),.12,1.3,1.1,L.hatCol);BM(chain(h,M.T(0,-.95,-.3)),1.3,.6,.8,L.hatCol)}
 if(hat=='crown'){BM(chain(h,M.T(0,.9,0)),1.3,.35,1.3,'#ffd23a',.4)}
 const f=p.face||'calm',z=Math.max(.74,hs/2+.01),E=(x,y,w,hh,c,em,dz)=>BM(chain(h,M.T(x,y,z+(dz||0))),w,hh,.04,c,em||0);
 const bl=p.blink?.05:1,ec=L.eye||'#16161c';
 if(f=='none'){}
 else if(f=='evil'){E(-.32,.12,.34,.22,L.eyeGlow||'#ff1a1a',1.4);E(.32,.12,.34,.22,L.eyeGlow||'#ff1a1a',1.4);E(-.32,.3,.42,.08,'#1a0808');E(.32,.3,.42,.08,'#1a0808');E(0,-.38,.9,.26,'#1a0808');for(let i=-3;i<=3;i++)E(i*.12,-.38+(i%2?.06:-.06),.08,.12,'#ffffff',.6,.03)}
 else if(f=='glow'){E(-.32,.12,.26,.26,L.eyeGlow||'#ff2a2a',1.5);E(.32,.12,.26,.26,L.eyeGlow||'#ff2a2a',1.5)}
 else if(f=='sleep'){E(-.32,.12,.3,.06,ec);E(.32,.12,.3,.06,ec);E(0,-.4,.3,.06,ec)}
 else{const eh=(f=='shock'||f=='scared')?.42:.3;E(-.32,.12,.2,eh*bl,ec);E(.32,.12,.2,eh*bl,ec);
  if(L.eyeWhite){E(-.32,.12,.3,.42,'#ffffff',.1,-.01);E(.32,.12,.3,.42,'#ffffff',.1,-.01)}
  if(f=='shock')E(0,-.4,.34,.4,'#8a1414');else if(f=='scared'){E(0,-.42,.5,.12,ec);E(-.32,.45,.3,.06,ec);E(.32,.45,.3,.06,ec)}
  else if(f=='angry'){E(0,-.42,.4,.08,ec);E(-.32,.36,.34,.08,ec);E(.32,.36,.34,.08,ec)}
  else if(f=='happy'){E(0,-.45,.5,.08,ec);E(-.27,-.37,.08,.14,ec);E(.27,-.37,.08,.14,ec)}
  else if(f=='laugh'){E(0,-.4,.5,.3,'#8a1414');E(0,-.28,.5,.06,'#ffffff',.3,.01)}
  else if(f=='talk'){p.T&&talk(p.T)?E(0,-.4,.36,.26,'#8a1414'):E(0,-.4,.4,.08,ec)}
  else if(f=='smirk'){E(.1,-.42,.45,.08,ec);E(.33,-.36,.08,.12,ec)}
  else E(0,-.4,.4,.08,ec)}
 R.box(chain(M.T(p.x||0,.03,p.z||0),M.S(2.6*s,.02,2.2*s)),'#000000');}
function C(look,pose,T){pose.T=T;if(pose.blink===undefined)pose.blink=blinkAt(T,pose.seed||0);drawChar(pose,look)}
// common looks
const LK={
 boy:{skin:'#f1c99a',shirt:'#2f7de1',pants:'#2b2f3a',shoes:'#15151a',hair:'#2a1a12'},
 man:{skin:'#e8b98a',shirt:'#3a9a5a',pants:'#23262e',shoes:'#101014',hair:'#18110c'},
 kampir:{skin:'#e9c7a4',shirt:'#5b3a6e',dress:'#4a2d5c',shoes:'#222',hat:'scarf',hatCol:'#e8e4da',eye:'#0b0b0b'},
 mom:{skin:'#f1c9a0',shirt:'#c8366b',dress:'#a52a5a',shoes:'#222',hat:'scarf',hatCol:'#f2c94c'},
 dad:{skin:'#e2b088',shirt:'#f1f1f1',pants:'#2a2d36',shoes:'#111',hat:'doppi',mus:'#2a1a10'},
 guest:{skin:'#e6b68a',shirt:'#e8e8e8',coat:'#2a3e8f',belt:'#c9322a',pants:'#22252e',shoes:'#111',hat:'doppi',beard:'#cfcfcf'},
 girl:{skin:'#f3cfa8',shirt:'#f2994a',dress:'#e07a2a',shoes:'#333',longhair:'#2a170f',hair:'#2a170f'},
 kid:{skin:'#f3cba0',shirt:'#e84a4a',pants:'#2d5fbf',shoes:'#222',hair:'#2a1a12'},
 teacher:{skin:'#efc49b',shirt:'#e9e9ee',coat:'#3b3f52',pants:'#2a2d3a',shoes:'#111',hair:'#3a2a1a',tie:'#a02a2a'},
};
// ===== props =====
function door(x,z,ry,open,col='#7a4a2a',w=3,h=6.5){const m=chain(M.T(x,0,z),M.RY(ry));
 BM(chain(m,M.T(-w/2-.15,h/2,0)),.3,h+.3,.5,'#3a2618');BM(chain(m,M.T(w/2+.15,h/2,0)),.3,h+.3,.5,'#3a2618');BM(chain(m,M.T(0,h+.15,0)),w+.6,.3,.5,'#3a2618');
 const pm=chain(m,M.T(-w/2,0,0),M.RY(-open*1.6),M.T(w/2,h/2,0));BM(pm,w,h,.2,col);BM(chain(pm,M.T(w*.35,-.2,.15)),.25,.25,.2,'#d9b84a',.3)}
function win(x,y,z,ry,w,h,glow,em=.9){const m=chain(M.T(x,y,z),M.RY(ry));BM(m,w+.4,h+.4,.3,'#e8e2d4');BM(chain(m,M.T(0,0,.1)),w,h,.2,glow,em);BM(chain(m,M.T(0,0,.22)),.15,h,.05,'#e8e2d4');BM(chain(m,M.T(0,0,.22)),w,.15,.05,'#e8e2d4')}
function bulb(x,y,z,on=1,col='#fff2c0'){B(x,y+.6,z,.08,1.2,.08,'#222');B(x,y,z,.6,.6,.6,on?col:'#555',on?1.6:0)}
function tree(x,z,s=1,leaf='#3e8a3a'){B(x,0,z,.8*s,4*s,.8*s,'#6b4a2a');B(x,3.5*s,z,3.4*s,2.6*s,3.4*s,leaf);B(x,5.6*s,z,2.2*s,1.6*s,2.2*s,leaf)}
function streetLamp(x,z,on=1,col='#ffcf70'){B(x,0,z,.35,8,.35,'#2b2b30');B(x+.8*Math.sign(-x||1),7.8,z,1.8,.25,.35,'#2b2b30');B(x+1.5*Math.sign(-x||1),7.4,z,.8,.4,.8,on?col:'#444',on?1.8:0)}
function bed(x,z,ry=0,col='#3d6fb6'){const m=chain(M.T(x,0,z),M.RY(ry));BM(chain(m,M.T(0,.5,0)),4,1,7,'#6a4426');BM(chain(m,M.T(0,1.2,0)),3.8,.5,6.8,'#f2efe8');BM(chain(m,M.T(0,1.5,.8)),3.9,.25,5,col);BM(chain(m,M.T(0,1.6,-2.6)),2.6,.5,1.2,'#ffffff');BM(chain(m,M.T(0,1.5,-3.4)),4,3,.3,'#6a4426')}
function shelf(x,z,ry=0){const m=chain(M.T(x,0,z),M.RY(ry));BM(chain(m,M.T(0,3.5,0)),4,7,1.4,'#7a5232');for(let i=1;i<4;i++)BM(chain(m,M.T(0,i*1.8,.3)),3.6,.15,1,'#5a3a22');BM(chain(m,M.T(-1,2.2,.3)),.6,.7,.6,'#d24a4a');BM(chain(m,M.T(.8,4,.3)),.9,.5,.6,'#4ab0d2');BM(chain(m,M.T(1,2.15,.3)),.4,.9,.6,'#e8c24a')}
function lowTable(x,z,w=6,d=3.5){B(x,0,z,w,1.1,d,'#6e4426');B(x,1.1,z,w+.2,.08,d+.2,'#c83a3a',.05)}
function piyola(x,y,z){B(x,y,z,.45,.35,.45,'#ffffff');B(x,y+.3,z,.36,.06,.36,'#2f8fd0',.2)}
function teapot(x,y,z){B(x,y,z,.9,.8,.9,'#ffffff');B(x+.6,y+.4,z,.5,.15,.15,'#ffffff');B(x,y+.8,z,.3,.2,.3,'#2f8fd0')}
function non(x,y,z){B(x,y,z,1,.18,1,'#d99a4a');B(x,y+.15,z,.5,.06,.5,'#b87a32')}
function carpet(x,z,w,d,a='#9a2a2a',b='#e2b04a'){B(x,0,z,w,.05,d,a);B(x,.02,z,w*.7,.05,d*.7,b);B(x,.04,z,w*.5,.05,d*.5,a)}
function kurpacha(x,z,ry=0,col='#c43a6a'){const m=chain(M.T(x,0,z),M.RY(ry));BM(chain(m,M.T(0,.2,0)),6,.4,1.6,col);BM(chain(m,M.T(0,.42,0)),5.8,.05,1.4,'#f2c94c',.1)}
function car(x,z,ry,col='#f2c230',lights=1,taxi=1,crash=0,y=0){const m=chain(M.T(x,y,z),M.RY(ry),M.RZ(crash));
 BM(chain(m,M.T(0,1.3,0)),4.2,1.6,9,col);BM(chain(m,M.T(0,2.7,-.5)),3.8,1.3,5,col);
 BM(chain(m,M.T(0,2.7,2.05)),3.6,1.1,.1,'#1a2230',.2);BM(chain(m,M.T(0,2.7,-3.05)),3.6,1.1,.1,'#1a2230',.2);BM(chain(m,M.T(1.92,2.7,-.5)),.05,1,4.4,'#1a2230',.2);BM(chain(m,M.T(-1.92,2.7,-.5)),.05,1,4.4,'#1a2230',.2);
 if(taxi){BM(chain(m,M.T(0,3.55,-.5)),1.6,.45,.7,'#ffffff',.6);BM(chain(m,M.T(0,3.55,-.5)),1.62,.15,.72,'#111',.1)}
 for(const sx of[-1.5,1.5]){BM(chain(m,M.T(sx,1.4,4.52)),.9,.45,.1,lights?'#fff6d0':'#555',lights?2:0);BM(chain(m,M.T(sx,1.4,-4.52)),.9,.4,.1,'#d02020',lights?1.2:.2)}
 for(const sx of[-2.05,2.05])for(const sz of[-2.8,2.8])BM(chain(m,M.T(sx,.7,sz)),.5,1.4,1.4,'#141414')}
function lion(x,z,ry,T,dead=0){const m=chain(M.T(x,0,z),M.RY(ry),M.RZ(dead?1.5:0),M.T(0,dead?-.9:0,0));const g=sin(T*3)*.05;
 BM(chain(m,M.T(0,2.2+g,0)),2.6,2,4.6,'#d4a04a');for(const sx of[-.9,.9])for(const sz of[-1.6,1.6])BM(chain(m,M.T(sx,.7,sz)),.8,1.6,.8,'#c8943e');
 BM(chain(m,M.T(0,3.2+g,2.4)),2.9,2.9,1.6,'#8a4a1e');BM(chain(m,M.T(0,3.1+g,3.2)),1.8,1.8,1.2,'#d4a04a');
 BM(chain(m,M.T(-.45,3.5+g,3.82)),.3,.3,.05,dead?'#222':'#111');BM(chain(m,M.T(.45,3.5+g,3.82)),.3,.3,.05,'#111');BM(chain(m,M.T(0,2.9+g,3.85)),.5,.3,.05,'#3a2010');BM(chain(m,M.T(0,2.5,-2.8)),.3,.3,1.6,'#c8943e')}
function cat(x,z,ry,T){const m=chain(M.T(x,0,z),M.RY(ry));BM(chain(m,M.T(0,.8,0)),1,1,2,'#ff9a3a');BM(chain(m,M.T(0,1.6,1.1)),1.1,1,1,'#ff9a3a');BM(chain(m,M.T(-.35,2.2,1.1)),.25,.4,.25,'#ff9a3a');BM(chain(m,M.T(.35,2.2,1.1)),.25,.4,.25,'#ff9a3a');
 BM(chain(m,M.T(-.25,1.7,1.62)),.15,.2,.04,'#111');BM(chain(m,M.T(.25,1.7,1.62)),.15,.2,.04,'#111');BM(chain(m,M.T(0,1.2,-1.3),M.RX(.6+sin(T*4)*.3)),.2,.2,1.5,'#ff9a3a');for(const sx of[-.35,.35])for(const sz of[-.7,.7])BM(chain(m,M.T(sx,.15,sz)),.3,.5,.3,'#ff9a3a')}
function fire(x,z,T,s=1){for(let i=0;i<9;i++){const a=i*2.4,r=hash(i)*1.4*s,hh=(1.5+hash(i+9)*2.5+sin(T*9+i)*.6)*s;B(x+cos(a)*r,0,z+sin(a)*r,.9*s,hh,.9*s,i%3?'#ff6a1a':'#ffd23a',1.8)}}
function deskSchool(x,z){B(x,0,z,3,2.2,1.8,'#a8743e');B(x,2.2,z,3.2,.15,2,'#c8945a');B(x,0,z+2,2.4,1.3,1.4,'#5a3a22')}
function rainDrops(T,cx,cz){for(let i=0;i<70;i++){const x=cx+(hash(i)-.5)*30,z=cz+(hash(i+70)-.5)*30,y=(20-((T*25+hash(i+140)*20)%20));B(x,y,z,.05,.9,.05,'#9fb8ff',.5)}}
function X(x,y,z,s,col){R.box(chain(M.T(x,y,z),M.RZ(.75),M.S(.3*s,2*s,.1)),col,.7);R.box(chain(M.T(x,y,z),M.RZ(-.75),M.S(.3*s,2*s,.1)),col,.7)}
// ===== sets =====
const ENV={
 night:{fog:'#0e1530',fogD:.03,amb:'#3a4670',sun:'#6a7ab8',sunDir:[-.3,1,.5],lamp:'#ffb060'},
 nightCold:{fog:'#0c1426',fogD:.035,amb:'#33405e',sun:'#5a6f98',sunDir:[.3,1,.4],lamp:'#bfe0ff'},
 day:{fog:'#bfe3ff',fogD:.006,amb:'#9aa3b8',sun:'#fff1d0',sunDir:[.4,1,.7],lamp:'#000000'},
 warm:{fog:'#f6d9a8',fogD:.008,amb:'#a89480',sun:'#ffe9c2',sunDir:[.3,1,.8],lamp:'#ffcf8a'},
 red:{fog:'#1a0608',fogD:.04,amb:'#4a1a1e',sun:'#7a2a2e',sunDir:[0,1,.5],lamp:'#ff3030'},
 party:{fog:'#2a1240',fogD:.012,amb:'#7a6a9a',sun:'#ffd9f0',sunDir:[.2,1,.6],lamp:'#ff7ad0'},
 green:{fog:'#0e1a14',fogD:.03,amb:'#3e5a48',sun:'#7aa086',sunDir:[.2,1,.4],lamp:'#9affc0'},
};
function E(name,o={}){return Object.assign({},ENV[name],o)}
function room(o={}){const W=o.W||24,D=o.D||24,H=o.H||11;
 B(0,-.5,0,W,.5,D,o.floor||'#8a6a4a');B(0,0,-D/2,W,H,.5,o.wall||'#d9c9a8');B(-W/2,0,0,.5,H,D,o.wall2||o.wall||'#cdbd9c');B(W/2,0,0,.5,H,D,o.wall2||o.wall||'#cdbd9c');
 if(o.ceil)B(0,H,0,W,.5,D,'#e8e0d0');B(0,0,-D/2+.3,W,.8,.2,o.trim||'#6a4a32')}
function corridor(o={},T=0){const L=o.L||60;B(0,-.5,-L/2+10,12,.5,L,o.floor||'#5a5a62');B(-6,0,-L/2+10,.5,10,L,o.wall||'#a9b0a0');B(6,0,-L/2+10,.5,10,L,o.wall||'#a9b0a0');B(0,10,-L/2+10,12,.5,L,'#8a8f88');
 for(let z=4;z>-L+10;z-=9){door(-5.6,z,PI/2,0,o.door||'#6b3f26');door(5.6,z-4.5,-PI/2,0,o.door||'#6b3f26');const on=o.flick?(noise1(T*7+z)>-.2?1:0):1;B(0,9.6,z,1.2,.3,1.2,on?'#fff2c0':'#444',on?1.5:0)}
 if(o.endDoor!==false)B(0,0,-L+10,12,10,.5,o.wall||'#a9b0a0')}
function liftCab(o={},T=0){const W=8,D=8,H=10;B(0,-.5,0,W,.5,D,'#3a3a42');B(0,0,-D/2,W,H,.4,'#9aa0aa');B(-W/2,0,0,.4,H,D,'#8a9098');B(W/2,0,0,.4,H,D,'#8a9098');B(0,H,0,W,.4,D,'#6a6e76');
 const on=o.light===undefined?1:o.light;B(0,H-.3,0,3,.2,3,on?'#f4f6ff':'#333',on?1.4:0);
 B(3.75,4,-1,.2,3,1.4,'#2a2a30');for(let i=0;i<6;i++)B(3.65,3.3+i*.42,-1,.1,.28,.5,o.lit===i?'#ffcc33':'#c8c8d0',o.lit===i?1.5:.2);
 B(3.65,7.5,-1,.1,.8,1.2,'#100',0);}
function liftDoors(z,open,o={}){const w=8;B(-w/4-open*2.2,0,z,w/2,10,.3,'#b0b6c0');B(w/4+open*2.2,0,z,w/2,10,.3,'#b0b6c0');B(0,10,z,w,.6,.4,'#555a64')}
function street(o={},T=0){const L=o.L||90;B(0,-.5,-L/2+15,60,.5,L,o.ground||'#6a5f52');B(0,-.45,-L/2+15,8,.5,L,'#4a4a50');
 for(let z=12;z>-L+15;z-=14){const c=o.wallCol||'#c9b48e';B(-10,0,z,.8,6,13,c);B(10,0,z,.8,6,13,c);
  B(-9.5,0,z-3,.3,5.2,4,'#2f5a8a');B(9.5,0,z-3,.3,5.2,4,'#7a3a2a');B(-9.5,5.2,z-3,.5,.4,4.6,'#d9b84a');B(9.5,5.2,z-3,.5,.4,4.6,'#d9b84a');
  tree(-13,z-6,1.1);tree(13,z-8,1);streetLamp(-6,z-9,o.lamps===undefined?1:o.lamps)}
 if(o.houses!==false)for(let z=12;z>-L+15;z-=14){B(-16,0,z-2,10,8,10,'#b8a07a');B(16,0,z-4,10,8,10,'#b09a78');win(-11.1,4.5,z-2,PI/2,2.4,2.2,o.winGlow||'#ffd27a',.8)}}
function bazaar(o={},T=0){B(0,-.5,-10,70,.5,70,'#b8a58a');const cols=['#d64a3a','#3a8ad6','#3aa65a','#e0a030'];
 for(let i=0;i<6;i++){const x=(i%2?7:-7),z=6-Math.floor(i/2)*11;B(x,0,z,7,2.8,4,'#8a6a42');B(x,6,z,8,.3,6,cols[i%4]);B(x-3.4,0,z+2,.3,6,.3,'#5a4028');B(x+3.4,0,z+2,.3,6,.3,'#5a4028');
  for(let k=0;k<4;k++)B(x-2.4+k*1.6,2.8,z,1,.8,1,['#ff6a3a','#ffd23a','#7ad04a','#e84a8a'][k])}}
function hall(o={},T=0){const W=40,D=44;B(0,-.5,-6,W,.5,D,'#d8c8b8');B(0,0,-26,W,16,.5,'#5a2a4a');B(-20,0,-6,.5,16,D,'#6a3a5a');B(20,0,-6,.5,16,D,'#6a3a5a');
 B(0,0,-22,20,1.5,6,'#e8d8f0');for(let i=0;i<5;i++)B(-12+i*6,14,-25.6,4,1,.3,['#ff4a8a','#ffd23a','#4ad0ff','#7aff7a','#ff8a3a'][i],1.2);
 for(let r=0;r<3;r++)for(let c=0;c<2;c++){const x=c?11:-11,z=4-r*9;B(x,0,z,7,2.5,4,'#ffffff');B(x,2.5,z,7.4,.15,4.4,'#ffffff',.1);for(let k=0;k<3;k++){piyola(x-2+k*2,2.65,z);}non(x,2.65,z+1)}
 for(let i=0;i<12;i++){const x=-6+(i%4)*4,z=-6-Math.floor(i/4)*4;B(x,-.48,z,3.8,.5,3.8,(i+Math.floor(i/4))%2?'#f2e6ff':'#c8a8e8',(sin(T*4+i)>.3)?.4:0)}}
function classroom(o={},T=0){room({W:26,D:26,H:11,wall:o.wall||'#a8b8a0',floor:'#7a5a3a',ceil:o.ceil});B(0,3,-12.6,12,5,.3,'#1e3a2a');B(0,2.8,-12.5,12.4,.3,.5,'#8a6a42');
 for(let r=0;r<3;r++)for(let c=0;c<3;c++)deskSchool(-7+c*7,-4+r*6);B(-12.6,0,-9,.3,6.5,3,'#6b3f26');win(12.6,5.5,-3,-PI/2,4,3.6,o.winGlow||'#7ab8ff',.6);win(12.6,5.5,6,-PI/2,4,3.6,o.winGlow||'#7ab8ff',.6)}
function stage3doors(o={},T=0){B(0,-.5,0,40,.5,30,'#2a2a34');B(0,0,-8,40,16,.5,'#3a2a4a');
 const cols=['#c0392b','#2c6fbf','#d4a017'];for(let i=0;i<3;i++){const x=(i-1)*9;door(x,-7.6,0,o.open&&o.open[i]||0,cols[i],4.5,8);B(x,9.4,-7.6,2,1.6,.4,'#111');}
 }
// ===== overlay (2D) =====
let ctx,W2=720,H2=1280,grainC;
function uz(s){return s.replace(/([OoGg])'/g,"$1‘").replace(/'/g,"’")}
function txt(t,x,y,size,col='#FFE600',stroke=12,align='center',font='Inter',weight=900){ctx.font=`${weight} ${size}px ${font}`;ctx.textAlign=align;ctx.textBaseline='middle';ctx.lineJoin='round';ctx.miterLimit=2;
 if(stroke){ctx.strokeStyle='#000';ctx.lineWidth=stroke;ctx.strokeText(t,x,y)}ctx.fillStyle=col;ctx.fillText(t,x,y)}
function fitTxt(t,x,y,size,maxW,col,stroke){ctx.font=`900 ${size}px Inter`;const w=ctx.measureText(t).width;if(w>maxW)size=size*maxW/w;txt(t,x,y,size,col,stroke*size/size)}
function pill(x,y,w,h,col,r){ctx.beginPath();ctx.roundRect(x-w/2,y-h/2,w,h,r||h/2);ctx.fillStyle=col;ctx.fill()}
function heart(x,y,s,col){ctx.save();ctx.translate(x,y);ctx.scale(s/30,s/30);ctx.beginPath();ctx.moveTo(0,10);ctx.bezierCurveTo(-30,-12,-14,-34,0,-18);ctx.bezierCurveTo(14,-34,30,-12,0,10);ctx.closePath();ctx.fillStyle=col;ctx.fill();ctx.lineWidth=3;ctx.strokeStyle='#fff';ctx.stroke();ctx.restore()}
function vignette(a=.55){const g=ctx.createRadialGradient(W2/2,H2/2,H2*.25,W2/2,H2/2,H2*.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);ctx.fillStyle=g;ctx.fillRect(0,0,W2,H2)}
function grain(T,a=.07){if(!grainC){grainC=document.createElement('canvas');grainC.width=grainC.height=256;const g=grainC.getContext('2d'),id=g.createImageData(256,256);for(let i=0;i<id.data.length;i+=4){const v=Math.random()*255;id.data[i]=id.data[i+1]=id.data[i+2]=v;id.data[i+3]=255}g.putImageData(id,0,0)}
 ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation='overlay';const ox=Math.floor(hash(Math.floor(T*30))*256),oy=Math.floor(hash(Math.floor(T*30)+5)*256);for(let x=-ox;x<W2;x+=256)for(let y=-oy;y<H2;y+=256)ctx.drawImage(grainC,x,y);ctx.restore()}
function flash(a,col='#fff'){if(a<=0)return;ctx.save();ctx.globalAlpha=clamp(a,0,1);ctx.fillStyle=col;ctx.fillRect(0,0,W2,H2);ctx.restore()}
function card(x,y,w,h,rot,bg){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=30;ctx.fillStyle=bg;ctx.fillRect(-w/2,-h/2,w,h);ctx.restore()}
function badge(n,label,p,col='#ff3b5c'){const s=ease(clamp(p*3,0,1));if(s<=0)return;ctx.save();ctx.translate(W2/2,190);ctx.scale(.6+.4*s+(p<.33?sin(p*3*PI)*.15:0),.6+.4*s);ctx.globalAlpha=s;
 pill(0,0,520,130,'rgba(0,0,0,.55)',30);ctx.beginPath();ctx.arc(-195,0,52,0,7);ctx.fillStyle=col;ctx.fill();txt(String(n),-195,4,64,'#fff',0);fitTxt(label,40,4,50,360,'#fff',8);ctx.restore()}
function hookTitle(lines,p,col='#ff2a2a'){const a=p<.85?1:1-(p-.85)/.15;if(a<=0)return;ctx.save();ctx.globalAlpha=a;lines.forEach((l,i)=>{const s=ease(clamp(p*4-i*.5,0,1));if(s<=0)return;ctx.save();ctx.translate(W2/2,170+i*92);ctx.scale(.5+.5*s,.5+.5*s);fitTxt(l,0,0,84,660,i==lines.length-1?col:'#ffffff',14);ctx.restore()});ctx.restore()}
function ctaCard(p,T){if(p<=0)return;const s=ease(clamp(p*2.5,0,1));ctx.save();ctx.fillStyle=`rgba(0,0,0,${.35*s})`;ctx.fillRect(0,0,W2,H2);
 const y0=430;ctx.translate(0,(1-s)*80);ctx.globalAlpha=s;
 const pulse=1+.06*sin(T*9);
 ctx.save();ctx.translate(W2/2,y0);ctx.scale(pulse,pulse);pill(0,0,520,120,'#ff0033',60);txt("OBUNA BO‘LING",0,3,52,'#fff',0);ctx.restore();
 const lp=clamp((p-.25)*3,0,1);ctx.save();ctx.translate(W2/2,y0+170);ctx.scale(.6+.4*ease(lp),.6+.4*ease(lp));ctx.globalAlpha=lp;pill(0,0,420,110,'#ffffff',55);heart(-120,8,46,'#ff2a55');txt("LIKE",40,3,54,'#111',0);ctx.restore();
 // cursor tap
 const cp=clamp((p-.45)*2.2,0,1);if(cp>0){const cx=lerp(W2*.85,W2/2+150,ease(cp)),cy=lerp(y0+380,y0+20,ease(cp));ctx.save();ctx.translate(cx,cy);ctx.scale(cp>.95?.85:1,cp>.95?.85:1);ctx.font='90px "Noto Color Emoji"';ctx.textAlign='center';ctx.fillText('👆',0,40);ctx.restore()}
 ctx.restore()}
// ===== timeline =====
let SHOTS=[],SUBS=[],TIMING,VID,DUR,SFX=[];
function build(timing,lineShots,opt={}){TIMING=timing;const L=timing.lines;DUR=timing.dur+(opt.tail||1.4);
 SHOTS=[];
 for(let i=0;i<L.length;i++){const a=i==0?0:L[i].t0-.05,b=i==L.length-1?DUR:L[i+1].t0-.05;let specs=lineShots[i]||[{}];if(!Array.isArray(specs))specs=[specs];
  // auto-split long single shot
  if(specs.length==1&&b-a>3.3&&!specs[0].noSplit){const s0=specs[0];const s1=Object.assign({},s0,{cam:s0.cam2||punch(s0.cam),auto:1});specs=[s0,s1]}
  const n=specs.length;let cuts=specs.map((s,k)=>s.at!==undefined?s.at:k/n);
  specs.forEach((s,k)=>{const t0=a+(b-a)*cuts[k],t1=k<n-1?a+(b-a)*cuts[k+1]:b;SHOTS.push(Object.assign({t0,t1,line:i},s));(s.sfx||[]).forEach(([dt,ty,v])=>SFX.push({t:dt<0?t1+dt:t0+dt,type:ty,v:v||1}))})}
 // subtitles: chunks of 1-3 words
 SUBS=[];L.forEach((l,li)=>{let ch=[];const flush=()=>{if(ch.length)SUBS.push({t0:ch[0].t0,words:ch.map(w=>w.w),line:li});ch=[]};
  l.words.forEach(w=>{const cur=ch.map(c=>c.w).join(' ');if(ch.length>=3||(cur.length+w.w.length>14&&ch.length)||(ch.length&&/[,.!?:]$/.test(ch[ch.length-1].w)))flush();ch.push(w)});flush()});
 for(let i=0;i<SUBS.length;i++){const nx=SUBS[i+1];const le=L[SUBS[i].line].t1;SUBS[i].t1=nx&&nx.line==SUBS[i].line?nx.t0:Math.min(le+.35,nx?nx.t0:le+.35)}
}
function punch(cam){if(!cam)return cam;const[A,Bc]=cam;const f=(c,k)=>[c[0],c[1],(c[2]||50)*k,(c[3]||0)];return[f(Bc||A,.86),f(Bc||A,.76)]}
function camAt(cam,u,T,shake=0){const A=cam[0],Bc=cam[1]||cam[0];const e=ease(u);const c={eye:lerpA(A[0],Bc[0],e),at:lerpA(A[1],Bc[1],e),fov:lerp(A[2]||50,Bc[2]||50,e),roll:lerp(A[3]||0,Bc[3]||0,e)};
 c.fov*=(OPT.fovK||1);const hs=.05+shake;c.eye=c.eye.map((v,i)=>v+noise1(T*1.3+i*10)*hs*2);c.at=c.at.map((v,i)=>v+noise1(T*1.1+i*20+5)*hs);if(shake>.2){c.roll+=noise1(T*30)*.03*shake}return c}
function drawSub(t){const s=SUBS.find(s=>t>=s.t0&&t<s.t1);if(!s)return;const p=clamp((t-s.t0)/.12,0,1);const sc=p<1?.7+.38*p:1+(.08*Math.max(0,1-(t-s.t0-.12)/.1));
 const str=uz(s.words.join(' ')).toUpperCase().replace(/[.,:!?]+$/,m=>m.includes('!')?'!':m.includes('?')?'?':'');ctx.save();ctx.translate(W2/2,H2*(OPT.subY||.64));ctx.scale(sc,sc);ctx.font='900 76px Inter';let size=76;const w=ctx.measureText(str).width;if(w>640)size=76*640/w;
 txt(str,0,0,size,(OPT.subCols&&OPT.subCols[s.line])||'#3db4ff',size*.22);ctx.restore()}
function renderFrame(t,opt){const sh=SHOTS.find(s=>t>=s.t0&&t<s.t1)||SHOTS[SHOTS.length-1];const u=clamp((t-sh.t0)/(sh.t1-sh.t0),0,1);
 const env=typeof sh.env=='function'?sh.env(t,u):(sh.env||ENV.night);
 const cam=camAt(typeof sh.cam=='function'?sh.cam(u,t):sh.cam,u,t,typeof sh.shake=='function'?sh.shake(u,t):(sh.shake||0));
 R.begin(env,cam);if(sh.draw)sh.draw(t,u);
 ctx.globalAlpha=1;ctx.filter=sh.filter||OPT.filter||'none';ctx.drawImage(glc,0,0,W2,H2);ctx.filter='none';
 if(OPT.horror){vignette(.6);grain(t,.08)}else vignette(.25);
 if(sh.ov)sh.ov(t,sh===SHOTS[0]?Math.max(u,.35):u); // 2026-11-25: hook 1-kadrdanoq ko'rinadi
 if(OPT.global)OPT.global(t);
 drawSub(t);
 if(sh.flash)flash(sh.flash(u,t));
 return glc2.toDataURL('image/jpeg',.9)}
let glc,glc2,OPT={};
function boot(opt){OPT=opt;glc=document.createElement('canvas');glc.width=W2;glc.height=H2;R=initGL(glc);glc2=document.getElementById('c');ctx=glc2.getContext('2d')}
// ===== extra sets/props =====
function plov(x,y,z){B(x,y,z,2,.2,2,'#f4f4f4');B(x,y+.2,z,1.5,.45,1.5,'#e8a040');B(x,y+.55,z,.9,.3,.9,'#f0b050');for(let i=0;i<5;i++)B(x-.5+hash(i)*1,y+.6,z-.5+hash(i+5),.15,.12,.4,'#ff7a1a')}
function livingRoom(o={},T=0){room({W:26,D:24,H:11,wall:o.wall||'#f0dcc0',wall2:'#e6cfb0',floor:'#a8784a'});carpet(0,0,16,12,'#a8262e','#e8b04a');
 win(-12.7,5.5,-3,PI/2,4.5,4,o.night?'#2a3a6a':'#bfe6ff',o.night?.3:.9);door(12.7,4,-PI/2,o.door||0,'#8a5a32');
 shelf(-6,-11,0);B(5,0,-11.3,8,3.2,1.2,'#7a5232');for(let i=0;i<5;i++)piyola(2.2+i*1.4,3.2,-11.2);
 kurpacha(0,-5.5,0,'#c43a6a');kurpacha(-8,0,PI/2,'#3a6ac4');kurpacha(8,0,PI/2,'#3aa66a');
 if(o.table!==false)lowTable(0,0,6,3.5);
 B(0,9.2,0,.2,1.8,.2,'#444');B(0,8.6,0,2.4,.6,2.4,'#f6e6b0',.8)}
function bedroom(o={},T=0){room({W:22,D:22,H:11,wall:o.wall||'#9fb2d0',wall2:'#8fa2c0',floor:'#7a5a3a'});carpet(0,1,10,8,'#3a4a8a','#c8a04a');
 win(-10.7,5.5,-2,PI/2,4,4,o.night?'#1a2850':'#bfe6ff',o.night?.4:.9);bed(4,-6,0,o.bedCol||'#3d6fb6');shelf(-6,-10.2,0);door(10.7,3,-PI/2,o.door||0,'#6b3f26');
 B(-5,0,0,3,2.6,2,'#7a5232');B(-5,2.6,0,3.2,.15,2.2,'#5a3a22')}
function gate(x,z,ry,open=0,col='#2f5a8a'){const m=chain(M.T(x,0,z),M.RY(ry));BM(chain(m,M.T(-3.3,3,0)),.8,6,.8,'#c9b48e');BM(chain(m,M.T(3.3,3,0)),.8,6,.8,'#c9b48e');BM(chain(m,M.T(0,6.2,0)),7.6,.5,.9,'#d9b84a');
 const p=chain(m,M.T(-2.9,0,0),M.RY(-open*1.4),M.T(1.45,2.8,0));BM(p,2.9,5.4,.25,col);const q=chain(m,M.T(2.9,0,0),M.RY(open*1.4),M.T(-1.45,2.8,0));BM(q,2.9,5.4,.25,col)}
function projTxt(pos,t,size,col='#fff',stroke=8){const p=R.proj(pos);if(p[2]<=0)return;txt(t,p[0],p[1],size,col,stroke)}
function bubble(x,y,t,size=44,p=1){if(p<=0)return;const s=ease(clamp(p*4,0,1));ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.font=`900 ${size}px Inter`;const w=ctx.measureText(t).width+50;
 ctx.fillStyle='#fff';ctx.strokeStyle='#000';ctx.lineWidth=5;ctx.beginPath();ctx.roundRect(-w/2,-size,w,size*2,size);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(-20,size-2);ctx.lineTo(-40,size+30);ctx.lineTo(5,size-2);ctx.fill();txt(t,0,2,size,'#111',0);ctx.restore()}
function hearts(T,u){for(let i=0;i<14;i++){const ph=(u*1.6+hash(i))%1;const x=60+hash(i+3)*600+sin(T*3+i)*20,y=1300-ph*1000;ctx.globalAlpha=1-ph;heart(x,y,30+hash(i+7)*30,i%3?'#ff2a55':'#ff6a8a')}ctx.globalAlpha=1}
function bigLike(p,T){if(p<=0)return;const s=ease(clamp(p*3,0,1))*(1+.06*sin(T*10));ctx.save();ctx.translate(W2/2,420);ctx.scale(s,s);heart(0,40,170,'#ff2a55');txt('LIKE',0,60,56,'#fff',8);ctx.restore()}
function clockTxt(t,y=110,col='#fff'){pill(W2/2,y,300,90,'rgba(0,0,0,.6)',20);txt(t,W2/2,y+3,58,col,0)}
function zzz(x,y,T){for(let i=0;i<3;i++){const ph=(T*.8+i/3)%1;ctx.globalAlpha=1-ph;txt('Z',x+ph*60+i*10,y-ph*120,30+i*12,'#fff',6)}ctx.globalAlpha=1}
function paper(lines,p,rot=-.04,col='#b01010'){if(p<=0)return;const s=ease(clamp(p*3,0,1));ctx.save();ctx.translate(W2/2,470);ctx.rotate(rot);ctx.scale(s,s);card(0,0,600,lines.length*80+120,0,'#f2ead6');
 lines.forEach((l,i)=>{ctx.font='900 50px Inter';txt(l,0,-((lines.length-1)*40)+i*80,50,col,0)});ctx.restore()}
function mirrorMask(){ctx.save();ctx.fillStyle='#07080c';ctx.beginPath();ctx.rect(0,0,W2,H2);ctx.roundRect(40,330,640,420,80);ctx.fill('evenodd');ctx.lineWidth=14;ctx.strokeStyle='#2a2d36';ctx.beginPath();ctx.roundRect(40,330,640,420,80);ctx.stroke();
 const g=ctx.createLinearGradient(40,330,680,750);g.addColorStop(0,'rgba(255,255,255,.12)');g.addColorStop(.5,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(40,330,640,420,80);ctx.fill();ctx.restore()}
function recFrame(T){ctx.save();ctx.strokeStyle='#fff';ctx.lineWidth=6;const m=60;[[m,m,1,1],[W2-m,m,-1,1],[m,H2-m,1,-1],[W2-m,H2-m,-1,-1]].forEach(([x,y,a,b])=>{ctx.beginPath();ctx.moveTo(x,y+b*60);ctx.lineTo(x,y);ctx.lineTo(x+a*60,y);ctx.stroke()});
 if(sin(T*6)>0){ctx.fillStyle='#ff2020';ctx.beginPath();ctx.arc(110,130,16,0,7);ctx.fill()}txt('REC',175,132,36,'#fff',0);ctx.restore()}
