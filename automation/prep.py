# voice processing: shorten pauses, compute line/word timings
import json,sys,wave,numpy as np,re
d=json.load(open('scripts.json'))
def load(p):
    w=wave.open(p);x=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768;return x,w.getframerate()
def gaps_of(x,sr,thr=0.02,minlen=0.12):
    fr=int(sr*0.01);n=len(x)//fr
    e=np.sqrt((x[:n*fr].reshape(n,fr)**2).mean(1))
    sil=e<thr;G=[];i=0
    while i<n:
        if sil[i]:
            j=i
            while j<n and sil[j]: j+=1
            if (j-i)/100>=minlen or i==0 or j==n: G.append([i/100,j/100])
            i=j
        else: i+=1
    return G
for vid in sys.argv[1:]:
    x,sr=load(f'{vid}/raw.wav')
    start_trim=float(open(f'{vid}/trim.txt').read()) if __import__('os').path.exists(f'{vid}/trim.txt') else 0
    x=x[int(start_trim*sr):]
    G=gaps_of(x,sr)
    out=[];pos=0;orig=[];cur=0
    for a,b in G:
        A,B=int(a*sr),int(b*sr)
        out.append(x[pos:A]);cur+=A-pos
        L=b-a
        if a==0: keep=0.08
        elif B>=len(x)-sr*0.011: keep=0.3
        else: keep=min(L,0.45)
        k=int(keep*sr)
        seg=x[A:B]
        nseg=np.concatenate([seg[:k//2],seg[len(seg)-(k-k//2):]]) if len(seg)>k else seg
        orig.append(((cur+len(nseg)/2)/sr,L));out.append(nseg);cur+=len(nseg)
        pos=B
    out.append(x[pos:]);y=np.concatenate(out)
    # fade edges
    y[:200]*=np.linspace(0,1,200)
    with wave.open(f'{vid}/voice.wav','wb') as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((np.clip(y,-1,1)*32767).astype(np.int16).tobytes())
    dur=len(y)/sr
    G=[g for g in gaps_of(y,sr,minlen=0.1)]
    speech_start=G[0][1] if G and G[0][0]==0 else 0
    speech_end=G[-1][0] if G and G[-1][1]>=dur-0.02 else dur
    inner=[g for g in G if g[0]>speech_start+0.01 and g[1]<speech_end-0.01]
    lines=d[vid]['lines']
    words=[l.split() for l in lines]
    ch=[sum(len(w)+1 for w in ws) for ws in words];tot=sum(ch)
    # speech-time coordinate
    def st(t):  # real time -> speech time
        s=t-speech_start
        for a,b in inner:
            if b<=t: s-=(b-a)
            elif a<t: s-=(t-a)
        return s
    S=st(speech_end)
    cum=np.cumsum(ch)[:-1]/tot*S
    nb=len(lines)-1;ng=len(inner)
    gpos=[st(a) for a,b in inner]
    def olen(a,b):
        m=(a+b)/2;c=min(orig,key=lambda o:abs(o[0]-m));return c[1] if abs(c[0]-m)<.3 else b-a
    glen=[olen(a,b) for a,b in inner]
    INF=1e9
    # DP: boundary k -> gap j, increasing
    cost=[[INF]*ng for _ in range(nb)];back=[[-1]*ng for _ in range(nb)]
    def c(k,j): return (gpos[j]-cum[k])**2 - 6*min(glen[j],1.0)
    for j in range(ng): cost[0][j]=c(0,j)
    for k in range(1,nb):
        best=INF;bj=-1
        for j in range(ng):
            if j>0 and cost[k-1][j-1]<best: best=cost[k-1][j-1];bj=j-1
            if bj>=0: cost[k][j]=best+c(k,j);back[k][j]=bj
    j=int(np.argmin(cost[nb-1]));assign=[0]*nb
    for k in range(nb-1,-1,-1): assign[k]=j;j=back[k][j]
    bounds=[(speech_start,None)]
    L=[]
    starts=[speech_start]+[inner[j][1] for j in assign]
    ends=[inner[j][0] for j in assign]+[speech_end]
    for i,ws in enumerate(words):
        t0,t1=starts[i],ends[i]
        # word timing proportional within line using speech-time (skip inner gaps)
        wl=np.array([len(w)+1.5 for w in ws],float);cw=np.concatenate([[0],np.cumsum(wl)])/wl.sum()
        s0,s1=st(t0),st(t1)
        def inv(s):
            # speech time -> real
            t=speech_start+s
            for a,b in inner:
                if a<t: t+=(b-a)
            return t
        # inv approx: iterate
        def inv2(s):
            lo,hi=t0,t1
            for _ in range(40):
                m=(lo+hi)/2
                if st(m)<s: lo=m
                else: hi=m
            return lo
        W=[{"w":w,"t0":round(inv2(s0+(s1-s0)*cw[k]),3),"t1":round(inv2(s0+(s1-s0)*cw[k+1]),3)} for k,w in enumerate(ws)]
        L.append({"text":lines[i],"t0":round(t0,3),"t1":round(t1,3),"words":W})
    json.dump({"dur":round(dur,3),"lines":L},open(f'{vid}/timing.json','w'),ensure_ascii=False,indent=0)
    print(vid,"dur",round(dur,2),"gaps",ng,"lines",len(lines))
    for l in L: print(f"  {l['t0']:6.2f}-{l['t1']:6.2f} {l['text']}")
import os,subprocess
for vid in sys.argv[1:]:
    if not os.path.exists(f'{vid}/tempo.txt'): continue
    k=float(open(f'{vid}/tempo.txt').read())
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{vid}/voice.wav','-af',f'atempo={k}',f'{vid}/v2.wav']);os.replace(f'{vid}/v2.wav',f'{vid}/voice.wav')
    t=json.load(open(f'{vid}/timing.json'));t['dur']=round(t['dur']/k,3)
    for l in t['lines']:
        l['t0']=round(l['t0']/k,3);l['t1']=round(l['t1']/k,3)
        for w in l['words']: w['t0']=round(w['t0']/k,3);w['t1']=round(w['t1']/k,3)
    json.dump(t,open(f'{vid}/timing.json','w'),ensure_ascii=False);print(vid,'tempo',k,t['dur'])
