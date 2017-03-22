//使用merge
const webpackMerge = require('webpack-merge');
//引入通用配置
const base_config = require("./base.js");
const webpack = require('webpack');

process.noDeprecation = true; //去除一个现在无关紧要的警告


/**
 * 导出合并的生产模式配置
 * @param  {随便} env 获取package.json的scripts中，--env=xxx  中的 xxx
 * @return {对象}     配置对象
 */
 module.exports = function(env) {
 	return webpackMerge(base_config(), {
		//决定map文件的模式
		devtool: "source-map",
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
			})
			]
		});
 };
