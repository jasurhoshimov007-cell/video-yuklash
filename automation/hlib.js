// horror yordamchilar
const HP=(t,m,x={})=>drawHost(Object.assign({x:360,y:1330,s:2.2,upper:1,t,mouth:m,eye:'wide',brow:1,sweat:1,aL:[.25,.1],aR:[.35,-.2],look:.5},x));
const C0=[[1,360,640],[1.08,360,620]],CZ=[[1,360,640],[1.35,360,560]],CP=[[1.5,360,560],[1.1,360,640]];
function mk(sceneFn,cam,o={}){return Object.assign({cam:cam||C0,scene:sceneFn,sfx:o.sfx||[]},o)}
function endShots(bg){return [
 {cam:[[1,360,640],[1,360,640]],scene:bg,ov:(t,u)=>endCard(t,u),sfx:[[0,'whoosh'],[.5,'ding']]},
 {cam:[[1,360,640],[1,360,640]],scene:bg,ov:(t,u)=>{endCard(t,.99);subscribeBtn(u,t)},sfx:[[.2,'pop'],[.8,'ding']]}]}
