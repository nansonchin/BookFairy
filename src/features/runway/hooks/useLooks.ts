import { useEffect, useState } from "react";
import type { Look } from "../domain/runwaySchema";
import { fetchLooks } from "../data/runwayRespository";

export type LooksState =
  | { readonly status: "loading" }
  | { readonly status: "ready"; readonly looks: readonly Look[] }
  | { readonly status: "error"; readonly error: Error };

function toError(value: unknown): Error {
  return value instanceof Error ? value : new Error(String(value));
}

export function useLooks(): LooksState {
  const [state, setState] = useState<LooksState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetchLooks().then(
      (looks) => {
        if (!cancelled) setState({ status: "ready", looks });
      },
      (error: unknown) => {
        if (!cancelled) setState({ status: "error", error: toError(error) });
      }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}