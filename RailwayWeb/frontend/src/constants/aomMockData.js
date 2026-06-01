
import { 
  Activity, AlertCircle, AlertTriangle, ArrowRightLeft, ArrowLeft, BarChart3, Building2, BusFront, 
  ClipboardCheck, Eye, ExternalLink, Filter, Cog, FileCheck, FileDown, FileText, FileBarChart2, 
  LayoutDashboard, Lock, LogOut, PlusCircle, Plus, Search, ShieldCheck, Star, UserCheck, UserPlus, 
  UserRoundSearch, Users, Edit, Trash2, TrendingUp, UserRound, TrainFront, CheckCircle, Clock, XCircle, 
  MapPin, Phone, Calendar, Award, Globe, Tag, GitBranch, Cpu, Layers, Zap, Mail, AlignJustify, Gauge, UserCircle2 
} from 'lucide-react';

const MONTHLY_TREND = [
  { month: "Dec'25", score: 81, safety: 80 },
  { month: "Jan'26", score: 83, safety: 82 },
  { month: "Feb'26", score: 85, safety: 85 },
  { month: "Mar'26", score: 87, safety: 88 },
  { month: "Apr'26", score: 89, safety: 91 },
  { month: "May'26", score: 91, safety: 94 }
];

const ASSESSMENT_MONTHLY = [
  { month: "Nov", approved: 380, pending: 60, rejected: 18, overdue: 12 },
  { month: "Dec", approved: 410, pending: 55, rejected: 22, overdue: 15 },
  { month: "Jan", approved: 440, pending: 70, rejected: 19, overdue: 10 },
  { month: "Feb", approved: 460, pending: 65, rejected: 21, overdue: 9 },
  { month: "Mar", approved: 490, pending: 58, rejected: 17, overdue: 8 },
  { month: "Apr", approved: 520, pending: 68, rejected: 20, overdue: 11 }
];

const COMPLIANCE = [
  { label: "Overall Safety Compliance", pct: 91, color: "#16a34a" },
  { label: "PME Completion Rate", pct: 87, color: "#2563eb" },
  { label: "REF Completion Rate", pct: 83, color: "#7c3aed" },
  { label: "Incident Reporting Compliance", pct: 94, color: "#0891b2" },
  { label: "Disciplinary Clean Record", pct: 96, color: "#16a34a" }
];

const CAT_COLORS = { A: "#1E3A5F", B: "#2B6CB0", C: "#D69E2E", D: "#C53030" };
const RISK_COLORS = { Low: "#2F855A", Medium: "#D69E2E", High: "#C53030" };
const STATUS_COLORS = { Approved: "#2F855A", Pending: "#D69E2E", Rejected: "#C53030", Overdue: "#9B2C2C" };

const generate96Stations = () => {
  const divisionMap = {
    Nagpur: ["NGP", "WR", "BD", "AK", "SEGM", "AJNI", "PLO", "DMN", "MZR", "SEG", "MKU", "JL", "CSN", "ET"],
    Pune: ["PUNE", "LNL", "SVJR", "KK", "DAPD", "CCH", "PMP", "TGN", "DEHR", "KAD", "DD", "ANG", "KPG", "SNSI", "STR"],
    Mumbai: ["CSMT", "BY", "DR", "CLA", "GC", "TNA", "DIVA", "DI", "KYN", "SHAD", "ABY", "AMR", "ULNR", "VLDI"],
    Solapur: ["SUR", "KWV", "PVR", "LUR", "UMD", "BTW"],
    Bhusawal: ["BSL", "NK", "MMR", "JL", "BAU", "KNW", "HD", "DVL"]
  };

  const stationsData = [];
  const divisions = Object.keys(divisionMap);
  const categories = ["A", "B", "C", "D"];
  const risks = ["Low", "Medium", "High"];
  const statuses = ["Approved", "Pending", "Completed"];
  
  const baseNames = [
    "Nagpur Main", "Wardha Junction", "Badnera Town", "Akola Junction", "Sewagram", "Ajni Central", 
    "Pulgaon", "Dhamangaon", "Murtajapur", "Shegaon", "Malkapur", "Jalgaon Junction", "Chalisgaon", 
    "Itarsi Jn", "Bhopal Junction", "Dongargarh", "Gondia Jn", "Durg Jn", "Raipur Jn", "Bilaspur Jn",
    "Pune Junction", "Lonavala", "Shivajinagar", "Khadki", "Dapodi", "Chinchwad", "Pimpri", 
    "Taloja", "Dehu Road", "Khadala", "Daund Jn", "Ahmednagar", "Kopargaon", "Sainagar Shirdi", 
    "Satara", "Kolhapur", "Sangli", "Miraj Jn", "Londa", "Ghatprabha",
    "CSMT Terminal", "Byculla", "Dadar Central", "Kurla Jn", "Ghatkopar", "Thane Main", "Diva Jn", 
    "Dombivli", "Kalyan Jn", "Shahad", "Ambivali", "Titwala", "Ulhasnagar", "Vithalwadi", "Badlapur", 
    "Vashi", "Karjat Jn", "Igatpuri", "Bhandup", "Mulund",
    "Solapur Jn", "Kurduvadi Jn", "Pandharpur", "Latur Town", "Osmanabad", "Barsi Town",
    "Bhusawal Jn", "Nashik Road", "Manmad Jn", "Burhanpur", "Khandwa Jn", "Harda", "Devlali", 
    "Khamgaon", "Pachora", "Nandurbar", "Amravati", "Chandrapur", "Ballarshah", "Wardha East",
    "Sindi Town", "Butibori", "Kalmeshwar", "Katol", "Narkher", "Pandhurna", "Multai", "Amla Jn",
    "Betul", "Ghoradongri", "Itarsi West", "Hoshangabad", "Budni", "Obaidullaganj", "Mandideep"
  ];

  for (let i = 0; i < 96; i++) {
    const division = divisions[i % divisions.length];
    const codeList = divisionMap[division];
    const code = codeList[Math.floor(i / divisions.length) % codeList.length] + `_${10 + Math.floor(i/10)}`;
    const name = baseNames[i % baseNames.length];
    const completed = 200 + ((i * 17) % 600);
    const pending = 15 + ((i * 11) % 130);
    const avgScore = 72 + ((i * 3) % 25);
    const category = categories[i % categories.length];
    const riskLevel = i % 7 === 0 ? "High" : i % 3 === 0 ? "Medium" : "Low";
    const assessmentStatus = statuses[i % statuses.length];
    
    const day = 10 + (i % 45);
    const lastUpdatedDate = `2026-04-${day < 10 ? "0" + day : day}`;

    stationsData.push({
      id: `ST_${1001 + i}`,
      stationName: name,
      stationCode: code,
      division,
      zone: "CR",
      completed,
      pending,
      avgScore,
      category,
      riskLevel,
      assessmentStatus,
      lastUpdatedDate
    });
  }
  return stationsData;
};

const DASHBOARD_96_STATIONS = generate96Stations();

const stationProgressData = [
  { station: "Nagpur", completed: 450, pending: 100 },
  { station: "Wardha", completed: 490, pending: 130 },
  { station: "Badnera", completed: 530, pending: 160 },
  { station: "Akola", completed: 570, pending: 190 },
  { station: "Yavatmal", completed: 610, pending: 220 },
  { station: "Parbhani", completed: 640, pending: 250 },
  { station: "Parli Vaijnath", completed: 680, pending: 95 },
  { station: "Latur", completed: 710, pending: 130 },
  { station: "Vikarabad", completed: 750, pending: 160 },
  { station: "Aurangabad", completed: 790, pending: 190 },
  { station: "Pundlik", completed: 830, pending: 210 },
  { station: "Jalna", completed: 860, pending: 240 },
  { station: "Partur", completed: 440, pending: 90 },
  { station: "Mudkhed", completed: 480, pending: 120 },
  { station: "Visapur", completed: 510, pending: 150 }
];

const categoryData = [
  { name: "Grade A", value: 14.6, color: "#57b35a" },
  { name: "Grade B", value: 37.5, color: "#3f9be6" },
  { name: "Grade C", value: 36.5, color: "#f5a623" },
  { name: "Grade D", value: 11.5, color: "#e55a54" }
];

const sidebarItems = [
  { icon: Gauge, label: "Dashboard" },
  { icon: Users, label: "Pointsmen" },
  { icon: Building2, label: "Station Masters" },
  { icon: UserCheck, label: "Station Superintendents" },
  { icon: BusFront, label: "Train Managers" },
  { icon: ShieldCheck, label: "Traffic Inspectors" },
  { icon: Building2, label: "Stations" },
  { icon: CheckCircle, label: "Approvals" },
  { icon: FileCheck, label: "Assessments" },
  { icon: BarChart3, label: "Reports and Analytics" },
  { icon: UserCircle2, label: "My Profile" }
];

const summaryCards = [
  {
    icon: Users,
    iconClass: "icon-slate",
    trend: "+2.4%",
    value: "14,280",
    title: "TOTAL EMPLOYEES",
    subtitle: "Active Staff Count"
  },
  {
    icon: UserCheck,
    iconClass: "icon-green",
    trend: "+1.5%",
    value: "12,104",
    title: "EVALUATIONS COMPLETED",
    subtitle: "85% Global Rate"
  },
  {
    icon: AlertCircle,
    iconClass: "icon-orange",
    trend: "Attention",
    value: "482",
    title: "PENDING APPROVALS",
    subtitle: "Requires resolution",
    trendAlert: true
  },
  {
    icon: Star,
    iconClass: "icon-blue",
    value: "78.5",
    title: "AVERAGE SCORE",
    subtitle: "B-Grade Average"
  },
  {
    icon: ShieldCheck,
    iconClass: "icon-green",
    value: "99.2%",
    title: "SAFETY COMPLIANCE",
    subtitle: "Divisional Audit",
    status: "Standard Met"
  }
];

const designationOptions = ["Pointsman", "Station Master", "Train Manager", "Station Supervisor", "Traffic Inspector"];
const departmentOptions = ["Operations", "Administration", "Finance", "HR", "IT"];
const userTypeOptions = ["AOM", "Manager", "Employee", "Viewer"];
const reportingOfficerOptions = ["R. Kumar", "S. Deshmukh", "P. Nair", "M. Verma", "A. Singh"];

const aomReadOnlyProfile = {
  designation: "AOM / General",
  zoneHq: "Zonal Headquarters",
  division: "Central Division",
  reportingOfficer: "Super Admin - SA_1001",
  contact: "+91 99880 11223",
  email: "aom.console@rail.in"
};

const initialUserFormData = {
  employeeName: "",
  hrmsId: "",
  mobileNo: "",
  emailId: "",
  designation: "",
  department: "Operations",
  userType: "Employee",
  reportingOfficer: "R. Kumar",
  zone: "",
  division: "",
  stationName: "",
  
  // Pointsman-specific
  reportingSm: "",
  shift: "",
  workLocation: "",

  // SM-specific
  smStation: "",
  smDivision: "",
  smZone: "",

  // TI-specific
  jurisdiction: "",
  linkedStations: "",
  reportingAom: ""
};

const initialFilterData = {
  mobileNo: "",
  designation: "",
  hrmsId: "",
  department: "",
  userType: ""
};

const stationZoneOptions = ["Central Railway", "Western Railway", "Northern Railway", "Southern Railway", "Eastern Railway"];
const stationDivisionOptions = ["Nagpur", "Pune", "Mumbai", "Delhi", "Chennai"];
const stationCategoryOptions = ["A", "B", "C", "D", "Halt"];
const stationTypeOptions = ["Junction", "Terminal", "Halt"];

const initialStationFormData = {
  stationName: "",
  stationCode: "",
  zone: "",
  division: "",
  category: "",
  stationType: "",
  platforms: "",
  tracks: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  stationMasterName: "",
  contactNumber: "",
  emailId: "",
  latitude: "",
  longitude: "",
  status: "Active"
};

const initialStationFilterData = {
  zone: "",
  division: "",
  category: "",
  status: ""
};

const initialStations = [
  {
    id: 1,
    stationName: "Nagpur Junction",
    stationCode: "NGP",
    zone: "Central Railway",
    division: "Nagpur",
    category: "A",
    platforms: 8,
    tracks: 14,
    stationType: "Junction",
    status: "Active",
    createdBy: "SA_1001",
    address: "Station Road, Sitabuldi",
    city: "Nagpur",
    state: "Maharashtra",
    pincode: "440001",
    stationMasterName: "A. Patil",
    contactNumber: "9890011122",
    emailId: "ngp.station@rail.in",
    latitude: "21.1458",
    longitude: "79.0882"
  },
  {
    id: 2,
    stationName: "Pune Junction",
    stationCode: "PUNE",
    zone: "Central Railway",
    division: "Pune",
    category: "A",
    platforms: 6,
    tracks: 12,
    stationType: "Junction",
    status: "Active",
    createdBy: "SA_1001",
    address: "Railway Station Rd, Agarkar Nagar",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
    stationMasterName: "R. Jadhav",
    contactNumber: "9880012233",
    emailId: "pune.station@rail.in",
    latitude: "18.5284",
    longitude: "73.8742"
  },
  {
    id: 3,
    stationName: "New Delhi",
    stationCode: "NDLS",
    zone: "Northern Railway",
    division: "Delhi",
    category: "A",
    platforms: 16,
    tracks: 24,
    stationType: "Terminal",
    status: "Active",
    createdBy: "SA_1001",
    address: "Bhavbhuti Marg, Ajmeri Gate",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110006",
    stationMasterName: "M. Sharma",
    contactNumber: "9870014455",
    emailId: "ndls.station@rail.in",
    latitude: "28.6436",
    longitude: "77.2194"
  }
];

const tiCategoryOptions = ["A", "B", "C", "D"];
const tiAssessmentStatusOptions = ["Completed", "Pending"];

const initialTrafficInspectors = [
  {
    id: 1,
    name: "R. Khan",
    employeeId: "TI_1001",
    stationName: "Parbhani Junction",
    tiArea: "TI PAR",
    division: "TI PAR",
    category: "A",
    riskLevel: "Low",
    lastScore: 88,
    assessmentStatus: "Completed",
    phone: "9890029911",
    email: "rkhan@rail.in"
  },
  {
    id: 2,
    name: "A. Kulkarni",
    employeeId: "TI_1002",
    stationName: "Amla",
    tiArea: "TI AMLA",
    division: "TI AMLA",
    category: "B",
    riskLevel: "Medium",
    lastScore: 77,
    assessmentStatus: "Pending",
    phone: "9890017788",
    email: "akulkarni@rail.in"
  },
  {
    id: 3,
    name: "S. Verma",
    employeeId: "TI_1003",
    stationName: "Nagpur Junction",
    tiArea: "TI NGP",
    division: "TI NGP",
    category: "A",
    riskLevel: "Low",
    lastScore: 91,
    assessmentStatus: "Pending",
    phone: "9873312211",
    email: "sverma@rail.in"
  }
];

const hrmsTiDirectory = [
  {
    hrmsId: "TI3201",
    name: "S. Verma",
    jurisdiction: "Delhi",
    category: "TI",
    assessmentStatus: "Pending",
    division: "Delhi",
    phone: "9873312211",
    email: "sverma@rail.in"
  },
  {
    hrmsId: "TI3202",
    name: "M. Das",
    jurisdiction: "Nagpur",
    category: "Assistant TI",
    assessmentStatus: "In Progress",
    division: "Nagpur",
    phone: "9890016644",
    email: "mdas@rail.in"
  }
];

const initialTiFormData = {
  name: "",
  employeeId: "",
  jurisdiction: "",
  category: "",
  assessmentStatus: "Pending"
};

const stationAverageScoreData = [
  { station: "Nagpur", avgScore: 86 },
  { station: "Pune", avgScore: 89 },
  { station: "Delhi", avgScore: 84 },
  { station: "Mumbai", avgScore: 88 },
  { station: "Jalna", avgScore: 91 },
  { station: "Parbhani", avgScore: 82 }
];

const initialPendingAssessments = [
  {
    id: "SM_1001",
    title: "Station Master - SM_1001",
    statusLabel: "Pending Approval",
    assessedByLine: "Assessed by: TI/SS - on 2026-04-15",
    employeeLine: "Employee: R. Jadhav | Division: Pune",
    actionType: "approval"
  },
  {
    id: "TM_1001",
    title: "Train Manager - TM_1001",
    statusLabel: "Pending Approval",
    assessedByLine: "Assessed by: TI/SS - on 2026-04-14",
    employeeLine: "Employee: V. Singh | Division: Mumbai",
    actionType: "approval"
  },
  {
    id: "TI_1001",
    title: "Traffic Inspector - TI_1001",
    statusLabel: "Pending Approval",
    assessedByLine: "Assessed by: AOM/G - on 2026-04-13",
    employeeLine: "Employee: A. Kulkarni | Division: Nagpur",
    actionType: "approval"
  },
  {
    id: "SS_1001",
    title: "Station Supervisor - SS_1001",
    statusLabel: "Pending Assessment",
    assessedByLine: "Awaiting: Your Assessment - on 2026-04-12",
    employeeLine: "Employee: P. Verma | Division: Delhi",
    actionType: "assessment"
  }
];

const initialApprovedAssessments = [
  {
    id: "SM_1002",
    title: "Station Master - SM_1002",
    detail: "Approved by: AOM/G - on 2026-04-09",
    score: "Score: 92/100 - Grade: A"
  },
  {
    id: "TM_1002",
    title: "Train Manager - TM_1002",
    detail: "Approved by: AOM/G - on 2026-04-08",
    score: "Score: 88/100 - Grade: B"
  },
  {
    id: "TI_1005",
    title: "Traffic Inspector - TI_1005",
    detail: "Approved by: AOM/G - on 2026-04-07",
    score: "Score: 85/100 - Grade: B"
  }
];

const initialReportRows = [
  {
    id: "PM_1001",
    hrmsId: "PM_1001",
    name: "K. Pawar",
    designation: "Pointsman",
    assessmentStatus: "Approved",
    score: "85",
    grade: "B",
    lastAssessed: "2026-04-10"
  },
  {
    id: "SM_1001",
    hrmsId: "SM_1001",
    name: "R. Jadhav",
    designation: "Station Master",
    assessmentStatus: "Approved",
    score: "92",
    grade: "A",
    lastAssessed: "2026-04-09"
  },
  {
    id: "TM_1001",
    hrmsId: "TM_1001",
    name: "V. Singh",
    designation: "Train Manager",
    assessmentStatus: "Approved",
    score: "88",
    grade: "B",
    lastAssessed: "2026-04-08"
  },
  {
    id: "TI_1001",
    hrmsId: "TI_1001",
    name: "A. Kulkarni",
    designation: "Traffic Inspector",
    assessmentStatus: "Approved",
    score: "85",
    grade: "B",
    lastAssessed: "2026-04-07"
  },
  {
    id: "SS_1001",
    hrmsId: "SS_1001",
    name: "P. Verma",
    designation: "Station Supervisor",
    assessmentStatus: "Pending",
    score: "-",
    grade: "-",
    lastAssessed: "-"
  },
  {
    id: "SM_1002",
    hrmsId: "SM_1002",
    name: "M. Sharma",
    designation: "Station Master",
    assessmentStatus: "Approved",
    score: "90",
    grade: "A",
    lastAssessed: "2026-04-06"
  }
];

const assessmentCriteria = [
  { key: "knowledgeOfRules", label: "Knowledge of Rules", marks: 25 },
  { key: "alertnessAndObservation", label: "Alertness and observation of rules", marks: 25 },
  { key: "safetyRecord", label: "Safety Record", marks: 15 },
  { key: "leadershipAndManagement", label: "Leadership and Management", marks: 15 },
  { key: "discipline", label: "Discipline", marks: 10 },
  { key: "appearanceAndNeatness", label: "Appearance & neatness", marks: 10 }
];

export { MONTHLY_TREND };
export { ASSESSMENT_MONTHLY };
export { COMPLIANCE };
export { CAT_COLORS };
export { RISK_COLORS };
export { STATUS_COLORS };
export { generate96Stations };
export { DASHBOARD_96_STATIONS };
export { stationProgressData };
export { categoryData };
export { sidebarItems };
export { summaryCards };
export { designationOptions };
export { departmentOptions };
export { userTypeOptions };
export { reportingOfficerOptions };
export { aomReadOnlyProfile };
export { initialUserFormData };
export { initialFilterData };
export { stationZoneOptions };
export { stationDivisionOptions };
export { stationCategoryOptions };
export { stationTypeOptions };
export { initialStationFormData };
export { initialStationFilterData };
export { initialStations };
export { tiCategoryOptions };
export { tiAssessmentStatusOptions };
export { initialTrafficInspectors };
export { hrmsTiDirectory };
export { initialTiFormData };
export { stationAverageScoreData };
export { initialPendingAssessments };
export { initialApprovedAssessments };
export { initialReportRows };
export { assessmentCriteria };