import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		import("bootstrap/dist/js/bootstrap");
	}, []);

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
