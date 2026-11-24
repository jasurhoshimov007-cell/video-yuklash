// CHODIR — 2D horror (kemping, tog', gulxan va chodir devoridagi soya). Boshqa mavzu/joy/uslub namunasi.
const HN=(t,m,x={})=>Object.assign({x:250,y:1330,s:1.7,upper:1,t,mouth:m,eye:'wide',brow:1,aL:[.3,.1],aR:[.5,-.3]},x);
const FR=(t,x,y,pal,m=0,s=.5)=>drawHost({x,y,s,t,pal,mouth:m,mshape:'neutral',eye:'open'});
const P2={hood:'#2e8a5a',hoodL:'#4aaa7a'},P3={hood:'#d6a02e',hoodL:'#f0c24a'},P4={hood:'#a04a8a',hoodL:'#c06aaa'};
const S=[
 {cam:[[1,360,640],[1.1,330,600]],shake:.5,scene:(t,u,m)=>{sceneTentIn(t,{shadow:.35+.2*u});drawHost(HN(t,m,{look:1}))},ov:(T,u)=>headline(['DEVORDA','SOYA!'],u*2,200,110,['#fff','#ff3b3b']),sfx:[[0,'hit'],[.2,'heart']]},
 {cam:[[1,360,640],[1.12,360,700]],scene:(t,u,m)=>{sceneCamp(t,{lit:1,t2:1});FR(t,200,1130,P2,0,.8);FR(t,520,1140,P3,0,.8);drawHost({x:300,y:1150,s:.8,t,mouth:m,eye:'open',mshape:'smile',aL:[.2,.1],aR:[.2,.1]})},sfx:[[0,'whoosh']]},
 {cam:[[1.2,300,900],[1.5,260,1000]],scene:(t,u,m)=>{sceneTentIn(t,{});drawHost(HN(t,m,{y:1380,s:1.8,eye:'open',brow:.3,look:-1}))},ov:(T,u)=>{ctx.fillStyle='rgba(150,180,255,.9)';['Z','z','Z'].forEach((z,i)=>{const ph=(T*.7+i/3)%1;ctx.globalAlpha=1-ph;txt(z,560+ph*50,900-ph*160,50+i*14,'#cfe0ff',6)});ctx.globalAlpha=1},sfx:[[0,'drone']]},
 {cam:[[1,360,700],[1.1,300,760]],scene:(t,u,m)=>{sceneCamp(t,{lit:.4,fireK:1-.5*u,t2:1});drawHost({x:300,y:1150,s:.8,t,mouth:m,eye:'open',mshape:'neutral',aL:[.2,.1],aR:[.2,.1]})},sfx:[[0,'tick']]},
 {cam:[[1.1,300,760],[1.6,200,800]],shake:1,scene:(t,u,m)=>{sceneCamp(t,{lit:1,shadow:ramp(u,.2,.9),fireK:.5,t2:1})},ov:(T,u)=>{ctx.fillStyle=`rgba(255,20,20,${.08+.06*Math.sin(T*10)})`;ctx.fillRect(0,0,W2,H2)},sfx:[[0,'stinger'],[.4,'heart']]},
 {cam:[[1.8,300,1000],[2.4,280,980]],shake:1.4,scene:(t,u,m)=>{sceneTentIn(t,{shadow:1});drawHost(HN(t,m,{x:240,y:1400,s:2.2,eye:'wide',brow:1.4,sweat:1,look:1}))},sfx:[[0,'heart'],[.5,'heart']]},
 {cam:[[1,360,640],[1.1,360,700]],scene:(t,u,m)=>{sceneTentIn(t,{});drawHost(HN(t,m,{x:200,y:1350,s:1.5,aR:[2.2,2.0]}));drawHost({x:520,y:1350,s:1.5,upper:1,t,pal:P2,eye:'open',mouth:0,mshape:'neutral'})},sfx:[[0,'whoosh']]},
 {cam:[[1,360,640],[1.1,360,640]],scene:(t,u,m)=>{sceneTentIn(t,{});drawHost(HN(t,m,{x:180,y:1350,s:1.4,look:.6}));drawHost({x:420,y:1350,s:1.4,upper:1,t,pal:P2,eye:'open',mouth:0,look:.6,mshape:'neutral'});drawHost({x:640,y:1350,s:1.4,upper:1,t,pal:P3,eye:'open',mouth:0,look:.6,mshape:'neutral'})},sfx:[[0,'tick']]},
 {cam:[[1,360,640],[1.05,360,640]],scene:(t,u,m)=>{sceneTentIn(t,{});drawHost(HN(t,m,{x:140,y:1350,s:1.25}));drawHost({x:360,y:1350,s:1.25,upper:1,t,pal:P2,eye:'wide',mouth:0,brow:1});drawHost({x:580,y:1350,s:1.25,upper:1,t,pal:P3,eye:'wide',mouth:0,brow:1})},ov:(T,u)=>{const a=ease(ramp(u,.2,.5));ctx.save();ctx.globalAlpha=a;txt('3',360,260,200,'#ffe14d',26);txt('?',650,380,120,'#ff3b3b',20);ctx.restore()},sfx:[[0,'pop'],[.5,'stinger']]},
 {cam:[[1,360,640],[1.4,560,860]],scene:(t,u)=>{sceneCamp(t,{lit:.5,t2:1,t2glow:1,fireK:.4})},sfx:[[0,'drone']]},
 {cam:[[1.8,580,900],[2.6,580,930]],shake:1.2,scene:(t,u)=>{sceneCamp(t,{lit:.3,t2:1,t2glow:1,fireK:.3})},ov:(T,u)=>{ctx.save();ctx.translate(580,820);ctx.rotate(Math.sin(T*30)*.02);ctx.restore()},sfx:[[0,'heart'],[.5,'heart']]},
 {cam:[[2.2,580,930],[2.8,580,940]],shake:1.4,scene:(t,u)=>{sceneCamp(t,{lit:.2,t2:1,t2glow:1,fireK:.2})},ov:(T,u)=>{const a=ease(ramp(u,.3,.7));ctx.save();ctx.globalAlpha=a;txt('psss...',360,300,90,'#9affc0',16);ctx.restore()},sfx:[[0,'whoosh'],[.3,'drone']]},
 {cam:[[1.3,580,900],[2.2,580,930]],scene:(t,u)=>{sceneCamp(t,{day:1,t2:1,zipOpen:ramp(u,.3,.9),lit:0,fireK:.15})},ov:(T,u)=>{ctx.fillStyle=`rgba(0,0,0,${ramp(u,.6,1)})`;ctx.fillRect(0,0,W2,H2);const a=ease(ramp(u,.5,.9));ctx.save();ctx.globalAlpha=a;txt('?',360,560,320,'#ff3b3b',30);ctx.restore()},sfx:[[0,'whoosh'],[.5,'stinger']]},
 {cam:[[1,360,640],[1,360,640]],scene:()=>{ctx.fillStyle='#03040a';ctx.fillRect(-300,-300,1320,1900)},ov:(T,u)=>endCard(T,u),sfx:[[0,'whoosh']]},
 {cam:[[1,360,640],[1,360,640]],scene:()=>{ctx.fillStyle='#03040a';ctx.fillRect(-300,-300,1320,1900)},ov:(T,u)=>{endCard(T,.99);subscribeBtn(u,T)},sfx:[[.2,'pop'],[.8,'ding']]}
];
boot2d({subY:880});build2d(TIMINGDATA,S,{tail:1.4,kw:["soya","uchta","davomi","telegram","yopiq","obuna"]});
