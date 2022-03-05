import Head from "next/head";
import Header from "./Header";

export default function Layout({ children }) {
	return (
		<div>
			<Head>
				<title>Factorial Challenge - Alberto García</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<Header />
			<div className="container">
				<div className="row">
					<div className="col-2-sm"></div>
					<div className="col">
						<main>{children}</main>
					</div>
					<div className="col-2-sm"></div>
				</div>
			</div>
		</div>
	);
}
