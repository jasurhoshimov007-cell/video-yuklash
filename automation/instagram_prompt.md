# Instagram videolari uchun egasining talablari (qat'iy bajarilsin)

- Kontent: o'zbek tilida (lotin), 9:16, 1080x1920, 30 fps, 25-35 s. 2D flat-vector yoki 3D qahramon rasmi (Roblox/blokli uslub TAQIQLANGAN), Playwright + ffmpeg.
- Turlar aralash: HORROR ko'proq; qiziqarli; urush/qahramonlik; AI yangilik; "agar sizga 1 mln dollar berishsa ...", "1 kunda milliarder bo'lib qolsangiz nima qilasiz", "umringizni pulga sotarmidingiz" kabi juda qiziqarli g'oyalar. Maqsad: mln ko'rish, obunachi, like, izoh.
- Takrorlanmaslik: har video alohida mavzu, alohida shablon, alohida vizual uslub, alohida hook. Boshlashdan oldin ro'yxat tuzing (mavzu, hook turi, shablon), o'xshashini almashtiring. history.md dagilarni qaytarmang.
- Birinchi 3 soniya: har videoda boshqa hook turi (savol, shok fakt, raqam, "to'xta!", qarama-qarshi fikr, sir...).
- O'rtada: like va obunani qisqa, tabiiy so'rash (har safar boshqa so'z bilan).
- Oxirida: izoh yozishga undaydigan aniq savol (har safar boshqa).
- Gaplar qisqa, 3-9 so'z; ~2 so'z/soniya (TTS tezligi), 25-35 s uchun ~50-65 so'z.
- Ovoz: gemini-3.8-flash-tts, ovoz Algenib; 429 bo'lsa gemini-2.5-flash-preview-tts, Algenib. TTS ga FAQAT ssenariy matni (hech qanday uslub ko'rsatmasi yo'q). Ovozdan keyin boshidagi 4 s ni gemini-3-flash-preview bilan tekshiring (check.py). Pauzalar <=0.45 s, atempo <=1.12.
- Har 1.5-3 s da yangi kadr, kamera doim harakatda, kamera devor ichiga kirmasin, sahna qorong'i bo'lmasin. Render oldidan kontakt-varaq bilan har shotni tekshiring va tuzating.
- Subtitr: KO'K (#3db4ff), qalin qora kontur, kalit so'z sariq, 1-3 so'z, ovozga sinxron, ekran o'rtasidan pastroqda.
- Musiqa/SFX numpy bilan (oddiy, g'alati emas), loudnorm I=-14, video ~6.5 Mbit/s, fayl <50 MB.
- Instagramga Reels qilib yuklang: qisqa caption majburiy (1-qator hook + 2-qator bitta harakat chaqirig'i); sarlavha-nom va heshteg yo'q.

## Kanal reklamasi (har kuni 18 videodan 2 tasi)
Maqsad: Instagram tomoshabinini Telegram kanal @aicreator_n1 ga o'tkazish. Ikkalasi ham professional, kuchli hookli bo'lsin. Oxirgi qismda AI qahramon (`host.png`, `ai_lib.js` dagi `hostDraw`) va Instagram profil maketi (`@jasur.ai_`, bio'da "🔗 Telegram: AI Creator_N1" havolasi, unga ko'rsatgich/strelka) ko'rsatilsin. Real Instagram logotipini chizmang, faqat oddiy profil maketi.

1. **Qiziqarli video + oxirida reklama** (25-35 s): oddiy juda qiziqarli video (history.md dagi mavzularni takrorlamang). Oxirgi ~6-7 s da: "Profilimdagi havola orqali Telegram kanalimga o'ting! U yerda AI yangiliklari, AI bilan video yasash va pul ishlashni o'rgataman." (so'zlarni har kuni biroz o'zgartiring).
2. **Qisqa reklama-video** (~12-15 s): "Agar siz ... bo'lsangiz nima qilardingiz?" turidagi juda qiziqarli hook (masalan "1 kunlik prezident", "1 kunlik milliarder", "dunyodagi oxirgi odam" — har kuni boshqa; real siyosatchilar, partiyalar, siyosiy fikr yo'q) 3-4 s, keyin tez: "Sizga ham shunday videolar kerakmi yoki yasashni o'rganmoqchimisiz? Profilimdagi havola orqali Telegram kanalimga o'ting, obuna bo'ling: AI bilan pul ishlash, video yasash, AI yangiliklari!"
- Ikkalasining oxirida izoh uchun savol ham bo'lsin (masalan "Siz nima qilardingiz? Izohda yozing!").

## Claude suhbat videolari (har kuni 2 ta)
Maqsad: tomoshabinni oxirigacha ushlab turish va biz nima qilishimizni tushuntirish (AI bilan slayd, video, kod, kontent yasab beramiz).
- Qahramonlar: 2D odam (`drawHost`) (har safar boshqa kasb: talaba, dasturchi, o'qituvchi, tadbirkor, shifokor, dizayner, SMM, haydovchi...) va **Claude personaji** — o'zimiz chizgan iliq to'q sariq rangli, yumaloq yuzli, ekrandagi do'stona AI yordamchi (noutbuk ekranida yoki yonida suzib turadi). Anthropic'ning rasmiy logotipini chizmang.
- Syujet: qahramon qiyin vaziyatda (deadline, xato kod, yo'qolgan fayl, mijoz jahli, imtihon, taqdimot...) -> vahima, hazil dialog -> Claude kulgili, tez va aqlli yechim beradi -> kutilmagan yakun (twist). Har kuni yangi vaziyat va yangi kasb; namunadagi "8:55 da uyg'onish, 10 ta slayd, qahva" syujetini aynan takrorlamang.
- Dialog: 2 ovoz. Gemini TTS multiSpeakerVoiceConfig (1 so'rov): qahramon = Algenib, Claude = Kore. Matnda faqat "Qahramon: ..." / "Claude: ..." qatorlari, boshqa ko'rsatma yo'q. Ovozdan keyin check.py bilan tekshiring.
- Oxirida Claude aytadi: "Video yoqqan bo'lsa, like bosing, obuna bo'ling va fikringizni yozing! Slayd, video yoki shunga o'xshash ish kerak bo'lsa, profildagi havola orqali Telegram kanalimizga yozing — yasab beramiz."
- 30-40 s, subtitr ko'k, kalit so'z sariq.

## Boshqacha videolar (har kuni 2 ta)
- Odatiy shablonlardan tashqari noodatiy format: POV, "1 kunlik eksperiment", vaqt sayohati, kichik hayvon nigohidan, teskari hikoya, "24 soat davomida" va hokazo. Har kuni yangi format.

## Claude suhbat videolari: yangilangan qoida (2026-11-23)
- 3 ta/kun, 40-50 s. 3 qahramon: odam (har kuni boshqa kasb), Claude (to'q sariq yumaloq kub, 2 tik ko'z, oyoqchalar; o'zimizning dizayn) va TO'QIMA raqib AI (binafsha terminal-kub). Namuna tuzilma: `reference_analysis.md` oxirgi bo'lim.
- Har qahramon o'z ovozi: odam Algenib, Claude Kore, raqib AI uchinchi ovoz (masalan Puck). TTS multiSpeaker 2 ta ovoz bilan cheklangan bo'lsa, raqibni alohida so'rov bilan yoki odam ovozida yozing.
- Dvigatel: 2D (`tmpl2d_claude.js`, `lib2d.js`). Claude personaji `drawClaude2d` (to'q sariq kub, 2 ko'z, oyoqchalar).
