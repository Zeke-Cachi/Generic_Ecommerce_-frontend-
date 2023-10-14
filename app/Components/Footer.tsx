import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer p-10 text-base-content border-t-2 border-t-purple-800">
      <aside>
        <Image
          src="/site-logo.png"
          height={150}
          width={150}
          alt="Company logo"
        />
        <p>
          Generic Ecommerce Ltd.
          <br />
          Providing reliable products since 1992
        </p>
      </aside>
      <nav>
        <header className="footer-title text-purple-600">Services</header>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <header className="footer-title text-purple-600">Company</header>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <header className="footer-title text-purple-600">Legal</header>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
