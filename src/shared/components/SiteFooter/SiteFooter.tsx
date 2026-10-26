// src/shared/components/SiteFooter/SiteFooter.tsx

import { Link } from "react-router-dom";
import "./SiteFooter.scss";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav className="site-footer__links" aria-label="Footer">
        <Link to="/about"> About & FAQ</Link>
        <a
          href="https://ibelieveinbookfairies.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official site ↗
        </a>{" "}
      </nav>
      <p>
        An unofficial concept design for The Book Fairies. The books and drops
        shown here are fictional.
      </p>
      <p className="site-footer__credit">
        Real cover images, where shown, come from{" "}
        <a
          href="https://openlibrary.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Library
        </a>
        .
      </p>
    </footer>
  );
}
