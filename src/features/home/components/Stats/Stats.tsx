// src/features/home/components/Stats/Stats.tsx

import { STATS } from "../../data/homeContent";
import "./Stats.scss";

export function Stats() {
  return (
    <section className="stats container" aria-label="Book fairies in numbers">
      <dl className="stats__list" data-reveal>
        {STATS.map((stat) => (
          <div key={stat.label} className="stats__item">
            <dt className="stats__label">{stat.label}</dt>
            <dd className="stats__value">{stat.value}</dd>
          </div>
        ))}
      </dl>
      <p className="eyebrow stats__source">Figures from the official Book Fairies site</p>
    </section>
  );
}
