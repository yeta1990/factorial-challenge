import { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import RadioButtonGroup from "../layout/RadioButtonGroup";
import {
	getDayAxis,
	getHourAxis,
	getLastDaysAxis,
	getMinuteAxis,
} from "../../utils/axisLabels";
import axios from "axios";

async function createDatasets(grouped, product) {
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

function getColor(id) {
	if (id == 0) return "rgba(0,0,255,1)";
	else if (id == 1) return "rgba(75,192,0,1)";
	else if (id == 2) return "rgba(255,0,0,1)";
	else if (id == 3) return "rgba(75,192,0,1)";
	else if (id == 4) return "rgba(75,192,0,1)";
	else if (id == 5) return "rgba(75,192,0,1)";
}

async function composeData(grouped) {
	let distinctProducts = await axios
		.get("/api/products")
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

export default function LineChart() {
	const [chartType, setChartType] = useState(false);
	const [dataChart, setDataChart] = useState(false);

	useEffect(() => {
		async function f() {
			const newDataChart = await composeData(chartType);
			setDataChart(newDataChart);
		}
		f();
	}, [chartType]);

	return (
		<div>
			<h2>Sales charts</h2>
			<span>Select display: </span>
			<RadioButtonGroup
				labels={["Total", "Day", "Hour", "Minute"]}
				setSelected={setChartType}
			/>
			{chartType && dataChart && (
				<Chart
					type="line"
					datasetIdKey="id"
					data={dataChart}
					width={3}
					height={1}
					options={{
						maintainAspectRatio: true,
					}}
				/>
			)}
		</div>
	);
}
