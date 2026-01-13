
// roomData.ts

export interface BuildingRoomData {
  [buildingName: string]: string[];
}

// Helper to clean and sort room lists
const cleanAndSort = (items: string[]): string[] => {
  const cleaned = items.map(item => item.trim()).filter(item => item !== "");
  return Array.from(new Set(cleaned)).sort((a, b) => {
    // Attempt a more natural sort for room numbers (e.g., Room 1, Room 2, Room 10)
    const regex = /^([a-zA-Z-]*)(\d+)(.*)$/;
    const matchA = a.match(regex);
    const matchB = b.match(regex);

    if (matchA && matchB) {
      const prefixA = matchA[1];
      const numA = parseInt(matchA[2], 10);
      const suffixA = matchA[3];

      const prefixB = matchB[1];
      const numB = parseInt(matchB[2], 10);
      const suffixB = matchB[3];

      if (prefixA === prefixB) {
        if (numA === numB) {
          return suffixA.localeCompare(suffixB);
        }
        return numA - numB;
      }
      return prefixA.localeCompare(prefixB);
    }
    return a.localeCompare(b);
  });
};


export const buildingRoomData: BuildingRoomData = {
  "ODL": cleanAndSort([
    "204 (ICT Office)", "302", "303", "307", "308", "402 (ICT Support Office)", "404", "408", "Auditorium"
  ]),
  "Kapeni A Hostel": cleanAndSort([
    "B2.35", "B2.34", "B2.33", "B2.32", "B2.31", "B2.36", "B2.37", "B2.38", "B2.39", "B2.40", "B2.45", 
    "B3.44", "B3.42", "B3.40", "B3.38", "B3.36", "B3.34", "B3.32", "B3.43", "B3.41", "B3.39", "B3.35", "B3.33", "B3.31", 
    "B3.46", "B3.47", "B3.49", "B3.51", "B3.53", "B3.55", "B3.48", "B3.50", "B3.52", "B3.54", "B3.56",
    "B4.45", "B4.48", "B4.50", "B4.52", "B4.54", "B4.56", "B4.46", "B4.47", "B4.49", "B4.51", "B4.53", "B4.55", 
    "B4.44", "B4.42", "B4.40", "B4.38", "B4.36", "B4.34", "B4.32", "B4.43", "B4.41", "B4.39", "B4.37", "B4.35", "B4.33", "B4.31"
  ]),
  "Kapeni B Hostel": cleanAndSort([
    "B1.05", "B1.04", "B1.03", "B1.02", "B1.01", "B1.07", "B1.08", "B1.09", "B1.10", "B1.12", "B1.06", 
    "B2.11", "B2.09", "B2.07", "B2.05", "B2.03", "B2.02", "B2.10", "B2.08", "B2.06", "B2.04", "B2.01", 
    "B2.14", "B2.16", "B2.18", "B2.20", "B2.22", "B2.24", "B2.26", "B2.12", "B2.13", "B2.15", "B2.17", "B2.19", "B2.21", "B2.23", "B2.25", 
    "B3.11", "B3.12", "B3.14", "B3.16", "B3.18", "B3.20", "B3.22", "B3.24", "B3.26", "B3.13", "B3.15", "B3.17", "B3.19", "B3.21", "B3.23", "B3.25", 
    "B3.09", "B3.07", "B3.05", "B3.03", "B3.01", "B3.10", "B3.08", "B3.06", "B3.04", "B3.02"
  ]),
  "Ndirande A Hostel": cleanAndSort([
    "2.35", "2.34", "2.33", "2.32", "2.31", "2.36", "2.37", "2.38", "2.39", 
    "3.45", "3.44", "3.42", "3.40", "3.38", "3.36", "3.34", "3.32", "3.43", "3.41", "3.39", "3.27", "3.35", "3.33", "3.31", 
    "3.46", "B3.47", "B3.49", "B3.51", "B3.53", "B3.55", "B3.48", "B3.50", "B3.52", "B3.54", "B3.56",
    "4.45", "4.48", "4.50", "4.52", "4.54", "4.56", "4.46", "4.47", "4.49", "4.51", "4.53", "4.55", 
    "4.44", "4.42", "4.40", "4.38", "4.36", "4.34", "4.32", "4.43", "4.41", "4.39", "4.37", "4.35", "4.33", "4.31"
  ]),
  "Ndirande B Hostel": cleanAndSort([
    "2.25", "2.23", "2.21", "2.19", "2.17", "2.15", "2.13", "2.09", "2.07", "2.05", "2.03", "2.01", // "2,," removed, assumed 2.01
    "2.26", "2.24", "2.22", "2.20", "2.18", "2.16", "2.14", "2.12", "2.11", "2.10", "2.08", "2.06", "2.04", "2.02", 
    "3.25", "3.23", "3.21", "3.19", "3.17", "3.15", "3.13", "3.09", "3.07", "3.05", "3.03", "3.01", 
    "3.26", "3.24", "3.22", "3.20", "3.18", "3.16", "3.14", "3.12", "3.11", "3.10", "3.08", "3.06", "3.04", "3.02" // "3.12, , 3.11" cleaned
  ]),
  "Nyika A Hostel": cleanAndSort([
    "A2.36", "A2.35", "A2.34", "A2.33", "A2.32", "A2.31", "A2.37", "A2.38", "A2.39", "A2.40", // A2.333 -> A2.33, A2.36 duplicated
    "A3.42", "A3.41", "A3.40", "A3.38", "A3.36", "A3.34", "A3.32", "A3.39", "A3.37", "A3.35", "A3.33", "A3.31", // A3.41 duplicated
    "A3.43", "A3.45", "A3.47", "A3.49", "A3.51", "A3.53", "A3.55", "A3.44", "A3.46", "A3.48", "A3.50", "A3.52", "A3.54", "A3.56", 
    "A4.42", "A4.44", "A4.46", "A4.48", "A4.50", "A4.52", "A4.54", "A4.56", // A4.50 A4.52 -> A4.50, A4.52
    "A4.43", "A4.45", "A4.47", "A4.49", "A4.51", "A4.53", "A4.55", // A4.49 A4.51 -> A4.49, A4.51
    "A4.40", "A4.38", "A4.36", "A4.34", "A4.32", // A4.34 A4.32 -> A4.34, A4.32
    "A4.41", "A4.39", "A4.37", "A4.35", "A4.33", "A4.31"
  ]),
  "Nyika B Hostel": cleanAndSort([
    "B1.07", "B1.06", "B1.05", "B1.04", "B1.03", "B1.02", "B1.01", "B1.08", "B1.09", "B1.10", "B1.11", "B1.12", 
    "B2.16", "B2.15", "B2.13", "B2.11", "B2.09", "B2.07", "B2.05", "B2.03", "B2.01", "B2.14", "B2.12", "B2.10", "B2.08", "B2.06", "B2.04", "B2.02", 
    "B2.18", "B2.20", "B2.22", "B2.24", "B2.26", "B2.17", "B2.19", "B2.21", "B2.23", "B2.25", 
    "B3.16", "B3.17", "B3.19", "B3.21", "B3.23", "B3.18", "B3.20", "B3.22", "B3.24", "B3.26", 
    "B3.15", "B3.13", "B3.11", "B3.09", "B3.07", "B3.05", "B3.03", "B3.01", "B3.14", "B3.12", "B3.10", "B3.08", "B3.06", "B3.04", "B3.02"
  ]),
  "Mpingwi Hostel": cleanAndSort([
    "M001", "M002", "M003", "M004", "M008", "M007", "M006", "M005", "M009", "M010", "M011", "M012", "M013", 
    "M018", "M017", "M016", "M015", "M014", "M109", "M110", "M111", "M112", "M113", "M118", "M117", "M116", "M115", "M114", 
    "M019", "M020", "M021", "M022", "M023", "M028", "M027", "M026", "M025", "M024", "M029", "M030", "M031", "M032", 
    "M036", "M035", "M034", "M033", "M129", "M130", "M131", "M132", "M136", "M135", "M134", "M133", 
    "M101", "M102", "M103", "M104", "M108", "M107", "M106", "M105", "M119", "M120", "M121", "M122", "M123", 
    "M128", "M127", "M126", "M125", "M124"
  ]),
  "Wet Building (WET)": cleanAndSort([
    "Classroom 1 (WET1)", "Classroom 2 (WET2)", "Classroom 3 (WET3)", "Classroom 4 (WET4)", "Classroom 5 (WET5)", "Classroom 6 (WET6)",
    "Laboratory 1", "Laboratory 2"
  ]),
  "Administration Block": cleanAndSort([
    "Potters", "Accounts Office", "Registrar Office"
  ]),
  "Main Lecture Theatre (MLT)": cleanAndSort([
    "Main Entrance", "DEAN Office", "DOSA Office"
  ]),
  "New Ted (NT)": cleanAndSort([
    "NT1", "NT2", "NT3", "NT4", "NT5", "NT6", "NT7", "NT8", "NT9", "NT10", "NT11", "NT12", "NT13", "NT14", "NT15"
  ]),
  "Main Building": cleanAndSort([
    "32", "33", "40", "43", "44", "45", "50", "55"
  ]),
  "Butterfly": cleanAndSort([
    "47", "48"
  ]),
  "Engineering Building (E)": cleanAndSort([
    "E100 (Geochemical Lab)",
    "E101 (Petrographic Lab)",
    "E102 (Computer Lab)",
    "E103",
    "E104 (Rocket sample preparation)",
    "E105 (Soil & Rocket Mechanics)",
    "E143",
    "E220 (LECTURE THEATRE 1)",
    "E221",
    "E222",
    "E223",
    "E224",
    "E225",
    "E230 (Lecture theatre 2)",
    "E313",
    "E314",
    "E315",
    "E316",
    "E317",
    "E318",
    "E320 (Lecture Theatre)"
  ]),
  "Electrical Engineering": cleanAndSort([
    "Design studio"
  ]),
};
