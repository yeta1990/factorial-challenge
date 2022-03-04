import axios from "axios";
import {
	getDayAxis,
	getHourAxis,
	getLastDaysAxis,
	getMinuteAxis,
} from "../utils/axisLabels";
import { getColor } from "../utils/colorUtils";

export async function createDatasets(grouped, product) {
	let datasets = [];
	let xAxis;
	let values = await axios
		.get(`/api/sales?avg=${grouped}`)
		.then((r) => r.data)
		.catch((err) => console.log(err));

	if (grouped == "Hour") xAxis = getHourAxis();
	else if (grouped == "Minute") xAxis = getMinuteAxis();
	else if (grouped == "Day") xAxis = getDayAxis();
	else xAxis = getLastDaysAxis(30);

	for (let j = 0; j < xAxis.length; j++) {
		datasets[j] = 0;
		for (let i = 0; i < values.length; i++) {
			if (xAxis[j] == values[i].date && product == values[i].name) {
				datasets[j] = values[i].value;
			}
		}
	}
	return datasets;
}

export async function composeData(grouped) {
	if (!grouped) return null;
	let distinctProducts = await axios
		.get(`/api/products?grouped=${grouped}`)
		.then((r) => r.data)
		.catch((err) => console.log(err));
	let data = {
		datasets: [],
		labels: null,
	};

	for (let p = 0; p < distinctProducts.length; p++) {
		data.datasets[p] = {};
		data.datasets[p]["data"] = await createDatasets(
			grouped,
			distinctProducts[p].name
		);
		if (grouped == "Total")
			data.datasets[p]["label"] =
				distinctProducts[p].name + ": total revenue";
		else
			data.datasets[p]["label"] =
				distinctProducts[p].name + ": average revenue per " + grouped;
		data.datasets[p]["fill"] = false;
		data.datasets[p]["lineTension"] = 0.2;
		data.datasets[p]["backgroundColor"] = "rgba(75,192,192,0.4)";
		data.datasets[p]["borderColor"] = getColor(p);
		data.datasets[p]["borderCapStyle"] = "butt";
	}

	if (grouped == "Hour") data["labels"] = getHourAxis();
	else if (grouped == "Minute") data["labels"] = getMinuteAxis();
	else if (grouped == "Day") data["labels"] = getDayAxis();
	else data["labels"] = getLastDaysAxis(30);
	return data;
}
