"use strict";//否则let报错
const path = require('path');
const webpack = require('webpack');


//输出文件名是否带hash 生产环境使用hash，开发环境不使用hash
const hash_onoff = process.env.node_order === "build" ? true : false;
let js_filename;
if( hash_onoff ){
	js_filename = "static/js/[name].[chunkhash].js";
}else{
	js_filename = "static/js/[name].js";
}


const ExtractTextPlugin = require("extract-text-webpack-plugin");//提取出css生成css文件

//因为从js中分离出css的话，被分离出的js 和 分离出的css的 hash一样，以js为准，所以使用contenthash，[contenthash] 是 extract-text-webpack-plugin提供的另一种hash值，意为：文本内容的hash值，用来区分js文件的hash值
const css_extract = new ExtractTextPlugin({
	filename:"static/css/css.[contenthash].css"
});
const scss_extract = new ExtractTextPlugin({
	filename:"static/css/scss.[contenthash].css"
});

//压缩css
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
//补css前缀
var autoprefixer = require('autoprefixer');


module.exports = {
	entry: {
		main: path.resolve(__dirname, '../src/js/main.js'),
	},
	output: {
			filename: js_filename, //入口文件key值
			path: path.resolve(__dirname, '../dist'),
			publicPath:process.env.node_order === "build" ? "./" : "/",
			//   ./直接任何地方都可打开，/之能在服务器上并且static 得放在根目录
			//区分开发和生产，资源引入目录
			//打包之后index.html文件引用资源的路径，现在是可以本地预览，去掉 . 的话就得在服务器上预览,
			//##
			//##如果路径为/的话，那么打包之后static文件就得放到根目录下
			//##所以要根据网站路径来写这个 publicpath
			//##
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
			},{//处理css
				test: /\.css$/,
				include:[path.resolve(__dirname,"../src/")],
				use: css_extract.extract({
					fallback: "style-loader",
					use: ["css-loader","postcss-loader"]
				})
			},{//处理scss
				test: /\.scss$/,
				include:[path.resolve(__dirname,"../src/")],
				use: scss_extract.extract({
					fallback: "style-loader",
					use: ["css-loader","postcss-loader","sass-loader"]
				})
			},{//处理图片,####超过尺寸会使用file-loader，所以记得下载
				test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use:[{
					loader:"url-loader",
					options:{
						limit:10000,
						name:"static/img/[name].[hash].[ext]"
					}
				}]
				
			},{//处理字体
				test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use:[{
					loader:"url-loader",
					options:{
						limit:10000,
						name:"static/fonts/[name].[hash].[ext]"
					}
				}]
			},{//处理写在html中的图片
				test:/\.(html|htm)$/i,
				use:"html-withimg-loader"
			}]
		},
		plugins:[
			//定义可配置的全局变量
			new webpack.DefinePlugin({
				now_env: process.env.node_order === "build" ? JSON.stringify("生产路径") : JSON.stringify("开发路径"),
			}),
			//压缩css
			new optimizeCssAssetsWebpackPlugin({
				assetNameRegExp: /\.css$/g,//匹配要压缩的文件后缀
				cssProcessor: require('cssnano'),//why cssnano？https://github.com/iuap-design/blog/issues/159
				cssProcessorOptions: { discardComments: {removeAll: true } },
				canPrint: true
			}),
			//预处理css
			new webpack.LoaderOptionsPlugin({//webpack2的postcss的使用方法，需要下载postcss-loader，不用引入的
				options: {
					postcss: function () {
						//autoprefixer 为css添加浏览器前缀，因为是给css加，所以要加载scss--load的后面
						return [autoprefixer({browsers:['last 2 versions']})];
					}
				}
			}),
			css_extract,scss_extract
			]
		};
