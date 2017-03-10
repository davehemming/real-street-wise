const {Property, ObjectID} = require('area-model');
const {app} = require('./../../server');

const propertyOneId = new ObjectID();
const propertyTwoId = new ObjectID();
const properties = [
		{
			_id: propertyOneId,
			description: "good house",
			publishedDate: 1487204077000,
			numFloors: 1,
			numBedrooms: 1,
			numBathrooms: 1,
			listingStatus: "sale",
			propertyType: "Semi-detached house",
			price: 1000000,
			location: {
				latitude: 51.752464,
				longitude: -1.307659,
				address: "1 example st, Melbourne",
				postCode: "",
				country: "Australia"
			},
			image: "https://li.zoocdn.com/f61179e29768a9c171fa48bac819769b4fa00a50_354_255.jpg",
			thumbnail: "https://li.zoocdn.com/f61179e29768a9c171fa48bac819769b4fa00a50_80_60.jpg"
		},
		{
				_id: propertyTwoId,
				description: "great house",
				publishedDate: 1487204077000,
				numFloors: 2,
				numBedrooms: 2,
				numBathrooms: 2,
				listingStatus: "sale",
				propertyType: "Semi-detached house",
				price: 2000000,
				location: {
					latitude: 51.752464,
					longitude: -1.307659,
					address: "2 example st, Sydney",
					postCode: "",
					country: "Sydney"
				},
				image: "https://li.zoocdn.com/f61179e29768a9c171fa48bac819769b4fa00a50_354_255.jpg",
				thumbnail: "https://li.zoocdn.com/f61179e29768a9c171fa48bac819769b4fa00a50_80_60.jpg"
			
		}
];

const populateProperties = (done) => {
	Property.remove({}).then(() => {
		return Property.insertMany(properties);
	}).then(() => done());
}

module.exports = {properties, populateProperties};
