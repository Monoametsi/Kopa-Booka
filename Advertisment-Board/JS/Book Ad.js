//Topnav  and scroll
let topNav = document.getElementById("Topnav");
let scrollUp = window.pageYOffset;

// let num = document.getElementById('width-num');

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

window.onscroll = function() {
    let bodyScrol = document.body.scrollTop;
    let htmlScrol = document.documentElement.scrollTop;

	if (bodyScrol > 0 || htmlScrol > 0) {
		topNav.classList.add('scroll-down-menu');

    } else {
		topNav.classList.remove('scroll-down-menu');
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

//modal displayer and closer
let modBtn = document.getElementsByClassName("contact-btn");
let successBoxCont = document.getElementById('box-cont');
let mobileModBtn = document.getElementsByClassName("MobileContact-Btn");
let modal = document.getElementById("formMod");
let modalContent = document.getElementById("modal-content");
let mobileCardbtn = document.getElementsByClassName('MobileContact-Btn');

for (i = 0; i < modBtn.length; i++) {
    modBtn[i].onclick = function() {
		let normalSizeAdHeader = this.parentElement.parentElement.parentElement.children[1].children[0].children[0].innerText.trim();
		let modalContactNum = this.parentElement.parentElement.parentElement.children[1].children[0].href.trim();
		let advertUrl = new URL(modalContactNum);
		let advertId = advertUrl.pathname.replace('/view-ad/', '');
		modalOpener(normalSizeAdHeader, advertId);
    }
}

for (i = 0; i < mobileCardbtn.length; i++) {
	mobileCardbtn[i].onclick = function(){
		let modalCardHeader = this.parentElement.parentElement.children[0].children[0].children[0].innerText.trim();
		let modalContactNum = this.parentElement.parentElement.children[1].children[0].href.trim();
		let advertUrl = new URL(modalContactNum);
		let advertId = advertUrl.pathname.replace('/view-ad/', '');
		modalOpener(modalCardHeader, advertId);
	}
}

let sellersContactNum = document.getElementById('Post-Id');

function modalOpener(headerTitle, advertId){
	let adTitle = headerTitle;
	let messageToSeller = document.getElementById('subject');
	let messageToSellerErr = document.getElementById('subject-Err');
	document.body.style.overflow = 'hidden';

	sellersContactNum.value = `${ advertId }`;
	modalContent.classList.remove('slideUp');
	successBoxCont.classList.remove('slideUp');
	modal.classList.remove('fadeOut');
	modal.style.display = "block";
	modalContent.style.display = "flex";
	messageToSeller.value = `Hi, I am interested in ${ adTitle }`;

	if(messageToSeller.value.trim().length > 0){
		messageToSellerErr.style.display = 'none';
		messageToSeller.classList.remove('Message-redBox');
	}
}

let modalCloser = document.getElementsByClassName("modal-closer");

for (i = 0; i < modalCloser.length; i++) {
    modalCloser[i].onclick = function() {
		modalContent.classList.add('slideUp');
		successBoxCont.classList.add('slideUp');
		modal.classList.add('fadeOut');
		
		setTimeout(function(){
			document.body.style.overflow = 'auto';
			modal.style.display = "none";
			successBoxCont.style.display = "none";
		},900);
    }
}

//Sort by dropdown
let sortByBtn = document.getElementById("SortBy-Btn");
let sortByList = document.getElementById("Sort-List");
let sortByIcon = document.getElementById("collapser");

function sortListOpener(){
	if(sortByList.style.display === '' || sortByList.style.display === 'none'){
		sortByList.style.display = 'block';
		sortByList.classList.remove('zoom-out');
		sortByIcon.style.transform = 'rotate(360deg)';

	}else if(sortByList.style.display === 'block'){
		sortByList.classList.add('zoom-out');
		sortByIcon.style.transform = 'rotate(180deg)';

		setTimeout(function(){
			sortByList.style.display = 'none';
		},300)
	}
}

sortByBtn.onclick = function(){
	sortListOpener();
}

window.onclick = function(event) {
	if (event.target.className.search('icon') == -1){
	   sortByList.classList.add('zoom-out');
	   sortByIcon.style.transform = 'rotate(180deg)';
	   
		setTimeout(function(){
			sortByList.style.display = 'none';
		},300)
	}
	
	 if (event.target == modal || event.target == successBoxCont) {
        modalContent.classList.add('slideUp');
		successBoxCont.classList.add('slideUp');
		modal.classList.add('fadeOut');
		
		setTimeout(function(){
			document.body.style.overflow = 'auto';
			 modal.style.display = "none";
			 successBoxCont.style.display = "none";
		},900);
    }
	

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

//Category List dropdown
let divisionBtn = document.getElementsByClassName('clicker');
let allFaculties = document.getElementById('facultyLists');
let door = document.getElementById('closeOpen-list');
allFaculties.style.maxHeight = 280  + 'rem';

function listSlider(btn,flipAnime){
	let divisionList = btn.nextElementSibling;
	btn.children[1].classList.toggle(flipAnime);
	divisionList.classList.add('slideIn');

	if(divisionList.style.maxHeight){
		divisionList.style.maxHeight = null;
		divisionList.style.transition = '1.8s';

	}else{
		divisionList.style.transition = '4.8s';
		divisionList.style.maxHeight = divisionList.scrollHeight  + 'rem';
		divisionList.classList.remove('slideIn');
	}
}

for(i = 0; i < divisionBtn.length; i++){
	divisionBtn[i].onclick = function(){
		listSlider(this, 'flip-up');
	}
}

door.onclick = function(){
	listSlider(this, 'flip-down');
}

//Refine search list dropdown
let refineSearchBtn = document.getElementById('refine-search');
let categoriesCont = document.getElementById('categories-cont');

//Add class on resize
let cateHiderScreenSize = window.matchMedia("(max-width: 750px)");

function ResizeClassAdder(){	
	if(cateHiderScreenSize.matches){
		categoriesCont.classList.add('closeList');
	}else{
		categoriesCont.classList.remove('closeList');
	}
}

ResizeClassAdder();
cateHiderScreenSize.addListener(ResizeClassAdder);

//Refine search list displayer
if(refineSearchBtn !== null){
	refineSearchBtn.onclick = function(){
		if(categoriesCont.className.search('closeList') != -1){
			categoriesCont.classList.remove('closeList');
		}else{
			categoriesCont.classList.add('closeList');
		}
	}
}