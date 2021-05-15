import axios from 'axios';

const Axios = axios.create({
	retry: 4,
	retryInterval: 1000,
	baseURL: process.env.REACT_APP_BASE_URL
});

Axios.interceptors.request.use(
	(config) => {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

Axios.interceptors.response.use(
	(res) => {
		return res;
	},
	function axiosRetryInterceptor(res) {
		let config = res.config;

		if (!config || !config.retry) return Promise.reject(res);

		config.retryCount = config.retryCount || 0;

		if (config.retryCount >= config.retry) {
			return Promise.reject(res);
		}

		config.retryCount += 1;

		let back = new Promise(function (resolve) {
			console.log(config.url + 'request timeout, retrying...');
			setTimeout(function () {
				resolve();
			}, config.retryInterval || 1);
		});

		return back.then(function () {
			return axios(config);
		});
	},
);

export default Axios;
