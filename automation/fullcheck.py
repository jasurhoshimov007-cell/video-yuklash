import json,sys,base64,urllib.request,os,subprocess,time
key=os.environ['GEMINI_API_KEY']
for vid in sys.argv[1:]:
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{vid}/voice.wav','-ar','16000','-ac','1',f'{vid}/full16.wav'])
    b=base64.b64encode(open(f'{vid}/full16.wav','rb').read()).decode()
    body={"contents":[{"parts":[{"inlineData":{"mimeType":"audio/wav","data":b}},{"text":"Transcribe this Uzbek audio exactly, word for word, with a [mm:ss] timestamp at the start of each sentence. Do not add anything that is not spoken."}]}]}
    req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key={key}",data=json.dumps(body).encode(),headers={"Content-Type":"application/json"})
    for a in range(5):
        try: r=json.load(urllib.request.urlopen(req,timeout=180));break
        except urllib.error.HTTPError as e: print(e.code);time.sleep(30)
    print('=====',vid);print(r['candidates'][0]['content']['parts'][0]['text'].strip())
