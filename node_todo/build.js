const path = require('path');
const webpack = require("webpack");

//使用shelljs
//利用shell来构建打包之后的输出位置，和路径等等
const shell = require('shelljs');

//定义环境变量以区分开发和生产
process.env.NODE_ENV = "production";

//这里引入的配置文件都可以使用到这个环境变量，因为webpack会根据引用关系建立关系图标
const build_config = require("../config/webpack.build.js");

//使用loading动画
const ora = require('ora');

shell.echo(`system:${process.platform}`);
shell.echo("pack start");
shell.echo("\n" + "--------------------------------" + "\n");

const spinner = ora('packing....');
spinner.start();


//把用到的资源复制到dist的static中
shell.rm("-rf",path.resolve(__dirname,"../dist"));
shell.mkdir("-p",path.resolve(__dirname,"../dist"));
shell.cp("-R",path.resolve(__dirname,"../src/static/"),path.resolve(__dirname,"../dist/static"));

//执行webpack编译
const compiler = webpack( build_config );
compiler.run( ( err, stats ) => {
	spinner.stop();
	if( err !== null ){
		console.error(err);
		return;
	}
	//标准输出流
	//stats.toString输出类似cli的输出
	//输出文件打包信息
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n\n');
});



