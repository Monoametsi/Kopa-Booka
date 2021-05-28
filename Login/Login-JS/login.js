//Topnav  and scroll
let topNav = document.getElementById("Topnav");
let scrollUp = window.pageYOffset;

let hideBar = function() {
    let scrollDown = window.pageYOffset;
    if (scrollUp > scrollDown) {
        topNav.style.top = "0";
    } else {
        topNav.style.top = '-' +  topNav.scrollHeight  + 'px'
    }
    scrollUp = scrollDown;
}

window.onscroll = function() {
    let bodyScrol = document.body.scrollTop;
    let htmlScrol = document.documentElement.scrollTop;

    if (bodyScrol > 0 || htmlScrol > 0) {
        topNav.style.transition = "0.6s";
        topNav.style.opacity = "0.6";
        topNav.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
        topNav.onmouseover = function() {
            topNav.style.opacity = "1";
        }
        topNav.onmouseout = function() {
            topNav.style.opacity = "0.6";
        }
    } else {
        topNav.style.opacity = "1";
		topNav.style.boxShadow = "0 0 25px rgba(0,0,0,0.3)";
        topNav.onmouseover = function() {
            topNav.style.opacity = "1";
        }
        topNav.onmouseout = function() {
            topNav.style.opacity = "1";
        }
    }
    return hideBar();
}

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
let btn = document.getElementById('btn');
let arrow = document.getElementById('arrow');

function listSlider(list,animeClass){
	let divisionList = list.nextElementSibling;
	arrow.classList.toggle('flip-up');

	if(divisionList.style.maxHeight){
		divisionList.style.maxHeight = null;
		divisionList.style.transition = '0.3s';

	}else{
		divisionList.style.transition = '0.3s';
		divisionList.style.maxHeight = divisionList.scrollHeight  + 'px';
	}
}

btn.onclick = function(){
	listSlider(this);
}

//Menu dropdown
let listDropper =  document.getElementById('menu-DropDown');
let naver =  document.getElementsByClassName('nav')[0];

let roundIcon = document.getElementById('login-menu');
let arrower = document.getElementById('menu-arrow');
let dashboardMenu = document.getElementById('dashboard-links');

function menuDropDown(list){
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

	}else{
		divisionList.style.transition = '0.3s';
		divisionList2.style.transition = '0.3s';
		divisionList.style.maxHeight = divisionList.scrollHeight  + 'px';
		divisionList2.style.maxHeight = divisionList2.scrollHeight  + 'px';
		if(divisionList3 !== undefined){
			divisionList3.style.transition = '.3s';
			divisionList3.style.maxHeight = divisionList3.scrollHeight + 30 + 'px';
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