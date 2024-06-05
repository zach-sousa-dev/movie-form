// vvvPARAMETERSvvv
var targetClass = "hacky-container";	//class to do the effect on

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";		//characters to randomize

const readabilityRate = 80;		//time in ms
//for some reason the var above and below break it when equal, and idk why
const randomRate = 50;		//time in ms

const delay = 1500;		//time in ms
// ^^^PARAMETERS^^^

var elements = [];

var objects = [];

function randomize(object, startIndex) {
	var length = object.html.innerHTML.length;
	var str = object.oldHtml;
	for (let i = startIndex; i < length; i++) {
		if ((str.charAt(i) == ' ') == false) {
			str = setCharAt(str, i, letters.charAt(Math.floor(Math.random() * letters.length)));
		}
	}
	object.html.innerHTML = str;
}



//makes the text more readable by 1 character
function incrementStartIndex() {
	for (let i = 0; i < objects.length; i++) {
		clearInterval(objects[i].interval)
		if (objects[i].html.innerHTML.length + 1 > objects[i].startIndex) {
			objects[i].startIndex += 1;
			objects[i].interval = setInterval(randomize, randomRate, objects[i], objects[i].startIndex, letters);
		}
	}
}



function setCharAt(str, index, chr) {
	if (index > str.length - 1) return str;
	return str.substring(0, index) + chr + str.substring(index + 1);
}



//called on page load
window.addEventListener("load", event => {		//run when all the files finish loading

	elements = document.getElementsByClassName(targetClass);

	for (let i = 0; i < elements.length; i++) {
		var object = {
			id: i,
			html: elements[i],
			oldHtml: elements[i].innerHTML,
			startIndex: 0,
			interval: null,
		};

		objects.push(object);
	}

	start();
});


function startDecode() {
	clearTimeout(startDecode);
	setInterval(incrementStartIndex, readabilityRate);
}


//called after all of the objects are created
function start() {
	for (let i = 0; i < objects.length; i++) {
		objects[i].interval = setInterval(randomize, randomRate, objects[i], 0, letters);
	}

	setTimeout(startDecode, delay);

	//setInterval(randomize, 50, elements[0], i, letters);	//update each letter randomly every 50ms
}