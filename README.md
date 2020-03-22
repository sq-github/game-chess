# game-chess
#### 五子棋游戏，有DOM和Canvas两种棋盘。
**体验地址：**<https://sq-github.github.io/game-chess/game>  
**文件描述：** com.js：公共方法文件。gameCanvas.js：Canvas棋盘方法文件。gameDom.js：DOM棋盘方法文件。initGame.js：初始化页面文件。common.css：页面样式文件。game.html：页面html文件。  
**具体方法：**   
1、DOM棋盘：先画棋盘线条，然后画出交点处所有棋子，设置为transparent，并设置每个棋子的id。根据棋子点击事件变换当前棋子的颜色（黑、白、transparent），实现黑白棋子以及删除的交互。   
2、Canvas棋盘：棋盘是一张画布，棋子是另一张画布。先画棋盘线条的画布，找出所有的交点坐标。然后画出放置棋子的画布，并添加点击事件，根据点击的位置，画棋子在棋子画布上。在棋子画布上画不同颜色的棋子和清除当前位置实现棋子的黑白以及删除交互。  
3、切换棋盘：Canvas和DOM是两个不同的类，具备相同的方法。通过切换棋盘类即可。
