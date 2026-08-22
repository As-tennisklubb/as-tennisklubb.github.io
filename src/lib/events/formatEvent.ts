function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateRange(startDate: string, endDate: string): string {
  if (startDate === endDate) {
    return parseLocalDate(startDate).toLocaleDateString("no-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  const start = parseLocalDate(startDate).toLocaleDateString("no-NO", {
    day: "numeric",
    month: "long",
  });
  const end = parseLocalDate(endDate).toLocaleDateString("no-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${start} – ${end}`;
}

const WEEKDAY_MAP: Record<string, string> = {
  Monday: "Mandag",
  Tuesday: "Tirsdag",
  Wednesday: "Onsdag",
  Thursday: "Torsdag",
  Friday: "Fredag",
  Saturday: "Lørdag",
  Sunday: "Søndag",
};

export function formatWeekday(day: string): string {
  return WEEKDAY_MAP[day] ?? day;
}

export function formatNaturalList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return items.slice(0, -1).join(", ") + " og " + items[items.length - 1];
}
