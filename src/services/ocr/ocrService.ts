import { preprocessImage } from "./imagePreprocess";
import { parseForm6 } from "@/parser/form6Parser";
import {
  recognizeImage,
  resetOcrWorker,
} from "./tesseractService";

import type {
  OcrPageResult,
  OcrProgress,
  OcrResult,
} from "@/types/ocr";

/**
 * Converts uploaded image into a canvas.
 */
function fileToCanvas(
  file: File,
): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {

    const url = URL.createObjectURL(file);

    const image = new Image();

    image.onload = () => {

      const canvas = document.createElement("canvas");

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const ctx = canvas.getContext("2d");

      if (!ctx) {

        URL.revokeObjectURL(url);

        reject(
          new Error("Unable to create canvas.")
        );

        return;
      }

      ctx.drawImage(image, 0, 0);

      URL.revokeObjectURL(url);

      resolve(canvas);
    };

    image.onerror = () => {

      URL.revokeObjectURL(url);

      reject(
        new Error(
          "Unable to load selected image."
        )
      );
    };

    image.src = url;

  });
}

/**
 * JPG JPEG PNG only
 */
export function validateForm6File(
  file: File,
): string | null {

  const ok =

    file.type === "image/jpeg" ||

    file.type === "image/png" ||

    file.type === "image/jpg";

  if (!ok) {

    return "Only JPG, JPEG and PNG images are supported.";

  }

  return null;

}

/**
 * Merge OCR pages
 */
function mergePages(
  pages: OcrPageResult[],
): string {

  return pages
    .map((page) => page.text)
    .join("\n\n");

}

/**
 * Average confidence
 */
function averageConfidence(
  pages: OcrPageResult[],
): number {

  if (!pages.length) {

    return 0;

  }

  const total = pages.reduce(

    (sum, page) => sum + page.confidence,

    0

  );

  return Math.round(
    total / pages.length
  );

}

/**
 * Main OCR
 */
export async function runForm6Ocr(

  file: File,

  onProgress: (
    progress: OcrProgress
  ) => void,

): Promise<OcrResult> {

  const error = validateForm6File(file);

  if (error) {

    throw new Error(error);

  }

  const started = performance.now();

  onProgress({

    phase: "preparing",

    message: "Preparing...",

    percent: 0,

  });

  /**
   * Image
   */

  const originalCanvas =
    await fileToCanvas(file);

  /**
   * Improve image
   */

  const processedCanvas =
    await preprocessImage(
      originalCanvas
    );

  onProgress({

    phase: "recognizing",

    message: "Recognizing...",

    percent: 5,

  });

  const result =
    await recognizeImage(

      processedCanvas,

      (workerProgress) => {

        onProgress({

          phase: "recognizing",

          message: "Recognizing...",

          percent: workerProgress.percent,

        });

      }

    );
      const pages: OcrPageResult[] = [
    {
      pageNumber: 1,
      text: result.text.trim(),
      confidence: result.confidence,
    },
  ];

  onProgress({
    phase: "completed",
    message: "Completed",
    percent: 100,
  });

  const processingTimeMs =
    Math.round(performance.now() - started);

  const rawText = mergePages(pages);

const parsed = parseForm6(rawText);

return {

  text: rawText,

  parsed,

  confidence: averageConfidence(pages),

  processingTimeMs,

  pageCount:1,

  pages

}

}

/**
 * Retry OCR
 */
export async function retryForm6Ocr(
  file: File,
  onProgress: (
    progress: OcrProgress
  ) => void,
): Promise<OcrResult> {

  await resetOcrWorker();

  return runForm6Ocr(
    file,
    onProgress,
  );

}

/**
 * Cleanup
 */
export async function terminateForm6Ocr() {

  await resetOcrWorker();

}