const M={
 mul:(a,b)=>{const o=new Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)o[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];return o},
 T:(x,y,z)=>[1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1],
 S:(x,y,z)=>[x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1],
 RX:a=>{const c=Math.cos(a),s=Math.sin(a);return[1,0,0,0,0,c,s,0,0,-s,c,0,0,0,0,1]},
 RY:a=>{const c=Math.cos(a),s=Math.sin(a);return[c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1]},
 RZ:a=>{const c=Math.cos(a),s=Math.sin(a);return[c,s,0,0,-s,c,0,0,0,0,1,0,0,0,0,1]},
 persp:(f,asp,n,fa)=>{const t=1/Math.tan(f/2);return[t/asp,0,0,0,0,t,0,0,0,0,(fa+n)/(n-fa),-1,0,0,2*fa*n/(n-fa),0]},
 look:(e,c,roll=0)=>{let z=[e[0]-c[0],e[1]-c[1],e[2]-c[2]];let l=Math.hypot(...z);z=z.map(v=>v/l);let x=[z[2],0,-z[0]];l=Math.hypot(...x)||1;x=x.map(v=>v/l);const y=[z[1]*x[2]-z[2]*x[1],z[2]*x[0]-z[0]*x[2],z[0]*x[1]-z[1]*x[0]];
  const v=[x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-(x[0]*e[0]+x[1]*e[1]+x[2]*e[2]),-(y[0]*e[0]+y[1]*e[1]+y[2]*e[2]),-(z[0]*e[0]+z[1]*e[1]+z[2]*e[2]),1];return M.mul(M.RZ(roll),v)}};
const chain=(...ms)=>ms.reduce((a,b)=>M.mul(a,b));
const _hc={};function hex(h){if(_hc[h])return _hc[h];if(h.length==4){const k=h;h='#'+h[1]+h[1]+h[2]+h[2]+h[3]+h[3];return _hc[k]=hex(h)}const n=parseInt(h.slice(1),16);return _hc[h]=[(n>>16)/255,(n>>8&255)/255,(n&255)/255]}
function initGL(cv){
 const gl=cv.getContext('webgl',{preserveDrawingBuffer:true,antialias:true});
 const vs=`attribute vec3 p;attribute vec3 n;uniform mat4 uM,uVP;varying vec3 vN,vW;void main(){vec4 w=uM*vec4(p,1.);vW=w.xyz;vN=mat3(uM)*n;gl_Position=uVP*w;}`;
 const fs=`precision mediump float;varying vec3 vN,vW;uniform vec3 uC,uL,uAmb,uSun,uFog,uEye,uPL,uPC;uniform float uFogD,uEm;
 void main(){vec3 n=normalize(vN);float d=max(dot(n,normalize(uL)),0.);vec3 pl=uPL-vW;float pd=length(pl);float pp=max(dot(n,pl/pd),0.)/(1.+.06*pd*pd);
  float rim=pow(1.-abs(dot(n,normalize(uEye-vW))),3.)*.25;
  vec3 c=uC*(uAmb+uSun*d+uPC*pp*2.2+rim*uSun)+uC*uEm;float f=1.-exp(-uFogD*length(vW-uEye));gl_FragColor=vec4(mix(c,uFog,clamp(f,0.,1.)),1.);}`;
 const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw gl.getShaderInfoLog(o);return o};
 const pg=gl.createProgram();gl.attachShader(pg,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pg,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pg);gl.useProgram(pg);
 const F=[[0,0,1],[0,0,-1],[1,0,0],[-1,0,0],[0,1,0],[0,-1,0]],v=[];
 F.forEach(n=>{const u=[n[1],n[2],n[0]],w=[n[1]*u[2]-n[2]*u[1],n[2]*u[0]-n[0]*u[2],n[0]*u[1]-n[1]*u[0]];
  [[-1,-1],[1,-1],[1,1],[-1,-1],[1,1],[-1,1]].forEach(([a,b])=>{for(let i=0;i<3;i++)v.push(.5*(n[i]+a*u[i]+b*w[i]));v.push(...n)})});
 gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(v),gl.STATIC_DRAW);
 const ap=gl.getAttribLocation(pg,'p'),an=gl.getAttribLocation(pg,'n');gl.enableVertexAttribArray(ap);gl.enableVertexAttribArray(an);
 gl.vertexAttribPointer(ap,3,gl.FLOAT,false,24,0);gl.vertexAttribPointer(an,3,gl.FLOAT,false,24,12);gl.enable(gl.DEPTH_TEST);
 const U={};['uM','uVP','uL','uAmb','uSun','uFog','uFogD','uEye','uPL','uPC','uC','uEm'].forEach(n=>U[n]=gl.getUniformLocation(pg,n));
 return{gl,
  begin(env,cam){gl.viewport(0,0,cv.width,cv.height);const f=hex(env.fog);gl.clearColor(f[0],f[1],f[2],1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
   const vp=M.mul(M.persp((cam.fov||50)*Math.PI/180,cv.width/cv.height,.1,300),M.look(cam.eye,cam.at,cam.roll||0));
   gl.uniformMatrix4fv(U.uVP,false,vp);this.vp=vp;gl.uniform3fv(U.uL,env.sunDir||[.4,1,.6]);gl.uniform3fv(U.uAmb,hex(env.amb));gl.uniform3fv(U.uSun,hex(env.sun));
   gl.uniform3fv(U.uFog,f);gl.uniform1f(U.uFogD,env.fogD||.02);gl.uniform3fv(U.uEye,cam.eye);gl.uniform3fv(U.uPL,env.lampPos||[0,-99,0]);gl.uniform3fv(U.uPC,hex(env.lamp||'#000000'))},
  proj(p){const v=this.vp;const x=v[0]*p[0]+v[4]*p[1]+v[8]*p[2]+v[12],y=v[1]*p[0]+v[5]*p[1]+v[9]*p[2]+v[13],w=v[3]*p[0]+v[7]*p[1]+v[11]*p[2]+v[15];return[(x/w*.5+.5)*cv.width,(.5-y/w*.5)*cv.height,w]},
  box(m,col,em=0){gl.uniformMatrix4fv(U.uM,false,m);gl.uniform3fv(U.uC,hex(col));gl.uniform1f(U.uEm,em);gl.drawArrays(gl.TRIANGLES,0,36)}}}
