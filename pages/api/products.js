import { PrismaClient, raw } from "@prisma/client";

const prisma = new PrismaClient();

export default async function products(req, res) {
	let query = "SELECT DISTINCT name FROM Metrics";
	try {
		let result;
		result = await prisma.$queryRaw`${raw(query)}`;
		console.log(result);
		res.status(200).json(result);
	} catch (err) {
		console.log(err);
		res.status(403).json({
			err: "Error occured while querying db.",
		});
	}
}
