// src/shared/components/LinkButton/LinkButton.tsx
// 责任：站内跳转用 <Link>，站外跳转用 <a target=_blank>，样式统一。

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./LinkButton.scss";

type LinkButtonProps = {
  readonly variant?: "solid" | "ghost";
  readonly children: ReactNode;
} & ({ readonly to: string; readonly href?: never } | { readonly href: string; readonly to?: never });

export function LinkButton(props: LinkButtonProps) {
  const { variant = "solid", children } = props;
  const className = `link-button link-button--${variant}`;

  if (props.to !== undefined) {
    return (
      <Link className={className} to={props.to}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={props.href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
