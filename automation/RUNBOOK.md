# Kunlik avtomatik ish (har kuni 12:00, Toshkent)

MAJBURIY: HAR BIR videoda (Instagram ham, kanal ham, reklama ham) ovozga sinxron KO'K subtitr (#3db4ff, qora kontur; kalit so'z sariq) bo'lsin (lib.js `drawSub`, har gap uchun). Subtitrsiz video joylanmaydi: yuklashdan oldin kadrlarda subtitr borligini tekshiring.

Egasi hech narsa qilmaydi. Savol bermang, oxirigacha o'zingiz bajaring. Egasiga faqat Telegram botga qisqa o'zbekcha hisobot yozing.

## 0. Tayyorgarlik
- Kod: `automation/` papkasi (`ccr-be4dfb80-ltms6l` tarmog'i). Ishchi papka sifatida scratchpad'dan foydalaning: `cp -r automation/* $WORK/`.
- Kalitlar muhitda: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (egasining shaxsiy chati = hisobot), `GEMINI_API_KEY`.
- Kanal: `@aicreator_n1` (bot admin, post huquqi bor).
- Instagram: Windsor.ai connector `instagram`, akkaunt id `17841441055115940` (@jasur.ai_), action `create_video_post`.
- Skillar: horror uchun `anthropic-skills:3d-horror-videolar`, qiziqarli uchun `anthropic-skills:izoh-ovoz-jangi-roblox` (CTA: like + obuna + izohdagi savol).
- `history.md` ni o'qing: u yerdagi mavzularni qaytarmang. Ish oxirida yangi mavzularni qo'shib, commit qilib push qiling.


## 0.1 Muhit eslatmalari (sinovda aniqlangan)
- Python'ni `/usr/local/bin/python3.13 -I` bilan ishga tushiring (oddiy `python3` da PIL buzuq nusxadan yuklanadi). Kerak bo'lsa: `/usr/local/bin/python3.13 -m pip install -q numpy scipy pillow`.
- Rasm va story'larda `host.png` pastki qismi tekis kesilib qolmasin: pastini gradient bilan xiralashtiring.
- `git push` da "push negotiation failed" ogohlantirishi chiqishi normal, push baribir o'tadi; URL ni `curl -sI` bilan tekshiring.

## 1.1 Yangi qoidalar (egasi 2026-11-23 da tasdiqlagan, QAT'IY)
- **Horror/sirli (5 ta/kun): 2D flat-vector uslub**, uzunligi **40-50 s** (kerak: ~90-100 so'z), AI ovoz. Dvigatel: `lib2d.js` (+ `page2d.html`, `render2d.js` o'rniga `render.js` ni `page2d.html` bilan ishlating: `node render2d.js vNN sheet|full`). Namuna: `examples/h01_2d_horror.js` ("RAQAMIM"). Doimiy hikoyachi qahramon `drawHost` (nomi Jasur, SOQOLSIZ — egasi talabi), pastda @jasur.ai_, subtitr ko'k, kalit so'z (`kw`) sariq, UI maketlari (telefon `scenePhone`, CCTV `cctv`, taymer, TV ogohlantirish, xarita — kerak bo'lsa `lib2d.js` ga qo'shing), "sen/men" hikoyasi, vaqt/raqam bilan hook, oxirida cliffhanger.
- Ovoz uchun kadrlar ro'yxati: `ENVA` (ovoz amplitudasi, `env.json`) bilan qahramon og'zi harakatlanadi: har horror uchun `h01` dagi kabi `env.json` yarating.
- **Telegram voronkasi (har kuni):**
  1. Horrorlardan **1 tasi** eng qiziq joyda uziladi: oxirida "Davomi Telegram kanalimizda!" (`endCard`) + "OBUNA BO'LINDI ✓" (`subscribeBtn`). Shu kuni kanalga uning DAVOMI/YAKUNI joylanadi (matn 6-10 gap + videodan kadr rasmi), tugma bilan.
  2. A yoki B savol-javoblardan **1 tasi**: oxirida "Natija Telegram kanalimizda!". Shu kuni kanalga o'sha savol `sendPoll` (anonim, A va B variant) bilan joylanadi: kanalga kirgan odam ovoz beradi va natijani ko'radi.
  3. **AI yangilik videolari (Instagram 2 + kanal 2)**: oxirida Telegram kanalimiz reklamasi ("Har kuni AI yangiliklari va darslar, profildagi havola").
- A yoki B savol-javob: blokli 3D (`lib.js`), vs ekrani, foiz chizig'i, 30-40 s, oxirida "Siz qaysi birini tanlaysiz? Izohda A yoki B yozing". Mavzu: umumiy + o'zbek hayotiga yaqin aralash, har kuni oldingidan qiziqarliroq (history.md ni tekshiring).
- **Kanal reklamasi videolari (3 ta/kun)**: 2D, 20-26 s, namuna `examples/r01_ad_2d.js` (hook mavzusi har kuni yangi: 1 kunlik prezident/milliarder/robot..., siyosatchi va partiyasiz; keyin qahramon `drawHost` pastda, `igProfile` (havola), `tgChannelCard`, `subscribeBtn`). Ovoz turi `fun`. Matn: hook, shunday videolar kerakmi/yasashni o'rganasizmi, profildagi havola -> Telegram, AI bilan pul ishlash/video yasash/AI yangiliklari, obuna+like+fikr.
- Barcha videolar `reference_analysis.md` talablariga mos bo'lsin (hook, UI maketlari, doimiy qahramon, cliffhanger).

## 1.2 Shablonlar va xavfsizlik qoidalari (sinovdan o'tgan)
- **A yoki B** (`tmpl_ab.js`, blokli 3D): `vNN/spec.json` ({A:{label,emoji},B:{label,emoji},roles:[har gap uchun hook|A|B|choose|comment|natija|cta],hookBig}) va `scripts.json` (type fun) yarating; `cp tmpl_ab.js vNN.js`. Namuna: `examples/ab_spec_example.json`. Matn 75-85 so'z (30-38 s). `roles` dagi `natija` faqat 1 ta videoda ("Natija Telegram kanalimizda!"), qolganlarida o'rniga `comment`. SAXTA foiz/natija ko'rsatmang.
- **Claude suhbat** (`tmpl_claude.js`, blokli 3D): `spec.json` ({speakers:["H","C",..],moods:[...],look,shirt,wide:[...],hookBig,hookSub,alert}); `scripts.json`da `"dialog":true,"speakers":["Q"/"C",...]` (Q = odam Algenib, C = Claude Kore; multi-speaker TTS faqat gemini-2.5-flash-preview-tts da ishlaydi, 3.8 da 400 xato beradi). Namuna: `examples/claude_spec_example.json`. Matn 75-90 so'z (35-45 s).
- **Birinchi 3 soniya testi (majburiy)**: har video tayyor bo'lgach `python3 hookcheck.py final.mp4`. "HOOK MUAMMO" chiqsa, birinchi shotni kuchaytiring (katta matn/raqam, tez harakat, ovozli zarba) va qayta render qiling. 1-kadr hech qachon qora/bo'sh bo'lmasin.
- **Sahna sinovi (majburiy)**: har videoning `node render.js vNN sheet` kontakt-varag'ini ko'ring; qahramon ko'rinmasa, matn kesilsa yoki kadr bo'sh bo'lsa, tuzating.
- **Xato tutish**: bitta video 2 urinishda chiqmasa uni o'tkazib yuboring va hisobotga yozing; butun ishni to'xtatmang. TTS 400 xatosi: boshqa modelga o'ting (`tts.py` o'zi qiladi). Kunlik TTS limiti tugasa `tts.py` 08:00 UTC gacha (<=2 soat) kutadi.
- Ovoz uzunligi nishoni: 1 so'z ~0.45 s (pauzalar bilan). Horror 90-100 so'z (45-50 s).

## 1. Instagram: 18 ta video (avval shu)
- Talablar: `instagram_prompt.md` (qat'iy).
- Trend: boshlashdan oldin WebSearch bilan shu haftaning Instagram Reels / TikTok trendlarini (formatlar, hook'lar, mavzular, O'zbekiston va dunyo bo'yicha) qidiring va bugungi 18 ta mavzuni ularga moslang. Har kuni mavzu, hook, shablon va vizual uslub yangi bo'lsin; history.md dagilarni takrorlamang.
- Tarkib (jami 18, egasi 2026-11-23 da belgilagan): horror/sirli hikoya 5; Claude AI bilan suhbat-video 3; Telegram kanal reklamasi 3; qiziqarli "A yoki B" savol-javob / ovoz jangi 5; AI yangilik 2. Telegram kanal uchun alohida: AI yangilik videosi 2 (Instagram'ga emas). Namunalar tahlili: `reference_analysis.md` (qat'iy bajaring).
- Ish tartibi har video uchun: `scripts.json` -> `python3 tts.py vNN` -> `python3 prep.py vNN` -> `python3 check.py vNN` -> `vNN.js` sahna (namunalar: `examples/v01.js`...`v10.js`; `lib.js` dagi set/prop/overlay funksiyalari) -> `node render.js vNN sheet` + kontakt-varaqni ko'rib tuzatish -> `node render.js vNN full` -> `python3 mix.py vNN` -> ffmpeg mux (`-c copy -movflags +faststart`) -> `final.mp4`.
- 3 ta videoni parallel render qiling.
- TTS kalitlari: `GEMINI_API_KEY` va zaxira `GEMINI_API_KEY_2` (muhitda bo'lsa; boshqa Google loyihasidan). `tts.py` birinchi kalit kunlik limiti tugasa o'zi ikkinchisiga o'tadi. Har ikki kalitning limiti tugasa, qolganini qilmang va hisobotda ayting.
- TTS limiti: har model uchun kuniga ~10 so'rov (jami ~20). 18 Instagram + 2 kanal uchun so'rovlarni tejang, qayta yozdirmang. Limit tugasa, qolganini qilmasdan hisobotda ayting.
- Joylash (ochiq URL): bitta `media` tarmog'idan foydalaning va uni har kuni yangidan, tarixsiz yozing: `git checkout --orphan media-tmp && git rm -rfq --cached . && git add vNN.mp4 story.jpg ... && git commit -m media && git push -f origin HEAD:media` (eski videolar shu bilan o'chadi, ombor kattalashmaydi). URL: `https://raw.githubusercontent.com/jasurhoshimov007-cell/video-yuklash/media/vNN.mp4`. Yangi videolar qo'shilganda shu tarmoqqa oddiy commit + push qiling. Agar `media` ga push rad etilsa, sessiyaning o'z ishchi tarmog'iga `media/` papka qilib push qiling va hisobotda ayting.
- Instagram'ga `create_video_post` bilan yuklang: `caption` BO'SH (nom/heshteg yo'q), `share_to_feed: true`, `thumb_offset: 1500`. Har video tayyor bo'lishi bilan yuklang.
- Agar chaqiruv 60 s da timeout bo'lsa, QAYTA YUBORMANG: avval `get_data` (fields `media_id`, `media_permalink`, date_preset `last_3dT`) bilan chiqqanini tekshiring.
- Tarmoq o'chirish kerak emas (`git push --delete` bu muhitda taqiqlangan); ertasi kuni `media` force-push bilan tozalanadi.

## 2. Telegram kanal: 2 ta video + 1 promo post (Instagram'dan keyin)
- Mavzular: AI yangiliklari, AI bilan video yasashni o'rgatish, AI bilan qilingan ishlar, blog. Bugungi eng dolzarb AI yangiligini WebSearch bilan toping. Faktlar to'g'ri bo'lsin.
- Format: 25-30 s, o'zbekcha, 9:16, motion grafika + 3D fon, pastda AI qahramon `host.png` (har videoda albatta), har gapdan keyin qimirlaydi (`ai_lib.js`: `aiShot`, `hostDraw`, `head`, `chip`, `typeBox`, `arrow`, `emo`; namuna `examples/t01.js`). `boot({fovK:1,subY:.5})`.
- Brend nomlari TTS uchun o'zbekcha talaffuzda yozilsin: `scripts.json` da `tts_lines` (masalan Claude -> Klod).
- Kanaldagi HAR BIR postga (video, promo, boshqa) buyurtma tugmasini qo'shing: `--form-string 'reply_markup={"inline_keyboard":[[{"text":"🎬 Video buyurtma qilish (faqat buyurtma uchun)","url":"https://t.me/Jjjjjasssu"}]]}'`.
- Kanal nomi endi "AI Creator | AI yangiliklari va darslar". Pin qilingan xush kelibsiz postini o'zgartirmang.
- Kanalga `sendVideo` (`chat_id=@aicreator_n1`), ostida qisqa, maksimal tushunarli matn: 3-5 qator + savol + obuna chaqirig'i + 3-4 heshteg.
- Promo post: bugungi 18 Instagram videodan eng qiziqarlisini kanalga `sendVideo` qiling. Matn: "🔥 Bugungi yangi video! Instagramga kirib like bosing va obuna bo'lib qo'ying 👍❤️🔔" + Reels havolasi (`media_permalink`) + 😍🔥👇.

## 3. Hisobot (botga, TELEGRAM_CHAT_ID) — QAT'IY SHAKL
- Hisobotni FAQAT `report.py` bilan yuboring (matnni qo'lda yozib curl bilan yubormang): ish oxirida `report.json` yarating va `python3 report.py report.json` ni ishga tushiring. Shakl namunasi: `python3 report.py --preview --print`.
- Tuzilma: sarlavha (✅/⚠️/❌) -> 📱 Instagram (soni, tur bo'yicha raqamlangan ro'yxat: NOM — soniya) -> 📢 Telegram kanal (raqamlangan) -> 🚫 bajarilmagan ishlar -> ⚠️ muammolar va qanday hal qilingani -> yakuniy gap. Har blok bo'sh qatordan ajratilgan, matn tiqilib qolmasin.
- Instagram ro'yxatida har videoning nomi va uzunligi (soniya) bo'lsin; nomlar qisqa va BOSH HARFDA.
- Ish davomida jiddiy muammo bo'lib hal bo'lmasa (masalan Instagram uzildi, limit tugadi), darhol botga shu uslubda qisqa xabar yuboring (⚠️ sarlavha, nima bo'ldi, nima qilinmadi).
- Muammo bo'lsa (limit, xato), o'zingiz hal qilishga urining. Hal bo'lmasa, botga yozing.

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

## 7. Shanba: bepul sovg'a (har shanba)
- Shanba kunlari kanalga 1 ta yangi bepul sovg'a PDF (pin qilinmaydi). Har hafta boshqa mavzu: masalan AI bilan rasm promptlari, Reels hook'lari to'plami, AI bilan pul ishlash g'oyalari, bepul AI vositalar ro'yxati, ChatGPT/Claude ish promptlari, kontent-reja shabloni. Avvalgilarini history.md dan tekshiring, takrorlamang.
- Format: 4-6 betlik A4 PDF (HTML + Playwright `page.pdf`), kanal uslubida (to'q ko'k, neon, qahramon `host.png`, oxirgi betda kanal havolasi va buyurtma kontakti). Namuna: 2026-11-22 dagi "AI bilan video yasash uchun 10 ta tayyor prompt".
- `sendDocument` + muqova thumbnail + qisqa matn (ichida nima bor, ulashish va obunaga chaqiruv, izoh uchun savol) + buyurtma tugmasi. Ma'lumotlar aniq va foydali bo'lsin.

## 8. Instagram story (har kuni, kanal postlaridan keyin)
- Har kuni 1 ta 9:16 story (1080x1920 JPEG, PIL, kanal uslubida: to'q ko'k/binafsha fon, neon, qahramon `host.png`): "TELEGRAM KANALIMIZDA" + bugungi kanaldagi eng qiziqarli narsa (video mavzusi, sovg'a, so'rovnoma, dayjest) + sariq "Profildagi havola" tugma-yozuvi. Har kuni matn boshqacha.
- Rasmni `media` tarmog'iga qo'shing va Windsor `create_story` (`image_url`) bilan joylang. API orqali bosiladigan havola-stiker qo'yib bo'lmaydi, shuning uchun "profildagi havola" deb yozing.
- Kanal FAQ posti (2026-11-22) bor, takrorlamang.
