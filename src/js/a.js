function show_tips() {
	let tips = null,
	tips_el;
	return function() {
		if( tips === null ){
			let temp = document.createElement("div");
			tips = `
			<div class="tips">
				<h1>原生webpack配置</h1>
				<ul>
					<li>具备功能：</li>
					<li>可以写现代化的es6</li>
					<li>可以写sass、css，css自动补齐前缀</li>
					<li>图片问题：js文件里，用require、import等导入，其他文件就直接用就好了</li>
					<li>提供热刷新</li>
					<li>提供判断不同环境的全局变量：now_env</li>
					<li>具备代码优化，压缩等基本功能</li>
					<li>如果要填加网站图标，请如下使用：<br />将图标放到src/static中，并在页面link为static/xxx.icon</li>
				</ul>
				<div class="close">X</div>
			</div>
			`;
			temp.innerHTML = tips;//如果直接innerHTML的话，会重置被添加元素内子元素的事件...
			document.body.appendChild(temp);
			tips_el = document.querySelector('.tips');
			document.querySelector('.close').onclick = function() {
				tips_el.style.display = "none";
			}
		}else{
			tips_el.style.display = "block";
		}
	}
}
export default show_tips();