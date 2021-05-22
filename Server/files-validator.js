
let files_Validator = (files) => {
	let imgType = ["image/png", "image/jpg", "image/jpeg"];
	let fileType;
	let fileSize;

	if(files.uploaded.length === undefined){

		fileType = files.uploaded.type;
		fileSize = files.uploaded.size;

		console.log(`fileType: ${ fileType }\n fileSize: ${ fileSize }`);

		if(fileType != imgType[0] && fileType != imgType[1] && fileType != imgType[2]){
			return false;

		} else if(fileSize > 5000000){
			return false;

		}
	}else if(files.uploaded.length >= 1){
		console.log(files.uploaded);
		files.uploaded.map((file) => {

			fileType = file.type;
			fileSize = file.size;

			console.log(`fileType: ${ fileType }\n fileSize: ${ fileSize }`);

			if(fileType != imgType[0] && fileType != imgType[1] && fileType != imgType[2]){
				return false;
			} else if(fileSize > 5000000){
				return false;
			}
		})
	}
}

module.exports = {
	files_Validator
}