var mongoose = require('mongoose');

var Property = mongoose.model('Property', {
	description: {
		type: String,
		required: true
	},
	publishedDate: {
		type: Number,
		required: true
	},
	numFloors: {
		type: Number,
		required: true
	},
	numBedrooms: {
		type: Number,
		required: true
	},
	numBathrooms: {
		type: Number,
		required: true
	},
	listingStatus: {
		type: String,
		required: true
	},
	propertyType: {
		type: String,
		required: false
	},
	price: {
		type: Number,
		required: true
	},
	location: {
		latitude: {
			type: Number,
			required: true
		},
		longitude: {
			type: Number,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		postcode: {
			type: String,
			required: false
		},
		country: {
			type: String,
			required: true
		}
	},
	image: {
		type: String,
		required: false
	},
	thumbnail: {
		type: String,
		required: false
	},
	streetCrimes: {
		month: {
			type: String,
			required: false
		},
		incidents: [
			{
				category: {
				type: String,
				required: true
				},
				total: {
					type: Number,
					required: true
				}
			}
		]
	}
});

module.exports = {Property};

