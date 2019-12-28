var gettime = () => {
    var days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var d = new Date(); // for now
    d.getHours();
    d.getMinutes();
    d.getSeconds();
    //console.log(days[String(d.getDay())])
    $('#date').val(String(d.getUTCFullYear()).padStart(2, "0") + " / " + String(d.getMonth() + 1).padStart(2, "0") + " / " + String(d.getDate()).padStart(2, "0"))
    $('#day').val(days[String(d.getDay())])
    $('#time').val(String(d.getHours()).padStart(2, "0") + " : " + String(d.getMinutes()).padStart(2, "0") + " : " + String(d.getSeconds()).padStart(2, "0"))

}

var time2minutes = (timestr) => {

    timestr = timestr.split(':')

    return timestr[0] * 60 + timestr[1] * 1 + timestr[2] / 60

}

var minutes2time = (minutes) => {

    let hour = Math.floor(minutes / 60)
    let minute = Math.floor(minutes - hour * 60)
    let second = minutes * 60 - hour * 3600 - minute * 60



    return String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0") + ":" + String(second).padStart(2, "0")

}



function show() {
    for (let index = 0; index < acwutime.length; index++) {
        console.log("  使用者實際起床時間： " + acwutime[index] + "  使用者賴床時間： " + snooze[index])
    }
}

function setidealwakeuptime(deadlinetime) {
    console.log(deadlinetime)
    let meansnooze = 0
    let meanacwutime = 0
    let idealwakeuptime = 0
    for (let index = 0; index < acwutime.length; index++) {
        console.log("  使用者實際起床時間： " + acwutime[index] + "  使用者賴床時間： " + snooze[index])
        meansnooze += snooze[index];
        meanacwutime += time2minutes(acwutime[index]);
    }
    meanacwutime = minutes2time(meanacwutime / acwutime.length) //string
    meansnooze = meansnooze / snooze.length // number
        //console.log("meansnooze is " + meansnooze + " meanacwutime is " + meanacwutime)
    console.log("deadlinetime is " + time2minutes(deadlinetime) + " meanacwutime is " + time2minutes(meanacwutime))
    let difference = time2minutes(deadlinetime) - time2minutes(meanacwutime)
    console.log("difference between deadlinetime and meanacwutime is " + difference)

    if (difference > 0) {
        idealwakeuptime = minutes2time(time2minutes(meanacwutime) + 0.2 * difference)
    } else {
        idealwakeuptime = deadlinetime
    }

    return idealwakeuptime //string

}
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
var acwutime = []
var snooze = []



$(() => {
    setInterval(gettime, 1000)



    var day = ['第一天', '第二天', '第三天', '第四天', '第五天']
    for (let index = 0; index < day.length; index++) {
        var docRef = db.collection("fake_data").doc("situation1").collection(day[index]).doc("數據");
        docRef.get().then(function(doc) {

                if (doc.exists) {
                    acwutime.push(doc.data().使用者實際起床時間);
                    snooze.push(doc.data().使用者賴床時間);
                } else {
                    console.log("找不到文件");
                }
            })
            .catch(function(error) {
                console.log("提取文件時出錯:", error);
            });

        ;
    }













    $('#save').on('click', () => {



        //按下儲存後要做兩件事。1.上傳死線時間 2.根據前五天的資料以及貪睡權重參數、溫濕權重參數，立馬算出「預計喚醒時間」


        //show()
        /************************************************************************************************************************************/



        var deadlinetime = $('#deadlinetime').val()
        if (deadlinetime.length > 15) {


            $('#idealwakeuptime').val(idealwakeuptime)
                //console.log(deadlinetime)





            //把使用者輸入的死線時間上傳db
            var doc_ref = db.collection("fake_data").doc("situation1").collection("demo那天").doc("數據");

            doc_ref.set({ '使用者設定起床時間': deadlinetime })

            deadlinetime = deadlinetime.split('T')[1] + ":00" //只取時間，補上秒數

            var idealwakeuptime = setidealwakeuptime(deadlinetime);
            //計算顯示「預計喚醒時間」
            $('#idealwakeuptime').val(idealwakeuptime)






        } else {
            alert('請輸入最晚起床時間')
        }


    })


})