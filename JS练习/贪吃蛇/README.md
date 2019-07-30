#### 贪吃蛇---面向对象的思想
**面向对象的编程思想：** 根据需求,抽象出相关的对象，总结对象的特征和行为，把特征变成属性，行为变成方法,然后定义(js)构造函数，实例化对象，通过对象调用属性和方法，完成相应的需求。
#### 思路
贪吃蛇包含：地图、食物、蛇

 - 地图：
地图的属性：宽、高、背景颜色
小蛇和食物是相对于地图显示，是地图的子元素，脱离文档流，所以地图也要脱离文档流---------css设置样式
```html
<style type="text/css">
	body{
		padding:0;
		margin:0;
	}
	.map{
		width:800px;
		height:600px;
		background-color:blue;
		position:relative;
		top:0;
		left:50%;
		margin-left:-400px;
	}
</style>
<div class="map"></div>
```
 - 食物
食物的属性：宽、高、背景颜色、坐标（横纵坐标）
食物在地图中显示，随机产生横纵坐标
 每一次初始化食物的时候先删除原来的食物,然后重新的初始化食物
```javascript
(function(){
	//用来保存每个食物
	var elements=[];
	//食物的构造函数
	function Food(width,height,color,x,y){
		this.width=width||20;
		this.height=height||20;
		this.x=x||0;
		this.y||0;
		this.color=color||"gray";
	}
	//食物的初始化----食物在地图中显示
	Food.prototype.init=function(map){
		remove();//先删除原有的，在创建新的
		var div=document.createElement("div");
		//将食物添加为地图的子元素
		map.appendChild(div);
		//设置食物样式
		div.style.height=this.height+"px";
		div.style.width=this.width+"px";
		div.style.backgroundColor=this.color;
		div.style.position="absolute";//绝对定位（相对于父元素）
		//随机产生横纵坐标
		this.x=parseInt(Math.random()*map.offsetWidth/this.width)*this.width;
		this.y=parseInt(Math.random()*map.offsetHeight/this.height)*this.height;
		div.style.top=this.y+"px";
		div.style.left=this.x+"px";
		//将食物添加到数组中
		elements.push(div);
	};
	function remove(){
		for(var i=0;i<elements.length<i++){
			var ele=elements[i];
			ele.parentNode.removeChild(ele);
			elements.splice(i,1);
		}
	}
	//将Food暴露给window，成为全局变量
	window.Food=Food;
}());
```
 - 小蛇
小蛇的属性：小蛇的身体可以看作由几个小方块构成的，每个部分都含有宽、高、方向、颜色
小蛇要想显示在地图上,先删除之前的小蛇,然后再初始化小蛇(小蛇要移动)
 小蛇要移动---方法
思路：
1.把小蛇的头的坐标给小蛇第一部分的身体,第一部分的身体的坐标给下一个部分身体
2.小蛇的头,需要单独的设置:方向
```javascript
(function(){
	var elements=[];
	function Snake(width,height,direction){
		this.width=width||20;
		this.height=height||20;
		this.direction=direction||"right";
		this.body=[
		{x:3,y:2,color:"red"},//头
		{x:2,y:2,color:"orange"},
		{x:1,y:2,color:"orange"}];
    }
    //小蛇初始化
    Snake.prototype.init=function(map){
    	remove();
    	for(var i=0;i<this.body.length;i++){
    		var obj=this.body[i];
    		var div=document.createNode("div");
    		map.appendChild(div);
    		div.style.backgroundColor=obj.color;
    		div.style.height=this.height+"px";
    		div.style.width=this.width+"px";
    		div.style.position="absolute";
    		div.style.top=obj.y*this.height+"px";
    		div.style.left=obj.x*this.width+"px";
    		elements.push(div);
    	}
    };
    //小蛇的移动方法
    Snake.prototype.move=function(food,map){
    	var i=this.body.length-1;
    	for(;i>0;i--){
    		this.body[i].x = this.body[i-1].x;
        	this.body[i].y = this.body[i-1].y;
    	}
    	switch(direction){
    		case "right":this.body[0].x+=1;break;
    		case "left":this.body[0].x-=1;break;
    		case "top":this.body[0].y-=1;break;
    		case "bottom":this.body[0].y+=1;break;
    	}
    	//小蛇吃食物
    	var headX=this.body[0].x*this.width;
    	var headY=this.body[0].y*this.height;
    	if(headX==food.x&&headY==food.y){
    		var last=this.body[this.body.length-1];
    		this.body.push({
				x:last.x,
				y:last.y,
				color:last.color
			});
			food.init(map);
    	}
    };
    function remove(){
		var i=this.body.length-1;
		for(;i>=0;i--){
			var ele=elements[i];
			ele.parentNode.removeChild(ele);
			elements.splice(i,1);
		}
	}
	//将Snake暴露给window
	winw.Snake=Snake;
}());
```
 - 要使游戏能够完成，就需要把食物、地图、小蛇之间串起来 
地图、食物、小蛇

```javascript
(function(){
	var that=null;
	function Game(map){
		this.map=map;
		this.food=new Food();
		this.snake=new Snake();
		that=this;
	}
	//游戏初始化----食物初始化、小蛇初始化
	Game.prototype.init=function(){
		this.food.init(document.querySelector(".map"));
		this.snake.init(document.querySelector(".map"));
		this.runSnake();
		this.bindKey();
	};
	//小蛇移动
	Game.prototype.runSnake=function(){
		var timeId=setInterval(function(){
		//setInterval中的this指向window，需要重新指定this的方向
			this.snake.move(this.food,this.map);
			this.snake.init(this.map);
			//判断撞墙
			var headX=this.snake.body[0].x;
			var headY=this.snake.body[0].y;
			var maxX=this.map.offsetWidth/this.snake.width;
			var maxY=this.map.offsetHeight/this.snake.height;
			if(headX<0||headX>=maxX){
				clearInterval(timeId);
				alert("游戏结束！！！");
			}
			if(headY<0||headY>=maxY){
				clearInterval(timeId);
				alert("游戏结束！！！");
			}
		}.bind(that),150);//bind()改变this的指向
	};
	Game.prototype.bindKey=function(){
		document.addEventListener("keydown",function(e){
			switch(e.keyCode){
			//此处的this指向document，所以需要改变this的指向
			  case 37:this.snake.direction="left";
                    break;
                case 38:this.snake.direction="top";
                    break;
                case 39:this.snake.direction="right";
                    break;
                case 40:this.snake.direction="bottom";
                    break;
                    }
		}.bind(that),"false");
	};
	window.Game=Game;
}());
```

 - 在html文件中引入js文件

```javascript
<script src="js/food.js"></script>
<script src="js/snake.js"></script>
<script src="js/game.js"></script>
<script>
    var game=new Game(document.querySelector(".map"));
    game.init();
</script>
```
#### 总结
贪吃蛇总共有三个部分——地图、食物、小蛇

**地图：** 宽、高、背景颜色；

**食物：** 宽、高、背景颜色、随机产生横纵坐标，添加至地图中；
          小蛇吃掉食物后，删除原有的，重新初始化；
	  
**小蛇：** 将小蛇的身体看作由几个部分组成，每个部分宽、高、方向、颜色、坐标，添加至地图中；
          身体部分移动思想：把小蛇的头的坐标给小蛇第一部分的身体,第一部分的身体的坐标给下一个部分身体.....小蛇的头,需要单独的设置，移动后删除原有的；
	  小蛇的长度增加；
	  
**游戏：** 初始化创建食物、小蛇；
           小蛇移动，移动范围；
           绑定键盘，改变小蛇方向；
