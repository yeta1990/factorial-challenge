import { PrismaClient, raw } from "@prisma/client";

const prisma = new PrismaClient();
//WHERE name = '${req.query.name}'

export default async function sales(req, res) {
	let query =
		"SELECT COUNT(1) as count, timestamp, strftime('%d-%m-%Y', datetime(timestamp, 'unixepoch')) as date, name, SUM(value) as value FROM Metrics GROUP BY name, date";
	try {
		if (req.query.avg == "Day")
			query = `SELECT *,
					CASE weekday
						WHEN '0' THEN 'Sunday'
						WHEN '1' THEN 'Monday'
						WHEN '2' THEN 'Tuesday'
						WHEN '3' THEN 'Wednesday'
						WHEN '4' THEN 'Thursday'
						WHEN '5' THEN 'Friday'
						WHEN '6' THEN 'Saturday'
					END as date
						FROM 
						(SELECT
							COUNT(1) as count,
							SUM(value) / COUNT(1) as value,
							'all_products' as name,
							strftime('%w', datetime(timestamp, 'unixepoch')) as weekday  
						FROM Metrics
						GROUP by name, weekday)`;
		if (req.query.avg == "Hour")
			query = `SELECT
							COUNT(1) as count,
							SUM(value) / COUNT(1) as value,
							'all_products' as name,
							strftime('%H', datetime(timestamp, 'unixepoch')) as date  
						FROM Metrics
						GROUP by name, date`;
		if (req.query.avg == "Minute")
			query = `SELECT
							COUNT(1) as count,
							SUM(value) / COUNT(1) as value,
							'all_products' as name,
							strftime('%M', datetime(timestamp, 'unixepoch')) as date  
						FROM Metrics
						GROUP by date`;
		const result = await prisma.$queryRaw`${raw(query)}`;
		console.log(result);
		res.status(200).json(result);
	} catch (err) {
		console.log(err);
		res.status(403).json({
			err: "Error occured while querying db.",
		});
	}
}
