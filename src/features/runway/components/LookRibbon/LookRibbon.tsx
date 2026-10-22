// src/features/runway/components/LookRibbon/LookRibbon.tsx

import "./LookRibbon.scss";

export function LookRibbon() {
  return (
    <svg className="look-ribbon" viewBox="0 0 200 300" aria-hidden="true" focusable="false">
      <path data-part="ribbon-path" d="M-6 205 L206 205" strokeWidth={9} strokeLinecap="butt" />
      <path data-part="ribbon-path" d="M160 205 C172 182 200 186 190 203 C186 212 170 211 160 205" strokeWidth={5} />
      <path data-part="ribbon-path" d="M160 205 C148 182 120 186 130 203 C134 212 150 211 160 205" strokeWidth={5} />
      <path data-part="ribbon-path" d="M160 205 C163 218 170 226 178 232" strokeWidth={5} />
      <path data-part="ribbon-path" d="M160 205 C155 219 148 227 140 233" strokeWidth={5} />
    </svg>
  );
}