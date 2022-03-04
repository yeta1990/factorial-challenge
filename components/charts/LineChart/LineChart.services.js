import { timestampToDateString } from "../../../utils/timeUtils";

export function getXAxis(type, lastDays) {
	if (type == "Hour") return getHourAxis();
	else if (type == "Minute") return getMinuteAxis();
	else if (type == "Day") return getDayAxis();
	return getLastDaysAxis(lastDays);
}

export function getLastDaysAxis(days) {
	let i = 0;
	let axisData = [];
	while (i <= days) {
		let d = new Date();
		d.setDate(d.getDate() - days + i + 1);
		axisData[i] = timestampToDateString(d);
		i++;
	}
	return axisData;
}

export function getHourAxis() {
	let axisData = [];
	let i = 0;
	while (i < 24) {
		axisData[i] = i.toString().padStart(2, 0);
		i++;
	}
	return axisData;
}

export function getMinuteAxis() {
	let axisData = [];
	let i = 0;
	while (i < 60) {
		axisData[i] = i.toString().padStart(2, 0);
		i++;
	}
	return axisData;
}

export function getDayAxis() {
	return [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
}
