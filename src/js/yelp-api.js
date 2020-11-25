class YelpApi {
	API_URL_BASE = 'https://circuslabs.net/proxies/yelp-fusion-proxy/';

	API_KEY =
		'YY1EZUlPao-rueU0HUgv42tKI3eBVx_pgjvCf9lgvJDI3zfdekygPyJ7YBumZQEmv_QE-2wkbKnzQdV4iNW8DnbGkg5y1dR6--sEdjEFpcEE-8Jm2v3eewFt9lAsX3Yx';

	businessSearch(parameters) {
		axios
			.get(this.API_URL_BASE, {
				params: {
					_ep: '/businesses/search',

					...parameters,
				},
				headers: {
					Authorization: `Bearer ${this.API_KEY}`,
				},
			})
			.then(this.handleResponse)
			.catch(this.handleError);
	}

	handleResponse(response) {
		console.log('response', response);
		const event = new CustomEvent('got-results', {
			detail: response.data.businesses,
		});
		document.querySelector('body').dispatchEvent(event);
	}
	handleError(error) {
		console.log('error', error);
		const event = new CustomEvent('got-error', { detail: error });
		document.querySelector('body').dispatchEvent(event);
	}
}
