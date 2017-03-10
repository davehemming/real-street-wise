const axios = require('axios');

const ZOOPLA_API_MAX_PAGE_SIZE = 100;
const COUNTRY = 'England';

getZooplaUrl = (postcode, pageNumber, pageSize) => {
	return `${process.env.ZOOPLA_API_URL}?key=${process.env.ZOOPLA_API_KEY}
		&country=${COUNTRY}&postcode=${postcode}&page_number=${pageNumber}&page_size=${pageSize}`;
};

getNumPages = (postcode) => {
	return new Promise((resolve, reject) => {
		let firstPage = 1;

		axios.get(getZooplaUrl(postcode, firstPage, process.env.ZOOPLA_API_MIN_PAGE_SIZE)).then((res) => {
			var resultCount = res.data.result_count;
			var numPages = Math.ceil(resultCount / ZOOPLA_API_MAX_PAGE_SIZE);
			resolve(numPages);

		}).catch((e) => reject(e));
	});
};

getListings = (postcode, pageNumber) => {
	return new Promise((resolve, reject) => {

			axios.get(getZooplaUrl(postcode, pageNumber, ZOOPLA_API_MAX_PAGE_SIZE)).then((response) => {

				var listings = response.data.listing.map((listing) => {
					return {
						description: listing.description,
						publishedDate: new Date(listing.first_published_date).getTime(),
						numFloors: listing.num_floors,
						numBedrooms: listing.num_bedrooms,
						numBathrooms: listing.num_bathrooms,
						listingStatus: listing.listing_status,
						propertyType: listing.property_type,
						price: listing.price,
						location: {
							latitude: listing.latitude,
							longitude: listing.longitude,
							address: listing.displayable_address,
							postcode: response.data.postcode,
							country: response.data.country
						},
						image: listing.image_url,
						thumbnail: listing.thumbnail_url
					};
				});

				resolve(listings);

		}).catch((e) => {
			reject(e);
		});
	});
};

module.exports = {

	getProperties(postcode) {
		return new Promise((resolve, reject) => {
			var listings = [];
			getNumPages(postcode).then((res) => {

				[...Array(res)].forEach((_, i) => {
					listings[i] = getListings(postcode, ++i);
				});

				Promise.all(listings).then((values) => {
					var properties = [].concat(...values);

					resolve(properties);
				});

			}).catch(reject);
		});
	}

};
