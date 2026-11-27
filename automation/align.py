# 2026-11-27: gap-asosidagi qayta tekislash (subtitr sinxroni): nutq bo'laklarini gaplarga DP bilan taqsimlaydi
import json,sys,wave,numpy as np
import json,sys,wave,numpy as np
import os,sys;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from fixtiming import redo
def segs(v,thr=.018,mg=.2):
    w=wave.open(f'{v}/voice.wav');sr=w.getframerate();x=np.frombuffer(w.readframes(w.getnframes()),np.int16)/32768
    fr=int(sr*.01);n=len(x)//fr;e=np.sqrt((x[:n*fr].reshape(n,fr)**2).mean(1));on=e>thr
    S=[];i=0
    while i<n:
        if on[i]:
            j=i
            while j<n and (on[j] or (j+int(mg*100)<n and on[j:j+int(mg*100)].any())): j+=1
            S.append([i/100,j/100]);i=j
        else:i+=1
    return S
for v in sys.argv[1:]:
    t=json.load(open(f'{v}/timing.json'));L=t['lines'];S=segs(v);n=len(L);m=len(S)
    if m<n: print(v,'bo\'laklar kam',m,n,'- o\'zgarmadi');continue
    ch=np.array([len(l['text']) if 'text' in l else sum(len(w['w'])+1 for w in l['words']) for l in L],float);ch/=ch.sum()
    tot=sum(b-a for a,b in S);INF=1e9
    dp=np.full((n+1,m+1),INF);bk=np.zeros((n+1,m+1),int);dp[0][0]=0
    for i in range(1,n+1):
        for j in range(i,m+1):
            for k in range(i-1,j):
                if dp[i-1][k]>=INF:continue
                d=sum(b-a for a,b in S[k:j])/tot;c=dp[i-1][k]+(d-ch[i-1])**2
                if c<dp[i][j]:dp[i][j]=c;bk[i][j]=k
    b=[];j=m
    for i in range(n,0,-1):k=bk[i][j];b.append((S[k][0],S[j-1][1]));j=k
    b=b[::-1];redo(v,b);print(v,'ok',[f"{a:.1f}-{c:.1f}" for a,c in b])
