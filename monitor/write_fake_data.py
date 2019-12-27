import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import time
import pandas as pd 
import json
import sys

situation = sys.argv[1]

# 引用私密金鑰
# path/to/serviceAccount.json 請用自己存放的路徑
cred = credentials.Certificate('../serviceAccount.json')
# 初始化firebase，注意不能重複初始化
firebase_admin.initialize_app(cred)
# 初始化firestore
db = firestore.client()


df=pd.read_excel('fake_data.xlsx',situation)


#df tp json_str
record = df.to_json(orient='records',force_ascii=False)

#json_str to list
record = json.loads(record)




for i in record:

    doc_ref = db.collection("fake_data").document(situation).collection(i['日期']).document("數據")

    doc_ref.set(i)
