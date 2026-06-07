import { 
  BarChart3, Building2, Users, ClipboardCheck, 
  ShieldCheck, FileBarChart2, Activity, Award, 
  Eye, HeartHandshake, Filter, UserCircle2 
} from 'lucide-react';

/* ═══════════════════════════════════════════
   NAV CONFIG
   (Full 12 Sidebar Menu Items)
═══════════════════════════════════════════ */
export const NAV = [
  { key: "dashboard",      label: "Dashboard",                    icon: BarChart3 },
  { key: "stations",       label: "Stations",                     icon: Building2 },
  { key: "allUsers",       label: "All Users",                    icon: Users },
  { key: "reviewPM",       label: "Review PM Assessments",        icon: ClipboardCheck },
  { key: "assessSM",       label: "Assess Station Masters",       icon: Users },
  { key: "assessTM",       label: "Assess Train Managers",        icon: ShieldCheck },
  { key: "myAssessment",   label: "My Assessments",               icon: FileBarChart2 },
  { key: "pmePosition",    label: "PME Position",                 icon: Activity },
  { key: "refPosition",    label: "REF Position",                 icon: Award },
  { key: "inspections",    label: "Inspections",                  icon: Eye },
  { key: "counselling",    label: "Counselling",                  icon: HeartHandshake },
  { key: "reports",        label: "Reports",                      icon: Filter },
  { key: "profile",        label: "My Profile",                   icon: UserCircle2 },
];

export const TI_PROFILE = {
  designation: "Traffic Inspector (Safety Officer)",
  jurisdiction: "Parbhani-Amla Section",
  hrmsId: "TI_1001",
  dob: "1985-05-14",
  doa: "2017-04-12",
  pmeDueDate: "2029-08-20",
  pmeDoneDate: "2025-08-20",
  isolatorCertDate: "2026-02-18",
  autoTrainingDate: "2026-03-05",
  counsellingDate: "2026-05-12"
};


/* ═══════════════════════════════════════════
   HELPERS & CATEGORIES
═══════════════════════════════════════════ */
export const getCat = s => s >= 80 ? "A" : s >= 50 ? "B" : s >= 26 ? "C" : "D";
export const CAT_C  = { A: "#16a34a", B: "#2563eb", C: "#d97706", D: "#dc2626" };
export const CAT_B  = { A: "#dcfce7", B: "#dbeafe", C: "#fef3c7", D: "#fee2e2" };
export const PIE_C  = ["#16a34a", "#2563eb", "#d97706", "#dc2626"];
export const RISK_C = { High: "#dc2626", Medium: "#d97706", Low: "#16a34a" };
export const RISK_B = { High: "#fee2e2", Medium: "#fef3c7", Low: "#dcfce7" };

/* ═══════════════════════════════════════════
   STATIC MOCK DATA — 12 STATIONS
═══════════════════════════════════════════ */
export const INIT_STATIONS = [
  { id: "ST01", name: "Parbhani Junction", code: "PBN", avgScore: 82, safetyPct: 88, highRisk: 1, pointsmenCount: 10 },
  { id: "ST02", name: "Amla Junction", code: "AMLA", avgScore: 65, safetyPct: 71, highRisk: 3, pointsmenCount: 8 },
  { id: "ST03", name: "Badnera Junction", code: "BD", avgScore: 78, safetyPct: 83, highRisk: 1, pointsmenCount: 7 },
  { id: "ST04", name: "Nagpur Junction", code: "NGP", avgScore: 89, safetyPct: 94, highRisk: 0, pointsmenCount: 12 },
  { id: "ST05", name: "Akola Junction", code: "AK", avgScore: 71, safetyPct: 76, highRisk: 2, pointsmenCount: 8 },
  { id: "ST06", name: "Wardha Junction", code: "WR", avgScore: 80, safetyPct: 85, highRisk: 1, pointsmenCount: 9 },
  { id: "ST07", name: "Betul Station", code: "BYT", avgScore: 74, safetyPct: 80, highRisk: 1, pointsmenCount: 6 },
  { id: "ST08", name: "Itarsi Junction", code: "ET", avgScore: 85, safetyPct: 91, highRisk: 1, pointsmenCount: 11 },
  { id: "ST09", name: "Chandrapur Station", code: "CD", avgScore: 68, safetyPct: 73, highRisk: 2, pointsmenCount: 7 },
  { id: "ST10", name: "Gondia Junction", code: "G", avgScore: 82, safetyPct: 87, highRisk: 0, pointsmenCount: 9 },
  { id: "ST11", name: "Dhamangaon Station", code: "DMN", avgScore: 73, safetyPct: 79, highRisk: 1, pointsmenCount: 5 },
  { id: "ST12", name: "Pulgaon Junction", code: "PLO", avgScore: 76, safetyPct: 81, highRisk: 1, pointsmenCount: 6 }
];

export const INIT_USERS = [
  // Station Masters
  { id: "SM_1001", name: "S. Deshmukh", role: "Station Master", designation: "Station Master", station: "Parbhani Junction", cat: "A", lastAssessDate: "2026-03-20", score: 86, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 11001", joiningDate: "2018-02-12" },
  { id: "SM_2102", name: "A. Kulkarni", role: "Station Master", designation: "Station Master", station: "Parbhani Junction", cat: "B", lastAssessDate: "2026-02-14", score: 72, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 11002", joiningDate: "2019-05-15" },
  { id: "SM_2201", name: "M. Patil", role: "Station Master", designation: "Station Master", station: "Amla Junction", cat: "A", lastAssessDate: "2026-03-12", score: 84, pmeStatus: "Fit", refStatus: "Pending", contact: "+91 98765 11003", joiningDate: "2016-08-20" },
  { id: "SM_2202", name: "R. Sharma", role: "Station Master", designation: "Station Master", station: "Amla Junction", cat: "C", lastAssessDate: "2026-01-30", score: 54, pmeStatus: "Pending", refStatus: "Pending", contact: "+91 98765 11004", joiningDate: "2021-10-10" },
  { id: "SM_2301", name: "V. Singh", role: "Station Master", designation: "Station Master", station: "Badnera Junction", cat: "A", lastAssessDate: "2026-03-15", score: 88, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 11005", joiningDate: "2015-04-12" },
  { id: "SM_2302", name: "T. Mehta", role: "Station Master", designation: "Station Master", station: "Badnera Junction", cat: "B", lastAssessDate: "2026-02-20", score: 71, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 11006", joiningDate: "2020-03-18" },
  { id: "SM_2401", name: "K. Raghuvanshi", role: "Station Master", designation: "Station Master", station: "Nagpur Junction", cat: "A", lastAssessDate: "2026-03-22", score: 92, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 11007", joiningDate: "2014-06-25" },
  { id: "SM_2501", name: "P. Wankhede", role: "Station Master", designation: "Station Master", station: "Akola Junction", cat: "B", lastAssessDate: "2026-03-01", score: 74, pmeStatus: "Overdue", refStatus: "Expired", contact: "+91 98765 11008", joiningDate: "2017-09-08" },
  
  // Pointsmen
  { id: "PM_1001", name: "K. Pawar", role: "Pointsman", designation: "Pointsman Grade I", station: "Parbhani Junction", cat: "A", lastAssessDate: "2026-04-10", score: 80, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 22001", joiningDate: "2020-01-10" },
  { id: "PM_1002", name: "R. Verma", role: "Pointsman", designation: "Pointsman Grade I", station: "Amla Junction", cat: "B", lastAssessDate: "2026-04-09", score: 68, pmeStatus: "Fit", refStatus: "Pending", contact: "+91 98765 22002", joiningDate: "2021-06-18" },
  { id: "PM_1003", name: "D. Rane", role: "Pointsman", designation: "Pointsman Grade II", station: "Amla Junction", cat: "D", lastAssessDate: "2026-04-08", score: 44, pmeStatus: "Unfit", refStatus: "Pending", contact: "+91 98765 22003", joiningDate: "2022-11-22" },
  { id: "PM_1004", name: "J. Shaikh", role: "Pointsman", designation: "Pointsman Grade I", station: "Badnera Junction", cat: "A", lastAssessDate: "2026-04-04", score: 88, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 22004", joiningDate: "2019-12-05" },
  { id: "PM_1005", name: "A. Gade", role: "Pointsman", designation: "Pointsman Grade II", station: "Akola Junction", cat: "C", lastAssessDate: "2026-03-24", score: 58, pmeStatus: "Overdue", refStatus: "Cleared", contact: "+91 98765 22005", joiningDate: "2023-04-15" },
  { id: "PM_1006", name: "S. Meshram", role: "Pointsman", designation: "Pointsman Grade I", station: "Nagpur Junction", cat: "A", lastAssessDate: "2026-03-28", score: 94, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 22006", joiningDate: "2018-05-19" },
  { id: "PM_1007", name: "G. Chawla", role: "Pointsman", designation: "Pointsman Grade II", station: "Itarsi Junction", cat: "A", lastAssessDate: "2026-03-14", score: 82, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 22007", joiningDate: "2020-07-20" },
  { id: "PM_1008", name: "H. Singh", role: "Pointsman", designation: "Pointsman Grade I", station: "Wardha Junction", cat: "B", lastAssessDate: "2026-03-10", score: 76, pmeStatus: "Fit", refStatus: "Expired", contact: "+91 98765 22008", joiningDate: "2017-02-28" },
  { id: "PM_1009", name: "B. Yadav", role: "Pointsman", designation: "Pointsman Grade II", station: "Chandrapur Station", cat: "C", lastAssessDate: "2026-03-05", score: 51, pmeStatus: "Overdue", refStatus: "Pending", contact: "+91 98765 22009", joiningDate: "2022-09-01" },
  { id: "PM_1010", name: "N. Dewangan", role: "Pointsman", designation: "Pointsman Grade I", station: "Gondia Junction", cat: "A", lastAssessDate: "2026-03-18", score: 85, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 22010", joiningDate: "2019-08-11" }
];

export const MONTHLY = [
  { month: "Nov 25", assessments: 14, avgScore: 72, safetyAvg: 74 },
  { month: "Dec 25", assessments: 18, avgScore: 74, safetyAvg: 76 },
  { month: "Jan 26", assessments: 24, avgScore: 71, safetyAvg: 73 },
  { month: "Feb 26", assessments: 32, avgScore: 77, safetyAvg: 79 },
  { month: "Mar 26", assessments: 38, avgScore: 80, safetyAvg: 82 },
  { month: "Apr 26", assessments: 42, avgScore: 83, safetyAvg: 85 }
];

export const INIT_PM_ASSESSMENTS = [
  {
    id: "PA_1001", pointsmanName: "K. Pawar", hrmsId: "PM_1001",
    station: "Parbhani Junction", assessingSM: "S. Deshmukh",
    submissionDate: "2026-04-10", status: "Pending",
    originalSections: [
      { title: "Knowledge of Rules",      score: 20, max: 25 },
      { title: "Alertness & Observation", score: 18, max: 25 },
      { title: "Safety Record",           score: 12, max: 15 },
      { title: "Leadership & Management", score: 11, max: 15 },
      { title: "Discipline",              score: 8,  max: 10 },
      { title: "Appearance & Neatness",   score: 7,  max: 10 },
    ],
    meta: { pmeStatus: "Fit", refStatus: "Cleared", alcoholicStatus: "Non-Alcoholic" },
    tiRemarks: "", tiModified: false, auditTrail: []
  },
  {
    id: "PA_1002", pointsmanName: "R. Verma", hrmsId: "PM_1002",
    station: "Amla Junction", assessingSM: "M. Patil",
    submissionDate: "2026-04-09", status: "Pending",
    originalSections: [
      { title: "Knowledge of Rules",      score: 17, max: 25 },
      { title: "Alertness & Observation", score: 16, max: 25 },
      { title: "Safety Record",           score: 10, max: 15 },
      { title: "Leadership & Management", score: 9,  max: 15 },
      { title: "Discipline",              score: 6,  max: 10 },
      { title: "Appearance & Neatness",   score: 6,  max: 10 },
    ],
    meta: { pmeStatus: "Fit", refStatus: "Pending", alcoholicStatus: "Non-Alcoholic" },
    tiRemarks: "", tiModified: false, auditTrail: []
  },
  {
    id: "PA_1003", pointsmanName: "D. Rane", hrmsId: "PM_1003",
    station: "Amla Junction", assessingSM: "M. Patil",
    submissionDate: "2026-04-08", status: "Pending",
    originalSections: [
      { title: "Knowledge of Rules",      score: 14, max: 25 },
      { title: "Alertness & Observation", score: 13, max: 25 },
      { title: "Safety Record",           score: 8,  max: 15 },
      { title: "Leadership & Management", score: 7,  max: 15 },
      { title: "Discipline",              score: 4,  max: 10 },
      { title: "Appearance & Neatness",   score: 4,  max: 10 },
    ],
    meta: { pmeStatus: "Unfit", refStatus: "Pending", alcoholicStatus: "Alcoholic" },
    tiRemarks: "", tiModified: false, auditTrail: []
  },
  {
    id: "PA_1004", pointsmanName: "J. Shaikh", hrmsId: "PM_1004",
    station: "Badnera Junction", assessingSM: "V. Singh",
    submissionDate: "2026-04-04", status: "Approved",
    originalSections: [
      { title: "Knowledge of Rules",      score: 23, max: 25 },
      { title: "Alertness & Observation", score: 22, max: 25 },
      { title: "Safety Record",           score: 15, max: 15 },
      { title: "Leadership & Management", score: 13, max: 15 },
      { title: "Discipline",              score: 9,  max: 10 },
      { title: "Appearance & Neatness",   score: 9,  max: 10 },
    ],
    finalSections: [
      { title: "Knowledge of Rules",      score: 23, max: 25 },
      { title: "Alertness & Observation", score: 22, max: 25 },
      { title: "Safety Record",           score: 15, max: 15 },
      { title: "Leadership & Management", score: 13, max: 15 },
      { title: "Discipline",              score: 9,  max: 10 },
      { title: "Appearance & Neatness",   score: 9,  max: 10 },
    ],
    meta: { pmeStatus: "Fit", refStatus: "Cleared", alcoholicStatus: "Non-Alcoholic" },
    tiRemarks: "Excellent field performance. Approved as submitted.",
    tiModified: false, approvalDate: "2026-04-05",
    auditTrail: [{ action: "Approved without modification", by: "TI R. Khan", date: "2026-04-05" }]
  },
];

export const TI_SM_CRITERIA = [
  { key: "stationMgmt",  label: "Station Management",          weight: 5, count: 5,
    criteria: ["Efficient train handling", "Accurate scheduling", "Staff deployment", "Complaint resolution", "Log maintenance"] },
  { key: "safety",       label: "Safety & Compliance",         weight: 4, count: 5,
    criteria: ["Safety protocols followed", "Incident reporting timely", "Emergency drill conducted", "Hazard identification", "PPE enforced"] },
  { key: "staffSupervision", label: "Staff Supervision",       weight: 3, count: 5,
    criteria: ["Regular briefings conducted", "Feedback provided to staff", "Leave management", "Timekeeping enforced", "Staff morale maintained"] },
  { key: "documentation", label: "Documentation & Reporting",   weight: 3, count: 5,
    criteria: ["Daily log accurate", "Monthly report submitted", "Incident records maintained", "Assessment documents filed", "Handover notes complete"] },
  { key: "emergency",    label: "Emergency Handling",          weight: 5, count: 5,
    criteria: ["Responded to emergencies promptly", "Coordinated with control office", "Passenger management during disruption", "Track clear protocol followed", "Post-incident review done"] },
];

export const defaultSMForm = () => ({
  stationMgmt:      Array(5).fill(null),
  safety:           Array(5).fill(null),
  staffSupervision: Array(5).fill(null),
  documentation:    Array(5).fill(null),
  emergency:        Array(5).fill(null),
  knowledgeMarks: "", alcoholicStatus: "", pmeStatus: "Fit",
  refStatus: "Cleared", counselling: "Not Required",
  automaticTraining: "Not Required", remarks: ""
});

export const computeSMScore = form => {
  let total = 0;
  TI_SM_CRITERIA.forEach(c => {
    form[c.key].forEach(v => { if (v === "Yes") total += c.weight; });
  });
  const km = Math.min(parseInt(form.knowledgeMarks) || 0, 25);
  return { ynScore: Math.min(total, 75), knowledge: km, total: Math.min(total, 75) + km };
};

export const INIT_SM_LIST = [
  { id: "SMA_5001", name: "S. Deshmukh", hrmsId: "SM_1001", station: "Parbhani Junction", lastDate: "2026-03-20", status: "Pending" },
  { id: "SMA_5002", name: "M. Patil",    hrmsId: "SM_2201", station: "Amla Junction",       lastDate: "2026-03-12", status: "Pending" },
  { id: "SMA_5003", name: "V. Singh",    hrmsId: "SM_2301", station: "Badnera Junction",   lastDate: "2026-03-15", status: "Submitted" },
  { id: "SMA_5004", name: "A. Kulkarni", hrmsId: "SM_2102", station: "Parbhani Junction",  lastDate: "2026-02-14", status: "Pending" },
];

export const TI_TM_CRITERIA = [
  { key: "trainSafety",  label: "Train Safety & Brake Inspection",   weight: 5, count: 5,
    criteria: ["Brake power certificate verification", "BP/FP pressure gauge monitoring", "Tail lamp/board correctness", "Loose coupling check", "Vigilance control check"] },
  { key: "signaling",    label: "Signaling & Whistle Compliance",    weight: 4, count: 5,
    criteria: ["Hand signal exchange with SM", "Whistling at gate/whistle boards", "Fog signal detonator drill", "Acknowledge route aspects", "Correct flags/lamps display"] },
  { key: "shunting",     label: "Shunting & Coupling Ops",           weight: 3, count: 5,
    criteria: ["Coordinating shunting movement", "Screw/CBC coupling secured", "Hand brake application on sidings", "Point locking verification", "Clearance distance estimation"] },
  { key: "documentation", label: "Train Log & Guard Certificates",  weight: 3, count: 5,
    criteria: ["Train journal logs accurate", "Caution orders noted", "Guard's certificate issued properly", "Rough journal handovers complete", "Incident report log filled"] },
  { key: "emergency",    label: "Emergency Train Protection",        weight: 5, count: 5,
    criteria: ["Flashing amber tail light active", "Detonator protection at 600m/1200m", "Informing control/SM of disruption", "First-aid response coordination", "Track clearance verification"] },
];

export const defaultTMForm = () => ({
  trainSafety:      Array(5).fill(null),
  signaling:        Array(5).fill(null),
  shunting:         Array(5).fill(null),
  documentation:    Array(5).fill(null),
  emergency:        Array(5).fill(null),
  knowledgeMarks: "", alcoholicStatus: "", pmeStatus: "Fit",
  refStatus: "Cleared", counselling: "Not Required",
  automaticTraining: "Not Required", remarks: ""
});

export const computeTMScore = form => {
  let yesCount = 0;
  TI_TM_CRITERIA.forEach(c => {
    form[c.key]?.forEach(v => { if (v === "Yes") yesCount += 1; });
  });
  const ynScore = yesCount * 3;
  const km = Math.min(parseInt(form.knowledgeMarks) || 0, 25);
  return { ynScore: Math.min(ynScore, 75), knowledge: km, total: Math.min(ynScore, 75) + km };
};

export const INIT_TM_LIST = [
  { id: "TMA_6001", name: "R. P. Yadav", hrmsId: "TM_3001", station: "Nagpur Junction", lastDate: "2026-04-02", status: "Pending" },
  { id: "TMA_6002", name: "S. K. Mishra", hrmsId: "TM_3002", station: "Parbhani Junction", lastDate: "2026-03-25", status: "Pending" },
  { id: "TMA_6003", name: "D. K. Sen", hrmsId: "TM_3003", station: "Badnera Junction", lastDate: "2026-03-18", status: "Submitted" },
  { id: "TMA_6004", name: "A. V. Joshi", hrmsId: "TM_3004", station: "Amla Junction", lastDate: "2026-02-28", status: "Pending" },
];


export const INIT_INSPECTIONS = [
  { id: "IN_101", date: "2026-05-10", station: "Amla Junction", officer: "TI R. Khan", observations: "Siding point interlocking operation checked. Satisfactory speed compliance.", risk: "Low", status: "Closed" },
  { id: "IN_102", date: "2026-05-18", station: "Chandrapur Station", officer: "TI R. Khan", observations: "Joint gap clearance in crossing 12B slightly wide. Safety Speed restriction of 15km/h advised.", risk: "Medium", status: "Active" },
  { id: "IN_103", date: "2026-05-24", station: "Akola Junction", officer: "TI R. Khan", observations: "Station Master logs audit. Slight delay in registering daily block clearing times.", risk: "Low", status: "Pending Action" }
];

export const INIT_COUNSELLING = [
  { id: "CL_101", date: "2026-05-12", staffName: "D. Rane", designation: "Pointsman Grade II", station: "Amla Junction", topics: "Alcoholic rehabilitation counseling. Safety and alertness briefing.", duration: "45 mins", progress: "Under Monitor" },
  { id: "CL_102", date: "2026-05-20", staffName: "A. Gade", designation: "Pointsman Grade II", station: "Akola Junction", topics: "Periodic medical exam preparation. Rest compliance counseling.", duration: "30 mins", progress: "Completed" }
];

// Interactive quiz questions for self-assessments
export const TI_QUIZ = [
  { q: "What whistle code must be sounded when a train is passing through a station without stopping?", opts: ["One long", "Continuous short blasts", "One long and one short", "Two short blasts"], ans: 0 },
  { q: "During track circuit failures, what token is issued to authorize train movements into block sections?", opts: ["T/369(3b)", "T/806 (Shunting Order)", "Caution Order (T/B)", "Line Clear Ticket"], ans: 0 },
  { q: "Fouling mark lines indicate:", opts: ["Defective rail marker", "Safe distance clearance boundary limit", "Points switching end point", "Speed restrictions end"], ans: 1 },
  { q: "Periodic Refresher Courses (REF) for Pointsman Grade I must be completed every:", opts: ["1 Year", "2 Years", "3 Years", "5 Years"], ans: 2 },
  { q: "A Signal showing double yellow lights warns the driver to:", opts: ["Stop immediately", "Prepare to stop at the next signal", "Proceed at full authorized speed", "Sound whistle continuously"], ans: 1 },
  { q: "How often must a Traffic Inspector audit the Station log registers?", opts: ["Weekly", "Monthly", "Quarterly", "Bi-annually"], ans: 1 },
  { q: "During a total failure of communications on double lines, which authority form is issued?", opts: ["T/A 602", "T/B 602", "T/C 602", "T/D 602"], ans: 1 },
  { q: "What whistle code indicates 'Train Parting'?", opts: ["One long, one short", "Two long, two short", "One long, one short, one long, one short", "Continuous short blasts"], ans: 2 },
  { q: "A signal with double yellow aspect warns the driver to:", opts: ["Proceed at full speed", "Prepare to stop at the next signal", "Proceed with 15km/h", "Stop immediately"], ans: 1 },
  { q: "Under normal conditions, a gate signal shows what aspect when the level crossing gate is open to road traffic?", opts: ["Red", "Yellow", "Green", "Double Yellow"], ans: 0 },
  { q: "Refresher training for Pointsman Grade I must be completed every:", opts: ["1 Year", "2 Years", "3 Years", "5 Years"], ans: 2 },
  { q: "Periodic medical examinations (PME) for Station Masters must be completed every four years until age:", opts: ["45", "50", "55", "60"], ans: 2 },
  { q: "Isolation of a running line from sidings is designed to prevent:", opts: ["Over-speeding", "Collisions due to rolling stock escape", "Signal failures", "Interlocking failures"], ans: 1 },
  { q: "What whistle code is sounded when entering a tunnel?", opts: ["One long blast", "Continuous short blasts", "Two short blasts", "Continuous long whistle"], ans: 3 },
  { q: "Fuses or detonators are used to protect track defects at a distance of:", opts: ["600m and 1200m", "500m and 1000m", "800m and 2000m", "1200m and 2000m"], ans: 0 },
  { q: "What class of station has points and signals interlocked, enabling line clear exchange?", opts: ["Class A", "Class B", "Class C", "Non-interlocked"], ans: 1 },
  { q: "The standard shunting authority form is:", opts: ["T/369(3b)", "T/806", "T/A 901", "T/511"], ans: 1 },
  { q: "If a Station Master detects a hot axle on a passing train, they must first:", opts: ["Call the division control office", "Display danger hand signal and stop the train", "Inform the next station", "Log the event"], ans: 1 },
  { q: "The maximum speed under 'Caution Order' when no speed limit is specified is:", opts: ["15 km/h", "30 km/h", "45 km/h", "20 km/h"], ans: 0 },
  { q: "Which class of station serves strictly as a block hut without point switches?", opts: ["Class A", "Class B", "Class C", "Class D"], ans: 2 },
  { q: "Who is responsible for point locking during shunting operations?", opts: ["Pointsman", "Station Master", "Cabin Master", "Train Manager"], ans: 1 },
  { q: "A flashing red aspect on a signal indicates:", opts: ["Track circuit defect", "Proceed with caution", "Stop and proceed after 1 min", "Gate signal alert"], ans: 2 },
  { q: "A trap point isolation is used to protect:", opts: ["Passenger platform lines", "Running lines from siding vehicles", "Level crossings", "Relay room locking"], ans: 1 },
  { q: "Refresher training for Traffic Inspectors must be completed every:", opts: ["3 Years", "5 Years", "2 Years", "None"], ans: 0 },
  { q: "During block instrument failure, line clear is authorized using:", opts: ["Token", "Paper Line Clear Ticket", "Cabin ticket", "Hand signal"], ans: 1 }
];

export function generateTiMockResponses(score) {
  const correctCount = Math.round((score / 100) * 25);
  const arr = Array(25).fill(null);
  const indices = Array.from({ length: 25 }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const correctIndices = new Set(indices.slice(0, correctCount));
  for (let i = 0; i < 25; i++) {
    const q = TI_QUIZ[i];
    if (correctIndices.has(i)) {
      arr[i] = q.ans;
    } else {
      arr[i] = (q.ans + 1) % q.opts.length;
    }
  }
  return arr;
}

export const getPerformanceSummaryText = (score, sections) => {
  if (!sections || sections.length === 0) return "Self-compliance check completed successfully.";
  const lowestSec = [...sections].sort((a, b) => a.marks - b.marks)[0];
  const highestSec = [...sections].sort((a, b) => b.marks - a.marks)[0];

  let summary = `Assessment score achieved: ${score}/100 (${score >= 80 ? 'Outstanding Competency' : score >= 50 ? 'Satisfactory Operations' : 'Requires Training'}). `;
  summary += `Demonstrated excellent compliance in "${highestSec.title}" scoring ${highestSec.marks}/${highestSec.outOf} marks. `;
  if (lowestSec.marks < lowestSec.outOf) {
    summary += `However, some area of improvement is observed in "${lowestSec.title}" (${lowestSec.marks}/${lowestSec.outOf}). It is recommended to review the standard operating manuals and safety bulletins for this section.`;
  } else {
    summary += `Achieved perfect scores across all compliance parameters.`;
  }
  return summary;
};

export const INIT_TI_ASSESS_HISTORY = [
  {
    id: 1, date: "2026-03-20", period: "Q1 2026", assessedBy: "AOM_GM_1001 — P. Joshi",
    totalScore: 88, category: "A", approvalStatus: "Approved",
    aomRemarks: "Outstanding supervisory performance. Excellent cross-station coordination.",
    sections: [
      { title: "Whistle Codes & Hand Signals",          marks: 18, outOf: 20 },
      { title: "Token & Line Clear Authorities",        marks: 17, outOf: 20 },
      { title: "Station Interlocking & Track Circuits", marks: 18, outOf: 20 },
      { title: "Shunting Operations & Point Locking",   marks: 17, outOf: 20 },
      { title: "Gate Signals & Siding Isolation",        marks: 18, outOf: 20 },
    ],
    userAnswers: generateTiMockResponses(88)
  },
  {
    id: 2, date: "2025-12-15", period: "Q4 2025", assessedBy: "AOM_GM_1001 — P. Joshi",
    totalScore: 81, category: "A", approvalStatus: "Approved",
    aomRemarks: "Good performance. Minor issues in documentation speed.",
    sections: [
      { title: "Whistle Codes & Hand Signals",          marks: 16, outOf: 20 },
      { title: "Token & Line Clear Authorities",        marks: 16, outOf: 20 },
      { title: "Station Interlocking & Track Circuits", marks: 17, outOf: 20 },
      { title: "Shunting Operations & Point Locking",   marks: 15, outOf: 20 },
      { title: "Gate Signals & Siding Isolation",        marks: 17, outOf: 20 },
    ],
    userAnswers: generateTiMockResponses(81)
  },
  {
    id: 3, date: "2025-09-10", period: "Q3 2025", assessedBy: "AOM_GM_1001 — P. Joshi",
    totalScore: 93, category: "A", approvalStatus: "Approved",
    aomRemarks: "Exemplary. Best performing TI in the division this quarter.",
    sections: [
      { title: "Whistle Codes & Hand Signals",          marks: 19, outOf: 20 },
      { title: "Token & Line Clear Authorities",        marks: 18, outOf: 20 },
      { title: "Station Interlocking & Track Circuits", marks: 19, outOf: 20 },
      { title: "Shunting Operations & Point Locking",   marks: 18, outOf: 20 },
      { title: "Gate Signals & Siding Isolation",        marks: 19, outOf: 20 },
    ],
    userAnswers: generateTiMockResponses(93)
  }
];



export const DEFAULT_SS_TM_USERS = [{ id: "SS_1001", name: "Station Superintendent User", role: "Station Superintendent", designation: "Station Superintendent", station: "Nagpur Junction", cat: "A", lastAssessDate: "2026-03-20", score: 86, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 11001", joiningDate: "2018-02-12" }];
export const INIT_SS_LIST = [{ id: "SSA_5001", name: "Station Superintendent User", hrmsId: "SS_1001", station: "Nagpur Junction", lastDate: "2026-03-20", status: "Pending" }];
