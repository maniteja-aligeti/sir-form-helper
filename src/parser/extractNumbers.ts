/**
 * Mobile Number
 */
export function extractPhone(text: string): string {
  const cleaned = text.replace(/\s+/g, "");

  const match = cleaned.match(/(?:\+91)?[6-9]\d{9}/);

  return match?.[0] ?? "";
}

/**
 * Aadhaar Number
 */
export function extractAadhaar(text: string): string {
  const cleaned = text.replace(/\s+/g, "");

  const match = cleaned.match(/\b\d{12}\b/);

  return match?.[0] ?? "";
}

/**
 * EPIC Number
 */
export function extractEpic(text: string): string {

  const match = text.match(/\b[A-Z]{3}\d{7}\b/i);

  return match?.[0]?.toUpperCase() ?? "";

}

/**
 * PIN Code
 */
export function extractPin(text: string): string {

  const match = text.match(/\b\d{6}\b/);

  return match?.[0] ?? "";

}

/**
 * Age
 */
export function extractAge(text: string): string {

  const match = text.match(/\b([1-9][0-9]|100)\b/);

  return match?.[0] ?? "";

}

/**
 * Date of Birth
 */
export function extractDob(text: string): string {

  const match = text.match(
    /\b\d{2}[\/\-]\d{2}[\/\-]\d{4}\b/,
  );

  return match?.[0] ?? "";

}