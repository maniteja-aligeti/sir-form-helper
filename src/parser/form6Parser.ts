import { EMPTY_FORM6, type Form6Data } from "@/types/form6";

import { cleanOcrText } from "./textCleaner";

import {
  extractPhone,
  extractEpic,
  extractAadhaar,
  extractAge,
  extractDob,
  extractPin,
} from "./extractNumbers";

import { splitLines } from "./lineSplitter";

function valueAfter(lines: string[], keyword: string): string {

  const index = lines.findIndex((line) =>
    line.toLowerCase().includes(keyword.toLowerCase())
  );

  if (index === -1) return "";

  return lines[index + 1]?.trim() ?? "";
}

export function parseForm6(text: string): Form6Data {

  const cleaned = cleanOcrText(text);

  const lines = splitLines(cleaned);

  const data: Form6Data = {

    ...EMPTY_FORM6,

    mobile: extractPhone(cleaned),

    aadhaar: extractAadhaar(cleaned),

    epic: extractEpic(cleaned),

    age: extractAge(cleaned),

    dob: extractDob(cleaned),

    pincode: extractPin(cleaned),

  };

  data.applicantName =
    valueAfter(lines, "Applicant") ||
    valueAfter(lines, "Name");

  data.relationName =
    valueAfter(lines, "Father") ||
    valueAfter(lines, "Husband") ||
    valueAfter(lines, "Mother");

  if (cleaned.toLowerCase().includes("father")) {
    data.relationship = "Father";
  }

  if (cleaned.toLowerCase().includes("husband")) {
    data.relationship = "Husband";
  }

  if (cleaned.toLowerCase().includes("mother")) {
    data.relationship = "Mother";
  }

  data.houseNo =
    valueAfter(lines, "House");

  data.street =
    valueAfter(lines, "Street");

  data.village =
    valueAfter(lines, "Village");

  data.mandal =
    valueAfter(lines, "Mandal");

  data.district =
    valueAfter(lines, "District");

  data.state =
    valueAfter(lines, "State");

  data.partNo =
    valueAfter(lines, "Part");

  data.serialNo =
    valueAfter(lines, "Serial");

  data.pollingStation =
    valueAfter(lines, "Polling");

  data.bloName =
    valueAfter(lines, "BLO");

  data.bloMobile =
    extractPhone(
      valueAfter(lines, "BLO")
    );

  return data;
}