function gameDom() {
    var _this = this;
    //悔棋
    this.backInfo = {
        isBack: false,//是否可以悔棋
        isCancel: false // 是否可以撤销悔棋
    }
    // 当前棋子的属性
    this.currentChess = {
        x: 0,
        y: 0,
        color: "#000",
        colorType: 0,//默认0代表黑色，1代表白色
    }
    var tArray = new Array();
    for (var k = 0; k < 19; k++) {
        tArray[k] = new Array();
    }
    // 被点击的所有棋子
    this.allChess = {
        idArr: [],//所有的棋子id数组,
        allChessArr: tArray//被点击的棋子的二维数组
    }
    // 画棋盘 由小格子组成
    this.drawBoard = function () {
        var chessBoard = document.getElementById('chessBoard')
        num = (460 - 21) / 18;
        var temDiv = document.createElement('div');
        temDiv.style.position = 'relative';
        var width = num;
        var height = num;
        var borderTop = '2px solid #000';
        var border = '1px solid #000';
        temDiv.style.display = 'inline-block';
        temDiv.style.width = width + 'px';
        temDiv.style.height = height + 'px';
        temDiv.style.borderRight = temDiv.style.borderBottom = border;
        for (var i = 0; i < 18; i++) {
            for (var j = 0; j < 18; j++) {
                var newDiv = temDiv.cloneNode(true);
                newDiv.setAttribute('id', 'id' + i + "and" + j)
                if (i == 0) {
                    newDiv.style.borderTop = borderTop;
                }
                else if (i == 18 - 1) {
                    newDiv.style.borderBottom = borderTop;
                }
                if (j == 0) {
                    newDiv.style.borderLeft = borderTop;
                }
                else if (j == 18 - 1) {
                    newDiv.style.borderRight = borderTop;
                }
                chessBoard.appendChild(newDiv);
            }
        }
    };
    // 画棋子：先画出所有的交点棋子，backgroundColor = 'transparent'，并设置其id属性加以区分
    this.drawChessOne = function () {
        var chessOneDiv = document.createElement('div');
        chessOneDiv.style.backgroundColor = 'transparent';
        chessOneDiv.style.width = '16px';
        chessOneDiv.style.height = '16px';
        chessOneDiv.style.borderRadius = '50%';
        chessOneDiv.style.position = 'absolute';
        for (var i = 0; i < 18; i++) {
            for (var j = 0; j < 18; j++) {
                var str = 'id' + i + "and" + j
                var chessEl = document.getElementById(str)

                var chessOneNodeAll = chessOneDiv.cloneNode(true);
                chessOneNodeAll.setAttribute('id', i + "#" + j)
                chessOneNodeAll.style.left = - 8.5 + 'px';
                chessOneNodeAll.style.top = - 8.5 + 'px';
                chessEl.appendChild(chessOneNodeAll);
                if (i == 18 - 1) {
                    var chessOneNodeLeft = chessOneDiv.cloneNode(true);
                    chessOneNodeLeft.setAttribute('id', + (i + 1) + "#" + j)
                    chessOneNodeLeft.style.bottom = - 8.5 + 'px';
                    chessOneNodeLeft.style.left = - 8.5 + 'px';
                    chessEl.appendChild(chessOneNodeLeft);
                }
                if (j == 18 - 1) {
                    var chessOneNodeRight = chessOneDiv.cloneNode(true);
                    chessOneNodeRight.setAttribute('id', i + "#" + (j + 1))
                    chessOneNodeRight.style.top = - 8.5 + 'px';
                    chessOneNodeRight.style.right = - 8.5 + 'px';
                    chessEl.appendChild(chessOneNodeRight);
                }
                if (j == 18 - 1 && i == 18 - 1) {
                    var chessOneNodeLast = chessOneDiv.cloneNode(true);
                    chessOneNodeLast.setAttribute('id', (i + 1) + "#" + (j + 1))
                    chessOneNodeLast.style.right = - 8.5 + 'px';
                    chessOneNodeLast.style.bottom = - 8.5 + 'px';
                    chessEl.appendChild(chessOneNodeLast);
                }

            }
        }
    };
    //棋子添加点击事件：根据事先画好的棋子id区分，并分别添加点击事件
    this.addChessEvent = function () {
        for (var i = 0; i < 19; i++) {
            for (var j = 0; j < 19; j++) {
                var chessStr = i + "#" + j
                var chessDiv = document.getElementById(chessStr)
                chessDiv.addEventListener("click", function (e) {
                    var temId = e.target.id.split('#').map(item => {
                        return item = parseInt(item)
                    })
                    // 当前棋子位置未被点击
                    if (!(_this.allChess.idArr.indexOf(e.target.id) > -1)) {
                        _this.currentChess.x = temId[1];
                        _this.currentChess.y = temId[0];
                        if (_this.currentChess.colorType == 0) {
                            _this.currentChess.color = '#fff';
                            _this.currentChess.colorType = 1;
                        } else {
                            _this.currentChess.color = '#000';
                            _this.currentChess.colorType = 0;
                        }
                        this.style.backgroundColor = _this.currentChess.color;
                        // 储存棋子
                        _this.allChess.idArr.push(e.target.id)
                        _this.allChess.allChessArr[_this.currentChess.x][_this.currentChess.y] = _this.currentChess.colorType;
                        _this.backInfo.isCancel = false//不可以撤销悔棋
                        _this.backInfo.isBack = true//可以悔棋
                        currentColor(_this.currentChess.colorType)
                        // 判断胜利
                        if (judge(_this.allChess.allChessArr, _this.currentChess)) {
                            setTimeout(() => {
                                var str;
                                if (_this.currentChess.colorType == 1) {
                                    str = '白棋获胜！'
                                } else {
                                    str = '黑棋获胜！'
                                }
                                alert(str)
                                _this.restartGame();
                            }, 10);
                        }
                    }
                });
            }
        }
    }
    // 重新开始 初始化所有元素
    this.restartGame = function () {
        var el = document.getElementById('chessBoard')
        el.innerHTML = ""
        _this.drawBoard();
        _this.drawChessOne();
        _this.addChessEvent();
        var tem = new Array();
        for (var k = 0; k < 19; k++) {
            tem[k] = new Array();
        }
        _this.allChess = {
            idArr: [],
            allChessArr: tem
        }
        _this.currentChess = {
            x: 0,
            y: 0,
            color: "#000",
            colorType: 0,
        }
        currentColor(_this.currentChess.colorType)//初始化显示当前棋子颜色
    }
    // 悔棋：将棋子backgroundColor = 'transparent'，并修改当前棋子属性
    this.backChess = function () {
        if (_this.allChess.idArr.length > 0 && _this.backInfo.isBack == true) {
            var backStr = _this.currentChess.y + "#" + _this.currentChess.x
            var backDiv = document.getElementById(backStr)
            backDiv.style.backgroundColor = 'transparent';
            if (_this.currentChess.colorType == 0) {
                _this.currentChess.color = '#fff';
                _this.currentChess.colorType = 1;
            } else {
                _this.currentChess.color = '#000';
                _this.currentChess.colorType = 0;
            }
            currentColor(_this.currentChess.colorType)
            // 移除棋子
            _this.allChess.idArr.pop();
            _this.allChess.allChessArr[_this.currentChess.x][_this.currentChess.y] = null;
            _this.backInfo.isCancel = true
            _this.backInfo.isBack = false
        }
    }
    // 撤销悔棋：根据当前棋子id属性找到悔棋的棋子，加上颜色，并修改当前棋子属性
    this.cancelBackDom = function () {
        if (_this.backInfo.isCancel) {
            var backStr = _this.currentChess.y + "#" + _this.currentChess.x
            var backDiv = document.getElementById(backStr)
            if (_this.currentChess.colorType == 0) {
                _this.currentChess.color = '#fff';
                _this.currentChess.colorType = 1;
            } else {
                _this.currentChess.color = '#000';
                _this.currentChess.colorType = 0;
            }
            currentColor(_this.currentChess.colorType)
            backDiv.style.backgroundColor = _this.currentChess.color;
            // 储存棋子
            _this.allChess.idArr.push(backStr);
            _this.allChess.allChessArr[_this.currentChess.x][_this.currentChess.y] = _this.currentChess.colorType;
            _this.backInfo.isCancel = false
            _this.backInfo.isBack = true
        }
    }
}