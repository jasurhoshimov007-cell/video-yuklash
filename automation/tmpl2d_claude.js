// ===== Claude bilan suhbat shabloni (2D flat-vector). SPEC:
// {speakers:["H","C",..], moods:[..], look:{hood:"#2f9ae1",hair:"#3a2418",skin:"#e6b08a"}, wide:[idx], hookBig:"02:00", hookSub:"SAYT YIQILDI!", alert:true}
// speakers: H = odam, C = Claude. moods: calm|scared|shock|happy|sad|angry
const LOOK=Object.assign({hood:'#2f9ae1',hoodL:'#4aaef0'},SPEC.look||{});
const camsW=[[1,360,700],[1.06,360,690]],camsH=[[1.95,215,690],[2.15,215,680]],camsC=[[1.9,520,760],[2.1,520,750]];
const MOUTH=(sp,who,m)=>sp===who?m:0;
function spaceBack(t){ctx.fillStyle=lgrad(0,-100,0,1100,[[0,'#02030f'],[1,'#0b1230']]);ctx.fillRect(-300,-300,1320,1500);stars(70,5,0,700);
 glow(520,330,360,'#4aa8ff',.35);ell(520,330,170,170,lgrad(350,160,690,500,[[0,'#3a8be0'],[1,'#10285a']]));ell(470,290,70,40,'rgba(255,255,255,.18)');ell(590,380,60,30,'rgba(255,255,255,.12)');
 ctx.strokeStyle='#cfd6e6';ctx.lineWidth=18;ctx.strokeRect(20,60,680,560);ctx.lineWidth=6;ctx.strokeStyle='#7a86a6';ctx.strokeRect(34,74,652,532);
 rrect(-20,640,760,520,0,'#1a2140');for(let i=0;i<5;i++)for(let j=0;j<3;j++){const on=(Math.sin(t*3+i*2+j)>.3);ell(60+i*52,700+j*50,10,10,on?(i===1&&j===2?'#ff3b3b':'#46e07a'):'#2a3358')}
 for(let i=0;i<6;i++)rrect(360+(i%3)*110,690+Math.floor(i/3)*80,90,60,8,'#26305a');
 rrect(40,830,40,150,10,'#d9202e');ell(60,820,22,22,'#ff4a55');
 ctx.fillStyle='#1b2142';ctx.fillRect(-300,1150,1320,400)}
function kitchenBack(t){ctx.fillStyle=lgrad(0,-100,0,1100,[[0,'#3a2418'],[1,'#1e120c']]);ctx.fillRect(-300,-300,1320,1500);
 for(let i=0;i<9;i++)for(let j=0;j<6;j++)rrect(-20+i*90,80+j*90,84,84,6,(i+j)%2?'#e8dcc8':'#d8c8b0');
 rrect(40,120,200,24,6,'#6a4a30');[60,110,160,210].forEach((x,i)=>{limb(x,144,x,200,3,'#888');ell(x,214,16,16,['#c0c4cc','#d8a25a','#c0c4cc','#8a5a30'][i])});
 glow(560,300,260,'#ffb050',.35);rrect(470,180,190,240,20,'#2a1a10');ell(565,300,70,70,'#ff8a30');ell(565,300,40,40,'#ffd070');
 for(let i=0;i<5;i++){const ph=(t*.5+i/5)%1;ctx.globalAlpha=(1-ph)*.35;ell(360+Math.sin(t+i)*30,640-ph*400,40+ph*60,30+ph*50,'#f0f0f0')}ctx.globalAlpha=1}
function kitchenFront(t,o={}){rrect(-20,880,760,40,10,'#c8b8a0');rrect(0,920,720,320,0,'#6a4a30');
 ell(360,880,150,40,'#1a1a1a');rrect(210,820,300,70,30,'#2a2a2a');ell(360,822,150,30,'#3a3a3a');ell(360,822,128,22,'#e8c070');for(let i=0;i<14;i++)ell(250+hash(i)*220,815+hash(i+3)*14,6,4,'#c06a2a');
 [['GURUCH',80],['GO‘SHT',590]].forEach(([l,x])=>{rrect(x-60,950,120,150,14,'#efe6d0');txt(l,x,1025,22,'#5a3a20',0)})}
function classBack(t){ctx.fillStyle=lgrad(0,-100,0,1000,[[0,'#2a4a6a'],[1,'#18304a']]);ctx.fillRect(-300,-300,1320,1400);
 rrect(30,140,660,420,14,'#6a4a30');rrect(50,160,620,380,8,'#1f4a36');ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=4;
 txt('Ota-onalar',200,220,40,'rgba(255,255,255,.85)',0,'left',800);txt('majlisi 18:00',200,275,40,'rgba(255,255,255,.85)',0,'left',800);
 ctx.beginPath();ctx.moveTo(90,480);ctx.lineTo(200,420);ctx.lineTo(300,450);ctx.lineTo(420,360);ctx.lineTo(560,390);ctx.stroke();
 rrect(60,600,120,40,6,'#c8b080');ell(620,120,40,40,'#fff');ctx.strokeStyle='#222';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(620,120);ctx.lineTo(620,95);ctx.moveTo(620,120);ctx.lineTo(640,128);ctx.stroke()}
function deskScene(t,sp,mood,m,o={}){({space:spaceBack,kitchen:kitchenBack,class:classBack}[SPEC.scene]||deskBack)(t);
 const hm=sp==='H'?mood:'calm',scared=(hm==='scared'||hm==='shock'||hm==='sad');
 drawHost({x:215,y:930,s:1.3,upper:1,t,pal:LOOK,mouth:MOUTH(sp,'H',m),eye:scared?'wide':(hm==='happy'?'open':'open'),brow:scared?1:(hm==='angry'?-1:0),mshape:hm==='happy'?'smile':(scared?'frown':'neutral'),sweat:hm==='scared',aL:[.2,.1],aR:hm==='shock'?[2.3,2.6]:[.35,-.2]});
 (SPEC.scene==='kitchen'?kitchenFront:deskFront)(t,o);
 drawClaude2d(520,880,1,sp==='C'?mood:'calm',sp==='C'&&m>.05,t)}
const S=SPEC.speakers.map((sp,i)=>{const mood=SPEC.moods[i]||'calm',wide=(SPEC.wide||[]).includes(i)||i===0;
 const cam=wide?camsW:(sp==='H'?camsH:camsC);
 const shot={cam,scene:(t,u,m)=>deskScene(t,sp,mood,m),sfx:[[0,sp==='C'?'pop':'click']],vig:.5};
 if(i===0){shot.shake=.6;shot.ov=(T,u)=>{const a=ease(ramp(u,0,.15));ctx.save();ctx.globalAlpha=a;ctx.translate(360,230);ctx.scale(.8+.2*a,.8+.2*a);txt(SPEC.hookBig||'02:00',0,0,160,'#ff3b5c',22);txt(SPEC.hookSub||'',0,112,60,'#ffe14d',14);ctx.restore();if(SPEC.alert){ctx.fillStyle=`rgba(255,20,40,${.1+.08*Math.sin(T*12)})`;ctx.fillRect(0,0,W2,H2)}};shot.sfx=[[0,'hit'],[.2,'whoosh']]}
 const ch=(SPEC.chips||{})[i];if(ch&&i>0){shot.ov=(T,u)=>{ch.forEach((c,k)=>chipPop(c,360,130+k*80,ramp(u,.08+k*.18,.25+k*.18),['#ffd23a','#3db4ff','#7aff7a','#ff9ac8'][k%4],'#111',36))};shot.sfx=shot.sfx.concat(ch.map((c,k)=>[.1+k*.18,'pop']))}
 if(i===SPEC.speakers.length-1){shot.ov=(T,u)=>{subscribeBtn(ramp(u,.15,.9),T)}}
 return shot});
boot2d({subY:1040});build2d(TIMINGDATA,S,{tail:1.4,kw:SPEC.kw||[]});
