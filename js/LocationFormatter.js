import { dumpLocation } from './helpers.js';
import Map from './Map.js';

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

export default LocationFormatter;
