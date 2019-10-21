import axios from 'axios';
const API_URL = 'http://192.168.1.38:3001/apiv1';
const LIMIT = 8;
const SKIP = '';

function buildEndPoint(filter) {
	const endPointBase = `${API_URL}/anuncios?limit=${LIMIT}`;
	let endPoint  = endPointBase;
	const { name, tag, type, priceMin, priceMax } = filter;

	if (name) {
		endPoint = `${endPointBase}&name=${name}`;
	} 

	if (tag) {
		endPoint = `${endPoint}&tag=${tag}`;
	}

	if (type && type === 'buy') {
		endPoint = `${endPoint}&venta=false`;
	} else if (type && type === 'sell') {
		endPoint = `${endPoint}&venta=true`;
	}

	const queryPrice = getQueryPrice(priceMin, priceMax);
	endPoint = `${endPoint}${queryPrice}`
	return endPoint;

}

function getQueryPrice(priceMin, priceMax) {
	let query = '';
	if (!priceMin && !priceMax) {
		return query;
	} else if (priceMin && !priceMax) {
		query = `&price=${priceMin}-`;
	} else if (priceMin && priceMax) {
		query = `&price=${priceMin}-${priceMax}`;
	} else if (!priceMin && priceMax) {
		query = `&price=-${priceMax}`;
	}
	return query;
}

const api = () => {
	return {
		getAdverts: (filter) => {
			//No me deja el eslint y lo tengo que poner con let
			const endPoint = buildEndPoint(filter);
      return axios.get(endPoint)
				.then(response => response.data)
				.catch(err => {
					throw err;
				});
		},
		getTags: () => {
			const endPoint = `${API_URL}/tags`;
			return axios.get(endPoint)
				.then(response => response.data.results)
				.catch(err => {
					throw err;
				});
		}
	
		// getFilms: (query, year, page = 1) => {
    //   const endPointBase = `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
    //   if (year) {
    //     const endPoint = `${endPointBase}&primary_release_year=${year}&page=${page}`;
    //   } else {
    //     const endPoint = `${endPointBase};`;
    //   }
		// 	return axios.get(endPoint)
		// 		.then(response => response);
		// },
	
		
	};
};

export default api;