"""Sound design for "Har yili bitta odam yo'qoladigan qishloq" -> public/sfx-dekabr.wav (numpy only).
Times are seconds of public/voice-dekabr.mp3."""
import wave
import numpy as np

SR = 44100
K = 1.0
DUR = 39.7
N = int(SR * DUR)
rng = np.random.default_rng(12)
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


def music_box(t0, notes, gap=0.42, amp=0.18):
    for k, f in enumerate(notes):
        n = int(SR * 1.2)
        tt = np.arange(n) / SR
        s = (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * f * 2.01 * tt)) * env(n, 0.002, 0.35) * amp
        add(s, t0 + k * gap, 1.0, 0.2 * np.sin(k))


def switch_off():
    n = int(SR * 0.12)
    return bandpass(rng.standard_normal(n), 1500, 7000) * env(n, 0.0005, 0.01) * 1.2 + thump(120, 0.12) * 0.5


def crunch(dur=0.25):
    n = int(SR * dur)
    return bandpass(rng.standard_normal(n), 900, 5000) * env(n, 0.005, 0.06) * 0.5


t = np.arange(N) / SR
wind = bandpass(rng.standard_normal(N), 150, 900) * 0.09 * (0.6 + 0.4 * np.sin(2 * np.pi * 0.07 * t))
drone = 0.12 * np.sin(2 * np.pi * 43 * t + 0.4 * np.sin(2 * np.pi * 0.06 * t)) + 0.05 * np.sin(2 * np.pi * 64.5 * t)
amb = (wind + drone) * np.interp(t, [0, 23.0, 23.5, 24.8, 25.0, 39.7], [1, 1, 0.3, 0.3, 1.2, 1.2])
L += amb
R += amb

# eerie music-box lullaby (minor) at start and before the window
A, C, D, E, F, G = 440.0, 523.3, 587.3, 659.3, 698.5, 784.0
music_box(0.2, [E, D, C, A, C, D, E, E])
music_box(15.3, [A, C, E, D, C, A], amp=0.12)
add(boom(1.8, 110, 35), 0.05, 0.7)
add(switch_off(), 2.1, 1.0)
add(stinger(1.2), 2.15, 0.45)
add(whoosh(0.5), 4.2, 0.6)
add(whoosh(0.5), 6.9, 0.6)
add(ding(), 7.15, 0.4)
add(switch_off(), 9.75, 1.0)
add(boom(1.5, 100, 40), 9.75, 0.6)
add(whoosh(0.6), 11.5, 0.6)
for k, x in enumerate(np.arange(15.0, 17.5, 0.5)):
    add(crunch(), x, 0.8, -0.3 if k % 2 else 0.3)
add(riser(1.4), 19.2, 0.4)
add(stinger(1.4), 20.62, 0.6)
# heartbeat from the window to the lights-out
hb, gap = 23.2, 0.9
while hb < 32.3:
    add(thump(55, 0.2), hb, 0.85)
    add(thump(50, 0.2), hb + 0.22, 0.55)
    hb += gap
    gap = max(0.5, gap * 0.95)
add(creak(0.5, 600), 23.4, 0.5)
add(stinger(2.0), 24.9, 0.8)
add(riser(1.5), 26.9, 0.5)
add(stinger(1.6), 28.4, 0.8)
add(switch_off(), 32.4, 1.3)
add(boom(3.0, 150, 25), 32.4, 1.2)
add(boom(2.5, 70, 25), 35.5, 0.5)

mix = np.stack([L, R], axis=1)
mix = np.tanh(mix * 1.1) * 0.85
fade = np.ones(N)
fade[-int(SR * 0.8):] = np.linspace(1, 0, int(SR * 0.8))
mix *= fade[:, None]
pcm = (mix * 32767).astype(np.int16)
with wave.open("public/sfx-dekabr.wav", "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("ok", pcm.shape)
