//使用merge
const webpackMerge = require('webpack-merge');
//引入通用配置
const base_config = require("./base.js");
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');//生成html

const ExtractTextPlugin = require("extract-text-webpack-plugin");//提取出css生成css文件
const css_extract = new ExtractTextPlugin({
	filename:"css/[name].[contenthash].css"
});//因为从js中分离出css的话，被分离出的js 和 分离出的css的 hash一样，以js为准，所以使用contenthash，[contenthash] 是 extract-text-webpack-plugin提供的另一种hash值，意为：文本内容的hash值，用来区分js文件的hash值

const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
var autoprefixer = require('autoprefixer');

process.noDeprecation = true; //去除一个现在无关紧要的警告


let config = webpackMerge(base_config(), {
		//决定map文件的模式
		devtool: "source-map",
		module:{
			rules:[{//处理css
				test: /\.css$/,
				include:[path.resolve(__dirname,"../src/")],
				use: css_extract.extract({
					fallback: "style-loader",
					use: ["css-loader","postcss-loader"]
				})
			},{//处理scss
				test: /\.scss$/,
				include:[path.resolve(__dirname,"../src/")],
				use: css_extract.extract({
					fallback: "style-loader",
					use: ["css-loader","postcss-loader","sass-loader"]
				})
			}]
		},
		plugins: [
			//分离第三方插件库，因为第三方插件库总是不变的，所以让浏览器缓存他，提高速度
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				minChunks: function(module) {
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
			//压缩JS文件，并生成sourceMap
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				},
				sourceMap: process.env.node_order === "build"
			}),
			//定义可配置的全局变量
			new webpack.DefinePlugin({
				root_url: process.env.node_order === "build" ? JSON.stringify("生产路径") : JSON.stringify("线上路径"),
			}),
			//html插件
			new HtmlWebpackPlugin({
				template:path.resolve(__dirname,"../index.html"),
				title: "webpack-native",
				filename: 'index.html',
				inject:true,
				minify: {//更多配置选项：https://github.com/kangax/html-minifier#options-quick-reference
					removeComments: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					minifyCSS:true,
					minifyJS:true
				}
			}),
			//压缩css
			new optimizeCssAssetsWebpackPlugin({
				assetNameRegExp: /\.css$/g,//匹配要压缩的文件后缀
				cssProcessor: require('cssnano'),//为什么使用cssnano？https://github.com/iuap-design/blog/issues/159
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
			css_extract
			]
		});
module.exports  = config;
