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
let formResultsLoader = document.getElementById('modal-preloader');
let failureBoxCont = document.getElementById('box-cont-failure'); 

function modalOpener(headerTitle, advertId){
	let adTitle = headerTitle;
	let messageToSeller = document.getElementById('subject');
	let messageToSellerErr = document.getElementById('subject-Err');
	document.body.style.overflow = 'hidden';
	document.documentElement.style.overflow = 'hidden';

	sellersContactNum.value = `${ advertId }`;
	modalContent.classList.remove('slideUp');
	successBoxCont.classList.remove('slideUp');
	failureBoxCont.classList.remove('slideUp');
	modal.classList.remove('fadeOut');
	formResultsLoader.style.display = "none";
	modal.style.display = "flex";
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
		failureBoxCont.classList.add('slideUp');
		modal.classList.add('fadeOut');

		setTimeout(function(){
			document.body.style.overflow = 'auto';
			document.documentElement.style.overflow = 'auto';
			modal.style.display = "none";
			successBoxCont.style.display = "none";
			failureBoxCont.style.display = "none";
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

	 if (event.target == modal || event.target == successBoxCont  || event.target == failureBoxCont) {
        modalContent.classList.add('slideUp');
		successBoxCont.classList.add('slideUp');
		failureBoxCont.classList.add('slideUp');
		modal.classList.add('fadeOut');
		
		setTimeout(function(){
			document.body.style.overflow = 'auto';
			document.documentElement.style.overflow = 'auto';
			modal.style.display = "none";
			successBoxCont.style.display = "none";
			failureBoxCont.style.display = "none";
			formResultsLoader.style.display = "none";
		},900);
    }

}

let formResultsLoaderFunc = (showOrHide, formResult) => {
	
	modalContent.style.display = "none";
	formResultsLoader.style.display = showOrHide;

	if(formResult){
		formResult.style.display = "flex";
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
let adTitleCont =  document.getElementById('Ad-title')

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
		adTitleCont.classList.toggle('decrease-margin');
		
		if(categoriesCont.className.search('closeList') != -1){
			categoriesCont.classList.remove('closeList');
		}else{
			categoriesCont.classList.add('closeList');
		}
	}
}