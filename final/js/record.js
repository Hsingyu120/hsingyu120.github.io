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


$(() => {
    normal = []
    challenge = []
    RANK = [normal, challenge]
    mode = ['normal', 'challenge']

    console.log('js ready')


    console.log('mode' + mode.length)



    for (let index = 0; index < mode.length; index++) {
        console.log('shity')
        var doc_ref = db.collection("Front_End_Final").doc("Rank").collection(mode[index]);

        //var docRef = db.collection("").doc("situation1").collection(day[index]).doc("數據");
        doc_ref.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log("hi")
                    //console.log(doc.id, " => ", doc.data());
                    let id = doc.id
                    let score = doc.data()
                    RANK[index].push(score)
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

    }






    setTimeout(show, 3000)

    function show() {

        //console.log(RANK[0].length)

        RANK[0].sort(function compareNumbers(a, b) {
            return b.Score - a.Score;
        })
        RANK[1].sort(function compareNumbers(a, b) {
            return b.Score - a.Score;
        })

        for (let i = 0; i < RANK[0].length; i++) {
            console.log(RANK[0][i]);
            $tr1 = $('<tr>').attr("align", "center")
            $rank1 = $('<th>').attr('scope', "row").text(i + 1)
            $name1 = $('<td>').text(RANK[0][i].Name)
            $score1 = $('<td>').text(RANK[0][i].Score)

            $tr1.append($rank1).append($name1).append($score1)
            $('#data1').append($tr1)



        }
        for (let i = 0; i < RANK[1].length; i++) {
            console.log(RANK[1][i]);
            $tr2 = $('<tr>').attr("align", "center")
            $rank2 = $('<th>').attr('scope', "row").text(i + 1)
            $name2 = $('<td>').text(RANK[1][i].Name)
            $score2 = $('<td>').text(RANK[1][i].Score)



            $tr2.append($rank2).append($name2).append($score2)
            $('#data2').append($tr2)

        }
        $('#loading').empty()
            // //輸出歷次結果表格



    }
















    // doc_ref.get().then(function(doc) {

    //         if (doc.exists) {

    //             console.log(doc.data())




    //             //輸出歷次結果表格
    //             // $tr = $('<tr>').attr("align", "center")
    //             // $date = $('<th>').attr('scope', "row").text(doc.data().日期)
    //             // $dead = $('<td>').text(doc.data().使用者設定起床時間)
    //             // $estimate = $('<td>').text(doc.data().鬧鐘預計喚醒時間)
    //             // $accall = $('<td>').text(doc.data().鬧鐘實際喚醒時間)
    //             // $acwakeup = $('<td>').text(doc.data().使用者實際起床時間)
    //             // $snooze = $('<td>').text(doc.data().使用者賴床時間)
    //             // $temp = $('<td>').text(doc.data().喚醒前一小時平均溫度)
    //             // $hum = $('<td>').text(doc.data().喚醒前一小時平均濕度)
    //             // $co2 = $('<td>').text(doc.data().喚醒前一小時平均二氧化碳濃度)
    //             // $tr.append($date).append($dead).append($estimate).append($accall).append($acwakeup).append($snooze).append($temp).append($hum).append($co2)

    //             // $('#data').append($tr)
    //         } else {
    //             console.log("找不到文件");
    //         }
    //     })
    //     .catch(function(error) {
    //         console.log("提取文件時出錯:", error);
    //     });


    // }




    // $('#submit').on('click', () => {

    //     console.log('submited')

    //     var docRef = db.collection("Sensor").doc("20191213");
    //     docRef.get().then(function(doc) {
    //             if (doc.exists) {
    //                 console.log(doc.data().tem);
    //                 $('#show').empty()
    //                     // $span = $('<span>').text(JSON.stringify(doc.data()[1]));
    //                     //   $('#show').append($span)
    //                 $('#temp').val(doc.data().tem)
    //                 $('#hum').val(doc.data().hum)
    //                 $('#co2').val(doc.data().co2)

    //             } else {
    //                 console.log("找不到文件");
    //             }
    //         })
    //         .catch(function(error) {
    //             console.log("提取文件時出錯:", error);
    //         });

    // })



})