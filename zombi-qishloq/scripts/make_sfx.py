"""Procedural horror sound design for the 40 s reel -> public/sfx.wav (numpy only)."""
import wave
import numpy as np

SR = 44100
DUR = 43.0
N = int(SR * DUR)
rng = np.random.default_rng(7)
L = np.zeros(N)
R = np.zeros(N)


def bandpass(x, lo, hi):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X[(f < lo) | (f > hi)] = 0
    return np.fft.irfft(X, len(x))


def add(sig, at, gain=1.0, pan=0.0):
    i = int(at * SR)
    if i >= N:
        return
    sig = sig[: N - i] * gain
    L[i : i + len(sig)] += sig * (1 - max(pan, 0))
    R[i : i + len(sig)] += sig * (1 + min(pan, 0))


def env(n, a, d):
    t = np.arange(n) / SR
    e = np.minimum(t / max(a, 1e-4), 1) * np.exp(-t / d)
    return e


# --- ambient drone + wind (whole video) ---
t = np.arange(N) / SR
drone = 0.18 * np.sin(2 * np.pi * 55 * t + 0.6 * np.sin(2 * np.pi * 0.11 * t))
drone += 0.10 * np.sin(2 * np.pi * 82.4 * t) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.07 * t))
drone += 0.05 * np.sin(2 * np.pi * 116.5 * t + 1.3)  # dissonant tritone-ish
wind = bandpass(rng.standard_normal(N), 200, 900) * 0.05 * (0.6 + 0.4 * np.sin(2 * np.pi * 0.09 * t))
amb = drone + wind
# duck ambience in the "quiet before twist"
amb *= np.interp(t, [0, 34, 35.4, 37.2, 37.5, 43], [1, 1, 0.25, 0.25, 1.2, 1.2])
L += amb
R += amb


def boom(dur=2.2, f0=110, f1=32):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-tt * 4)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) * env(n, 0.003, 0.6)
    s += bandpass(rng.standard_normal(n), 30, 2500) * env(n, 0.001, 0.12) * 0.6
    return s


def stinger(dur=1.6):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    s = np.zeros(n)
    for f in (740, 784, 1046, 1108):  # clustered screech
        s += np.sin(2 * np.pi * f * tt + 3 * np.sin(2 * np.pi * 7 * tt)) * 0.18
    s *= env(n, 0.005, 0.45)
    return s + boom(dur) * 0.9


def groan(dur=1.4, f0=95):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    f = f0 * (1 + 0.12 * np.sin(2 * np.pi * 3.3 * tt) + 0.2 * tt)
    ph = 2 * np.pi * np.cumsum(f) / SR
    saw = 2 * ((ph / (2 * np.pi)) % 1) - 1
    s = bandpass(saw, 60, 1200) * 0.5 + bandpass(rng.standard_normal(n), 300, 1600) * 0.15
    e = np.sin(np.pi * np.clip(tt / dur, 0, 1)) ** 0.7
    return s * e


def whoosh(dur=0.45):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    s = bandpass(rng.standard_normal(n), 400, 5000)
    return s * np.sin(np.pi * tt / dur) ** 2 * 0.35


def thump(f=70, dur=0.18):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    return np.sin(2 * np.pi * f * tt * (1 - tt)) * env(n, 0.002, 0.05)


def knock():
    n = int(SR * 0.25)
    s = thump(110, 0.25) * 1.2 + bandpass(rng.standard_normal(n), 150, 1800) * env(n, 0.001, 0.03) * 0.8
    return s


def creak(dur=0.9):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    f = 380 + 220 * np.sin(2 * np.pi * 1.1 * tt)
    ph = 2 * np.pi * np.cumsum(f) / SR
    pulses = (np.sin(2 * np.pi * 38 * tt) > 0.6).astype(float)
    return bandpass(np.sin(ph) * pulses, 200, 3000) * 0.35 * np.sin(np.pi * tt / dur)


def splash():
    n = int(SR * 0.9)
    s = bandpass(rng.standard_normal(n), 300, 7000) * env(n, 0.004, 0.18) * 0.6
    th = thump(60, 0.3) * 0.6
    s[: len(th)] += th
    return s


def snap():
    n = int(SR * 0.3)
    return bandpass(rng.standard_normal(n), 1500, 9000) * env(n, 0.0005, 0.02) * 1.2


# --- hook ---
add(boom(), 0.05, 1.0)
add(groan(1.6, 90), 0.3, 0.55, -0.3)
add(groan(1.3, 120), 0.9, 0.45, 0.4)
add(stinger(), 1.6, 0.8)
add(groan(1.0, 140), 1.7, 0.6)
add(whoosh(), 2.25, 0.8)
# scene-cut whooshes
for c in (3.2, 6.85, 9.9, 13.9, 18.9, 22.85, 24.8, 26.6, 30.9, 34.05):
    add(whoosh(0.4), c, 0.6, rng.uniform(-0.4, 0.4))
# heartbeat field + shepherd (accelerating)
hb = 7.0
gap = 0.95
while hb < 14.0:
    add(thump(55, 0.2), hb, 0.9)
    add(thump(50, 0.2), hb + 0.22, 0.6)
    hb += gap
    gap = max(0.55, gap * 0.93)
add(groan(1.8, 80), 11.0, 0.6)
add(stinger(), 12.5, 0.9)
# village overrun: many groans
for k, at in enumerate((14.2, 14.9, 15.7, 16.4, 17.2, 17.9, 18.4)):
    add(groan(rng.uniform(0.9, 1.5), rng.uniform(80, 150)), at, 0.35, rng.uniform(-0.7, 0.7))
add(groan(0.9, 160), 17.6, 0.6)
# window + knocks
for hb in np.arange(19.1, 21.8, 0.62):
    add(thump(52, 0.2), hb, 0.7)
for k in (21.9, 22.25, 22.6):
    add(knock(), k, 1.0)
add(creak(), 23.1, 0.9)
# running footsteps
for k, ft in enumerate(np.arange(24.9, 31.0, 0.17)):
    add(thump(90 + (k % 2) * 20, 0.1), ft, 0.45, -0.2 if k % 2 else 0.2)
for at in (25.2, 26.0, 26.9, 27.7, 28.5, 29.4, 30.2):
    add(groan(0.8, rng.uniform(110, 170)), at, 0.4, rng.uniform(-0.6, 0.6))
# bridge cut + falls
add(snap(), 32.3, 1.0)
add(snap(), 32.4, 0.8)
add(boom(2.5, 90, 28), 32.35, 1.0)
add(creak(1.2), 32.45, 0.7)
for k in range(8):
    add(splash(), 33.0 + k * 0.09 + rng.uniform(0, 0.1), 0.6, rng.uniform(-0.6, 0.6))
# twist
add(stinger(2.2), 37.35, 1.0)
add(groan(2.0, 70), 37.6, 0.4)
add(boom(3, 70, 25), 41.0, 0.6)

mix = np.stack([L, R], axis=1)
mix = np.tanh(mix * 1.1) * 0.85  # soft limiter
fade = np.ones(N)
fade[-int(SR * 0.8):] = np.linspace(1, 0, int(SR * 0.8))
mix *= fade[:, None]
pcm = (mix * 32767).astype(np.int16)
with wave.open("public/sfx.wav", "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("ok", pcm.shape)
