export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(s: unknown): s is string {
  return (
    typeof s === "string" &&
    s.length >= 1 &&
    s.length <= 100 &&
    SLUG_RE.test(s)
  );
}

export function parseBool(
  v: string | null
): true | false | undefined | "invalid" {
  if (v === null) return undefined;
  if (v === "true") return true;
  if (v === "false") return false;
  return "invalid";
}

export function parseLimit(
  v: string | null,
  def = 24,
  max = 100
): number | "invalid" {
  if (v === null) return def;
  if (!/^\d+$/.test(v)) return "invalid";
  const n = Number(v);
  if (!Number.isSafeInteger(n) || n < 1 || n > max) return "invalid";
  return n;
}
