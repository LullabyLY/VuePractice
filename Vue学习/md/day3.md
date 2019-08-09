上一篇<a href="https://blog.csdn.net/qq_42853241/article/details/97799623" target="_blank">Vue.js（二 ）</a>主要从品牌管理案例进行学习，之后又学习了Vue动画，这节我们主要学习Vue的组件
#### 什么是组件？
组件的出现，就是为了拆分Vue实例的代码量的，能够让我们以不同的组件，来划分不同的功能模块，将来我们需要什么样的功能，就可以去调用对应的组件即可。
#### 组件化和模块化的不同
模块化：从代码逻辑角度划分，方便代码分层开发，保证每个功能模块职能单一
组件化：从UI界面的角度划分，方便UI组件重用
#### 定义组件（3种）
###### 1. 使用 Vue.extend 配合 Vue.component 方法
1. 使用Vue.extend创建全局Vue组件
2. 使用Vue.component('组件的名称',创建出来的组件模板对象)

```javascript
var login = Vue.extend({
      template: '<h1>登录</h1>'
    });
Vue.component('login', login);
```
当使用时，直接在HTML代码中以标签的形式引入到页面中`<login></login>`

> 注意：使用驼峰命名时，则在引用组件的时候，需要把 大写的驼峰改为小写的字母，同时，两个单词之前，使用 - 链接

为了简便写法，以上代码也可以写为

```javascript
Vue.component('login' ,Vue.extend({
      template: '<h1>登录</h1>'
 }));
```
######  2. 直接使用 Vue.component 方法

```javascript
Vue.component('myCom',{
	template:'<h3>这是一个H3</h3>'
})
```

> 这里需要注意的是：
> template中只包含一个根元素，否则报错

###### 3.模板字符串定义在标签中
模板置于#app之外
```html
<template id='tmpl'>
	<h1>这是一个H1</h1>
</template>
```

```javascript
Vue.component('myCom',{
	template:'#tmpl'
})
```
###### 使用components定义私有组件 

```javascript
components:{
	login:{//<login></login>
		template:'<h1>这是一个H1</h1>'
		}
}
```
也可以写成模板#tmpl
###### 组件中的数据以及方法

 - 组件可以有自己的data数据
 - 组件的data和实例的data有些不一样，实例中的data可以为一个对象，但是组件中的data必须是一个方法
 - 组件中的data除了必须为一个方法之外，这个方法的内部还必须返回一个对象
 - 组件中的data数据使用方法和实例中的data使用方式一样
 - 为什么组件中的data必须定义为一个方法并返回一个对象？
多个实例之间data是独有的，不共享
以下代码说明为什么data必须定义为方法并返回一个对象：当直接定义一个对象返回时，3个计数器点击一个同时增加
```html
<div id="app">
    <add></add>
    <add></add>
    <add></add>
</div>
<template id='tmpl'>
    <div>
        <input type="button" value="+1" @click="addCount">
        <h3>{{count}}</h3>
        <hr>
    </div>
</template>
<script>
    var cobj={count:0};
    Vue.component('add',{
        data(){
           // return cobj
            return {
                count:0
            }   
        },
        methods:{
            addCount(){
                this.count++
            }
        },
        template:'#tmpl'
    });
    var vm=new Vue({
        el:'#app',
        data:{},
        methods:{}
    })
</script>
```
#### 组件之间的切换
###### 1. v-if、v-else实现切换
利用flag和 v-if、v-else实现切换
缺点：只可以操作两个组件

```html
<!--实现登录注册切换-->
<div id="app">
    <a href="" @click.prevent="flag=true">登录</a>
    <a href="" @click.prevent="flag=false">注册</a>
    <login v-if="flag"></login>
    <register v-else="flag"></register>
</div>
<script>
    Vue.component('login',{
        template:'<h3>登录组件</h3>h3>'
    });
    Vue.component('register',{
        template:'<h3>注册组件</h3>h3>'
    });
    var vm=new Vue({
        el:'#app',
        data:{
            flag:true
        },
        methods:{}
    })
</script>
```
###### 2.使用:is实现组件切换
Vue提供了component标签，来展示对应名称的组件
component是一个占位符，:is指定要展示的组件的名称（需要带引号）
```html
<div id="app">
    <a href="" @click.prevent="comName='login'">登录</a>
    <a href="" @click.prevent="comName='register'">注册</a>
    <component :is="comName"></component>
</div>
<script>
    Vue.component('login',{
        template:'<h3>登录组件</h3>'
    });
    Vue.component('register',{
        template:'<h3>注册组件</h3>'
    });
    var vm=new Vue({
        el:'#app',
        data:{
            comName:'login'
        },
        methods:{}
    })
</script>
```

> Vue提供的标签
> component、template、transition、transtion-group
###### 组件切换动画
用transition包裹起来
通过mode属性，控制组件切换时的模式
mode="out-in"：先出再进

```html
<style>
        .v-enter,
        .v-leave-to{
            opacity: 0;
            transform: translateX(500px);
        }
        .v-enter-active,
        .v-leave-active{
            transition: all 0.8s ease;
        }
    </style>
<body>
<div id="app">
    <a href="" @click.prevent="comName='login'">登录</a>
    <a href="" @click.prevent="comName='register'">注册</a>
    <transition mode="out-in">
        <component :is="comName"></component>
    </transition>

</div>
</body>
<script>
    Vue.component('login',{
        template:'<h3>登录组件</h3>'
    });
    Vue.component('register',{
        template:'<h3>注册组件</h3>'
    });
    var vm=new Vue({
        el:'#app',
        data:{
            comName:'login'
        },
        methods:{}
    })
</script>
```
##### 父子组件
Vue通过私有组件定义局部子组件
```javascript
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      components: { // 定义子组件
        account: { // account 组件
          template: '<div><h1>这是Account组件{{name}}</h1><login></login></div>', // 在这里使用定义的子组件
          components: { // 定义子组件的子组件
            login: { // login 组件
              template: "<h3>这是登录组件</h3>"
            }
          }
        }
      }
    });
```


###### 父组件向子组件传值
- 子组件默认无法访问到父组件中的data上的数据和methods中的方法
- 父组件可以在引用子组件的时候，通过v-bind的形式，把需要传递给子组件的数据，以属性绑定的形式，传递到子组件内部，供子组件使用

```html
<div id="app">
    <son :info="msg"></son>
</div>
<script>
    var vm=new Vue({
        el:'#app',
        data:{
            msg:'父组件数据'
        },
        components:{
            son:{
                template:'<h1>子组件----{{info}}</h1>',
                props:['info']
            }
        },
        methods:{}
    })
</script>
```
组件中的所有的`props中的数据`，都是通过父组件传递给子组件的，她是`只读`的
###### 父组件向子组件传递方法
采用事件绑定机制，实现子组件调用父组件的方法
子组件内部通过`this.$emit('方法名', 要传递的数据)`方式，来调用父组件中的方法，同时把数据传递给父组件使用
```html
<div id="app">
    <com @func="show"></com>
</div>
<script>
    var com={
        template:'<div><h1>子组件</h1><input type="button" value="父子组件" @click="myclick"></div>',
        methods:{
            myclick(){
                this.$emit('func')
            }
        }
    };
    var vm=new Vue({
        el:'#app',
        data:{
            msg:123
        },
        components:{
            com
        },
        methods:{
            show(){
                alert(this.msg)
            }
        }
    })
</script>
```
###### 子组件向父组件传值
原理：父组件将方法的引用，传递到子组件内部，子组件在内部调用父组件传递过来的方法，同时把要发送给父组件的数据，在调用方法的时候当作参数传递进去

```html
<div id="app">
    <com @func="show"></com>
</div>
<script>
    var com={
        template:'<div><h1>子组件</h1><input type="button" value="父子组件" @click="myclick"></div>',
        methods:{
            myclick(){
                this.$emit('func','ok')
            }
        }
    };
    var vm=new Vue({
        el:'#app',
        data:{
            msg:123
        },
        components:{
            com
        },
        methods:{
            show(val){
                console.log(this.msg);
                this.msg=val;
                console.log(this.msg);
            }
        }
    })
    //输出123   ok
</script>
```
##### <a href="https://blog.csdn.net/qq_42853241/article/details/98650317" target="_blank">案例：评论列表</a>
####  使用 `this.$refs` 来获取元素和组件
通过this.$refs 可以访问到此vue实例中的所有设置了ref属性的DOM元素，并对其进行操作。

```html
<div id="app">
    <input type="button" value="获取元素" @click="getElement">
    <h3 ref="myh3">这是一个H3</h3>
    <com ref="mycom"></com>
</div>
</body>
<script>
    var com={
        template:'<h2>这是一个H2</h2>',
        data:function (){
            return {
                msg:'123'
            }
        },
        methods: {
            show(){
                console.log("哈哈哈");
            }
        }
    };
    var vm=new Vue({
        el:'#app',
        data:{},
        methods:{
            getElement(){
                console.log(this.$refs.myh3.innerText);
                console.log(this.$refs.myh3);//DOM元素
                console.log(this.$refs.mycom.msg);
                console.log(this.$refs.mycom);//组件实例
                this.$refs.mycom.show();
            }
        },
        components:{
            com
        }
    })
</script>
```
