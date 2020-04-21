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
		this.mymap = L.map('mapid').setView([0, 0], 13);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(this.mymap);

		this.marker = L.marker([0, 0]).addTo(this.mymap);
	}

	plot({ latitude, longitude }) {
		this.mymap.setView([latitude, longitude]);
		this.marker.setLatLng([latitude, longitude]);
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
					Latitude ${coords.latitude}&deg;<br>
					Longitude ${coords.longitude}&deg;
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
			{
				enableHighAccuracy: true,
			},
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
