import json,sys,wave,numpy as np,subprocess
SR=44100;rng=np.random.default_rng(7)
def t(d): return np.arange(int(d*SR))/SR
def env(n,a=.005,r=.2):
    e=np.ones(n);ia=max(1,int(a*SR));e[:ia]=np.linspace(0,1,ia);ir=min(n,int(r*SR));e[-ir:]*=np.linspace(1,0,ir)**2;return e
def lp(x,a): # one-pole lowpass, a in (0,1)
    from scipy.signal import lfilter
    return lfilter([a],[1,-(1-a)],x)
try:
    import scipy
except: subprocess.run([sys.executable,'-m','pip','install','-q','scipy']);import scipy
def bp(x,lo,hi):
    from scipy.signal import butter,sosfilt
    return sosfilt(butter(2,[lo,hi],btype='band',fs=SR,output='sos'),x)
def lowp(x,f):
    from scipy.signal import butter,sosfilt
    return sosfilt(butter(2,f,btype='low',fs=SR,output='sos'),x)
def noise(d): return rng.standard_normal(int(d*SR))
def sfx(ty):
    if ty=='hit':
        n=t(1.2);x=np.sin(2*np.pi*(55+60*np.exp(-n*8))*n)*np.exp(-n*3)*.9+lowp(noise(1.2),900)*np.exp(-n*10)*.5;return x
    if ty=='stinger':
        n=t(1.6);x=lowp(noise(1.6),3000)*np.exp(-n*2.2)*.5+sum(np.sin(2*np.pi*f*n) for f in[220,233,311,330])*np.exp(-n*1.8)*.15+np.sin(2*np.pi*(50+40*np.exp(-n*6))*n)*np.exp(-n*2)*.8;return x
    if ty=='whoosh':
        n=t(.6);x=bp(noise(.6),300,3000)*np.sin(np.pi*n/.6)**2*.35;return x
    if ty=='thud':
        n=t(.5);return np.sin(2*np.pi*(70*np.exp(-n*4))*n)*np.exp(-n*9)*.9+lowp(noise(.5),400)*np.exp(-n*14)*.4
    if ty=='ding':
        n=t(1.2);return (np.sin(2*np.pi*1318*n)+.5*np.sin(2*np.pi*2636*n))*np.exp(-n*3)*.25
    if ty=='slide':
        n=t(1.4);return bp(noise(1.4),200,1200)*np.sin(np.pi*n/1.4)*.25+np.sin(2*np.pi*90*n)*np.sin(np.pi*n/1.4)*.08
    if ty=='click':
        n=t(.06);return bp(noise(.06),1500,6000)*np.exp(-n*80)*.5
    if ty=='step':
        n=t(.25);return lowp(noise(.25),500)*np.exp(-n*25)*.7
    if ty=='knock':
        out=np.zeros(int(1.0*SR))
        for k in range(3):
            n=t(.15);s=np.sin(2*np.pi*120*n)*np.exp(-n*40)*.8+lowp(noise(.15),800)*np.exp(-n*50)*.5;i=int(k*.28*SR);out[i:i+len(s)]+=s
        return out
    if ty=='whistle':
        n=t(1.1);f=2300+120*np.sin(2*np.pi*28*n);ph=np.cumsum(f)/SR*2*np.pi;return np.sin(ph)*env(len(n),.03,.15)*.22+bp(noise(1.1),2000,3000)*.03
    if ty=='bell':
        n=t(2.0);out=np.zeros(len(n))
        for k in range(10):
            m=t(.2);s=(np.sin(2*np.pi*1800*m)+np.sin(2*np.pi*2700*m))*np.exp(-m*12)*.18;i=int(k*.08*SR);
            if i+len(s)<=len(out): out[i:i+len(s)]+=s
        return out
    if ty=='heart':
        out=np.zeros(int(1.0*SR))
        for dt in[0,.25]:
            n=t(.2);s=np.sin(2*np.pi*55*n)*np.exp(-n*25)*.9;i=int(dt*SR);out[i:i+len(s)]+=s
        return out
    if ty=='pop':
        n=t(.15);return np.sin(2*np.pi*(400+900*np.exp(-n*40))*n)*np.exp(-n*30)*.35
    if ty=='tada':
        n=t(1.4);return sum(np.sin(2*np.pi*f*n)*np.exp(-n*2.5) for f in [523,659,784,1046])*.12*env(len(n),.01,.5)
    if ty=='laugh':
        out=np.zeros(int(1.2*SR))
        for k in range(6):
            n=t(.13);s=bp(noise(.13),400,2500)*np.sin(np.pi*n/.13)*.25*(1-k*.1);i=int(k*.17*SR);out[i:i+len(s)]+=s
        return out
    if ty=='door':
        n=t(1.2);f=300+150*np.sin(2*np.pi*1.3*n);ph=np.cumsum(f)/SR*2*np.pi;return np.sign(np.sin(ph))*bp(noise(1.2),500,3000)*.08*np.sin(np.pi*n/1.2)
    if ty=='drone':
        n=t(3);return (np.sin(2*np.pi*41*n)+.6*np.sin(2*np.pi*61.7*n))*np.sin(np.pi*n/3)*.25
    if ty=='engine':
        n=t(3);return lowp(noise(3),150)*.6*np.sin(np.pi*n/3)+np.sin(2*np.pi*45*n)*.08
    if ty=='crash':
        n=t(1.5);return lowp(noise(1.5),2500)*np.exp(-n*3)*.7+np.sin(2*np.pi*60*n)*np.exp(-n*4)*.6
    if ty=='roar':
        n=t(1.5);return lowp(noise(1.5)*(1+.5*np.sin(2*np.pi*30*n)),500)*np.sin(np.pi*n/1.5)*.8
    if ty=='cheer':
        n=t(1.5);return bp(noise(1.5),500,4000)*np.sin(np.pi*n/1.5)*.2
    if ty=='tick':
        n=t(.08);return bp(noise(.08),2000,5000)*np.exp(-n*60)*.4+np.sin(2*np.pi*1000*n)*np.exp(-n*60)*.2
    return np.zeros(10)
KEY=1.0;BPM=104
def horror_music(D):
    n=t(D);r=55*KEY;x=(np.sin(2*np.pi*r*n)+.7*np.sin(2*np.pi*r*1.498*n+np.sin(2*np.pi*.1*n))+.4*np.sin(2*np.pi*r*2.01*n))*(.6+.4*np.sin(2*np.pi*.07*n))*.12
    # 2026-11-25: sekin soat tik-taki (60 bpm) + kuchayib boruvchi past puls (taranglik oshadi)
    for k,ts in enumerate(np.arange(0.3,D-1,1.0)):
        m=t(.05);s=bp(noise(.05),2500,6000)*np.exp(-m*90)*(.05 if k%2 else .035);i=int(ts*SR);s=s[:len(x)-i];x[i:i+len(s)]+=s
    x+=np.sin(2*np.pi*r*.5*n)*(n/D)**2*.10
    x+=lowp(noise(D),300)*.05
    notes=[f*KEY for f in [220,261.6,329.6,246.9,220,196,174.6,164.8]]
    for k,ts in enumerate(np.arange(0.5,D-1,2.2)):
        f=notes[k%len(notes)];m=t(2.5);s=(np.sin(2*np.pi*f*m)+.3*np.sin(2*np.pi*2*f*m)+.1*np.sin(2*np.pi*3*f*m))*np.exp(-m*1.6)*.09
        i=int(ts*SR);s=s[:len(x)-i];x[i:i+len(s)]+=s
    return x
def fun_music(D):
    bpm=BPM;beat=60/bpm;n=len(t(D));x=np.zeros(n)
    prog=[[f*KEY for f in c] for c in [[261.6,329.6,392.0],[196.0,246.9,293.7],[220.0,261.6,329.6],[174.6,220.0,261.6]]]
    bass=[f*KEY for f in [65.4,49.0,55.0,43.7]]
    nb=int(D/beat)+1
    for b in range(nb):
        ts=b*beat;i=int(ts*SR);ch=prog[(b//4)%4];bs=bass[(b//4)%4]
        # kick on 1,3 ; clap on 2,4
        m=t(.3)
        if b%2==0: s=np.sin(2*np.pi*(50+90*np.exp(-m*30))*m)*np.exp(-m*12)*.55
        else: s=bp(noise(.3),900,4000)*np.exp(-m*22)*.18
        s=s[:n-i];x[i:i+len(s)]+=s
        # hats on 8ths
        for h in[0,.5]:
            j=int((ts+h*beat)*SR);m2=t(.05);s2=bp(noise(.05),6000,12000)*np.exp(-m2*90)*.07;s2=s2[:max(0,n-j)];x[j:j+len(s2)]+=s2
        # bass
        m=t(beat*.9);s=(np.sin(2*np.pi*bs*m)+.3*np.sin(2*np.pi*2*bs*m))*env(len(m),.01,.1)*.22;s=s[:n-i];x[i:i+len(s)]+=s
        # pluck arpeggio 8ths
        for k,h in enumerate([0,.5]):
            j=int((ts+h*beat)*SR);f=ch[(b*2+k)%3]*2;m=t(.35);s=(np.sin(2*np.pi*f*m)+.25*np.sin(2*np.pi*2*f*m))*np.exp(-m*9)*.09;s=s[:max(0,n-j)];x[j:j+len(s)]+=s
        # pad
        m=t(beat);s=sum(np.sin(2*np.pi*f*m)+.2*np.sin(2*np.pi*f*1.003*m) for f in ch)*.025;s=s[:n-i];x[i:i+len(s)]+=s
    return x
vid=sys.argv[1];import zlib;_h=zlib.crc32(vid.encode());KEY=[1.0,1.0595,0.9439,1.1225,0.8909][_h%5];BPM=[100,108,112,118,124][(_h//5)%5]
typ=json.load(open("scripts.json"))[vid]["type"];info=json.load(open(f"{vid}/info.json"));D=info["dur"]
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{vid}/voice.wav','-ar',str(SR),'-ac','1',f'{vid}/v44.wav'])
w=wave.open(f'{vid}/v44.wav');v=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float)/32768
N=int(D*SR);voice=np.zeros(N);voice[:min(N,len(v))]=v[:N]
mus=horror_music(D) if typ=='horror' else fun_music(D);mus=mus[:N]
# silences for 'silence' events: duck music
duck=np.ones(N)
fx=np.zeros(N)
for e in info['sfx']:
    if e['type']=='silence':
        i=int(e['t']*SR);duck[max(0,i-int(.4*SR)):i]=np.linspace(1,.1,min(i,int(.4*SR)));continue
    s=sfx(e['type'])*e.get('v',1);i=int(max(0,e['t'])*SR);s=s[:max(0,N-i)];fx[i:i+len(s)]+=s
rs=int(2.5*SR)
if N>rs*2:
    m=t(2.5);fx[N-rs-int(1.5*SR):N-int(1.5*SR)]+=bp(noise(2.5),800,5000)*(m/2.5)**2*.25
# duck music under voice slightly
from scipy.signal import butter,sosfilt
venv=np.convolve(np.abs(voice),np.ones(4410)/4410,'same');vd=1-.35*np.clip(venv/0.05,0,1)
mvol=.55 if typ=='horror' else .42
out=voice*1.0+mus*mvol*vd*duck+fx*.55
# fade end
fe=int(.6*SR);out[-fe:]*=np.linspace(1,0,fe)
out=np.clip(out,-1,1)
with wave.open(f'{vid}/mix.wav','wb') as w:
    w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((out*32767).astype(np.int16).tobytes())
r=subprocess.run(['ffmpeg','-hide_banner','-i',f'{vid}/mix.wav','-af','loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True).stderr
m=json.loads(r[r.rindex('{'):r.rindex('}')+1])
af=f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=44100"
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{vid}/mix.wav','-af',af,'-ac','2','-c:a','aac','-b:a','160k',f'{vid}/mix.m4a'])
print(vid,'mix ok',D)
