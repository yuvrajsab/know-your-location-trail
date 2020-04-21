import DeviceManager from './DeviceManager.js';
import ErrorReporter from './ErrorReporter.js';
import LocationFormatter from './LocationFormatter.js';

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

export default LocationTracker;
