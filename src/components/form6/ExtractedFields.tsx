import { Copy, RefreshCw, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";

import type { OcrResult } from "@/types/ocr";

interface Props {
  result: OcrResult;
  onRetry: () => void;
  isRetrying?: boolean;
}

export function ExtractedFields({
  result,
  onRetry,
  isRetrying = false,
}: Props) {
  const fields = Object.entries(result.formData).filter(
    ([, value]) =>
      value !== null &&
      value !== undefined &&
      String(value).trim() !== ""
  );

  const copyValue = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Copy failed");
    }
  };

  const copyAll = async () => {
    try {
      const text = fields
        .map(([key, value]) => `${beautify(key)} : ${value}`)
        .join("\n");

      await navigator.clipboard.writeText(text);

      toast.success("All details copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <Card>

      <CardHeader>

        <CardTitle className="flex items-center gap-2">

          <CheckCircle2 className="text-green-600" />

          Extracted Details

        </CardTitle>

        <CardDescription>

          Review and copy any field individually.

        </CardDescription>

      </CardHeader>

      <div className="space-y-4">

        {fields.map(([key, value]) => (

          <div
            key={key}
            className="rounded-xl border border-surface-200 p-4 bg-white shadow-sm"
          >

            <label className="mb-2 block text-sm font-semibold text-surface-600">

              {beautify(key)}

            </label>

            <div className="flex gap-3">

              <input
                readOnly
                value={String(value)}
                className="flex-1 rounded-lg border border-surface-300 px-3 py-2 bg-surface-50"
              />

              <Button
                variant="outline"
                onClick={() =>
                  copyValue(beautify(key), String(value))
                }
              >
                <Copy className="size-4" />
              </Button>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        <Button onClick={copyAll}>

          <Copy className="size-4" />

          Copy All

        </Button>

        <Button
          variant="secondary"
          onClick={onRetry}
          isLoading={isRetrying}
        >

          <RefreshCw className="size-4" />

          Extract Again

        </Button>

      </div>

    </Card>
  );
}

function beautify(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase());
}