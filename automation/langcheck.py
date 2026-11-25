# Har videoning butun ovozini Gemini bilan tekshiradi: faqat o'zbekcha bo'lishi va matnga mosligi.
# Ishlatish: python3 langcheck.py v01 v02 ... (vNN/voice.wav yoki final_vNN.mp4). "XATO" chiqsa video YUKLANMAYDI.
import json,sys,base64,urllib.request,os,subprocess,time,re,difflib
key=os.environ['GEMINI_API_KEY'];d=json.load(open('scripts.json'))
def norm(s): return re.sub(r"[^a-z ]","",s.lower().replace("'","").replace("‘","").replace("ʻ","").replace("’",""))
bad=0
for vid in sys.argv[1:]:
    src=f'{vid}/voice.wav' if os.path.exists(f'{vid}/voice.wav') else f'final_{vid}.mp4'
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',src,'-ar','16000','-ac','1',f'/tmp/lc_{vid}.wav'])
    b=base64.b64encode(open(f'/tmp/lc_{vid}.wav','rb').read()).decode()
    body={"contents":[{"parts":[{"inlineData":{"mimeType":"audio/wav","data":b}},{"text":"Transcribe ALL speech in this audio exactly as spoken, in its original language, never translate. First line: LANGUAGES: comma-separated list of every language heard (e.g. Uzbek, English). Then the transcript."}]}]}
    r=None
    for att in range(8):
        try:
            req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key={key}",data=json.dumps(body).encode(),headers={"Content-Type":"application/json"})
            r=json.load(urllib.request.urlopen(req,timeout=180));break
        except urllib.error.HTTPError as e: time.sleep(30)
    if not r: print(vid,"TEKSHIRILMADI (API)");bad+=1;continue
    tx=r['candidates'][0]['content']['parts'][0]['text'].strip();langs=tx.split('\n')[0].lower()
    first=norm(d[vid]['lines'][0]);body_tx=norm(' '.join(tx.split('\n')[1:]))
    m=difflib.SequenceMatcher(None,body_tx[:len(first)+10],first).ratio()
    ok=('english' not in langs) and m>0.55
    print(vid,'OK' if ok else 'XATO',"|",langs,"| boshi mos:",round(m,2),"|",body_tx[:90]);bad+=0 if ok else 1
sys.exit(1 if bad else 0)
