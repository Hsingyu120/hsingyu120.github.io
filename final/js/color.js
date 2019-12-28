// create color dictionary and sbuject dictionary
var colorarray = ['紅色', '橙色', '黃色', '綠色', '藍色', '紫色', '棕色', '黑色', '白色']
var subjectarray = ['背景是', '背景不是', '文字是', '文字不是']
var chsubjectarray = ['背景', '文字']
var chverbarray = ['是', '不是']
var andor = [' 或 ', ' 且 ']

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
    //asd

    $('#conoragain').empty()

    $again = $('<button>').attr('id', 'again').attr('onclick', "window.location.href=" + "'" + location.href + "'").attr('class', 'btn').addClass('btn-primary').text('重新')

    $('#conoragain').append($again)

    $correct = $('<div>').attr("class", "result").attr("align", "center")
    $label1 = $('<label>').text('正確')
    $input1 = $('<input>').attr('type', 'text').attr('class', 'form-control').attr('id', 'correct')
    $correct = $correct.append($label1).append($input1)

    $error = $('<div>').attr("class", "result").attr("align", "center")
    $label2 = $('<label>').text('錯誤')
    $input2 = $('<input>').attr('type', 'text').attr('class', 'form-control').attr('id', 'error')
    $error = $error.append($label2).append($input2)

    $clock = $('<div>').attr("class", "result").attr("align", "center")
    $label3 = $('<label>').text('時間剩餘')
    $input3 = $('<input>').attr('type', 'text').attr('class', 'form-control').attr('id', 'time')
    $clock = $clock.append($label3).append($input3)

    $score = $('<div>').attr("class", "result").attr("align", "center")
    $label4 = $('<label>').text('分數')
    $input4 = $('<input>').attr('type', 'text').attr('class', 'form-control').attr('id', 'score')
    $score = $score.append($label4).append($input4)




    $('#result').append($correct).append($error).append($score).append($clock)

}



$(() => {
    var mode = 0
    $('#confirm').on('click', () => {

        if (mode == 0) {
            alert('請先選擇難度')
        } else if (mode == 1) {


            $('#result').empty() //清掉模式選擇

            showresult()
            normal()
            mode = 0
                // $('#again').on('click', () => {

            //     alert("again")
            //     return

            // })
        } else if (mode == 2) {
            $('#result').empty()

            showresult()
            challenge()
            console.log("go here")
            mode = 0
                // $('#again').on('click', () => {

            //     alert("again")


            // })

        }



    })


    console.log('JS ready')



    $('#normal').on('click', () => {

        mode = 1

    })


    $('#challenge').on('click', () => {

        mode = 2

    })

    // $('#again').on('click', () => {




    // })




})

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