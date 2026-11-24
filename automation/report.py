#!/usr/bin/env python3
"""Kunlik hisobotni botga chiroyli, tartibli qilib yuboradi.
Ishlatish: python3 report.py report.json   (yoki --preview bilan namuna)
report.json:
{"date":"24-noyabr",
 "instagram":{"Horror":[["NOM",45.2],...],"Claude suhbat":[...],"Kanal reklamasi":[...],"A yoki B":[...],"AI yangilik":[...]},
 "instagram_plan":12,
 "channel":["Video: NOM (27 s)","So'rovnoma: ...","Promo post: ..."],
 "problems":["..."],            # bo'sh bo'lsa yozilmaydi
 "not_done":["..."]}            # bo'lmagan ishlar
"""
import json,sys,os,urllib.request,urllib.parse
ICON={"Horror":"😱","Claude suhbat":"🤖","Kanal reklamasi":"📢","A yoki B":"🅰️🅱️","AI yangilik":"📰","Jang (izoh=ovoz)":"🏆","Kimni tanlaysiz":"🤔","Boshqa":"🎬"}
def build(r):
    ig=r.get("instagram",{});n=sum(len(v) for v in ig.values());plan=r.get("instagram_plan",12)
    probs=r.get("problems",[]);nd=r.get("not_done",[])
    ok=(n>=plan and not nd)
    head=f"✅ Hammasi muvaffaqiyatli yuklandi! ({n}/{plan})" if ok else (f"⚠️ {n}/{plan} ta yuklandi" if n>0 else "❌ Yuklanmadi")
    out=[f"{head}\n📅 {r.get('date','')}".strip()]
    b=["📱 Instagram (@jasur.ai_)"]
    for cat,items in ig.items():
        if not items: continue
        b.append(f"{ICON.get(cat,'🎬')} {cat} ({len(items)}): "+", ".join(f"{nm} {round(float(sec))}s" for nm,sec in items))
    out.append("\n".join(b))
    ch=r.get("channel",[])
    if ch: out.append("📢 Kanal: "+"; ".join(ch))
    if nd: out.append("🚫 Bajarilmadi: "+"; ".join(nd))
    if probs: out.append("⚠️ Muammo: "+"; ".join(probs))
    return "\n\n".join(out)
def send(text):
    tok=os.environ["TELEGRAM_BOT_TOKEN"];chat=os.environ["TELEGRAM_CHAT_ID"]
    parts=[];cur=""
    for blk in text.split("\n\n"):
        if len(cur)+len(blk)+2>3800: parts.append(cur);cur=blk
        else: cur=(cur+"\n\n"+blk) if cur else blk
    if cur: parts.append(cur)
    for p in parts:
        data=urllib.parse.urlencode({"chat_id":chat,"text":p}).encode()
        r=json.load(urllib.request.urlopen(urllib.request.Request(f"https://api.telegram.org/bot{tok}/sendMessage",data=data),timeout=60))
        if not r.get("ok"): raise SystemExit("sendMessage xato: "+str(r))
    return len(parts)
if __name__=="__main__":
    if sys.argv[1]=="--preview":
        r={"date":"24-noyabr (NAMUNA: ertangi hisobot shunday ko'rinadi)","instagram_plan":12,"instagram":{"Horror":[["RAQAMIM",49],["QORLI DOVON",44],["KAMERA 03:17",46],["QUDUQ",43],["OXIRGI QATOR",47]],"Claude suhbat":[["SAYT YIQILDI",44],["TO'Y NUTQI",41],["HISOBOT KECHASI",46]],"Kanal reklamasi":[["1 KUNLIK PREZIDENT",24],["1 KUNLIK MILLIARDER",22],["OXIRGI ODAM",21]],"A yoki B":[["1 MLN YOKI 1 YIL",36],["YOZ YOKI QISH",34],["MAKTAB YOKI ISH",35],["TELEFON YOKI DO'ST",37],["KECHA YOKI TONG",33]],"AI yangilik":[["YANGI AI MODELI",38],["AI NARXLARI",36]]},"channel":["Video: AI yangiligi 1 (27 s)","Video: AI yangiligi 2 (28 s)","Horror davomi: RAQAMIM (matn + rasm)","So'rovnoma: 1 MLN YOKI 1 YIL","Promo post: eng yaxshi Reels + havola","Instagram story joylandi"],"problems":[]}
    else: r=json.load(open(sys.argv[1]))
    print(build(r) if "--print" in sys.argv else f"yuborildi: {send(build(r))} xabar")
