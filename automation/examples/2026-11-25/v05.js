// NAVIGATOR — 2D horror (tungi yo'l, mozorga buriling)
const CR=(o,cam,x={})=>mk((t,u,m)=>sceneCar(t,typeof o=='function'?o(u,t):o),cam,x);
const MP=(o,cam,x={})=>mk((t,u,m)=>sceneMap(t,typeof o=='function'?o(u,t):o),cam,x);
const S=[
 CR({banner:'↰ 300 m'},[[1.3,470,760],[1.6,520,800]],{shake:.6,ov:(t,u)=>headline(['300 METRDAN','KEYIN CHAPGA'],u*2,170,86,['#fff','#3db4ff']),sfx:[[0,'hit'],[.2,'ding']]}),
 CR({graves:1,banner:'↰ 200 m'},[[1,360,640],[1.5,200,480]],{sfx:[[0,'drone']]}),
 mk((t,u,m)=>{sceneCar(t,{banner:'↰ 150 m'});HP(t,m,{x:170,y:1330,s:1.6,eye:'open',brow:.4,sweat:0,look:1})},[[1,360,640],[1.1,360,640]],{sfx:[[0,'engine']]}),
 MP({banner:'📵 TARMOQ YO‘Q',red:1},[[1,360,640],[1.1,360,600]],{ov:(t,u)=>chipPop('⛽ BENZIN: 8%',360,1000,ramp(u,.4,.6),'#ff3b4a','#fff',40),sfx:[[0,'tick'],[.5,'tick']]}),
 MP({banner:'↰ CHAPGA BURILING'},[[1,360,640],[1.2,360,560]],{sfx:[[0,'ding']]}),
 mk((t,u,m)=>{sceneCar(t,{banner:'↰ CHAPGA'});HP(t,m,{x:200,y:1330,s:1.7,eye:'open',brow:-.6,sweat:0,look:0})},[[1,360,640],[1.12,360,620]],{sfx:[[0,'engine']]}),
 MP(u=>({banner:'↰ CHAPGA',bend:ease(u)*1.6}),[[1,360,640],[1.3,360,600]],{shake:.5,sfx:[[0,'slide']]}),
 MP({banner:'↰ CHAPGA',bend:1.6,two:1},[[1.4,360,900],[2.2,360,1000]],{sfx:[[0,'stinger']]}),
 mk((t,u,m)=>{sceneCar(t,{banner:'JASUR...',red:1});HP(t,m,{x:200,y:1340,s:1.9,eye:'wide',brow:1.2,sweat:1,look:1})},[[1,360,640],[1.15,400,680]],{shake:.8,sfx:[[0,'whoosh'],[.4,'heart']]}),
 CR(u=>({banner:'JASUR...',red:1,mirror:ramp(u,.3,.6)}),[[1.8,360,220],[3,360,205]],{shake:1.2,flash:u=>u>.3&&u<.37?.5:0,sfx:[[.2,'silence'],[.35,'stinger'],[.45,'hit']]}),
 MP({banner:'✓ MANZILGA YETDINGIZ',red:1,bend:1.6,two:1},[[1,360,640],[1.3,360,560]],{shake:1,sfx:[[0,'ding'],[.3,'heart']]}),
 [mk((t,u)=>{sceneCar(t,{stop:1,banner:'✓',red:1,graves:1});ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(-300,-300,1320,1900)},C0,{ov:(t,u)=>{headline(['TO‘XTATARDINGMI?'],u*2,250,80,['#fff']);chipPop('💬 IZOHDA YOZ',360,400,ramp(u,.3,.5),'#fff','#111',40)},sfx:[[0,'pop']]}),
  mk((t,u)=>{sceneCar(t,{stop:1,banner:'✓',red:1,graves:1});ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(-300,-300,1320,1900)},C0,{at:.6,ov:(t,u)=>subscribeBtn(u,t),sfx:[[.3,'pop'],[.6,'ding']]})]
];
boot2d({subY:1060});build2d(TIMINGDATA,S,{tail:1.4,kw:["chapga","mozor","jizzaxdan","tarmoq","benzin","bukildi","ikkita","ismingni","ko'zguda","manzilga","izohda"]});
