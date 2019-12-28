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






$(() => {
    var mode = 0
    $('#confirm').on('click', () => {
        if (mode == 0) {
            alert('請先選擇難度')
        } else if (mode == 1) {
            normal()
            mode = 0
            $('#again').on('click', () => {

                alert("again")
                return

            })
        } else if (mode == 2) {
            challenge()
            console.log("go here")
            mode = 0
            $('#again').on('click', () => {

                alert("again")


            })

        }



    })


    console.log('JS ready')



    $('#normal').on('click', () => {

        mode = 1

    })


    $('#challenge').on('click', () => {

        mode = 2

    })





})


var challenge = () => {
    console.log("challenge")
    var correct = 0;
    var error = 0;
    var ans = questionchallenge();
    $answer = $('<span >').attr("class", "answerspan").text('錯誤 ： ' + error + ' 正確 : ' + correct)
    $again = $('<button>').attr("class", "btn-primary").addClass("btn-lg").text('重來').attr("id", "again")
    $('#answerlist').empty()
    $('#answerlist').append($answer)
        //$('#answerlist').append($again)


    function keyFunction() {
        console.log("keyfunction")

        if (event.keyCode == 37) {

            if (false == ans) {
                correct++

                $("#left").attr("class", 'correct');

                setTimeout(function timeout() {
                    $("#left").attr("class", 'nside');
                }, 300);



            } else {
                error++
                $('#left').attr("class", 'error')
                setTimeout(function timeout() {
                    $("#left").attr("class", 'nside');
                }, 300);
            }

            $answer.text('錯誤 ： ' + error + ' 正確 : ' + correct)
            ans = questionchallenge()

        } else if (event.keyCode == 39) {

            if (true == ans) {
                correct++
                $('#right').attr("class", 'correct')
                setTimeout(function timeout() {
                    $("#right").attr("class", 'nside');
                }, 300);
            } else {
                error++
                $('#right').attr("class", 'error')
                setTimeout(function timeout() {
                    $("#right").attr("class", 'nside');
                }, 300);
            }

            $answer.text('錯誤 ： ' + error + ' 正確 : ' + correct)
            ans = questionchallenge();

        }
    }
    document.onkeydown = keyFunction;
}

var normal = () => {
    var correct = 0;
    var error = 0;
    var ans = questionnormal();
    $answer = $('<span >').attr("class", "answerspan").text('錯誤 ： ' + error + ' 正確 : ' + correct)
    $('#answerlist').empty()
    $('#answerlist').append($answer)


    function keyFunction() {

        if (event.keyCode == 37) {

            if (false == ans) {
                correct++

                $("#left").attr("class", 'correct');

                setTimeout(function timeout() {
                    $("#left").attr("class", 'nside');
                }, 300);


                //$('#left').attr("class", 'correct')
            } else {
                error++
                $('#left').attr("class", 'error')
                setTimeout(function timeout() {
                    $("#left").attr("class", 'nside');
                }, 300);
            }

            $answer.text('錯誤 ： ' + error + ' 正確 : ' + correct)
            ans = questionnormal()

        } else if (event.keyCode == 39) {

            if (true == ans) {
                correct++
                $('#right').attr("class", 'correct')
                setTimeout(function timeout() {
                    $("#right").attr("class", 'nside');
                }, 300);
            } else {
                error++
                $('#right').attr("class", 'error')
                setTimeout(function timeout() {
                    $("#right").attr("class", 'nside');
                }, 300);
            }

            $answer.text('錯誤 ： ' + error + ' 正確 : ' + correct)
            ans = questionnormal();

        }
    }
    document.onkeydown = keyFunction;
}