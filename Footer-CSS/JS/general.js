// let num = document.getElementById('num')

// window.onresize = () => {
	// num.innerHTML = window.innerWidth;
// }

//Nav hider
let topNav = document.getElementById("Topnav");
let scrollUp = window.pageYOffset;

let hideBar = function() {
    let scrollDown = window.pageYOffset;
    if (scrollUp > scrollDown) {
        topNav.style.top = "0";
    } else {
        topNav.style.top = '-' +  topNav.scrollHeight  + 'px';
    }
    scrollUp = scrollDown;
}

//Scroll Top Function
let scrollTop = document.getElementById("scrollTopper");

scrollTop.onclick = function(){
	let pageLengthCounter = 0;
	let scrollTopperInterval = setInterval(scrollTopper, 20);
	
	function scrollTopper(){
		if(document.body.scrollTop != 0 || document.documentElement.scrollTop != 0){
				window.scrollBy(0, pageLengthCounter--);
		}else{
			clearInterval(scrollTopperInterval);
		}
	}
}

//footer list dropdown
let btn = document.getElementsByClassName('mobile-info-list-title-cont');

function footDropDown(list, arrow){
	let divisionList = list.nextElementSibling;
	arrow.classList.toggle('flip-over');

	if(divisionList.style.maxHeight){
		divisionList.style.maxHeight = null;
		divisionList.style.transition = '0.3s';

	}else{
		divisionList.style.transition = '0.3s';
		divisionList.style.maxHeight = divisionList.scrollHeight  + 'px';
	}

}

for(i = 0; i < btn.length; i++){
	btn[i].onclick = function(){
		let arrow = this.children[1];

		footDropDown(this, arrow);
	}
}

//Dashboard and nav dropdown
let listDropper =  document.getElementById('menu-DropDown');
let naver =  document.getElementsByClassName('nav')[0];

let roundIcon = document.getElementById('login-menu');
let arrower = document.getElementById('menu-arrow');
let dashboardMenu = document.getElementById('dashboard-links');

let menuCollapser = () => {
    arrower.classList.toggle('rotater');
    
	if(dashboardMenu.style.maxHeight){
    	dashboardMenu.style.maxHeight = null;
        dashboardMenu.style.transition = '.3s';
    }else{
    	dashboardMenu.style.transition = '.3s';
    	dashboardMenu.style.maxHeight = dashboardMenu.scrollHeight + 'px';
    }
}

if(roundIcon !== null){
	roundIcon.onclick = () => {
		menuCollapser();
	}
}

let dashboardDropdown = (event) => {
	let loginMenu = document.getElementsByClassName('login-menu')[0];

	if(loginMenu !== undefined){
		let displayValue = window.getComputedStyle(loginMenu, null).display;
		if(event.target.className.search('off-target') === -1 && displayValue !== 'none'){
			arrower.classList.remove('rotater');
			dashboardMenu.style.maxHeight = null;
			dashboardMenu.style.transition = '.3s';
			naver.style.maxHeight = null;
			naver.style.transition = '.3s';
		}
	}
}

window.addEventListener("onclick", dashboardDropdown);

/* Preloader */
let preloader = document.getElementById('preloader-bg-cont');
document.documentElement.style.overflow = "hidden" ;
document.body.style.overflow = "hidden" ;

window.onload = () => {

	preloader.classList.add('close-preloader');
	setTimeout(() => {
		
		document.documentElement.style.overflow = "auto" ;
		document.body.style.overflow = "auto" ;
		preloader.style.display = 'none';
		
	}, 250)
	
}