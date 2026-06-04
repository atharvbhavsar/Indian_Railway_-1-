/**
 * 🚂 RSES TRAFFIC INSPECTOR CONSTANTS
 * Shared configurations, color palettes, mock database records, and safety criteria.
 */
import {
  Gauge, Users, Building2, UserCheck, BusFront, CheckCircle,
  FileCheck, Activity, Award, Eye, HeartHandshake, FileBarChart2,
  BarChart3, UserCircle2
} from "lucide-react";

export const NAV = [
  { key: "dashboard",               label: "Dashboard",                    icon: Gauge },
  { key: "pointsmen",               label: "Pointsmen",                    icon: Users },
  { key: "stationMasters",          label: "Station Masters",              icon: Building2 },
  { key: "stationSuperintendents",  label: "Station Superintendents",      icon: UserCheck },
  { key: "trainManagers",           label: "Train Managers",               icon: BusFront },
  { key: "stations",                label: "Stations",                     icon: Building2 },
  { key: "approvals",               label: "Approvals",                    icon: CheckCircle },
  { key: "assessments",             label: "Assessments",                  icon: FileCheck },
  { key: "pmePosition",             label: "PME Position",                 icon: Activity },
  { key: "refPosition",             label: "REF Position",                 icon: Award },
  { key: "inspections",             label: "Inspections",                  icon: Eye },
  { key: "counselling",             label: "Counselling",                  icon: HeartHandshake },
  { key: "myAssessment",            label: "My Assessment",                icon: FileBarChart2 },
  { key: "reports",                 label: "Reports and Analytics",        icon: BarChart3 },
  { key: "profile",                 label: "My Profile",                   icon: UserCircle2 },
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

export const stationTiMap = {
  "Parbhani Junction": "TI PAR",
  "Amla Junction": "TI AMLA",
  "Badnera Junction": "TI NGP",
  "Akola Junction": "TI PAR",
  "Nagpur Junction": "TI NGP",
  "Wardha Junction": "TI NGP",
  "Betul Station": "TI AMLA",
  "Itarsi Junction": "TI AMLA",
  "Chandrapur Station": "TI NGP",
  "Gondia Junction": "TI NGP",
  "Dhamangaon Station": "TI NGP",
  "Pulgaon Junction": "TI NGP"
};

export const CAT_C  = { A: "#16a34a", B: "#2563eb", C: "#d97706", D: "#dc2626" };
export const CAT_B  = { A: "#dcfce7", B: "#dbeafe", C: "#fef3c7", D: "#fee2e2" };
export const PIE_C  = ["#16a34a", "#2563eb", "#d97706", "#dc2626"];
export const RISK_C = { High: "#dc2626", Medium: "#d97706", Low: "#16a34a" };
export const RISK_B = { High: "#fee2e2", Medium: "#fef3c7", Low: "#dcfce7" };

export const ROLE_MAP = {
  pointsmen: "Pointsman",
  Pointsman: "Pointsman",
  sm: "Station Master",
  "Station Master": "Station Master",
  ss: "Station Superintendent",
  "Station Superintendent": "Station Superintendent",
  tm: "Train Manager",
  "Train Manager": "Train Manager",
  ti: "Traffic Inspector",
  "Traffic Inspector": "Traffic Inspector"
};

export const MONTHLY_TREND = [];

export const INIT_STATIONS = [];

export const INIT_USERS = [];

export const DEFAULT_SS_TM_USERS = [];

export const MONTHLY = [];

export const INIT_PM_ASSESSMENTS = [];

export const TI_SM_CRITERIA = [
  { key: "knowledgeOfRules",  label: "Knowledge of Rules",              weight: 3, count: 5,
    criteria: ["Block section working rules", "Signal aspect interpretations", "Station working rules (SWR) knowledge", "Emergency rule provisions", "Special instructions awareness"] },
  { key: "alertness",         label: "Alertness and Observance of Rules", weight: 3, count: 5,
    criteria: ["Active monitoring of train movements", "Platform and yard vigilance", "Timely signal observations", "Point position verification before movements", "Quick response to deviations"] },
  { key: "safetyRecord",      label: "Safety Record",                   weight: 3, count: 5,
    criteria: ["No accidents or incidents in period", "Safety-related complaints addressed", "Compliance with safety circulars", "Near-miss incidents reported", "Safety drills conducted"] },
  { key: "leadership",        label: "Leadership and Management",       weight: 2, count: 5,
    criteria: ["Staff motivation and team leadership", "Effective duty roster management", "Training and guidance of subordinates", "Conflict resolution capability", "Decision-making under pressure"] },
  { key: "discipline",        label: "Discipline",                      weight: 2, count: 5,
    criteria: ["Punctuality and attendance record", "Adherence to uniform and conduct norms", "Compliance with official communication channels", "Respect for hierarchy and chain of command", "Absence of disciplinary proceedings"] },
  { key: "appearance",        label: "Appearance and Neatness",         weight: 2, count: 5,
    criteria: ["Proper uniform worn at all times", "Station cleanliness maintained", "Registers and records kept neatly", "Notice boards updated and presentable", "Office area well-organized"] },
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

export const TI_SS_CRITERIA = [
  { key: "stationOps",    label: "Station Operations & Supervision",   weight: 5, count: 5,
    criteria: ["Train reception/dispatch procedures", "Station yard supervision during peak hours", "Platform safety compliance", "Crowd management protocols", "Block instrument operation"] },
  { key: "staffMgmt",    label: "Staff Management & Discipline",       weight: 4, count: 5,
    criteria: ["Duty roster maintenance", "Punctuality and attendance tracking", "Leave management compliance", "Uniform & conduct enforcement", "Safety briefing conduct"] },
  { key: "records",      label: "Records & Documentation",             weight: 3, count: 5,
    criteria: ["Station log book accuracy", "Accident/incident reporting", "Block register maintenance", "Cash and freight register audit", "Train delay reporting"] },
  { key: "safety",       label: "Safety Compliance & Emergency",       weight: 5, count: 5,
    criteria: ["Emergency evacuation drill conduct", "Fire equipment serviceability check", "Signal failure response protocol", "Fog signal deployment knowledge", "Coordination with control office"] },
  { key: "infra",        label: "Infrastructure & Asset Maintenance",  weight: 3, count: 5,
    criteria: ["Platform surface and lighting check", "Footover bridge safety assessment", "Washroom hygiene maintenance", "Waiting room orderliness", "Coach indication board accuracy"] },
];

export const INIT_INSPECTIONS = [];

export const INIT_COUNSELLING = [];

export const TI_QUIZ = [
  { q: "What whistle code must be sounded when a train is passing through a station without stopping?", opts: ["One long", "Continuous short blasts", "One long and one short", "Two short blasts"], ans: 0, explanation: "One long whistle is sounded to alert station staff, pointsmen, and level crossing gatemen of a train passing through without stopping." },
  { q: "During track circuit failures, what token is issued to authorize train movements into block sections?", opts: ["T/369(3b)", "T/806 (Shunting Order)", "Caution Order (T/B)", "Line Clear Ticket"], ans: 0, explanation: "T/369(3b) is the written authority issued to pass a defective reception stop signal at danger, containing speed restrictions for track anomalies." },
  { q: "Fouling mark lines indicate:", opts: ["Defective rail marker", "Safe distance clearance boundary limit", "Points switching end point", "Speed restrictions end"], ans: 1, explanation: "A fouling mark is placed at the convergence of two tracks, indicating the boundary within which vehicles must remain to avoid collision with traffic on the adjacent line." },
  { q: "Periodic Refresher Courses (REF) for Pointsman Grade I must be completed every:", opts: ["1 Year", "2 Years", "3 Years", "5 Years"], ans: 2, explanation: "Safety refresher training for pointsmen is mandated once every 3 years to ensure operational rule compliance and hands-on skill currency." },
  { q: "A Signal showing double yellow lights warns the driver to:", opts: ["Stop immediately", "Prepare to stop at the next signal", "Proceed at full authorized speed", "Sound whistle continuously"], ans: 1, explanation: "A double yellow aspect is an attention signal, warning the driver that they are approaching a signal showing a restrictive aspect (single yellow or red)." },
  { q: "How often must a Traffic Inspector audit the Station log registers?", opts: ["Weekly", "Monthly", "Quarterly", "Bi-annually"], ans: 1, explanation: "As per the Safety Audit Manual, a Traffic Inspector must perform a thorough physical audit of station logs, books, and registers at least once a month." },
  { q: "During a total failure of communications on double lines, which authority form is issued?", opts: ["T/A 602", "T/B 602", "T/C 602", "T/D 602"], ans: 1, explanation: "Form T/B 602 is the official authority issued to run trains during total failure of communication on a double line section." },
  { q: "What whistle code indicates 'Train Parting'?", opts: ["One long, one short", "Two long, two short", "One long, one short, one long, one short", "Continuous short blasts"], ans: 2, explanation: "One long, one short, one long, one short whistle code is sounded repeatedly to warn the station staff and loco crew of mid-section train parting." },
  { q: "A signal with double yellow aspect warns the driver to:", opts: ["Proceed at full speed", "Prepare to stop at the next signal", "Proceed with 15km/h", "Stop immediately"], ans: 1, explanation: "Prepare to stop at the next signal is indicated by a double yellow attention aspect on the distant signal." },
  { q: "Under normal conditions, a gate signal shows what aspect when the level crossing gate is open to road traffic?", opts: ["Red", "Yellow", "Green", "Double Yellow"], ans: 0, explanation: "A gate signal will show Red (Danger) if the interlocked level crossing gate is open to road traffic, protecting the block section from vehicles." },
  { q: "Refresher training for Pointsman Grade I must be completed every:", opts: ["1 Year", "2 Years", "3 Years", "5 Years"], ans: 2, explanation: "Standard operations manuals require Pointsmen Grade I to undergo refresher safety courses every 3 years." },
  { q: "Periodic medical examinations (PME) for Station Masters must be completed every four years until age:", opts: ["45", "50", "55", "60"], ans: 2, explanation: "Safety-category personnel including Station Masters must undergo a periodic medical examination (PME) every 4 years up to age 55, then every 2 years." },
  { q: "Isolation of a running line from sidings is designed to prevent:", opts: ["Over-speeding", "Collisions due to rolling stock escape", "Signal failures", "Interlocking failures"], ans: 1, explanation: "Siding isolation prevents rolling stock or stalled vehicles from accidentally escaping, rolling out, and fouling the active running lines." },
  { q: "What whistle code is sounded when entering a tunnel?", opts: ["One long blast", "Continuous short blasts", "Two short blasts", "Continuous long whistle"], ans: 3, explanation: "Loco pilots must sound a continuous long whistle when entering and passing through a tunnel to warn any track patrolmen or engineering staff." },
  { q: "Fuses or detonators are used to protect track defects at a distance of:", opts: ["600m and 1200m", "500m and 1000m", "800m and 2000m", "1200m and 2000m"], ans: 0, explanation: "In case of track obstruction, 3 detonators are placed: 1st at 600m, 2nd at 1200m, and the 3rd at 1210m to warn oncoming train crews." },
  { q: "What class of station has points and signals interlocked, enabling line clear exchange?", opts: ["Class A", "Class B", "Class C", "Non-interlocked"], ans: 1, explanation: "Class B stations are standard interlocked block stations equipped with home and starter signals, authorizing Line Clear exchange." },
  { q: "The standard shunting authority form is:", opts: ["T/369(3b)", "T/806", "T/A 901", "T/511"], ans: 1, explanation: "Form T/806 is the official shunting order, listing all authorized shunt movements, point locks, and speed restrictions." },
  { q: "If a Station Master detects a hot axle on a passing train, they must first:", opts: ["Call the division control office", "Display danger hand signal and stop the train", "Inform the next station", "Log the event"], ans: 1, explanation: "Safety protocols dictate that the Station Master must immediately exhibit a danger hand signal to stop the train and prevent axle failure or derailment." },
  { q: "The maximum speed under 'Caution Order' when no speed limit is specified is:", opts: ["15 km/h", "30 km/h", "45 km/h", "20 km/h"], ans: 0, explanation: "If no specific speed limit is written on a Caution Order, the standard maximum speed is restricted to 15 km/h for track inspection beats." },
  { q: "Which class of station serves strictly as a block hut without point switches?", opts: ["Class A", "Class B", "Class C", "Class D"], ans: 2, explanation: "Class C block stations (or block huts) do not have point switches or loop lines, serving strictly as intermediate block boundaries." },
  { q: "Who is responsible for point locking during shunting operations?", opts: ["Pointsman", "Station Master", "Cabin Master", "Train Manager"], ans: 1, explanation: "The Station Master on duty is ultimately responsible for ensuring that facing points are locked and clamped during shunting operations." },
  { q: "A flashing red aspect on a signal indicates:", opts: ["Track circuit defect", "Proceed with caution", "Stop and proceed after 1 min", "Gate signal alert"], ans: 2, explanation: "A flashing red light or 'Danger' aspect indicates that the driver must stop the train and can proceed after waiting 1 minute by day/2 minutes by night." },
  { q: "A trap point isolation is used to protect:", opts: ["Passenger platform lines", "Running lines from siding vehicles", "Level crossings", "Relay room locking"], ans: 1, explanation: "Trap points derail an escaping vehicle or siding vehicle to prevent it from fouling or colliding with trains running on the main line." },
  { q: "Refresher training for Traffic Inspectors must be completed every:", opts: ["3 Years", "5 Years", "2 Years", "None"], ans: 0, explanation: "Periodic training courses for Traffic Inspectors are conducted once every 3 years to maintain proficiency in safety, engineering, and operating rules." },
  { q: "During block instrument failure, line clear is authorized using:", opts: ["Token", "Paper Line Clear Ticket", "Cabin ticket", "Hand signal"], ans: 1, explanation: "A Paper Line Clear Ticket (PLCT) is the written authority issued to proceed when block instruments fail, ensuring absolute block safety." }
];

export const INIT_TI_ASSESS_HISTORY = [];

export const defaultSMForm = () => ({
  knowledgeOfRules: Array(5).fill(null),
  alertness:        Array(5).fill(null),
  safetyRecord:     Array(5).fill(null),
  leadership:       Array(5).fill(null),
  discipline:       Array(5).fill(null),
  appearance:       Array(5).fill(null),
  knowledgeMarks: "", alcoholicStatus: "", pmeStatus: "Fit",
  refStatus: "Cleared", counselling: "Not Required",
  automaticTraining: "Not Required", remarks: ""
});

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

export const defaultSSForm = () => ({
  stationOps:   Array(5).fill(null),
  staffMgmt:    Array(5).fill(null),
  records:      Array(5).fill(null),
  safety:       Array(5).fill(null),
  infra:        Array(5).fill(null),
  knowledgeMarks: "", alcoholicStatus: "", pmeStatus: "Fit",
  refStatus: "Cleared", counselling: "Not Required",
  automaticTraining: "Not Required", remarks: ""
});
