import { PrismaClient, raw } from "@prisma/client";

const prisma = new PrismaClient();

export default async function products(req, res) {
	let query = "SELECT DISTINCT name FROM Metrics";
	console.log(req.query.grouped);
	try {
		let result;
		if (req.query.grouped == "Total") {
			result = await prisma.$queryRaw`${raw(query)}`;
			console.log(result);
		} else {
			result = [{ name: "all_products" }];
		}
		res.status(200).json(result);
	} catch (err) {
		console.log(err);
		res.status(403).json({
			err: "Error occured while querying db.",
		});
	}
}
