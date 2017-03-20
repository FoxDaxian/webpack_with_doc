const path = require('path');

console.log("当前文件目录为");
console.log(__dirname);

const config = {
	entry: {
		app_a:"./src/js/a.js",
		app_b:"./src/js/b.js"
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, 'dist')
	},
	module:{
		loaders:[
		{
			test:/\.js$/,
			loader:"babel-loader"
		}
		]
	}
};

module.exports = config;