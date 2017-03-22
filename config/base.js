const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//生成html


const ExtractTextPlugin = require("extract-text-webpack-plugin");//提取出css生成css文件
const css_extract = new ExtractTextPlugin({
	filename:'[name].[contenthash].css'
});//因为从js中分离出css的话，被分离出的js 和 分离出的css的 hash一样，以js为准，所以使用contenthash，[contenthash] 是 extract-text-webpack-plugin提供的另一种hash值，意为：文本内容的hash值，用来区分js文件的hash值




module.exports = function() {
	return {
		//决定map文件的模式
		devtool: "source-map",
		entry: {
			main: path.resolve(__dirname, '../src/js/main.js'),
		},
		output: {
			filename: "js/[name].[chunkhash].js", //入口文件key值
			path: path.resolve(__dirname, '../dist'),
			publicPath:"./",//打包之后index.html文件引用资源的路径
		},
		module: { //处理不同类型文件的各种加载器
			rules: [{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				}
			}, {
				test: /\.css$/,
				use: css_extract.extract({
					use: "css-loader"
				})
			}]
		},
		plugins: [ //提供各种功能的插件
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
			}),
			//分离第三方插件库，因为第三方插件库总是不变的，所以让浏览器缓存他，提高速度
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				minChunks: function (module) {
					// 该配置假定你引入的 vendor 存在于 node_modules 目录中
					return module.context && module.context.indexOf('node_modules') !== -1;
				}
			}),
			//相当于给生成的vendor再次包裹一层，每次打包改变的是mainifest，防止vendor的hash改变
			//详见https://doc.webpack-china.org/guides/code-splitting-libraries/
			new webpack.optimize.CommonsChunkPlugin({
				name: 'manifest',
				chunks: ['vendor']
			}),
			//html插件
			new HtmlWebpackPlugin({
				filename: 'index.html'
			}),
			css_extract
			]
		};
	};
