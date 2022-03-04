export function getColor(id) {
	switch (id) {
		case 0:
			return "rgba(0,0,255,1)";
		case 1:
			return "rgba(75,192,0,1)";
		case 2:
			return "rgba(255,0,0,1)";
		case 3:
			return "rgba(255,165,0,1)";
		case 4:
			return "rgba(238,130,238,1)";
		case 5:
			return "rgba(60,60,60,1)";
		default:
			return "rgba(0,0,0,1)";
	}
}
