"""Instagram izohlariga avtomatik javob (Instagram API, Instagram Login).

Har ishga tushganda oxirgi postlardagi izohlarni tekshiradi va
hali javob yozilmagan izohlarga "rahmat, obuna bo'ling" deb javob yozadi.
Holat saqlanmaydi: izohda akkauntning o'z javobi bo'lsa, u o'tkazib yuboriladi.
"""
import json
import os
import random
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = "https://graph.instagram.com/v21.0"
TOKEN = os.environ.get("IG_TOKEN", "").strip()
MAX_REPLIES = int(os.environ.get("MAX_REPLIES", "25"))     # bir ishga tushishda nechta javob
MEDIA_COUNT = int(os.environ.get("MEDIA_COUNT", "10"))     # nechta oxirgi post tekshiriladi
DRY_RUN = os.environ.get("DRY_RUN", "") == "1"

TEMPLATES = [
    "@{u} Javobingiz uchun rahmat! Obuna bo'lib qo'ying 🙏",
    "@{u} Rahmat! Obuna bo'lib qo'ying, yangi videolar tez orada ❤️",
    "@{u} Izohingiz uchun katta rahmat! Obuna bo'lib qo'ying 🔥",
    "@{u} Rahmat, do'stim! Obuna bo'lib qo'yishni unutmang 😊",
    "@{u} Javobingiz uchun rahmat! Obuna bo'ling, davomi bor 🙌",
]


def call(path, params=None, method="GET"):
    params = dict(params or {})
    params["access_token"] = TOKEN
    url = f"{API}/{path}" if not path.startswith("http") else path
    data = None
    if method == "GET":
        url += ("&" if "?" in url else "?") + urllib.parse.urlencode(params)
    else:
        data = urllib.parse.urlencode(params).encode()
    req = urllib.request.Request(url, data=data, method=method)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")
        raise RuntimeError(f"{method} {path}: HTTP {e.code} {body[:300]}") from None


def paged(path, params, limit):
    out = []
    res = call(path, params)
    while True:
        out.extend(res.get("data", []))
        nxt = res.get("paging", {}).get("next")
        if not nxt or len(out) >= limit:
            return out[:limit]
        with urllib.request.urlopen(nxt, timeout=60) as r:
            res = json.load(r)


def main():
    if not TOKEN:
        sys.exit("IG_TOKEN topilmadi (GitHub Secrets'ga qo'shing).")
    me = call("me", {"fields": "user_id,username"})
    my_name = me.get("username", "")
    print(f"Akkaunt: @{my_name}")

    media = paged("me/media", {"fields": "id,timestamp,permalink", "limit": MEDIA_COUNT}, MEDIA_COUNT)
    sent = 0
    for m in media:
        if sent >= MAX_REPLIES:
            break
        comments = paged(f"{m['id']}/comments",
                         {"fields": "id,text,username,timestamp,replies{username}", "limit": 50}, 500)
        comments.sort(key=lambda c: c.get("timestamp", ""), reverse=True)
        seen_users = set()
        for c in comments:
            if sent >= MAX_REPLIES:
                break
            user = c.get("username") or ""
            if not user or user == my_name or user in seen_users:
                continue
            replies = (c.get("replies") or {}).get("data", [])
            if any(r.get("username") == my_name for r in replies):
                seen_users.add(user)
                continue
            msg = random.choice(TEMPLATES).format(u=user)
            if DRY_RUN:
                print(f"[sinov] {c['id']} -> {msg}")
            else:
                try:
                    call(f"{c['id']}/replies", {"message": msg}, method="POST")
                    print(f"Javob yozildi: @{user}")
                except RuntimeError as e:
                    print(f"Xato: {e}")
                    if "HTTP 4" in str(e) and ("limit" in str(e).lower() or "spam" in str(e).lower()):
                        print("Instagram cheklovi, keyingi safar davom etadi.")
                        return
                    continue
                time.sleep(random.uniform(4, 9))
            seen_users.add(user)
            sent += 1
    print(f"Jami javob: {sent}")


if __name__ == "__main__":
    main()
