//游戏：食物、蛇、地图
(function () {

    function Game(map) {
        this.food=new Food();
        this.snake=new Snake();
        this.map=map;
        that=this;
    }
    Game.prototype.init=function () {
        this.food.init(document.querySelector(".map"));
        this.snake.init(document.querySelector(".map"));
        this.runSnake();
        this.bindKey();
    };
    Game.prototype.runSnake=function(){
        var timeId=setInterval(function () {
            this.snake.move(this.food,this.map);
            this.snake.init(this.map);
            var maxX=this.map.offsetWidth/this.snake.width;
            var maxY=this.map.offsetHeight/this.snake.height;
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            if(headX<0||headX>=maxX){
                clearInterval(timeId);
                alert("游戏结束！！！");
            }
            if(headY<0||headY>=maxY){
                clearInterval(timeId);
                alert("游戏结束！！！");
            }

        }.bind(that),150);//bind改变this的指向

    };
    Game.prototype.bindKey=function(){
    document.addEventListener("keydown",function (e) {
        switch (e.keyCode) {
            case 37:this.snake.direction="left";
                break;
            case 38:this.snake.direction="top";
                break;
            case 39:this.snake.direction="right";
                break;
            case 40:this.snake.direction="bottom";
                break;
        }
    }.bind(that),false);
};
window.Game=Game;
}());
