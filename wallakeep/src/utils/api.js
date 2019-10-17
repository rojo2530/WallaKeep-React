import axios from 'axios';
const API_URL = 'http://localhost:3001/apiv1';
const LIMIT = 5;
const SKIP = '';

const api = () => {
	return {
		getAdverts: () => {
      const endPoint = `${API_URL}/anuncios?limit=${LIMIT}`;
      return axios.get(endPoint)
				.then(response => response.data)
		},
		getTags: () => {
			const endPoint = `${API_URL}/tags`;
			return axios.get(endPoint)
				.then(response => response.data.results);
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