import type { CSSProperties } from "react";

type CssVarName = `--${string}`;

export function cssVars(vars: Readonly<Record<CssVarName, string | number>>): CSSProperties {
  return vars as CSSProperties;
}