
const path = require('path');
const htmlWebpackPlugin=require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src/main.js'), // 项目入口文件
    output: { // 配置输出选项
        path: path.join(__dirname, 'dist'), // 配置输出的路径
        filename: 'main.js' // 配置输出的文件名
    },
    /*devServer:{
        open:true,
        hot:true,
        port:3000,
        contentBase:'src'
    }*/
    plugins:[
        //创建一个在内存中生成HTML页面的插件，将打包好的main.js文件追加到页面中
        new htmlWebpackPlugin({
            template:path.join(__dirname,'src/index.html'),//模板页面
            filename: 'index.html'//指定生成页面的名称
        })
    ]
};
