import "../css/index.css";
import "../css/index.scss";
require('./a');
require.ensure(['./b'], function(){
	window.onclick = function() {
		require('./b');
	};
	require('./c');
	console.log('done!');
});

console.log(root_url);
