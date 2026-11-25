#!/usr/bin/env python3
"""O'zini o'zi tekshiruvchi sifat darvozasi (2026-11-25). Har video yuklashdan OLDIN:
   python3 qc.py v01 v02 ...   (final_vNN.mp4 va vNN/ papkasi ishchi papkada)
FAIL bo'lsa video YUKLANMAYDI: ko'rsatilgan tuzatishni qiling, qayta render/mix qiling, qc ni qayta ishga tushiring (2 urinish).
Har FAIL avtomatik qc_log.md ga yoziladi; kun oxirida takrorlangan xatolar history.md "Qoidalar (o'rganilgan)" ga qoida qilib ko'chiriladi."""
import sys,subprocess,json,os,datetime,numpy as np,wave
def sh(c): return subprocess.run(c,capture_output=True,text=True)
def probe(f):
    r=json.loads(sh(['ffprobe','-v','error','-show_entries','format=duration,bit_rate:stream=width,height,codec_type','-of','json',f]).stdout)
    v=[s for s in r['streams'] if s['codec_type']=='video'][0];a=[s for s in r['streams'] if s['codec_type']=='audio']
    return float(r['format']['duration']),int(r['format'].get('bit_rate',0)),v['width'],v['height'],bool(a)
def audio_stats(f):
    sh(['ffmpeg','-y','-loglevel','error','-i',f,'-ac','1','-ar','16000','/tmp/qc.wav'])
    w=wave.open('/tmp/qc.wav');x=np.frombuffer(w.readframes(w.getnframes()),np.int16)/32768;fr=800;n=len(x)//fr
    e=20*np.log10(np.sqrt((x[:n*fr].reshape(n,fr)**2).mean(1))+1e-9)
    I=sh(['ffmpeg','-i',f,'-af','ebur128','-f','null','-']).stderr.split('Summary:')[-1]
    li=float(I.split('I:')[1].split('LUFS')[0]);lra=float(I.split('LRA:')[1].split('LU')[0])
    return li,lra,float(np.percentile(e,10)),float(np.percentile(e,90))
def frame_luma(f,t):
    sh(['ffmpeg','-y','-loglevel','error','-ss',str(t),'-i',f,'-frames:v','1','-vf','scale=108:192,format=gray','-f','rawvideo','/tmp/qc.raw'])
    a=np.frombuffer(open('/tmp/qc.raw','rb').read(),np.uint8).astype(float);return a.mean(),a.std()
bad_all=0;log=[]
for v in sys.argv[1:]:
    f=f'final_{v}.mp4' if os.path.exists(f'final_{v}.mp4') else f'{v}/final.mp4';P=[]
    d,br,W,H,has_a=probe(f)
    if not 30<=d<=40.5: P.append(f"uzunlik {d:.1f}s (30-40 s bo'lsin): matnni qisqartiring/uzaytiring")
    if (W,H)!=(1080,1920): P.append(f"o'lcham {W}x{H} (1080x1920 kerak)")
    if br<2_500_000: P.append(f"bitreyt {br/1e6:.1f} Mbit/s (>=2.5 kerak, crf<=23)")
    if not has_a: P.append("ovoz yo'q")
    else:
        li,lra,lo,hi=audio_stats(f)
        if not -16<=li<=-12: P.append(f"balandlik {li} LUFS (-14 atrofida bo'lsin)")
        if hi-lo<16: P.append(f"musiqa ovozga juda yaqin (farq {hi-lo:.0f} dB, >=16 kerak): mix.py ducking/mvol")
        if lra<3: P.append(f"ovoz bir tekis (LRA {lra}): matnda pauza '...', undov/so'roq, kulminatsiya oldidan jimlik qo'shing")
    m0,s0=frame_luma(f,0.05)
    if m0<28 or s0<18: P.append(f"1-kadr qorong'i/bo'sh (yorug'lik {m0:.0f}, kontrast {s0:.0f}): hook matni va yorqin ob'ekt 1-kadrda bo'lsin")
    hc=sh([sys.executable,'-I','hookcheck.py',f]).stdout
    if 'MUAMMO' in hc: P.append("hook: "+hc.strip()[:120])
    if os.environ.get('QC_LANG','1')=='1' and os.path.exists('langcheck.py'):
        lc=sh([sys.executable,'langcheck.py',v]).stdout.strip()
        if 'OK' not in lc: P.append("til/matn: "+lc[:160])
    print(v,'PASS' if not P else 'FAIL',f"({d:.1f}s)");[print('   -',p) for p in P]
    if P: bad_all+=1;log+= [f"- {datetime.date.today()} {v}: {p}" for p in P]
if log: open('qc_log.md','a').write('\n'.join(log)+'\n')
sys.exit(1 if bad_all else 0)
