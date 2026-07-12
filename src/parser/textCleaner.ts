/**
 * Cleans OCR text before parsing.
 * Removes unnecessary spaces, normalizes line endings,
 * and fixes common OCR mistakes.
 */

export function cleanOcrText(text: string): string {
  return text
    // Normalize line endings
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")

    // Convert tabs to spaces
    .replace(/\t/g, " ")

    // Collapse multiple spaces
    .replace(/[ ]{2,}/g, " ")

    // Remove empty lines
    .replace(/\n{2,}/g, "\n")

    // Common OCR symbol cleanup
    .replace(/[|]/g, "I")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")

    // Remove strange control characters
    .replace(/[^\x20-\x7E\n]/g, " ")

    // Normalize common OCR mistakes
    .replace(/Aadhar/gi, "Aadhaar")
    .replace(/Adhar/gi, "Aadhaar")
    .replace(/Moblie/gi, "Mobile")
    .replace(/Mobiie/gi, "Mobile")
    .replace(/EPIC NO/gi, "EPIC")
    .replace(/EPIC No/gi, "EPIC")

    .trim();
}