export function querySalesBasic(lastDays) {
	const query = `SELECT *
	FROM
		(SELECT
			CAST(COUNT(1) as float) as count,
			timestamp,
			strftime('%d-%m-%Y', datetime(timestamp, 'unixepoch')) as date,
			name,
			CAST(SUM(value) as float) as value,
			DATETIME(timestamp, 'unixepoch') as date_time
		FROM Metrics
		GROUP BY name, date) 
	WHERE date_time > DATETIME('now', '-${lastDays} day')`;
	return query;
}

export function querySalesAverage(dateFormat, lastDays) {
	let query = `SELECT * FROM
		(SELECT
			CAST(COUNT(1) as float) as total_sales,
			CAST(SUM(value) as float) as total_sum,
			SUM(value) / CAST(30 as float) as value,
			name,
			strftime('%${dateFormat}', datetime(timestamp, 'unixepoch')) as date,
			DATETIME(timestamp, 'unixepoch') as date_time
		FROM Metrics
		GROUP by name, date)
	WHERE date_time > DATETIME('now', '-${lastDays} day')`;
	if (dateFormat === "w")
		query = `SELECT p.*,
					CASE p.date
						WHEN '0' THEN 'Sunday'
						WHEN '1' THEN 'Monday'
						WHEN '2' THEN 'Tuesday'
						WHEN '3' THEN 'Wednesday'
						WHEN '4' THEN 'Thursday'
						WHEN '5' THEN 'Friday'
						WHEN '6' THEN 'Saturday'
					END as date
						FROM 
						(${query}) as p`;
	return query;
}

export function querySales(dateFormat, lastDays) {
	if (dateFormat == "Minute") return querySalesAverage("M", lastDays);
	else if (dateFormat == "Hour") return querySalesAverage("H", lastDays);
	else if (dateFormat == "Day") return querySalesAverage("w", lastDays);
	else return querySalesBasic(lastDays);
}
