export function setMessage(message) {
	document.querySelector('#message').innerHTML = message;
}

export function clearMessage() {
	document.querySelector('#message').innerHTML = '';
}

export function dumpLocation(content) {
	document
		.querySelector('#location-dump')
		.insertAdjacentHTML('afterbegin', content);
}
