// node render.js vid [mode] ; mode: full | sheet
const {chromium}=require('playwright');const fs=require('fs');const {spawn}=require('child_process');
(async()=>{const vid=process.argv[2],mode=process.argv[3]||'full';
 const b=await chromium.launch({args:['--allow-file-access-from-files','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const pg=await b.newPage({viewport:{width:720,height:1280},deviceScaleFactor:1});
 pg.on('console',m=>console.log('PAGE',m.text()));pg.on('pageerror',e=>console.log('ERR',e.message));
 await pg.goto('file://'+__dirname+'/page.html');
 await pg.evaluate(async()=>{await document.fonts.load('900 40px Inter');await document.fonts.load('40px "Noto Color Emoji"')});
 const timing=JSON.parse(fs.readFileSync(`${vid}/timing.json`));
 const envA=fs.existsSync(`${vid}/env.json`)?fs.readFileSync(`${vid}/env.json`,'utf8'):'[]';await pg.waitForFunction(()=>document.getElementById('host')?document.getElementById('host').complete:true);await pg.addScriptTag({content:`TIMINGDATA=${JSON.stringify(timing)};ENVA=${envA};SPEC=${(fs.existsSync(`${vid}/spec.json`)?fs.readFileSync(`${vid}/spec.json`,'utf8'):'null')};`+fs.readFileSync(`${vid}.js`,'utf8')});
 const info=await pg.evaluate(()=>({dur:DUR,shots:SHOTS.map(s=>[s.t0,s.t1,s.line]),sfx:SFX}));
 fs.writeFileSync(`${vid}/info.json`,JSON.stringify(info));
 if(mode=='sheet'){ // one frame per shot middle
  fs.mkdirSync(`${vid}/sheet`,{recursive:true});let i=0;
  for(const [a,b2] of info.shots){for(const f of [.15,.85]){const t=a+(b2-a)*f;const d=await pg.evaluate(t=>renderFrame(t),t);fs.writeFileSync(`${vid}/sheet/s${String(i).padStart(3,'0')}.jpg`,Buffer.from(d.split(',')[1],'base64'));i++}}
  await b.close();return}
 const fps=30,N=Math.round(info.dur*fps);
 const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-vf','scale=1080:1920:flags=lanczos','-c:v','libx264','-preset','medium','-b:v','6500k','-maxrate','7000k','-bufsize','12000k','-pix_fmt','yuv420p',`${vid}/video.mp4`]);
 const t0=Date.now();
 for(let f=0;f<N;f++){const d=await pg.evaluate(t=>renderFrame(t),f/fps);const buf=Buffer.from(d.split(',')[1],'base64');if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));
  if(f%150==0)console.log(vid,f,'/',N,((Date.now()-t0)/1000).toFixed(0)+'s')}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log(vid,'done',((Date.now()-t0)/1000).toFixed(0)+'s')})();
