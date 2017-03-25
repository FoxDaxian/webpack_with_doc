# 原生webpack配置(参考vue-cli

* 具备基础：html，css，sass，es6（JS中设置img的src ，请require、import...
* 开发、生产两种环境，通过now_env获取当前环境
* npm run bild （生产模式打包
* npm run dev (开发模式，具备热重载

***

    webpack_with_doc/  
        |-- config/            ->  基本配置  
            |-- base.js            ->  基础配置  
            |-- dev-client.js      ->  middleware插件  
            |-- webpack.build.js   ->  生产模式配置  
            |-- webpack.dev.js     ->  开发模式配置  
        |-- node_to/           ->  cli命令  
            |-- build.js           ->  生产
            |-- dev.js             ->  开发  
        |-- src/               ->  源文件  
            |-- css/               ->  css&scss  
            |-- js/                ->  js  
            |-- static/            ->  静态资源（图片、icon等  
        |-- .babelrc           ->  babel  
        |-- gitignore          ->  git忽略  
        |-- index.html         ->  模板html
        
        
[我的博客](http://rbblog.space/ "会丑到你的")
