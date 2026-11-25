# Qo'shiqdan ovozni olib tashlash (UVR MDX-Net Inst HQ3, onnxruntime). Ishlatish:
#   curl -sL -o inst.onnx https://github.com/TRvlvr/model_repo/releases/download/all_public_uvr_models/UVR-MDX-NET-Inst_HQ_3.onnx
#   pip install onnxruntime; ffmpeg -i trek.mp3 -ac 2 -ar 44100 -f f32le orig.raw; python3 separate.py  -> inst.wav (musiqa), voc.wav (ovoz)
import numpy as np,onnxruntime as ort,sys,wave
nfft,hop,F,T=6144,1024,3072,256
win=(0.5-0.5*np.cos(2*np.pi*np.arange(nfft)/nfft)).astype(np.float32)
chunk=hop*(T-1);trim=nfft//2;gen=chunk-2*trim
x=np.fromfile('orig.raw',np.float32).reshape(-1,2).T  # [2,N]
N=x.shape[1];pad=gen-N%gen
mix=np.concatenate([np.zeros((2,trim),np.float32),x,np.zeros((2,pad+trim),np.float32)],1)
sess=ort.InferenceSession('inst.onnx')
def stft(c):  # c [2,chunk]
    p=np.pad(c,((0,0),(nfft//2,nfft//2)),mode='reflect')
    idx=np.arange(T)[:,None]*hop+np.arange(nfft)[None]
    fr=p[:,idx]*win  # [2,T,nfft]
    S=np.fft.rfft(fr,axis=2)[:,:,:F]  # [2,T,F]
    S=S.transpose(0,2,1)  # [2,F,T]
    return np.stack([S[0].real,S[0].imag,S[1].real,S[1].imag]).astype(np.float32)
def istft(Y):
    S=np.zeros((2,nfft//2+1,T),np.complex64);S[0,:F]=Y[0]+1j*Y[1];S[1,:F]=Y[2]+1j*Y[3]
    fr=np.fft.irfft(S.transpose(0,2,1),n=nfft,axis=2)*win  # [2,T,nfft]
    L=nfft+hop*(T-1);out=np.zeros((2,L));ws=np.zeros(L)
    for t in range(T): out[:,t*hop:t*hop+nfft]+=fr[:,t];ws[t*hop:t*hop+nfft]+=win**2
    out/=np.maximum(ws,1e-8);return out[:,nfft//2:nfft//2+chunk]
res=[]
for i in range(0,mix.shape[1]-2*trim,gen):
    c=mix[:,i:i+chunk]
    if c.shape[1]<chunk: c=np.pad(c,((0,0),(0,chunk-c.shape[1])))
    y=sess.run(None,{'input':stft(c)[None]})[0][0]
    res.append(istft(y)[:,trim:trim+gen])
    print(i//gen,flush=True,end=' ')
inst=np.concatenate(res,1)[:,:N]*1.022
voc=x-inst
for name,a in [('inst',inst),('voc',voc)]:
    a=np.clip(a,-1,1);w=wave.open(name+'.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(44100);w.writeframes((a.T*32767).astype(np.int16).tobytes());w.close()
print('ok')
