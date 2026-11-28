# Instagram soatlik yuklash jadvali (2026-11-28 dan)

Egasi talabi: 2026-11-29 dan boshlab Instagram'ga har kuni **05:00 dan 16:00 gacha har soatda 1 ta Reels** (kuniga 12 ta), Toshkent vaqti.

## Qanday ishlaydi
Bitta jadval vazifasi — **"AI Creator kunlik videolar"** (Windsor ulanishi shu vazifada) — har kuni Toshkent vaqti bilan
04:58, 05:58, ... 16:58 da ishga tushadi (13 marta). Ishga tushgach soat +30 daqiqa bilan yaxlitlanadi (SLOT):

| SLOT | Nima qiladi |
|---|---|
| 5 … 16 | **Soatlik yuklash**: `automation/queue/<bugungi sana>.json` dan shu slot videosini `create_video_post` bilan yuklaydi (video ~HH:00 da chiqadi). Elementda `tg_after` bo'lsa, Telegram kanalga davom/so'rovnoma postini yuboradi. Muammo bo'lsagina botga ⚠️ xabar. |
| 17 | **Kunlik ish** (RUNBOOK): tahlil, ERTANGI 12 ta videoni yasash, `media/` ga push (commit SHA URL), `automation/queue/<ertangi sana>.json` navbat fayli, kanal postlari, story, izohlarga javob, hisobot. |

Kunlik ish 17:00 da: Gemini TTS kunlik limiti 13:00 (Toshkent) da yangilanadi, shuning uchun bir kunda faqat bitta video to'plami yasaladi va u ertasi kuni ertalabdan yuklanadi.

## Navbat fayli (`ccr-be4dfb80-ltms6l` tarmog'i, `automation/queue/YYYY-MM-DD.json`)
```json
{"date":"2026-11-29","items":[
  {"slot":5,"id":"v01","name":"QISQA NOM","type":"Horror","sec":37.3,
   "video_url":"https://raw.githubusercontent.com/jasurhoshimov007-cell/video-yuklash/<SHA>/media/n29_v01.mp4",
   "caption":"1-qator hook\n2-qator chaqiriq\n#horror #uzbek","thumb_offset":1500,
   "tg_after":null}
]}
```
`tg_after` (ixtiyoriy): `{"method":"sendPhoto"|"sendPoll"|"sendMessage","params":{...Telegram Bot API JSON...}}`.

## Yordamchi skript
`yukla.py` — soatlik yuklovchi ishlatadigan skript (nusxasi vazifa matnida ham bor):
- `python3 yukla.py item` — shu slot elementi (`NAVBAT_YOQ` / `SLOT_YOQ` / JSON + `url_ok`)
- `python3 yukla.py tg` — `tg_after` postini kanalga yuborish
- `python3 yukla.py alert "matn"` — egasiga qisqa ⚠️ xabar
- Sinov: `YUKLA_DRY=1 YUKLA_QUEUE=fake.json YUKLA_HOUR=5 python3 yukla.py item`
