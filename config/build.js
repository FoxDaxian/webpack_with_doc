//使用merge
const webpackMerge = require('webpack-merge');
//引入通用配置
const base_config = require("./base.js");

process.noDeprecation = true;//去除一个现在无关紧要的警告


/**
 * 导出合并的生产模式配置
 * @param  {随便} env 获取package.json的scripts中，--env=xxx  中的 xxx
 * @return {对象}     配置对象
 */
module.exports = function(env) {
	return webpackMerge(base_config(),{

	});
};