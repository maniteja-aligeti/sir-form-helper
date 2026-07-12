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

const FIELD_ORDER = [
  "applicantName",
  "fatherName",
  "motherName",
  "spouseName",
  "relationName",
  "relationship",
  "gender",
  "dob",
  "age",
  "mobile",
  "aadhaar",
  "epic",
  "houseNo",
  "street",
  "village",
  "mandal",
  "district",
  "state",
  "pincode",
  "partNo",
  "serialNo",
  "pollingStation",
  "bloName",
  "bloMobile",
];

export function ExtractedFields({
  result,
  onRetry,
  isRetrying = false,
}: Props) {
  const formData = result.formData;

  const fields = FIELD_ORDER.filter((key) => {
    const value = formData[key as keyof typeof formData];
    return (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    );
  });

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
        .map((key) => {
          const value = formData[key as keyof typeof formData];
          return `${beautify(key)} : ${value}`;
        })
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
          Review and copy individual fields.
        </CardDescription>
      </CardHeader>

      <div className="space-y-4">

        {fields.map((key) => {

          const value = String(formData[key as keyof typeof formData]);

          return (

            <div
              key={key}
              className="rounded-xl border border-surface-200 bg-white p-4 shadow-sm"
            >

              <label className="mb-2 block text-sm font-semibold text-surface-700">
                {beautify(key)}
              </label>

              <div className="flex gap-3">

                <input
                  readOnly
                  value={value}
                  className="flex-1 rounded-lg border border-surface-300 bg-surface-50 px-3 py-2"
                />

                <Button
                  variant="outline"
                  onClick={() => copyValue(beautify(key), value)}
                >
                  <Copy className="size-4" />
                </Button>

              </div>

            </div>

          );
        })}

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
  switch (key) {
    case "applicantName":
      return "Applicant Name";

    case "fatherName":
      return "Father Name";

    case "motherName":
      return "Mother Name";

    case "spouseName":
      return "Spouse Name";

    case "relationName":
      return "Relation Name";

    case "relationship":
      return "Relationship";

    case "gender":
      return "Gender";

    case "dob":
      return "Date of Birth";

    case "age":
      return "Age";

    case "mobile":
      return "Mobile Number";

    case "aadhaar":
      return "Aadhaar Number";

    case "epic":
      return "EPIC Number";

    case "houseNo":
      return "House Number";

    case "street":
      return "Street";

    case "village":
      return "Village";

    case "mandal":
      return "Mandal";

    case "district":
      return "District";

    case "state":
      return "State";

    case "pincode":
      return "Pincode";

    case "partNo":
      return "Part Number";

    case "serialNo":
      return "Serial Number";

    case "pollingStation":
      return "Polling Station";

    case "bloName":
      return "BLO Name";

    case "bloMobile":
      return "BLO Mobile";

    default:
      return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (s) => s.toUpperCase());
  }
}