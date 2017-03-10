const axios = require('axios');
const moxios = require('moxios');
const sinon = require('sinon');
const {expect} = require('chai');
const {getProperties, testMe} = require('./../zooplaService');

const zooplaResponse = {
	country: "England",
	result_count: 1,
	postcode: "3000",
	listing: [
		{
			description: "nice house",
			publishedDate: 1487204077000,
			num_floors: 1,
			num_bedrooms: 1,
			num_bathrooms: 1,
			listing_status: "sale",
			property_type: "Semi-detached house",
			price: 1000000,
			latitude: 51.752464,
			longitude: -1.307659,
			address: "Off Fogwell Road, Off Eynsham Road, Oxford",
			image: "https://li.zoocdn.com/f61179e29768a9c171fa48bac819769b4fa00a50_354_255.jpg",
			thumbnail: "https://li.zoocdn.com/f61179e29768a9c171fa48bac819769b4fa00a50_80_60.jpg"
		}
	]
};

describe('getProperties', () => {

	beforeEach(function() {
		moxios.install();
	});

	afterEach(function() {
		moxios.uninstall();
	});

	it('gets properties', (done) => {

		getProperties('Oxford').then((res) => {
			console.log(res);
			done();
		}).catch((e) => {
			console.log(e);
			done();
		});

		let reqUrl = /page_number=1&page_size=100/;
		// let reqUrl = 'http://localhost:3000/';
		moxios.stubRequest(reqUrl, {
			status: 200,
			response: zooplaResponse
		});

		moxios.wait(function() {
			// console.log(onFulfilled.getCall(0).args[0].data);
			done();
		});
		
	});

	// it('does a thing', (done) => {

	// 	testMe();

	// 	let reqUrl = /page_number=1&page_size=100/;
	// 	// let reqUrl = 'http://localhost:3000/';
	// 	moxios.stubRequest(reqUrl, {
	// 		status: 200,
	// 		response: zooplaResponse
	// 	});

	// 	// let onFulfilled = sinon.spy();
	// 	// axios.get('/hello').then(onFulfilled);

	// 	moxios.wait(function() {
	// 		// console.log(onFulfilled.getCall(0).args[0].data);
	// 		done();
	// 	});

	// 	// zooplaService.getProperties('Oxford');



	// 	// moxios.wait(function() {
	// 	// 	let request = moxios.requests.mostRecent();
	// 	// 	request.respondWith({
	// 	// 		status: 200,
	// 	// 		response: zooplaResponse
	// 	// 	}).then(function() {
	// 	// 		done();
	// 	// 	});
	// 	// });
		
	// });

});