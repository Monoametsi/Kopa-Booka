let num = document.getElementById('num');
window.onresize = function(){
	num.innerHTML = window.innerWidth;
}