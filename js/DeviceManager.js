import ErrorReporter from './ErrorReporter.js';

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

export default DeviceManager;
