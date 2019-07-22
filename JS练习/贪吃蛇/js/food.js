//食物：宽、高、颜色、横纵坐标
//(())相较于()()更具整体性
(function(){
    var elements=[];//用来保存每个小方块食物的
    //食物的构造函数
    function Food(x,y,width,height,color) {
        this.x=x||0;
        this.y=y||0;
        this.width=width||20;
        this.height=height||20;
        this.color=color||"gray";
    }
    //将食物显示在地图中
    Food.prototype.init=function (map) {
        //每次新建食物之前删除其他食物-----地图中只有一个事物
        remove();
        var div=document.createElement("div");
        map.appendChild(div);
        //设置食物样式
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.backgroundColor=this.color;
        div.style.position="absolute";
        //横纵坐标随机产生
        this.x=parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y=parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.top=this.y+"px";
        div.style.left=this.x+"px";
        //将食物添加进数组中
        elements.push(div);
    };
    //私有函数-----删除食物
    function remove(){
        for (var i=0;i<elements.length;i++){
            var ele=elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    }
    //将Food暴露给Window
    window.Food=Food;
}());