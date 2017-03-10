require('./config/config');

const _ = require('lodash');
const areaService = require('rsw-service');
const bodyParser = require('body-parser');
const {Property, ObjectID} = require('rsw-model');
const express = require('express');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/properties/zoopla/import', (req, res) => {
	areaService.importProperties('BR2').then((msg) => {
		res.status(200).send();
	}).catch((e) => {
		res.status(400).send();
	});
});

app.get('/properties', (req, res) => {
	Property.find().then((properties) => {
		res.send({properties});
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.get('/properties/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	areaService.getProperty(id).then((property) => {
		res.send({property});
	}).catch((e) => res.status(400).send());

});

app.post('/properties', (req, res) => {
	var body = _.pick(req.body, 
		['description',
			'publishedDate',
			'numFloors',
			'numBedrooms',
			'numBathrooms',
			'listingStatus',
			'propertyType',
			'price',
			'location',
			'image',
			'thumbnail']);

	var property = new Property(body);

	property.save().then(() => {
		res.send(property);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.put('/properties/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(
			req.body,
			['description',
				'publishedDate',
				'numFloors',
				'numBedrooms',
				'numBathrooms',
				'listingStatus',
				'propertyType',
				'price',
				'location',
				'image',
				'thumbnail']
			);

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Property.findOneAndUpdate(
		{_id: id}, 
		{$set: body}, 
		{new: true}
	).then((property) => {
		if (!property) {
			return res.status(404).send();
		}

		res.send({property});
	}).catch((e) => {
		res.status(400).send();
	});
});

app.delete('/properties/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Property.findOneAndRemove({
		_id: id
	}).then((property) => {
		if (!property) {
			return res.status(404).send();
		}

		res.send({property});
	}).catch((e) => res.status(400).send());
});

app.listen(port, () => {
	console.log(`Started up at port ${port}`);
});

module.exports = {app};
