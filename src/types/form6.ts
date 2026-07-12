export interface Form6Data {
  applicantName: string;

  fatherName: string;

  motherName: string;

  spouseName: string;

  relationName: string;

  relationship:
    | "Father"
    | "Mother"
    | "Husband"
    | "Wife"
    | "Guardian"
    | "";

  gender:
    | "Male"
    | "Female"
    | "Other"
    | "";

  age: string;

  dob: string;

  mobile: string;

  aadhaar: string;

  epic: string;

  houseNo: string;

  street: string;

  village: string;

  mandal: string;

  district: string;

  state: string;

  pincode: string;

  partNo: string;

  serialNo: string;

  pollingStation: string;

  bloName: string;

  bloMobile: string;
}

export const EMPTY_FORM6: Form6Data = {
  applicantName: "",

  fatherName: "",

  motherName: "",

  spouseName: "",

  relationName: "",

  relationship: "",

  gender: "",

  age: "",

  dob: "",

  mobile: "",

  aadhaar: "",

  epic: "",

  houseNo: "",

  street: "",

  village: "",

  mandal: "",

  district: "",

  state: "",

  pincode: "",

  partNo: "",

  serialNo: "",

  pollingStation: "",

  bloName: "",

  bloMobile: "",
};