const path = require('path');
const webpack = require('webpack');


//输出文件名是否带hash 生产环境使用hash，开发环境不使用hash
const hash_onoff = process.env.node_order === "build" ? true : false;
let js_filename;
if( hash_onoff ){
	js_filename = "js/[name].[chunkhash].js";
}else{
	js_filename = "js/[name].js";
}




module.exports = function() {
	return {
		entry: {
			main: path.resolve(__dirname, '../src/js/main.js'),
		},
		output: {
			filename: js_filename, //入口文件key值
			path: path.resolve(__dirname, '../dist'),
			publicPath:"./",//打包之后index.html文件引用资源的路径
		},
		module: { //处理不同类型文件的各种加载器
			rules: [{//处理es6
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				}
			}]
		}
		};
	};
