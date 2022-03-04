import { PrismaClient, raw } from "@prisma/client";
import { querySales } from "../../services/sales.queries";

const prisma = new PrismaClient();

export default async function sales(req, res) {
	let query = querySales(req.query.avg, req.query.last_days);
	console.log(req);
	try {
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
