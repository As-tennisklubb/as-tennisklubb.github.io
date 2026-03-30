/**
 * Delte Tailwind class maps for primitives.
 *
 * Brukes av Box, VStack, HStack, HGrid og andre primitives
 * for å mappe prop-verdier til eksplisitte, statiske Tailwind-klasser.
 *
 * VIKTIG: Ikke bruk template strings som `gap-${n}` – Tailwind scanner
 * statisk kildekode og finner ikke dynamisk genererte klasser.
 */

/* ───── Spacing: gap ───── */

export const gapClass: Record<string, string> = {
  "0": "gap-0",
  "0.5": "gap-0.5",
  "1": "gap-1",
  "1.5": "gap-1.5",
  "2": "gap-2",
  "2.5": "gap-2.5",
  "3": "gap-3",
  "3.5": "gap-3.5",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
  "7": "gap-7",
  "8": "gap-8",
  "9": "gap-9",
  "10": "gap-10",
  "11": "gap-11",
  "12": "gap-12",
  "14": "gap-14",
  "16": "gap-16",
};

/* ───── Spacing: padding ───── */

export const paddingClass: Record<string, string> = {
  "0": "p-0",
  "0.5": "p-0.5",
  "1": "p-1",
  "1.5": "p-1.5",
  "2": "p-2",
  "2.5": "p-2.5",
  "3": "p-3",
  "3.5": "p-3.5",
  "4": "p-4",
  "5": "p-5",
  "6": "p-6",
  "7": "p-7",
  "8": "p-8",
  "9": "p-9",
  "10": "p-10",
  "11": "p-11",
  "12": "p-12",
  "14": "p-14",
  "16": "p-16",
};

export const paddingInlineClass: Record<string, string> = {
  "0": "px-0",
  "0.5": "px-0.5",
  "1": "px-1",
  "1.5": "px-1.5",
  "2": "px-2",
  "2.5": "px-2.5",
  "3": "px-3",
  "3.5": "px-3.5",
  "4": "px-4",
  "5": "px-5",
  "6": "px-6",
  "7": "px-7",
  "8": "px-8",
  "9": "px-9",
  "10": "px-10",
  "11": "px-11",
  "12": "px-12",
  "14": "px-14",
  "16": "px-16",
};

export const paddingBlockClass: Record<string, string> = {
  "0": "py-0",
  "0.5": "py-0.5",
  "1": "py-1",
  "1.5": "py-1.5",
  "2": "py-2",
  "2.5": "py-2.5",
  "3": "py-3",
  "3.5": "py-3.5",
  "4": "py-4",
  "5": "py-5",
  "6": "py-6",
  "7": "py-7",
  "8": "py-8",
  "9": "py-9",
  "10": "py-10",
  "11": "py-11",
  "12": "py-12",
  "14": "py-14",
  "16": "py-16",
};

/* ───── Flex alignment ───── */

export const alignItemsClass: Record<string, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
  stretch: "items-stretch",
};

export const justifyContentClass: Record<string, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  "space-between": "justify-between",
  "space-around": "justify-around",
  "space-evenly": "justify-evenly",
};

/* ───── Grid columns (responsive) ───── */

export const gridColsClass: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
};

export const mdGridColsClass: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  7: "md:grid-cols-7",
  8: "md:grid-cols-8",
  9: "md:grid-cols-9",
  10: "md:grid-cols-10",
  11: "md:grid-cols-11",
  12: "md:grid-cols-12",
};

export const lgGridColsClass: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-7",
  8: "lg:grid-cols-8",
  9: "lg:grid-cols-9",
  10: "lg:grid-cols-10",
  11: "lg:grid-cols-11",
  12: "lg:grid-cols-12",
};

export const xlGridColsClass: Record<number, string> = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  5: "xl:grid-cols-5",
  6: "xl:grid-cols-6",
  7: "xl:grid-cols-7",
  8: "xl:grid-cols-8",
  9: "xl:grid-cols-9",
  10: "xl:grid-cols-10",
  11: "xl:grid-cols-11",
  12: "xl:grid-cols-12",
};
