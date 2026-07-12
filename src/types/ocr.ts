import type { Form6Data } from "./form6";

export type OcrProgressPhase =
  | "idle"
  | "preparing"
  | "processing"
  | "completed"
  | "error";

export interface OcrProgress {
  phase: OcrProgressPhase;
  message: string;
  /** Progress percentage (0-100) */
  percent: number;
}

export interface OcrResult {
  /**
   * Raw JSON returned by Gemini
   */
  rawText: string;

  /**
   * Extracted Form-6 fields
   */
  formData: Form6Data;

  /**
   * Extraction confidence
   */
  confidence: number;

  /**
   * Processing time in milliseconds
   */
  processingTime: number;

  /**
   * Number of processed pages
   */
  pages: number;
}

export type SupportedForm6MimeType =
  | "image/jpeg"
  | "image/jpg"
  | "image/png"
  | "application/pdf";

export const FORM6_ACCEPTED_MIME_TYPES: SupportedForm6MimeType[] = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];

export const FORM6_ACCEPTED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".pdf",
] as const;

export const FORM6_FILE_INPUT_ACCEPT = "image/*,.pdf";

export const FORM6_DOCUMENT_LABEL = "Indian Election SIR Form-6";