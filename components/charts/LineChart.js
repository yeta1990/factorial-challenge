import { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import RadioButtonGroup from "../layout/RadioButtonGroup";

function composeData(grouped, values) {
	const data = {
		datasets: [
			{
				label: "Average revenue per " + grouped,
				fill: false,
				lineTension: 0.1,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: "butt",
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: "miter",
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
			},
		],
	};
	if (grouped == "Hour") {
		/*data["labels"] = [];
		for (var i = 0; i < 24; i++) data["labels"].add(i);
		*/ data["labels"] = [
			"00",
			"01",
			"02",
			"03",
			"04",
			"05",
			"06",
			"07",
			"08",
			"09",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
		];
	} else if (grouped == "Minute")
		data["labels"] = ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60"];
	else
		data["labels"] = [
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
			"Sunday",
		];

	data.datasets[0].data = values;
	return data;
}

export default function LineChart() {
	const [chartType, setChartType] = useState("");
	const [dataChart, setDataChart] = useState(false);

	useEffect(() => {
		setDataChart(() => composeData(chartType, [10, 20, 0, 50, 60, 80, 7]));
	}, [chartType]);

	return (
		<div>
			<h2>Line chart (custom size)</h2>
			<h3>See average by </h3>
			<RadioButtonGroup
				labels={["Day", "Hour", "Minute"]}
				setSelected={setChartType}
			/>
			{dataChart && (
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
