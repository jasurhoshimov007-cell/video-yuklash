import json,sys
def redo(vid,bounds):
    t=json.load(open(f'{vid}/timing.json'))
    for l,(a,b) in zip(t['lines'],bounds):
        l['t0'],l['t1']=a,b;ws=[w['w'] for w in l['words']];wl=[len(w)+1.5 for w in ws];s=sum(wl);c=0
        for w,k in zip(l['words'],wl): w['t0']=round(a+(b-a)*c/s,3);c+=k;w['t1']=round(a+(b-a)*c/s,3)
    json.dump(t,open(f'{vid}/timing.json','w'),ensure_ascii=False)
if __name__=='__main__':
    vid=sys.argv[1];redo(vid,json.load(open(f'{vid}/manual.json'))['lines'])
