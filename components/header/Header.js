import Link from "next/link";

export default function Header() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link href="/" passHref>
				<a className="navbar-brand">Factorial Challenge</a>
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			></button>
			<div className="collapse navbar-collapse" id="navbarNav">
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
