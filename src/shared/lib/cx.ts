type ClassPart = string | false | null | undefined;

export function cx(...parts: readonly ClassPart[]): string {
  return parts.filter(Boolean).join(" ");
}