import axios from "axios";

export async function salesApiCall(grouped, lastDays) {
	const values = await axios
		.get(`/api/sales?avg=${grouped}&last_days=${lastDays}`)
		.then((r) => r.data)
		.catch((err) => console.log(err));
	return values;
}

export async function productsApiCall(grouped) {
	const distinctProducts = await axios
		.get(`/api/products?grouped=${grouped}`)
		.then((r) => r.data)
		.catch((err) => console.log(err));
	return distinctProducts;
}
