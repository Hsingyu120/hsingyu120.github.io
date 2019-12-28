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


function sensorvalue() {
    //console.log('initial sensor value')
    var docRef = db.collection("Sensor").doc("20191213");
    docRef.get().then(function(doc) {
            if (doc.exists) {
                //console.log(doc.data().tem);
                $('#show').empty()
                    // $span = $('<span>').text(JSON.stringify(doc.data()[1]));
                    //   $('#show').append($span)



                $('#temp').val(doc.data().tem)
                $('#hum').val(doc.data().hum)
                $('#co2').val(doc.data().co2)



            } else {
                console.log("找不到文件");
            }
        })
        .catch(function(error) {
            console.log("提取文件時出錯:", error);
        });

}

$(() => {



    var day = ['第一天', '第二天', '第三天', '第四天', '第五天']
    for (let index = 0; index < day.length; index++) {
        var docRef = db.collection("fake_data").doc("situation1").collection(day[index]).doc("數據");
        docRef.get().then(function(doc) {

                if (doc.exists) {

                    //輸出歷次結果表格
                    $tr = $('<tr>').attr("align", "center")
                    $date = $('<th>').attr('scope', "row").text(doc.data().日期)
                    $dead = $('<td>').text(doc.data().使用者設定起床時間)
                    $estimate = $('<td>').text(doc.data().鬧鐘預計喚醒時間)
                    $accall = $('<td>').text(doc.data().鬧鐘實際喚醒時間)
                    $acwakeup = $('<td>').text(doc.data().使用者實際起床時間)
                    $snooze = $('<td>').text(doc.data().使用者賴床時間)
                    $temp = $('<td>').text(doc.data().喚醒前一小時平均溫度)
                    $hum = $('<td>').text(doc.data().喚醒前一小時平均濕度)
                    $co2 = $('<td>').text(doc.data().喚醒前一小時平均二氧化碳濃度)
                    $tr.append($date).append($dead).append($estimate).append($accall).append($acwakeup).append($snooze).append($temp).append($hum).append($co2)

                    $('#data').append($tr)
                } else {
                    console.log("找不到文件");
                }
            })
            .catch(function(error) {
                console.log("提取文件時出錯:", error);
            });

        ;
    }




    $('#submit').on('click', () => {

        console.log('submited')

        var docRef = db.collection("Sensor").doc("20191213");
        docRef.get().then(function(doc) {
                if (doc.exists) {
                    console.log(doc.data().tem);
                    $('#show').empty()
                        // $span = $('<span>').text(JSON.stringify(doc.data()[1]));
                        //   $('#show').append($span)
                    $('#temp').val(doc.data().tem)
                    $('#hum').val(doc.data().hum)
                    $('#co2').val(doc.data().co2)

                } else {
                    console.log("找不到文件");
                }
            })
            .catch(function(error) {
                console.log("提取文件時出錯:", error);
            });

    })



})