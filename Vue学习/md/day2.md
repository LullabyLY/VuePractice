上一篇<a href="https://blog.csdn.net/qq_42853241/article/details/97189337" target="_blank">vue学习（一）</a>，主要学习了vue基本代码，以及一些简单指令，这节主要要完成<a href="https://blog.csdn.net/qq_42853241/article/details/97523963" target="_blank">品牌管理案例</a>以及学习vue的知识点 。

> 在vue中进行数据的双向绑定，每当修改了data中的数据，vue默认监听数据的改动，自动把修改的数据应用到页面上

#### 过滤器
- Vue允许自定义过滤器，可被用作常见的文本格式化
- 用途：插值表达式、v-bind
- 过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符指示
- 调用方式：{{ name | nameope }}
- 语法：Vue.filter('过滤器名称',function(){})

例如我们对Date()时间进行操作

```html
<div id="app">
<p>{{ctime|timeFormat()}}</p>
<div>
<script>
Vue.filter('timeFormat',function (dateStr) {
        var dt=new Date(dateStr);
        var y=dt.getFullYear();
        var m=(dt.getMonth()+1).toString().padStart(2,'0');
        var d=(dt.getDate()).toString().padStart(2,'0');
        return `${y}-${m}-${d}`;
    });
     var vm=new Vue({
        el:'#app',
        data:{
        	ctime:new Date()
        }
      })
    </script>
    //输出2019-08-02
```

> 此处涉及到了ES6中的字符串padStart方法
> String.prototype.padStart(maxLength, fillString='') 或 String.prototype.padEnd(maxLength, fillString='')来填充字符串；
> 设置字符串的最大长度和填充字符就ok，padStart是在字符串位数不够时在字符串之前填充，padEnd是在字符串之后填充

**私有过滤器**
在Vue实例中使用`filters:{}`

```html
<div id="app">
    <p>{{msg|msgchange('华妃')}}</p>
    <p>{{msg|msgformat('话费')}}</p>

</div>
<script>
    Vue.filter('msgchange',function (msg,arg) {
        return msg.replace(/化肥/g,arg);
    });
    var vm=new Vue({
        el:'#app',
        data:{
            msg:'黑化肥，灰化肥，挥发化肥发会话'
        },
        //私有过滤器
        filters:{
            msgformat:function (data,arg) {
                return data.replace(/化肥/g,arg);
            }
        }
    })
//输出
//黑华妃，灰华妃，挥发华妃发会话

//黑话费，灰话费，挥发话费发会话
</script>
```

>  过滤器调用的时候，采用的是就近原则，如果私有过滤器和全局过滤器名称一致了，这时候 优先调用私有过滤器

#### 自定义按键修饰符
通过`Vue.config.keyCodes.名称 = 按键值`来自定义案件修饰符的别名

```javascript
Vue.config.keyCodes.f2 = 113;
```

```html
<input type="text" v-model="name" @keyup.f2="add">
```
#### 自定义指令
- Vue.directive()
- Vue.directive('focus',{})
- 参数一为指令名称（不加v-），参数二是一个对象，处理函数

```javascript
    // 自定义全局指令 v-focus，为绑定的元素自动获取焦点：

    Vue.directive('focus', {

      inserted: function (el) { // inserted 表示被绑定元素插入父节点时调用

        el.focus();

      }
    });
```
这里主要有三个时间段：

 - bind：绑定，指令绑定在元素上的时候，会立即执行，只执行一次
 - inserted：插入，元素插入到DOM中时会执行inserted函数，只触发一次
 - updated：更新，组件/VNode更新时，会执行updated，可能会触发多次

**局部指令**
在Vue实例中使用`directives:{}`

```javascript
  // 自定义局部指令 v-color 和 v-font-weight，为绑定的元素设置指定的字体颜色 和 字体粗细：
      directives: {
        color: { // 为元素设置指定的字体颜色
          bind(el, binding) {
            el.style.color = binding.value;
          }
        },
        'font-weight': function (el, binding2) { // 自定义指令的简写形式，等同于定义了 bind 和 update 两个钩子函数
          el.style.fontWeight = binding2.value;
        }
      }
```
```
<input type="text" v-model="searchName" v-focus v-color="'red'" v-font-weight="900">
```
#### Vue实例的生命周期
**1. 什么是生命周期**
从Vue实例创建、运行，到销毁期间，总是伴随着各种各样的事件，这些事件统称为实例的生命周期
**2. 生命周期钩子 = 生命周期函数 = 生命周期事件**
**3. 函数分类**

 -  创建期间的生命周期函数
     + beforeCreate()：表示实例完全被创建出来之前，会执行他（data和methods中的数据没有被初始化）
     + created()：data和methods中的数据都被初始化好了
     + beforeMount()：表示模板已经在内存中编辑完成，但尚未把模板内容渲染到页面中，在 beforeMount 执行的时候，页面中的元素，还没有被真正替换过来，只是之前写的一些模板字符串
     + mounted()：表示内容中的模板已经真实的挂载到了页面中，用户可以看到渲染的页面，mounted 是 实例创建期间的最后一个生命周期函数，当执行完 mounted 就表示，实例已经被完全创建好了，此时，如果没有其它操作的话，这个实例，就静静的 躺在我们的内存中，一动不动
 - 运行期间
      + beforeUpdate()：界面还没有被更新， 此时 data 中的状态值是最新的，但是界面上显示的 数据还是旧的，因为此时还没有开始重新渲染DOM节点
      + updated()：执行时页面和data数据已经保持同步
 - 销毁期间
       + beforeDestroy()：当执行beforeDestroy钩子函数的时候，Vue实例就已经从运行阶段进入到了销毁阶段，当执行beforeDestroy钩子函数的时候，Vue实例上的data、methods，以及过滤器等都处于可用状态，此时，还没有真正的执行销毁过程
       + destroyed()：当执行时，组件已经完全销毁了，此时，组件中的所有数据等都不可以用了（Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190803175257295.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyODUzMjQx,size_16,color_FFFFFF,t_70)
####  Vue中发起的Ajax请求
- vue-resource 实现 get, post, jsonp请求（除了用v-resource，还可以用axios）
-  vue-resource 依赖于vue，this.$http
- get(url,[options])
- post(url,[body],[options])：body是发送给服务器的数据对象
- jsonp(url,[options])
- this.$http.get/post/jsonp(...).then(successCallback, errorCallback);

**get请求：**
```javascript
 var vm=new Vue({
        el:'#app',
        data:{

        },
        methods:{
            getInfo(){
  //通过result.body拿到服务器返回的成功的数据
                this.$http.get('http://localhost:63342/WebPractice/Vue学习/ajax/getlist.txt').then(function (result) {
                    console.log(result.body);
                })
            }
        }
    })
```
如果需要传递数据，可以使用 this.$http.get('get.php',{params : jsonData}) 格式，第二个参数 jsonData 就是传到后端的数据。
```javascript
this.$http.get('get.php',{params : {a:1,b:2}}).then(function(res){
    console.log(res.body);    
},function(res){
    console.log(res.status);
});
```
**post请求：**
手动发起的post请求，默认没有表单格式 application/x-wwww-form-urlencoded，所以有的服务器处理不了，这时可以通过post 方法的第三个参数，{emulateJSON:true}设置提交内容类型为普通表单数据格式
```javascript
 postInfo(){
          this.$http.post('/try/ajax/demo_test_post.php', {name:'zs'}, { emulateJSON: true }).then(result => {
            console.log(result.body)
          })
        }
```
**jsonp请求：**

```javascript
jsonpInfo(){ // JSONP形式从服务器获取数据
  var url = '/try/ajax/ajax_info.txt';
  this.$http.jsonp(url).then(res => {
    console.log(res.body);
  });
  }
```

> 我们可以通过全局配置url根域名和post的第三个参数
> Vue.http.options.root='http://localhost:63342/WebPractice/Vue学习/';
>  Vue.http.options.emulateJSON=true;
>  之后就可以直接写this.$http.get('ajax/getlist.txt')
>  post的请求也不必写第三个参数
#### 品牌管理案例改进
这里主要是借助了教课老师的请求地址，接下来讲讲思路

 - 获取品牌信息列表
1. 通过  this.$http 来发起数据请求
2. this.$http.get('url').then(function(result){})
3. 当通过 then 指定回调函数之后，在回调函数中，可以拿到数据服务器返回的 result
 4.  先判断 result.status 是否等于0，如果等于0，就成功了，可以 把 result.message 赋值给 this.list ; 如果不等于0，可以弹框提醒，获取数据失败！
- 添加品牌列表到后台服务器
1.  this.$http.post
 2. this.$http.post() 中接收三个参数：
       2.1 第一个参数： 要请求的URL地址
        2.2 第二个参数： 要提交给服务器的数据 ，要以对象形式提交给服务器 { name: this.name }
        2.3 第三个参数： 是一个配置对象，要以哪种表单数据类型提交过去， { emulateJSON: true }, 以普通表单格式，将数据提交给服务器 application/x-www-form-urlencoded
   3. 在 post 方法中，使用 .then 来设置成功的回调函数，如果想要拿到成功的结果，需要 result.body
   4. 通过post将添加的数据发送服务器，添加成功则调用显示列表函数
- 删除品牌
1. 将要删除的数据的id发送至服务器，返回成功则说明删除成功

```javascript
    Vue.http.options.root = 'http://vue.studyit.io/';
    Vue.http.options.emulateJSON = true;

    var vm = new Vue({
      el: '#app',
      data: {
        name: '',
        list: []
      },
      created() { 
        this.getAllList()
      },
      methods: {
        getAllList() { // 获取所有的品牌列表 
          this.$http.get('api/getprodlist').then(result => {
            var result = result.body
            if (result.status === 0) {
              this.list = result.message
            } else {
              alert('获取数据失败！')
            }
          })
        },
        add() {  // 添加品牌列表到后台服务器
          this.$http.post('api/addproduct', { name: this.name }).then(result => {
            if (result.body.status === 0) {
              this.getAllList()
              this.name = ''
            } else {
              alert('添加失败！')
            }
          })
        },
        del(id) { // 删除品牌
          this.$http.get('api/delproduct/' + id).then(result => {
            if (result.body.status === 0) {
              this.getAllList()
            } else {
              alert('删除失败！')
            }
          })
        }
      }
    });
```
#### 动画
目的作用：提高用户的体验，帮助用户更好的理解页面中的功能
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190803204343310.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyODUzMjQx,size_16,color_FFFFFF,t_70)
**使用过渡类名实现动画**
1. 使用transition元素，把需要被动画控制的元素包裹起来

```html
<transition>
        <h3 v-if="flag">吴亦凡</h3>
        <!--flag是vue实例中定义的数据-->
</transition>
```

2. 自定义两组样式，来控制transition内部元素
 v-enter 【这是一个时间点】 是进入之前，元素的起始状态，此时还没有开始进入
 v-leave-to 【这是一个时间点】 是动画离开之后，离开的终止状态，此时，元素 动画已经结束了
  v-enter-active 【入场动画的时间段】
   v-leave-active 【离场动画的时间段】
```css
 	    .v-enter,.v-leave-to{
            opacity: 0;
            transform: translateX(500px);
        }
        .v-enter-active,.v-leave-active{
            transition: all 0.8s ease;
        }
```
**自定义前缀v-**
通过name属性设置，可以自定义样式名称，需要注意的是name定义的相当于v，这样便于使用局部动画
```html
<transition name="my">
        <h3 v-if="flag2">李嘉恒</h3>
</transition>
```

```css
 .my-enter,.my-leave-to{
            opacity: 0;
            transform: translateY(500px);
        }
 .my-enter-active,.my-leave-active{
            transition: all 0.8s ease;
        }
```
**使用第三方类实现动画**
使用animate.css动画库来实现动画
1. 导入动画类库：
```html
<link rel="stylesheet" type="text/css" href="./lib/animate.css">
```
2. 定义 transition 及属性：
```html
<transition
	enter-active-class="fadeInRight"
    leave-active-class="fadeOutRight"
    :duration="{ enter: 500, leave: 800 }">
    <!-- 使用  :duration="{ enter: 200, leave: 400 }"  来分别设置 入场的时长 和 离场的时长  -->
  	<div class="animated" v-show="isshow">动画哦</div>
</transition>
```
**使用钩子函数实现半动画**
有些场景我们不需要元素全部的动画，只需要半动画，例如加入购物车小球的动画。
1. 使用transition以及三个钩子函数
@before-enter：函数设置元素开始动画之前的起始样式
@enter：表示开始之后的样式，可以设置完成动画之后的结束状态
@after-enter：动画完成之后的回调
```html
<transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    >
        <div class="ball" v-if="flag"></div>
</transition>
```
 动画钩子函数的第一个参数el，表示要进行动画的元素，他是一个原生的JS DOM元素
```javascript
var vm=new Vue({
        el:'#app',
        data:{
            flag:false
        },
        methods:{
            //设置小球开始动画前的起始样式
            beforeEnter(el){
                el.style.transform='translate(0,0)';
            },
            //设置小球开始动画的样式，以及结束动画时的状态
            //第二个参数done，没有此参数，在动画结束后需要等一会才会进行afterEnter函数
            enter(el,done){
                //el.offsetWidth没有什么实际作用，但是不写没有动画效果，可以看作有强制动画刷新
                //也可以是offsetHeight，offsetLeft，offsetTop...
                el.offsetWidth;
                el.style.transform='translate(150px,200px)';
                el.style.transition='all 1s ease';
                done();//就是afterEnter这个函数的引用
            },
            afterEnter(el){
                this.flag=!this.flag;
            }
        }
    })
```
**transition-group**
在实现列表过渡的时候，如果需要过渡的元素是通过v-for循环渲染的，不能使用transition包裹，需要transition-group
循环创建的元素设置动画，需绑定key
`appear`设置页面刚展示入场有动画效果
transition-group被渲染为span标签，可用tag属性设置想要渲染的标签
```html
<transition-group appear tag="ul">
     <li v-for="(item,i) in list" :key="item.id" @click="del(i)">
                {{item.id}}------{{item.name}}
    </li>
</transition-group>
```
通过测试代码，我们可以发现，当点击删除时，底下的li列表，会在要删除列表完全消失后，才会向上移动，所以我们需要通过组件动画的改变定位来解决这一现象
.v-move 和 .v-leave-active 配合使用，能够实现列表后续的元素，渐渐地漂上来的效果
```css
.v-move{
  transition: all 0.8s ease;
}
.v-leave-active{
  position: absolute;
}
```
#### 下一篇：<a href="https://blog.csdn.net/qq_42853241/article/details/98472522"  target="_blank">Vue.js学习（三）</a>