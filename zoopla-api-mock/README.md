# Zoopla API Mock Server

Mock server for the [Zoopla Property API](http://developer.zoopla.com/). Built with [Mountebank](https://github.com/bbyars/mountebank).

## Usage

	npm start
	npm run stop
	npm run restart

The server is launched on port 3001 and restarts on changes.

A typical request to the real API looks like:

	http://api.zoopla.co.uk/api/v1/property_listings.js?api_key=key&country=England&postcode=BR2&page_number=4&page_size=100

To make a request to this mock server, replace the host in the URL with `http://localhost:3001`.
