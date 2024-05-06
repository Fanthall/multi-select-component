import axios from "axios";

const instance = () => {
	const instance = axios.create({
		baseURL: `https://rickandmortyapi.com/api`,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		},
	});
	instance.interceptors.response.use(
		(response: any) => {
			return response;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
	return instance;
};

export default instance;
