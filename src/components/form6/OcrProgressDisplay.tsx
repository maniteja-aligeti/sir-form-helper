import { CheckCircle2, Loader2 } from 'lucide-react'
import type { OcrProgress } from '@/types/ocr'
import { cn } from '@/utils/cn'

interface OcrProgressDisplayProps {
  progress: OcrProgress
  fileName?: string | null
  className?: string
}

export function OcrProgressDisplay({
  progress,
  fileName,
  className,
}: OcrProgressDisplayProps) {
  const isActive =
    progress.phase === 'preparing' || progress.phase === 'processing'
  const isCompleted = progress.phase === 'completed'

  if (progress.phase === 'idle') {
    return null
  }

  return (
    <div
      className={cn(
        'rounded-xl border border-surface-200 bg-white p-5 shadow-sm',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        {isCompleted ? (
          <CheckCircle2 className="size-5 shrink-0 text-green-600" aria-hidden="true" />
        ) : (
          <Loader2
            className={cn(
              'size-5 shrink-0 text-primary-600',
              isActive && 'animate-spin',
            )}
            aria-hidden="true"
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-surface-900">
            {progress.message}
          </p>
          {fileName && (
            <p className="mt-0.5 truncate text-xs text-surface-500">{fileName}</p>
          )}
        </div>
        {isActive && (
          <span className="text-sm font-semibold tabular-nums text-primary-600">
            {progress.percent}%
          </span>
        )}
      </div>

      {isActive && (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-200">
          <div
            className="h-full rounded-full bg-primary-600 transition-all duration-300 ease-out"
            style={{ width: `${progress.percent}%` }}
            role="progressbar"
            aria-valuenow={progress.percent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      )}
    </div>
  )
}
