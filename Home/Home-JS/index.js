//Topnav  and scroll
let topNav = document.getElementById("Topnav");
let scrollUp = window.pageYOffset;

// let num = document.getElementById('num')

// window.onresize = () => {
	// num.innerHTML = window.innerWidth;
// }

let hideBar = function() {
    let scrollDown = window.pageYOffset;
    if (scrollUp > scrollDown) {
        topNav.style.top = "0";
    } else {
        topNav.style.top = '-' +  topNav.scrollHeight  + 'px';
    }
    scrollUp = scrollDown;
}

let menuClassLister = () => {
	let bodyScrol = document.body.scrollTop;
    let htmlScrol = document.documentElement.scrollTop;

    if (bodyScrol > 0 || htmlScrol > 0) {
		topNav.classList.remove('home-menu');
		topNav.classList.add('scroll-down-menu');

    } else {
		topNav.classList.remove('scroll-down-menu');
        topNav.classList.add('home-menu');
    }
}

window.onscroll = function() {
   menuClassLister();
   hideBar();
}

menuClassLister();

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

function listSlider(list, arrow){
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

		listSlider(this, arrow);
	}
}

//Menu dropdown
let listDropper =  document.getElementById('menu-DropDown');
let naver =  document.getElementsByClassName('nav')[0];

let roundIcon = document.getElementById('login-menu');
let arrower = document.getElementById('menu-arrow');
let dashboardMenu = document.getElementById('dashboard-links');

function menuDropDown(list){
	let bodyScrol = document.body.scrollTop;
    let htmlScrol = document.documentElement.scrollTop;

	let divisionList = list.parentElement.nextElementSibling;

	let divisionList2 = divisionList.nextElementSibling;
	let divisionList3 = divisionList2.children[1].children[1];

	if(divisionList.style.maxHeight){
		divisionList.style.maxHeight = null;
		divisionList2.style.maxHeight = null;
		if(divisionList3 !== undefined){
			divisionList3.style.maxHeight = null;
			divisionList3.style.transition = '.3s'
		}

		divisionList.style.transition = '0.3s';
		divisionList2.style.transition = '0.3s';

		if(htmlScrol === 0){
			topNav.classList.add('home-menu');
		}

	}else{
		divisionList.style.transition = '0.3s';
		divisionList2.style.transition = '0.3s';
		divisionList.style.maxHeight = divisionList.scrollHeight  + 'px';
		divisionList2.style.maxHeight = divisionList2.scrollHeight  + 'px';
		if(divisionList3 !== undefined){
			divisionList3.style.transition = '.3s';
			divisionList3.style.maxHeight = divisionList3.scrollHeight + 30 + 'px';
		}
		
		
		if(htmlScrol === 0){
			topNav.classList.remove('home-menu');
		}
	}
}

listDropper.onclick = function(){
	menuDropDown(this);
}

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

window.onclick = (event) => {
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

let preloader = document.getElementById('preloader-bg-cont');

window.onload = () => {
	
	preloader.classList.add('close-preloader');
	
	setTimeout(() => {

		preloader.style.display = 'none';

	}, 300)
	
}