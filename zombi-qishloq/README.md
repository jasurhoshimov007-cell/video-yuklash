# Qishloqda zombi apokalipsisi — 40 s Instagram Reels (Remotion + 3D)

Blokli (Roblox uslubidagi) 3D qahramonlar bilan o'zbekcha horror reels. 1080x1920, 30 fps, 40 soniya.

- Ovoz uchun matn: [`OVOZ_MATNI.md`](OVOZ_MATNI.md)
- Sahnalar: `src/scenes.tsx` (11 sahna, React Three Fiber)
- Qahramonlar: `src/three/Blocky.tsx` (Jasur, Madina, cho'pon, zombilar)
- Subtitr / sarlavha / yakun kartasi: `src/Overlay.tsx`
- Ovoz satrlari va vaqtlari: `src/data.ts`
- Ovoz effektlari: `scripts/make_sfx.py` -> `public/sfx.wav`

## Ishga tushirish

```bash
npm i
npm run dev            # Remotion Studio — brauzerda ko'rish
npx remotion render ZombiQishloq out/zombi-qishloq.mp4
```

## O'z ovozingizni qo'shish

1. `OVOZ_MATNI.md` dagi matnni o'qib yozing (yoki ElevenLabs'da yarating), `public/voice.mp3` qilib saqlang.
2. Studio'da `voiceFile` propini `voice.mp3` qiling (yoki `src/Root.tsx` dagi `defaultProps`).
3. Agar ovoz vaqtlari boshqacha chiqsa, `src/data.ts` dagi `LINES` vaqtlarini moslang — subtitrlar shunga qarab yuradi.
4. Effektlar ovozni bosib ketsa, `sfxVolume` ni 0.5–0.6 ga tushiring.
