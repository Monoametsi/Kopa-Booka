//Topnav  and scroll
let topNav = document.getElementById("Topnav");
let scrollUp = window.pageYOffset;

let hideBar = function() {
    let scrollDown = window.pageYOffset;
    if (scrollUp > scrollDown) {
        topNav.style.top = "0";
		
    } else {
        topNav.style.top = "-5rem";
    }
    scrollUp = scrollDown;
}

window.onscroll = function() {
    let bodyScrol = document.body.scrollTop;
    let htmlScrol = document.documentElement.scrollTop;

    if (bodyScrol > 0 || htmlScrol > 0) {
        topNav.style.height = "3.5rem";
        topNav.style.transition = "0.6s";
        topNav.style.opacity = "0.6";
		
        topNav.onmouseover = function() {
            topNav.style.opacity = "1";
        }
        topNav.onmouseout = function() {
            topNav.style.opacity = "0.6";
        }
    } else {
        topNav.style.height = "5rem";
        topNav.style.opacity = "1";
		
        topNav.onmouseover = function() {
            topNav.style.opacity = "1";
        }
        topNav.onmouseout = function() {
            topNav.style.opacity = "1";
        }
    }
    return hideBar();
}

//scrollTop
let scrollTop = document.getElementById("scrollTop");

scrollTop.onclick = function() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

//modal
let modBtn = document.getElementsByClassName("contact-btn");
let modal = document.getElementById("formMod");
let modalContent = document.getElementById("modal-content");

for (i = 0; i < modBtn.length; i++) {
    modBtn[i].onclick = function() {
		let adTitle = this.parentElement.parentElement.parentElement.children[1].children[0].innerHTML;
		let messageToSeller = document.getElementById('subject');
		let messageToSellerErr = document.getElementById('subject-Err');
		
		modalContent.classList.remove('slideUp');
		modal.classList.remove('fadeOut');
        modal.style.display = "block";
		messageToSeller.value = `Hi, I am interested in ${adTitle}`;
		
		if(messageToSeller.value.length > 0){
			messageToSellerErr.style.display = 'none';
			messageToSeller.classList.remove('Message-redBox');
		}
    }
}

let modalCloser = document.getElementsByClassName("modal-closer");

for (i = 0; i < modalCloser.length; i++) {
    modalCloser[i].onclick = function() {
		modalContent.classList.add('slideUp');
		modal.classList.add('fadeOut');
		
		setTimeout(function(){
			 modal.style.display = "none";
		},900);
    }
}

//Sort by list opener
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
			 modal.style.display = "none";
		},900);
    }
}

//List slider
let divisionBtn = document.getElementsByClassName('fa-caret-down');
let allFaculties = document.getElementById('facultyLists');
let door = document.getElementById('closeOpen-list');
allFaculties.style.maxHeight = allFaculties.scrollHeight  + 'rem';

function listSlider(btn,flipAnime){
	let divisionList = btn.parentElement.nextElementSibling;
	btn.classList.toggle(flipAnime);
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