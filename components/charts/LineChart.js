import { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import RadioButtonGroup from "../layout/RadioButtonGroup";
import { composeData } from "../../services/linechart.service";

export default function LineChart() {
	const [chartType, setChartType] = useState("");
	const [dataChart, setDataChart] = useState({});

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
				<div style={{ minheight: "400px" }}>
					<Chart
						type="line"
						datasetIdKey="id"
						data={dataChart}
						width={300}
						height={300}
						options={{
							maintainAspectRatio: false,
							responsive: true,
						}}
					/>
				</div>
			)}
		</div>
	);
}
