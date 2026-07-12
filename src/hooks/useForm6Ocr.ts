import { useCallback, useState } from 'react'
import { extractFormData } from '@/services/geminiApi'
import type { OcrProgress, OcrResult } from '@/types/ocr'

const IDLE_PROGRESS: OcrProgress = {
  phase: 'idle',
  message: '',
  percent: 0,
}

export function useForm6Ocr() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<OcrResult | null>(null)
  const [progress, setProgress] = useState<OcrProgress>(IDLE_PROGRESS)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const processFile = useCallback(async (selectedFile: File) => {
    setFile(selectedFile)
    setResult(null)
    setError(null)
    setIsProcessing(true)

    setProgress({
      phase: 'preparing',
      message: 'Preparing image...',
      percent: 10,
    })

    try {
      setProgress({
        phase: 'processing',
        message: 'Extracting data using Gemini...',
        percent: 50,
      })

      const response = await extractFormData(selectedFile)

      const ocrResult: OcrResult = {
        rawText: JSON.stringify(response.data, null, 2),
        confidence: 100,
        processingTime: 0,
        pages: 1,
        formData: response.data,
      }

      setResult(ocrResult)

      setProgress({
        phase: 'completed',
        message: 'Extraction completed successfully.',
        percent: 100,
      })
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Extraction failed.'

      setError(message)

      setProgress({
        phase: 'error',
        message,
        percent: 0,
      })
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const selectFile = useCallback(
    (selectedFile: File) => {
      void processFile(selectedFile)
    },
    [processFile],
  )

  const retry = useCallback(() => {
    if (file) {
      void processFile(file)
    }
  }, [file, processFile])

  const reset = useCallback(() => {
    setFile(null)
    setResult(null)
    setError(null)
    setIsProcessing(false)
    setProgress(IDLE_PROGRESS)
  }, [])

  return {
    file,
    result,
    progress,
    error,
    isProcessing,
    selectFile,
    retry,
    reset,
  }
}