import axios from 'axios';

const API_URL = 'http://localhost:3001/apiv1';
const LIMIT = 5;

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
		getAdverts: (filter, page = 1) => {
			//No me deja el eslint y lo tengo que poner con let en vez de const
			const skip = (page - 1) * LIMIT;
			let endPoint = buildEndPoint(filter);
			if (skip !== 0) {
				endPoint = `${endPoint}&skip=${skip}`;
			}
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
				.catch(err => {
					throw err;
				});

		},
		getAdvertDetail: id => {
			const endPoint = `${API_URL}/anuncios/${id}`;
			return axios.get(endPoint)
				.then(response => response.data.result)
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
					throw err;
				})
		}
	};
};

export default api;