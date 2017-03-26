import "../css/index.scss";
import "../static/reset.css";

import click from "./a.js";

import arr from "./b.js";

console.log(`now_env是区分环境的全局环境变量：${now_env}`);

window.onload = function() {
	let btn = document.querySelector('.btn');
	btn.onclick = click;
	arr();
}