import { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import RadioButtonGroup from "../../layout/RadioButtonGroup";
import Selector from "../../layout/Selector";
import { composeData } from "./LineChart.controller";

export default function LineChart() {
	const [chartType, setChartType] = useState("");
	const [dataChart, setDataChart] = useState({});
	const [timeFrame, setTimeFrame] = useState(30);

	useEffect(() => {
		async function getDataAndFillChart() {
			const newDataChart = await composeData(chartType, timeFrame);
			setDataChart(newDataChart);
		}
		getDataAndFillChart();
	}, [chartType, timeFrame]);
	const options = [
		{ value: 30, label: "Last 30 days" },
		{ value: 14, label: "Last 14 days" },
		{ value: 7, label: "Last 7 days" },
	];
	return (
		<div>
			<div className="row">
				<div className="col-sm" style={{ "max-width": "300px" }}>
					<span>Select display: </span>
					<RadioButtonGroup
						labels={["Total", "Day", "Hour", "Minute"]}
						setSelected={setChartType}
					/>
				</div>
				<div className="col-sm" style={{ "max-width": "200px" }}>
					<span>Time frame: </span>
					<Selector options={options} setTimeFrame={setTimeFrame} />
				</div>
			</div>
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
