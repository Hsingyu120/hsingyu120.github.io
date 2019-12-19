$(() => {
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


    var gettime = () => {
        var days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        var d = new Date(); // for now
        d.getHours(); // => 9
        d.getMinutes(); // =>  30
        d.getSeconds(); // => 51
        console.log(days[String(d.getDay())])
        $('#date').val(String(d.getUTCFullYear()).padStart(2, "0") + " \\ " + String(d.getMonth() + 1).padStart(2, "0") + " \\ " + String(d.getDate()).padStart(2, "0"))
        $('#day').val(days[String(d.getDay())])
        $('#time').val(String(d.getHours()).padStart(2, "0") + " : " + String(d.getMinutes()).padStart(2, "0") + " : " + String(d.getSeconds()).padStart(2, "0"))

        //console.log(String(d.getDay()) + " " + String(d.getMonth() + 1) + " " + String(d.getDate()) + " " + String(d.getHours()) + " " + String(d.getMinutes()) + " " + String(d.getSeconds()))
    }

    setInterval(gettime, 1000)





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
                    $('#co2').val("NA")



                } else {
                    console.log("找不到文件");
                }
            })
            .catch(function(error) {
                console.log("提取文件時出錯:", error);
            });

    })
})