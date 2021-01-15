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

function listDrop(list){
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
	listDrop(this);
}

//Menu dropdown
let listDropper =  document.getElementById('menu-DropDown');

function menuDropDown(list){
	let divisionList = list.parentElement.nextElementSibling;
	let divisionList2 = list.parentElement.nextElementSibling.nextElementSibling;

	if(divisionList.style.maxHeight){
		divisionList.style.maxHeight = null;
		divisionList2.style.maxHeight = null;
		divisionList.style.transition = '0.3s';
		divisionList2.style.transition = '0.3s';

	}else{
		divisionList.style.transition = '0.3s';
		divisionList2.style.transition = '0.3s';
		divisionList.style.maxHeight = divisionList.scrollHeight  + 'px';
		divisionList2.style.maxHeight = divisionList2.scrollHeight  + 'px';
	}
}

listDropper.onclick = function(){
	menuDropDown(this);
}

//modal displayer and closer
let modBtn = document.getElementsByClassName("contact-btn");
let mobileModBtn = document.getElementsByClassName("MobileContact-Btn");
let modal = document.getElementById("formMod");
let modalContent = document.getElementById("modal-content");
let mobileCardbtn = document.getElementsByClassName('MobileContact-Btn');

for (i = 0; i < modBtn.length; i++) {
    modBtn[i].onclick = function() {
		let normalSizeAdHeader = this.parentElement.parentElement.parentElement.children[1].children[0].innerHTML;
		modalOpener(normalSizeAdHeader);
    }
}

for (i = 0; i < mobileCardbtn.length; i++) {
	mobileCardbtn[i].onclick = function(){
		let modalCardHeader = this.parentElement.parentElement.children[0].children[0].innerHTML;
		modalOpener(modalCardHeader);
	}
}

function modalOpener(headerTitle){
	let adTitle = headerTitle;
	let messageToSeller = document.getElementById('subject');
	let messageToSellerErr = document.getElementById('subject-Err');
	document.body.style.overflow = 'hidden';
	
	modalContent.classList.remove('slideUp');
	modal.classList.remove('fadeOut');
	modal.style.display = "block";
	messageToSeller.value = `Hi, I am interested in ${adTitle}`;

	if(messageToSeller.value.length > 0){
		messageToSellerErr.style.display = 'none';
		messageToSeller.classList.remove('Message-redBox');
	}
}

let modalCloser = document.getElementsByClassName("modal-closer");

for (i = 0; i < modalCloser.length; i++) {
    modalCloser[i].onclick = function() {
		modalContent.classList.add('slideUp');
		modal.classList.add('fadeOut');
		
		setTimeout(function(){
			document.body.style.overflow = 'auto';
			 modal.style.display = "none";
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
	
	 if (event.target == modal) {
        modalContent.classList.add('slideUp');
		modal.classList.add('fadeOut');
		
		setTimeout(function(){
			document.body.style.overflow = 'auto';
			 modal.style.display = "none";
		},900);
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
refineSearchBtn.onclick = function(){
	if(categoriesCont.className.search('closeList') != -1){
		categoriesCont.classList.remove('closeList');
	}else{
		categoriesCont.classList.add('closeList');
	}
}