//Topnav  and scroll

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

//Menu dropdown

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