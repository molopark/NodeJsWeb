//배열
var members = ['egoing','k8805','hoya'];
console.log('array', members[1]);
var i = 0;
while(i < members.length){
  console.log('array loop', members[i]);
  i = i + 1;
}

//객체
var roles = {
  'programer' : 'egoing',
  'designer'  : 'k8805',
  'manager'   : 'hoya'
}
console.log('object', roles.designer);
console.log('object', roles['designer']);
for(var n in roles){
  console.log('object', n, 'value', roles[n]);
}
