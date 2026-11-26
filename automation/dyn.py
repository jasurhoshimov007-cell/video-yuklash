# 2026-11-26: ovoz dinamikasi (qoida 12): gap bo'yicha +-dB (hook/kulminatsiya balandroq, sirli gaplar pastroq) -> LRA oshadi
# python3 dyn.py vNN "3,-4,-4,0,-4,-4,2,3,..."  (gap soniga mos dB ro'yxati)
import json,sys,wave,numpy as np
v=sys.argv[1];g=[float(x) for x in sys.argv[2].split(',')]
w=wave.open(f'{v}/voice.wav');sr=w.getframerate();x=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float)
L=json.load(open(f'{v}/timing.json'))['lines'];gain=np.ones(len(x))
for i,l in enumerate(L):
    a=int(max(0,l['t0']-.15)*sr);b=int(min(len(x)/sr,l['t1']+.2)*sr);gain[a:b]=10**(g[i%len(g)]/20)
k=int(.08*sr);gain=np.convolve(gain,np.ones(k)/k,'same')
y=np.clip(x*gain,-32767,32767).astype(np.int16)
with wave.open(f'{v}/voice.wav','wb') as o: o.setnchannels(1);o.setsampwidth(2);o.setframerate(sr);o.writeframes(y.tobytes())
print(v,'dyn ok')
