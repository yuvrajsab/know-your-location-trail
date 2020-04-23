import LocationTracker from './LocationTracker.js';

document.querySelector('#startBtn').onclick = () => {
	document.querySelector('#initial-shit').outerHTML = '';
	LocationTracker.locate();
};
