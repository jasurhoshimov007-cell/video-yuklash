// ===== Claude bilan suhbat shabloni (2D flat-vector). SPEC:
// {speakers:["H","C",..], moods:[..], look:{hood:"#2f9ae1",hair:"#3a2418",skin:"#e6b08a"}, wide:[idx], hookBig:"02:00", hookSub:"SAYT YIQILDI!", alert:true}
// speakers: H = odam, C = Claude. moods: calm|scared|shock|happy|sad|angry
const LOOK=Object.assign({hood:'#2f9ae1',hoodL:'#4aaef0'},SPEC.look||{});
const camsW=[[1,360,700],[1.06,360,690]],camsH=[[1.95,215,690],[2.15,215,680]],camsC=[[1.9,520,760],[2.1,520,750]];
const MOUTH=(sp,who,m)=>sp===who?m:0;
function deskScene(t,sp,mood,m,o={}){deskBack(t);
 const hm=sp==='H'?mood:'calm',scared=(hm==='scared'||hm==='shock'||hm==='sad');
 drawHost({x:215,y:930,s:1.3,upper:1,t,pal:LOOK,mouth:MOUTH(sp,'H',m),eye:scared?'wide':(hm==='happy'?'open':'open'),brow:scared?1:(hm==='angry'?-1:0),mshape:hm==='happy'?'smile':(scared?'frown':'neutral'),sweat:hm==='scared',aL:[.2,.1],aR:hm==='shock'?[2.3,2.6]:[.35,-.2]});
 deskFront(t,o);
 drawClaude2d(520,880,1,sp==='C'?mood:'calm',sp==='C'&&m>.05,t)}
const S=SPEC.speakers.map((sp,i)=>{const mood=SPEC.moods[i]||'calm',wide=(SPEC.wide||[]).includes(i)||i===0;
 const cam=wide?camsW:(sp==='H'?camsH:camsC);
 const shot={cam,scene:(t,u,m)=>deskScene(t,sp,mood,m),sfx:[[0,sp==='C'?'pop':'click']],vig:.5};
 if(i===0){shot.shake=.6;shot.ov=(T,u)=>{const a=ease(ramp(u,0,.15));ctx.save();ctx.globalAlpha=a;ctx.translate(360,230);ctx.scale(.8+.2*a,.8+.2*a);txt(SPEC.hookBig||'02:00',0,0,160,'#ff3b5c',22);txt(SPEC.hookSub||'',0,112,60,'#ffe14d',14);ctx.restore();if(SPEC.alert){ctx.fillStyle=`rgba(255,20,40,${.1+.08*Math.sin(T*12)})`;ctx.fillRect(0,0,W2,H2)}};shot.sfx=[[0,'hit'],[.2,'whoosh']]}
 if(i===SPEC.speakers.length-1){shot.ov=(T,u)=>{subscribeBtn(ramp(u,.15,.9),T)}}
 return shot});
boot2d({subY:1040});build2d(TIMINGDATA,S,{tail:1.4,kw:SPEC.kw||[]});
