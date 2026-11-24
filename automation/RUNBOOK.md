# Kunlik avtomatik ish (har kuni 12:00, Toshkent)

MAJBURIY: HAR BIR videoda (Instagram ham, kanal ham, reklama ham) ovozga sinxron KO'K subtitr (#3db4ff, qora kontur; kalit so'z sariq) bo'lsin (lib.js `drawSub`, har gap uchun). Subtitrsiz video joylanmaydi: yuklashdan oldin kadrlarda subtitr borligini tekshiring.

Egasi hech narsa qilmaydi. Savol bermang, oxirigacha o'zingiz bajaring. Egasiga faqat Telegram botga qisqa o'zbekcha hisobot yozing.

## 0. Tayyorgarlik
- Kod: `automation/` papkasi (`ccr-be4dfb80-ltms6l` tarmog'i). Ishchi papka sifatida scratchpad'dan foydalaning: `cp -r automation/* $WORK/`.
- Kalitlar muhitda: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (egasining shaxsiy chati = hisobot), `GEMINI_API_KEY`.
- Kanal: `@aicreator_n1` (bot admin, post huquqi bor).
- Instagram: Windsor.ai connector `instagram`, akkaunt id `17841441055115940` (@jasur.ai_), action `create_video_post`.
- Skillar (faqat g'oya/ssenariy uchun, ularning blokli/Roblox vizual uslubi ISHLATILMAYDI; uslub 1.0-bo'limda): `anthropic-skills:3d-horror-videolar`, `anthropic-skills:izoh-ovoz-jangi-roblox`. CTA: like + obuna + izohdagi savol.
- `history.md` ni o'qing: u yerdagi mavzularni qaytarmang. Ish oxirida yangi mavzularni qo'shib, commit qilib push qiling.


## 0.1 Muhit eslatmalari (sinovda aniqlangan)
- Python'ni `/usr/local/bin/python3.13 -I` bilan ishga tushiring (oddiy `python3` da PIL buzuq nusxadan yuklanadi). Kerak bo'lsa: `/usr/local/bin/python3.13 -m pip install -q numpy scipy pillow`.
- Rasm va story'larda `host.png` pastki qismi tekis kesilib qolmasin: pastini gradient bilan xiralashtiring.
- `git push` da "push negotiation failed" ogohlantirishi chiqishi normal, push baribir o'tadi; URL ni `curl -sI` bilan tekshiring.

## 0.3 Egasi 2026-11-24 (kech) QAT'IY qoidalari
- **Har qanday video 40 soniyadan OSHMASIN. Uzunlik 30-40 s oralig'ida bo'lsin (30, 35, 40 s aralash, hammasi bir xil emas).** Horror ham 30-40 s (~65-85 so'z), boshqalar 30-40 s. Tayyor videoni `ffprobe` bilan tekshiring; 40 s dan oshsa matnni qisqartirib qayta yarating.
- **Horror videolardan 2 tasi** oxirida Telegram kanalni reklama qilib tugasin ("Shunday hikoyalar va AI yangiliklari uchun profildagi havola orqali Telegram kanalimizga o'ting!" + `endCard`/`subscribeBtn`). Qolgan 3 tasi odatiy cliffhanger/savol bilan tugaydi. Bu 1.1-bo'limdagi "davomi Telegramda" videosidan alohida emas: bittasi shu ikkisining ichida bo'lishi mumkin.
- **Qahramonda ko'k quloqchin/mikrofon YO'Q** (hamma videoda). `drawHost` da faqat `headset:true` berilsa chiziladi; hech qachon bermang.
- **Horror uchun yuklangan skillarni ishlating**: `anthropic-skills:qishloq-horror-2d` (2D tungi qishloq, 40-55 s -> 45 s ga qisqartiring), `anthropic-skills:3d-horror-videolar` (hikoya tuzilmasi, yovuz/joy/syujet g'oyalari). Skilldagi blokli/Roblox vizualni ISHLATILMAYDI, faqat ssenariy, struktura va g'oyalar. 5 horrordan kamida 1 tasi `qishloq-horror-2d` uslubida bo'lsin.
- **Hisobot**: Instagramga hammasi yuklangach botga QISQA matn: "Hammasi muvaffaqiyatli yuklandi (soni/reja)", yo'nalish bo'yicha videolar nomi va soniyasi (`report.py` shu shaklda). Uzun matn yozmang.

## 0.4 STRATEG TSIKLI (egasi 2026-11-24, QAT'IY; 0.2 ning o'rniga ham shu amal qiladi)
Siz 10 yillik tajribali Instagram Reels strateg, tahlilchi va prodyuserisiz. Maqsad: 30 kunda 50 000+ obunachi, har video o'rtacha 100 000 ko'rish. Har video va har kun oldingisidan yaxshi bo'lsin. Format 9:16, 30-40 s, kuniga 12 ta, o'zbekcha.
1. **JURNAL**: `history.md` ni to'liq o'qing: "Qoidalar (o'rganilgan)" bo'limidagi qoidalarga amal qiling, ishlamaganni takrorlamang.
2. **TAHLIL** (Windsor `instagram` `get_data`, `media_*` maydonlari): kechagi (24 soatdan oshgan) va oxirgi 7 kun reellari: `media_views`, `media_reel_avg_watch_time` (ms), `media_reel_skip_rate` (dastlabki 3 s da tashlab ketish %), `media_saved`, `media_shares`, `media_comments_count`, `media_like_count`, `media_reel_total_interactions`. Yangi obunachi: `follower_count_1d` (user_insights) va `followers_count` (profil, bugungi jami). Turlarni (horror / jang / Claude suhbat / kimni tanlaysiz) alohida solishtiring; tur o'rtachasi va o'rtacha ushlab turish nisbati (avg_watch_time / video uzunligi) hisoblang.
3. **DIAGNOZ**: eng yaxshi 3 va eng yomon 3 reelning sababini yozing (hook, mavzu, uzunlik, ritm, ovoz, subtitr, chaqiriq, yuklash vaqti), FAQAT raqamlarga tayanib; taxminni "faraz" deb belgilang.
4. **QAROR**: yaxshi tur/uslubni ko'paytiring, yomonini o'zgartiring (0.2-bo'limdagi 40% qoidasi). Ko'p ko'rilgan videolarda nima borligini aniqlab (hook turi, mavzu, ovoz, ritm) bugungi videolarga qo'llang.
5. **YASASH**: toza va emotsiyali ovoz (eng muhim: `style` maydoni, har gap uchun ohang), to'g'ri o'zbekcha talaffuz va imlo, o'qiladigan subtitr, birinchi 3 soniya maksimal kuchli (katta matn/raqam + ovozli zarba + harakat; `hookcheck.py` majburiy), oxirida izoh/ulashish chaqirig'i.
6. **TEKSHIRUV** (yuklashdan oldin, har video): ovoz (kesilish, shovqin, baland-pastlik), subtitr (ovozga sinxron, imlo), talaffuz, uzunlik (<=40 s), format 1080x1920, kontakt-varaq. Xato bo'lsa tuzatib qayta yarating.
7. **YUKLASH**: Windsor, qisqa sarlavha (1.-bo'lim qoidasi) + 3-5 ta mavzuga mos heshteg.
8. **JURNAL**: `history.md` ga sana, har video (mavzu/tur/uslub/uzunlik), nimani o'zgartirdingiz, faraz, KECHAGI videolarning 24 soatdan keyingi natijasi, xulosa va yangi qoida ("Qoidalar (o'rganilgan)" ga) yozing. Xato qilsangiz, sababini va qoidasini qo'shing. Commit va push.
- Qoidalar: begona musiqa/tasvir yo'q, grafik zo'ravonlik yo'q, imlo/talaffuz xatosi yo'q, natijani kafolatlamang, faqat ma'lumotga tayaning.
- **Hisobot (botga, 5 qator + raqamlar, bir marta o'qib tushunarli)**: sana; Instagram obunachilari soni (`followers_count`) va kechagi o'sish; nechta video yuklandi (soni/12); yo'nalishlar bo'yicha nomlar va soniyalar; keyin 5 qator: 1) Bugun nima qildim 2) Nima o'zgardi 3) Kechagi natija (ko'rish, ushlab turish, eng yaxshi/yomon video) 4) Xulosa 5) Ertaga nimani sinayman. `report.py` da `followers`, `followers_delta`, `lines` (5 ta) maydonlari bor. Oxirida "Hammasi tayyor, ertangi kunga tayyorman."
- **Ovoz (egasi: bugungi ovoz yaxshi, lekin har kuni oldingisidan yaxshiroq bo'lsin):** botga qo'shimcha video YUBORMANG. Ovozni o'zingiz tahlil qiling (ohang, tempo, pauza, urg'u, emotsiya, talaffuz) va har kuni bitta aniq yaxshilanish qo'llang; jurnalga yozing.
- Ovoz: har videoda emotsiya (horror: past, sekin, taranglik; jang/kimni tanlaysiz: baland energiya, tez tempo; Claude: odam hayajonli, Claude iliq). Ovoz sifati pastligi (robotlik, noto'g'ri urg'u) bo'lsa, `tts_lines` da imlo/urg'uni tuzatib qayta yarating yoki boshqa modelni sinang.

## 0.5 Instagram Story (har kuni, egasi 2026-11-24)
- Har kuni **2 ta story** (Windsor `create_story`): (1) kunning eng yaxshi/yangi Reels'idan 15-30 s qirqim (`ffmpeg -t`, 9:16, 3-60 s, MP4) yoki hook kadri + "Yangi video chiqdi, profilga kiring" matni; (2) savol/ovoz kartasi (rasm JPEG, 9:16): "A yoki B?", "Qaysi horror yoqdi?" va h.k., oxirida @jasur.ai_ va Telegram kanal havolasi eslatmasi. Har kuni story mavzusi boshqa bo'lsin.
- Story ochiq URL'dan (media papka) yuklanadi, xuddi Reels kabi. Highlights'ga qo'shishni API qilolmaydi: egasi Instagram ilovasida qo'lda qo'shadi. Story'ni O'CHIRMANG.
- Hisobotga bitta qator: "Story: 2 ta yuklandi".

## 1.1 Yangi qoidalar (egasi 2026-11-23 da tasdiqlagan, QAT'IY)
- **Horror/sirli (5 ta/kun): 2D flat-vector uslub**, uzunligi **30-40 s** (kerak: ~65-85 so'z), AI ovoz. Dvigatel: `lib2d.js` (+ `page2d.html`, `render2d.js` o'rniga `render.js` ni `page2d.html` bilan ishlating: `node render2d.js vNN sheet|full`). Namuna: `examples/h01_2d_horror.js` ("RAQAMIM"). Doimiy hikoyachi qahramon `drawHost` (nomi Jasur, SOQOLSIZ — egasi talabi), pastda @jasur.ai_, subtitr ko'k, kalit so'z (`kw`) sariq, UI maketlari (telefon `scenePhone`, CCTV `cctv`, taymer, TV ogohlantirish, xarita — kerak bo'lsa `lib2d.js` ga qo'shing), "sen/men" hikoyasi, vaqt/raqam bilan hook, oxirida cliffhanger.
- Ovoz uchun kadrlar ro'yxati: `ENVA` (ovoz amplitudasi, `env.json`) bilan qahramon og'zi harakatlanadi: har horror uchun `h01` dagi kabi `env.json` yarating.
- **Telegram voronkasi (har kuni):**
  1. Horrorlardan **1 tasi** eng qiziq joyda uziladi: oxirida "Davomi Telegram kanalimizda!" (`endCard`) + "OBUNA BO'LINDI ✓" (`subscribeBtn`). Shu kuni kanalga uning DAVOMI/YAKUNI joylanadi (matn 6-10 gap + videodan kadr rasmi), tugma bilan.
  2. A yoki B savol-javoblardan **1 tasi**: oxirida "Natija Telegram kanalimizda!". Shu kuni kanalga o'sha savol `sendPoll` (anonim, A va B variant) bilan joylanadi: kanalga kirgan odam ovoz beradi va natijani ko'radi.
  3. **AI yangilik videolari (Instagram 2 + kanal 2)**: oxirida Telegram kanalimiz reklamasi ("Har kuni AI yangiliklari va darslar, profildagi havola").
- A yoki B savol-javob: 2D (`tmpl2d_ab.js`), VS ekrani, 30-40 s, oxirida "Siz qaysi birini tanlaysiz? Izohda A yoki B yozing". Mavzu: umumiy + o'zbek hayotiga yaqin aralash, har kuni oldingidan qiziqarliroq (history.md ni tekshiring).
- **Kanal reklamasi videolari (1 ta/kun; to'g'ridan-to'g'ri 'xizmat sotish' reklamasi qilmang: tomoshabin tashlab ketadi, reklama hikoya ichida bo'lsin)**: 2D, 20-26 s, namuna `examples/r01_ad_2d.js` (hook mavzusi har kuni yangi: 1 kunlik prezident/milliarder/robot..., siyosatchi va partiyasiz; keyin qahramon `drawHost` pastda, `igProfile` (havola), `tgChannelCard`, `subscribeBtn`). Ovoz turi `fun`. Matn: hook, shunday videolar kerakmi/yasashni o'rganasizmi, profildagi havola -> Telegram, AI bilan pul ishlash/video yasash/AI yangiliklari, obuna+like+fikr.
- Barcha videolar `reference_analysis.md` talablariga mos bo'lsin (hook, UI maketlari, doimiy qahramon, cliffhanger).

## 1.0 USLUB QOIDASI (egasi 2026-11-23, QAT'IY)
- **Roblox / blokli (kubik) uslub BUTUNLAY TAQIQLANGAN.** Faqat: (1) 2D flat-vector (`lib2d.js`) yoki (2) 3D Pixar-uslubidagi qahramon rasmi (`host.png`, AI yangilik videolarida). `lib.js` dagi blokli 3D sahnalari (`drawChar`, `room`...) ishlatilmaydi; `examples/v01-v10.js` ESKI blokli videolar edi: nusxa olmang.
- AI yangilik videolari (Instagram va kanal): `host.png` (3D rasm qahramon) + `ai_lib.js` kartalari.

## 0.2 Kecha natijasi -> bugungi tarkib (har kuni, ishni boshlashdan oldin)
- Windsor `instagram` `get_data` (maydonlar: `timestamp`, `media_permalink`, `media_views`, `media_reach`, `media_like_count`, `media_comments_count`, `media_shares`, `media_saved`; oxirgi 2-3 kun, story'siz) bilan kechagi/oldingi reellar natijasini oling. Skip foizi mavjud emas: ko'rish, izoh, ulashish, saqlash bilan baholang. Reel turini `history.md` dagi tartibdan toping (yuklash vaqti tartibi).
- `history.md` ga har reel uchun bitta qator yozing: nom | tur | uslub | ko'rish | like | izoh | ulashish. Har turning o'rtacha ko'rishini hisoblang.
- Qoida: turning o'rtacha ko'rishi umumiy o'rtachaning 40% idan past bo'lsa va 2 kun ketma-ket shunday bo'lsa, uni 1 taga kamaytiring va eng yaxshi tur (ko'rish+izoh+ulashish) ni 1 taga ko'paytiring. Jami 18 dan oshmasin. O'zgarishni hisobotga yozing.
- Tomoshabin tashlab ketgan uslublar (past ko'rish) takrorlanmasin: bir xil sahna/qahramon pozasi/hook 2 kun qaytmasin.

## 1.1b Sifat qoidalari (2026-11-24 tahlilidan)
- Instagram'ga yuboriladigan video bitreyti kamida ~3 Mbit/s bo'lsin (crf <= 23). Kecha crf 27 (0.6-0.9 Mbit/s) ishlatildi: tasvir xiralashdi. Repo hajmini tejash uchun media papkasini har kuni tozalang (git rm), bitrayt pastlatmang.
- **Har reelda bitta asosiy harakat chaqirig'i** (izohda A/B yozing, davomi Telegramda, saqlang yoki ulashing) + qisqa like/obuna. Serial qismlari o'zi tushunarli bo'lsin, "oldingi qismda..." bilan boshlanmasin.
- **Qahramon ko'zi doim ko'rinsin** (qorachiq bilan). `drawHost` da `look` faqat raqam (-1..1); rang palitrasi `pal` orqali beriladi. Kontakt-varaqda ko'zsiz (oq doira yoki bo'sh) qahramon bo'lsa, tuzatmasdan joylamang.
- Matn (hook, sarlavha, variant nomi) ekran kengligiga sig'sin: uzun matnni avtomatik kichraytiring (A yoki B hook'i kecha kesilib qolgan).
- Horror 2D: bitta joyda (masalan faqat zinapoya) o'tmasin: kamida 4 xil sahna/ob'ekt (xona, telefon/ekran, koridor, tashqari...), hikoyachi qahramon kamida 5 kadrda ko'rinsin.
- Claude suhbat 3 videosi bir-biriga o'xshamasin: har birida boshqa joy (ofis, shifoxona, uy, auditoriya...), boshqa qo'shimcha ob'ektlar.
- AI yangilik: birinchi kadrda aniq natija/raqam/savol ("1 mln token narxi 5 baravar tushdi!"), faqat nom emas.

## 1.3 Claude suhbat videosi qoidalari
- **Claude qahramoni** = pikselli apelsin-rang qisqichbaqa (`claude.png`, `drawClaude2d` shunga mos chizadi: ikkita qora kvadrat ko'z, yon qo'llar, 4 oyoq). Boshqa shaklda chizmang. Sahna `SPEC.scene` bilan (`desk` yoki `space`; yangi sahnalarni `tmpl2d_claude.js` ga qo'shing). Namuna: `examples/claude_space_spec.json` (kosmik stantsiya, kislorod).
- Qahramon: egasi yuborgan rasm `claude.png` (agar yo'q bo'lsa `drawClaude2d`). Har safar BOSHQA muhit (ofis, shifoxona, maktab, kosmos, oshxona...), BOSHQA muammo, BOSHQA stil; odam qahramoni va kasbi ham har kuni yangi.
- **Video o'rtasida (taxminan 40-60% da)** Claude to'xtaydi: "To'xtang! Davom etishdan oldin Telegram kanalimizga o'tib oling, u yerda AI yangiliklari va darslar bor!" va hikoya davom etadi.
- **Oxirida**: "Sizga ham shunday videolar, slayd yasash yoki AI yangiliklari kerak bo'lsa, profildagi havola orqali Telegram kanalimizga o'ting!" + obuna/like.

## 1.4a Tayyor shablonlar (sinovdan o'tgan, 2026-11-24)
- `tmpl2d_battle.js` (+`examples/battle_spec_example.json`): izoh=ovoz jang. `tmpl2d_choice.js` (+`examples/choice_spec_example.json`): poyezd dilemmasi; boshqa dilemma/taqqoslash (Ronaldo-Messi va h.k.) uchun yangi sahna yozing (`sceneTracks` o'rniga), qolgan tuzilma bir xil. `examples/h2d_camp_horror.js`: yangi joy/stil horror namunasi (`sceneCamp`, `sceneTentIn`). Horror uchun HAR KUNI yangi sahna funksiyalari yozing (joy, muhit, rang, stil boshqa bo'lsin).
- TTS: `tts.py` 4 ta modelni sinaydi (3.8-flash, 2.5-flash, 3.8-flash-lite, 3.1-flash-preview); barchasi Algenib ovozi.

## 1.4 Kimni tanlaysiz (2 ta/kun) va izoh=ovoz jang (3 ta/kun)
- **Egasi 2026-11-24 javoblari (QAT'IY):** "Kimni tanlaysiz" mavzulari xilma-xil bo'lsin (pul yoki do'st, ona yoki sevgan, kasb tanlash, futbol va h.k.), faqat poyezd emas. Futbolchilar (Ronaldo/Messi va h.k.) YUZsiz chiziladi, lekin tomoshabin tanishi uchun forma ranglari va raqami (Ronaldo: qizil-yashil Portugaliya 7; Messi: ko'k-oq Argentina 10), ism yozuvi bilan. Jadval/dilemma qahramoni: bizning Jasur (`drawHost`), chopon/do'ppi emas.
- **Ovoz professional bo'lsin:** `scripts.json` da har video uchun `"style"` maydoni (inglizcha ovoz yo'riqnomasi, masalan horror: "slow, low, tense, whispery narrator"; kimni tanlaysiz va jang: "energetic, excited announcer"; Claude suhbat: odam hayajonli, Claude xotirjam va iliq). `tts.py` uni matn oldiga qo'shadi. Ovoz Algenib (yoki 3.1 modelda ishlaydigan eng yaxshi variant) qoladi.
- **Instagram'dagi hech bir videoni egasining ruxsatisiz O'CHIRMANG** (qat'iy taqiq).
- Kimni tanlaysiz: kuchli hissiy yoki futbol/pop-madaniyat dilemmasi (poyezd oldida sevgan qiz va ona; Ronaldo yoki Messi; 1 mln yoki do'st...). Zo'ravonlik/qon ko'rsatilmaydi, siyosat/din yo'q. Oxirida "Siz kimni tanlaysiz? Izohda yozing, obuna bo'ling, like bosing".
- Izoh=ovoz jang: 8 ishtirokchi kartasi birma-bir ochiladi, "1 izoh = 1 ovoz", "do'stingizni chaqiring", "faqat 3 tasi finalga chiqadi", oxirida 3 tugma. Namuna tuzilma: `izoh-ovoz-jangi-roblox` skill jadvali (faqat jadval, vizual uslub 2D).

## 1.2 Shablonlar va xavfsizlik qoidalari (sinovdan o'tgan)
- **A yoki B** (`tmpl2d_ab.js`, 2D flat-vector, `render2d.js`): `vNN/spec.json` ({A:{label,emoji},B:{label,emoji},roles:[har gap uchun hook|A|B|choose|comment|natija|cta],hookBig}) va `scripts.json` (type fun) yarating; `cp tmpl2d_ab.js vNN.js`. Namuna: `examples/ab_spec_example.json`. Matn 75-85 so'z (30-38 s). `roles` dagi `natija` faqat 1 ta videoda ("Natija Telegram kanalimizda!"), qolganlarida o'rniga `comment`. SAXTA foiz/natija ko'rsatmang.
- **Claude suhbat** (`tmpl2d_claude.js`, 2D flat-vector, `render2d.js`; Claude personaji `drawClaude2d`, stol `deskBack`/`deskFront`; odam `drawHost` + `look:{hood,hair,skin}` bilan har kuni boshqa ko'rinish): `spec.json` ({speakers:["H","C",..],moods:[...],look,shirt,wide:[...],hookBig,hookSub,alert}); `scripts.json`da `"dialog":true,"speakers":["Q"/"C",...]` (Q = odam Algenib, C = Claude Kore; multi-speaker TTS faqat gemini-2.5-flash-preview-tts da ishlaydi, 3.8 da 400 xato beradi). Namuna: `examples/claude_spec_example.json`. Matn 75-90 so'z (35-45 s).
- **Birinchi 3 soniya testi (majburiy)**: har video tayyor bo'lgach `python3 hookcheck.py final.mp4`. "HOOK MUAMMO" chiqsa, birinchi shotni kuchaytiring (katta matn/raqam, tez harakat, ovozli zarba) va qayta render qiling. 1-kadr hech qachon qora/bo'sh bo'lmasin.
- **Sahna sinovi (majburiy)**: har videoning `node render.js vNN sheet` kontakt-varag'ini ko'ring; qahramon ko'rinmasa, matn kesilsa yoki kadr bo'sh bo'lsa, tuzating.
- **Xato tutish**: bitta video 2 urinishda chiqmasa uni o'tkazib yuboring va hisobotga yozing; butun ishni to'xtatmang. TTS 400 xatosi: boshqa modelga o'ting (`tts.py` o'zi qiladi). Kunlik TTS limiti tugasa `tts.py` 08:00 UTC gacha (<=2 soat) kutadi.
- Ovoz uzunligi nishoni: 1 so'z ~0.45 s (pauzalar bilan). Horror 65-85 so'z (30-40 s).

## 1. Instagram: 18 ta video (avval shu)
- Talablar: `instagram_prompt.md` (qat'iy).
- Trend: boshlashdan oldin WebSearch bilan shu haftaning Instagram Reels / TikTok trendlarini (formatlar, hook'lar, mavzular, O'zbekiston va dunyo bo'yicha) qidiring va bugungi 18 ta mavzuni ularga moslang. Har kuni mavzu, hook, shablon va vizual uslub yangi bo'lsin; history.md dagilarni takrorlamang.
- **Tarkib (Instagram'ga KUNIGA 12 ta Reels, egasi 2026-11-24 da belgilagan, QAT'IY):** (1) horror/sirli hikoya **5** — har safar boshqa mavzu, joy, muhit va uslub, shablon takrorlanmasin; (2) **"izoh = ovoz" jang-jadval 3** (`tmpl2d_battle.js`, har safar boshqa qiziqarli mavzu: telefonlar, o'yinlar, multfilmlar, taomlar, futbolchilar, mashinalar...); (3) **Claude AI bilan suhbat 2** (Claude qahramon rasmi `claude.png`, har safar boshqa muhit/muammo/uslub; video o'rtasida va oxirida kanal reklamasi, 1.3-bo'lim); (4) **"kimni tanlaysiz" 2** (`tmpl2d_choice.js`: dilemma yoki Ronaldo-Messi turidagi qiziqarli taqqoslash). A yoki B, alohida reklama reeli va Instagram uchun AI yangilik videolari ENDI YO'Q. Telegram kanal uchun (2 AI yangilik, horror davomi, so'rovnoma, promo, story) o'zgarishsiz. Natija tahlili asosida tarkib 0.2-bo'limga ko'ra moslanadi.
- Ish tartibi har video uchun: `scripts.json` -> `python3 tts.py vNN` -> `python3 prep.py vNN` -> `python3 check.py vNN` -> `vNN.js` sahna (namunalar: `examples/v01.js`...`v10.js`; `lib.js` dagi set/prop/overlay funksiyalari) -> `node render.js vNN sheet` + kontakt-varaqni ko'rib tuzatish -> `node render.js vNN full` -> `python3 mix.py vNN` -> ffmpeg mux (`-c copy -movflags +faststart`) -> `final.mp4`.
- 3 ta videoni parallel render qiling.
- TTS kalitlari: `GEMINI_API_KEY` va zaxira `GEMINI_API_KEY_2` (muhitda bo'lsa; boshqa Google loyihasidan). `tts.py` birinchi kalit kunlik limiti tugasa o'zi ikkinchisiga o'tadi. Har ikki kalitning limiti tugasa, qolganini qilmang va hisobotda ayting.
- TTS limiti: har model uchun kuniga ~10 so'rov (jami ~20). 18 Instagram + 2 kanal uchun so'rovlarni tejang, qayta yozdirmang. Limit tugasa, qolganini qilmasdan hisobotda ayting.
- Joylash (ochiq URL): bitta `media` tarmog'idan foydalaning va uni har kuni yangidan, tarixsiz yozing: `git checkout --orphan media-tmp && git rm -rfq --cached . && git add vNN.mp4 story.jpg ... && git commit -m media && git push -f origin HEAD:media` (eski videolar shu bilan o'chadi, ombor kattalashmaydi). URL: `https://raw.githubusercontent.com/jasurhoshimov007-cell/video-yuklash/media/vNN.mp4`. Yangi videolar qo'shilganda shu tarmoqqa oddiy commit + push qiling. Agar `media` ga push rad etilsa, sessiyaning o'z ishchi tarmog'iga `media/` papka qilib push qiling va hisobotda ayting.
- Instagram'ga `create_video_post` bilan yuklang: `caption` MAJBURIY va qisqa: **1-qator hook (video boshidagi savol/jumla) + 2-qator bitta aniq harakat chaqirig'i** (masalan "Izohda A yoki B yozing 👇", "Davomi Telegramda, havola profilda"). Sarlavha-nom, heshteg va uzun matn YO'Q. `share_to_feed: true`, `thumb_offset: 1500`. Har video tayyor bo'lishi bilan yuklang.
- Agar chaqiruv 60 s da timeout bo'lsa, QAYTA YUBORMANG: avval `get_data` (fields `media_id`, `media_permalink`, date_preset `last_3dT`) bilan chiqqanini tekshiring.
- Tarmoq o'chirish kerak emas (`git push --delete` bu muhitda taqiqlangan); ertasi kuni `media` force-push bilan tozalanadi.

## 1.5 YouTube Shorts — O'CHIRILGAN (egasi 2026-11-23: YouTube kerak emas). BU BO'LIMNI BAJARMANG, YouTube'ga yuklamang, hisobotga youtube bloki qo'shmang.
- **MUHIM: Instagram yuklash BIRINCHI va ASOSIY. YouTube xato bersa (limit, rate-limit), Instagram ishiga TA'SIR QILMASIN: Instagram'ni to'liq tugating, YouTube'ni keyin urinib ko'ring, chiqmasa o'tkazib yuboring.** Egasi shu YouTube kanalga (Gray Docket) yuklashni tasdiqlagan.
- Windsor `youtube` connector (hisob id `get_connectors` dan oling; hozir ferangiz557@gmail.com = `117889`, eski monetyoutube9 = `114580`), action `upload_video` (params: `video_url`, `title`<=100, `made_for_kids:false`, `privacy_status:"public"`, `description`, `tags`, `category_id:"22"`). Video ochiq URL'dan olinadi (xuddi Instagram kabi `media` tarmog'i; YouTube yuklashlari tugamaguncha tarmoqni yangilamang), hajmi <=100 MB.
- Yuklanadigan: Instagram'ga joylangan 18 ta video (+ kanal uchun 2 ta AI yangilik videosi ham bo'lsa). Har video: sarlavha = video nomi (kichik harfda chiroyli) + " #Shorts"; tavsif = 1-2 gap qiziqtiruvchi matn + "Telegram kanal: https://t.me/aicreator_n1" + 6-8 heshteg (#Shorts #uzbek #...); teglar 5-8 ta.
- YouTube tezlik cheklovi (rate limit) bo'lsa: 60-90 s kuting va qayta urining (3 martagacha); "tekshiring: oldingi urinish tugagan bo'lishi mumkin" deyilsa, avval `get_data` (youtube, video maydonlari) bilan yuklanganini tekshiring, takror yuklamang. Baribir chiqmasa o'tkazib yuboring va hisobotga yozing.
- Natijani `report.json` ga `"youtube":{"plan":N,"done":[nomlar],"failed":[nomlar]}` qilib yozing.
- Eslatma: tasdiqlanmagan API loyihalari yuklagan videolarni YouTube yopiq (private) qilib qo'yishi mumkin; hisobotda "public/private" holatini yozing.

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
