import "../css/index.scss";
import "../static/reset.css";

import click from "./a.js";

import arr from "./b.js";

console.log(`process.env.NODE_ENV是区分环境的全局环境变量：${process.env.NODE_ENV}`);

console.log(...[1,2,3]);

window.onload = function() {
	let btn = document.querySelector('.btn');
	btn.onclick = click;
	arr();
}