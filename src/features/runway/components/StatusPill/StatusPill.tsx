// src/features/runway/components/StatusPill/StatusPill.tsx
// 责任：用一个小圆点告诉用户这本书「还在等人」还是「已经被找到」。

import type { DropStatus } from "../../domain/runwaySchema";
import "./StatusPill.scss";

const LABEL: Record<DropStatus, string> = {
  waiting: "Still waiting",
  found: "Found by a reader",
};

type StatusPillProps = {
  readonly status: DropStatus;
};

export function StatusPill({ status }: StatusPillProps) {
  return (
    <p className={`status-pill status-pill--${status}`}>
      <span className="status-pill__dot" aria-hidden="true" />
      {LABEL[status]}
    </p>
  );
}
