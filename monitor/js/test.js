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
    console.log()

    return idealwakeuptime //string

}

function setidealwakeuptime2(deadlinetime) {
    let meansnooze = 0
    for (let index = 0; index < acwutime.length; index++) {
        console.log("  使用者賴床時間： " + snooze[index])
        meansnooze += snooze[index];
    }

    meansnooze = meansnooze / snooze.length // L_bar


    let solution = ''


    let dminust = time2minutes(deadlinetime) - time2minutes(target)

    if (dminust <= 0) {
        solution = minutes2time(time2minutes(deadlinetime) - meansnooze)
    } else if (dminust > 0 & dminust < 2 * meansnooze) {
        solution = minutes2time(time2minutes(deadlinetime) - meansnooze)
    } else if (dminust > 0 & dminust >= 2 * meansnooze) {
        solution = minutes2time(time2minutes(target) + meansnooze)
    }
    return solution




}
//初始化 firebase
var config = {
    apiKey: "AIzaSyBBzlXTTIyjaJrhy3Dnf_4xQtA_ZTLaBDY",
    authDomain: "quickstart-1f30d.firebaseapp.com",
    databaseURL: "https://quickstart-1f30d.firebaseio.com",
    projectId: "quickstart-1f30d",
    storageBucket: "quickstart-1f30d.appspot.com",
    messagingSenderId: "654432884151",
    appId: "1:654432884151:web:8e3051471a668b33c9c432",
    measurementId: "G-LHYTZWFVSR"
};
firebase.initializeApp(config);
var db = firebase.firestore();
var acwutime = []
var snooze = []
var target = ''



$(() => {
    setInterval(gettime, 1000)

    var date = []
    for (let index = 0; index < 5; index++) {
        var d = new Date();
        d.setDate(d.getDate() - index)
        date.push(String(d.getFullYear()) + '-' + String(d.getMonth() + 1).padStart(2, "0") + '-' + String(d.getDate()).padStart(2, "0"));

    }


    for (let index = 0; index < date.length; index++) {
        var docRef = db.collection("fake_data").doc("situation1").collection(date[index]).doc("data");
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

    var docRef = db.collection("fake_data").doc("situation1").collection('usrssettingtime').doc("data");
    docRef.get().then(function(doc) {

            if (doc.exists) {

                target = doc.data().使用者希望規律起床的時間
            } else {
                console.log("找不到文件");
            }
        })
        .catch(function(error) {
            console.log("提取文件時出錯:", error);
        });








    $('#save2').on('click', () => {

        var baseline = $('#baseline').val()

        console.log(baseline)
        var doc_ref = db.collection("fake_data").doc("situation1").collection("usrssettingtime").doc("data");
        baseline = baseline + ':00'

        doc_ref.set({ '使用者希望規律起床的時間': baseline })
    })













    $('#save').on('click', () => {



        //按下儲存後要做兩件事。1.上傳死線時間 2.根據前五天的資料以及貪睡權重參數、溫濕權重參數，立馬算出「預計喚醒時間」


        //show()
        /************************************************************************************************************************************/



        var deadlinetime = $('#deadlinetime').val()
        if (deadlinetime.length > 15) {


            $('#idealwakeuptime').val(idealwakeuptime)
                //console.log(deadlinetime)





            //把使用者輸入的死線時間上傳db
            var d = new Date();
            d.setDate(d.getDate() + 1)
            tomorrow = (String(d.getFullYear()) + '-' + String(d.getMonth() + 1).padStart(2, "0") + '-' + String(d.getDate()).padStart(2, "0"));

            deadlinetime = deadlinetime.split('T')[1] + ":00" //只取時間，補上秒數




            var idealwakeuptime = setidealwakeuptime2(deadlinetime);
            //計算顯示「預計喚醒時間」
            $('#idealwakeuptime').val(idealwakeuptime)

            var doc_ref = db.collection("fake_data").doc("situation1").collection(tomorrow).doc("data");
            doc_ref.set({
                '使用者設定起床時間': deadlinetime,
                '日期': tomorrow,
                '鬧鐘預計喚醒時間': idealwakeuptime
            })







        } else {
            alert('請輸入最晚起床時間')
        }


    })


})