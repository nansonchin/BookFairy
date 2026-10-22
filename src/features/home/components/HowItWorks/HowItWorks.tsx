// src/features/home/components/HowItWorks/HowItWorks.tsx

import { STEPS } from "../../data/homeContent";
import "./HowItWorks.scss";

export function HowItWorks() {
  return (
    <section className="how container" aria-labelledby="how-title">
      <p className="eyebrow">How it works</p>
      <h2 id="how-title" className="how__title" data-reveal>
        Three steps. <em>No catch.</em>
      </h2>

      <ol className="how__steps">
        {STEPS.map((step) => (
          <li key={step.no} className="how__step" data-reveal>
            <span className="how__no">{step.no}</span>
            <h3 className="how__name">{step.title}</h3>
            <p className="how__text">{step.text}</p>
          </li>
        ))}
      </ol>

      <p className="how__note" data-reveal>
        The sticker on every book invites whoever finds it to take it home, read it, and leave it for the next person.
      </p>
    </section>
  );
}
