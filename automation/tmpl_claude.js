// ===== Claude bilan suhbat shabloni (blokli 3D). SPEC:
// {speakers:["H","C",...], moods:["scared","calm",...], look:"boy", shirt:"#2f9ae1", wide:[indekslar], hookBig:"02:00", hookSub:"SAYT YIQILDI!", alert:true}
const ENVC=E('night',{fog:'#141c40',fogD:.012,amb:'#6a74b0',sun:'#8a96d8',sunDir:[.3,1,.6],lampPos:[0,9,4],lamp:'#ffcf90'});
const HL=Object.assign({},LK[SPEC.look||'boy'],{shirt:SPEC.shirt||'#2f9ae1'});
function claudeBot(T,x,y,z,yaw,mood,speaking,sc=1){
 const bob=sin(T*2.2)*.06,sq=speaking?1+.045*sin(T*15):1,m=chain(M.T(x,y+1.55*sc+bob,z),M.RY(yaw),M.S(sc,sc*sq,sc));
 BM(m,3.6,3.1,3.1,'#ff8f45',.12);BM(chain(m,M.T(0,1.62,0)),3.7,.18,3.2,'#ffb070',.15);
 const bl=(T%3.4)<.12;let eh=.95;if(bl)eh=.1;else if(mood==='happy')eh=.28;else if(mood==='shock'||mood==='scared')eh=1.25;
 [-.78,.78].forEach(ex=>{BM(chain(m,M.T(ex,.28,1.56)),.5,eh,.08,'#2a1812');if(mood==='happy'&&!bl)BM(chain(m,M.T(ex,.1,1.57)),.62,.12,.06,'#2a1812')});
 [[-1.1,-1],[1.1,-1],[-1.1,.9],[1.1,.9]].forEach(([lx,lz])=>BM(chain(m,M.T(lx,-1.95,lz*.8)),.72,.9,.72,'#e0702a'));
 if(speaking)glowBox(m)}
function glowBox(m){BM(chain(m,M.T(0,0,-.1)),3.9,3.4,3.4,'#ff8f45',.08)}
function deskScene(T,o={}){
 B(0,-.5,0,60,.5,40,'#2a2448');B(0,0,-12,60,24,.6,'#161c4a');
 // deraza va shahar
 B(-8,5,-11.6,10,8,.3,'#0a1038');for(let i=0;i<8;i++)B(-12.4+i*1.2,5.2,-11.4,.9,2+hash(i)*4,.3,'#0e1650');for(let i=0;i<14;i++)B(-12.6+hash(i)*9,5.6+hash(i+3)*5,-11.3,.3,.3,.1,'#ffd27a',1.2);
 for(let i=0;i<14;i++)B(-14+i*2.2,15.5+sin(i)*.4,-11.5,.35,.35,.35,'#ffe9a8',1.6);
 B(-2.4,0,-2.6,3.2,1.3,3,'#2a2f6a');B(-2.4,1.3,-4.1,3.2,3.4,.5,'#2a2f6a');
 B(.3,0,1.9,9.8,2.3,3.2,'#7a4a2a');B(.3,2.3,1.9,10.2,.3,3.6,'#a8723e');
 B(.2,2.6,2.3,3.2,.2,2.2,'#cfd3dc');R.box(chain(M.T(.2,3.9,1.3),M.RY(.25),M.RX(-.28),M.S(3.2,2.2,.18)),'#cfd3dc');R.box(chain(M.T(.2,3.9,1.41),M.RY(.25),M.RX(-.28),M.S(2.9,1.95,.1)),o.screen||'#2a4aa0',.9);
 B(-3.6,2.6,2.6,.9,.9,.9,'#fff');B(-3.6,3.5,2.6,.75,.12,.75,'#3a2a1a');
 C(HL,Object.assign({x:-2.4,y:1.0,z:-1.0,yaw:0,sit:1,face:'calm',seed:5},o.hum||{}),T);
 claudeBot(T,2.7,2.6,2.2,-.4,o.cm||'calm',o.cs,.9)}
const camW=[[[0,6,13.2],[.1,3.7,0],50],[[.5,5.7,11.8],[.1,3.8,0],46]];
const camH=[[[-2.8,4.9,7.4],[-2.4,4.1,-1],34],[[-2.7,4.8,6.2],[-2.4,4.1,-1],30]];
const camC=[[[2.7,5.4,16.5],[2.7,4.3,2.2],36],[[2.7,5.2,15],[2.7,4.3,2.2],32]];
const FAC={calm:'talk',scared:'scared',shock:'shock',happy:'happy',sad:'scared',angry:'angry'};
const S=SPEC.speakers.map((sp,i)=>{const mood=SPEC.moods[i]||'calm',wide=(SPEC.wide||[]).includes(i);
 const hum=(T)=>({face:sp==='H'?(mood==='calm'?'talk':(FAC[mood]||'talk')):(mood==='scared'?'scared':'calm'),aR:sp==='H'&&mood==='shock'?-2.4:0,aL:sp==='H'&&mood==='scared'?-1.3:0});
 const cam=wide?camW:(sp==='H'?camH:camC);
 const shot={cam,env:ENVC,draw:T=>deskScene(T,{hum:hum(T),cs:sp==='C',cm:sp==='C'?mood:'calm'}),sfx:[[0,sp==='C'?'pop':'click']]};
 if(i===0){shot.cam=camW.map(c=>c);shot.shake=.5;shot.ov=(T,u)=>{const a=ease(ramp(u,0,.15));ctx.save();ctx.globalAlpha=a;ctx.translate(360,210);ctx.scale(.8+.2*a,.8+.2*a);txt(SPEC.hookBig||'02:00',0,0,150,'#ff3b5c',26);txt(SPEC.hookSub||'',0,110,58,'#ffe14d',14);ctx.restore();if(SPEC.alert){ctx.fillStyle=`rgba(255,20,40,${.1+.08*sin(T*12)})`;ctx.fillRect(0,0,W2,H2)}};shot.sfx=[[0,'hit'],[.2,'whoosh']]}
 if(i===SPEC.speakers.length-1){shot.ov=(T,u)=>ctaCard(ramp(u,.1,.6),T)}
 return shot});
boot({fovK:1.15});build(TIMINGDATA,S,{tail:1.4});
