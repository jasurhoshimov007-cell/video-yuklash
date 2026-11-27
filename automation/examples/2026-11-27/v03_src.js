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
const PART='2-QISM';
const S=[
 [{noSplit:1,cam:[[[0,3.6,6],[0,3.5,0],34],[[0,3.6,5.2],[0,3.5,0],30]],env:RED,draw:(T,u)=>{bedroom({night:1},T);C(twin,{x:0,z:0,yaw:0,scale:.85,face:'glow',headYaw:.1*sin(T*3)},T)},ov:(T,u)=>{mirrorMask();hookTitle(['KO‘ZGUDAGI BOLA','ISMIMNI BILADI!'],u*.5+.3)},sfx:[[0,'hit'],[.1,'whoosh']]}],
 [{cam:[[[-6,7,9],[2,3,-6],54],[[-5,6.6,8],[2,3,-6],50]],env:DAY,draw:(T,u)=>{rm2(T,0,{day:1});C(LK.mom,{x:1,z:-3,yaw:PI/2-.3,scale:.9,face:'calm'},T);C(kid,{x:4.5,z:-2.5,yaw:-PI/2-.3,scale:.85,face:'talk'},T)},ov:(T,u)=>cmtBubbles(T,u,['onamga aytaman','A','onaga aytish kerak'],'SIZ AYTDINGIZ: A'),sfx:[[0,'pop'],[.3,'pop'],[.5,'pop']]}],
 [{noSplit:1,cam:[[[2.5,5,4],[1,4,-3],40],[[2.3,4.9,3.2],[1,4,-3],36]],env:DAY,draw:(T,u)=>{rm2(T,0,{day:1});C({...LK.mom,item:'photo'},{x:1,z:-3,yaw:.2,scale:.9,face:'scared',aR:-1.3},T)},ov:(T,u)=>bigTxt('ESKI ALBOM',230,'#ffe14d',u,90),sfx:[[0,'whoosh']]}],
 [{noSplit:1,cam:[[[4.6,4.2,3.4],[4,3.6,-1],34],[[4.4,4.1,2.8],[4,3.6,-1],30]],env:DAY,draw:(T,u)=>{rm2(T,0,{day:1});C(kid,{x:4,z:-1,yaw:0,scale:.85,face:'scared',headYaw:.3*sin(T*2)},T)},ov:(T,u)=>subPill(T,u),sfx:[[0,'pop']]}],
 [{cam:[[[2.5,5,4.5],[1,4,-3],42],[[2.4,5,4],[1,4,-3],40]],env:DAY,draw:(T,u)=>{rm2(T,0,{day:1});C(LK.mom,{x:1,z:-3,yaw:.2,scale:.9,face:'calm'},T)},ov:(T,u)=>photoCard(T,u,{emoji:['👶','👶'],sepia:1,label:'2014'}),sfx:[[0,'click'],[.2,'whoosh']]}],
 [{noSplit:1,cam:[[[2,4.7,3],[1,4.2,-3],36],[[1.9,4.6,2.4],[1,4.2,-3],32]],env:(T)=>NBd(T,{lamp:'#ffd890',lampPos:[2,6,0]}),draw:(T,u)=>{rm2(T,0);C(LK.mom,{x:1,z:-3,yaw:.2,scale:.9,face:'talk'},T)},ov:(T,u)=>bigTxt('EGIZAK AKANG BOR EDI',230,'#ff2a2a',u,74),sfx:[[0,'stinger']]}],
 [{noSplit:1,cam:[[[WX+2.5,4.5,WZ+6],[WX+.4,4,WZ+1],40],[[WX+2,4.4,WZ+5],[WX+.4,4,WZ+1],34]],env:NBd,draw:(T,u)=>rm2(T,.15,{glow:1}),ov:(T,u)=>bigTxt('HECH QACHON TOPILMAGAN',230,'#ffffff',u,66),sfx:[[0,'drone']]}],
 [{noSplit:1,cam:[[[WX+8,6,WZ+13],[WX+.6,4,WZ],50],[[WX+7,5.6,WZ+11],[WX+.6,4,WZ],46]],env:RED,shake:.2,draw:(T,u)=>rm2(T,lerp(.2,1,ease(u)),{glow:1}),flash:(u)=>u>.6&&u<.64?.5:0,sfx:[[0,'door'],[.6,'stinger']]}],
 [{noSplit:1,cam:[[[WX+1.6,4,WZ+5.5],[WX+.6,3.3,WZ],38],[[WX+1.3,3.8,WZ+4.5],[WX+.6,3.3,WZ],32]],env:RED,draw:(T,u)=>rm2(T,1,{inside:()=>C({...twin,item:'notebook'},{x:WX+.6,z:WZ+.3,yaw:0,scale:.78,face:'glow',aR:-lerp(0,1.5,ease(u))},T)}),sfx:[[0,'whoosh'],[.5,'heart']]}],
 [{noSplit:1,cam:[[[WX+1,3.6,WZ+5.2],[WX+.6,3.3,WZ],36],[[WX+.9,3.5,WZ+4.5],[WX+.6,3.3,WZ],31]],env:RED,shake:.2,draw:(T,u)=>rm2(T,1,{inside:tw(T,'evil')}),ov:(T,u)=>paper(['ENDI NAVBAT','SENDA, UKA'],clamp(u*1.5,0,1),-.05,'#b01010'),sfx:[[0,'laugh'],[.3,'heart']]}],
 [{noSplit:1,cam:[[[3,6.5,9],[WX,4,WZ],52],[[2.5,6.2,8],[WX,4,WZ],48]],env:RED,draw:(T,u)=>{rm2(T,1,{inside:tw(T),glow:1});C(kid,{x:3,z:-2,yaw:PI+.4,scale:.85,face:'scared'},T)},ov:(T,u)=>abCard(T,u,'SHKAFNI YOPAMAN','OCHIQ QOLDIRAMAN'),sfx:[[0,'whoosh'],[.3,'pop'],[.55,'pop']]}],
 [{noSplit:1,cam:[[[2.5,6.2,8],[WX,4,WZ],48],[[2,6,7],[WX,4,WZ],44]],env:RED,draw:(T,u)=>{rm2(T,1,{inside:tw(T),glow:1})},ov:(T,u)=>endSub(T,u,'YANGI HIKOYA ERTAGA!'),sfx:[[0,'whoosh'],[.4,'pop']]}],
];
boot({horror:1,global:partBadge,subY:.72});build(TIMINGDATA,S,{tail:1.6});
