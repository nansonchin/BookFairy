// src/shared/components/SiteFooter/SiteFooter.tsx

import "./SiteFooter.scss";

export function SiteFooter() {
  return (
    <footer className="site-footer">
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
