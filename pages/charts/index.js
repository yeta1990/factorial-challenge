import "chart.js/auto";
import LineChart from "../../components/charts/LineChart/LineChart";

export default function ChartsSection() {
	return (
		<div className="mt-2">
			<h2>Sales charts</h2>
			<LineChart />
		</div>
	);
}
