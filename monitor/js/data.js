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



$(() => {

    var docRef = db.collection("fake_data").doc("situation1").collection('usrssettingtime').doc("data");

    docRef.get().then(function(doc) {

            if (doc.exists) {

                //輸出歷次結果表格
                $('#baseline').empty()
                $('#baseline').text(doc.data().使用者希望規律起床的時間)

            } else {
                console.log("找不到文件");
            }
        })
        .catch(function(error) {
            console.log("提取文件時出錯:", error);
        });




    var date = []
    for (let index = -1; index < 5; index++) {
        var d = new Date();
        d.setDate(d.getDate() - index)
        date.push(String(d.getFullYear()) + '-' + String(d.getMonth() + 1).padStart(2, "0") + '-' + String(d.getDate()).padStart(2, "0"));

    }

    //date會抓取 明天 和包含今天以前的過去五天  一共六天的資料  ，其中明天的資訊必須在home輸入後才會顯示
    for (let index = 0; index < date.length; index++) {
        var docRef = db.collection("fake_data").doc("situation1").collection(date[index]).doc("data");
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