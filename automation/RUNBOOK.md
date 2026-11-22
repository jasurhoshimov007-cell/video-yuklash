# Kunlik avtomatik ish (har kuni 12:00, Toshkent)

MAJBURIY: HAR BIR videoda (Instagram ham, kanal ham, reklama ham) ovozga sinxron sariq subtitr bo'lsin (lib.js `drawSub`, har gap uchun). Subtitrsiz video joylanmaydi: yuklashdan oldin kadrlarda subtitr borligini tekshiring.

Egasi hech narsa qilmaydi. Savol bermang, oxirigacha o'zingiz bajaring. Egasiga faqat Telegram botga qisqa o'zbekcha hisobot yozing.

## 0. Tayyorgarlik
- Kod: `automation/` papkasi (`ccr-be4dfb80-ltms6l` tarmog'i). Ishchi papka sifatida scratchpad'dan foydalaning: `cp -r automation/* $WORK/`.
- Kalitlar muhitda: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (egasining shaxsiy chati = hisobot), `GEMINI_API_KEY`.
- Kanal: `@aicreator_n1` (bot admin, post huquqi bor).
- Instagram: Windsor.ai connector `instagram`, akkaunt id `17841441055115940` (@jasur.ai_), action `create_video_post`.
- Skillar: horror uchun `anthropic-skills:3d-horror-videolar`, qiziqarli uchun `anthropic-skills:izoh-ovoz-jangi-roblox` (CTA: like + obuna + izohdagi savol).
- `history.md` ni o'qing: u yerdagi mavzularni qaytarmang. Ish oxirida yangi mavzularni qo'shib, commit qilib push qiling.

## 1. Instagram: 18 ta video (avval shu)
- Talablar: `instagram_prompt.md` (qat'iy).
- Tarkib: horror ko'proq (~7), qiziqarli/g'oyali "1 mln dollar", "milliarder bo'lsangiz" kabi (~4), urush/qahramonlik (~2), AI yangilik (~3), Telegram kanal reklamasi 2 ta (`instagram_prompt.md` "Kanal reklamasi" bo'limi).
- Ish tartibi har video uchun: `scripts.json` -> `python3 tts.py vNN` -> `python3 prep.py vNN` -> `python3 check.py vNN` -> `vNN.js` sahna (namunalar: `examples/v01.js`...`v10.js`; `lib.js` dagi set/prop/overlay funksiyalari) -> `node render.js vNN sheet` + kontakt-varaqni ko'rib tuzatish -> `node render.js vNN full` -> `python3 mix.py vNN` -> ffmpeg mux (`-c copy -movflags +faststart`) -> `final.mp4`.
- 3 ta videoni parallel render qiling.
- TTS limiti: har model uchun kuniga ~10 so'rov (jami ~20). 18 Instagram + 2 kanal uchun so'rovlarni tejang, qayta yozdirmang. Limit tugasa, qolganini qilmasdan hisobotda ayting.
- Joylash: videolarni ochiq URL ga chiqarish uchun bugungi `media-YYYYMMDD` orphan tarmog'iga push qiling (`git checkout --orphan media-YYYYMMDD; git rm -rf --cached .; git add vNN.mp4 ...`). URL: `https://raw.githubusercontent.com/jasurhoshimov007-cell/video-yuklash/media-YYYYMMDD/vNN.mp4`.
- Instagram'ga `create_video_post` bilan yuklang: `caption` BO'SH (nom/heshteg yo'q), `share_to_feed: true`, `thumb_offset: 1500`. Har video tayyor bo'lishi bilan yuklang.
- Agar chaqiruv 60 s da timeout bo'lsa, QAYTA YUBORMANG: avval `get_data` (fields `media_id`, `media_permalink`, date_preset `last_3dT`) bilan chiqqanini tekshiring.
- Hammasi tugagach `media-YYYYMMDD` tarmog'ini remote'dan o'chiring (`git push origin --delete media-YYYYMMDD`). Faqat Instagram videoni olib bo'lganidan keyin o'chiring.

## 2. Telegram kanal: 2 ta video + 1 promo post (Instagram'dan keyin)
- Mavzular: AI yangiliklari, AI bilan video yasashni o'rgatish, AI bilan qilingan ishlar, blog. Bugungi eng dolzarb AI yangiligini WebSearch bilan toping. Faktlar to'g'ri bo'lsin.
- Format: 25-30 s, o'zbekcha, 9:16, motion grafika + 3D fon, pastda AI qahramon `host.png` (har videoda albatta), har gapdan keyin qimirlaydi (`ai_lib.js`: `aiShot`, `hostDraw`, `head`, `chip`, `typeBox`, `arrow`, `emo`; namuna `examples/t01.js`). `boot({fovK:1,subY:.5})`.
- Brend nomlari TTS uchun o'zbekcha talaffuzda yozilsin: `scripts.json` da `tts_lines` (masalan Claude -> Klod).
- Kanaldagi HAR BIR postga (video, promo, boshqa) buyurtma tugmasini qo'shing: `--form-string 'reply_markup={"inline_keyboard":[[{"text":"🎬 Video buyurtma qilish (faqat buyurtma uchun)","url":"https://t.me/Jjjjjasssu"}]]}'`.
- Kanal nomi endi "AI Creator | AI yangiliklari va darslar". Pin qilingan xush kelibsiz postini o'zgartirmang.
- Kanalga `sendVideo` (`chat_id=@aicreator_n1`), ostida qisqa, maksimal tushunarli matn: 3-5 qator + savol + obuna chaqirig'i + 3-4 heshteg.
- Promo post: bugungi 18 Instagram videodan eng qiziqarlisini kanalga `sendVideo` qiling. Matn: "🔥 Bugungi yangi video! Instagramga kirib like bosing va obuna bo'lib qo'ying 👍❤️🔔" + Reels havolasi (`media_permalink`) + 😍🔥👇.

## 3. Hisobot (botga, TELEGRAM_CHAT_ID)
- Oxirida 2-3 qator: Instagram'ga nechta joylandi (nomlari va uzunliklari), kanalga nimalar chiqdi.
- Muammo bo'lsa (limit, xato), o'zingiz hal qilishga urining. Hal bo'lmasa, botga qisqa yozing: nima bo'ldi, nima qilinmadi.

## 4. Yakshanba qo'shimchasi: "Haftaning top AI vositasi"
- Faqat yakshanba kunlari (Toshkent vaqti) kanalga 1 ta qo'shimcha post: WebSearch bilan shu haftaning eng foydali/yangi AI vositasini toping (faktlarni rasmiy manbadan tekshiring).
- Format: 25-30 s video (AI qahramon bilan, `ai_lib.js`) + ostida qisqa matn: nima qiladi, kimga foydali, bepulmi/pullikmi, havola. Buyurtma tugmasi ham bo'lsin.
- Ovoz limitini tejash uchun yakshanba kuni Instagram videolarini 17 ta qiling.

## 5. So'rovnoma (har chorshanba va yakshanba)
- Chorshanba va yakshanba kunlari kanalga 1 ta so'rovnoma: `sendPoll` (`chat_id=@aicreator_n1`, `is_anonymous=true`, 3-4 variant, emojili). Mavzu: AI darslari, AI vositalar, kanal kontenti, obunachilar fikri. Har safar yangi savol (history.md ga yozib boring).
- Muhokama guruhi (`-1004470090152`, bot admin): qoidalar posti pin qilingan, uni o'zgartirmang.

## 6. Juma dayjesti (har juma)
- Juma kunlari kanalga qo'shimcha post: "📰 Haftaning 5 ta eng muhim AI yangiligi". WebSearch bilan shu haftadagi (oxirgi 7 kun) eng muhim 5 ta AI yangiligini toping, har birini rasmiy manbadan tekshiring.
- Format: chiroyli rasm (PIL, kanal uslubi: to'q ko'k fon, neon, qahramon `host.png`, "HAFTA DAYJESTI" sarlavhasi) + matn: 5 band, har biri 1-2 qator o'zbekcha + manba havolasi; oxirida savol va obuna chaqirig'i. Buyurtma tugmasi bo'lsin.
- Ovoz kerak emas (TTS limiti sarflanmaydi). Yangiliklarni history.md ga yozing, keyingi haftada takrorlamang.
