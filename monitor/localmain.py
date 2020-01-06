import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import time
import datetime
from datetime import date
import pandas as pd # 引用套件並縮寫為 pd
import math


# 引用私密金鑰
# path/to/serviceAccount.json 請用自己存放的路徑
cred = credentials.Certificate('../serviceAccount.json')

# 初始化firebase，注意不能重複初始化
firebase_admin.initialize_app(cred)

# 初始化firestore
db = firestore.client()
day=['/第一天','/第二天','/第三天','/第四天','/第五天','/第六天','/第七天',]
dic=[]

doc_ref = db.collection("fake_data").document("situation1").collection('2020-01-06').document('data')    
doc = {'喚醒前一小時平均溫度': 12,
               '喚醒前一小時平均濕度': 22,
               '喚醒前一小時平均二氧化碳濃度':33,
               '使用者實際起床時間':44,
               '鬧鐘實際喚醒時間':55,
               '使用者賴床時間':round(66)}

doc_ref.update(doc)


#
# for i in range(5):
#     path1 = path + day[i]+'/數據'
#     doc_ref = db.document(path1)
#     print(path1)
#     try:
#         doc = doc_ref.get()
#         # 透過 to_dict()將文件轉為dictionary
#         dic.append(doc.to_dict())
#         #print("文件內容為：{}".format(dic))
#     except:
#         print("指定文件的路徑{}不存在，請檢查路徑是否正確".format(path1))
#         dic.append(None)
# for i in dic:
#     print(i)

# tomorrow = str(date.today()+datetime.timedelta(1))
#
#
# doc_ref = db.document(path+'/'+'usrssettingtime/data')
# Target = doc_ref.get().to_dict()['使用者希望規律起床的時間']
# doc_ref = db.document(path+'/'+tomorrow+'/data')
# todo = doc_ref.get().to_dict()
# deadlinetime = todo['使用者設定起床時間']
# presetwaketime = todo['鬧鐘預計喚醒時間']
#
# print('Target is '+Target)
# print('使用者設定起床時間 is '+deadlinetime)
# print('鬧鐘預計喚醒時間 is '+presetwaketime)
#
#
# Date=[]
#
# for i in range(5):
#     #date.append()
#     Date.append(str(date.today()+datetime.timedelta(-i)))
# #print(tomorrow)
# Lazy=0
# for i in Date:
#     doc_ref = db.document(path+'/'+i+"/data")
#
#     Lazy+=doc_ref.get().to_dict()['使用者賴床時間']
#
# Lazy=Lazy/len(Date)
#
#
# from datetime import datetime
#
# fmt = '%H:%M:%S'
# d1 = datetime.strptime(Target, fmt)
# d2 = datetime.strptime(deadlinetime, fmt)
# d1_ts = time.mktime(d1.timetuple())
# d2_ts = time.mktime(d2.timetuple())
# print('D-T is '+str(int(d2_ts-d1_ts) / 60))
# print('L is '+str(Lazy))
#
# def time2minutes(timestr):
#     timestr = timestr.split(':')
#
#     return int(timestr[0]) * 60 + int(timestr[1]) * 1 + int(timestr[2]) / 60
#
#
#
# def minutes2time(minutes):
#     hour = math.floor(minutes / 60)
#     minute = math.floor(minutes - hour * 60)
#     second = math.floor(minutes * 60 - hour * 3600 - minute * 60)
#
#     return str(hour).zfill(2) + ":" + str(minute).zfill(2) + ":" + str(second).zfill(2)
#
#
#
# print('D-T is '+str(time2minutes(deadlinetime)-time2minutes(Target)))
#
#
#




# doc = {
#   'tem': t,
#   'hum': h
# }
#             doc_ref = db.collection("Sensor").document("20191213")
#
# # doc_ref提供一個set的方法，input必須是dictionary
#
#             doc_ref.set(doc)
#         else:
#             print('讀取失敗，重新讀取。')
#         time.sleep(10)
# except KeyboardInterrupt:
#     print('關閉程式')

#doc_ref = db.collection("usr").document("usr_01")
#doc_ref.update(doc)
