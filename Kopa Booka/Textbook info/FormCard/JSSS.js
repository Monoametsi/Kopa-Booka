//console.dir(document);
//console.log(document.domain);
//console.log(document.URL);
//console.log(document.title);
//console.log(document.doctype);
//console.log(document.head);
//console.log(document.body);
//console.log(document.all);
//console.log(document.all[9]);
//console.log(document.forms);
//console.log(document.images);
var mation = document.querySelectorAll(".info");
var btn = document.getElementsByClassName("but")[0];
var len = mation.length;
	btn.addEventListener("click", but);

function but() {
	if (btn.innerText === "Update details"){
		 for (i = 0; i < len; i++) {
				var parent = mation[i];
				var input = document.createElement("input");
				input.setAttribute("type", "text");
				input.value = mation[i].children[1].innerText;
				input.className = "Aight";
				parent.replaceChild(input, mation[i].children[1]);
		 }
		  btn.innerText = "Submit";
	}
	else if(btn.innerText === "Submit") {
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