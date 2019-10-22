import axios from 'axios';
const qs = require('querystring');

const API_URL = 'http://localhost:3001/apiv1';
const LIMIT = 8;
const SKIP = '';

function buildEndPoint(filter) {
	const endPointBase = `${API_URL}/anuncios?limit=${LIMIT}`;
	let endPoint  = endPointBase;
	const { name, tag, type, priceMin, priceMax } = filter;

	if (name) {
		endPoint = `${endPointBase}&name=${name}`;
	} 

	if (tag && tag !== 'all') {
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
		},
		createAdvert: (advert) => {
			const endPoint = `${API_URL}/anuncios`;
			return axios({
				method: 'post',
				url: endPoint,
				data: advert
			}).then(res => res.data)
		},
		getAdvertDetail: id => {
			const endPoint = `${API_URL}/anuncios/${id}`;
			return axios.get(endPoint)
				.then(response => response.data.result)
				// .catch (({ response: { data } }) => {
				// 	console.log('Error en ruta: ', data.success, data.error.status);
				// });
				.catch(err => {
					throw err;
				})
		}, 
		updateAdvert: (id, advert) => {
			const endPoint = `${API_URL}/anuncios/${id}`;
			return axios({
				method: 'put',
				url: endPoint,
				data: advert
			}).then(res => res)
				.catch(err => {
					console.log('Error: ', err.response);
				})
		}
	};
};

export default api;