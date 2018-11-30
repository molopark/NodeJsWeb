//funcCallback
function sum(a,b,callback) {
	var result = a + b;
	callback();
	return result;
}

var r = sum(10,20,function(){
	alert('a+b=');
});

document.write(r+'<br/>');