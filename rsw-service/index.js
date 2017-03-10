const {Property} = require('rsw-model');
const zooplaService = require('./zooplaService');
const {streetCrimes} = require('./policeService');

importProperties = (postcode) => {

	return new Promise((resolve, reject) => {
		zooplaService.getProperties(postcode).then((res) => {

			let status = '';

			properties = res.map((zooplaProperty) => {
				return new Property(zooplaProperty);
			});

			Property.insertMany(properties).then((docs) => {
				resolve('properties successfully imported');
			}).catch((e) => {
				console.log(e);
			});

		}).catch((e) => {
			console.log(e);
		});
	});
};

getProperty = (id) => {

	return new Promise((resolve, reject) => {
		Property.findOne({_id: id}).then((property) => {
			if (!property) {
				reject('A property with that id could not be found');
			}

			streetCrimes(property.location.latitude, property.location.longitude).then((crimeData) => {
				property.streetCrimes = crimeData;
				resolve(property);
			});
		});
	});

};

module.exports = {importProperties, getProperty};
