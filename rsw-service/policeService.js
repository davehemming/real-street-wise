const axios = require('axios');

module.exports = {

	streetCrimes(lat, lng) {

		return new Promise((resolve, reject) => {

			url = `${process.env.POLICE_UK_DATA_API_URL}?lat=${lat}&lng=${lng}`;

			axios.get(url).then((crimeData) => {

				let streetCrimes = {
					month: crimeData.data[0].month,
					incidents: []
				};

				crimeData.data.forEach((dataItem) => {
					let incident = streetCrimes.incidents.find((incident) => {
						return incident.category === dataItem.category;
					});

					if (incident) {
						incident.total++;
					} else {
						streetCrimes.incidents.push({
							category: dataItem.category,
							total: 1
						});
					}
				});

				resolve(streetCrimes);

			}).catch(reject);

		});
	}
};
