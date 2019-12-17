$(() => {
    var times = 0
    console.log('JS ready')
        //隨機產生一組解答
    var answer = createanswer()

    $('#answer').on('click', () => {
        $('#outputanswer').val(answer)
    })


    $('#confirm').on('click', () => {
        //猜一次，次數加一
        times++

        //AB用來記錄結果
        var A = 0
        var B = 0


        //檢查輸入格式
        try {
            var guess = getguess(String($('#inputdigits').val()))
        } catch (e) {
            if (e == "InvalidLengthError") {
                alert("請輸入四位數字")
            } else if (e == "repeatdigitError") {
                alert("數字不能重複")
            }
        }

        //結果判斷
        for (let index = 0; index < 4; index++) {
            const element = guess[index];
            if (guess[index] == answer[index]) {
                A++
            } else if (guess[index] == answer[0] | guess[index] == answer[1] | guess[index] == answer[2] | guess[index] == answer[3]) {
                B++
            }
        }


        //輸出結果
        $('#result').val(A + "A" + B + "B")

        //輸出歷次結果表格
        $tr = $('<tr>')
        $times = $('<th>').attr('scope', "row").text(times)
        $guess = $('<td>').text(guess)
        $result = $('<td>').text(A + "A" + B + "B")
        $tr.append($times).append($guess).append($result)

        $('#data').append($tr)



    })

})

var rand = (start, end) => {
    var r
    n = end - start + 1 //求亂數的範圍 
    r = Math.random() * n // 放大
    r = Math.floor(r) // 去除小數點
    r += start // 位移
    return r
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        let j = rand(0, 9);
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

var check = () => {

}

var createanswer = () => {
    var num = ""
    var digit = []
    for (i = 0; i < 10; i++) {
        digit.push(i)
    }
    shuffleArray(digit)
    for (let index = 0; index < 4; index++) {
        const element = String(digit[index]);
        num += element;
    }
    //show 4 digits
    var length = 4
    for (var len = (num + "").length; len < length; len = num.length) {
        num = "0" + num;
    }
    return num

}

function getguess(guess) {

    let repeat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let check
    for (let index = 0; index < 4; index++) {
        let i = Number(guess[index])
        repeat[i]++
    }
    //console.log(repeat)
    for (let index = 0; index < repeat.length; index++) {
        if (repeat[index] > 1) {
            check = true
            break
            //console.log("true")
        } else {
            check = false
                //console.log("false")
        }
    }


    if (guess.length != 4) {
        throw "InvalidLengthError"
    } else if (check) {
        throw "repeatdigitError"
    } else {
        return guess
    }
}