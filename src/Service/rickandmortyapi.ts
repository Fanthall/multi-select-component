import axios from "./api";
export const getRichAndMorty = (query: string) => {
	return axios().get("/character", {
		params: {
			name: query,
		},
	});
};
