
var equation = null;
var operator = true;

window.onload = function(){
	document.getElementById("num-0").onclick = function() {
		operator = false;
		temp("num-0");	
	};
	document.getElementById("num-1").onclick = function() {
		operator = false;
		temp("num-1");
	};
	document.getElementById("num-2").onclick = function() {
		operator = false;
		temp("num-2");	
	};
	document.getElementById("num-3").onclick = function() {
		operator = false;
		temp("num-3");
	};
	document.getElementById("num-4").onclick = function() {
		operator = false;
		temp("num-4");
	};
	document.getElementById("num-5").onclick = function() {
		operator = false;
		temp("num-5");
	};
	document.getElementById("num-6").onclick = function() {
		operator = false;
		temp("num-6");	
	};
	document.getElementById("num-7").onclick = function() {
		operator = false;
		temp("num-7");	
	};
	document.getElementById("num-8").onclick = function() {
		operator = false;
		temp("num-8");
	};
	document.getElementById("num-9").onclick = function() {
		operator = false;
		temp("num-9");
	};
	document.getElementById("tag-exc").onclick = function() {
		temp("tag-exc");
		operator = true;	
	};
	document.getElementById("tag-mul").onclick = function() {
		temp("tag-mul");
		operator = true;	
	};
	document.getElementById("tag-sub").onclick = function() {
		temp("tag-sub");
		operator = true;	
	};
	document.getElementById("tag-point").onclick = function() {
		operator = false;
		temp("tag-point");
	};
	document.getElementById("tag-del").onclick = function() {
		temp("tag-del");	
	};
	document.getElementById("tag-sum").onclick = function() {
		temp("tag-sum");
		operator = true;	
	};
	document.getElementById("tag-left").onclick = function() {
		operator = false;
		temp("tag-left");	
	};
	document.getElementById("tag-right").onclick = function() {
		temp("tag-right");	
	};
	document.getElementById("tag-equ").onclick = function() {
		result();
		operator = false;
		begin = true;	
	};
	document.getElementById("tag-clear").onclick = function() {
		clear();	
	};
	document.getElementById("tag-del").onclick = function() {
		del();	
	};
}



function temp(num) {
	var value = document.getElementById(num).value;
	if(operator == true) {
		document.getElementById("head").value = document.getElementById("head").value.substring(0, document.getElementById("head").value.length-1) + document.getElementById(num).value;
	} else {
		operator = false;
		document.getElementById("head").value += document.getElementById(num).value;
	}
}

function result() {
	var tag = document.getElementById("head").value;
	try {
		num_result = Math.round(eval(tag)*100000)/100000; 
	}
	catch(exception) {
		alert("Error! Your equation is illegal!");
		document.getElementById("head").value = "";
	}
	if(document.getElementById("head").value != "") {
		document.getElementById("head").value += "=";
		document.getElementById("head").value = num_result;
	}
	

}

function clear() {
	document.getElementById("head").value = null;
}

function del() {
	var str = document.getElementById("head").value+"a";
	var len = str.length;
	document.getElementById("head").value = str.substring(0, len-2);
}
