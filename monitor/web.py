import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import time
import pandas as pd # 引用套件並縮寫為 pd

#import Adafruit_DHT

GPIO_PIN = 4


# 引用私密金鑰
# path/to/serviceAccount.json 請用自己存放的路徑
cred = credentials.Certificate('../serviceAccount.json')

# 初始化firebase，注意不能重複初始化
firebase_admin.initialize_app(cred)

# 初始化firestore
db = firestore.client()





try:
    print('按下 Ctrl-C 可停止程式')
    while True:
        #h, t = Adafruit_DHT.read_retry(Adafruit_DHT.DHT11, GPIO_PIN)
        h=0
        t=0
        if h is not None and t is not None:
            print('溫度={0:0.1f}度C 濕度={1:0.1f}%'.format(t, h))
            doc = {
  'tem': t,
  'hum': h
}
            doc_ref = db.collection("Sensor").document("20191213")

# doc_ref提供一個set的方法，input必須是dictionary

            doc_ref.set(doc)
        else:
            print('讀取失敗，重新讀取。')
        time.sleep(10)
except KeyboardInterrupt:
    print('關閉程式')

#doc_ref = db.collection("usr").document("usr_01")
#doc_ref.update(doc)
