const S=SPEC.shots.map((s,i)=>aiShot(i,(T,u)=>{head(s[0],165,u*1.5,i%2?'#fff':YE,s[0].length>12?50:62);if(s[3])head(s[3],225,ramp(u,.3,.6),'#cfe3ff',28);emo(s[1],W2/2,345,120,ramp(u,.05,.3));
 s[2].forEach((c,j)=>{const y=455+j*70;chip(c,W2/2,y,ramp(u,.2+j*.12,.4+j*.12),[CY,PU,PK,CY][(i+j)%4],Math.min(560,60+c.length*22))})},[[0,i?'pop':'hit'],[.35,'ding']]));
boot({fovK:1,subY:.5});build(TIMINGDATA,S,{tail:1.2});
