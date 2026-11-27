#!/bin/bash
API="https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN"; CH=@aicreator_n1
RM='{"inline_keyboard":[[{"text":"🎬 Video buyurtma qilish (faqat buyurtma uchun)","url":"https://t.me/Jjjjjasssu"}]]}'
ok(){ python3 -c "import sys,json;r=json.load(sys.stdin);print('OK' if r.get('ok') else 'XATO '+str(r)[:200])"; }
T1="⚡ Claude o'zini o'zi tezlashtirdi!

Anthropic Claude agentlari yordamida o'z Messages API tizimini Rust tilida qayta yozdi. Natija: har bir so'rovga protsessor sarfi taxminan 70% kamaygan.

Siz ham kodni AI'ga yozdirasizmi? Izohda yozing 👇
🔔 Obuna bo'ling — har kuni AI yangiliklari!
#AI #Claude #Anthropic #yangilik"
T2="🛰 1 000 000 ta AI sun'iy yo'ldosh!

SpaceX koinotga AI hisoblash sun'iy yo'ldoshlarini chiqarish uchun shartli ruxsat oldi — rejada 1 milliongacha yo'ldosh. G'oya: data-markazni Yerdan koinotga ko'chirish (quyosh energiyasi, tabiiy sovutish).

Sizningcha, bu kelajakmi yoki xayolmi? 👇
🔔 Obuna bo'ling — har kuni AI yangiliklari!
#AI #SpaceX #koinot #yangilik"
T3="🚪 IJARA KVARTIRA — 2-qism (davomi)

Surat orqasida qizil siyohda yozilgan edi: \"Navbat senda.\"
Shkaf ichidan yana taqillash eshitildi. Bu safar — ichkaridan emas, sening yotoqxonang eshigidan.
Sen uy egasiga qo'ng'iroq qilding. Telefon o'chiq.
Ertalab qo'shni kampir aytdi: \"Bu uyda hech kim 15 kundan ortiq yashamagan, bolam.\"
Bugun — o'n beshinchi kun edi.
Kechqurun eshik oldida kalit va xat turardi: \"Rahmat. Endi men chiqdim.\"
Sen oshxonaga qarading... uchinchi shkaf yopiq edi. Ichidan esa sening ovozing eshitilardi.

Sen nima qilarding: A) uydan qochaman B) shkafni ochaman? Izohda yozing 👇
Yangi hikoyalar har kuni Instagram'da: @jasur.ai_"
T4="🏆 Bugungi yangi video! 1269 ta izoh sanaldi — eng zo'r multfilm qahramoni natijalari!
Instagramga kirib like bosing va obuna bo'lib qo'ying 👍❤️🔔
https://www.instagram.com/reel/DgPQvWCyG3_/
😍🔥👇"
T5="📰 Haftaning 5 ta eng muhim AI yangiligi

1️⃣ SpaceX 1 milliongacha AI hisoblash sun'iy yo'ldoshi uchun shartli ruxsat oldi.
2️⃣ Anthropic Claude agentlari yordamida Messages API'ni Rust'da qayta yozdi — so'rovga CPU sarfi ~70% kam.
3️⃣ Nyu-York Kaliforniyadan keyin AI chatbotli bolalar o'yinchoqlarini taqiqlagan ikkinchi shtat bo'ldi.
4️⃣ Dario Amodei: jamiyatning katta qarorlarini AI qabul qilmasligi kerak.
5️⃣ OpenAI GPT-6.2 Astra va Sol limitlari bilan bog'liq hisob-kitob xatosini tuzatdi.

Manba: The Neuron, 26-noyabr dayjesti — https://www.theneuron.ai/digest/everything-that-happened-in-ai-today-november-26-2026/

Qaysi yangilik sizni ko'proq hayratlantirdi? Izohda yozing 👇
🔔 Obuna bo'ling va do'stlaringizga ulashing!"
echo t01; curl -s "$API/sendVideo" --form-string chat_id=$CH -F video=@final_t01.mp4 -F supports_streaming=true --form-string "caption=$T1" --form-string "reply_markup=$RM" | ok
echo t02; curl -s "$API/sendVideo" --form-string chat_id=$CH -F video=@final_t02.mp4 -F supports_streaming=true --form-string "caption=$T2" --form-string "reply_markup=$RM" | ok
echo horror; curl -s "$API/sendPhoto" --form-string chat_id=$CH -F photo=@v05_frame.jpg --form-string "caption=$T3" --form-string "reply_markup=$RM" | ok
echo poll; curl -s "$API/sendPoll" --form-string chat_id=$CH --form-string "question=1 milliard so'm: nimani tanlaysiz? (Instagram'dagi savol natijasi)" --form-string 'options=["💍 Dabdabali to‘y (1000 mehmon)","🏡 O‘z uyingiz"]' --form-string is_anonymous=true --form-string "reply_markup=$RM" | ok
echo promo; curl -s "$API/sendVideo" --form-string chat_id=$CH -F video=@final_v06.mp4 -F supports_streaming=true --form-string "caption=$T4" --form-string "reply_markup=$RM" | ok
echo digest; curl -s "$API/sendPhoto" --form-string chat_id=$CH -F photo=@digest.jpg --form-string "caption=$T5" --form-string "reply_markup=$RM" | ok
