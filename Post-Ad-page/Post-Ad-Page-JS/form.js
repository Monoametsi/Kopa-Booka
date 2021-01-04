	let main_cat = document.getElementById("catChoices");
    let sub_cat = document.getElementById("subCatChoices");
    
	main_cat.onchange = function(){
		dynamicLister(main_cat,catChoicesErr);
	}
	
    function dynamicLister(name,nameErr){
		sub_cat.innerHTML = '<option value="please select">Please Select</option>';
    	switch(main_cat.value){
            case 'Art Design and Architecture':
			nameErr.style.display = 'none';
			name.style.border = '1px solid #9acdff';
            return categorizer('Art Design and Architecture',arts);
            break;
			
            case 'College of Business and Economics':
			nameErr.style.display = 'none';
			name.style.border = '1px solid #9acdff';
            return categorizer('College of Business and Economics',business);
            break;
			
            case 'Education':
			nameErr.style.display = 'none';
			name.style.border = '1px solid #9acdff';
            return categorizer('Education',education);
            break;
			
            case 'Engineering and Built Environment':
			nameErr.style.display = 'none';
			name.style.border = '1px solid #9acdff';
			return categorizer('Engineering and Built Environment',engineering);
			break;
			
			case 'Health Sciences':
			nameErr.style.display = 'none';
			name.style.border = '1px solid #9acdff';
			return categorizer('Health Sciences',healthScience);
			break;
			
			case 'Humanities':
			nameErr.style.display = 'none';
			name.style.border = '1px solid #9acdff';
			return categorizer('Humanities',humanities);
			break;
			
			case 'Law':
			nameErr.style.display = 'none';
			name.style.border = '1px solid #9acdff';
			return categorizer('Law',law);
			break;
			
			case 'Science':
			nameErr.style.display = 'none';
			name.style.border = '1px solid #9acdff';
			return categorizer('Science',science);
        }
    }
	
    faculty = {
      'Art Design and Architecture':[
        'Architecture', 
        'Fashion',
        'Graphic Design',
        'Industrial Design',
        'Interior Design',
        'Jewel Design & Manufacture',
        'Multimedia',
        'Visual Art'
        ],
      'College of Business and Economics':[
        'Applied Information Systems',
        'Accountancy',
        'Business Management',
        'Finance & Investment Management',
        'Industrial Psychology & People Management',
        'Information & Knowledge Management',
        'Marketing Management',
        'Transport & Supply Chain Management',
        'Economics',
		'Public Management', 
        'Governance & Public Policy',
        'Tourism & Hospitality'
        ],
      Education:[
        'Childhood Education',
        'Education & Curriculum Studies',
        'Education Leadership & Management',
        'Educational Psychology',
        'Science & Technology Education',
      ],
      'Engineering and Built Environment':[
        'Chemical Engineering Technology',
        'Civil Engineering',
        'Construction Management & Quantity Survey',
        'Electric Engineering',
        'Mechanical Engineering',
        'Metallurgy',
        'Mine Surveying',
        'Mining',
        'Quality & Operation Management',
        'Town & Regional Planning'
		],
      'Health Sciences':[
        'Biomedical Technology',
        'Chiropractic',
        'Emergency Medical Care',
        'Environmental Health',
        'Homoeopathy',
        'Human Anatomy & Physiology',
        'Nursing',
        'Optometry',
        'Podiatry',
        'Radiography',
        'Somatology',
        'Sport & Movement Studies'
		],
      Humanities:[
        'African Languages',
        'Afrikaans',
        'Anthropology & Development Studies',
        'Communication Studies',
        'English',
        'French',
        'Greek & Latin Studies',
        'Historical Studies',
        'Journalism, Film & Television',
        'Linguistics',
        'Philosophy',
        'Politics & International Relation',
        'Religion Studies',
        'Social Work',
        'Sociology',
        'Strategic Communication'
        ],
      Law:[
        'Mercantile Law',
        'Private Law',
        'Public Law'
        ],
      Science:[
        'Computer Science',
        'Applied Physics & Engineering Mathematics',
        'Biochemistry',
        'Biotechnology & Food Technology',
        'Botany & Plant Biotechnology',
        'Chemistry',
        'Geography,Environmental Management',
        'Geology',
        'Physics',
        'Applied Mathematics',
        'Statistics',
        'Zoology'
        ]
    }
    
    let arts = faculty['Art Design and Architecture'];
    let business = faculty['College of Business and Economics'];
    let education = faculty.Education;
    let engineering = faculty['Engineering and Built Environment'];
    let	healthScience = faculty['Health Sciences'];
    let humanities = faculty.Humanities;
    let law = faculty.Law;
    let science = faculty.Science;
	
	function categorizer(mainCat,subCat){
		if(main_cat.value == mainCat){
			for(let i = 0; i <	subCat.length; i++)
	    {
			let selec = document.createElement("option");
			selec.setAttribute('value', subCat[i].toLowerCase());
			let tex = document.createTextNode(subCat[i]);
		    selec.appendChild(tex);
			sub_cat.appendChild(selec);
	    }
	  }
	}
	
	
	//Select list validation
	function selectListValidator(name,errorMessage){
		let nameVal = name.value;
		let nameErr = errorMessage;
		
		if(nameVal == 'please select' || nameVal == 'select condition' || nameVal == 'select campus'){
			errorMessage.style.display = 'flex';
			name.classList.add('redBox');
			errorMessage.innerText = 'Required';
			return false;
			
		}else {
			errorMessage.style.display = 'none';
			name.classList.remove('redBox');
		}
	}
	
	//Advertisers name validation
	let advertCreator = document.getElementById('AdvertCreator');
	let	advertCreatorErr = document.getElementById('AdvertCreator-Err');
	
	advertCreator.oninput = function (){
			advertCreatorValidator();
	}
	
	function advertCreatorValidator(){
		titleValidator(advertCreator,advertCreatorErr);
	}
	
	function titleValidator(name,errorMessage){	
	
		if(name.value === ''){
			errorMessage.style.display = 'flex';
			name.classList.add('redBox');
			errorMessage.innerText = 'Required';
			return false;
			
		}else{
			errorMessage.style.display = 'none';
			name.classList.remove('redBox');;	
		}
	}
	
	//Email address validation
	let email = document.getElementById('emaill');
	
	email.oninput =	function (){
		emailValidator();
	}
	
	function emailValidator(){
		let emailVal = email.value;
		let threeDot = /^\w+([\.\-\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~]?\w+)*@[a-zA-Z0-9]+([-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,15}\.[a-zA-Z]{2}\.[a-zA-Z]{2}$/;
		let oneDot = /^\w+([\.\-\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~]?\w+)*@[a-zA-Z0-9]+([-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,15}$/;
		let twoDot = /^\w+([\.\-\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~]?\w+)*@[a-zA-Z0-9]+([-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2}\.[a-zA-Z]{2}$/;
		let threeDotFormat = threeDot.test(emailVal);
		let oneDotFormat = oneDot.test(emailVal);
		let twoDotFormat = twoDot.test(emailVal);
		let emailFormats = threeDotFormat || twoDotFormat || oneDotFormat;
		let mailErr = document.getElementById('mailErr');
		
		if(emailVal === ''){
			mailErr.style.display = 'flex';
			mailErr.innerText = 'Required';
			email.classList.add('redBox');
			return false;
			
		}else if(emailFormats){
			mailErr.style.display = 'none';
			email.classList.remove('redBox');
			
		}else{
			mailErr.style.display = 'flex';
			mailErr.innerText = 'Invalid email';
			email.classList.add('redBox');
			return false;
			}
	}
	
	//Contact Number validation
	let contactNum = document.getElementById('contactNum');
	
	contactNum.oninput = function(){
		contactNumValidator();
	}
	
	function contactNumValidator(){
	  let contactNumErr = document.getElementById('contactNum-Err');
	  let contactNumVal = contactNum.value;
	  
	  let zeroSixZeroFormat = /^[0]{1}[6]{1}[0]{1}[3-9]{1}[0-9]{6}$/;
	  let zeroSixOneFormat = /^[0]{1}[6]{1}[1]{1}[0-9]{1}[0-9]{6}$/;
	  let zeroSixTwoFormat = /^[0]{1}[6]{1}[2]{1}[0-9]{1}[0-9]{6}$/;
	  let zeroSixThreeFormat = /^[0]{1}[6]{1}[3]{1}[0-7]{1}[0-9]{6}$/;
	  let zeroSixFourFormat = /^[0]{1}[6]{1}[4]{1}[0-9]{1}[0-9]{6}$/;
	  let zeroSixFiveFormat = /^[0]{1}[6]{1}[5]{1}[0-9]{1}[0-9]{6}$/;
	  let zeroSixSixFormat = /^[0]{1}[6]{1}[6]{1}[0-5]{1}[0-9]{6}$/;
	  let zeroSixSevenFormat = /^[0]{1}[6]{1}[7]{1}[0-9]{1}[0-9]{6}$/;
	  let zeroSixEightFormat = /^[0]{1}[6]{1}[8]{1}[0-5]{1}[0-9]{6}$/;
	  let zeroSevenFormat = /^[0]{1}[7]{1}[1-34-68-9]{1}[0-9]{7}$/;
	  let zeroEightFormat = /^[0]{1}[8]{1}[1-4]{1}[0-9]{7}$/;
	  
	  let sixZeroFormatTest = zeroSixZeroFormat.test(contactNumVal);
	  let sixOneFormatTest = zeroSixOneFormat .test(contactNumVal);
	  let sixTwoFormatTest = zeroSixTwoFormat.test(contactNumVal);
	  let sixThreeFormatTest = zeroSixThreeFormat.test(contactNumVal);
	  let sixFourFormatTest = zeroSixFourFormat.test(contactNumVal);
	  let sixFiveFormatTest = zeroSixFiveFormat.test(contactNumVal);
	  let sixSixFormatTest = zeroSixSixFormat.test(contactNumVal);
	  let sixSevenFormatTest = zeroSixSevenFormat.test(contactNumVal);
	  let sixEightFormatTest = zeroSixEightFormat.test(contactNumVal);
	  let zeroSixFormatTest = sixZeroFormatTest || sixOneFormatTest|| sixTwoFormatTest || sixThreeFormatTest || sixFourFormatTest || sixFiveFormatTest || sixSixFormatTest || sixSevenFormatTest || sixEightFormatTest;
	  let sevenFormatTest = zeroSevenFormat.test(contactNumVal);
	  let eightFormatTest = zeroEightFormat.test(contactNumVal);
	  
	  let telZeroOne = /^[0]{1}[1]{1}[0-8]{1}[0-9]{7}$/;
	  let telZeroTwo  = /^[0]{1}[2]{1}[1-37-8]{1}[0-9]{7}$/;
	  let telZeroThree  = /^[0]{1}[3]{1}[1-69]{1}[0-9]{7}$/;
	  let telZeroFour  = /^[0]{1}[4]{1}[0-9]{1}[0-9]{7}$/;
	  let telZeroFive  = /^[0]{1}[5]{1}[1-46-8]{1}[0-9]{7}$/;
	  let telZeroOneTest = telZeroOne.test(contactNumVal);
	  let telZeroTwoTest = telZeroTwo.test(contactNumVal);
	  let telZeroThreeTest = telZeroThree.test(contactNumVal);
	  let telZeroFourTest = telZeroFour.test(contactNumVal);
	  let telZeroFiveTest = telZeroFive.test(contactNumVal);
	  let telFormats = telZeroOneTest || telZeroTwoTest || telZeroThreeTest || telZeroFourTest || telZeroFiveTest;
  
	  if(zeroSixFormatTest){  
		contactNumErr.style.display = 'none';
		contactNum.classList.remove('redBox');
		
	  }else if(sevenFormatTest){
		contactNumErr.style.display = 'none';
		contactNum.classList.remove('redBox');
		
	  }else if(eightFormatTest){
		contactNumErr.style.display = 'none';
		contactNum.classList.remove('redBox');
		
	  }else if(telFormats){
		contactNumErr.style.display = 'none';
		contactNum.classList.remove('redBox');
		
	  }else if(contactNumVal === ''){
		contactNumErr.style.display = 'flex';
		contactNum.classList.add('redBox');
		contactNumErr.innerText = 'Required';
		return false;
		
	  }else{
		contactNumErr.style.display = 'flex';
		contactNum.classList.add('redBox');
		contactNumErr.innerText = 'Invalid';
		return false;
	  }
	}
	
	//Whatsapp number validation
	let whatsappNum = document.getElementById('watsappNum');
	
	whatsappNum.oninput = function(){
		whatSappNumValidator();
	}
	
	//Whatsapp checkbox validation
	function whatSappCheckBoxValidator(){
		let whatsappNumErr = document.getElementById('watsappNum-Err');
		let whatsappEnabler = document.getElementById('whatsapp-enabler');
		let whatsappEnabled = whatsappEnabler.checked;
		
		if(whatsappEnabled === true){
			whatSappNumValidator();
			
		}else{
			whatsappNumErr.style.display = 'none';
			whatsappNum.classList.remove('redBox');
		}
	}
	
	function whatSappNumValidator(){
	  let whatsappNumErr = document.getElementById('watsappNum-Err');
	  let whatsappEnabler = document.getElementById('whatsapp-enabler');
	  let whatsappEnabled = whatsappEnabler.checked;
	  let whatsappNumVal = whatsappNum.value;
	  
	  let zeroSixZeroFormat = /^[0]{1}[6]{1}[0]{1}[3-9]{1}[0-9]{6}$/;
	  let zeroSixOneFormat = /^[0]{1}[6]{1}[1]{1}[0-9]{1}[0-9]{6}$/;
	  let zeroSixTwoFormat = /^[0]{1}[6]{1}[2]{1}[0-9]{1}[0-9]{6}$/;
	  let zeroSixThreeFormat = /^[0]{1}[6]{1}[3]{1}[0-7]{1}[0-9]{6}$/;
	  let zeroSixFourFormat = /^[0]{1}[6]{1}[4]{1}[0-9]{1}[0-9]{6}$/;
	  let zeroSixFiveFormat = /^[0]{1}[6]{1}[5]{1}[0-9]{1}[0-9]{6}$/;
	  let zeroSixSixFormat = /^[0]{1}[6]{1}[6]{1}[0-5]{1}[0-9]{6}$/;
	  let zeroSixSevenFormat = /^[0]{1}[6]{1}[7]{1}[0-9]{1}[0-9]{6}$/;
	  let zeroSixEightFormat = /^[0]{1}[6]{1}[8]{1}[0-5]{1}[0-9]{6}$/;
	  let zeroSevenFormat = /^[0]{1}[7]{1}[1-34-68-9]{1}[0-9]{7}$/;
	  let zeroEightFormat = /^[0]{1}[8]{1}[1-4]{1}[0-9]{7}$/;
	  
	  let sixZeroFormatTest = zeroSixZeroFormat.test(whatsappNumVal);
	  let sixOneFormatTest = zeroSixOneFormat .test(whatsappNumVal);
	  let sixTwoFormatTest = zeroSixTwoFormat.test(whatsappNumVal);
	  let sixThreeFormatTest = zeroSixThreeFormat.test(whatsappNumVal);
	  let sixFourFormatTest = zeroSixFourFormat.test(whatsappNumVal);
	  let sixFiveFormatTest = zeroSixFiveFormat.test(whatsappNumVal);
	  let sixSixFormatTest = zeroSixSixFormat.test(whatsappNumVal);
	  let sixSevenFormatTest = zeroSixSevenFormat.test(whatsappNumVal);
	  let sixEightFormatTest = zeroSixEightFormat.test(whatsappNumVal);
	  let zeroSixFormatTest = sixZeroFormatTest || sixOneFormatTest|| sixTwoFormatTest || sixThreeFormatTest || sixFourFormatTest || sixFiveFormatTest || sixSixFormatTest || sixSevenFormatTest || sixEightFormatTest;
	  
	  let sevenFormatTest = zeroSevenFormat.test(whatsappNumVal);
	  let eightFormatTest = zeroEightFormat.test(whatsappNumVal);

	  if(zeroSixFormatTest){  
		whatsappNumErr.style.display = 'none';
		whatsappNum.classList.remove('redBox');
		
	  }else if(sevenFormatTest){
		whatsappNumErr.style.display = 'none';
		whatsappNum.classList.remove('redBox');
		
	  }else if(eightFormatTest){
		whatsappNumErr.style.display = 'none';
		whatsappNum.classList.remove('redBox');
		
	  }else if(whatsappNumVal === '' && whatsappEnabled === false){
		whatsappNumErr.style.display = 'none';
		whatsappNum.classList.remove('redBox');
		
	  }else if(whatsappNumVal === '' && whatsappEnabled === true){
		whatsappNumErr.style.display = 'flex';
		whatsappNum.classList.add('redBox');
		whatsappNumErr.innerText = 'Required';
		return false;
		
	  }else{
		whatsappNumErr.style.display = 'flex';
		whatsappNum.classList.add('redBox');
		whatsappNumErr.innerText = 'Invalid';
		return false;
	  }
	}
	
	//Book title validation
	let bookTitle = document.getElementById('book-title');
	let	booktitleErr = document.getElementById('book-title-Err');
	
	bookTitle.oninput = function(){
		bookTitleValidator();
	}
	
	function bookTitleValidator(){
		titleValidator(bookTitle, booktitleErr);
	}
	
	//Edition Number validation
	let editionNum = document.getElementById('Edition-Num');
	let editionNumErr = document.getElementById('Edition-Num-Err');
	
	editionNum.oninput = function(){
		editionNumValidator();
	}
	
	function editionNumValidator(){
		editionAndPriceValidator(editionNum,editionNumErr);
	}
	
	//Authors Name validation
	let AuthorName = document.getElementById('Author-Name');
	let	AuthorNameErr = document.getElementById('Author-Name-Err');
	
	AuthorName.oninput = function(){
		AuthorNameValidator();
	}
	
	function AuthorNameValidator(){
		titleValidator(AuthorName, AuthorNameErr);
	}
	
	//Book Price validation
	let bookPrice = document.getElementById('book-price');
	let bookPriceErr = document.getElementById('book-price-Err');
	
	bookPrice.oninput = function(){
		bookPriceValidator();
	}
	
	function bookPriceValidator(){
		editionAndPriceValidator(bookPrice,bookPriceErr);
	}
	
	function editionAndPriceValidator(name,errorMessage){
		let nameVal = name.value;
		let nameErr = errorMessage;
		let findNonDigit = /\D/;
		
		if(nameVal === ''){
			nameErr.style.display = 'flex';
			name.classList.add('redBox');
			nameErr.innerText = 'Required';
			return false;
			
		}else if(nameVal.search(findNonDigit) === -1){
			nameErr.style.display = 'none';
			name.classList.remove('redBox');
			
		}else{
			nameErr.style.display = 'flex';
			name.classList.add('redBox')
			nameErr.innerText = 'Numbers only';
			return false;	
		}
	}
	
	//Book Description
	let bookDescription = document.getElementById('book-descrip');
	
	bookDescription.oninput = function(){
		bookDescriptionValidator();
	}
	
	function bookDescriptionValidator(){
		let bookDescriptionVal = document.getElementById('book-descrip').value;
	    let	bookDescriptionErr = document.getElementById('book-descrip-Err');
		
		if(bookDescriptionVal === ''){
			bookDescriptionErr.style.display = 'flex';
			bookDescription.classList.add('redBox')
			bookDescriptionErr.innerText = 'Required';
			return false;
			
		}else if(!(bookDescriptionVal.length >= 30) || !(bookDescriptionVal.length <= 1000)){
			bookDescriptionErr.style.display = 'flex';
			bookDescription.classList.add('redBox');
			bookDescriptionErr.innerText = 'Must be between 30 and 1000 characters';
			return false;
			
		}else{
			bookDescriptionErr.style.display = 'none';
			bookDescription.classList.remove('redBox');
		}
	}
	

	//Submit validation
	let catChoicesErr = document.getElementById('catChoices-Err');
	
	function listValidator(){
		let subCatChoicesErr = document.getElementById('subCatChoices-Err');
		
		let negotiableErr = document.getElementById('negotiable-Err');
		let negotiable = document.getElementById('negotiable');
		
		let bookconditionErr = document.getElementById('book-condition-Err');
		let bookcondition = document.getElementById('book-condition');
		
		let selectCampus = document.getElementById('select-campus');
		let selectCampusErr = document.getElementById('select-campus-Err');
		
		selectListValidator(main_cat,catChoicesErr);
		main_cat.onchange = function(){	
			if(selectListValidator(main_cat,catChoicesErr)){
				return selectListValidator(main_cat,catChoicesErr);
				
			}else{
				selectListValidator(sub_cat,subCatChoicesErr);
				dynamicLister(main_cat,catChoicesErr);
				
				function dynamicLister(name,nameErr){
					sub_cat.innerHTML = '<option value="please select">Please Select</option>';
					selectListValidator(sub_cat,subCatChoicesErr);
					switch(main_cat.value){
						case 'Art Design and Architecture':
						selectListValidator(sub_cat,subCatChoicesErr);
						nameErr.style.display = 'none';
						name.classList.remove('redBox');
						return categorizer('Art Design and Architecture',arts);
						break;
						
						case 'College of Business and Economics':
						selectListValidator(sub_cat,subCatChoicesErr);
						nameErr.style.display = 'none';
						name.classList.remove('redBox');
						return categorizer('College of Business and Economics',business);
						break;
						
						case 'Education':
						selectListValidator(sub_cat,subCatChoicesErr);
						nameErr.style.display = 'none';
						name.classList.remove('redBox');
						return categorizer('Education',education);
						break;
						
						case 'Engineering and Built Environment':
						selectListValidator(sub_cat,subCatChoicesErr);
						nameErr.style.display = 'none';
						name.classList.remove('redBox');
						return categorizer('Engineering and Built Environment',engineering);
						break;
						
						case 'Health Sciences':
						selectListValidator(sub_cat,subCatChoicesErr);
						nameErr.style.display = 'none';
						name.classList.remove('redBox');
						return categorizer('Health Sciences',healthScience);
						break;
						
						case 'Humanities':
						selectListValidator(sub_cat,subCatChoicesErr);
						nameErr.style.display = 'none';
						name.classList.remove('redBox');
						return categorizer('Humanities',humanities);
						break;
						
						case 'Law':
						selectListValidator(sub_cat,subCatChoicesErr);
						nameErr.style.display = 'none';
						name.classList.remove('redBox');
						return categorizer('Law',law);
						break;
						
						case 'Science':
						selectListValidator(sub_cat,subCatChoicesErr);
						nameErr.style.display = 'none';
						name.classList.remove('redBox');
						return categorizer('Science',science);
					}
				}
			  }
			}
		
		selectListValidator(sub_cat,subCatChoicesErr);		
		sub_cat.onchange = function(){
			selectListValidator(sub_cat,subCatChoicesErr);
			}
		
		selectListValidator(selectCampus,selectCampusErr);
		selectCampus.onchange = function(){
			selectListValidator(selectCampus,selectCampusErr);
			}
		
		selectListValidator(bookcondition,bookconditionErr);		
		bookcondition.onchange = function(){
			selectListValidator(bookcondition,bookconditionErr);
			}
		
		selectListValidator(negotiable,negotiableErr);
		negotiable.onchange = function(){
			selectListValidator(negotiable,negotiableErr);
			}
	}
	
	//Submit validation
	
	let submitBtn = document.getElementById('submit');
	
	submitBtn.onclick = function submitValidator(event){
		event.preventDefault();
		
		if(advertCreatorValidator()){
			return advertCreatorValidator();
			
		}else if(emailValidator()){
			return emailValidator();
			
		}else if(contactNumValidator()){
			return contactNumValidator();
			
		}else if(whatSappCheckBoxValidator()){
			return whatSappCheckBoxValidator();
			
		}else if(bookTitleValidator()){
			return bookTitleValidator();
			
		}else if(editionNumValidator()){
			return editionNumValidator();
			
		}else if(AuthorNameValidator()){
			return AuthorNameValidator();
			
		}else if(bookPriceValidator()){
			return bookPriceValidator();
			
		}else if(bookDescriptionValidator()){
			return bookDescriptionValidator();
			
		}else if(listValidator()){
			return listValidator();
			
		}else if(uploadValidator()){
			return uploadValidator();
		}
	}