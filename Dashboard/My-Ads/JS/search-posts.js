let searchAd = document.getElementById('search-post');

let searchBtn = document.getElementById('search-btn');

let adTitle = document.getElementsByClassName('post-title');

let numOfAds = document.getElementById('post-num');

let noAdsFound = document.getElementById('no-posts-found');

let noPostFoundTitle = document.getElementById('no-post-found-title');

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
	
	if(searchAd.value === "" || searchAd.value.length === 0 || searchAd.value === null){
		noPostFoundTitle.innerHTML = `You do not have any ads.`;
	}else{
		noPostFoundTitle.innerHTML = `No Ads found`; 
	}
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

let deleteAllCheckBox = document.getElementById('checkbox');

let adCheckBoxes = document.getElementsByClassName('post-checkbox');

deleteAllCheckBox.onclick = () => {
	
	for(let i = 0; i < adCheckBoxes.length; i++){
			if(deleteAllCheckBox.checked){
				adCheckBoxes[i].checked = true;
		
			}else{
				adCheckBoxes[i].checked = false;
			}
	}
}

let deleteSelectedAds = document.getElementById('delete-All');
let deletededElements = [];

deleteSelectedAds.onclick = () => {
	
	let x = Array.from(adCheckBoxes);
	let num = 0;

	x.map((ad) => {

		let adBox = ad.parentElement.parentElement.parentElement.parentElement;

		if(ad.checked && window.getComputedStyle(adBox, null).display !== 'none'){
			num++
			deletededElements.push(adBox.id)

			adBox.remove();

			if(num <= 1){
				numOfAds.innerHTML = `${ num } Ad`;
			}else if(num === x.length){
				numOfAds.innerHTML = `0 Ad`;
			}else{
				numOfAds.innerHTML = `${ num } Ads`;
			}

			if(num === x.length || (num === adTitle.length  && searchAd.value.length > 0)){
				numOfAds.innerHTML = `0 Ad`;
				noPostFoundTitle.innerHTML = `You do not have any ads.`; 
				noAdsFound.style.display = 'flex';
			}else{
				noAdsFound.style.display = 'none';
			}

			fetch(`/delete/${ deletededElements.join('+') }`, {
				method: 'POST'
			}).then((response) => {
				if(response.ok){
					console.log(response);
					return;
				}
				throw new Error('Item failed to send');
			}).catch((err) => {
				console.log(err);
			});

		}
	});
}

let singleAdDelete = document.getElementsByClassName('individual-post');

let singleAdDeleter = () => {
		let num = 0;
		let total = singleAdDelete.length;
		let outcome;
		for(let i = 0; i < singleAdDelete.length; i++){
		outcome = singleAdDelete[i].parentElement.parentElement.parentElement.parentElement;
		singleAdDelete[i].onclick = function(){
			num++;
			let adBox = this.parentElement.parentElement.parentElement.parentElement;

			if(num <= 1){
				numOfAds.innerHTML = `${ num } Ad`;
			}else{
				numOfAds.innerHTML = `${ num } Ads`;
			}

			adBox.remove();
			if(num === total || (num === adTitle.length && searchAd.value.length > 0)){
				numOfAds.innerHTML = `0 Ad`;
				noPostFoundTitle.innerHTML = `You do not have any ads.`; 
				noAdsFound.style.display = 'flex';
			}else{
				noAdsFound.style.display = 'none';
			}

			fetch(`/delete/${ adBox.id }`, {
				method: 'POST'
			}).then((response) => {
				if(response.ok){
					console.log(response);
					return;
				}
				throw new Error('Item failed to send');
			}).catch((err) => {
				console.log(err);
			});
		}
	}
}

singleAdDeleter();