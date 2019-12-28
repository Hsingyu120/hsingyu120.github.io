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

    sensorvalue()




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