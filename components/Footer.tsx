import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground font-header transition-colors duration-300  z-10 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between p-5 space-y-3 md:space-y-0">
        <p className="text-base text-muted-foreground tracking-widest">
          Find Me
        </p>
        <div className="flex items-center space-x-4">
          <Link href="">
            <FaFacebookF className="transition-colors text-muted-foreground hover:cursor-pointer hover:text-accent-foreground" />
          </Link>
          <span className="h-5 border-l border-muted-foreground"></span>
          <Link href="">
            <FaTwitter className="transition-colors text-muted-foreground hover:cursor-pointer hover:text-accent-foreground" />
          </Link>
          <span className="h-5 border-l border-muted-foreground"></span>
          <Link href="">
            <FaInstagram className="transition-colors text-muted-foreground hover:cursor-pointer hover:text-accent-foreground" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
