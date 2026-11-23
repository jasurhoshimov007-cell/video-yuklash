#!/usr/bin/env python3
"""Birinchi 3 soniya tekshiruvi: qora/bo'sh boshlanish va qotib qolgan kadrlarni topadi.
Ishlatish: python3 hookcheck.py final.mp4   -> "HOOK OK" yoki sabab bilan "HOOK MUAMMO" (chiqish kodi 1)."""
import subprocess,sys,numpy as np
v=sys.argv[1];T=[0.05,.4,.8,1.2,1.6,2.0,2.5,2.95];F=[]
for t in T:
    r=subprocess.run(['ffmpeg','-v','error','-ss',str(t),'-i',v,'-frames:v','1','-vf','scale=90:160,format=gray','-f','rawvideo','-'],capture_output=True)
    F.append(np.frombuffer(r.stdout,np.uint8).astype(float) if len(r.stdout)==90*160 else np.zeros(90*160))
d=[float(abs(F[i+1]-F[i]).mean()) for i in range(len(F)-1)];m0=float(F[0].mean());prob=[]
if m0<10: prob.append(f"1-kadr juda qorong'i/bo'sh ({m0:.0f})")
for i,x in enumerate(d):
    if x<1.2: prob.append(f"{T[i]:.1f}-{T[i+1]:.1f} s oralig'ida kadr deyarli o'zgarmaydi ({x:.1f})")
print("HOOK OK" if not prob else "HOOK MUAMMO: "+"; ".join(prob),"| o'zgarish:",[round(x,1) for x in d])
sys.exit(1 if prob else 0)
