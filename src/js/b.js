let fsy_arr = [{
	pos:"大前锋",
	skill:"自由灌篮"
},{
	pos:"小前锋",
	skill:"无视投篮"
},{
	pos:"中锋",
	skill:"盖帽抢断"
},{
	pos:"组织后卫",
	skill:"滚地扑球"
},{
	pos:"得分后卫",
	skill:"后仰三分"
}];

export default function() {
	for( let item of fsy_arr ){
		console.log(item);
	}
}