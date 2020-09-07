let modal = document.getElementById("myModal");
let shut = document.getElementsByClassName("close");

function showModal(){
	modal.style.display = "flex";
}

for(i = 0; i < shut.length; i++){
	shut[i].onclick = function (){
	modal.style.display = "none";
	}
}

window.onclick = function (event){
	if(event.target == modal){
		modal.style.display = "none";
	}
}

let slidePos = 1;
showSlider(slidePos);

function moveSlide(n){
	showSlider(slidePos += n);
}

function presentSlide(n){
	showSlider(slidePos = n);
}

function showSlider(n){
	let i;
	let cap = document.getElementById("cap");
	let bookName = document.getElementsByClassName("name");
	let slide = document.getElementsByClassName("mySlides");
	
	if(n > slide.length){
		slidePos = 1;
	}
	
	if(n < 1){
		slidePos = slide.length;
	}
	
	for(i = 0; i < slide.length; i++){
		slide[i].style.display = "none";
	}
	
	slide[slidePos - 1].style.display = "block";
	cap.innerHTML = bookName[slidePos - 1].alt;
}