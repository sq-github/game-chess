// 判断胜利 分四个方向判断胜利
function judge(arr, current) {
    var _this = this;
    // 横向
    var numH = 1
    for (var i = current.x - 1; i >= 0; i--) {
        if (arr[i][current.y] === current.colorType) {
            numH += 1;
        } else {
            break;
        }
    }
    for (var i = current.x + 1; i <= 18; i++) {
        if (arr[i][current.y] === current.colorType) {
            numH += 1;
        } else {
            break;
        }
    }
    // 纵向
    var numV = 1
    for (var i = current.y - 1; i >= 0; i--) {
        if (arr[current.x][i] === current.colorType) {
            numV += 1;
        } else {
            break;
        }
    }
    for (var i = current.y + 1; i <= 18; i++) {
        if (arr[current.x][i] === current.colorType) {
            numV += 1;
        } else {
            break;
        }
    }
    // 左斜\
    var numL = 1
    for (var i = current.x - 1, j = current.y - 1; i >= 0 && j >= 0; i--, j--) {
        if (arr[i][j] === current.colorType) {
            numL += 1;
        } else {
            break;
        }
    }
    for (var i = current.x + 1, j = current.y + 1; i <= 18 && j <= 18; i++, j++) {
        if (arr[i][j] === current.colorType) {
            numL += 1;
        } else {
            break;
        }
    }
    // 右斜/
    var numR = 1
    for (var i = current.x + 1, j = current.y - 1; i <= 18 && j >= 0; i++, j--) {
        if (arr[i][j] === current.colorType) {
            numR += 1;
        } else {
            break;
        }
    }
    for (var i = current.x - 1, j = current.y + 1; i >= 0 && j <= 18; i--, j++) {
        if (arr[i][j] === current.colorType) {
            numR += 1;
        } else {
            break;
        }
    }
    if (numH >= 5 || numV >= 5 || numL >= 5 || numR >= 5) {
        return true;
    }
}
// 当前回合颜色
function currentColor(col) {
    var currentColorDiv = document.getElementById('currentChess')
    if (col == 0) {
        currentColorDiv.style.backgroundColor = '#fff';
    } else {
        currentColorDiv.style.backgroundColor = '#000';
    }
}