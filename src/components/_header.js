import Link from "next/link";

function Header() {
    return (
        <nav>
            <Link href="/about">
                About
            </Link>
            <Link href="/home">
                Home
            </Link>
            <Link href="/notFound">
                NotFound
            </Link>
        </nav>
    );
}

export default Header;
