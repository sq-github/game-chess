var tag = true;//棋盘标志 true代表Dom棋盘 false代表canvas棋盘
var gameClass = new gameCanvas();

window.onload = function () {
    gameClass.restartGame();
}
// 切换棋盘
function changeBoard() {
    var el = document.getElementById('chessBoard')
    el.innerHTML = ""
    var boardTag = document.getElementById('boardTag')
    if (tag) {
        tag = !tag;
        gameClass = new gameDom();
        boardTag.innerHTML = "DOM"
    } else {
        tag = !tag;
        gameClass = new gameCanvas();
        boardTag.innerHTML = "Canvas"
    }
    gameClass.restartGame();
}
// 重新开始
function restart() {
    gameClass.restartGame();
}
// 悔棋
function backChess() {
    gameClass.backChess();
}
// 撤销悔棋
function cancelBackChess() {
    gameClass.cancelBackDom();
}