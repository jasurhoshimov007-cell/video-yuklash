// MAKTAB 23:00 (1-qism, davomi Telegramda)
const kid={...LK.kid,shirt:'#2f7de1',pants:'#2b2f3a',hair:'#1a120c',item:'flashlight'};
const SCH=(T,o={})=>E('nightCold',Object.assign({fog:'#16223a',fogD:.012,amb:'#7486b0',sun:'#8a9cd0',lamp:'#d8e8ff',lampPos:[0,9,0]},o));
const OFF=(T)=>E('nightCold',{fog:'#0a1020',fogD:.02,amb:'#46557a',sun:'#5a6a98',lamp:noise1(T*8)>0?'#a8c4ff':'#18223a',lampPos:[0,8,-8]});
const RED=(T)=>E('red',{fogD:.018,amb:'#8a3a40',sun:'#a04048',lampPos:[0,8,-6],lamp:noise1(T*9)>-.4?'#ff5050':'#501010'});
function cls(T){classroom({wall:'#8a9c96',winGlow:'#3a4a8a'},T)}
function board(sz=1,name=1){const p=R.proj([0,8.2,-12.2]);if(p[2]>0)txt('NAVBATDAGI:',p[0],p[1],34*sz*(14/p[2]),'#ffffff',0);if(name){const q=R.proj([0,6.6,-12.2]);if(q[2]>0)txt('AZIZ',q[0],q[1],70*sz*(14/q[2]),'#ff3a3a',0)}}
function hall7(T,o={}){corridor({flick:o.flick,wall:'#94a49a',floor:'#50545e'},T)}
const K=.8;
const S=[
 [{cam:[[[6,7.5,12.5],[0,4.5,-10],56],[[5,7,11],[0,4.6,-10],50]],env:SCH,draw:(T,u)=>{cls(T);C(kid,{x:3.5,z:-1,yaw:PI,scale:K,face:'scared',aR:-1.2},T)},ov:(T,u)=>hookTitle(['QOIDA: 23:00 DAN','KEYIN DOSKAGA QARAMA!'],u*.5+.3),sfx:[[0,'hit'],[.1,'whoosh']]}],
 [{noSplit:1,cam:(u,T)=>{const z=lerp(2,-7,u);return[[[1.6,5.6,z+13],[0,3.4,z-6],48]]},env:SCH,draw:(T,u)=>{hall7(T);C(kid,{x:0,z:lerp(2,-7,u),yaw:PI,scale:K,aR:-1.3,...walk(T,7,.5)},T)},sfx:[[0,'step'],[.3,'step'],[.6,'step']]}],
 [{noSplit:1,cam:[[[1.5,4.8,-16],[0,3.4,-7],42],[[1,4.6,-14.5],[0,3.4,-7],38]],env:SCH,draw:(T,u)=>{hall7(T);C(kid,{x:0,z:-7,yaw:PI,scale:K,aR:-1.3,headYaw:.5*sin(T*1.2),face:'calm'},T)},ov:(T)=>clockTxt('22:58',120,'#ffffff')}],
 [{noSplit:1,cam:[[[.8,3.9,-12.5],[0,3.5,-7],34],[[.5,3.8,-11.8],[0,3.5,-7],30]],env:SCH,draw:(T,u)=>{hall7(T);C(kid,{x:0,z:-7,yaw:PI,scale:K,aR:-1.3,face:'calm'},T)},ov:(T,u)=>subPill(T,u),sfx:[[0,'pop']]}],
 [{cam:[[[0,6,9],[0,4,-20],50],[[0,5.6,6],[0,4,-20],44]],env:OFF,shake:.25,draw:(T,u)=>{hall7(T,{flick:1});C(kid,{x:0,z:-7,yaw:PI,scale:K,aR:-1.3,face:'scared'},T)},ov:(T)=>clockTxt('23:00',120,'#ff5050'),sfx:[[0,'stinger'],[.1,'click']]}],
 [{cam:[[[3.5,5.2,-3],[-5,4.2,-14],46],[[3,5,-5],[-5,4.2,-14],40]],env:OFF,draw:(T,u)=>{hall7(T,{flick:1});C(kid,{x:-1.8,z:-12,yaw:-PI/2-.3,scale:K,face:'scared',aR:-1.3},T)},ov:()=>{const p=R.proj([-5.3,7.4,-14]);if(p[2]>0)txt('7-SINF',p[0],p[1],38,'#ffd23a',8)},sfx:[[0,'click'],[.2,'click'],[.35,'click'],[.55,'click'],[.7,'click']]}],
 [{noSplit:1,cam:[[[-8,7.5,11.5],[2,3,-6],56],[[-7,7,10],[2,3.2,-6],50]],env:SCH,draw:(T,u)=>{cls(T);C(kid,{x:9,z:9,yaw:PI+.6,scale:K,face:'scared',aR:-1.3,...walk(T,5,.3*(1-u))},T)},sfx:[[0,'door']]}],
 [{cam:[[[0,5.5,0],[0,6.8,-12.6],50],[[0,5.6,-3.5],[0,6.8,-12.6],42]],env:SCH,draw:(T,u)=>{cls(T)},ov:()=>board(1,1),sfx:[[0,'stinger']]}],
 [{noSplit:1,cam:[[[0,5.8,-4],[0,7.2,-12.6],42],[[0,5.8,-5.5],[0,7.2,-12.6],36]],env:RED,shake:.2,draw:(T,u)=>{cls(T)},ov:()=>board(1.1,1),flash:(u)=>u<.06?.5:0,sfx:[[0,'heart'],[.5,'heart']]}],
 [{noSplit:1,cam:[[[3.5,4,-4],[3.5,3.4,2],40],[[3.5,3.9,-3],[3.5,3.4,2],34]],env:RED,shake:.5,draw:(T,u)=>{cls(T);C(kid,{x:3.5,z:2,yaw:PI,scale:K,face:'shock',aR:-1.3,headYaw:.3*sin(T*3)},T)},flash:(u)=>u<.05?.7:0,sfx:[[0,'thud'],[.05,'hit']]}],
 [{noSplit:1,cam:[[[6,7.5,12.5],[0,4.5,-10],56],[[5,7,11],[0,4.6,-10],52]],env:RED,draw:(T,u)=>{cls(T);C(kid,{x:3.5,z:-1,yaw:PI,scale:K,face:'scared',aR:-1.3},T)},ov:(T,u)=>{board(.8,1);abCard(T,u,'DERAZADAN QOCHAMAN','ISMIMNI O‘CHIRAMAN')},sfx:[[0,'whoosh'],[.3,'pop'],[.55,'pop']]}],
 [{noSplit:1,cam:[[[5,7,11],[0,4.6,-10],52],[[4,6.6,9],[0,4.6,-10],48]],env:RED,draw:(T,u)=>{cls(T)},ov:(T,u)=>tgEnd(T,u),sfx:[[0,'whoosh'],[.5,'ding']]}],
];
boot({horror:1,global:partBadge,subY:.72});build(TIMINGDATA,S,{tail:1.6});
