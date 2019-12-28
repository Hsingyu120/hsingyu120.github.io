import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import time
import Adafruit_DHT
import mh_z19
import paho.mqtt.client as mqtt

 
GPIO_PIN = 4


# This is the Subscriber
broker = "broker.hivemq.com"

def on_message(client, userdata, message):
    time.sleep(1)
    print("message received " ,str(message.payload.decode("utf-8")))
    print("message topic=",message.topic)
   


print("creating new instance")
client = mqtt.Client("P1") #create new instance
client.on_message=on_message #attach function to callback
print("connecting to broker")
client.connect(broker) #connect to broker
 

# 引用私密金鑰
# path/to/serviceAccount.json 請用自己存放的路徑
cred = credentials.Certificate('./serviceAccount.json')

# 初始化firebase，注意不能重複初始化
firebase_admin.initialize_app(cred)

# 初始化firestore
db = firestore.client()



# 建立文件 必須給定 集合名稱 文件id
# 即使 集合一開始不存在 都可以直接使用

# 語法
# doc_ref = db.collection("集合名稱").document("文件id")
while True:
    #try:
     #   print('按下 Ctrl-C 可停止程式')
        #while True:
            #h, t = Adafruit_DHT.read_retry(Adafruit_DHT.DHT11, GPIO_PIN)
            #c = mh_z19.read()['co2']
            #if h is not None and t is not None and c is not None:
               # print('溫度={0:0.1f}度C 濕度={1:0.1f}% '.format(t, h))
               # print(c)
            #if h is not None and t is not None :
             #   print('溫度={0:0.1f}度C 濕度={1:0.1f}% '.format(t, h ))
                #doc = {
     # 'tem': t,
     # 'hum': h,
      #'co2':c
      
  #  }
                #doc_ref = db.collection("Sensor").document("20191213")

    # doc_ref提供一個set的方法，input必須是dictionary

                #doc_ref.set(doc)
            #else:
                #print('讀取失敗，重新讀取。')
            #time.sleep(10)
   # except KeyboardInterrupt:
    #    print('關閉程式')
    
    client.loop_start() #start the loop
    client.subscribe("sLessper/wake")
    ##print("Publishing message to topic","house/bulbs/bulb1")  
    #client.publish("sLessper/control","FUCK")
    client.loop_stop() #stop the loop
    #doc_ref = db.collection("usr").document("usr_01")
    #doc_ref.update(doc)

