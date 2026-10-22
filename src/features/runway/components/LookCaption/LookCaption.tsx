// src/features/runway/components/LookCaption/LookCaption.tsx

import { formatLookNumber } from "../../domain/format";
import type { Look } from "../../domain/runwaySchema";
import { StatusPill } from "../StatusPill/StatusPill";
import "./LookCaption.scss";

type LookCaptionProps = {
  readonly look: Pick<Look, "number" | "collection" | "concept" | "backstage" | "status">;
};

export function LookCaption({ look }: LookCaptionProps) {
  return (
    <div className="look-caption">
      <p className="look-caption__no">
        Look {formatLookNumber(look.number)} · {look.collection.name}
      </p>
      <p className="look-caption__concept">{look.concept}</p>
      <p className="look-caption__backstage">{look.backstage}</p>
      <StatusPill status={look.status} />
    </div>
  );
}