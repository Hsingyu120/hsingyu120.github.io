var oul = document.getElementById("oul");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var bgaudio = document.getElementById("bgaudio");
var si = document.getElementById("go");
var chi = document.getElementById("chi");
var dqcd = document.getElementById("dqcd");
var ls = document.getElementById("ls");
var level = document.getElementById("level");
// 首先我们先获取各个标签的id，在后面会用到 
var ox = document.createDocumentFragment();

function ab() {
    for (var i = 0; i < 400; i++) {
        var oli = document.createElement("li")
        ox.appendChild(oli)
    }
}
ab();
oul.appendChild(ox);

function co() {
    return "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")"
}
var food = [{ pos: 0, color: "red" }];

function isin(index) {
    for (var j = 0, l = snkbody.length; j < l; j++) {
        if (snkbody[j].pos == index) {
            return true;
            break;
        }
    }
    return false;
};

function snkfood() {
    var index = Math.floor(Math.random() * 400);
    while (isin(index)) {
        index = Math.floor(Math.random() * 400);
    }
    food = { pos: index, color: co() }
    snk[index].style.background = food.color;
}
// 如果食物被蛇身覆盖，随机再次产生产生一个食物
snkfood();

var snkh = snkbody.slice(-1)[0].pos;
var snkw = snkbody.slice(0, 1)[0].pos;
// 获取蛇头蛇尾位置
for (var k = 0, l = snkbody.length; k < l - 1; k++) {
    snkbody[k].pos = snkbody[k + 1].pos;
}
snkh = snkbody[l - 1].pos;
// 蛇向前一步走

snk[snkw].style.background = 0;

var bodywid = document.body.offsetWidth;
if (bodywid > 1024) {
    document.addEventListener("keydown", function(e) {
        e = e || window.event;
        switch (e.keyCode) {
            case 37:
                {
                    //  left
                    if (fxg == 39) return false;
                    fxg = e.keyCode;
                    break;
                }
            case 38:
                {
                    if (fxg == 40) return false;
                    fxg = e.keyCode;
                    break;
                    // up 
                }
            case 39:
                {
                    if (fxg == 37) return false;
                    fxg = e.keyCode;
                    break;
                    // right   
                }
            case 40:
                {
                    if (fxg == 38) return false;
                    fxg = e.keyCode;
                    break;
                    // down
                }
        }
    }, false);
    // 识别按键
} else {
    oul.touch({
        swipeLeft: function() {
            kkk(37)
        },
        swipeRight: function() {
            kkk(39)
        },
        swipeUp: function() {
            kkk(38)
        },
        swipeDown: function() {
            kkk(40)
        },
    });
    // 划动改变函数kkk的值，使蛇改变方向
    function kkk(e) {
        switch (e) {
            case 37:
                {
                    //  left
                    if (fxg == 39) return false;
                    fxg = e;
                    break;
                }
            case 38:
                {
                    if (fxg == 40) return false;
                    fxg = e;
                    break;
                    // up 
                }
            case 39:
                {
                    if (fxg == 37) return false;
                    fxg = e;
                    break;
                    // right   
                }
            case 40:
                {
                    if (fxg == 38) return false;
                    fxg = e;
                    break;
                    // down
                }
        }
    }
    // 39：右  1：40  2：37  3：38
}
if (fxg == 40) {
    snkbody[l - 1].pos = snkbody[l - 1].pos + 20;
} else if (fxg == 37) {
    snkbody[l - 1].pos = snkbody[l - 1].pos - 1;
} else if (fxg == 38) {
    snkbody[l - 1].pos = snkbody[l - 1].pos - 20;
} else if (fxg == 39) {
    snkbody[l - 1].pos = snkbody[l - 1].pos + 1;
}
if (snkh == food.pos) {
    snkbody.unshift({ pos: snkw, color: food.color });
    // 将食物放到蛇尾
    snkfood();
    // 再次刷新食物
    chi.play();
    // 播放吃食物音效
    var snkbodycd = snkbody.length - 5;
    // 获取分数
    dqcd.innerText = snkbodycd;
    // 刷新当前分数
}

// 我们的小格子边框是20个，所以我们要在全局建立个数变量
var geshu = 20;
// 之后根据索引找出各个边框处小格子的规律，并且识别蛇头方向，进行碰壁处理
var fxg = 39;
// 初始化方向为向右
if ((snkh + 1) % geshu == 0 && fxg == 39) {
    sile();
} else if (snkh >= 400 - geshu && fxg == 40) {
    sile();
} else if (snkh % geshu == 0 && fxg == 37) {
    sile();
} else if (snkh < geshu && fxg == 38) {
    sile();
}

for (var i = 0, l = snkbody.length; i < l - 1; i++) {
    if (snkbody[i].pos == snkh) {
        sile();
    }
}
cd();

btn1.onclick = function() {
        sudu = level.value
            // 设置速度
        clearInterval(ddd)
            // 首先清除定时器，防止多次点击定时器冲突
        ddd = setInterval(function() {
                fzhs();
            }, sudu)
            // 将以上蛇开始运动的代码放入一个名为fzhs的代码中循环
        bgaudio.play();
        // 播放背景音乐
    }
    // 点击开始
btn2.onclick = function() {
    clearInterval(ddd);
    // 清除定时器
    bgaudio.pause();
    // 声音暂停
}

function sile() {
    var l = snkbody.length - 5;
    // 计算蛇吃了几个食物
    var score = localStorage.getItem("score")
    if (l > score) {
        localStorage.setItem("score", l)
    }
    // 如果当前分数大于历史最高分数，我们要将历史最高分数设置为当前分数
    si.play();
    // 播放死亡音乐
    alert("GameOver");
    // 弹出GameOver
    location.reload();
    页面刷新
    return false;
}

var score = localStorage.getItem("score") || 0;
ls.innerHTML = score;