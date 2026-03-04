export interface Authority {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  district: string; // main district
  assignedDistricts: string[]; // array of assigned districts
  role: string; // "authority"
  suspended: boolean;
}