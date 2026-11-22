# Instagram videolari uchun egasining talablari (qat'iy bajarilsin)

- Kontent: o'zbek tilida (lotin), 9:16, 1080x1920, 30 fps, 25-35 s. Blokli 3D (WebGL + Playwright + ffmpeg), 720p render -> 1080p.
- Turlar aralash: HORROR ko'proq; qiziqarli; urush/qahramonlik; AI yangilik; "agar sizga 1 mln dollar berishsa ...", "1 kunda milliarder bo'lib qolsangiz nima qilasiz", "umringizni pulga sotarmidingiz" kabi juda qiziqarli g'oyalar. Maqsad: mln ko'rish, obunachi, like, izoh.
- Takrorlanmaslik: har video alohida mavzu, alohida shablon, alohida vizual uslub, alohida hook. Boshlashdan oldin ro'yxat tuzing (mavzu, hook turi, shablon), o'xshashini almashtiring. history.md dagilarni qaytarmang.
- Birinchi 3 soniya: har videoda boshqa hook turi (savol, shok fakt, raqam, "to'xta!", qarama-qarshi fikr, sir...).
- O'rtada: like va obunani qisqa, tabiiy so'rash (har safar boshqa so'z bilan).
- Oxirida: izoh yozishga undaydigan aniq savol (har safar boshqa).
- Gaplar qisqa, 3-9 so'z; ~2 so'z/soniya (TTS tezligi), 25-35 s uchun ~50-65 so'z.
- Ovoz: gemini-3.8-flash-tts, ovoz Algenib; 429 bo'lsa gemini-2.5-flash-preview-tts, Algenib. TTS ga FAQAT ssenariy matni (hech qanday uslub ko'rsatmasi yo'q). Ovozdan keyin boshidagi 4 s ni gemini-3-flash-preview bilan tekshiring (check.py). Pauzalar <=0.45 s, atempo <=1.12.
- Har 1.5-3 s da yangi kadr, kamera doim harakatda, kamera devor ichiga kirmasin, sahna qorong'i bo'lmasin. Render oldidan kontakt-varaq bilan har shotni tekshiring va tuzating.
- Subtitr: sariq, qalin qora kontur, 1-3 so'z, ovozga sinxron, ekran o'rtasidan pastroqda.
- Musiqa/SFX numpy bilan (oddiy, g'alati emas), loudnorm I=-14, video ~6.5 Mbit/s, fayl <50 MB.
- Instagramga to'g'ridan-to'g'ri Reels qilib yuklang: CAPTION/NOM/HESHTEG YO'Q (caption bo'sh).

## Kanal reklamasi (har kuni 18 videodan 2 tasi)
Maqsad: Instagram tomoshabinini Telegram kanal @aicreator_n1 ga o'tkazish. Ikkalasi ham professional, kuchli hookli bo'lsin. Oxirgi qismda AI qahramon (`host.png`, `ai_lib.js` dagi `hostDraw`) va Instagram profil maketi (`@jasur.ai_`, bio'da "🔗 Telegram: AI Creator_N1" havolasi, unga ko'rsatgich/strelka) ko'rsatilsin. Real Instagram logotipini chizmang, faqat oddiy profil maketi.

1. **Qiziqarli video + oxirida reklama** (25-35 s): oddiy juda qiziqarli video (history.md dagi mavzularni takrorlamang). Oxirgi ~6-7 s da: "Profilimdagi havola orqali Telegram kanalimga o'ting! U yerda AI yangiliklari, AI bilan video yasash va pul ishlashni o'rgataman." (so'zlarni har kuni biroz o'zgartiring).
2. **Qisqa reklama-video** (~12-15 s): "Agar siz ... bo'lsangiz nima qilardingiz?" turidagi juda qiziqarli hook (masalan "1 kunlik prezident", "1 kunlik milliarder", "dunyodagi oxirgi odam" — har kuni boshqa; real siyosatchilar, partiyalar, siyosiy fikr yo'q) 3-4 s, keyin tez: "Sizga ham shunday videolar kerakmi yoki yasashni o'rganmoqchimisiz? Profilimdagi havola orqali Telegram kanalimga o'ting, obuna bo'ling: AI bilan pul ishlash, video yasash, AI yangiliklari!"
- Ikkalasining oxirida izoh uchun savol ham bo'lsin (masalan "Siz nima qilardingiz? Izohda yozing!").
