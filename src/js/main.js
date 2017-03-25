import "../css/index.scss";
import "../static/reset.css";

import click from "./a.js";

import arr from "./b.js";

window.onload = function() {
	let btn = document.querySelector('.btn');
	btn.onclick = click;
	arr();
}