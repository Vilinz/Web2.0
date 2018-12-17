window.onload = function() {
  var begin = document.getElementById("begin");
  begin.addEventListener("click", creat);
  var test = document.getElementsByClassName("panda");
  for(var i = 0; i < test.length; i++) {
    test[i].addEventListener("click", move);
  }
}

var arr = [15];
var playing = false;
var countStep = 0;

function creat(){
  random_occur();
  while(!valid()) {
    random_occur();
  }
  countStep = 0;
  var panda = document.getElementsByClassName("panda");
  document.getElementById("stepShow").value = countStep;
  for(var i = 0; i < 15; i++) {
    panda[i].className = "panda"+" p"+arr[i];
  }
  playing = true;
  document.getElementById("tip").value = "Playing";
}

function move() {
  var picture16 = document.getElementById("p16");
  var pic16_left = picture16.offsetLeft;
  var pic16_top = picture16.offsetTop;
  var this_left = this.offsetLeft;
  var this_top = this.offsetTop;
  if(playing){
    if(Math.abs(pic16_left - this_left) == 102&&pic16_top == this_top||
    (Math.abs(pic16_top - this_top) == 102&&this_left == pic16_left)) {
      var temp = picture16.className;
      picture16.className = this.className;
      this.className = temp;
      countStep++;
      document.getElementById("stepShow").value = countStep;
    }
  }
  if(playing)
    validComplete();
}

function random_occur(){
  for(var i = 1; i < 17; i++) {
    document.getElementById("p"+i).className = "panda"+" p"+i;  
  }
  var length = 15;
  for(var i = 1; i <= length; i++) {
    arr[i-1] = i;
  }
  var t = new Date().getTime();
  Array.prototype.sort.call(arr, function(a, b){return Math.random()>0.5 ? -1 : 1;});  
}

function valid() {
  var count = 0;
  for(var i = 0; i < 15; i++) {
    for(var j = i+1; j < 16; j++) {
      if(arr[i] > arr[j]) {
        count++;
      }
    }
  }
  return count%2 == 0;
}
  

function validComplete() {
  for(var i = 1; i <= 16;i++) {
    var idPanda = document.getElementById("p" + i);
    if(idPanda.className != "panda"+" p"+i) {
      return;
    }
  }
  document.getElementById("tip").value = "You win";
  playing = false;
}