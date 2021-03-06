const fetch = require('node-fetch');
const debug = require('debug')('api:lib:preload');

const places = require('./places');

module.exports = function(){

	if(process.env.HOSTNAME && process.env.PRELOAD){

		let timeOffset = 0;
		const increment = 1800;

		places.forEach(place => {

			setTimeout(function(){
				debug(`Caching results for ${place}`);
				fetch(`${process.env.HOSTNAME}/search/cinemas/location/${place}`)
					.then(res => res.json())
					.then(data => {
						debug(data);
						data.cinemas.forEach(cinema => {
							fetch(`${process.env.HOSTNAME}/get/times/cinema/${cinema.id}`)
						});

					})
				;

			}, timeOffset);

			timeOffset += increment;

		});
		
	}

}