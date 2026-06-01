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

export const MONTHLY_TREND = [
  { month: "Dec'25", score: 81, safety: 80 },
  { month: "Jan'26", score: 83, safety: 82 },
  { month: "Feb'26", score: 85, safety: 85 },
  { month: "Mar'26", score: 87, safety: 88 },
  { month: "Apr'26", score: 89, safety: 91 },
  { month: "May'26", score: 91, safety: 94 }
];

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
  { id: "SM_1001", name: "S. Deshmukh", role: "Station Master", designation: "Station Master", station: "Parbhani Junction", cat: "A", lastAssessDate: "2026-03-20", score: 86, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 11001", joiningDate: "2018-02-12" },
  { id: "SM_2102", name: "A. Kulkarni", role: "Station Master", designation: "Station Master", station: "Parbhani Junction", cat: "B", lastAssessDate: "2026-02-14", score: 72, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 11002", joiningDate: "2019-05-15" },
  { id: "SM_2201", name: "M. Patil", role: "Station Master", designation: "Station Master", station: "Amla Junction", cat: "A", lastAssessDate: "2026-03-12", score: 84, pmeStatus: "Fit", refStatus: "Pending", contact: "+91 98765 11003", joiningDate: "2016-08-20" },
  { id: "SM_2202", name: "R. Sharma", role: "Station Master", designation: "Station Master", station: "Amla Junction", cat: "C", lastAssessDate: "2026-01-30", score: 54, pmeStatus: "Pending", refStatus: "Pending", contact: "+91 98765 11004", joiningDate: "2021-10-10" },
  { id: "SM_2301", name: "V. Singh", role: "Station Master", designation: "Station Master", station: "Badnera Junction", cat: "A", lastAssessDate: "2026-03-15", score: 88, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 11005", joiningDate: "2015-04-12" },
  { id: "SM_2302", name: "T. Mehta", role: "Station Master", designation: "Station Master", station: "Badnera Junction", cat: "B", lastAssessDate: "2026-02-20", score: 71, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 11006", joiningDate: "2020-03-18" },
  { id: "SM_2401", name: "K. Raghuvanshi", role: "Station Master", designation: "Station Master", station: "Nagpur Junction", cat: "A", lastAssessDate: "2026-03-22", score: 92, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 11007", joiningDate: "2014-06-25" },
  { id: "SM_2501", name: "P. Wankhede", role: "Station Master", designation: "Station Master", station: "Akola Junction", cat: "B", lastAssessDate: "2026-03-01", score: 74, pmeStatus: "Overdue", refStatus: "Expired", contact: "+91 98765 11008", joiningDate: "2017-09-08" },
  
  { id: "PM_1001", name: "K. Pawar", role: "Pointsman", designation: "Pointsman Grade I", station: "Parbhani Junction", cat: "A", lastAssessDate: "2026-04-10", score: 80, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 22001", joiningDate: "2020-01-10" },
  { id: "PM_1002", name: "R. Verma", role: "Pointsman", designation: "Pointsman Grade I", station: "Amla Junction", cat: "B", lastAssessDate: "2026-04-09", score: 68, pmeStatus: "Fit", refStatus: "Pending", contact: "+91 98765 22002", joiningDate: "2021-06-18" },
  { id: "PM_1003", name: "D. Rane", role: "Pointsman", designation: "Pointsman Grade II", station: "Amla Junction", cat: "D", lastAssessDate: "2026-04-08", score: 44, pmeStatus: "Unfit", refStatus: "Pending", contact: "+91 98765 22003", joiningDate: "2022-11-22" },
  { id: "PM_1004", name: "J. Shaikh", role: "Pointsman", designation: "Pointsman Grade I", station: "Badnera Junction", cat: "A", lastAssessDate: "2026-04-04", score: 88, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 22004", joiningDate: "2019-12-05" },
  { id: "PM_1005", name: "A. Gade", role: "Pointsman", designation: "Pointsman Grade II", station: "Akola Junction", cat: "C", lastAssessDate: "2026-03-24", score: 58, pmeStatus: "Overdue", refStatus: "Cleared", contact: "+91 98765 22005", joiningDate: "2023-04-15" },
  { id: "PM_1006", name: "S. Meshram", role: "Pointsman", designation: "Pointsman Grade I", station: "Nagpur Junction", cat: "A", lastAssessDate: "2026-03-28", score: 94, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 22006", joiningDate: "2018-05-19" },
  { id: "PM_1007", name: "G. Chawla", role: "Pointsman", designation: "Pointsman Grade II", station: "Itarsi Junction", cat: "A", lastAssessDate: "2026-03-14", score: 82, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 22007", joiningDate: "2020-07-20" },
  { id: "PM_1008", name: "H. Singh", role: "Pointsman", designation: "Pointsman Grade I", station: "Wardha Junction", cat: "B", lastAssessDate: "2026-03-10", score: 76, pmeStatus: "Fit", refStatus: "Expired", contact: "+91 98765 22008", joiningDate: "2017-02-28" },
  { id: "PM_1009", name: "B. Yadav", role: "Pointsman", designation: "Pointsman Grade II", station: "Chandrapur Station", cat: "C", lastAssessDate: "2026-03-05", score: 51, pmeStatus: "Overdue", refStatus: "Pending", contact: "+91 98765 22009", joiningDate: "2022-09-01" },
  { id: "PM_1010", name: "N. Dewangan", role: "Pointsman", designation: "Pointsman Grade I", station: "Gondia Junction", cat: "A", lastAssessDate: "2026-03-18", score: 85, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 22010", joiningDate: "2019-08-11" },
  
  { id: "SS_1001", name: "S. K. Mukherjee", role: "Station Superintendent", designation: "Station Superintendent", station: "Nagpur Junction", cat: "A", lastAssessDate: "2026-04-14", score: 92, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 33001", joiningDate: "2012-05-18" },
  { id: "SS_1002", name: "H. S. Rawat", role: "Station Superintendent", designation: "Station Superintendent", station: "Parbhani Junction", cat: "A", lastAssessDate: "2026-03-22", score: 89, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 33002", joiningDate: "2013-09-10" },
  { id: "SS_1003", name: "Anand Vardhan", role: "Station Superintendent", designation: "Station Superintendent", station: "Akola Junction", cat: "B", lastAssessDate: "2026-02-18", score: 75, pmeStatus: "Fit", refStatus: "Pending", contact: "+91 98765 33003", joiningDate: "2015-11-05" },

  { id: "TM_1001", name: "Dilip Kumar", role: "Train Manager", designation: "Train Manager", station: "Nagpur Junction", cat: "A", lastAssessDate: "2026-04-20", score: 90, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 44001", joiningDate: "2017-06-12" },
  { id: "TM_1002", name: "Vikas Dubey", role: "Train Manager", designation: "Train Manager", station: "Badnera Junction", cat: "B", lastAssessDate: "2026-03-11", score: 78, pmeStatus: "Fit", refStatus: "Pending", contact: "+91 98765 44002", joiningDate: "2019-10-22" },
  { id: "TM_1003", name: "J. P. Nadda", role: "Train Manager", designation: "Train Manager", station: "Amla Junction", cat: "C", lastAssessDate: "2026-01-25", score: 56, pmeStatus: "Pending", refStatus: "Expired", contact: "+91 98765 44003", joiningDate: "2021-04-15" }
];

export const DEFAULT_SS_TM_USERS = [
  { id: "SS_1001", name: "S. K. Mukherjee", role: "Station Superintendent", designation: "Station Superintendent", station: "Nagpur Junction", cat: "A", lastAssessDate: "2026-04-14", score: 92, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 33001", joiningDate: "2012-05-18" },
  { id: "SS_1002", name: "H. S. Rawat", role: "Station Superintendent", designation: "Station Superintendent", station: "Parbhani Junction", cat: "A", lastAssessDate: "2026-03-22", score: 89, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 33002", joiningDate: "2013-09-10" },
  { id: "SS_1003", name: "Anand Vardhan", role: "Station Superintendent", designation: "Station Superintendent", station: "Akola Junction", cat: "B", lastAssessDate: "2026-02-18", score: 75, pmeStatus: "Fit", refStatus: "Pending", contact: "+91 98765 33003", joiningDate: "2015-11-05" },

  { id: "TM_1001", name: "Dilip Kumar", role: "Train Manager", designation: "Train Manager", station: "Nagpur Junction", cat: "A", lastAssessDate: "2026-04-20", score: 90, pmeStatus: "Fit", refStatus: "Cleared", contact: "+91 98765 44001", joiningDate: "2017-06-12" },
  { id: "TM_1002", name: "Vikas Dubey", role: "Train Manager", designation: "Train Manager", station: "Badnera Junction", cat: "B", lastAssessDate: "2026-03-11", score: 78, pmeStatus: "Fit", refStatus: "Pending", contact: "+91 98765 44002", joiningDate: "2019-10-22" },
  { id: "TM_1003", name: "J. P. Nadda", role: "Train Manager", designation: "Train Manager", station: "Amla Junction", cat: "C", lastAssessDate: "2026-01-25", score: 56, pmeStatus: "Pending", refStatus: "Expired", contact: "+91 98765 44003", joiningDate: "2021-04-15" }
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

export const INIT_INSPECTIONS = [
  { id: "IN_101", date: "2026-05-10", station: "Amla Junction", officer: "TI R. Khan", observations: "Siding point interlocking operation checked. Satisfactory speed compliance.", risk: "Low", status: "Closed" },
  { id: "IN_102", date: "2026-05-18", station: "Chandrapur Station", officer: "TI R. Khan", observations: "Joint gap clearance in crossing 12B slightly wide. Safety Speed restriction of 15km/h advised.", risk: "Medium", status: "Active" },
  { id: "IN_103", date: "2026-05-24", station: "Akola Junction", officer: "TI R. Khan", observations: "Station Master logs audit. Slight delay in registering daily block clearing times.", risk: "Low", status: "Pending Action" }
];

export const INIT_COUNSELLING = [
  { id: "CL_101", date: "2026-05-12", staffName: "D. Rane", designation: "Pointsman Grade II", station: "Amla Junction", topics: "Alcoholic rehabilitation counseling. Safety and alertness briefing.", duration: "45 mins", progress: "Under Monitor" },
  { id: "CL_102", date: "2026-05-20", staffName: "A. Gade", designation: "Pointsman Grade II", station: "Akola Junction", topics: "Periodic medical exam preparation. Rest compliance counseling.", duration: "30 mins", progress: "Completed" }
];

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
    ]
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
    ]
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
    ]
  }
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
