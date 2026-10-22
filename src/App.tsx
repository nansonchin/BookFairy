// src/App.tsx
import { useEffect } from "react";
import { BookCover } from "./features/runway/components/BookCover/BookCover";
import { useLooks } from "./features/runway/hooks/useLooks";
import { usePrefersReducedMotion } from "./shared/hooks/usePrefersReducedMotion";
import "./App.scss";
import { cssVars } from "./shared/lib/cssVar";

export default function App() {
  const state = useLooks();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (state.status === "ready") {
      console.log("looks:", state.looks);
    }
  }, [state]);

  if (state.status === "loading") return <p className="status">Backstage...</p>;

  if (state.status === "error") {
    return (
      <p className="status" role="alert">
        Could not load the runway: {state.error.message}
      </p>
    );
  }

  const { looks } = state;

  return (
    <main className="check">
      <h1 className="check__title">The Book Fairies Runway</h1>
      <p className="check__meta">
        {looks.length} looks, reduced motion: {String(reducedMotion)}
      </p>

      <ol className="check__list">
        {looks.map((look) => (
          <li key={look.id} className="check__item" style={cssVars({ "--spotlight": look.spotlight })}>
            <BookCover look={look} />
            <p className="check__no">Look {String(look.number).padStart(2, "0")}</p>
            <p className="check__drop">
              {look.drop.city}, {look.drop.country}
            </p>
          </li>
        ))}
      </ol>
    </main>
  );
}