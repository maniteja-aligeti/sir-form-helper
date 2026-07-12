import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  Form6FileUpload,
  OcrProgressDisplay,
} from '@/components/form6'

import { ExtractedFields } from '@/components/form6/ExtractedFields'
import { Container } from '@/components/ui/Container'
import { useForm6Ocr } from '@/hooks/useForm6Ocr'
import { validateForm6File } from '@/services/ocrService'
import { FORM6_DOCUMENT_LABEL } from '@/types/ocr'

export function Form6OcrPage() {
  const { file, result, progress, error, isProcessing, selectFile, retry } =
    useForm6Ocr()

  const handleFileSelect = (selectedFile: File) => {
    const validationError = validateForm6File(selectedFile)
    if (validationError) {
      toast.error(validationError)
      return
    }

    selectFile(selectedFile)
  }

  return (
    <div className="pb-12 pt-8 sm:pb-16 sm:pt-12">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
              <FileText className="size-6" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold text-surface-900 sm:text-3xl">
              Form-6 OCR
            </h1>
            <p className="mt-2 text-sm text-surface-600 sm:text-base">
              {FORM6_DOCUMENT_LABEL} — upload, scan, and view raw OCR output.
              All data stays in your browser.
            </p>
          </div>

          <div className="space-y-6">
            <Form6FileUpload
              onFileSelect={handleFileSelect}
              disabled={isProcessing}
            />

            <OcrProgressDisplay progress={progress} fileName={file?.name} />

            {error && (
              <div
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {error}
              </div>
            )}

            {result && (
              <ExtractedFields
                result={result}
                onRetry={retry}
                isRetrying={isProcessing}
              />
            )}
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
