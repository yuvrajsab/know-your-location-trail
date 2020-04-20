import LocationTracker from './LocationTracker.js';

document.querySelector('#startBtn').onclick = () => {
	document.querySelector('#content').classList.remove('hidden');
	document.querySelector('#initial-shit').outerHTML = '';
	LocationTracker.locate();
};
