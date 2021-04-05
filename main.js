var tokens = document.querySelectorAll('.token')

var swapOrigin;
var swapTarget;

tokens.forEach((t) => { t.onclick = (e) => { onTokenClick(t); e.stopPropagation();} })

function onTokenClick(t) {
	if (swapOrigin) {
		swapTarget = t
		swapOrigin.classList.toggle('selected')
		if (swapTarget === swapOrigin) {
			flip(swapOrigin.getAttribute('data-pos'))
			swapOrigin = undefined;
			swapTarget = undefined;
		} else {
			swap();
		}
	} else {
		swapOrigin = t;
		swapOrigin.classList.toggle('selected')
	}
}

document.querySelector('.wrapper').onclick = function() {
	if (swapOrigin) {
		swapOrigin.classList.toggle('selected')
		swapOrigin = undefined;
	} else {
		// Nothing
	}
}

function swap() {
	const originPos = swapOrigin.getAttribute('data-pos')
	const targetPos = swapTarget.getAttribute('data-pos')
	swapOrigin.setAttribute('data-pos', targetPos)
	swapTarget.setAttribute('data-pos', originPos)
	swapOrigin = undefined;
	swapTarget = undefined;
}

function flip(pos) {
	const tokenAtPos = document.querySelector(`.token[data-pos="${pos}"]`)
  	tokenAtPos.classList.toggle('flipped');
}

function fullscreen(){
  var elem = document.querySelector('.fullscreen');
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

document.querySelector('.fullscreenButton').onclick = fullscreen

function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function restart(){

	var order = [
		'red','blue','green','yellow','orange','purple','black'
	]
	order = shuffle(order)
	tokens.forEach((t, i) => {
	    t.className = "token flipped " + order[i]
	})

	swapOrigin = undefined;
	swapTarget = undefined;
}

document.querySelector('.restart').onclick = restart
