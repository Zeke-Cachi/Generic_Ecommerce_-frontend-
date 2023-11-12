import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer p-10 text-base-content border-t-2 border-t-purple-800 bg-white">
      <aside>
        <Link href="/">
          <Image
            src="/site-logo.png"
            height={150}
            width={150}
            alt="Company logo"
          />
        </Link>
        <p>
          Generic Ecommerce Ltd.
          <br />
          Providing reliable products since 1992
        </p>
      </aside>
      <nav>
        <header className="footer-title text-purple-600">Services</header>
        <Link href="/inconstruction" className="link link-hover">
          Branding
        </Link>
        <Link href="/inconstruction" className="link link-hover">
          Design
        </Link>
        <Link href="/inconstruction" className="link link-hover">
          Marketing
        </Link>
        <Link href="/inconstruction" className="link link-hover">
          Advertisement
        </Link>
      </nav>
      <nav>
        <header className="footer-title text-purple-600">Company</header>
        <Link href="/inconstruction" className="link link-hover">
          About us
        </Link>
        <Link href="/inconstruction" className="link link-hover">
          Contact
        </Link>
        <Link href="/inconstruction" className="link link-hover">
          Jobs
        </Link>
        <Link href="/inconstruction" className="link link-hover">
          Press kit
        </Link>
      </nav>
      <nav>
        <header className="footer-title text-purple-600">Legal</header>
        <Link href="/inconstruction" className="link link-hover">
          Terms of use
        </Link>
        <Link href="/inconstruction" className="link link-hover">
          Privacy policy
        </Link>
        <Link href="/inconstruction" className="link link-hover">
          Cookie policy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
