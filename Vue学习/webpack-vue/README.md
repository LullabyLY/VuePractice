
### 运行需要安装依赖，npm i
### webpack概念的引入
#### 网页中常用的静态资源

 - js
.js、.jsx、.coffee、.ts（TypeScript）
 - css
.css、.less、.sass、.scss
 - images
.jpg、.png、.gif、.bmp、.svg
 - 字体文件
.svg、.ttf、.eot、.woff、.woff2
 - 模板文件
.ejs、.jade、.vue

##### 网页中引入静态资源多了有什么问题
1. 页面加载速度慢，因为要发起很多次二次请求
2. 要处理错综复杂的依赖关系
##### 解决办法
1. js，css文件合并压缩，image采用精灵图或者base64编码（base64编码的图片在第一次请求时随html代码一起传过来，但是只适合小图片）
2. 可以使用requireJS，也可以使用webpack
##### 什么是webpack
webpack是前端的一个项目构建工具，它是基于Node.js开发出来的一个前端工具，他可以解决多个包之间的复杂依赖关系
##### 如何完美的实现上述两个解决办法
1. 使用Gulp，是基于task任务的，小巧灵活
2. 使用webpack，是基于整个项目进行构建的，借助于webpack这个前端自动化构建工具，可以完美的实现资源的合并，打包，压缩，混淆等诸多功能

#### webpack基础
###### 安装webpack
```
npm i webpack -g       //全局安装
npm i webpack -D       //项目中安装
```
###### 项目基本结构
 - src：项目源代码
css：css文件夹
images
js：js文件夹
index.html
main.js：项目的js入口文件
 - dist：发布版、产品版
###### 第一个项目
实现隔行变色

```html
<ul>
    <li>这是第1个li</li>
    <li>这是第2个li</li>
    <li>这是第3个li</li>
    <li>这是第4个li</li>
    <li>这是第5个li</li>
    <li>这是第6个li</li>
    <li>这是第7个li</li>
    <li>这是第8个li</li>
    <li>这是第9个li</li>
    <li>这是第10个li</li>
  </ul>
```

1. 运行`npm init`初始化项目，使用npm管理项目中的依赖包
2. 创建项目基本的目录结构
3. 使用`cnpm i jquery --save`安装jquery类库
4. 创建`main.js`并书写各行变色的代码逻辑：

```javascript
    // 导入jquery类库
    import $ from 'jquery'   //ES6导入模块方式
    //const $=require('jquery')  Node导入方式

    // 设置偶数行背景色，索引从0开始，0是偶数
    $('#list li:even').css('backgroundColor','lightblue');
    // 设置奇数行背景色
    $('#list li:odd').css('backgroundColor','pink');
```
5. 直接在页面上引用`main.js`会报错，因为浏览器不认识`import`这种高级的JS语法，需要使用webpack进行处理，webpack默认会把这种高级的语法转换为低级的浏览器能识别的语法；
6. 运行`webpack 要打包的文件路径 输出文件路径`对`main.js`进行处理：
```
webpack src/js/main.js dist/bundle.js
```
7. 在index.html文件中引入打包好的文件
```html
<script src="../dist/bundle.js"></script>
```
从以上案例，我们可以获得webpack的作用
###### webpack的作用
1. 能够处理JS文件的相互依赖关系
2. webpack能够处理JS兼容问题，把高级的、浏览器不识别的语法，转为低级的、浏览器识别的
###### 简化打包命令
每当我们在main.js中做出修改时，我们总要运行`webpack 要打包的文件路径 输出文件路径`命令来打包文件，命令比较长，我们可以选择简化命令
1. 在项目根目录中创建`webpack.config.js`
2. 由于运行webpack命令的时候，webpack需要指定入口文件和输出文件的路径，所以，我们需要在`webpack.config.js`中配置这两个路径：
```javascript
    // 导入处理路径的模块
    var path = require('path');

    // 导出一个配置对象，将来webpack在启动的时候，会默认来查找webpack.config.js，并读取这个文件中导出的配置对象，来进行打包处理
    module.exports = {
        entry: path.join(__dirname, './src/js/main.js'), // 项目入口文件
        output: { // 配置输出选项
            path: path.join(__dirname, './dist'), // 配置输出的路径
            filename: 'bundle.js' // 配置输出的文件名
        }
    }
```
3. 设置之后，命令就为`webpack`

- 工作过程：
1. webpack发现并没有通过命令的形式指定入口出口
2. 查找webpack.config.js配置文件
3. webpack解析执行配置文件，解析执行完就得到导出的配置对象
4. 拿到配置对象，就说明拿到了配置对象指定的入口出口
5. 打包构建
###### 实现实时打包构建
每次修改后都需要运行webpack命令比较麻烦。所以使用`webpack-dev-server`来实现代码实时打包编译，当修改代码之后，会自动进行打包构建。
1. 运行`cnpm i webpack-dev-server -D`安装到开发依赖
2. 安装完成之后，在命令行直接运行`webpack-dev-server`来进行打包，发现报错，要想正常运行，须在本地项目中安装webpack
3. 在webpack.config.js中定义入口出口
4. 需要借助于`package.json`文件中的指令，来进行运行`webpack-dev-server`命令，在`scripts`节点下新增`"dev": "webpack-dev-server"`指令，发现可以进行实时打包，但是dist目录下并没有生成`bundle.js`文件，这是因为`webpack-dev-server`将打包好的文件放在了内存中
 + 把`bundle.js`放在内存中的好处是：由于需要实时打包编译，所以放在内存中速度会非常快
 + 这个时候访问webpack-dev-server启动的`http://localhost:8080/`网站，发现是一个文件夹的面板，需要点击到src目录下，才能打开我们的index首页，此时引用不到bundle.js文件，需要修改index.html中script的src属性为:`<script src="../bundle.js"></script>`
 + 为了能在访问`http://localhost:8080/`的时候直接访问到index首页，可以使用`--contentBase src`指令来修改dev指令，指定启动的根目录：
 ```
 "dev": "webpack-dev-server --contentBase src"
 ```
 同时修改index页面中script的src属性为`<script src="bundle.js"></script>`

###### webpack的dev命令

 - `--open`
修改后自动打开浏览器
 - `--port 3000`
 更改端口
 - `--contentBase src`
指定启动根目录
 - `--hot`
热重载，减少刷新请求
###### 配置命令参数方式
方式一：

```
 "dev": "webpack-dev-server --contentBase src --open --port 3000 --hot"
```
方式二：
在webpack.config.js中
```javascript
   // 导入处理路径的模块
    var path = require('path');
    var webpack = require('webpack');

    module.exports = {
        entry: path.join(__dirname, 'src/js/main.js'), // 项目入口文件
        output: { // 配置输出选项
            path: path.join(__dirname, 'dist'), // 配置输出的路径
            filename: 'bundle.js' // 配置输出的文件名
        },
        devServer:{
        	hot:true,
        	open:true,
        	port:4321,
        	contentBase:'src'
    	},
    	plugins:[
    	//new一个热更新模块对象
    		new webpack.HotModuleReplacementPlugin()
    	]
    }
```
###### html-webpack-plugin插件配置启动页面
由于使用`--contentBase`指令的过程比较繁琐，需要指定启动的目录，同时还需要修改index.html中script标签的src属性，所以我们使用`html-webpack-plugin`插件配置启动页面.
1. 运行`cnpm i html-webpack-plugin --save-dev`安装到开发依赖
2. 修改`webpack.config.js`配置文件如下：
```javascript
    // 导入处理路径的模块
    var path = require('path');
    // 导入自动生成HTMl文件的插件
    var htmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry: path.resolve(__dirname, 'src/js/main.js'), // 项目入口文件
        output: { // 配置输出选项
            path: path.resolve(__dirname, 'dist'), // 配置输出的路径
            filename: 'bundle.js' // 配置输出的文件名
        },
        plugins:[ // 添加plugins节点配置插件
            new htmlWebpackPlugin({
                template:path.join(__dirname, 'src/index.html'),//模板路径
                filename:'index.html'//自动生成的HTML文件的名称
            })
        ]
    }
```
3. 修改`package.json`中`script`节点中的dev指令如下（去掉contentBase）：
```
"dev": "webpack-dev-server"
```
4. 将index.html中script标签注释掉，因为`html-webpack-plugin`插件会自动把bundle.js注入到index.html页面中！

**作用：**
自动 在内存中根据指定页面生成一个内存页面
自动把打包好的bundle.js追加到页面中
