import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import time
import pandas as pd # 引用套件並縮寫為 pd

# 引用私密金鑰
# path/to/serviceAccount.json 請用自己存放的路徑
cred = credentials.Certificate('/Users/hsingyu/Documents/機電整合四/final_project/website/serviceAccount.json')

# 初始化firebase，注意不能重複初始化
firebase_admin.initialize_app(cred)

# 初始化firestore
db = firestore.client()
day=['/第一天','/第二天','/第三天','/第四天','/第五天','/第六天','/第七天',]
dic=[]

path = "fake_data/situation1"




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

doc_ref = db.document(path+"/demo那天/數據")
deadlinetime = doc_ref.get().to_dict()

print(deadlinetime)










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
