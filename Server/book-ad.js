const dateFormater = require('./dateFormater');
const user = require('./mongo_db');
const ads = require('./Ads_mongodb');
const catAndCamp = require('./category-db');
const { dateDisplayer } = dateFormater;
const { Advertisements } = ads;
const { Category_and_campus_col } = catAndCamp;
const { Users } = user;

let displayAds = (req, res) => {
	var noAdsAvailable;
	var showSearchedAds = [];
	var isTrue;
	var num = 0;
	var startingNum = 1;
	var notFound = false;
	var numOfCurrentAds;
	var totalAmountOfAds;
	let { searchQuery, pageQuery } = req.params;

	Advertisements.find().then((result) => {
		
		function contactNumFormat(tel){
			let contact = tel.split('');
			return `${contact.slice(0, 3).join("")} ${contact.slice(3, 6).join("")} ${contact.slice(6, 10).join("")}`;
		}
		
		
		//pagination numbering
		let urlPageNum;
	    let pageNumSearch = req.url.search(/\/page-\d/);

		if(pageNumSearch === -1){
			urlPageNum = NaN;
		}else{

			urlPageNum = req.url.slice(pageNumSearch);

			urlPageNum = urlPageNum.slice(urlPageNum.search(/\d/));
		}

		//Counting sub categories
		let categoryLister = (College_of_Business_and_Economics) => {
			let count = {};

			for(j = 0; j < College_of_Business_and_Economics.length; j++){ 

				for(x = 0; x < result.length; x++){ 
					let { Sub_Category, Campus } = result[x];

					if(College_of_Business_and_Economics[j].toLowerCase() === Sub_Category.toLowerCase() || College_of_Business_and_Economics[j].toLowerCase() === Campus.toLowerCase()){

					 count[College_of_Business_and_Economics[j]] = (count[College_of_Business_and_Economics[j]] || 0) + 1;				
					}
				} 				
			}

			return count;
		}
		
		//Displaying ad content
		let numOfAdsDisplay = (data) => {
			return data;
		}
		
		//Low to high price sorting
		let lowToHighPrices = (lowPrice, highPrice) => {
			return lowPrice.Text_Book_Price - highPrice.Text_Book_Price;
		}
		
		//High to low price sorting
		let highToLowPrices = (lowPrice, highPrice) => {
			return highPrice.Text_Book_Price - lowPrice.Text_Book_Price;
		}
		
		//Sort method function
		let sortPrices = (arr, sortMethod) => {
			arr.sort(sortMethod);
		}
		
		//Sort method url
		let sortListUrl = req.url === `/Ad-board` || req.url === `/Ad-board/latest-Ads` || req.url === `/Ad-board/price-low-to-high` || req.url === `/Ad-board/price-high-to-low`;
		
		//Functionality for the regulation of search results.
		if(sortListUrl){
			startingNum
			totalAmountOfAds = result.length;
			numOfCurrentAds = result.slice(0, 20).map(numOfAdsDisplay).length;
			
			if(result.length === 0){
				noAdsAvailable = true;
			}

		}else if(searchQuery.toLowerCase().search(/page-\d/) !== -1 && req.url.search("/Ad-board/price-high-to-low") !== -1){
			numOfCurrentAds = result.slice(0, 20).map(numOfAdsDisplay).length;

			for(let i = 0; i < result.length; i+= 20){
				num++
				if(parseInt(urlPageNum) === num){
					startingNum += i;
					numOfCurrentAds += i;
				}
			}

			if(numOfCurrentAds >= result.length){
				numOfCurrentAds = result.length;
			}

			totalAmountOfAds = result.length;
			notFound = false;
		}else if(searchQuery.toLowerCase().search(/page-\d/) !== -1 && req.url.search("/Ad-board/price-low-to-high") !== -1){
			numOfCurrentAds = result.slice(0, 20).map(numOfAdsDisplay).length;

			for(let i = 0; i < result.length; i+= 20){
				num++
				if(parseInt(urlPageNum) === num){
					startingNum += i;
					numOfCurrentAds += i;
				}
			}

			if(numOfCurrentAds >= result.length){
				numOfCurrentAds = result.length;
			}

			totalAmountOfAds = result.length;
			notFound = false;
		}else

		if(searchQuery.toLowerCase().search(/page-\d/) !== -1  || req.url.search("/Ad-board/latest-Ads") !== -1){
			numOfCurrentAds = result.slice(0, 20).map(numOfAdsDisplay).length;

			for(let i = 0; i < result.length; i+= 20){
				num++
				if(parseInt(urlPageNum) === num){
					startingNum += i;
					numOfCurrentAds += i;
				}
			}

			if(numOfCurrentAds >= result.length){
				numOfCurrentAds = result.length;
			}

			totalAmountOfAds = result.length;
			notFound = false;
		}else if (searchQuery.toLowerCase().search(/page-\d/) === -1 && pageQuery === undefined && req.url.search("/category/") !== -1) {
			for(let i = 0, len = result.length; i < len; i++){	 

				let { Sub_Category, Campus } = result[i];

				let textBookTileMatcher = (not) => {
					not.Sub_Category;
					return not.Sub_Category.toLowerCase().search(searchQuery.toLowerCase()) !== -1 || not.Campus.toLowerCase().search(searchQuery.toLowerCase()) !== -1;
				}

				 if(Boolean(result.find(textBookTileMatcher)) === true){ 
					if(result[i].Sub_Category.toLowerCase().search(searchQuery.toLowerCase()) !== -1 || result[i].Campus.toLowerCase().search(searchQuery.toLowerCase()) !== -1){ 
						num++;
						showSearchedAds.push(result[i]);
						isTrue = true;
						
						totalAmountOfAds = showSearchedAds.length;
						notFound = false;
					} 
					} else { 
						notFound = true 
						break; 
				 } 
			}

			if(isTrue){
				numOfCurrentAds = showSearchedAds.slice(0, 20).map(numOfAdsDisplay).length;
			}
		}else

		if((searchQuery.toLowerCase().search(/page-\d/) === -1 && pageQuery === undefined)){
			for(let i = 0, len = result.length; i < len; i++){	 

				let { Text_Book_Title } = result[i];

				let textBookTileMatcher = (not) => {
					not.Text_Book_Title;
					return not.Text_Book_Title.toLowerCase().search(searchQuery.toLowerCase()) !== -1;
				}

				 if(Boolean(result.find(textBookTileMatcher)) === true){ 
					if(result[i].Text_Book_Title.toLowerCase().search(searchQuery.toLowerCase()) !== -1){ 
						num++;
						showSearchedAds.push(result[i]);
						isTrue = true;
						
						totalAmountOfAds = showSearchedAds.length;
						notFound = false;
					} 
					} else { 
						notFound = true 
						break; 
				 } 
			}

			if(isTrue){
				numOfCurrentAds = showSearchedAds.slice(0, 20).map(numOfAdsDisplay).length;
			}
		} else if(searchQuery.toLowerCase().search(/page-\d/) === -1 && pageQuery.toLowerCase().search(/page-\d/) !== -1  && req.url.search("/category/") !== -1){
			for(let i = 0, len = result.length; i < len; i++){

				let { Sub_Category, Campus } = result[i];

				let textBookTileMatcher = (not) => {
					not.Sub_Category;
					return not.Sub_Category.toLowerCase().search(searchQuery.toLowerCase()) !== -1 || not.Campus.toLowerCase().search(searchQuery.toLowerCase()) !== -1;
				}

				 if(Boolean(result.find(textBookTileMatcher)) === true){ 
					if(result[i].Sub_Category.toLowerCase().search(searchQuery.toLowerCase()) !== -1 || result[i].Campus.toLowerCase().search(searchQuery.toLowerCase()) !== -1){ 
						showSearchedAds.push(result[i]);
						isTrue = true;
						
						notFound = false;
					} 
					} else { 
						notFound = true 
						break; 
				 } 
			}

			if(isTrue){
				
				numOfCurrentAds = showSearchedAds.slice(0, 20).map(numOfAdsDisplay).length;

				for(let i = 0; i < showSearchedAds.length; i+= 20){
					num++
					if(parseInt(urlPageNum) === num){
						startingNum += i;
						numOfCurrentAds += i;
					}
				}
				
				totalAmountOfAds = showSearchedAds.length;
						
				if(numOfCurrentAds > totalAmountOfAds){
					numOfCurrentAds = totalAmountOfAds;
				}
			}
			
		}else
		
		if((searchQuery.toLowerCase().search(/page-\d/) === -1 && pageQuery.toLowerCase().search(/page-\d/) !== -1)){
			for(let i = 0, len = result.length; i < len; i++){	 

				let { Text_Book_Title } = result[i];

				let textBookTileMatcher = (not) => {
					not.Text_Book_Title;
					return not.Text_Book_Title.toLowerCase().search(searchQuery.toLowerCase()) !== -1;
				}

				 if(Boolean(result.find(textBookTileMatcher)) === true){ 
					if(result[i].Text_Book_Title.toLowerCase().search(searchQuery.toLowerCase()) !== -1){ 
						showSearchedAds.push(result[i]);
						isTrue = true;
						
						notFound = false;
					} 
					} else { 
						notFound = true 
						break; 
				 } 
			}

			if(isTrue){
				numOfCurrentAds = showSearchedAds.slice(0, 20).map(numOfAdsDisplay).length;

				for(let i = 0; i < showSearchedAds.length; i+= 20){
					num++
					if(parseInt(urlPageNum) === num){
						startingNum += i;
						numOfCurrentAds += i;
					}
				}
				
				totalAmountOfAds = showSearchedAds.length;
						
				if(numOfCurrentAds > totalAmountOfAds){
					numOfCurrentAds = totalAmountOfAds;
				}
			}
		}
		
		//Word capitalizer
		let stringCapitalizer = (Campus) => {

			let arrStr = Campus.split(" "); 
			let campusArr = []; 

			arrStr.map((tring) => {
				tring = tring.replace("anyy", "any");
				tring = tring.replace(tring[0], tring[0].toUpperCase());
				campusArr.push(tring);
			}); 
			
			return campusArr.toString().replace(/,/g , " ");
		}

		result.reverse();
		Category_and_campus_col.find().then((cat_camp_list) =>{
			res.status(200).render('BookAd', {
			urlPageNum,
			categoryLister,
			cat_camp_list,
			result, 
			numOfCurrentAds, 
			req, 
			notFound, 
			totalAmountOfAds, 
			stringCapitalizer, 
			startingNum, 
			pageQuery, 
			searchQuery, 
			sortPrices, 
			lowToHighPrices, 
			highToLowPrices,
			dateDisplayer,
			noAdsAvailable,
			contactNumFormat,
			Category_and_campus_col
		});
		}).catch((err) => {
			console.log(err);
		})
	}).catch((err) => {
		console.log(err);
	});
}

module.exports = { displayAds };