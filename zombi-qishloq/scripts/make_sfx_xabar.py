"""Procedural sound design for "O'zimdan kelgan xabar" -> public/sfx-xabar.wav (numpy only).
Times are seconds of public/voice-xabar.mp3 (normal speed)."""
import wave
import numpy as np

SR = 44100
K = 1.0
DUR = 37.0
N = int(SR * DUR)
rng = np.random.default_rng(7)
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




def buzz(dur=0.9):
    """phone vibration: two pulses of 160 Hz rattle"""
    n = int(SR * dur)
    tt = np.arange(n) / SR
    gate = ((tt % 0.45) < 0.28).astype(float)
    s = np.sign(np.sin(2 * np.pi * 160 * tt)) * 0.25 + np.sin(2 * np.pi * 80 * tt) * 0.3
    return bandpass(s * gate, 60, 2000) * 0.8


def ding():
    n = int(SR * 0.9)
    tt = np.arange(n) / SR
    return (np.sin(2 * np.pi * 1318 * tt) * 0.4 + np.sin(2 * np.pi * 1975 * tt) * 0.25) * env(n, 0.002, 0.25)


def ringback(dur=1.6):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    gate = ((tt % 1.6) < 1.0).astype(float)
    return np.sin(2 * np.pi * 425 * tt) * 0.25 * gate


def knock():
    n = int(SR * 0.25)
    return thump(110, 0.25) * 1.2 + bandpass(rng.standard_normal(n), 150, 1800) * env(n, 0.001, 0.03) * 0.8


def rattle(dur=2.0):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    clicks = (np.sin(2 * np.pi * 9 * tt) > 0.92).astype(float)
    return bandpass(rng.standard_normal(n) * clicks, 1500, 7000) * 0.6 + creak(dur, 520) * 0.4


t = np.arange(N) / SR
drone = 0.13 * np.sin(2 * np.pi * 46 * t + 0.5 * np.sin(2 * np.pi * 0.08 * t)) + 0.06 * np.sin(2 * np.pi * 69 * t)
room = bandpass(rng.standard_normal(N), 60, 500) * 0.025
amb = (drone + room) * np.interp(t, [0, 27, 28.5, 31.0, 31.1, 37], [0.8, 1, 0.3, 0.3, 1.3, 1.3])
L += amb
R += amb

# messages
add(boom(1.8, 120, 40), 0.05, 0.8)
for at in (0.15, 4.6, 16.0, 28.45):
    add(buzz(), at, 0.9)
for at in (0.3, 4.76, 17.66, 28.62):
    add(ding(), at, 0.7)
add(whoosh(0.5), 2.9, 0.6)
# knocks
for k in (10.9, 11.3, 11.7, 24.3, 24.65, 25.0, 26.1):
    add(knock(), k, 1.0)
# steps to the door
for k, x in enumerate(np.arange(14.0, 15.6, 0.4)):
    add(step(), x, 0.5)
# heartbeat from text 2 to the end
hb, gap = 15.9, 0.95
while hb < 30.8:
    add(thump(55, 0.2), hb, 0.85)
    add(thump(50, 0.2), hb + 0.22, 0.55)
    hb += gap
    gap = max(0.48, gap * 0.96)
# call
add(ringback(1.6), 19.35, 0.7)
add(ding(), 21.0, 0.3)
# handle rattles by itself
add(rattle(2.2), 23.9, 0.9)
# last message stinger, then the turn and blackout
add(stinger(1.6), 28.62, 0.9)
add(riser(1.4), 29.6, 0.7)
add(boom(2.6, 160, 28), 31.0, 1.2)
add(stinger(2.0), 31.0, 0.7)
add(creak(2.5, 240), 32.0, 0.5)
add(boom(2.5, 70, 25), 33.6, 0.5)

mix = np.stack([L, R], axis=1)
mix = np.tanh(mix * 1.1) * 0.85
fade = np.ones(N)
fade[-int(SR * 0.8):] = np.linspace(1, 0, int(SR * 0.8))
mix *= fade[:, None]
pcm = (mix * 32767).astype(np.int16)
with wave.open("public/sfx-xabar.wav", "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("ok", pcm.shape)
