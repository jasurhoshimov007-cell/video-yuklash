"""Sound design for "Agar Yer 5 soniyaga to'xtasa" -> public/sfx-yer.wav (numpy only).
Times are seconds of public/voice-yer.mp3."""
import wave
import numpy as np

SR = 44100
K = 1.0
DUR = 33.0
N = int(SR * DUR)
rng = np.random.default_rng(5)
L = np.zeros(N)
R = np.zeros(N)


def bandpass(x, lo, hi):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X[(f < lo) | (f > hi)] = 0
    return np.fft.irfft(X, len(x))


def env(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(t / max(a, 1e-4), 1) * np.exp(-t / d)


def add(sig, at_voice, gain=1.0, pan=0.0):
    i = int(at_voice * K * SR)
    if i >= N or i < 0:
        return
    sig = sig[: N - i] * gain
    L[i : i + len(sig)] += sig * (1 - max(pan, 0))
    R[i : i + len(sig)] += sig * (1 + min(pan, 0))


def boom(dur=2.2, f0=110, f1=30):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-tt * 4)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.003, 0.6)
    s += bandpass(rng.standard_normal(n), 30, 2500) * env(n, 0.001, 0.12) * 0.6
    return s


def stinger(dur=1.6):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    s = np.zeros(n)
    for f in (622, 659, 932, 988):
        s += np.sin(2 * np.pi * f * tt + 3 * np.sin(2 * np.pi * 6 * tt)) * 0.17
    return s * env(n, 0.005, 0.45) + boom(dur) * 0.9


def thump(f=60, dur=0.2):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    return np.sin(2 * np.pi * f * tt * (1 - tt)) * env(n, 0.002, 0.05)


def tick(f=3200):
    n = int(SR * 0.04)
    return bandpass(rng.standard_normal(n), f - 800, f + 800) * env(n, 0.0005, 0.006) * 0.9


def bell(f=330, dur=3.0):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * f * m * tt) * a for m, a in ((1, 0.6), (2.76, 0.25), (5.4, 0.12)))
    return s * env(n, 0.002, 0.9)


def creak(dur=1.7, base=300):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    f = base + 160 * np.sin(2 * np.pi * 0.7 * tt) + 80 * tt
    ph = 2 * np.pi * np.cumsum(f) / SR
    pulses = (np.sin(2 * np.pi * (28 + 10 * tt) * tt) > 0.5).astype(float)
    return bandpass(np.sin(ph) * pulses, 180, 3500) * 0.4 * np.sin(np.pi * tt / dur)


def step():
    n = int(SR * 0.16)
    return thump(95, 0.16) * 0.8 + bandpass(rng.standard_normal(n), 800, 4000) * env(n, 0.001, 0.02) * 0.4


def chalk(dur):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    s = bandpass(rng.standard_normal(n), 2500, 8000)
    strokes = (np.sin(2 * np.pi * 7 * tt) > -0.2).astype(float)
    return s * strokes * 0.35 * np.sin(np.pi * tt / dur)


def zap():
    n = int(SR * 0.12)
    tt = np.arange(n) / SR
    return (np.sign(np.sin(2 * np.pi * 120 * tt)) * 0.3 + bandpass(rng.standard_normal(n), 1000, 6000) * 0.4) * env(n, 0.001, 0.04)


def whoosh(dur=0.45):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    return bandpass(rng.standard_normal(n), 400, 5000) * np.sin(np.pi * tt / dur) ** 2 * 0.35


def riser(dur=1.0):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    f = 200 + 1400 * (tt / dur) ** 2
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.15 + bandpass(rng.standard_normal(n), 1000, 7000) * 0.2
    return s * (tt / dur) ** 2


def shutter():
    n = int(SR * 0.2)
    s = bandpass(rng.standard_normal(n), 1500, 9000)
    e = env(n, 0.0005, 0.01)
    e2 = np.roll(env(n, 0.0005, 0.015), int(SR * 0.07))
    return s * (e + e2) * 0.8




def ding():
    n = int(SR * 0.9)
    tt = np.arange(n) / SR
    return (np.sin(2 * np.pi * 1318 * tt) * 0.4 + np.sin(2 * np.pi * 1975 * tt) * 0.25) * env(n, 0.002, 0.25)


def pulse_bed(t):
    """epic documentary bed: low pulse at 120 bpm + pad"""
    beat = (t % 0.5) / 0.5
    kick = np.sin(2 * np.pi * 50 * t * (1 - beat * 0.5)) * np.exp(-beat * 9) * 0.35
    pad = (np.sin(2 * np.pi * 110 * t) + 0.6 * np.sin(2 * np.pi * 164.8 * t) + 0.4 * np.sin(2 * np.pi * 220.5 * t)) * 0.05
    return kick + pad


def roar(dur, lo=60, hi=900, amp=0.5):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    s = bandpass(rng.standard_normal(n), lo, hi)
    return s * amp * np.minimum(tt / 0.3, 1) * np.minimum((dur - tt) / 0.4, 1)


def sip():
    n = int(SR * 0.4)
    return bandpass(rng.standard_normal(n), 2000, 6000) * env(n, 0.05, 0.15) * 0.3


STOP = 15.45
t = np.arange(N) / SR
bed = pulse_bed(t) * np.interp(t, [0, 2.9, 3.0, 5.3, 5.4, 10, 10.1, 15.4, 15.5, 27.5, 27.6, 33], [0.7, 0.7, 0, 0, 0.9, 0.9, 0.5, 0.5, 0, 0, 0.7, 0.7])
space = bandpass(rng.standard_normal(N), 40, 300) * 0.06 * ((t < 3.0) | ((t > 5.3) & (t < 10)) | (t > 27.5))
birds = np.zeros(N)
for k in range(10):
    at = 10.2 + rng.uniform(0, 5)
    i = int(at * SR)
    n = int(SR * 0.12)
    tt = np.arange(n) / SR
    chirp = np.sin(2 * np.pi * (3000 + 2000 * tt / 0.12) * tt) * env(n, 0.005, 0.04) * 0.15
    if i + n < N and at < STOP:
        birds[i : i + n] += chirp
amb = bed + space
L += amb + birds
R += amb + birds

add(boom(2.0, 120, 35), 0.05, 0.8)
add(riser(2.8), 0.1, 0.5)
add(boom(2.6, 160, 28), 2.95, 1.2)
add(roar(2.3, 80, 1500, 0.6), 3.0, 1.0)
for k in range(5):
    add(whoosh(0.4), 3.1 + k * 0.4, 0.8, rng.uniform(-0.6, 0.6))
add(whoosh(0.6), 5.2, 0.7)
for x in np.arange(5.6, 8.6, 0.1):
    add(tick(2400 + (x - 5.6) * 400), x, 0.25)
add(ding(), 8.6, 0.5)
add(whoosh(0.6), 9.9, 0.6)
add(sip(), 10.6, 0.8)
add(sip(), 13.0, 0.8)
add(riser(1.2), 14.3, 0.6)
add(boom(3.0, 180, 25), STOP, 1.3)
add(stinger(1.4), STOP, 0.5)
add(whoosh(0.5), 16.05, 1.0)
for k, at in enumerate((17.4, 18.15, 18.85)):
    add(boom(1.2, 140, 50), at, 0.6)
    add(whoosh(0.5), at, 0.9, 0.6)
add(roar(3.8, 100, 3000, 0.45), 17.1, 1.0)
add(roar(3.6, 40, 600, 0.9), 20.9, 1.0)
add(boom(2.5, 90, 25), 24.2, 1.0)
add(roar(3.0, 200, 4000, 0.7), 24.5, 1.0)
add(whoosh(0.7), 27.3, 0.8)
add(ding(), 29.02, 0.4)
add(ding(), 30.03, 0.4)

mix = np.stack([L, R], axis=1)
mix = np.tanh(mix * 1.1) * 0.85
fade = np.ones(N)
fade[-int(SR * 0.8):] = np.linspace(1, 0, int(SR * 0.8))
mix *= fade[:, None]
pcm = (mix * 32767).astype(np.int16)
with wave.open("public/sfx-yer.wav", "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("ok", pcm.shape)
