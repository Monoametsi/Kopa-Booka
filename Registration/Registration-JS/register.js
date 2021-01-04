//Topnav  and scroll
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

window.onscroll = function() {
    let bodyScrol = document.body.scrollTop;
    let htmlScrol = document.documentElement.scrollTop;

    if (bodyScrol > 0 || htmlScrol > 0) {
        topNav.style.transition = "0.5s";
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

//Scroll Top Function
let scrollTop = document.getElementById("scrollTopper");

scrollTop.onclick = function(){
	let pageLengthCounter = 0;
	let scrollTopperInterval = setInterval(scrollTopper, 20);
	
	function scrollTopper(){
		if(document.body.scrollTop != 0 || document.documentElement.scrollTop != 0){
				window.scrollBy(0, pageLengthCounter--);
					console.log(pageLengthCounter);
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
let listDropper =  document.getElementById('log-name');

function menuDropDown(list){
	let divisionList = list.parentElement.nextElementSibling;

	if(divisionList.style.maxHeight){
		divisionList.style.maxHeight = null;
		divisionList.style.transition = '0.3s';

	}else{
		divisionList.style.transition = '0.3s';
		divisionList.style.maxHeight = divisionList.scrollHeight  + 'px';
	}
}

listDropper.onclick = function(){
	menuDropDown(this);
}