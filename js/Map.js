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

export default Map;
