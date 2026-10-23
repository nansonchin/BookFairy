// src/pages/LatestPage.tsx
// 责任：「最新放出的书」页——就是之前的走秀。持有「当前打开了哪本书的详情」。

import { useCallback, useState } from "react";
import { DropDetail } from "../features/runway/components/DropDetail/DropDetail";
import { RunwayList } from "../features/runway/components/RunwayList/RunwayList";
import { RunwayStage } from "../features/runway/components/RunwayStage/RunwayStage";
import type { DropSelection, SelectDrop } from "../features/runway/domain/selection";
import { useLooks } from "../features/runway/hooks/useLooks";
import { usePrefersReducedMotion } from "../shared/hooks/usePrefersReducedMotion";
import { useLooksState } from "../features/runway/context/LooksContext";

export function LatestPage() {
  const state = useLooksState();
  const reducedMotion = usePrefersReducedMotion();
  const [selected, setSelected] = useState<DropSelection | null>(null);

  const select = useCallback<SelectDrop>((look, origin) => setSelected({ look, origin }), []);
  const closeDetail = useCallback(() => setSelected(null), []);

  if (state.status === "loading") return <p className="status">Backstage...</p>;

  if (state.status === "error") {
    return (
      <p className="status" role="alert">
        Could not load the latest drops: {state.error.message}
      </p>
    );
  }

  return (
    <>
      <main>
        <h1 className="sr-only">The Book Fairies: latest drops</h1>
        {reducedMotion ? (
          <RunwayList looks={state.looks} onSelect={select} />
        ) : (
          <RunwayStage looks={state.looks} onSelect={select} />
        )}
      </main>

      <DropDetail selection={selected} onClose={closeDetail} />
    </>
  );
}
