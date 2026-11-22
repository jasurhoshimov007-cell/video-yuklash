import json,sys,base64,urllib.request,os,wave,time
key=os.environ['GEMINI_API_KEY']
d=json.load(open('scripts.json'))
def tts(text,model):
    body={"contents":[{"parts":[{"text":text}]}],"generationConfig":{"responseModalities":["AUDIO"],"speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":"Algenib"}}}}}
    req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}",data=json.dumps(body).encode(),headers={"Content-Type":"application/json"})
    r=json.load(urllib.request.urlopen(req,timeout=300))
    p=r['candidates'][0]['content']['parts'][0]['inlineData']
    return base64.b64decode(p['data']),p.get('mimeType')
for vid in sys.argv[1:]:
    text="\n".join(d[vid].get("tts_lines") or d[vid]["lines"])
    for model in ["gemini-3.8-flash-tts","gemini-2.5-flash-preview-tts"]:
        if os.path.exists(f"skip_{model}"): continue
        try:
            pcm,mt=tts(text,model);break
        except urllib.error.HTTPError as e:
            msg=e.read().decode()[:300];print(vid,model,e.code,msg,flush=True)
            if e.code==429: open(f"skip_{model}","w").close()
            pcm=None
    if not pcm: print(vid,"FAILED");continue
    os.makedirs(vid,exist_ok=True)
    if pcm[:4]==b"RIFF": open(f"{vid}/raw.wav","wb").write(pcm)
    else:
     with wave.open(f"{vid}/raw.wav","wb") as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(24000);w.writeframes(pcm)
    print(vid,model,mt,len(pcm)/48000,"s",flush=True)
