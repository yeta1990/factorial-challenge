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
			<div className="container-fluid">
				<Header />
				<div className="row">
					<div className="col-2"></div>
					<div className="col">
						<main>{children}</main>
					</div>
					<div className="col-2"></div>
				</div>
			</div>
		</div>
	);
}
