import { Copy, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import type { OcrResult } from "@/types/ocr";
import { cn } from "@/utils/cn";

interface RawOcrOutputProps {
  result: OcrResult;
  onRetry: () => void;
  isRetrying?: boolean;
  className?: string;
}

function formatProcessingTime(ms: number): string {
  if (ms < 1000) return `${ms} ms`;
  return `${(ms / 1000).toFixed(1)} s`;
}

export function RawOcrOutput({
  result,
  onRetry,
  isRetrying = false,
  className,
}: RawOcrOutputProps) {
  const formattedJson = JSON.stringify(result.formData, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);
      toast.success("Extracted data copied.");
    } catch {
      toast.error("Failed to copy.");
    }
  };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Gemini Extraction Result</CardTitle>

        <CardDescription>
          Structured JSON extracted from the uploaded Form-6.
        </CardDescription>
      </CardHeader>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Metric
          label="Confidence"
          value={`${result.confidence.toFixed(1)}%`}
        />

        <Metric
          label="Processing Time"
          value={formatProcessingTime(result.processingTime)}
        />

        <Metric
          label="Pages"
          value={String(result.pages)}
        />
      </div>

      <div className="mt-6">
        <label
          className="mb-2 block text-sm font-medium text-surface-700"
        >
          Extracted JSON
        </label>

        <textarea
          readOnly
          rows={16}
          value={formattedJson}
          className={cn(
            "w-full rounded-lg border border-surface-300",
            "bg-surface-50",
            "px-3 py-3",
            "font-mono text-xs",
            "resize-y"
          )}
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">

        <Button
          type="button"
          variant="outline"
          onClick={handleCopy}
        >
          <Copy className="size-4" />
          Copy JSON
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={onRetry}
          disabled={isRetrying}
          isLoading={isRetrying}
        >
          <RefreshCw className="size-4" />
          Extract Again
        </Button>

      </div>
    </Card>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-surface-200 bg-surface-50 px-4 py-3">
      <p className="text-xs uppercase font-medium tracking-wide text-surface-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold">
        {value}
      </p>
    </div>
  );
}