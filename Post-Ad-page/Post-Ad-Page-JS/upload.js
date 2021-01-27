let upload = document.getElementById("upl");
let fileDiv = document.getElementById("pic");
let divTitle = document.getElementById("box-title");
let add = [];

function uploadValidator(){
	if(add.length === 0){
		
	setTimeout(
		() => {
			alert('Please upload atleast 1 image');
			return false;
		},380);
	}
}

upload.onchange = function(){
		uploader();
}

function uploader(){
    let fileList = upload.files;
    let file;
	
	 if(fileList.length + fileDiv.children.length > 11){
       return alert('Only a maximun of 10 files allowed');
     } 
	
    for (let i = 0; i < fileList.length; i++) {
        file = fileList[i];
        let fileName = file.name;
		let fileSize = file.size;
		let fileType = file.type;
		let editName = fileName.indexOf(".");
		let edited = fileName.slice(0,editName);
		let editType = fileType.indexOf("/");
		let editedType = fileType.slice(editType);
		let replaceType = editedType.replace("/", "");
		let fileObject = {
				imageName: `${edited}`,
				imageSize: byteConverter(fileSize),
				imageType: `${replaceType}`
			};
		console.log(fileObject);
		let img_div = document.createElement("div");
        img_div.id = "load-img";
        let img = document.createElement("img");
        let url = URL.createObjectURL(file);
        img.setAttribute("src", url);
        img.setAttribute("width", "200");
		img.setAttribute("height", "130");
        img.className = "visual";
        img_div.innerHTML =  `${fileName}&nbsp <br>`;
        let span = document.createElement("i");
        span.className = "shut fa";
		span.className += " fa-trash";
		let checkBoxDiv = document.createElement("div");
		checkBoxDiv.className = 'checkBox-cont';
		let imgCheckBox = document.createElement("input");
		imgCheckBox.setAttribute("type", "checkbox");
		imgCheckBox.setAttribute("class", "main-img");
		imgCheckBox.setAttribute("name", "mainImageSelector");
		imgCheckBox.setAttribute("id", "whatsapp-enabler");
		checkBoxDiv.innerHTML = '<span class="mainImg-text">Main image</span>';
		checkBoxDiv.appendChild(imgCheckBox);
        img_div.appendChild(img);
        img_div.appendChild(span);
        img_div.appendChild(checkBoxDiv);
        imgType = ["image/png", "image/jpg", "image/jpeg"];	
		
	 if(fileType != imgType[0] && fileType != imgType[1] && fileType != imgType[2]){
		alert("Sorry only JPEG,PNG & JPG is supported");
		return false;
		
	} else if(fileSize > 5000000){
		alert("Files should not exceed the Maximum file size of 5MB");
		return false;
		
	}else{
		 divTitle.style.display = "none";
         fileDiv.appendChild(img_div);
		 file_List = add.push(fileObject);
		 console.log(add);
	  }
    }
    return imgRemover();
}

let imgRemover = function() {
    let visual = document.getElementsByClassName("visual");
    let shut = document.getElementsByClassName("shut");
    let mainImgSelector = document.getElementsByClassName("checkBox-cont");
	
    for (let i = 0; i < visual.length; i++) {
        visual[i].onmouseover = function() {
            let childTwo = this.parentNode.children[2];
			let childThree = this.parentNode.children[3];
			childTwo.style.opacity = "1";
			childThree.style.opacity = "1";
            this.style.cssText = "opacity: 1; box-shadow:0px 0px 7px rgba(0,0,0,0.5)";
        }

        visual[i].onmouseout = function() {
            let childTwo = this.parentNode.children[2];
			let childThree = this.parentNode.children[3];
			childTwo.style.opacity = "0";
			childThree.style.opacity = "0";
            this.style.cssText = "opacity: 0.6; box-shadow:0px 0px 0px rgba(0,0,0,0.5)";
        }
    }

    for (let i = 0; i < shut.length; i++) {
        shut[i].onmouseover = function() {
            let childOne = this.parentNode.children[1];
			let childThree = this.parentNode.children[3];
			this.style.opacity = "1";
			childThree.style.opacity = "1";
            childOne.style.cssText = "opacity: 1; box-shadow: 0px 0px 7px rgba(0,0,0,0.5)";
        }

        shut[i].onmouseout = function() {
            let childOne = this.parentNode.children[1];
			let childThree = this.parentNode.children[3];
            this.style.opacity = "0";
            childThree.style.opacity = "0";
			childOne.style.cssText = "opacity: 0.6; box-shadow: 0px 0px 0px rgba(0,0,0,0.5)";
        }

        shut[i].onclick = function() {
            let closeDiv = this.parentElement;
				closeDiv.remove();
				add.pop();
				console.log(add);
				
			if(add.length == 0){
				divTitle.style.display = 'flex';
			}
        }
    }

	for (let i = 0; i < mainImgSelector.length; i++) {
        mainImgSelector[i].onmouseover = function() {
            let childOne = this.parentNode.children[1];
			let childTwo = this.parentNode.children[2];
			this.style.opacity = "1";
			childOne.style.cssText = "opacity: 1; box-shadow: 0px 0px 7px rgba(0,0,0,0.5)";
            childTwo.style.opacity = "1";
        }

        mainImgSelector[i].onmouseout = function() {
            let childOne = this.parentNode.children[1];
			let childTwo = this.parentNode.children[2];
            this.style.opacity = "0";
			childOne.style.cssText = "opacity: 0.6; box-shadow: 0px 0px 0px rgba(0,0,0,0.5)";
            childTwo.style.opacity = "0";
        }
    }
	
	let checkBox = document.getElementsByClassName('main-img');

	for(i = 0; i < checkBox.length; i++){ 
	  checkBox[i].onclick = function(){
		  for(j = 0; j < checkBox.length; j++){
			  
		  if(this.checked){
		  checkBox[j].checked = false;
		  this.checked = true; 
			
		  }else if(this.checked === false){
		  this.checked = false;	
		  }
		}
	  }
	}
}

function byteConverter(number){
	if(number < 1024){
		return number + " Bytes";
		
	}else if(number >= 1024 && number < 1048576){
		return (number/1024).toFixed(2) + " KB";
		
	}else{
		return (number/(1024*1024)).toFixed(2) + " MB";
	}
}

fileDiv.ondragover = function(){
	imgDragger(event);
}

function imgDragger(action){
	action.preventDefault();
}

fileDiv.ondrop = function(){
	imgDropper(event);
}

function imgDropper(action){
	action.preventDefault();
	let data = event.dataTransfer.items;
	if(data.length + fileDiv.children.length > 11){
       upload.value = "";
       return alert('Only a maximun of 10 files allowed');
     } 
	for(let i = 0; i < data.length; i++){
		let showFiles = data[i].getAsFile();
		let fileSize = showFiles.size;
		let fileType = showFiles.type;
		let fileName = showFiles.name;
		let editName = fileName.indexOf(".");
		let edited = fileName.slice(0,editName);
		let editType = fileType.indexOf("/");
		let editedType = fileType.slice(editType);
		let replaceType = editedType.replace("/", "");
		let fileObject = {imageName: `${edited}`, imageSize: byteConverter(fileSize), imageType: `${replaceType}`};
		let img_div = document.createElement("div");
        img_div.id = "load-img";
        let img = document.createElement("img");
        let url = URL.createObjectURL(showFiles);
        img.setAttribute("src", url);
        img.setAttribute("width", "200");
		img.setAttribute("height", "130");
        img.className = "visual";
		img_div.innerHTML = `${fileName}&nbsp <br>`;
        let span = document.createElement("i");
        span.className = "shut fa";
		span.classList.add("fa-trash");
		let checkBoxDiv = document.createElement("div");
		checkBoxDiv.className = 'checkBox-cont';
		let imgCheckBox = document.createElement("input");
		imgCheckBox.setAttribute("type", "checkbox");
		imgCheckBox.setAttribute("class", "main-img");
		imgCheckBox.setAttribute("name", "mainImageSelector");
		imgCheckBox.setAttribute("id", "whatsapp-enabler");
		checkBoxDiv.innerHTML = '<span class="mainImg-text">Main image</span>';
		checkBoxDiv.appendChild(imgCheckBox);
        img_div.appendChild(img);
        img_div.appendChild(span);
		img_div.appendChild(checkBoxDiv);
		imgType = ["image/png", "image/jpg", "image/jpeg"];	
		
	 if(fileType != imgType[0] && fileType != imgType[1] && fileType != imgType[2]){
		alert("Sorry only JPEG,PNG & JPG is supported");
		return false;
		
	} else if(fileSize > 5000000){
		alert("One of the images or all of them exceed the maximum size of 5MB");
		return false;
		
	}else{
		 divTitle.style.display = "none";
         fileDiv.appendChild(img_div);
		 file_List = add.push(fileObject);
		 console.log(add);
	  }
	}
	return imgRemover();
}
