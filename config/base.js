const path = require('path');
const webpack = require('webpack');

module.exports = function() {
	return{
		//决定map文件的模式
		devtool: "source-map",
		entry: {
			app_a: "./src/js/a.js",
			app_b: "./src/js/b.js"
		},
		output: {
			filename: "js/[name].js", //入口文件ke值y
			path: path.resolve(__dirname, '../dist'),
		},
		module: {//处理不同类型文件的各种加载器
			loaders: [{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}]
		},
		plugins: [//提供各种功能的插件
			//压缩文件，并生成map
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				},
				sourceMap: process.env.NODE_ENV === "production"
			}),
			//定义可配置的全局变量
			new webpack.DefinePlugin({
				root_url: process.env.NODE_ENV === "production" ? JSON.stringify("生产路径") : JSON.stringify("线上路径"),
			})
			]
		};
	};