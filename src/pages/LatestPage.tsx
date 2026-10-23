import { RunwayList } from "../features/runway/components/RunwayList/RunwayList";
import { RunwayStage } from "../features/runway/components/RunwayStage/RunwayStage";
import { useLooksState } from "../features/runway/context/LooksContext";
import { usePrefersReducedMotion } from "../shared/hooks/usePrefersReducedMotion";

export function LatestPage() {
  const state = useLooksState();
  const reducedMotion = usePrefersReducedMotion();

  if (state.status === "loading") return <p className="status">Backstage...</p>;

  if (state.status === "error") {
    return (
      <p className="status" role="alert">
        Could not load the latest drops: {state.error.message}
      </p>
    );
  }

  return (
    <main>
      <h1 className="sr-only">The Book Fairies: latest drops</h1>
      {reducedMotion ? <RunwayList looks={state.looks} /> : <RunwayStage looks={state.looks} />}
    </main>
  );
}