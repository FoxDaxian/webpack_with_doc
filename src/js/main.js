require('./a');
require.ensure(['./b'], function(){
	window.onclick = function() {
		require('./b');
	};
	require('./c');
	console.log('done!');
});