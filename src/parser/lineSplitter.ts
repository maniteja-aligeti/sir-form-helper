/**
 * Splits cleaned OCR text into usable lines.
 */

export function splitLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/**
 * Returns first line containing keyword.
 */
export function findLine(
  lines: string[],
  keyword: string,
): string | undefined {
  return lines.find((line) =>
    line.toLowerCase().includes(keyword.toLowerCase()),
  );
}

/**
 * Returns line after keyword.
 */
export function valueAfter(
  lines: string[],
  keyword: string,
): string {
  const index = lines.findIndex((line) =>
    line.toLowerCase().includes(keyword.toLowerCase()),
  );

  if (index === -1) return "";

  return lines[index + 1] ?? "";
}

/**
 * Returns all lines between two keywords.
 */
export function between(
  lines: string[],
  start: string,
  end: string,
): string[] {
  const s = lines.findIndex((l) =>
    l.toLowerCase().includes(start.toLowerCase()),
  );

  const e = lines.findIndex((l) =>
    l.toLowerCase().includes(end.toLowerCase()),
  );

  if (s === -1 || e === -1 || e <= s) return [];

  return lines.slice(s + 1, e);
}