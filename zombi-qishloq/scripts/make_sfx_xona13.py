"""Procedural sound design for "13-xona" -> public/sfx-xona13.wav (numpy only).
Event times are in voice-time (original take); real time = voice time / 1.12."""
import wave
import numpy as np

SR = 44100
K = 1 / 1.12
DUR = 40.5
N = int(SR * DUR)
rng = np.random.default_rng(13)
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


# ---- ambience: low drone + fluorescent hum + room noise ----
t = np.arange(N) / SR
tv = t / K
drone = 0.15 * np.sin(2 * np.pi * 49 * t + 0.5 * np.sin(2 * np.pi * 0.09 * t)) + 0.07 * np.sin(2 * np.pi * 73.4 * t)
room = bandpass(rng.standard_normal(N), 80, 600) * 0.03
hum = (0.04 * np.sin(2 * np.pi * 120 * t) + 0.02 * np.sin(2 * np.pi * 240 * t)) * ((tv < 2.9) | ((tv > 30.5) & (tv < 40.2))).astype(float)
amb = drone + room + hum
amb *= np.interp(tv, [0, 37.6, 38.0, 39.3, 39.4, 46], [1, 1, 0.2, 0.2, 1.3, 1.3])
L += amb
R += amb

# hook
add(boom(), 0.05, 1.0)
for k in range(9):
    add(zap(), 0.3 + rng.uniform(0, 2.4), 0.6, rng.uniform(-0.5, 0.5))
add(whoosh(), 2.2, 0.8)
add(stinger(1.2), 2.6, 0.55)
# school: wind + "13?" hit
wind = bandpass(rng.standard_normal(int(SR * 3)), 200, 1200) * 0.12
add(wind * np.sin(np.pi * np.arange(len(wind)) / len(wind)), 2.9, 1.0)
add(riser(1.0), 3.5, 0.7)
add(stinger(1.2), 4.5, 0.7)
# sleep: time-lapse ticks accelerating
x = 6.0
gap = 0.5
while x < 9.0:
    add(tick(), x, 0.6)
    x += gap
    gap = max(0.06, gap * 0.82)
# wake: jolt, 11 o'clock bell, slow ticks
add(boom(1.2, 140, 50), 9.1, 0.8)
add(bell(330), 10.2, 0.5)
for x in np.arange(10.0, 11.1, 0.5):
    add(tick(2600), x, 0.7)
# heartbeat 11.2 -> 20 accelerating
hb, gap = 11.2, 1.0
while hb < 20.0:
    add(thump(55, 0.2), hb, 0.9)
    add(thump(50, 0.2), hb + 0.22, 0.6)
    hb += gap
    gap = max(0.5, gap * 0.94)
# corridor footsteps
for k, x in enumerate(np.arange(13.7, 16.5, 0.42)):
    add(step(), x, 0.6, -0.3 if k % 2 else 0.3)
# plate "13"
add(stinger(), 17.84, 0.9)
# door creaks open
add(creak(1.8), 20.15, 1.0)
add(whoosh(0.6), 22.25, 0.6)
# board chalk
add(chalk(0.95), 24.4, 0.9)
add(chalk(1.05), 26.0, 0.9)
# slam
add(riser(1.0), 28.0, 0.7)
add(boom(2.4, 160, 30), 29.0, 1.2)
add(thump(70, 0.3), 29.0, 1.2)
for k in range(6):
    add(zap(), 29.2 + k * 0.17, 0.5)
add(stinger(0.9), 29.8, 0.5)
# morning: soft tone
add(whoosh(0.7), 30.4, 0.6)
# photo shutter + whoosh
add(shutter(), 35.8, 0.9)
add(whoosh(0.5), 35.7, 0.5)
# calendar silence then hit
add(stinger(2.2), 39.35, 1.1)
add(boom(3.0, 90, 25), 39.35, 0.8)
# end: door creak again + low hit
add(creak(2.6, 220), 40.5, 0.8)
add(boom(2.5, 70, 25), 42.4, 0.6)

mix = np.stack([L, R], axis=1)
mix = np.tanh(mix * 1.1) * 0.85
fade = np.ones(N)
fade[-int(SR * 0.8):] = np.linspace(1, 0, int(SR * 0.8))
mix *= fade[:, None]
pcm = (mix * 32767).astype(np.int16)
with wave.open("public/sfx-xona13.wav", "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("ok", pcm.shape)
