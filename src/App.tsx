// src/App.tsx
// 责任：决定「现在该显示什么」：加载中、出错，还是走秀（或它的降级版本）。

import { RunwayList } from "./features/runway/components/RunwayList/RunwayList";
import { RunwayStage } from "./features/runway/components/RunwayStage/RunwayStage";
import { useLooks } from "./features/runway/hooks/useLooks";
import { usePrefersReducedMotion } from "./shared/hooks/usePrefersReducedMotion";
import "./App.scss";

export default function App() {
  const state = useLooks();
  const reducedMotion = usePrefersReducedMotion();

  if (state.status === "loading") return <p className="status">Backstage...</p>;

  if (state.status === "error") {
    return (
      <p className="status" role="alert">
        Could not load the runway: {state.error.message}
      </p>
    );
  }

  return (
    <>
      <main>
        <h1 className="sr-only">The Book Fairies Runway</h1>
        {reducedMotion ? <RunwayList looks={state.looks} /> : <RunwayStage looks={state.looks} />}
      </main>

      <footer className="app-end">
        <p>An unofficial concept design for The Book Fairies. Every book and cover shown here is fictional.</p>
      </footer>
    </>
  );
} 