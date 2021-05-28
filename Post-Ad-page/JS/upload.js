let upload = document.getElementById("upl");
let fileDiv = document.getElementById("pic");
let divTitle = document.getElementById("box-title");
let errMsg = document.getElementById('red');

//Creates access to fileObject for adding, editing, and removing files.
const dt = new ClipboardEvent('').clipboardData || new DataTransfer();

//Alert message for errors sent from the backend
function alerter(msg){
	setTimeout(
		() => {
			alert(msg);
		},
	350);

	return false;
}

//Alert message for to inform user to upload atleast 1 image if they don't.
function uploadValidator(){
	if(upload.value === ""){

		setTimeout(
			() => {
				alert('Please upload atleast 1 image');
			},
		350);

		return false;
	}
}

//Condition for Replacing error message from backend with alert box.
if(errMsg !== null){
	if(errMsg.innerHTML.trim() === 'Please upload atleast 1 image') {
		errMsg.classList.remove('red');
		errMsg.style.fontSize = '1rem';
		errMsg.innerHTML = 'Add up to 10 images';
		alerter('Please upload atleast 1 image');

	}else if(errMsg.innerHTML.trim() === 'Sorry only JPEG,PNG & JPG is supported') {
		errMsg.classList.remove('red');
		errMsg.style.fontSize = '1rem';
		errMsg.innerHTML = 'Add up to 10 images';
		alerter("Sorry only JPEG,PNG & JPG is supported");

	}else if(errMsg.innerHTML.trim() === 'Files should not exceed the Maximum file size of 5MB') {
		errMsg.classList.remove('red');
		errMsg.style.fontSize = '1rem';
		errMsg.innerHTML = 'Add up to 10 images';
		alerter("Files should not exceed the Maximum file size of 5MB");
	}else if(errMsg.innerHTML.trim() === 'Only a maximun of 10 files allowed') {
		errMsg.classList.remove('red');
		errMsg.style.fontSize = '1rem';
		errMsg.innerHTML = 'Add up to 10 images';
		alerter("Only a maximun of 10 files allowed");
	}
}

//Onchange functionality for uploading images
upload.onchange = () => {

	if(uploader(upload.files, 'action') === false){
		return false;
	}
}

//Functionality for uploading images via clicking upload btn
function uploader(uploadFiles, action){
	action;
    let fileList = uploadFiles;
    let file;

	if(fileList.length + fileDiv.children.length > 11){
	   alert('Only a maximun of 10 files allowed');
	   inputDtFileEqualizer();
	   return false;
	} 

    for (let i = 0; i < fileList.length; i++) {
        file = fileList[i];
        let fileName = file.name;
		let fileSize = file.size;
		let fileType = file.type;
		let img_div = document.createElement("div");
        img_div.id = "load-img";
        let img = document.createElement("img");
        let url = URL.createObjectURL(file);
        img.setAttribute("src", url);
        img.setAttribute("width", "200");
		img.setAttribute("height", "130");
        img.className = "visual";
		img.id = `${ fileName }`;
        let span = document.createElement("i");
        span.className = "shut fa";
		span.className += " fa-trash";
		let checkBoxDiv = document.createElement("div");
		checkBoxDiv.className = 'checkBox-cont';
		let imgCheckBox = document.createElement("input");
		imgCheckBox.setAttribute("type", "checkbox");
		imgCheckBox.setAttribute("class", "main-img");
		imgCheckBox.setAttribute("name", `First_image-${ fileName }`);
		imgCheckBox.setAttribute("id", "whatsapp-enabler");
		checkBoxDiv.innerHTML = '<span class="mainImg-text">Main image</span>';
		checkBoxDiv.appendChild(imgCheckBox);
        img_div.appendChild(img);
        img_div.appendChild(span);
        img_div.appendChild(checkBoxDiv);
        imgType = ["image/png", "image/jpg", "image/jpeg"];	
		
		if(fileType != imgType[0] && fileType != imgType[1] && fileType != imgType[2]){
			alert("Sorry only JPEG,PNG & JPG is supported");
			upload.files = dt.files;
			return false;

		} else if(fileSize > 5000000){
			alert("Files should not exceed the Maximum file size of 5MB");
			upload.files = dt.files;
			return false;

		}else{
			divTitle.style.display = "none";
			fileDiv.appendChild(img_div);
			dt.items.add(file);
			upload.files = dt.files;
			console.log(dt.files);
		  }
		}
		return imgRemover();
}

// Functionality to remove deleted images from fileList Object.
function removeFileFromFileList(closeDiv) {
  const input = upload;
  const { files } = input;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.name === closeDiv.children[0].id) {
		dt.items.remove(i);
		input.files = dt.files;
	}
  }
}

// Functionality keeping files in fileList Object rather then havig them removed if user tries to upload over the upload limit.
function inputDtFileEqualizer() {
  const input = upload;
  const { files } = input;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
	input.files = dt.files;
  }
}

//Functionality for deleting image.
let imgRemover = () => {
    let visual = document.getElementsByClassName("visual");
    let shut = document.getElementsByClassName("shut");

    for (let i = 0; i < shut.length; i++) {

        shut[i].onclick = function() {
            let closeDiv = this.parentElement;

			closeDiv.remove();

			removeFileFromFileList(closeDiv);

			if(upload.value === ""){
				upload.value = "";
				divTitle.style.display = 'flex';
			}

			console.log(upload.files);
        }
    }

	let checkBox = document.getElementsByClassName('main-img');

	for(i = 0; i < checkBox.length; i++){ 
	  checkBox[i].onclick = function(){
		  for(j = 0; j < checkBox.length; j++){
			  
		  if(this.checked){
			checkBox[j].checked = false;
			this.checked = true; 
			
		  }
		}
	  }
	}
}

//Functionality for draging image to upload box
fileDiv.ondragover = () => {
	imgDragger(event);
}

function imgDragger(action){
	action.preventDefault();
}

//Functionality for uploading images via clicking drag and drop
fileDiv.ondrop = () => {
	if(uploader(event.dataTransfer.files, event.preventDefault()) === false){
		return false;
	}
	
	console.log(upload.files);
}

//Functionality for turning image src's from backend into blob urls.
(function(){

	let UsersImgs = document.getElementsByClassName('visual');
	
	for(let i = 0; i < UsersImgs.length; i++){

		let imgUrl = UsersImgs[i].src;

		let imgName = UsersImgs[i].id;

		if(imgUrl.search('/imageUploads/') !== -1){
			fetch(imgUrl).then(async (response) => {

				const contentType = response.headers.get('content-type');
				const blobCoversion = await response.blob();
				UsersImgs[i].src = URL.createObjectURL(blobCoversion);
				const fileObjectCoversion = new File([blobCoversion], imgName, { type: contentType });
				dt.items.add(fileObjectCoversion);
				upload.files = dt.files;
				console.log(blobCoversion);
				console.log(upload.files);

			});
		}
	}

	imgRemover();
})();