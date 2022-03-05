import Link from "next/link";

export default function Header() {
	return (
		<nav className="navbar navbar-expand navbar-light bg-light">
			<div className="container-fluid">
				<Link href="/" passHref>
					<a className="navbar-brand">Factorial challenge</a>
				</Link>
				<button className="navbar-toggler" type="button">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarsExample02">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link href="/" passHref>
								<a className="nav-link"> Home </a>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/charts" passHref>
								<a className="nav-link"> Charts </a>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
