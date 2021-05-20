
let dateDisplayer = (dateCreated) => {

	let date = new Date(dateCreated);
	let pastYear = date.getFullYear();
	let pastMonth = date.getMonth();
	let pastDate = date.getDate();
	let pastHour = date.getHours();
	let pastMinutes = date.getMinutes();
	let pastSeconds = date.getSeconds();

	let currentDate = new Date();
	let currentYear = currentDate.getFullYear();
	let currentMonth = currentDate.getMonth();
	let current_Date = currentDate.getDate();
	let currentHour = currentDate.getHours();
	let currentMinutes = currentDate.getMinutes();
	let currentSeconds = currentDate.getSeconds();

	function returnDateResult(curr, past, timePeriod){
		let result = curr - past;
		
		if(result > 1){
			return `${ result } ${ timePeriod }s ago`;
		}else{
			return `${ result } ${ timePeriod } ago`;
		}
	}

	function returnWeeklyResult(curr, past, timePeriod){
		let result = curr - past;
		let week = 7;
		let numOfWeeks = 1;
		
		if(result === 1){
			return `${ result } ${ timePeriod } ago`;
		}else if(result > 1 && result <= 7){
			return `${ result } ${ timePeriod }s ago`;
		}else if(result > 7){
			
			for( i = week++; i < result; i++){	
				(function(i){
				  if((i + 1)%7 === 0){
					  numOfWeeks++;
					   
				  }
				})(i);
			   
			}
			
			if(numOfWeeks > 1){
				return `${ numOfWeeks } Weeks ago`;
			}else{
				return `${ numOfWeeks } Week ago`;
			}
			
		}
	}

	if(currentYear > pastYear){
		return returnDateResult(currentYear, pastYear, ' year')
	}else if(currentMonth > pastMonth){
		return returnDateResult(currentMonth, pastMonth, ' month')
	}else if(current_Date > pastDate){
		if(returnWeeklyResult(current_Date, pastDate, ' day') === '1  day ago'){
			return 'Yesterday'
		}else{
			return returnWeeklyResult(current_Date, pastDate, ' day');
		}
	}else if(currentHour > pastHour){
		return returnDateResult(currentHour, pastHour, ' hour')
	}else if(currentMinutes > pastMinutes){
		return returnDateResult(currentMinutes, pastMinutes, ' minute')
	}else if(currentSeconds > pastSeconds){
		return returnDateResult(currentSeconds, pastSeconds, ' second')
	}

}

module.exports = {
	dateDisplayer
}