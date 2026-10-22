// src/features/runway/animation/dom.ts
// 责任：安全地从 DOM 里找东西。找不到就立刻报清楚的错，而不是让动画悄悄失效。

export function requireElement(parent: ParentNode, selector: string): HTMLElement {
  const element = parent.querySelector<HTMLElement>(selector);

  if (!element) {
    throw new Error(`[runway] Missing element: ${selector}`);
  }

  return element;
}

export function requireAll<T extends Element = HTMLElement>(parent: ParentNode, selector: string): T[] {
  const elements = Array.from(parent.querySelectorAll<T>(selector));

  if (elements.length === 0) {
    throw new Error(`[runway] Missing elements: ${selector}`);
  }

  return elements;
}

export function readCssVar(element: Element, name: string): string {
  const value = getComputedStyle(element).getPropertyValue(name).trim();

  if (!value) {
    throw new Error(`[runway] CSS variable ${name} is not defined`);
  }

  return value;
}