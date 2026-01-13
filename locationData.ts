

export interface LocationItem {
  name: string;
  imageUrl?: string; // Optional: To be used for images later
}

export interface LocationData {
  [category: string]: LocationItem[];
}

export const locationCategories = [
  "Building", // Changed from "Building/Block"
  "Cafe & Shops",
  "Gate",
  "Hostel",
  "Laboratories & Workshops", // Changed from "Laboratories"
  "Office",
  "Services",
] as const;
export type LocationCategory = typeof locationCategories[number];

const createLocationItems = (names: string[]): LocationItem[] => 
  names.sort().map(name => ({ name, imageUrl: undefined }));

export const locations: LocationData = {
  "Building": createLocationItems([ // Changed from "Building/Block"
    "Administration Block",
    "Butterfly",
    "Education Department Office",
    "Engineering Building (E)",
    "Library",
    "Main Building",
    "Main Lecture Theatre (MLT)",
    "New Ted (NT)",
    "ODL",
    "Wet Building (WET)",
  ]),
  "Cafe & Shops": createLocationItems([
    "Café",
    "Mini Shop",
    "Tuck shop",
  ]),
  "Gate": createLocationItems([
    "Behind library gate",
    "Car Entrance Gate",
    "Car exit gate",
    "Engineering gate",
    "Main entry gate",
    "Mini shop gate",
    "NT Gate",
    "ODL Entrance Gate",
    "T8 Gate",
    "behind Engineering Building gate",
  ]),
  "Hostel": createLocationItems([
    "Kapeni A Hostel",
    "Kapeni B Hostel",
    "Mpingwi Hostel",
    "Ndirande A Hostel",
    "Ndirande B Hostel",
    "Nyika A Hostel",
    "Nyika B Hostel",
  ]),
  "Laboratories & Workshops": createLocationItems([ // Changed from "Laboratories"
    "Electrical Engineering",
    "Machine Shop T4",
    "Mechanical Engineering Laboratory T1",
    "Mechanical Engineering Laboratory T2",
    "Mechanical Fitting and Welding Workshop T3",
    "T7 Civil Engineering",
    "Technical Education Workshop T8",
  ]),
  "Office": createLocationItems([
    "204 (ICT Office)",
    "402 (ICT Support Office)",
    "Accounts Office",
    "DEAN Office",
    "DOSA Office",
    "Potters",
    "Registrar Office",
  ]),
  "Services": createLocationItems([
    "Clinic",
  ]),
};