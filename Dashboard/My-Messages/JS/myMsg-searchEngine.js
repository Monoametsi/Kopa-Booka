let table = document.getElementById('table');

for(let i = 0; i < table.rows.length; i++){
	table.rows[i].onclick = function(){
		console.log(this.cells[2].innerHTML.trim());
	}
}