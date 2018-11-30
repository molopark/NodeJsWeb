var allUserData = [];
// 콘솔에 결과를 찍는 함수
function logStuff (userData) {
	if ( typeof userData === "string") {
		document.write(userData+'<br/>');
		//console.log(userData);
	} else if ( typeof userData === "object") {
		for (var item in userData) {
			document.write(item + ": " + userData[item]+'<br/>');
			//console.log(item + ": " + userData[item]);
		}
	}
}

// 두 개의 인자를 받아서 마지막에 콜백함수를 호출한다.
function getInput (options, callback) {
	allUserData.push (options);
	callback (options);
}

// getInput 함수를 호출할 때 , 우리는 logStuf이라는 함수의 이름을 인자로 넘긴다.
// 그래서 logStuff 은 콜백함수가 되어 getInput이라는 함수의 내부에서 동작을 할것이다.
getInput ({name:"Rich", speciality:"JavaScript"}, logStuff);
// name: Rich // speciality: JavaScript
