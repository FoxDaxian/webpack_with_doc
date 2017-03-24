const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");//用法usage：https://www.npmjs.com/package/webpack-hot-middleware
const webpack = require("webpack");

//引入webpack的base配置
const dev_config = require("../config/webpack.dev.js");


//定义环境变量以区分开发和生产
process.env.node_order = "dev";


const app = express();
const compiler = webpack(dev_config);

//只用webpack-dev-middleware
app.use(webpackDevMiddleware(compiler,{
	publicPath:"/",
	stats:{//详细配置见：https://doc.webpack-china.org/configuration/stats/
		colors: true,
		chunks: false,//少显示点东西，看着干净
	}
}));

//使用webpack-hot-middleware
const hotMiddleware = require("webpack-hot-middleware")(compiler);

//编写的插件：当html-webpack-plugin编译之后，发布事件action：reload
//由于 html-webpack-plugin是生成html文件的插件，并且将每次源码改变之后的打包出来的js，css等 统统引入到生成的html文件里
//所以 每次html-webpack-plugin运行之后都会发布 reload  所以浏览器会更新，因此html css scss 的修改都起作用了。
compiler.plugin('compilation', function (compilation) {
	compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
		hotMiddleware.publish({ action: 'reload' });
		cb();
	});
});

//express  调用 webpack-hot-middleware
app.use(hotMiddleware);

app.listen("3000",function() {
	console.log("Listening on port 3000");
});

