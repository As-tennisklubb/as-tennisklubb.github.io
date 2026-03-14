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

export function formatSignupStatus(allowsSignup: boolean, signupCount: number): string {
  if (!allowsSignup) return "Ingen påmelding";
  if (signupCount === 0) return "Påmelding åpen";
  if (signupCount === 1) return "1 påmeldt";
  return `${signupCount} påmeldte`;
}
