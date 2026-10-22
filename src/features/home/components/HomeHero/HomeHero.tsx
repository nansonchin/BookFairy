// src/features/home/components/HomeHero/HomeHero.tsx

import { LinkButton } from "../../../../shared/components/LinkButton/LinkButton";
import { STICKERS_URL } from "../../../../shared/lib/links";
import type { Look } from "../../../runway/domain/runwaySchema";
import { BookWall } from "../../../runway/components/BookWall/BookWall";
import "./HomeHero.scss";

type HomeHeroProps = {
  readonly looks: readonly Look[] | null;
};

export function HomeHero({ looks }: HomeHeroProps) {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero__backdrop" aria-hidden="true">
        {looks && <BookWall looks={looks} />}
        <div className="home-hero__glow" />
        <div className="home-hero__vignette" />
      </div>

      <div className="container home-hero__inner">
        <p className="eyebrow">Free books, left in the wild</p>

        <h1 id="home-title" className="home-hero__headline">
          <span className="home-hero__line">
            <i data-hero-line>Read it.</i>
          </span>
          <span className="home-hero__line">
            <i data-hero-line>Leave it.</i>
          </span>
          <span className="home-hero__line">
            <i data-hero-line>
              <em>Pass it on.</em>
            </i>
          </span>
        </h1>

        <p className="home-hero__lede">
          The Book Fairies are readers who hide the books they’ve finished in public places, free for whoever finds them
          next.
        </p>

        <div className="home-hero__actions">
          <LinkButton to="/latest">See the latest drops</LinkButton>
          <LinkButton href={STICKERS_URL} variant="ghost">
            Become a book fairy
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
