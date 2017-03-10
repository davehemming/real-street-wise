const expect = require('expect');
const request = require('supertest');
const {Property, ObjectID} = require('area-model');
const {app} = require('./../server');
const {properties, populateProperties} = require('./seed/seed');

let someProperty = {
		description: 'increadible house',
		publishedDate: 1487204077000,
		numFloors: 1,
		numBedrooms: 1,
		numBathrooms: 1,
		listingStatus: 'sale',
		propertyType: 'Semi-detached house',
		price: 3000000,
		location: {
			latitude: 51.752464,
			longitude: -1.307659,
			address: '3 example street, perth',
			postCode: '3000',
			country: 'Australia'
		},
		image: 'https://li.zoocdn.com/f61179e29768a9c171fa48bac819769b4fa00a50_354_255.jpg',
		thumbnail: 'https://li.zoocdn.com/f61179e29768a9c171fa48bac819769b4fa00a50_80_60.jpg'
	};

let someProperty2 = {
	description: 'increadible house',
	publishedDate: 1487204077000,
	numFloors: 1,
	numBedrooms: 1,
	numBathrooms: 1,
	listingStatus: 'sale',
	propertyType: 'Semi-detached house',
	price: 3000000,
	location: {
   	latitude: 51.752464,
		longitude: -1.307659,
		address: '3 example street, perth',
		country: 'Australia'
  },
	image: 'https://li.zoocdn.com/f61179e29768a9c171fa48bac819769b4fa00a50_354_255.jpg',
	thumbnail: 'https://li.zoocdn.com/f61179e29768a9c171fa48bac819769b4fa00a50_80_60.jpg'
};

beforeEach(populateProperties);

describe('POST /properties', () => {

	it('should create a new property', (done) => {

		request(app)
			.post('/properties')
			.send(someProperty)
			.expect((res) => {
				expect(res.body.description).toBe('increadible house')
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Property.find({'location.address': someProperty.location.address}).then((properties) => {
					expect(properties.length).toBe(1);
					expect(properties[0]).toInclude(someProperty);
					done();
				}).catch((e) => done(e));
			});
	});

	it('should not create a property with invalid body data', (done) => {
		request(app)
			.post('/properties')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Property.find().then((properties) => {
					expect(properties.length).toBe(2);
					done();
				}).catch((e) => done(e));
			})
	});

});

describe('GET /properties', () => {
	it('should get all properties', (done) => {
		request(app)
			.get('/properties')
			.expect(200)
			.expect((res) => {
				expect(res.body.properties.length).toBe(2);
			})
			.end(done);
	});
});

describe('GET /properties/:id', () => {
	it('should return property doc', (done) => {
		request(app)
			.get(`/properties/${properties[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.property.location.address).toBe(properties[0].location.address);
			})
			.end(done);
	});

	it('should return a 404 if properties not found', (done) => {
		request(app)
			.get(`/properties/${new ObjectID().toHexString()}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 for non-object ids', (done) => {
		request(app)
			.get('/todos/123abc')
			.expect(404)
			.end(done);
	});
});

describe('DELETE /properties/:id', () => {
	it('should remove a property', (done) => {
		let hexId = properties[1]._id.toHexString();

		request(app)
			.delete(`/properties/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.property._id).toBe(hexId);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Property.findById(hexId).then((property) => {
					expect(property).toNotExist();
					done();
				}).catch((e) => done(e));
			});
	});

	it('should return a 404 if property not found', (done) => {
		request(app)
			.delete(`/properties/${new ObjectID().toHexString()}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 for non-object ids', (done) => {
		request(app)
			.delete('/todos/123abc')
			.expect(404)
			.end(done);
	});
});

describe('UPDATE /properties/:id', () => {
	it('should update the property', (done) => {
		var hexId = properties[0]._id.toHexString();
		var description = 'bad house';
		request(app)
			.put(`/properties/${hexId}`)
			.send({description})
			.expect(200)
			.expect((res) => {
				expect(res.body.property.description).toBe(description);
			})
			.end(done);
	});
});
