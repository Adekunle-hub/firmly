// utils/formatDateTime.ts
export function formatDateTime(): string {
  const now = new Date();
  const date = new Intl.DateTimeFormat("en-US", {
    month: "long", day: "numeric", year: "numeric",
  }).format(now);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true,
  }).format(now).replace(" AM", "am").replace(" PM", "pm");
  return `${date} • ${time}`;
}