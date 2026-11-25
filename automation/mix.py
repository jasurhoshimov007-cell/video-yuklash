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

# ---- 2026-11-25: musiqa kutubxonasi (hammasi original sintez, mualliflik muammosi yo'q). scripts.json da "music" maydoni bilan tanlanadi.
def mbox_music(D):  # horror: buzilgan musiqa qutisi + past drone
    n=t(D);x=np.sin(2*np.pi*55*KEY*n)*.06*(.6+.4*np.sin(2*np.pi*.05*n))
    mel=[659.3,587.3,523.3,493.9,440.0,493.9,523.3,392.0];beat=.42
    for k,ts in enumerate(np.arange(0.2,D-1,beat)):
        f=mel[k%len(mel)]*KEY*(1-.012*np.sin(k*.7));m=t(1.2);s=(np.sin(2*np.pi*f*m)+.35*np.sin(2*np.pi*3.01*f*m))*np.exp(-m*4)*.07
        if k%16>=12: s*=.3
        i=int(ts*SR);s=s[:len(x)-i];x[i:i+len(s)]+=s
    x+=lowp(noise(D),500)*.03;return x
def strings_music(D):  # horror: sekin o'sib boruvchi dissonans torlar
    n=t(D);x=np.zeros(len(n));base=110*KEY
    for f,a in [(1,.06),(1.189,.05),(1.414,.035*0+.04),(2.0,.03)]:
        x+=a*np.sin(2*np.pi*base*f*n+3*np.sin(2*np.pi*5.2*n)*.002*n)*(.3+.7*(n/D))
    for ts in np.arange(4,D-1,4.0):
        m=t(.6);s=np.sin(2*np.pi*(45+60*np.exp(-m*8))*m)*np.exp(-m*5)*.4;i=int(ts*SR);s=s[:len(x)-i];x[i:i+len(s)]+=s
    return x
def epic_music(D):  # jang: barabanlar + kuchli akkordlar
    beat=60/(BPM+10);n=len(t(D));x=np.zeros(n);prog=[[146.8,174.6,220.0],[116.5,146.8,174.6],[130.8,164.8,196.0],[110.0,130.8,164.8]]
    for b in range(int(D/beat)+1):
        i=int(b*beat*SR);m=t(.5)
        s=np.sin(2*np.pi*(55+70*np.exp(-m*25))*m)*np.exp(-m*7)*(.6 if b%4 in(0,2) else .35)
        if b%2: s=s+bp(noise(.5),200,2500)*np.exp(-m*14)*.25
        s=s[:n-i];x[i:i+len(s)]+=s
        if b%4==0:
            ch=[f*KEY for f in prog[(b//4)%4]];m=t(beat*4);s=sum(np.sign(np.sin(2*np.pi*f*m))*.3+np.sin(2*np.pi*f*2*m)*.4 for f in ch)*np.exp(-m*.5)*.035
            s=lowp(s,.3) if False else s;s=s[:n-i];x[i:i+len(s)]+=s
    return x
def tense_music(D):  # kimni tanlaysiz: tik-tak + o'sib boruvchi puls
    n=t(D);x=np.zeros(len(n));beat=60/BPM
    for k,ts in enumerate(np.arange(0,D-1,beat/2)):
        m=t(.04);s=bp(noise(.04),3000,8000)*np.exp(-m*120)*(.07 if k%2 else .05);i=int(ts*SR);s=s[:len(x)-i];x[i:i+len(s)]+=s
    x+=np.sin(2*np.pi*73.4*KEY*n)*.08*(n/D)**1.5*(.5+.5*np.sign(np.sin(2*np.pi*n/beat)))
    x+=np.sin(2*np.pi*293.7*KEY*n)*.02*(n/D)
    return x
def lofi_music(D):  # Claude suhbat: yumshoq lo-fi
    beat=60/(BPM-20);n=len(t(D));x=np.zeros(n);prog=[[261.6,329.6,392.0,493.9],[220.0,261.6,329.6,392.0],[174.6,220.0,261.6,329.6],[196.0,246.9,293.7,349.2]]
    for b in range(int(D/beat)+1):
        i=int(b*beat*SR);m=t(.4)
        s=np.sin(2*np.pi*(50+50*np.exp(-m*20))*m)*np.exp(-m*9)*.4 if b%2==0 else bp(noise(.4),1500,5000)*np.exp(-m*18)*.12
        s=s[:n-i];x[i:i+len(s)]+=s
        if b%4==0:
            ch=[f*KEY for f in prog[(b//4)%4]];m=t(beat*4);s=sum(np.sin(2*np.pi*f*m)+.15*np.sin(2*np.pi*2*f*m) for f in ch)*np.exp(-m*.6)*.03;s=s[:n-i];x[i:i+len(s)]+=s
    x+=bp(noise(len(x)/SR),2000,7000)[:len(x)]*.006;return x
MUSIC={'horror':horror_music,'musicbox':mbox_music,'strings':strings_music,'fun':fun_music,'epic':epic_music,'tense':tense_music,'lofi':lofi_music}

# ---- 2026-11-25: egasining Roblox horror namunalaridagi musiqa uslublari (original sintez, nusxa emas)
def ks(f,d,damp=.996,bright=.5):  # Karplus-Strong gitara/pizzicato tori
    n=int(d*SR);p=max(2,int(SR/f));buf=rng.uniform(-1,1,p)*bright;out=np.zeros(n)
    for i in range(n):
        out[i]=buf[i%p];buf[i%p]=damp*.5*(buf[i%p]+buf[(i+1)%p])
    return out
def _place(x,s,ts):
    i=int(ts*SR);s=s[:max(0,len(x)-i)];x[i:i+len(s)]+=s
def quirky_music(D):  # r1: o'ynoqi pizzicato + marimba, ~120 BPM, major
    x=np.zeros(int(D*SR));beat=60/120;sc=[261.6,293.7,329.6,392.0,440.0];pat=[0,2,4,2,3,1,0,4]
    for b in range(int(D/beat*2)):
        ts=b*beat/2;f=sc[pat[b%8]]*KEY*(1 if (b//16)%2==0 else 1.122)
        if b%2==0 or b%8==5: _place(x,ks(f,.35,.990,.6)*.22,ts)
        if b%4==0: m=t(.5);_place(x,np.sin(2*np.pi*f*2*m)*np.exp(-m*12)*.08,ts+beat/4)
        if b%4==0: _place(x,ks(f/4,.4,.985,.8)*.25,ts)
        m=t(.03);_place(x,bp(noise(.03),5000,10000)*np.exp(-m*150)*.03,ts)
    return x
def whistle_music(D):  # r2: hushtak melodiyasi + akustik gitara + kontrabas, ~105 BPM, minor/modal
    x=np.zeros(int(D*SR));beat=60/105;ch=[[220.0,261.6,329.6],[174.6,220.0,261.6],[196.0,246.9,293.7],[164.8,207.7,246.9]]
    mel=[659.3,587.3,523.3,587.3,659.3,0,523.3,493.9,440.0,0,493.9,523.3,493.9,440.0,415.3,0]
    for b in range(int(D/beat)):
        ts=b*beat;c=[f*KEY for f in ch[(b//4)%4]]
        for k,f in enumerate(c): _place(x,ks(f,beat*.9,.994,.5)*.07,ts+k*.012+(beat/2 if b%2 else 0)*0)
        if b%2==1:
            for k,f in enumerate(c): _place(x,ks(f,beat*.5,.99,.4)*.05,ts+beat/2+k*.01)
        _place(x,ks(c[0]/2,beat*.8,.992,.9)*.22,ts)
        m=t(.06);_place(x,bp(noise(.06),1500,6000)*np.exp(-m*60)*(.05 if b%2 else .02),ts)
        if (b//16)%2==1:
            f=mel[b%16]*KEY
            if f: m=t(beat*.95);vib=np.sin(2*np.pi*f*m+ .6*np.sin(2*np.pi*5.5*m));_place(x,(vib+.05*rng.standard_normal(len(m)))*env(len(m),.04,.2)*.05,ts)
    return x
def guitar_sad_music(D):  # r3: sekin fingerpicking akustik gitara, 3/4, ~72 BPM, minor
    x=np.zeros(int(D*SR));beat=60/72;ch=[[110.0,220.0,261.6,329.6],[87.3,174.6,220.0,261.6],[130.8,196.0,261.6,329.6],[98.0,196.0,246.9,293.7]]
    pat=[0,2,3,1,3,2]
    for bar in range(int(D/(beat*3))+1):
        c=[f*KEY for f in ch[bar%4]]
        for k in range(6):
            ts=bar*beat*3+k*beat/2;f=c[pat[k]];_place(x,ks(f,1.6,.997,.45)*(.16 if k==0 else .1),ts)
    m=t(D);x+=lowp(noise(D),900)[:len(x)]*.004;return x
MUSIC.update({'quirky':quirky_music,'whistle':whistle_music,'guitar':guitar_sad_music})
vid=sys.argv[1];import zlib;_h=zlib.crc32(vid.encode());KEY=[1.0,1.0595,0.9439,1.1225,0.8909][_h%5];BPM=[100,108,112,118,124][(_h//5)%5]
typ=json.load(open("scripts.json"))[vid]["type"];info=json.load(open(f"{vid}/info.json"));D=info["dur"]
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{vid}/voice.wav','-ar',str(SR),'-ac','1',f'{vid}/v44.wav'])
w=wave.open(f'{vid}/v44.wav');v=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float)/32768
N=int(D*SR);voice=np.zeros(N);voice[:min(N,len(v))]=v[:N]
_sc=json.load(open("scripts.json"))[vid];_mk=_sc.get("music") or ('horror' if typ=='horror' else 'fun')
if _mk not in MUSIC: _mk='horror' if typ=='horror' else 'fun'
print('musiqa:',_mk);mus=MUSIC[_mk](D);mus=np.pad(mus,(0,max(0,N-len(mus))))[:N]
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
# 2026-11-25 audit: musiqa ovozdan ~10 dB past edi -> ovoz paytida ~16 dB pasaytirish (silliq attack/release), musiqadan <110 Hz kesiladi (gurillash ovozni loyqalatmasin), ovozdan <80 Hz kesiladi.
mus=sosfilt(butter(4,110,'highpass',fs=SR,output='sos'),mus)
voice=sosfilt(butter(2,80,'highpass',fs=SR,output='sos'),voice)
venv=np.convolve(np.abs(voice),np.ones(4410)/4410,'same');act=np.clip(venv/0.02,0,1)
k=int(.25*SR);act=np.convolve(act,np.ones(k)/k,'same');act=np.clip(act*1.6,0,1)
vd=1-.84*act
mvol=.5 if typ=='horror' else .4
out=voice*1.0+mus*mvol*vd*duck+fx*.5
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
