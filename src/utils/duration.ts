const ISO_DURATION =
  /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:[\d.]+S)?)?$/;

/**
 * Formats an ISO 8601 duration ("P433DT7H14M26S") as "433 d 7 h".
 * Shows the two largest units. Returns null for missing or unparseable input.
 */
export function formatIsoDuration(iso: string | null): string | null {
  if (!iso) return null;

  const match = ISO_DURATION.exec(iso);
  if (!match) return null;

  const [, years, months, days, hours, minutes] = match.map(Number);
  const totalDays = (years || 0) * 365 + (months || 0) * 30 + (days || 0);

  const parts = [
    totalDays && `${totalDays} d`,
    hours && `${hours} h`,
    minutes && `${minutes} m`,
  ].filter(Boolean);

  return parts.length ? parts.slice(0, 2).join(" ") : "0 m";
}
