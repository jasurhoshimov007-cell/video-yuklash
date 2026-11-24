import json,sys,base64,urllib.request,os,wave,time,datetime
KEYS=[k for k in (os.environ.get('GEMINI_API_KEY'),os.environ.get('GEMINI_API_KEY_2')) if k]
d=json.load(open('scripts.json'))
def tts(text,model,key,multi=False):
    sc={"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":"Algenib"}}}
    if multi: sc={"multiSpeakerVoiceConfig":{"speakerVoiceConfigs":[{"speaker":"Qahramon","voiceConfig":{"prebuiltVoiceConfig":{"voiceName":"Algenib"}}},{"speaker":"Claude","voiceConfig":{"prebuiltVoiceConfig":{"voiceName":"Kore"}}}]}}
    body={"contents":[{"parts":[{"text":text}]}],"generationConfig":{"responseModalities":["AUDIO"],"speechConfig":sc}}
    req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}",data=json.dumps(body).encode(),headers={"Content-Type":"application/json"})
    r=json.load(urllib.request.urlopen(req,timeout=300))
    p=r['candidates'][0]['content']['parts'][0]['inlineData']
    return base64.b64decode(p['data']),p.get('mimeType')
for vid in sys.argv[1:]:
    pcm=None
    tl=d[vid].get("tts_lines") or d[vid]["lines"];multi=bool(d[vid].get("dialog"))
    sty=d[vid].get("style","");text="\n".join((("Qahramon: " if sp=="Q" else "Claude: ")+l) for sp,l in zip(d[vid]["speakers"],tl)) if multi else "\n".join(tl)
    if sty: text=sty+"\n"+text
    for ki,key in enumerate(KEYS):
      for model in ["gemini-3.8-flash-tts","gemini-2.5-flash-preview-tts","gemini-3.8-flash-lite-tts","gemini-3.1-flash-tts-preview"]:
        if os.path.exists(f"skip_{ki}_{model}"): continue
        for att in range(4):
            try:
                pcm,mt=tts(text,model,key,multi);break
            except urllib.error.HTTPError as e:
                msg=e.read().decode();print(vid,ki,model,e.code,msg[:200].replace("\n"," "),flush=True);pcm=None
                if e.code in (400,404):break
                if e.code==429 and "PerDay" in msg:
                    now=datetime.datetime.utcnow();rs=now.replace(hour=8,minute=1,second=0,microsecond=0)
                    if rs<=now: rs+=datetime.timedelta(days=1)
                    w=(rs-now).total_seconds()
                    if w<=7200 and not os.path.exists(f"waited_{ki}_{model}"):
                        print(f"Kunlik limit: {int(w)} s kutaman (08:00 UTC tiklanishi)",flush=True);open(f"waited_{ki}_{model}","w").close();time.sleep(w);continue
                    open(f"skip_{ki}_{model}","w").close();break
                time.sleep(65)
        if pcm: break
      if pcm: break
    if not pcm: print(vid,"FAILED");continue
    os.makedirs(vid,exist_ok=True)
    if pcm[:4]==b"RIFF": open(f"{vid}/raw.wav","wb").write(pcm)
    else:
     with wave.open(f"{vid}/raw.wav","wb") as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(24000);w.writeframes(pcm)
    print(vid,model,mt,len(pcm)/48000,"s",flush=True)
