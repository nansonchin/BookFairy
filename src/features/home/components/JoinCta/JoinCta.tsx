// src/features/home/components/JoinCta/JoinCta.tsx

import { LinkButton } from "../../../../shared/components/LinkButton/LinkButton";
import { ABOUT_URL, STICKERS_URL } from "../../../../shared/lib/links";
import "./JoinCta.scss";

export function JoinCta() {
  return (
    <section className="join container" aria-labelledby="join-title" data-reveal>
      <h2 id="join-title" className="join__title">
        Anyone can be a book fairy.
      </h2>
      <p className="join__text">All you need is a book to give away and an official sticker.</p>
      <div className="join__actions">
        <LinkButton href={STICKERS_URL}>Get stickers</LinkButton>
        <LinkButton href={ABOUT_URL} variant="ghost">
          About the project
        </LinkButton>
      </div>
    </section>
  );
}
