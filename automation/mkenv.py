import sys,json,wave,numpy as np
for v in sys.argv[1:]:
    w=wave.open(f'{v}/voice.wav');x=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float)/32768;sr=w.getframerate();n=int(len(x)/sr*30)+30
    e=[float(np.sqrt((x[int(i/30*sr):int((i+1)/30*sr)]**2).mean())) if int(i/30*sr)<len(x) else 0 for i in range(n)]
    m=max(e) or 1;json.dump([round(min(1,a/m*1.3),3) for a in e],open(f'{v}/env.json','w'))
