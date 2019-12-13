//初始化 firebase
var config = {
    apiKey: "AIzaSyAP2qFl8eWdaDijWBGJ9oFAj9MDB5NG4Lk",
    authDomain: "quickstart-1575120625329.firebaseapp.com",
    databaseURL: "https://quickstart-1575120625329.firebaseio.com",
    projectId: "quickstart-1575120625329",
    storageBucket: "quickstart-1575120625329.appspot.com",
    messagingSenderId: "664382912294",
    appId: "1:664382912294:web:d282b7926bfca70d1273e7",
    measurementId: "G-80FEFGRJWQ"
};
firebase.initializeApp(config);

var db = firebase.firestore();

function storedata() {
    db.collection("movies").doc("新世紀福爾摩斯").set({
        name: "新世紀福爾摩斯",
        date: "2010",
        desctiption: "本劇改編自阿瑟·柯南·道爾爵士家喻戶曉的推理小說，一位脾氣古怪的大偵探在現代倫敦的街頭悄悄巡行，四處搜尋線索。",
        actors: ["班尼迪克·康柏拜區", "馬丁·費曼"]
    });
    console.log("stored");
}

function getdata() {
    var docRef = db.collection("usr").doc("usr_01");
    docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log(doc.data());
            } else {
                console.log("找不到文件");
            }
        })
        .catch(function(error) {
            console.log("提取文件時出錯:", error);
        });
}