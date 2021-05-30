let searchAd = document.getElementById('search-post');

let searchBtn = document.getElementById('search-btn');

let adTitle = document.getElementsByClassName('post-title');

let numOfAds = document.getElementById('post-num');

let noAdsFound = document.getElementById('no-posts-found');

let noPostFoundTitle = document.getElementById('no-post-found-title');

let adCounterBtn = document.getElementById('sort-list-btn');

let hiddenBtn = document.getElementById('hidden-sort-list-btn');

//Functionality for toggling of the btn that displays the number of ads
adCounterBtn.onclick = () => {
	let displayValue = window.getComputedStyle(hiddenBtn, null).display;
	
	if(displayValue !== 'none'){
		adCounterBtn.classList.remove('add-focus');
		hiddenBtn.style.display = 'none';
	}else{
		adCounterBtn.classList.add('add-focus');
		hiddenBtn.style.display = 'flex';
	}
	
}

//Counting number of ads
function defaultAdNum(){
	if(adTitle.length <= 1){
		numOfAds.innerHTML = `${ adTitle.length } Ad`;
	}else{
		numOfAds.innerHTML = `${ adTitle.length } Ads`;
	}
}

function adNumCounter(num){
	if(num.length <= 1){
		return numOfAds.innerHTML =  `${ num } Ad`;
	}else{
		return numOfAds.innerHTML =  `${ num } Ads`;
	}
}

defaultAdNum();

//Search ad system
function searchAdSystem(){
	let num = 0;
	let hiddenAds = [];
	
	//Condition for what message should be displayed when no string value is placed in the search input field
	if(searchAd.value.trim() === "" || searchAd.value.trim().length === 0 || searchAd.value === null || searchAd.value === undefined){
		noPostFoundTitle.innerHTML = `You do not have any ads.`;
	}else{
		noPostFoundTitle.innerHTML = `No Ads found`; 
	}

	//Looping through all ads.
	for(let i = 0; i < adTitle.length; i++){
			
		//Variable representing the title of the adboxes parentElemet i.e(The whole advert container)
		let adBox = adTitle[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

		//Conditon for what should happend when theres no string value in the search box when clicked. 
		//In this case all ads should be displayed when this happens
		if(searchAd.value.trim() === "" || searchAd.value.trim().length === 0 || searchAd.value === null || searchAd.value === undefined){
			num++ 
			
			//displays all ads
			adBox.style.display = 'flex';

			//Number format for the number of ads displayed.
			adNumCounter(num);

		//Condition for what should happen when theres a match. 
		// Ads that satisfy the match must be displayed, those that dont are hidden
		} else if(searchAd.value.toLowerCase().trim() === adTitle[i].innerText.toLowerCase().trim()){
			num++;
			adBox.style.display = 'flex';

			adNumCounter(num);

		}else{
			adBox.style.display = 'none';
		}

		//Hidden ads placed in an array
		if(window.getComputedStyle(adBox, null).display === 'none'){
			hiddenAds.push(adBox);
		}

		//Condition for if there are no ads that match. In this case nothing but a 'no ads found' message is displayed.
		if(hiddenAds.length === adTitle.length){
			adNumCounter(num);
			noAdsFound.style.display = 'flex';
		}else{
			noAdsFound.style.display = 'none';
		}
		
	}
}

//Search btn click functionality
searchBtn.onclick = () =>{
	searchAdSystem();
	singleAdDeleter();
	allAdDeleter();
}

//Search input field functionality when enter btn is clicked
searchAd.onkeydown = (event) => {
	
	if(event.keyCode === 13){
		searchAdSystem();
		singleAdDeleter();
		allAdDeleter();
	}
}

let deleteAllCheckBox = document.getElementById('checkbox');

let adCheckBoxes = document.getElementsByClassName('post-checkbox');

//Check all adboxes when select all checkbox is clicked
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

//Deleting checked ads functionality
let allAdDeleter = () => {
	deleteSelectedAds.onclick = () => {
		let deletededElements = [];
		
		let numOfDisplayedAds = 0;
		
		//all checkboxes placed in array
		let checkboxArr = Array.from(adCheckBoxes);
		
		//Counting number of checked ads
		let num = 0;

		checkboxArr.map((ad) => {
			
			//checkbox parent element, i.e( the advert box )
			let adBox = ad.parentElement.parentElement.parentElement.parentElement;
			
			if(window.getComputedStyle(adBox, null).display !== 'none'){
				numOfDisplayedAds++;
			}
			
			//Conditon for checking checked ads to be deleted
			if(ad.checked && window.getComputedStyle(adBox, null).display !== 'none'){
				num++
				
				//Ads to be deleted placed in array to be sent to server in order to be deleted.
				deletededElements.push(adBox.id)
				
				//Removes ad from the frontend
				adBox.remove();

				//Conditon for number format
				if(num <= 1){
					numOfAds.innerHTML = `${ num } Ad`;
				}else if(num === checkboxArr.length){
					numOfAds.innerHTML = `0 Ad`;
				}else{
					numOfAds.innerHTML = `${ num } Ads`;
				}

				//Condition for if all ads get deleted a message should be displayed
				if(num === checkboxArr.length || num === numOfDisplayedAds ){
					numOfAds.innerHTML = `0 Ad`;
					noPostFoundTitle.innerHTML = `You do not have any ads.`; 
					noAdsFound.style.display = 'flex';
				}else{
					noAdsFound.style.display = 'none';
				}

				// Fetch api sends the deleted elements to the server to be deleted on the backend via the delete url
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
}

allAdDeleter();

let singleAdDelete = document.getElementsByClassName('individual-post');

//Functionality for when an individual ad gets posted
let singleAdDeleter = () => {
		
		let numOfDisplayedAds = 0;
		
		//Counting number of ads deleted
		let num = 0;

		//Counting total amount of ads
		let total = singleAdDelete.length;
	
		let outcome;

		//Looping through all ads
		for(let i = 0; i < singleAdDelete.length; i++){
		
		//Each indivual ads delete btns parentElement container.
		outcome = singleAdDelete[i].parentElement.parentElement.parentElement.parentElement;
		
		if(window.getComputedStyle(outcome, null).display !== 'none'){
			numOfDisplayedAds++
		}

		//Functionality for what occurs when delete btn is clicked.
		singleAdDelete[i].onclick = function(){
			//Counting amount of deleted ads
			num++;
			
			//Individual ad delete btns parentElement container.
			let adBox = this.parentElement.parentElement.parentElement.parentElement;
			
			//Conditon for how to display number of deleted ads
			adNumCounter(num);

			//Functionality that removes ad from the frontend
			adBox.remove();

			//Condition to account for when all ads have been deleted via the clicking of the deleted icon.
			if(num === total || num === numOfDisplayedAds){
				numOfAds.innerHTML = `0 Ad`;

				noPostFoundTitle.innerHTML = `You do not have any ads.`; 

				noAdsFound.style.display = 'flex';
			}else{
				noAdsFound.style.display = 'none';
			}

			//Fetch Api sends the deleted ad to a be deleted on the backend via the delete url.
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