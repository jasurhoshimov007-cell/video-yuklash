import json,os,sys,subprocess,tempfile,urllib.request as U,datetime as T
# Soatlik Instagram yuklovchi yordamchisi. Toshkent = UTC+5 (yozgi vaqt yo'q).
# Vazifa HH:58 da ishga tushadi: +30 daqiqa bilan eng yaqin soatga yaxlitlanadi (04:58 -> slot 5).
now=T.datetime.now(T.timezone(T.timedelta(hours=5)))+T.timedelta(minutes=30)
D=os.environ.get("YUKLA_DATE",now.strftime("%Y-%m-%d")); H=int(os.environ.get("YUKLA_HOUR",now.hour))
REPO="https://github.com/jasurhoshimov007-cell/video-yuklash"; BR="ccr-be4dfb80-ltms6l"
def queue():
    p=os.environ.get("YUKLA_QUEUE")
    if p: return json.load(open(p)) if os.path.exists(p) else None
    d=tempfile.mkdtemp()
    subprocess.run(["git","clone","-q","--depth","1","--filter=blob:none","--no-checkout","-b",BR,REPO,d],check=True)
    r=subprocess.run(["git","-C",d,"show",f"HEAD:automation/queue/{D}.json"],capture_output=True,text=True)
    return json.loads(r.stdout) if r.returncode==0 else None
def item():
    q=queue()
    if q is None: return None,None
    return q,next((i for i in q.get("items",[]) if int(i.get("slot",-1))==H),None)
def tg(method,params):
    tok=os.environ["TELEGRAM_BOT_TOKEN"]
    if os.environ.get("YUKLA_DRY"): print("DRY",method,json.dumps(params,ensure_ascii=False)); return True
    r=U.Request(f"https://api.telegram.org/bot{tok}/{method}",data=json.dumps(params).encode(),headers={"Content-Type":"application/json"})
    try: res=json.load(U.urlopen(r,timeout=60))
    except Exception as e: res={"ok":False,"error":str(e)}
    print("OK" if res.get("ok") else "XATO "+str(res)[:300]); return bool(res.get("ok"))
def url_ok(u):
    try: return U.urlopen(U.Request(u,method="HEAD"),timeout=30).status==200
    except Exception: return False
cmd=sys.argv[1] if len(sys.argv)>1 else "item"
if cmd=="item":
    q,it=item()
    if q is None: print(f"NAVBAT_YOQ {D} soat={H}"); sys.exit(0)
    if it is None: print(f"SLOT_YOQ {D} soat={H}"); sys.exit(0)
    out={"date":D,"hour":H,"total":len(q.get("items",[])),"url_ok":url_ok(it["video_url"]),**it}
    print(json.dumps(out,ensure_ascii=False,indent=1))
elif cmd=="tg":
    q,it=item(); t=(it or {}).get("tg_after")
    if not t: print("TG_YOQ"); sys.exit(0)
    sys.exit(0 if tg(t["method"],t["params"]) else 1)
elif cmd=="alert":
    sys.exit(0 if tg("sendMessage",{"chat_id":os.environ["TELEGRAM_CHAT_ID"],"text":" ".join(sys.argv[2:])}) else 1)
