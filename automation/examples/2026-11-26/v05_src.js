// SHKAF (1-qism)
const kid={...LK.kid,shirt:'#7a3ad0',pants:'#2a2d3a',hair:'#2a1a12'};
const twin={...kid,eyeGlow:'#ff2a2a'};
const NBd=(T,o={})=>E('night',Object.assign({fog:'#141a34',fogD:.014,amb:'#6070a0',sun:'#8090c8',lamp:'#a8c0ff',lampPos:[-8,7,-2]},o));
const RED=(T)=>E('red',{fog:'#1c070a',fogD:.018,amb:'#8a3a42',sun:'#b04850',lampPos:[-1,6,-5],lamp:noise1(T*8)>-.3?'#ff4040':'#501010'});
const DAY=(T)=>E('day',{fog:'#cfe6ff',amb:'#a8b4c8'});
const WX=-1,WZ=-10.2;
function wardrobe(T,open,o={}){const w=4.6,h=8.2,d=2.2,zf=WZ+1.2;const col='#6a4226';
 B(WX,0,WZ-.9,w,h,.2,'#120c08');B(WX-w/2+.1,0,WZ+.1,.2,h,d,col);B(WX+w/2-.1,0,WZ+.1,.2,h,d,col);B(WX,h-.2,WZ+.1,w,.3,d,col);B(WX,0,WZ+.1,w,.3,d,col);B(WX,h,WZ+.1,w+.3,.3,d+.2,'#4a2a16');
 if(o.inside)o.inside();const pw=w/2-.1,ph=h-.5;
 B(WX-w/4,.25,zf,pw,ph,.2,'#8a5a32');B(WX-.4,4,zf+.12,.2,.25,.15,'#d9b84a',.3);
 const rp=chain(M.T(WX+w/2-.1,.25,zf),M.RY(open*2.2),M.T(-pw/2,ph/2,0));BM(rp,pw,ph,.2,'#8a5a32');BM(chain(rp,M.T(-pw/2+.35,0,.15)),.2,.25,.15,'#d9b84a',.3);
 if(o.glow&&open>.03)B(WX+.1,.4,WZ-.75,.5,h-1,.05,'#ff3030',.9)}
function rm2(T,open,o={}){bedroom({night:o.day?0:1,bedCol:'#5a3ad0'},T);wardrobe(T,open,o)}
const tw=(T,f)=>()=>C(twin,{x:WX+.6,z:WZ+.3,yaw:0,scale:.78,face:f||'glow'},T);
const S=[
 [{cam:[[[3,6.5,9],[WX,4,WZ],52],[[2.5,6,7.5],[WX,4,WZ],46]],env:NBd,draw:(T,u)=>{rm2(T,.1,{glow:1});C(kid,{x:4,z:-1,yaw:-PI*.8,scale:.85,face:'scared'},T)},ov:(T,u)=>hookTitle(['HAR KECHA SHKAF','1 SM OCHILADI!'],u*.5+.3),sfx:[[0,'hit'],[.1,'door']]}],
 [{cam:[[[-6,7,9],[2,3,-6],54],[[-5,6.6,8],[2,3,-6],50]],env:NBd,draw:(T,u)=>{rm2(T,.01);C(kid,{x:4,z:-1,yaw:-PI*.8,scale:.85,face:'calm',headYaw:.4*sin(T)},T)},ov:(T,u)=>bigTxt('10 KUN OLDIN',230,'#ffe14d',u,90),sfx:[[0,'whoosh']]}],
 [{noSplit:1,cam:[[[WX+2.5,4.5,WZ+6],[WX+.4,4,WZ+1],40],[[WX+2,4.4,WZ+5],[WX+.4,4,WZ+1],34]],env:NBd,draw:(T,u)=>rm2(T,.03,{glow:1}),ov:(T,u)=>bigTxt('1-KECHA',230,'#ffffff',u,90),sfx:[[0,'door']]}],
 [{noSplit:1,cam:[[[4.6,4.2,3.4],[4,3.6,-1],34],[[4.4,4.1,2.8],[4,3.6,-1],30]],env:NBd,draw:(T,u)=>{rm2(T,.02);C(kid,{x:4,z:-1,yaw:0,scale:.85,face:'scared',headYaw:.3*sin(T*2)},T)},ov:(T,u)=>subPill(T,u),sfx:[[0,'pop']]}],
 [{noSplit:1,cam:[[[WX+6,5,WZ+7],[WX+.6,4,WZ+.5],44],[[WX+5,4.8,WZ+6],[WX+.6,4,WZ+.5],38]],env:NBd,shake:.15,draw:(T,u)=>rm2(T,.3,{glow:1}),ov:(T,u)=>bigTxt('10-KECHA',230,'#ff2a2a',u,100),sfx:[[0,'door'],[.1,'stinger']]}],
 [{cam:[[[4,5.5,6],[WX,3.5,WZ],46],[[3,5.2,4],[WX,3.5,WZ],40]],env:(T)=>NBd(T,{lamp:'#fff6c0',lampPos:[1,4,-4]}),draw:(T,u)=>{rm2(T,.4);C({...kid,item:'flashlight'},{x:lerp(3,1.5,u),z:lerp(-2,-4.5,u),yaw:PI+.3,scale:.85,face:'scared',aR:-1.4,...walk(T,4,.3)},T)},sfx:[[0,'step'],[.4,'step']]}],
 [{noSplit:1,cam:[[[WX+1.6,4,WZ+5.5],[WX+.6,3.3,WZ],38],[[WX+1.3,3.8,WZ+4.5],[WX+.6,3.3,WZ],32]],env:(T)=>NBd(T,{lamp:'#fff6c0',lampPos:[WX+1,4,WZ+4]}),draw:(T,u)=>rm2(T,.6,{inside:tw(T,'calm')}),flash:(u)=>u<.05?.5:0,sfx:[[0,'stinger']]}],
 [{noSplit:1,cam:[[[WX+1,3.6,WZ+5.2],[WX+.6,3.3,WZ],36],[[WX+.9,3.5,WZ+4.5],[WX+.6,3.3,WZ],31]],env:RED,shake:.2,draw:(T,u)=>rm2(T,.6,{inside:tw(T,'evil')}),ov:(T,u)=>bigTxt('ENDI NAVBAT MENGA',230,'#ff2a2a',u,80),sfx:[[0,'laugh'],[.3,'heart']]}],
 [{cam:[[[-6,7,9],[2,3,-6],54],[[-5,6.6,8],[2,3,-6],50]],env:DAY,draw:(T,u)=>{rm2(T,0,{day:1});C(LK.mom,{x:-1.5,z:1.5,yaw:PI/2+.4,scale:.9,face:'talk',aR:-1},T);C(kid,{x:4,z:-1,yaw:-PI/2,scale:.85,face:'sleep'},T)},ov:(T)=>clockTxt('07:00',120,'#111'),sfx:[[0,'ding']]}],
 [{noSplit:1,cam:[[[0,3.6,6],[0,3.5,0],34],[[0,3.6,5.2],[0,3.5,0],30]],env:RED,shake:.25,draw:(T,u)=>{bedroom({night:1},T);C(twin,{x:0,z:0,yaw:0,scale:.85,face:u>.4?'evil':'glow'},T)},ov:(T,u)=>mirrorMask(),flash:(u)=>u>.4&&u<.44?.6:0,sfx:[[0,'whoosh'],[.4,'stinger']]}],
 [{noSplit:1,cam:[[[3,6.5,9],[WX,4,WZ],52],[[2.5,6.2,8],[WX,4,WZ],48]],env:RED,draw:(T,u)=>{rm2(T,.6,{inside:tw(T),glow:1});C(kid,{x:3,z:-2,yaw:PI+.4,scale:.85,face:'scared'},T)},ov:(T,u)=>abCard(T,u,'ONAMGA AYTAMAN','SHKAFNI OCHAMAN'),sfx:[[0,'whoosh'],[.3,'pop'],[.55,'pop']]}],
 [{noSplit:1,cam:[[[2.5,6.2,8],[WX,4,WZ],48],[[2,6,7],[WX,4,WZ],44]],env:RED,draw:(T,u)=>{rm2(T,.6+.1*u,{inside:tw(T),glow:1})},ov:(T,u)=>endSub(T,u,'DAVOMI ERTAGA!'),sfx:[[0,'whoosh'],[.4,'pop']]}],
];
boot({horror:1,global:partBadge,subY:.72});build(TIMINGDATA,S,{tail:1.6});
