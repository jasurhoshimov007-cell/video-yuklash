"""Sound design for "Tashlandiq uydan 1 million dollar" -> public/sfx-pul.wav (numpy only).
Times are seconds of public/voice-pul.mp3."""
import wave
import numpy as np

SR = 44100
K = 1.0
DUR = 38.7
N = int(SR * DUR)
rng = np.random.default_rng(21)
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


def cash():
    """cash register: bell + drawer"""
    n = int(SR * 0.8)
    tt = np.arange(n) / SR
    b = (np.sin(2 * np.pi * 2093 * tt) * 0.35 + np.sin(2 * np.pi * 3136 * tt) * 0.2) * env(n, 0.002, 0.3)
    th = thump(90, 0.2)
    b[: len(th)] += th * 0.6
    return b


def flutter(dur):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    s = bandpass(rng.standard_normal(n), 2000, 9000) * ((np.sin(2 * np.pi * 23 * tt) > 0.3).astype(float))
    return s * 0.25 * np.sin(np.pi * tt / dur)


def engine(dur):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    f = 45 + 20 * np.exp(-tt * 1.5)
    s = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.15 + bandpass(rng.standard_normal(n), 60, 400) * 0.2
    return bandpass(s, 30, 600) * np.minimum(tt / 0.3, 1) * np.minimum((dur - tt) / 0.3, 1)


def door_brake():
    n = int(SR * 0.6)
    tt = np.arange(n) / SR
    return bandpass(np.sin(2 * np.pi * (1800 - 900 * tt) * tt) * 0.3 + rng.standard_normal(n) * 0.1, 800, 4000) * env(n, 0.01, 0.25)


def tension_bed(t):
    """thriller pulse: low tick-tock + tremolo string"""
    beat = (t % 0.75) / 0.75
    kick = np.sin(2 * np.pi * 48 * t * (1 - beat * 0.4)) * np.exp(-beat * 10) * 0.3
    trem = (np.sin(2 * np.pi * 146.8 * t) + 0.5 * np.sin(2 * np.pi * 174.6 * t)) * (0.5 + 0.5 * np.sin(2 * np.pi * 8 * t)) * 0.04
    return kick + trem


t = np.arange(N) / SR
bed = tension_bed(t) * np.interp(t, [0, 3.5, 3.6, 13, 13.1, 19.4, 19.5, 32.4, 32.5, 38.7], [0.6, 0.6, 0.3, 0.3, 0.5, 0.5, 1.0, 1.0, 0.7, 0.7])
room = bandpass(rng.standard_normal(N), 80, 600) * 0.03
L += bed + room
R += bed + room

add(boom(1.8, 120, 40), 0.05, 0.7)
add(cash(), 0.3, 0.8)
add(flutter(2.0), 0.9, 1.0)
add(cash(), 2.7, 0.6)
add(stinger(1.4), 3.84, 0.9)
add(whoosh(0.5), 6.4, 0.7)
for k, x in enumerate(np.arange(6.6, 10.4, 0.45)):
    add(step(), x, 0.5, -0.3 if k % 2 else 0.3)
add(creak(0.9, 260), 8.6, 0.6)
add(creak(0.8, 420), 10.65, 0.9)
add(thump(70, 0.3), 12.2, 0.8)
add(riser(0.6), 13.2, 0.6)
add(boom(1.4, 130, 50), 13.88, 0.8)
add(cash(), 13.9, 0.9)
add(flutter(1.2), 14.7, 1.0)
add(flutter(3.4), 15.9, 1.0)
for x in (17.6, 18.2):
    add(cash(), x, 0.5)
add(engine(1.5), 19.6, 1.0)
add(door_brake(), 20.7, 0.9)
add(thump(60, 0.3), 21.3, 0.8)
add(creak(0.7, 300), 22.44, 1.0)
add(stinger(1.2), 22.44, 0.7)
for x in (23.8, 24.4, 25.0):
    add(step(), x, 0.8)
add(riser(1.2), 25.7, 0.5)
add(stinger(1.6), 26.97, 0.9)
add(whoosh(0.5), 28.6, 0.6)
add(whoosh(0.4), 30.5, 0.7)
add(boom(2.6, 140, 30), 32.4, 1.0)
add(ding(), 35.35, 0.4)
add(ding(), 36.34, 0.4)

mix = np.stack([L, R], axis=1)
mix = np.tanh(mix * 1.1) * 0.85
fade = np.ones(N)
fade[-int(SR * 0.8):] = np.linspace(1, 0, int(SR * 0.8))
mix *= fade[:, None]
pcm = (mix * 32767).astype(np.int16)
with wave.open("public/sfx-pul.wav", "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("ok", pcm.shape)
