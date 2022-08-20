var rand = (start, end) => {
    var r
    n = end - start + 1 //求亂數的範圍 
    r = Math.random() * n // 放大
    r = Math.floor(r) // 去除小數點
    r += start // 位移
    return r
}

var newPoker = (r) => {
    $img = $('<img>').attr('src', './img/poker/pic' + r + '.png')
        // 產生 div 的 jQuery 物件在變數 $div
    $div = $('<div>').addClass('col').addClass('poker')
        // 將 $img 插入到 $div 內
    $div.append($img)
        // 將 $div 插入到網頁 id=data 的html element 裡面
    $('#data').append($div)
}

function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        let j = rand(0, array.length - 1);
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}