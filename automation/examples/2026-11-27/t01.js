const S=[
 aiShot(0,(T,u)=>{head('CLAUDE O‘ZINI',200,1,'#fff',70);head('O‘ZI TEZLASHTIRDI!',285,1,YE,62);emo('⚡',W2/2,470,150,1)},[[0,'hit'],[.2,'whoosh']]),
 aiShot(1,(T,u)=>{head('ANTHROPIC',170,u*1.5,CY,58);chip('🤖 Claude agentlari',W2/2,290,ramp(u,.1,.3),PU,420);arrow(W2/2,340,W2/2,400,ramp(u,.3,.5));chip('🔧 Messages API',W2/2,450,ramp(u,.45,.65),CY,420);head('QAYTA YOZILDI',570,ramp(u,.6,.9),YE,48)},[[0,'whoosh'],[.3,'pop'],[.6,'pop']]),
 aiShot(2,(T,u)=>{head('YANGI TIL:',190,u*1.5,'#fff',56);const s=ease(ramp(u,.1,.4));ctx.save();ctx.translate(W2/2,390);ctx.scale(s,s);pill(0,0,360,150,'#ce422b',40);txt('🦀 RUST',0,6,72,'#fff',0);ctx.restore()},[[0,'pop'],[.2,'ding']]),
 aiShot(3,(T,u)=>{head('PROTSESSOR SARFI',170,u*1.5,'#fff',50);const p=ease(ramp(u,.1,.7));const w=480;ctx.fillStyle='rgba(255,255,255,.15)';ctx.fillRect(W2/2-w/2,280,w,70);ctx.fillStyle='#ff5a6a';ctx.fillRect(W2/2-w/2,280,w*(1-.7*p),70);txt('ESKI: 100%',W2/2,250,30,'#fff',0);txt(`−${Math.round(70*p)}%`,W2/2,450,120,'#7aff9a',12);head('har bir so‘rovda (taxminan)',560,ramp(u,.5,.8),'#cfd8ff',32)},[[0,'whoosh'],[.7,'ding']]),
 aiShot(4,(T,u)=>{emo('🏠',W2/2,230,130,ramp(u,0,.2));emo('🤖',W2/2+120,300,80,ramp(u,.2,.4));emo('🔧',W2/2-130,300,70,ramp(u,.3,.5));head('AI O‘Z UYINI',400,ramp(u,.1,.4),'#fff',58);head('O‘ZI TA’MIRLAYAPTI',470,ramp(u,.3,.6),YE,52)},[[0,'pop'],[.3,'pop']]),
 aiShot(0,(T,u)=>{head('SIZ HAM KODNI',220,u*1.5,'#fff',58);head('AI’GA YOZDIRASIZMI?',300,ramp(u,.1,.4),CY,56);chip('💬 Izohda yozing',W2/2,450,ramp(u,.3,.5),PK,420)},[[0,'pop'],[.4,'pop']]),
 aiShot(4,(T,u)=>{const p=ramp(u,0,.3);ctx.save();ctx.translate(W2/2,250);ctx.scale(.7+.3*ease(p),.7+.3*ease(p));ctx.globalAlpha=p;pill(0,0,540,110,'#2aa3ef',55);txt('✈ HAR KUNI AI YANGILIK',0,4,38,'#fff',0);ctx.restore();chip('📤 Do‘stlarga ulashing',W2/2,420,ramp(u,.3,.6),PU,460)},[[0,'pop'],[.5,'ding']]),
];
boot({fovK:1,subY:.5});build(TIMINGDATA,S,{tail:1.4});
