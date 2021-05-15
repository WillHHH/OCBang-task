import Axios from '../utils/axios';

const getJson = (data) => {
	return Axios.get('/json', { params: data });
};

const MockDataService = {
	getJson,
};

export default MockDataService;
