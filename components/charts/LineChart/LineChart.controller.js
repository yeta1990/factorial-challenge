import { getXAxis } from "./LineChart.services";
import { salesApiCall, productsApiCall } from "./LineChart.apicalls";
import { getColor } from "../../../utils/colorUtils";

// sets the 'y' value for each x-axis step, taking into account
// filling with 0 the gaps without 'y' data (e.g. days without sales)
export async function createDatasets(grouped, product, lastDays) {
	let datasets = [];
	let xAxis = getXAxis(grouped, lastDays);
	let values = await salesApiCall(grouped, lastDays);
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

// the chart library expects to receive a dataset for each line to be drawn.
// with productsApiCall we'll know how many lines (and datasets) will be composed
export async function composeData(grouped, lastDays) {
	if (!grouped) return null;
	let distinctProducts = await productsApiCall(grouped);
	let data = {
		datasets: [],
		labels: null,
	};

	for (let p = 0; p < distinctProducts.length; p++) {
		data.datasets[p] = {};
		data.datasets[p]["data"] = await createDatasets(
			grouped,
			distinctProducts[p].name,
			lastDays
		);
		if (grouped == "Total")
			data.datasets[p]["label"] =
				distinctProducts[p].name + ": total revenue";
		else
			data.datasets[p]["label"] =
				distinctProducts[p].name + ": average revenue per " + grouped;
		data.datasets[p]["fill"] = false;
		data.datasets[p]["lineTension"] = 0.1;
		data.datasets[p]["backgroundColor"] = "rgba(75,192,192,0.4)";
		data.datasets[p]["borderColor"] = getColor(p);
		data.datasets[p]["borderCapStyle"] = "butt";
	}
	data["labels"] = getXAxis(grouped, lastDays);
	return data;
}
