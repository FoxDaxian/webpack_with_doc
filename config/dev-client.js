//设置webpack-hot-middleware
var hotClient = require("webpack-hot-middleware/client?noInfo=true&reload=true");

//hotClient的订阅事件，如果出发action 为reload 则页面刷新
hotClient.subscribe(function (event) {
	if (event.action === "reload") {
		window.location.reload();
	}
});
