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

export default Map;
