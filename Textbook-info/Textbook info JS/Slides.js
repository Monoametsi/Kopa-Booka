var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n){
	showSlides(slideIndex += n);
	console.log(n);
}

function currentSlide(n){
	showSlides(slideIndex = n);
}

function showSlides(n){
	var i;
	var x = document.getElementsByClassName("slides");
	var dots = document.getElementsByClassName("demo"); 
	var caption = document.getElementById("caption");
	
	if(n > x.length){
		slideIndex = 1;
	}
	
	if(n < 1){
		slideIndex = x.length;
	}
	
	for(i = 0; i < x.length; i++){
		x[i].style.display = "none";
	}
	
	for(i = 0; i < dots.length; i++){
		dots[i].className = dots[i].className.replace("active", "");
	}
	
	x[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";
	caption.innerHTML = dots[slideIndex - 1].alt;	
}
