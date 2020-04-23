import DeviceManager from './DeviceManager.js';
import ErrorReporter from './ErrorReporter.js';
import LocationFormatter from './LocationFormatter.js';
import { setMessage, clearMessage } from './helpers.js';

class LocationTracker {
	constructor() {
		this.locationManager = DeviceManager.getLocationManager();
	}

	static locate() {
		return new LocationTracker().getLocation();
	}

	getLocation() {
		setMessage(`
			<p class="text-gray-700">
				Please give permission to access your location.
			</p>
        `);

		this.locationManager.watchPosition(
			position => this.processLocation(position),
			error => this.handleError(error),
		);
	}

	processLocation(position) {
		clearMessage();

		document.querySelector('#content').classList.remove('hidden');

		LocationFormatter.formatDisplay(position);
	}

	handleError(error) {
		ErrorReporter.report(error.message);
	}
}

export default LocationTracker;
