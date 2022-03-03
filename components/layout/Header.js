import Link from "next/link";

export default function Header() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link href="/" passHref>
				<a className="navbar-brand">Factorial Challenge</a>
			</Link>
			<div className="navbar-collapse" id="navbarNav">
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
		</nav>
	);
}
