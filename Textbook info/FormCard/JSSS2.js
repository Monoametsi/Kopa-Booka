//Examine Doc Object//
//console.dir(document);
//console.log(document.domain);
//console.log(document.URL);
//console.log(document.title);
document.title = "Personal info | Kopa Booka";
//console.log(document.title);
//console.log(document.doctype);
//console.log(document.head);
//console.log(document.body);
//console.log(document.all);
//console.log(document.all[9]);
//console.log(document.forms);
//console.log(document.images);
/*info_list.parentNode.style.backgroundColor = "#face";
console.log(info_list.parentElement.parentElement.parentElement);*/
var one = document.querySelectorAll(".right");
var mation = document.querySelectorAll(".info");
var two = document.getElementsByClassName("one")[0];
var btn = document.getElementsByClassName("but")[0];
var parentbut = document.getElementById("btn");
var newBut = document.createElement("input");
	newBut.setAttribute("type", "Submit");
	newBut.className = "but";
var len = mation.length;
	btn.addEventListener("click", but);

function but() {
	if (parentbut.children[0].innerText == "Update details"){
		 for (i = 0; i < len; i++) {
				console.log(mation[i].children[1].parentElement);
				var parent = mation[i].children[1].parentElement;
				var input = document.createElement("input");
				input.setAttribute("type", "text");
				input.value = mation[i].children[1].innerText;
				input.className = "Aight";
				parent.replaceChild(input, mation[i].children[1]);
		 }
		  btn.innerText = "Submit";
	}
	else if(parentbut.children[0].innerText == "Submit") {
		btn.innerText = "Update details";
		var put = document.querySelectorAll(".Aight");
        var putLen = put.length;
			for (i = 0; i < putLen; i++) {
                var info = document.createElement("b");
                info.className = "right";
                info.innerText = put[i].value;
                var parent = put[i].parentNode;
                parent.replaceChild(info, put[i]);
            }
		}
}	

function down(e){ 
	console.log(e.type);
}