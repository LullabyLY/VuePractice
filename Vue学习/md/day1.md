### 什么是Vue.js？
 + Vue.js是最火的前端框架，React.js是最流行的前端框架（React可以开发网站，也可以开发手机APP，Vue也可以开发手机APP，但是需要借助week）
 + 前端三是大主流框架：Vue.js，Angular.js，React.js
 + Vue.js是一个构建用户界面的框架，只关注视图层，易上手，便于与第三方库整合
 + 主要负责MVC中的V，主要和用户界面打交道，制作前端页面效果
### 为什么学习前端主流框架？
 + 企业为了提高效率
 + 提高效率历程：原生JS（存在兼容性）=>JQuery之类的库（需要频繁操作DOM元素）=>前端模板引擎（存在不必要的DOM操作）=>Angular.js/Vue.js/React.js（减少不必要的DOM操作，只需关心数据的逻辑结构，不在关心DOM如何操作）
 + 在Vue中，一个核心的概念，就是不在操作DOM元素，更多的关注业务逻辑，增加就业竞争力
### 框架和库的区别
 + 框架：是一类完整的解决方案，对项目的入侵性较大，项目如果需要更换框架，则需要重新架构整个项目
 + 库（插件）：提供某个小功能，对项目的入侵性较小
### MVC和MVVM之间的区别
 + MVC是后端的分层开发概念，M：Model；V：视图；C：业务逻辑层，如路由
 + MVVM是前端视图层，M：每个页面中单独的数据；V：每个页面中的HTML结构；VM：M和V之间的调度者，分割了M和V
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190725172207686.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyODUzMjQx,size_16,color_FFFFFF,t_70)
 + 前端使用MVVM是为了让我们开发方便，MVVM提供了数据的双向绑定（有VM提供）
### vue基本代码和MVVM之间的对应关系
1. 导入Vue的包
2. 创建一个Vue实例
当我们导入包之后，在浏览器的内存中，就多了一个 Vue 构造函数
注意：我们 new 出来的这个 vm 对象，就是我们 MVVM中的 VM调度者
3. 创建一个Vue控制的区域
Vue 实例所控制的这个元素区域，就是我们的 V

```html
<head>
 <!-- 导入vue包 -->
    <script src="lib/vue-2.4.0.js"></script>
</head>
<body>
<!--vue控制的区域 -->
<!-- Vue 实例所控制的这个元素区域，就是我们的 V  -->
<div id="app">
    <p>{{msg}}</p>
</div>
<script>
    //创建一个vue实例：当导入包后，浏览器内存就多了一个Vue构造函数
     //  注意：我们 new 出来的这个 vm 对象，就是我们 MVVM中的 VM调度者
    var vm=new Vue({
        el:'#app',  // 表示，当前我们 new 的这个 Vue 实例，要控制页面上的哪个区域
      // 这里的 data 就是 MVVM中的 M，专门用来保存 每个页面的数据的
        data:{// data 属性中，存放的是 el 中要用到的数据
            msg:"vue基础代码"// 通过 Vue 提供的指令，很方便的就能把数据渲染到页面上
        }
    });
</script>
```
效果图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190725174528669.png)
### v-cloak, v-text, v-html指令
+ 我们在代码中经常使用插值表达式`{}`来添加数据，但他可能存在闪烁问题（在网速比较慢的情况下，刷新或者加载会出现{{msg}}【变量】的情况），为解决这一情况，我们有v-cloak指令来解决。

```html
 <p v-cloak>++++++++ {{ msg }} ----------</p>
```

```css
 [v-cloak] {
       display: none; 
    }
```
+ v-text：默认没有闪烁问题，v-text会覆盖元素中原本的内容，但是插值表达式  只会替换自己的这个占位符，不会把 整个元素的内容清空

```html
 <h4 v-text="msg">==================</h4>
```
输出为：vue基础代码（msg的值为"vue基础代码"）
+ v-html：默认没有闪烁问题，也会覆盖元素中原本的内容，可以解析包含html标签的值

```html
<div v-html="msg">1212112</div>
```
输出为：这里可以包含html标签（msg的值为`"<h1>这里可以包含html标签</h1>"`）
### v-bind、v-on指令

 - v-bind： 是 Vue中，提供的用于绑定属性的指令，可以简写为`:`

```html
<input type="button" value="按钮" v-bind:title="mytitle + '123'">
<!--mytitle是data中定义的，123是追加的-->
```

 - v-on：事件绑定机制，缩写@

```html
 <input type="button" value="按钮" :title="mytitle + '123'" v-on:click="alert('hello')">
```
### <a href="https://blog.csdn.net/qq_42853241/article/details/97315647" target="_blank">案例-跑马灯效果</a>
### 事件修饰符

 - .stop：阻止冒泡事件
 - .prevent：阻止默认行为
 - .capture：添加事件侦听器时使用事件捕获机制
 - .self： 只当事件在该元素本身（比如不是子元素）触发时触发回调
 - .once：事件只触发一次

> .stop和.self的区别
> .self只会阻止自己身上的冒泡行为的触发，并不能真正的阻止冒泡行为

```html
 <script src="./lib/vue-2.4.0.js"></script>
  <style>
    .inner {
      height: 150px;
      background-color: darkcyan;
    }

    .outer {
      padding: 40px;
      background-color: red;
    }
  </style>

<body>
  <div id="app">

    <!-- 使用  .stop  阻止冒泡 -->
      <div class="inner" @click="div1Handler">
      <input type="button" value="点击" @click.stop="btnHandler">
    </div>

    <!-- 使用 .prevent 阻止默认行为 -->
    <a href="http://www.baidu.com" @click.prevent="linkClick">有问题，先去百度</a> 

    <!-- 使用  .capture 实现捕获触发事件的机制 -->
   <div class="inner" @click.capture="div1Handler">
      <input type="button" value="点击" @click="btnHandler">
    </div> 

    <!-- 使用 .self 实现只有点击当前元素时候，才会触发事件处理函数 -->
    <div class="inner" @click="div1Handler">
      <input type="button" value="点击" @click="btnHandler">
    </div> 

    <!-- 使用 .once 只触发一次事件处理函数 -->
    <a href="http://www.baidu.com" @click.prevent.once="linkClick">有问题，先去百度</a> 


    <!-- 演示： .stop 和 .self 的区别 -->
   <div class="outer" @click="div2Handler">
      <div class="inner" @click="div1Handler">
        <input type="button" value="戳他" @click.stop="btnHandler">
      </div>
    </div> 

    <!-- .self 只会阻止自己身上冒泡行为的触发，并不会真正阻止 冒泡的行为 -->
   <div class="outer" @click="div2Handler">
      <div class="inner" @click.self="div1Handler">
        <input type="button" value="戳他" @click="btnHandler">
      </div>
    </div> 

  </div>

  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {
        div1Handler() {
          console.log('这是触发了 inner div 的点击事件')
        },
        btnHandler() {
          console.log('这是触发了 btn 按钮 的点击事件')
        },
        linkClick() {
          console.log('触发了连接的点击事件')
        },
        div2Handler() {
          console.log('这是触发了 outer div 的点击事件')
        }
      }
    });
  </script>
```
### v-model

 - v-model是唯一的一个可以实现数据的双向绑定
 - v-bind只能实现数据的单向绑定  M=>V
 - v-model可以实现表单元素和Model中数据的双向绑定（只能在表单元素中）

```html
<script src="./lib/vue-2.4.0.js"></script>

<body>
  <div id="app">
    <h4>{{ msg }}</h4>
    <input type="text" style="width:100%;" v-model="msg">
  </div>

  <script>
    var vm = new Vue({
      el: '#app',
      data: {
        msg: '大家都是好学生，爱敲代码，爱学习，爱思考，简直是完美，没瑕疵！'
      },
      methods: {
      }
    });
  </script>
```
在以上代码中，当改变input中的数据时，data中的msg也会改变
###  <a href="https://blog.csdn.net/qq_42853241/article/details/97315916" target="_blank">案例-简易计算器</a>
### 在Vue中使用样式
##### 使用class样式
1. 数组
```html
<h1 :class="['red', 'thin']">这是一个H1</h1>
<!--red、thin是class样式-->
```

2. 数组中使用三元表达式
```html
<h1 :class="['red', 'thin', isactive?'active':'']">这是一个H1</h1>
<!--isactive是data中定义的一个变量，boolean类型-->
```

3. 数组中嵌套对象
```html
<h1 :class="['red', 'thin', {'active': isactive}]">这是一个H1</h1>
```

4. 直接使用对象
```html
<h1 :class="{red:true, italic:true, active:true}">这是一个H1</h1>
```
##### 为元素绑定style（内联样式）
1. 直接在元素上通过`:style=""`的形式书写样式对象

```html
<h1 :style="{color:'red','font-size':'40px'}">这是一个h1</h1>
```

> 对象就是无需键值对的集合，若属性中包含`-`，则需加引号

2. 将样式对象定义在data中，并直接引用到`:style`中

```html
<h1 :style="styleObj1">这是一个h1</h1>

<script>
  var vm = new Vue({
      el: '#app',
      data: {
        styleObj1: { color: 'red', 'font-weight': 200 }
      },
      methods: {}
    });
 </script>
```
3. 在`:style`中通过数组引用多个data上的样式对象

```html
 <h1 :style="[ styleObj1, styleObj2 ]">这是一个h1</h1>

<script>
  var vm = new Vue({
      el: '#app',
      data: {
        styleObj1: { color: 'red', 'font-weight': 200 },
        styleObj2: { 'font-style': 'italic' }
      },
      methods: {}
    });
 </script>
```
### v-for迭代
- 分类：迭代数组、对象数组、迭代对象、迭代数字
 - 作用 ： 控制HTML元素中的循环，实现语句列表的生成
 - 用法 ： v-for = “item in 集合”，其中item指集合的子项，集合指被遍历的元素，通常为数组
 
 1. 迭代数组

```html
<div id="app">
	<!--i为索引,item指集合的子项-->
    <p v-for="(item, i) in list">索引值：{{i}} --- 每一项：{{item}}</p>
</div>

 <script>
    var vm = new Vue({
      el: '#app',
      data: {
        list: [1, 2, 3, 4, 5, 6]
      },
      methods: {}
    });
  </script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190725220404937.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyODUzMjQx,size_16,color_FFFFFF,t_70)
 2. 对象数组

```html
<div id="app">
	<!--i为索引,item指集合的子项-->
     <p v-for="(user, i) in list">Id：{{ user.id }} --- 名字：{{ user.name }} --- 索引：{{i}}</p>
</div>

 <script>
    var vm = new Vue({
      el: '#app',
      data: {
        list: [
          { id: 1, name: 'zs1' },
          { id: 2, name: 'zs2' },
          { id: 3, name: 'zs3' },
          { id: 4, name: 'zs4' }
        ]
      },
      methods: {}
    });
  </script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190725220701374.png)
 3. 迭代对象

```html
<div id="app">
	 <!-- 在遍历对象身上的键值对的时候， 除了 有  val  key  ,在第三个位置还有 一个 索引  -->
     <p v-for="(val, key, i) in user">值是： {{ val }} --- 键是： {{key}} -- 索引： {{i}}</p>
</div>

 <script>
    var vm = new Vue({
      el: '#app',
      data: {
        user: {
          id: 1,
          name: '托尼·屎大颗',
          gender: '男'
        }
      },
      methods: {}
    });
  </script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190725221205930.png)
 4. 迭代数字
 
```html
<div id="app">
     <p v-for="count in 10">这是第 {{ count }} 次循环</p>
</div>

 <script>
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {}
    });
  </script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190725222123149.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyODUzMjQx,size_16,color_FFFFFF,t_70)

> 注意：
> 在vue2.20+版本里，组件在使用v-for的时候必须标识key，因为使用key来标识唯一的身份
>  key 在使用的时候，必须使用 v-bind 属性绑定的形式，指定 key 的值
>  v-for 循环的时候，key 属性只能使用 number获取string
>  在组件中，使用v-for循环的时候，或者在一些特殊情况中，如果 v-for 有问题，必须 在使用 v-for 的同时，指定 唯一的 字符串/数字 类型 :key 值 
>  
例：

```html
<head>
    <script src="lib/vue-2.4.0.js"></script>
</head>
<body>
<div id="app">
    <div>
        <label>ID:
            <input type="text" v-model="id">
        </label>
        <label>Name:
            <input type="text" v-model="name">
        </label>
        <label>
            <input type="button" value="添加" @click="add">
        </label>
        <p v-for="item in list" :key="item.id"><input type="checkbox">{{item.id}}--------{{item.name}}</p>
        <!--<p v-for="item in list"><input type="checkbox">{{item.id}}------------{{item.name}}</p>-->
    </div>
</div>
</body>
<script>
    var vm=new Vue({
        el:'#app',
        data:{
            id:'',
            name:'',
            list:[
                {id:1,name:'吴亦凡'},
                {id:2,name:'kris'},
                {id:3,name:'李嘉恒'},
                {id:4,name:'程媛媛'},
                {id:5,name:'雷嘉欣'}
            ]
        },
        methods:{
            add(){
               // this.list.push({id:this.id,name:this.name});
                this.list.unshift({id:this.id,name:this.name});
            }
        }
    })
</script>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190725222629398.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyODUzMjQx,size_16,color_FFFFFF,t_70)
在本例中，当不标识key时，假若选择了4--------程媛媛，当添加的方式为`unshift`时，添加之后选中的不再是4------程媛媛，而是第四个选项（3---------李嘉恒）
### v-if、v-show

 - v-if：移除元素，每次都会重新删除或创建元素，有较高的切换性能消耗
 - v-show：相当于display:none; 每次不会重新进行DOM的删除和创建操作，只是切换了元素的 display:none 样式，有较高的初始渲染消耗
 - 如果元素涉及到频繁的切换，最好不要使用 v-if, 而是推荐使用 v-show，如果元素可能永远也不会被显示出来被用户看到，则推荐使用 v-if

##### 下一篇<a href="https://blog.csdn.net/qq_42853241/article/details/97799623" target="_blank">Vue.js学习（二）</a>
