let table = document.getElementById('table');
let slideCont = document.getElementById("post-info-cont");
let slideCard = document.getElementsByClassName("post-info-cont");
let slideCloser = document.getElementsByClassName("slide-closer");
let noAdsFound = document.getElementById('no-posts-found');

let width = document.getElementById('width-num');

window.onresize = () => {
	width.innerHTML = window.innerWidth;
}

function closer(){
	if(slideCont.style.width !== '50%'){
    	slideCont.style.width = '50%';
    	slideCont.style.borderLeft = '1px solid #888';
		return true;
	}
}

function slideTerminator(){
	for(let i = 0; i < slideCloser.length; i++){
		slideCloser[i].onclick = () => {
			  if(slideCont.style.width === '50%'){
				slideCont.style.width = '0';
				slideCont.style.borderLeft = '0';
			}
		}
	}
}

slideTerminator();

function slideDisplayer(){
	let num = 0;
	let numOfDisplayedMsgs = 0;
	for(let i = 1; i < table.rows.length; i++){
		
		if(window.getComputedStyle(table.rows[i], null).display != 'none'){
			numOfDisplayedMsgs++;
		}

		table.rows[i].onclick = function(event){
			let tableId = this.id;
			
			for(let j = 0; j < slideCard.length; j++){
				
				
				slideCard[j].style.display = 'none';

				let cardId = slideCard[j].children[1].children[1].children[1].children[0].children[0].children[0].id;
				
				if(event.target === this.cells[0].children[0]){
					if(slideCont.style.width !== '50%'){
						return null;
					}
				}

				if(event.target === this.cells[7].children[0].children[0]){
					if(slideCont.style.width !== '50%'){
						num++;

						if((table.rows.length - 1) === 1 || num === numOfDisplayedMsgs){
							noAdsFound.style.display = 'flex';
						}else{
							noAdsFound.style.display = 'none';
						}
						this.remove();

						fetch(`/delete-message/${ this.id }`, {
							method: 'POST'
						}).then((response) => {
							if(response.ok){
								console.log(response);
								return;
							}
							
							throw new Error('Response Failed')
						}).catch((err) => {
							console.log(err);
						});
						
						return null;
					}
				}

				if(tableId === cardId){
					slideCard[j].style.display = 'flex';
					closer();
				}else{
					slideCard[j].style.display = 'none';
				}	
				
			}
		}
	}
}

slideDisplayer();

let searchEngine = document.getElementById('search-messages');
let searchEngineBtn = document.getElementById('searchEngine-btn');

function searchEnginSystem(){
	let searchEngineVal = searchEngine.value;
	let num = 0;
	for(let i = 1; i < table.rows.length; i++){
		let adTitle = table.rows[i].cells[2].innerHTML.trim();
		let adEmail = table.rows[i].cells[4].innerHTML.trim();
		let adTel = table.rows[i].cells[5].innerHTML.trim();

		if(searchEngineVal === "" || searchEngineVal.length === 0 || searchEngineVal === null){
			table.rows[i].style.display = 'table-row';
		}else if(adTitle === searchEngineVal || adEmail === searchEngineVal || adTel === searchEngineVal){
			table.rows[i].style.display = 'table-row';
		}else{
			table.rows[i].style.display = 'none';
		}

		if(table.rows[i].style.display === 'none'){
			num++;
		}
		
		if(num === i){
				noAdsFound.style.display = 'flex';
		}else{
			noAdsFound.style.display = 'none';
		}
	}
}

searchEngineBtn.onclick = () => {
	searchEnginSystem();
	slideDisplayer();
}

searchEngine.onkeydown = (event) => {

	if(event.keyCode === 13){
		searchEnginSystem();
		slideDisplayer();
	}

}

let mainCheckBox = document.getElementById('main-checkbox');
let subCheckBox = document.getElementsByClassName('sub-checkBox');

mainCheckBox.onclick = function(){
	for(let i = 0; i < subCheckBox.length; i++){
		let tableRow = subCheckBox[i].parentElement.parentElement;
		if(this.checked && window.getComputedStyle(tableRow, null).display != 'none'){
			subCheckBox[i].checked = true;
		}else{
			subCheckBox[i].checked = false;
		}
	}
}

let deleteAllBtn = document.getElementById('deleteAll-cont');
let toolTip = document.getElementById('content-title');

deleteAllBtn.onmouseover = () => {
	toolTip.classList.add('smooth-in');
	toolTip.style.opacity = '1';
	toolTip.style.display = 'flex';
}

deleteAllBtn.onmouseout = () => {
	toolTip.style.opacity = '0';
	toolTip.style.display = 'none';
}

deleteAllBtn.onclick = () => {
	let currentNum = 0;
	let numOfDisplayedMsgs = 0;
	let deletedBulk = []
	let subCheckBoxArr = Array.from(subCheckBox);

	subCheckBoxArr.map((checkBox) => {
		let tableRow = checkBox.parentElement.parentElement;

		if(checkBox.checked && window.getComputedStyle(tableRow, null).display != 'none'){
			currentNum++;
			deletedBulk.push(tableRow.id);
			tableRow.remove();
		}
		
		if(window.getComputedStyle(tableRow, null).display != 'none'){
			numOfDisplayedMsgs++
		}

		if(subCheckBoxArr.length === currentNum || numOfDisplayedMsgs === currentNum ){
			noAdsFound.style.display = 'flex';
		}else{
			noAdsFound.style.display = 'none';
		}
	});

	if(deletedBulk.length > 0){
		fetch(`/delete-message/${ deletedBulk }`,{ 
			method: 'POST'
		}).then((response) => {
			if(response.ok){
				console.log(response);
				return;
			}

			throw new Error('Response Failed');
		}).catch((err) => {
			console.log(err);
		})
	}

}