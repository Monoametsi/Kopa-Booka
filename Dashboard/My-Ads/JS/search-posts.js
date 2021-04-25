let searchAd = document.getElementById('search-post');

let searchBtn = document.getElementById('search-btn');

let adTitle = document.getElementsByClassName('post-title');

let numOfAds = document.getElementById('post-num');

let noAdsFound = document.getElementById('no-posts-found');

function defaultAdNum(){
	if(adTitle.length <= 1){
		numOfAds.innerHTML = `${ adTitle.length } Ad`;
	}else{
		numOfAds.innerHTML = `${ adTitle.length } Ads`;
	}
}

defaultAdNum();

function searchAdSystem(){
	let num = 0;
	let x = [];
	for(let i = 0; i < adTitle.length; i++){
		
		let adBox = adTitle[i].parentElement.parentElement.parentElement.parentElement.parentElement;
		
		if(searchAd.value === "" || searchAd.value.length === 0 || searchAd.value === null){
			num++
			adBox.style.display = 'flex';
			if(num <= 1){
				numOfAds.innerHTML = `${num} Ad`;
			}else{
				numOfAds.innerHTML = `${num} Ads`;
			}
		} else if(searchAd.value === adTitle[i].innerText.trim()){
			num++
			adBox.style.display = 'flex';
			if(num <= 1){
				numOfAds.innerHTML = `${num} Ad`;
			}else{
				numOfAds.innerHTML = `${num} Ads`;
			}
		}else{
			adBox.style.display = 'none';
		}
		
		
		if(window.getComputedStyle(adBox, null).display === 'none'){
			x.push(adBox);
		}

		if(x.length === adTitle.length){
			numOfAds.innerHTML = `${num} Ad`;
			noAdsFound.style.display = 'flex';
		}else{
			noAdsFound.style.display = 'none';
		}
		
	}
}

searchBtn.onclick = () =>{
	searchAdSystem();
}

searchAd.onkeydown = (event) => {
	
	if(event.keyCode === 13){
		searchAdSystem();
	}
}