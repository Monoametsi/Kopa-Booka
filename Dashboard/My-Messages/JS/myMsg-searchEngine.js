let table = document.getElementById('table');
let slideCont = document.getElementById("post-info-cont");
let slideCard = document.getElementsByClassName("post-info-cont");
let slideCloser = document.getElementsByClassName("slide-closer");

function closer(){
	if(slideCont.style.width !== '50%'){
    	slideCont.style.width = '50%';
    	slideCont.style.borderLeft = '1px solid #888';
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
	for(let i = 1; i < table.rows.length; i++){
		table.rows[i].onclick = function(){
			let tableTitle = this.cells[2].innerHTML.trim();
			let tableDate = this.cells[6].innerHTML.trim();
			for(let j = 0; j < slideCard.length; j++){
				
				slideCard[j].style.display = 'none';

				let cardTitle = slideCard[j].children[1].children[1].children[1].children[0].children[0].children[0].innerHTML.trim();
				let cardDate = slideCard[j].children[1].children[0].children[1].children[0].children[3].children[1].innerHTML.trim();

				if(tableTitle === cardTitle && tableDate === cardDate){
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
let noAdsFound = document.getElementById('no-posts-found');

searchEngineBtn.onclick = () => {
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