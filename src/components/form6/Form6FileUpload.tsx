import { useRef } from 'react'
import { Camera, FileUp, Upload } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { FORM6_DOCUMENT_LABEL, FORM6_FILE_INPUT_ACCEPT } from '@/types/ocr'
import { cn } from '@/utils/cn'

interface Form6FileUploadProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
  className?: string
}

export function Form6FileUpload({
  onFileSelect,
  disabled = false,
  className,
}: Form6FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      onFileSelect(selectedFile)
    }
    event.target.value = ''
  }

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className={cn(className)}>
      <CardHeader className="mb-0">
        <CardTitle>Upload Form-6</CardTitle>
        <CardDescription>
          Upload or capture an {FORM6_DOCUMENT_LABEL} document. Supported formats:
          JPG, JPEG, PNG, PDF. All processing happens locally in your browser.
        </CardDescription>
      </CardHeader>

      <div className="mt-6 flex flex-col gap-4">
        <div
          className={cn(
            'flex flex-col items-center justify-center rounded-xl border-2 border-dashed',
            'border-surface-300 bg-surface-50 px-6 py-10 text-center',
            'transition-colors',
            !disabled && 'hover:border-primary-400 hover:bg-primary-50/50',
            disabled && 'opacity-60',
          )}
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-primary-100 text-primary-600">
            <Upload className="size-7" aria-hidden="true" />
          </div>
          <p className="mt-4 text-sm font-medium text-surface-800">
            Select or capture a Form-6 document
          </p>
          <p className="mt-1 text-xs text-surface-500">
            Camera capture works on Android Chrome
          </p>

          <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              type="button"
              onClick={openFilePicker}
              disabled={disabled}
              className="w-full sm:w-auto"
            >
              <FileUp className="size-4" aria-hidden="true" />
              Choose File
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={openFilePicker}
              disabled={disabled}
              className="w-full sm:w-auto"
            >
              <Camera className="size-4" aria-hidden="true" />
              Capture with Camera
            </Button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={FORM6_FILE_INPUT_ACCEPT}
          capture="environment"
          onChange={handleFileChange}
          disabled={disabled}
          className="sr-only"
          aria-label="Upload or capture Form-6 document"
        />
      </div>
    </Card>
  )
}
