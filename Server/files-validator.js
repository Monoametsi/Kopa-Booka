
let files_Validator = (files) => {
	let imgType = ["image/png", "image/jpg", "image/jpeg"];
	let fileType;
	let fileSize;

	if(files.uploaded.size === 0){

		return [false, 'noFiles'];

	}else if(files.uploaded.length === undefined){

		fileType = files.uploaded.type;
		fileSize = files.uploaded.size;

		if(fileType != imgType[0] && fileType != imgType[1] && fileType != imgType[2]){
			return [false, 'invalidExt'];

		} else if(fileSize > 5000000){
			return [false, 'overSizeLimit'];

		}
	}else if(files.uploaded.length >= 1 && files.uploaded.length <= 10){

		files.uploaded.map((file) => {

			fileType = file.type;
			fileSize = file.size;

			if(fileType != imgType[0] && fileType != imgType[1] && fileType != imgType[2]){
				return [false, 'invalidExt'];
			} else if(fileSize > 5000000){
				return [false, 'overSizeLimit'];
			}
		})
	}else if(files.uploaded.length > 10){
		return [false, 'exceededLimit'];
	}
	
	return true;
}

module.exports = {
	files_Validator
}