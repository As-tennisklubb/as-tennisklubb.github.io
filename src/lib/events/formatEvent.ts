import type { EventPresentation } from "./mapPublicEvent";

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

export function formatSignupStatus(allowsSignup: boolean, signupCount: number): string {
  if (!allowsSignup) return "Ingen påmelding";
  if (signupCount === 0) return "Påmelding åpen";
  if (signupCount === 1) return "1 påmeldt";
  return `${signupCount} påmeldte`;
}

// ─────────── Presentasjon-basert formatering ───────────

function formatDateWithMonth(dateStr: string): string {
  return parseLocalDate(dateStr).toLocaleDateString("no-NO", {
    day: "numeric",
    month: "long",
  });
}

function formatCompactDateRange(startDate: string, endDate: string): string {
  if (startDate === endDate) {
    return parseLocalDate(startDate).toLocaleDateString("no-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const start = parseLocalDate(startDate);
  const end = parseLocalDate(endDate);

  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    const endFormatted = formatDateWithMonth(endDate);
    return `${start.getDate()}.–${endFormatted}`;
  }

  return `${formatDateWithMonth(startDate)} – ${formatDateWithMonth(endDate)}`;
}

const WEEKDAY_ORDER: Record<string, number> = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

function formatWeekdayRange(weekdays: string[]): string {
  if (weekdays.length === 0) return "";

  const sorted = [...weekdays].sort((a, b) => (WEEKDAY_ORDER[a] ?? 0) - (WEEKDAY_ORDER[b] ?? 0));
  const names = sorted.map(formatWeekday);

  if (sorted.length >= 2) {
    const first = WEEKDAY_ORDER[sorted[0]] ?? 0;
    const last = WEEKDAY_ORDER[sorted[sorted.length - 1]] ?? 0;
    const isConsecutive = last - first === sorted.length - 1;
    if (isConsecutive) {
      return `${names[0]}–${names[names.length - 1]}`;
    }
  }

  return formatNaturalList(names);
}

export type PresentationLines = {
  date: string;
  schedule: string;
  courts: string;
};

export function formatPresentation(p: EventPresentation): PresentationLines {
  const date = formatCompactDateRange(p.startDate, p.endDate);

  const weekdayPart = formatWeekdayRange(p.weekdays);
  const times = p.times.map((t) => t.substring(0, 5));
  const timePart = times.length > 0 ? "kl.\u00a0" + formatNaturalList(times) : "";

  let schedule: string;
  if (weekdayPart && timePart) {
    schedule = `${weekdayPart} \u00b7 ${timePart}`;
  } else {
    schedule = weekdayPart || timePart;
  }

  const courts = formatNaturalList(p.courtNames);

  return { date, schedule, courts };
}
