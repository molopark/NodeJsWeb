var f = function(){
  console.log('f1');
  console.log('f2');
}

//배열
var a = [f];
a[0]();

//객체
var o = {
  func:f
}
o.func();

var o = {
  v1 : "o1",
  v2 : "o2",
  f1 : function(){
    console.log(this.v1);
  },
  f2 : function(){
    console.log(this.v2);
  }
}

o.f1();
o.f2();
