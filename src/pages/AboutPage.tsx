
import { FaqItem } from "../features/about/components/FaqItem/FaqItem";
import { LazyVideo } from "../features/about/components/LazyVideo/LazyVideo";
import {
  ABOUT_VIDEO,
  FAQ_PROJECT,
  FAQ_SITE,
} from "../features/about/data/aboutContent";
import { usePageTitle } from "../shared/hooks/usePageTitle";
import { ABOUT_URL, STICKERS_URL } from "../shared/lib/links";
import "../styles/AboutPage.scss";

export function AboutPage() {
  usePageTitle("About & FAQ | The Book Fairies")
  return (
    <main className="about-page container">

      {/* ── 1. ABOUT THIS SITE ──────────────────────────────────── */}
      <header className="about-page__hero">
        <p className="eyebrow">About this site</p>
        <h1 className="about-page__title">
          An unofficial concept, built from a love of books.
        </h1>
        <p className="about-page__lede">
          This is a portfolio redesign of{" "}
          <a href="https://ibelieveinbookfairies.com" target="_blank" rel="noopener noreferrer">
            The Book Fairies
          </a>{" "}
          — a non-commercial concept exploring what their web presence could look like in 2026.
          The books, covers, and drop locations shown here are fictional.
          All real Book Fairies activity lives on the official site.
        </p>
      </header>

      {/* ── 2. FAQ — THIS SITE ──────────────────────────────────── */}
      <section aria-labelledby="faq-site-title">
        <h2 id="faq-site-title" className="about-page__section-title">
          Questions about this site
        </h2>
        {FAQ_SITE.map((item, index) => (
          <FaqItem
            key={item.q}
            q={item.q}
            a={item.a}
            defaultOpen={index === 0}
          />
        ))}
      </section>

      {/* ── 3. VIDEO ─────────────────────────────────────────────── */}
      <section className="about-page__video-section" aria-label="Book Fairies video">
        <p className="eyebrow">In their own words</p>
        <LazyVideo videoId={ABOUT_VIDEO.id} title={ABOUT_VIDEO.title} />
      </section>

      {/* ── 4. ABOUT THE OFFICIAL PROJECT ───────────────────────── */}
      <section aria-labelledby="about-project-title">
        <p className="eyebrow">About the project</p>
        <h2 id="about-project-title" className="about-page__section-title">
          The Book Fairies, in brief.
        </h2>
        <p className="about-page__project-intro">
          Founded in March 2017 by{" "}
          <a href={ABOUT_URL} target="_blank" rel="noopener noreferrer">
            Cordelia Oxley
          </a>
          , The Book Fairies is a global movement: readers who hide finished books in
          public places, with an official sticker inviting whoever finds it to
          take it, read it, and pass it on. Over 17,000 fairies in more than
          100 countries.
        </p>
      </section>

      {/* ── 5. FAQ — OFFICIAL PROJECT ───────────────────────────── */}
      <section aria-labelledby="faq-project-title">
        <h2 id="faq-project-title" className="about-page__section-title">
          Questions about The Book Fairies
        </h2>
        {FAQ_PROJECT.map((item) => (
          <FaqItem key={item.q} q={item.q} a={item.a} />
        ))}
        {/* 官方 FAQ 最全，引导过去 */}
        <p className="about-page__official-link">
          More questions?{" "}
          <a
            href="https://ibelieveinbookfairies.com/the-book-fairies-frequently-asked-questions/"
            target="_blank"
            rel="noopener noreferrer"
          >
            See the official FAQ →
          </a>
        </p>
      </section>

      {/* ── 6. CTA ───────────────────────────────────────────────── */}
      <section className="about-page__cta" aria-label="Get involved">
        <p className="about-page__cta-text">
          Ready to leave a book for a stranger?
        </p>
        <a
          className="about-page__cta-link"
          href={STICKERS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get stickers from the official shop →
        </a>
      </section>

    </main>
  );
}