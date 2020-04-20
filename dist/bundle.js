function setMessage(message) {
	document.querySelector('#message').innerHTML = message;
}

function dumpLocation(content) {
	document
		.querySelector('#location-dump')
		.insertAdjacentHTML('afterbegin', content);
}

class ErrorReporter {
	static report(message) {
		setMessage(`
			<p class="text-red-700">
				${message}
			</p>
        `);

		throw message;
	}
}

class DeviceManager {
	static getLocationManager() {
		if (DeviceManager.isGeoLocationSupported()) {
			return navigator.geolocation;
		}

		ErrorReporter.report(
			`Sorry, Your browser doesn't support location tracking. Please use diffrent browser for try updating this one.`,
		);
	}

	static isGeoLocationSupported() {
		if ('geolocation' in navigator) {
			return true;
		}

		return false;
	}
}

class Map {
	constructor() {
		// singleton class
		const instance = this.constructor.instance;
		if (instance) {
			return instance;
		}

		this.constructor.instance = this;
		this.init();
	}

	init() {
		this.mymap = L.map('mapid').setView([0, 0], 12);
		this.marker = L.marker([0, 0]).addTo(this.mymap);
		L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg', {
			attribution:
				'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
			maxZoom: 12,
		}).addTo(this.mymap);
	}

	plot({ longitude, latitude }) {
		this.mymap.setView([longitude, latitude], 12);
		this.marker.setLatLng([longitude, latitude]);
	}
}

class LocationFormatter {
	static timestampToDate(timestamp) {
		return new Date(timestamp);
	}

	static formatDisplay({ coords, timestamp }) {
		dumpLocation(`
			<tr>
				<td class="border px-3 py-1 text-sm">
					Longitude ${coords.longitude}&deg;<br>
					Latitude ${coords.latitude}&deg;
				</td>
				<td class="border px-3 py-1 text-sm">
					${LocationFormatter.timestampToDate(timestamp)}
				</td>
			</tr>
		`);

		LocationFormatter.showOnMap(coords);
	}

	static showOnMap(coords) {
		new Map().plot(coords);
	}
}

class LocationTracker {
	constructor() {
		this.locationManager = DeviceManager.getLocationManager();
	}

	static locate() {
		return new LocationTracker().getLocation();
	}

	getLocation() {
		this.locationManager.watchPosition(
			position => this.processLocation(position),
			error => this.handleError(error),
		);
	}

	processLocation(position) {
		LocationFormatter.formatDisplay(position);
	}

	handleError(error) {
		ErrorReporter.report(error.message);
	}
}

document.querySelector('#startBtn').onclick = () => {
	document.querySelector('#content').classList.remove('hidden');
	document.querySelector('#initial-shit').outerHTML = '';
	LocationTracker.locate();
};
