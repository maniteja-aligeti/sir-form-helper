import { createWorker, type Worker } from 'tesseract.js'
import type { OcrProgress } from '@/types/ocr'

let worker: Worker | null = null

async function getWorker(
  onProgress?: (progress: OcrProgress) => void,
): Promise<Worker> {
  if (worker) return worker

  worker = await createWorker('eng', 1, {
    logger: (m) => {
      if (!onProgress) return

      onProgress({
        phase:
          m.status === 'recognizing text'
            ? 'recognizing'
            : 'preparing',
        message:
          m.status === 'recognizing text'
            ? 'Recognizing...'
            : 'Preparing...',
        percent: Math.round((m.progress ?? 0) * 100),
      })
    },
  })

  return worker
}

export async function recognizeImage(
  source: HTMLImageElement | HTMLCanvasElement,
  onProgress?: (progress: OcrProgress) => void,
) {
  const w = await getWorker(onProgress)

  const result = await w.recognize(source)

  return {
    text: result.data.text,
    confidence: result.data.confidence,
  }
}

export async function terminateOcrWorker() {
  if (worker) {
    await worker.terminate()
    worker = null
  }
}

export async function resetOcrWorker() {
  await terminateOcrWorker()
}