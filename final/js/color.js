// create color dictionary and sbuject dictionary
var colorarray = ['紅色', '橙色', '黃色', '綠色', '藍色', '紫色', '棕色', '黑色', '白色']
var subjectarray = ['背景是', '背景不是', '文字是', '文字不是']
var chsubjectarray = ['背景', '文字']
var chverbarray = ['是', '不是']
var andor = [' 或 ', ' 且 ']

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


var normal = () => {
    var correct = 0;
    var error = 0;
    var score = 0;
    var ans = questionnormal();

    score = updateresult(correct, error, score)

    function keyFunction() {

        if (event.keyCode == 37) {

            if (false == ans) {
                correct++
                score++

                $("#left").attr("class", 'correct');

                setTimeout(function timeout() {
                    $("#left").attr("class", 'nside');
                }, 300);


                //$('#left').attr("class", 'correct')
            } else {
                error++
                score -= 2
                $('#left').attr("class", 'error')
                setTimeout(function timeout() {
                    $("#left").attr("class", 'nside');
                }, 300);
            }
            score = updateresult(correct, error, score)
            ans = questionnormal()

        } else if (event.keyCode == 39) {

            if (true == ans) {
                correct++
                score++
                $('#right').attr("class", 'correct')
                setTimeout(function timeout() {
                    $("#right").attr("class", 'nside');
                }, 300);
            } else {
                error++
                score -= 2
                $('#right').attr("class", 'error')
                setTimeout(function timeout() {
                    $("#right").attr("class", 'nside');
                }, 300);
            }

            score = updateresult(correct, error, score)
            ans = questionnormal();

        }
    }
    document.onkeydown = keyFunction;
}
var questionnormal = () => {
    //create a complete sentance
    var cindex = rand(0, 8)
    var sindex = rand(0, 3)
    var sentance = subjectarray[sindex] + colorarray[cindex]
        //create two different colors for sentance and background
    var BackAndSenColor = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8])
    var backgroundcolor = 'background' + BackAndSenColor[0]
    var sentancecolor = 'moji' + BackAndSenColor[1]
        //background color is index[0]
        //sentance color is index[1]


    $('#container').empty()
    $div = $('<div>').attr('class', backgroundcolor).addClass('anscontainer')
        //change background every time
    $('#container').append($div)

    // change sentance every time 
    $moji = $('<span>').attr('class', sentancecolor).text(sentance)
    $div.append($moji)

    // create the answer for the random statement above
    if (sindex == 0) {

        if (BackAndSenColor[0] == cindex) {

            return true;

        } else {
            return false;
        }

    } else if (sindex == 1) {

        if (BackAndSenColor[0] != cindex) {

            return true;

        } else {
            return false;
        }
    } else if (sindex == 2) {

        if (BackAndSenColor[1] == cindex) {

            return true;

        } else {
            return false;
        }
    } else if (sindex == 3) {

        if (BackAndSenColor[1] != cindex) {

            return true;

        } else {
            return false;
        }
    }


}
var challenge = () => {

    var correct = 0;
    var error = 0;
    var score = 0;
    var ans = questionchallenge();
    score = updateresult(correct, error, score);


    function keyFunction() {
        // console.log("keyfunction")

        if (event.keyCode == 37) {

            if (false == ans) {
                correct++
                score++

                $("#left").attr("class", 'correct');

                setTimeout(function timeout() {
                    $("#left").attr("class", 'nside');
                }, 300);



            } else {
                error++
                score -= 2
                $('#left').attr("class", 'error')
                setTimeout(function timeout() {
                    $("#left").attr("class", 'nside');
                }, 300);
            }

            score = updateresult(correct, error, score)

            ans = questionchallenge()

        } else if (event.keyCode == 39) {

            if (true == ans) {
                correct++
                score++
                $('#right').attr("class", 'correct')
                setTimeout(function timeout() {
                    $("#right").attr("class", 'nside');
                }, 300);
            } else {
                error++
                score -= 2
                $('#right').attr("class", 'error')
                setTimeout(function timeout() {
                    $("#right").attr("class", 'nside');
                }, 300);
            }

            score = updateresult(correct, error, score)
            ans = questionchallenge();

        }
    }
    document.onkeydown = keyFunction;
}
var questionchallenge = () => {
    //create a complete sentance
    var orand = rand(0, 1);
    var isornot1 = rand(0, 1);
    var isornot2 = rand(0, 1);
    var cindex1 = rand(0, 8);
    var cindex2 = rand(0, 8);
    var sarray = shuffleArray([0, 1])
    var sentance1 = chsubjectarray[sarray[0]] + chverbarray[isornot1] + colorarray[cindex1]
    var sentance2 = chsubjectarray[sarray[1]] + chverbarray[isornot2] + colorarray[cindex2]
        //create two different colors for sentance and background
    var BackAndSenColor = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8])
    var backgroundcolor = 'background' + BackAndSenColor[0]
    var sentancecolor = 'Moji' + BackAndSenColor[1]
        //background color is index[0]
        //sentance color is index[1]

    $('#container').empty()
    $div = $('<div>').attr('class', backgroundcolor).addClass('anscontainer')
        //change background every time
    $('#container').append($div)

    // change sentance every time 

    $moji = $('<span>').attr('class', sentancecolor).text(sentance1 + andor[orand] + sentance2)
    $div.append($moji)


    // create the answer for the random statement above

    var tellmeanswer = (sub, verb, cindex) => {
        if (sub == 0 && verb == 0) {

            if (BackAndSenColor[0] == cindex) {

                return true;

            } else {
                return false;
            }

        } else if (sub == 0 && verb == 1) {

            if (BackAndSenColor[0] != cindex) {

                return true;

            } else {
                return false;
            }
        } else if (sub == 1 && verb == 0) {

            if (BackAndSenColor[1] == cindex) {

                return true;

            } else {
                return false;
            }
        } else if (sub == 1 && verb == 1) {

            if (BackAndSenColor[1] != cindex) {

                return true;

            } else {
                return false;
            }
        }
    }

    if (orand == 0) {
        let first = tellmeanswer(sarray[0], isornot1, cindex1)
        let second = tellmeanswer(sarray[1], isornot2, cindex2)
        console.log(first + "||" + second)

        return first || second

    } else {

        let first = tellmeanswer(sarray[0], isornot1, cindex1)
        let second = tellmeanswer(sarray[1], isornot2, cindex2)
        console.log(first + "&&" + second)
        return first && second

    }


}


function showresult() {
    //change the button 開始 to 重新
    $('#conoragain').empty()
    $again = $('<button>').attr('id', 'again').attr('onclick', "window.location.href=" + "'" + location.href + "'").attr('class', 'btn').addClass('btn-primary').text('重新')
    $('#conoragain').append($again)
        //show result board
    $correct = $('<div>').attr("class", "result1").attr("align", "center")
    $label1 = $('<label>').text('正確')
    $input1 = $('<input>').attr('type', 'text').attr('class', 'form-control').attr('id', 'correct').attr('disabled', true)
    $correct = $correct.append($label1).append($input1)

    $error = $('<div>').attr("class", "result1").attr("align", "center")
    $label2 = $('<label>').text('錯誤')
    $input2 = $('<input>').attr('type', 'text').attr('class', 'form-control').attr('id', 'error').attr('disabled', true)
    $error = $error.append($label2).append($input2)

    $clock = $('<div>').attr("class", "result1").attr("align", "center")
    $label3 = $('<label>').text('時間剩餘')
    $input3 = $('<input>').attr('type', 'text').attr('class', 'form-control').attr('id', 'time').attr('disabled', true)
    $clock = $clock.append($label3).append($input3)

    $score = $('<div>').attr("class", "result1").attr("align", "center")
    $label4 = $('<label>').text('分數')
    $input4 = $('<input>').attr('type', 'text').attr('class', 'form-control').attr('id', 'score').attr('disabled', true)
    $score = $score.append($label4).append($input4)


    $('#result').append($correct).append($error).append($score).append($clock)

}
var updateresult = (correct, error, score) => {
    $('#correct').val(correct)
    $('#error').val(error)

    if (score >= 0) {
        $('#score').val(score)
        return score
    } else {

        $('#score').val(0)
        return 0
    }

}

/*********************************************************************/

$(() => {

        var mode = 0
        var countdownid;
        var countdownnumber = 30;
        var name = 'zxcvbnm123'
        var history = 0



        var countdownfunc = () => {


            //console.log('hi')

            $('#time').val(countdownnumber)
            if (countdownnumber == 0) {

                clearTimeout(countdownid);　　　

                if (name != "zxcvbnm123") {
                    var Mode = mode == 1 ? "normal" : "challenge"
                    console.log("Time's up! " + name + " get " + $('#score').val() + " points" + "Mode is " + Mode)　
                    var doc_ref = db.collection("Front_End_Final").doc("Rank").collection(Mode).doc(name);
                    console.log(history + " " + $('#score').val())
                    if (history < $('#score').val()) {

                        doc_ref.update({ Score: $('#score').val() })
                    }

                }
                countdownnumber--;

                if (countdownid) {
                    clearTimeout(countdownid);
                }
                countdownid = setTimeout(countdownfunc, 1000);
                $('#time').attr('id', 'Time') //不讓-1出現





            } else if (countdownnumber == -1) {
                countdownnumber++

                alert('時間到')


                window.location = location.href
            } else {

                countdownnumber--;
                if (countdownid) {
                    clearTimeout(countdownid);
                }
                countdownid = setTimeout(countdownfunc, 1000);
            }
        }
        $('#save').on('click', () => {


            if ($('#name').val()) {
                name = $('#name').val()
                $('#confirm').attr('disabled', true)

            } else(alert("如果要記錄排名，請輸入暱稱後再按儲存，否則可以略過"))


        })


        $('#confirm').on('click', () => {

            if (mode == 0) {
                alert('請先選擇難度，遊戲暱稱為選填')
            } else if (mode == 1) {




                $('#result').empty() //清掉模式選擇

                showresult()
                normal()
                countdownfunc()



            } else if (mode == 2) {


                $('#result').empty() //清掉模式選擇

                showresult()
                challenge()
                countdownfunc()



            }



        })


        $('#normal').on('click', () => {

            mode = 1

            if (name != 'zxcvbnm123') {

                var Mode = mode == 1 ? "normal" : "challenge"


                var doc_ref = db.collection("Front_End_Final").doc("Rank").collection(Mode).doc(name);


                doc_ref.get().then(function(doc) {




                        if (doc.exists) {
                            console.log('有名')

                            history = doc.data().Score

                            console.log(history)

                            $('#confirm').removeAttr('disabled')

                        } else {

                            console.log("not file ")
                            doc_ref.set({ Name: name, Score: 0 })
                            $('#confirm').removeAttr('disabled')

                        }



                    })
                    .catch(function(error) {
                        console.log("提取文件時出錯:", error);

                    });
            }


        })

        $('#challenge').on('click', () => {

            mode = 2
            if (name != 'zxcvbnm123') {
                var history = 0
                var Mode = mode == 1 ? "normal" : "challenge"


                var doc_ref = db.collection("Front_End_Final").doc("Rank").collection(Mode).doc(name);


                doc_ref.get().then(function(doc) {




                        if (doc.exists) {
                            console.log('有名')

                            history = doc.data().Score

                            console.log(history)
                            $('#confirm').removeAttr('disabled')

                        } else {

                            console.log("not file ")
                            doc_ref.set({ Name: name, Score: 0 })
                            $('#confirm').removeAttr('disabled')

                        }



                    })
                    .catch(function(error) {
                        console.log("提取文件時出錯:", error);

                    });
            }

        })


    })
    /*********************************************************************/