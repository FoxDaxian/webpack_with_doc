import _ from 'lodash';
console.log(root_url);
function acel() {
	let el = document.createElement("div");
	el.innerHTML = _.join([1, 2, 3], "");
	return el;
}
document.body.appendChild(acel());
