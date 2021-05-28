let file_renamer = (files, dirname, fs) => {
	var imagesNotUploaded = [];
	
	let rename_Files = (oldPath, newPath) => {

		fs.readFile(oldPath, function (err, data) {
			if (err) throw err;
			console.log('File read!');

			// Write the file
			fs.writeFile(newPath, data, function (err) {
				if (err) throw err;
			});

			// Delete the file
			fs.unlink(oldPath, function (err) {
				if (err) throw err;
			});
		});

	}

	if(files.uploaded.length === undefined){
		let oldPath = files.uploaded.path;
		let newPath;
		if(dirname === '/app'){
			newPath = dirname + '/imageUploads/' + files.uploaded.name;
		}else{
			newPath = dirname + '\\imageUploads\\' + files.uploaded.name;
		}
		
		rename_Files(oldPath, newPath);

		imagesNotUploaded.push(newPath);

	}else if(files.uploaded.length >= 1){
		for(let i = 0; i < files.uploaded.length; i++){
			let oldPath = files.uploaded[i].path;
			let newPath;
			if(dirname === '/app'){
				newPath = dirname + '/imageUploads/' + files.uploaded[i].name;
			}else{
				newPath = dirname + '\\imageUploads\\' + files.uploaded[i].name;
			}

			rename_Files(oldPath, newPath);

			imagesNotUploaded.push(newPath);

		}
	}

	return imagesNotUploaded;
}

module.exports = {
	file_renamer
}