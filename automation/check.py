import json,sys,base64,urllib.request,os,subprocess,difflib,re
key=os.environ['GEMINI_API_KEY'];d=json.load(open('scripts.json'))
def norm(s): return re.sub(r"[^a-z ]","",s.lower().replace("'","").replace("‘","").replace("ʻ","").replace("’",""))
for vid in sys.argv[1:]:
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{vid}/voice.wav','-t','4','-ar','16000',f'{vid}/head.wav'])
    b=base64.b64encode(open(f'{vid}/head.wav','rb').read()).decode()
    body={"contents":[{"parts":[{"inlineData":{"mimeType":"audio/wav","data":b}},{"text":"Transcribe this audio exactly, word for word, in the language spoken. Output only the transcript."}]}]}
    req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/"+os.environ.get("CHK","gemini-3-flash-preview")+f":generateContent?key={key}",data=json.dumps(body).encode(),headers={"Content-Type":"application/json"})
    import time
    for att in range(6):
        try: r=json.load(urllib.request.urlopen(req,timeout=120));break
        except urllib.error.HTTPError as e:
            if e.code!=429 or att==5: print(e.read()[:300]); raise
            time.sleep(35)
    tx=r['candidates'][0]['content']['parts'][0]['text'].strip()
    first=d[vid]['lines'][0]
    ratio=difflib.SequenceMatcher(None,norm(tx)[:len(norm(first))+5],norm(first)).ratio()
    print(vid,"|",tx,"|",first,"| match",round(ratio,2))
