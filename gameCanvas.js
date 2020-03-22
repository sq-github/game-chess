function gameCanvas() {
    var _this = this;
    //悔棋
    this.backInfo = {
        isBack: false,//是否可以悔棋
        isCancel: false // 是否可以撤销悔棋
    }

    // 所有的棋子位置
    this.allPosArr = []
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
    // 重新开始 初始化所有元素
    this.restartGame = function () {
        var el = document.getElementById('chessBoard')
        el.innerHTML = ""
        this.allPosArr = []//先清空所有棋子坐标
        _this.drawBoardCanvas();
        _this.ChessPosCanvas()//重新计算棋子坐标
        _this.canvasClick();
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
        currentColor(_this.currentChess.colorType)
    }
    // 画棋盘：画出所有的棋盘线条
    this.drawBoardCanvas = function () {
        var chessBoard = document.getElementById('chessBoard');
        var boardCanvas = document.createElement('canvas');
        boardCanvas.style.zIndex = 10;
        boardCanvas.setAttribute('id', 'canvasBoard')
        num = 18;
        boardCanvas.width = boardCanvas.height = 460;
        var context = boardCanvas.getContext('2d')
        var width = boardCanvas.width
        var unit = (width - 20) / num
        var loca = 0;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(10, 10);
        context.lineTo(width - 10, 10);
        context.lineTo(width - 10, width - 10);
        context.lineTo(10, width - 10);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.lineWidth = 1;
        for (var i = 1; i < num; i++) {
            loca = i * unit;
            context.moveTo(loca + 10, 10);
            context.lineTo(loca + 10, width - 10);
            context.moveTo(10, loca + 10);
            context.lineTo(width - 10, loca + 10);
        }
        context.closePath();
        context.stroke();
        chessBoard.appendChild(boardCanvas);
    }
    // 计算所有能放置棋子的真实坐标
    this.ChessPosCanvas = function () {
        var unit = (460 - 20) / 18
        for (var i = 0; i < 19; i++) {
            for (var j = 0; j < 19; j++) {
                _this.allPosArr.push([10 + i * unit, 10 + j * unit])
            }
        }
    }
    // canvas添加点击事件
    this.canvasClick = function () {
        // 画放棋子的画布
        var canvasBoard = document.getElementById('chessBoard');
        var chessCanvas = document.createElement('canvas');
        chessCanvas.style.zIndex = 11;
        chessCanvas.style.position = 'absolute'
        chessCanvas.style.top = '0'
        chessCanvas.style.left = '0'
        chessCanvas.setAttribute('id', 'canvasChess')
        chessCanvas.width = chessCanvas.height = 460;
        var context = chessCanvas.getContext('2d');
        // 添加点击事件，根据点击位置画棋子
        chessCanvas.onclick = function (e) {
            var x = e.offsetX;
            var y = e.offsetY;

            for (var i = 0; i < _this.allPosArr.length; i++) {
                if (x >= _this.allPosArr[i][0] - 8 && x <= _this.allPosArr[i][0] + 8
                    && y >= _this.allPosArr[i][1] - 8 && y <= _this.allPosArr[i][1] + 8) {
                    //计算当前点击的棋子的横纵坐标
                    var posX = parseInt(i / 19)
                    var posY = i % 19
                    if (!(_this.allChess.idArr.indexOf((posX + "#" + posY)) > -1)) {
                        // 画棋子
                        context.beginPath();
                        context.arc(_this.allPosArr[i][0], _this.allPosArr[i][1], 8, 0, Math.PI * 2, true);
                        context.closePath();
                        if (_this.currentChess.colorType == 0) {
                            context.fillStyle = '#fff';
                            _this.currentChess.colorType = 1;
                        } else {
                            context.fillStyle = '#000';
                            _this.currentChess.colorType = 0;
                        }
                        context.fill();
                        // 修改当前棋子属性
                        _this.currentChess.x = posX
                        _this.currentChess.y = posY
                        _this.currentChess.color = context.fillStyle
                        // 当前回合颜色
                        currentColor(_this.currentChess.colorType)
                        _this.backInfo.isCancel = false//不可以撤销悔棋
                        _this.backInfo.isBack = true//可以悔棋
                        // 储存已画棋子的位置
                        _this.allChess.idArr.push(posX + "#" + posY)
                        _this.allChess.allChessArr[posX][posY] = _this.currentChess.colorType;
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
                }
            }
        }
        canvasBoard.appendChild(chessCanvas);
    }
    // 悔棋
    this.backChess = function () {
        if (_this.allChess.idArr.length > 0 && _this.backInfo.isBack == true) {
            var canvasBackBoard = document.getElementById('canvasChess');
            var backContext = canvasBackBoard.getContext('2d');
            // 计算在this.allPosArr中的实际位置
            var temNum = _this.currentChess.x * 19 + _this.currentChess.y
            // 清除当前位置
            backContext.clearRect(_this.allPosArr[temNum][0] - 9, _this.allPosArr[temNum][1] - 9, 18, 18);
            if (_this.currentChess.colorType == 0) {
                _this.currentChess.color = '#fff';
                _this.currentChess.colorType = 1;
            } else {
                _this.currentChess.color = '#000';
                _this.currentChess.colorType = 0;
            }
            currentColor(_this.currentChess.colorType)
            // 清除储存
            _this.allChess.idArr.pop();
            _this.allChess.allChessArr[_this.currentChess.x][_this.currentChess.y] = null;
            _this.backInfo.isCancel = true
            _this.backInfo.isBack = false
        }
    }
    // 撤销悔棋
    this.cancelBackDom = function () {
        if (_this.backInfo.isCancel) {
            var canvasBackBoard = document.getElementById('canvasChess');
            var cancelContext = canvasBackBoard.getContext('2d');
            // 计算棋子的实际位置
            var temNum = _this.currentChess.x * 19 + _this.currentChess.y
            cancelContext.beginPath();
            // 画棋子
            cancelContext.arc(_this.allPosArr[temNum][0], _this.allPosArr[temNum][1], 8, 0, Math.PI * 2, true);
            cancelContext.closePath();
            cancelContext.fill();
            if (_this.currentChess.colorType == 0) {
                _this.currentChess.color = '#fff';
                _this.currentChess.colorType = 1;
            } else {
                _this.currentChess.color = '#000';
                _this.currentChess.colorType = 0;
            }
            currentColor(_this.currentChess.colorType)
            // 储存
            _this.allChess.idArr.push(_this.currentChess.x + "#" + _this.currentChess.y)
            _this.allChess.allChessArr[_this.currentChess.x][_this.currentChess.y] = _this.currentChess.colorType;
            _this.backInfo.isCancel = false
            _this.backInfo.isBack = true
        }
    }
}