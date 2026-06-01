import { useMemo, useState, useEffect } from "react";
import {
  Award,
  BarChart2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileBarChart2,
  Gauge,
  LogOut,
  PlayCircle,
  Search,
  Target,
  TrendingUp,
  UserCircle2,
  ArrowUpDown,
  ShieldCheck,
  Bell,
  ShieldAlert,
  Clock,
  Activity,
  FileText,
  AlertTriangle,
  Lock,
  RefreshCw,
  Paperclip,
  Trash2,
  Volume2,
  VolumeX,
  Plus,
  ArrowLeft,
  Users,
  Building2,
  UserPlus,
  Edit
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { INIT_STATIONS, INIT_USERS, TEST_NAME, testQuestions, initialHistory } from './data/mockSSData';
import { getCat, getUserRisk, getCategory, getCategoryColor, getCategoryBg, formatQuarterPeriod } from './utils/ssUtils';
import "./sdom.css";
import SSDashboard from './pages/superintendent/SSDashboard';
import SSProfile from './pages/superintendent/SSProfile';
import SSSafety from './pages/superintendent/SSSafety';
import SSRoleView from './pages/superintendent/SSRoleView';
import SSStaffDetail from './pages/superintendent/SSStaffDetail';
import SSModals from './pages/superintendent/SSModals';
import SSMyAssessment from './pages/superintendent/SSMyAssessment';










/* ─── Navigation ─── */
const navItems = [
  { key: "dashboard",      label: "Dashboard",      icon: Gauge },
  { key: "pointsmen",      label: "Pointsmen",      icon: Users },
  { key: "stationMasters", label: "Station Masters",icon: Building2 },
  { key: "myAssessment",   label: "My Assessment",  icon: FileBarChart2 },
  { key: "profile",        label: "My Profile",     icon: UserCircle2 }
];

/* ─── Static profile data with requested fields ─── */
const stationSuperintendentProfile = {
  name: "R. Kulkarni",
  hrmsId: "SS_1001",
  stationName: "Nagpur Junction (NGP)",
  designation: "Station Superintendent",
  mobileNumber: "+91 98220 55001",
  pmeStatus: "FIT (Periodic Medical Exam) - Due: 2029-05-14",
  refStatus: "COMPLETED (Refresher Course) - Due: 2027-04-12",
  trainingStatus: "ACTIVE (Safety & Supervision Certified)",
  currentCategory: "A",
  department: "Operations",
  reportingOfficer: "Traffic Inspector",
  joiningDate: "2012-03-10"
};

const stationTiMap = {
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



const ROLE_MAP = {
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

const MONTHLY_TREND = [
  { month: "Dec'25", score: 81, safety: 80 },
  { month: "Jan'26", score: 83, safety: 82 },
  { month: "Feb'26", score: 85, safety: 85 },
  { month: "Mar'26", score: 87, safety: 88 },
  { month: "Apr'26", score: 89, safety: 91 },
  { month: "May'26", score: 91, safety: 94 }
];






/* ─── Seed history — ONE test type repeated ─── */


// Helper to generate correct/incorrect response array for seeded history
function generateMockResponses(score) {
  const correctCount = Math.round((score / 100) * 25);
  const arr = Array(25).fill(null);
  const indices = Array.from({ length: 25 }, (_, i) => i);
  // shuffle indices
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const correctIndices = new Set(indices.slice(0, correctCount));
  for (let i = 0; i < 25; i++) {
    const q = testQuestions[i];
    if (correctIndices.has(i)) {
      arr[i] = q.answer; // correct
    } else {
      arr[i] = (q.answer + 1) % 4; // incorrect
    }
  }
  return arr;
}

/* ─── 25 MCQ questions ─── */






/* ─── Single active test for the current month ─── */
const currentTestSeed = {
  id: "CT-APR-2026",
  name: TEST_NAME,
  period: "April 2026"
};

/* ─── Pie chart custom label ─── */
const PIE_COLORS = { A: "#16a34a", B: "#2563eb", C: "#d97706", D: "#dc2626" };

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, payload: inner } = payload[0];
    return (
      <div className="pm-pie-tooltip" style={{ background: '#fff', border: '1px solid #dbe5f0', padding: '8px', borderRadius: '8px' }}>
        <strong>Category {name}</strong>
        <div>{value}% &nbsp;({inner.count} attempt{inner.count !== 1 ? "s" : ""})</div>
      </div>
    );
  }
  return null;
};

// Global Web Audio synth for Emergency sound
let audioCtx = null;
let alarmOsc = null;
let alarmGain = null;
let alarmInterval = null;

function startAlarmSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioCtx = new AudioContextClass();
    
    alarmOsc = audioCtx.createOscillator();
    alarmGain = audioCtx.createGain();
    
    alarmOsc.connect(alarmGain);
    alarmGain.connect(audioCtx.destination);
    
    alarmOsc.type = "sine";
    alarmOsc.frequency.setValueAtTime(500, audioCtx.currentTime);
    alarmGain.gain.setValueAtTime(0, audioCtx.currentTime);
    
    alarmOsc.start();
    
    let state = true;
    alarmInterval = setInterval(() => {
      if (!audioCtx) return;
      // sweep frequency between 500Hz and 850Hz to sound like a warning klaxon
      alarmOsc.frequency.setValueAtTime(state ? 850 : 500, audioCtx.currentTime);
      alarmGain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      state = !state;
    }, 450);
  } catch (err) {
    console.error("Audio Context initiation failed:", err);
  }
}

function stopAlarmSound() {
  if (alarmInterval) {
    clearInterval(alarmInterval);
    alarmInterval = null;
  }
  if (alarmOsc) {
    try { alarmOsc.stop(); } catch(e) {}
    alarmOsc = null;
  }
  if (audioCtx) {
    try { audioCtx.close(); } catch(e) {}
    audioCtx = null;
  }
}

/* ─── Main component ─── */
function StationSuperintendentModule({ user, onLogout }) {
  const fullName = user?.name && user.name !== "Station Superintendent User" ? user.name : stationSuperintendentProfile.name;
  const employeeId = user?.hrmsId || stationSuperintendentProfile.hrmsId;

  const [activeNav, setActiveNav] = useState("dashboard");

  // CRUD & Staff Directory States
  const [view, setView] = useState(null);
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("ti_users");
    return saved ? JSON.parse(saved) : INIT_USERS;
  });
  useEffect(() => {
    localStorage.setItem("ti_users", JSON.stringify(users));
  }, [users]);

  const [stations, setStations] = useState(() => {
    const saved = localStorage.getItem("ti_stations");
    return saved ? JSON.parse(saved) : INIT_STATIONS;
  });
  useEffect(() => {
    localStorage.setItem("ti_stations", JSON.stringify(stations));
  }, [stations]);

  const myStations = useMemo(() => stations, [stations]);

  const [roleF, setRoleF] = useState({ name: "", station: "All", ti: "All", cat: "All", risk: "All" });
  const [editingUser, setEditingUser] = useState(null);
  const [transferringUser, setTransferringUser] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    id: "",
    name: "",
    role: "Station Master",
    designation: "Station Master",
    station: "",
    contact: "",
    joiningDate: "",
    pmeStatus: "Fit",
    refStatus: "Cleared"
  });

  const addAuditLog = (event, details) => {
    logActivity("System", `${event}: ${details}`);
  };
  const [screenMode, setScreenMode] = useState("default");
  const [historyDateSearch, setHistoryDateSearch] = useState("");
  const [historySortOrder, setHistorySortOrder] = useState("date-desc");
  const [historyPage, setHistoryPage] = useState(1);
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(`ss_history_${employeeId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Error reading SS history:", e);
    }
    return initialHistory;
  });

  const [selectedRecord, setSelectedRecord] = useState(null);

  // My Assessment state (mirrors SM module)
  const [myAssessSelected, setMyAssessSelected] = useState(null);
  const [ssMcqTest, setSsMcqTest] = useState(() => {
    const saved = localStorage.getItem(`ss_mcq_test_${employeeId}`);
    return saved ? JSON.parse(saved) : null;
  });
  const [testAssigned, setTestAssigned] = useState(() => {
    const saved = localStorage.getItem(`ss_test_assigned_${employeeId}`);
    if (saved === null) {
      localStorage.setItem(`ss_test_assigned_${employeeId}`, "Assigned");
      return "Assigned";
    }
    return saved;
  });
  const [ssActiveQIdx, setSsActiveQIdx] = useState(0);
  const [ssTestResponses, setSsTestResponses] = useState(() => Array(25).fill(null));
  
  const [currentTest, setCurrentTest] = useState(() => {
    const saved = localStorage.getItem(`ss_current_test_${employeeId}`);
    if (saved) return JSON.parse(saved);
    const mcqResult = localStorage.getItem(`ss_mcq_test_${employeeId}`);
    if (mcqResult && JSON.parse(mcqResult).completed) {
      return null;
    }
    return currentTestSeed;
  });
  
  const [activeTest, setActiveTest] = useState(null);
  const [responses, setResponses] = useState(Array(25).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [statusText, setStatusText] = useState("");

  /* ─── Extra State Additions ─── */
  // 1. MCQ Timer (30 minutes = 1800 seconds)
  const [assessmentTimeLeft, setAssessmentTimeLeft] = useState(1800);
  const [isAssessmentTimerRunning, setIsAssessmentTimerRunning] = useState(false);

  // 2. Secure Login Session Timer (15 minutes = 900 seconds)
  const [sessionTimeLeft, setSessionTimeLeft] = useState(900);

  // 3. Real-Time Notifications
  const [bellDropdownOpen, setBellDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: "danger", message: "CRITICAL: PME Medical examination scheduled on 2026-06-10.", time: "10 mins ago", read: false },
    { id: 2, type: "warning", message: "Safety Directive: New speed restriction (15km/h) active at Siding Points 12B.", time: "2 hours ago", read: false },
    { id: 3, type: "info", message: "Circular Update: SWR (Station Working Rules) Amendment v4.2 published.", time: "1 day ago", read: true },
    { id: 4, type: "success", message: "Training status updated: Periodic Shunting Refresher completed.", time: "3 days ago", read: true }
  ]);

  // 4. Audit Activity Logs
  const [profileSubTab, setProfileSubTab] = useState("details"); // "details" | "audit"
  const [activityLogs, setActivityLogs] = useState([
    { id: 1, timestamp: "2026-05-27 10:00:12", category: "Auth", action: "User session initialized (IP: 10.244.15.68)", user: "R. Kulkarni" },
    { id: 2, timestamp: "2026-05-27 10:01:45", category: "Profile", action: "PME & REF health profile retrieved", user: "R. Kulkarni" },
    { id: 3, timestamp: "2026-05-27 10:03:10", category: "System", action: "Audited dashboard integrity checklist successfully", user: "R. Kulkarni" }
  ]);

  // 5. Emergency Alert & Siren State
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [emergencyType, setEmergencyType] = useState("Obstruction on Track");
  const [emergencyLocation, setEmergencyLocation] = useState("Nagpur Yard Line 2");
  const [alarmMuted, setAlarmMuted] = useState(false);

  // 6. Safety Reports
  const [safetySubTab, setSafetySubTab] = useState("track"); // "track" | "incident" | "history"
  const [safetyReports, setSafetyReports] = useState([
    { id: 101, type: "Track Defect", defect: "Rail Joint Crack", location: "KM 104/2 Near Gate", severity: "High - Urgent Action", status: "RESOLVED", date: "2026-05-24", desc: "Visible hair crack on joint fishplate." },
    { id: 102, type: "Abnormal Incident", defect: "Hot Axle Exchanged Flag", location: "Line 1 Main", severity: "Medium - Investigating", status: "UNDER REPAIR", date: "2026-05-26", desc: "Detected sparks during all-right hand signal. Notified AOM/G." }
  ]);

  // File Upload State Mock
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  // Form Fields: Track Issue
  const [trackLocation, setTrackLocation] = useState("");
  const [trackLine, setTrackLine] = useState("Line 1");
  const [trackDefect, setTrackDefect] = useState("Rail Fracture");
  const [trackSeverity, setTrackSeverity] = useState("High - Urgent Action");
  const [trackDesc, setTrackDesc] = useState("");

  // Form Fields: Abnormal Incident
  const [incidentType, setIncidentType] = useState("Hot Axle");
  const [incidentTrain, setIncidentTrain] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [incidentAction, setIncidentAction] = useState("");

  // Track user notifications unread count
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  /* ─── EFFECT: Secure Session CountDown ─── */
  useEffect(() => {
    const sessionTimer = setInterval(() => {
      setSessionTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(sessionTimer);
          stopAlarmSound();
          alert("Secure Session Timeout (15 mins reached). For safety, you are logged out of the Indian Railways Operations Panel.");
          onLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(sessionTimer);
  }, [onLogout]);

  /* ─── EFFECT: Assessment MCQ Countdown Timer ─── */
  useEffect(() => {
    let timer = null;
    if (isAssessmentTimerRunning && assessmentTimeLeft > 0) {
      timer = setInterval(() => {
        setAssessmentTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsAssessmentTimerRunning(false);
            submitTest(true); // force auto-submit!
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAssessmentTimerRunning, assessmentTimeLeft]);
  /* ─── Derived metrics ─── */
  const latestScore = history.length ? history[0].totalScore : null;
  const latestCategory = latestScore !== null ? getCategory(latestScore) : "—";
  const averageScore = history.length
    ? Math.round(history.reduce((s, i) => s + i.totalScore, 0) / history.length)
    : 0;
  const answeredCount = responses.filter(v => v !== null).length;
  const completionRate = Math.round((answeredCount / 25) * 100);

  /* ─── Dynamic Performance Summary ─── */
  const performanceSummaryText = useMemo(() => {
    const rec = myAssessSelected || selectedRecord;
    if (!rec || !rec.sections || rec.sections.length === 0) return "";
    const { totalScore, sections } = rec;
    const lowestSec = [...sections].sort((a, b) => a.marks - b.marks)[0];
    const highestSec = [...sections].sort((a, b) => b.marks - a.marks)[0];

    let summary = `Assessment score achieved: ${totalScore}/100 (${totalScore >= 80 ? 'Outstanding Competency' : totalScore >= 50 ? 'Satisfactory Operations' : 'Requires Training'}). `;
    summary += `Demonstrated excellent competency in "${highestSec.title}" scoring ${highestSec.marks}/${highestSec.outOf} marks. `;
    if (lowestSec.marks < lowestSec.outOf) {
      summary += `However, low-scoring markers are observed in "${lowestSec.title}" (${lowestSec.marks}/${lowestSec.outOf}). It is highly recommended to study the Station Working Rules (SWR) for points locking/shunting and undergo periodic coaching.`;
    } else {
      summary += `Achieved flawless accuracy in all modules. Recommended to maintain this premium standard in daily track shunting.`;
    }
    return summary;
  }, [myAssessSelected, selectedRecord]);

  /* ─── Chart data ─── */
  const trendData = useMemo(() =>
    [...history].reverse().map(r => ({
      date: r.assessmentPeriod.slice(0, 7),
      score: r.totalScore
    })), [history]);

  const pieData = useMemo(() => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    history.forEach(r => { counts[getCategory(r.totalScore)]++; });
    const total = history.length || 1;
    return Object.entries(counts)
      .filter(([, c]) => c > 0)
      .map(([cat, count]) => ({
        name: cat,
        value: Math.round((count / total) * 100),
        count
      }));
  }, [history]);

  /* ─── Filtered / sorted history ─── */
  const filteredHistory = useMemo(() => {
    let list = history.filter(item =>
      historyDateSearch.trim() === "" || item.date.includes(historyDateSearch.trim())
    );
    if (historySortOrder === "score-asc") list = [...list].sort((a, b) => a.totalScore - b.totalScore);
    else if (historySortOrder === "score-desc") list = [...list].sort((a, b) => b.totalScore - a.totalScore);
    else if (historySortOrder === "date-asc") list = [...list].sort((a, b) => a.date.localeCompare(b.date));
    return list;
  }, [history, historyDateSearch, historySortOrder]);

  /* ─── Navigation ─── */
  const goToNavPage = (key) => {
    setActiveNav(key);
    setScreenMode("default");
    setStatusText("");
  };

  const openScorecard = (record) => {
    setSelectedRecord(record);
    setActiveNav("history");
    setScreenMode("scorecard");
  };

  const logActivity = (category, action) => {
    const time = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newLog = {
      id: Date.now(),
      timestamp: time,
      category,
      action,
      user: fullName
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const triggerNotification = (type, message) => {
    const newAlert = {
      id: Date.now(),
      type,
      message,
      time: "Just now",
      read: false
    };
    setNotifications(prev => [newAlert, ...prev]);
  };

  /* ── User admin actions ── */
  const openAddUserModal = (defaultRole = "Station Master") => {
    let defaultDesig = defaultRole;
    if (defaultRole === "Pointsman") defaultDesig = "Pointsman Grade I";
    setNewUserData({
      id: "",
      name: "",
      role: defaultRole,
      designation: defaultDesig,
      station: myStations[0]?.name || "",
      contact: "",
      joiningDate: new Date().toISOString().slice(0, 10),
      pmeStatus: "Fit",
      refStatus: "Cleared",
      reportingSm: defaultRole === "Pointsman" ? "S. Deshmukh" : defaultRole === "Train Manager" ? "NGP-BSL Section" : "",
      shift: defaultRole === "Pointsman" ? "Morning Shift (06:00 - 14:00)" : defaultRole === "Train Manager" ? "Goods Train Beat" : "",
      workLocation: defaultRole === "Pointsman" ? "Yard Area" : defaultRole === "Train Manager" ? "Nagpur Depot" : ""
    });
    setShowAddUserModal(true);
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newUserData.name.trim() || !newUserData.id.trim() || !newUserData.station || !newUserData.contact.trim() || !newUserData.joiningDate) {
      triggerNotification("danger", "Please fill out all required fields.");
      return;
    }
    
    let finalId = newUserData.id.trim();
    if (newUserData.role === "Station Master") {
      if (!finalId.startsWith("SM_")) {
        finalId = "SM_" + finalId.replace(/^SM_|^PM_|^SS_|^TM_/i, "");
      }
    } else if (newUserData.role === "Pointsman") {
      if (!finalId.startsWith("PM_")) {
        finalId = "PM_" + finalId.replace(/^SM_|^PM_|^SS_|^TM_/i, "");
      }
    } else if (newUserData.role === "Station Superintendent") {
      if (!finalId.startsWith("SS_")) {
        finalId = "SS_" + finalId.replace(/^SM_|^PM_|^SS_|^TM_/i, "");
      }
    } else if (newUserData.role === "Train Manager") {
      if (!finalId.startsWith("TM_")) {
        finalId = "TM_" + finalId.replace(/^SM_|^PM_|^SS_|^TM_/i, "");
      }
    }

    if (users.some(u => u.id === finalId)) {
      triggerNotification("danger", `User with Employee ID ${finalId} already exists!`);
      return;
    }

    const newUser = {
      id: finalId,
      name: newUserData.name.trim(),
      role: newUserData.role,
      designation: newUserData.designation || newUserData.role,
      station: newUserData.station,
      cat: "A",
      lastAssessDate: new Date().toISOString().slice(0, 10),
      score: 80,
      pmeStatus: newUserData.pmeStatus,
      refStatus: newUserData.refStatus,
      contact: newUserData.contact.trim(),
      joiningDate: newUserData.joiningDate,
      reportingSm: newUserData.role === "Pointsman" || newUserData.role === "Train Manager" ? newUserData.reportingSm : "",
      shift: newUserData.role === "Pointsman" || newUserData.role === "Train Manager" ? newUserData.shift : "",
      workLocation: newUserData.role === "Pointsman" || newUserData.role === "Train Manager" ? newUserData.workLocation : ""
    };

    setUsers(prev => [...prev, newUser]);
    setShowAddUserModal(false);
    
    addAuditLog("Added New User", `Staff: ${newUser.name} (${newUser.id})`);
    triggerNotification("success", `Added Staff: ${newUser.name} (${newUser.id})`);
  };

  const handleEditUser = (userRec) => {
    setEditingUser({ ...userRec });
  };

  const saveEditedUser = (e) => {
    e.preventDefault();
    setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
    addAuditLog("User Profile Modified", `Staff ID: ${editingUser.id}, Name: ${editingUser.name}`);
    triggerNotification("success", `Profile updated for ${editingUser.name}.`);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you absolutely sure you want to revoke operational access for ${userName} (${userId})?`)) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      addAuditLog("Revoked User Access", `Staff ID: ${userId}, Name: ${userName}`);
      triggerNotification("danger", `Revoked access: ${userName} (${userId}).`);
    }
  };

  const handleTransferClick = (userRec) => {
    setTransferringUser({ ...userRec, targetStation: userRec.station });
  };

  const confirmTransfer = () => {
    setUsers(prev => prev.map(u => u.id === transferringUser.id ? { ...u, station: transferringUser.targetStation } : u));
    addAuditLog("Staff Station Transfer", `Staff: ${transferringUser.name} moved from ${transferringUser.station} to ${transferringUser.targetStation}`);
    triggerNotification("warning", `Transferred ${transferringUser.name} to ${transferringUser.targetStation}.`);
    setTransferringUser(null);
  };

  /* ─── My Assessment Test Actions (mirrors SM) ─── */
  const startTestAttempt = () => {
    setActiveTest({ period: "April 2026", name: "Competency Assessment" });
    setResponses(Array(25).fill(null));
    setCurrentQuestion(0);
    setScreenMode("takeTest");
  };

  const handleSubmitTestAttempt = () => {
    const correctCount = ssTestResponses.filter((r, idx) => r === testQuestions[idx].answer).length;
    const percentage = Math.round((correctCount / 25) * 100);
    const passStatus = percentage >= 60 ? "PASSED" : "FAILED";
    const today = new Date().toISOString().slice(0, 10);
    const testResult = {
      completed: true,
      correctCount,
      responses: [...ssTestResponses],
      submittedDate: today,
      percentage,
      passStatus
    };
    localStorage.setItem(`ss_mcq_test_${employeeId}`, JSON.stringify(testResult));
    setSsMcqTest(testResult);
    localStorage.setItem(`ss_test_assigned_${employeeId}`, "Completed");
    setTestAssigned("Completed");
    const record = {
      id: Date.now(),
      date: today,
      assessmentPeriod: "Q2 2026",
      name: TEST_NAME,
      assessedBy: "Online Self-Exam",
      totalScore: correctCount * 4,
      sections: [
        { title: "Signal Rules",          marks: 0, outOf: 20 },
        { title: "Track Handling",         marks: 0, outOf: 20 },
        { title: "Communication",          marks: 0, outOf: 20 },
        { title: "Safety Response",        marks: 0, outOf: 20 },
        { title: "Operational Judgement",  marks: 0, outOf: 20 }
      ],
      responses: [...ssTestResponses],
      approvalStatus: "Completed",
      isOnlineExam: true
    };
    const newHistory = [record, ...history];
    setHistory(newHistory);
    localStorage.setItem(`ss_history_${employeeId}`, JSON.stringify(newHistory));
    setScreenMode("default");
    setStatusText(`Assessment submitted! Score: ${percentage}% (${correctCount}/25). Status: Completed.`);
  };

  /* ─── Test Actions ─── */
  const handleReattempt = () => {
    localStorage.removeItem(`ss_mcq_test_${employeeId}`);
    localStorage.setItem(`ss_current_test_${employeeId}`, JSON.stringify(currentTestSeed));
    setCurrentTest(currentTestSeed);
    setActiveTest(currentTestSeed);
    setResponses(Array(25).fill(null));
    setCurrentQuestion(0);
    setStatusText("New CBT shunting safety test session initialized.");
    setActiveNav("current");
    setScreenMode("attempt");
    logActivity("Assessment", "Periodic CBT assessment re-attempt session started.");
    triggerNotification("info", "New shunting safety CBT competency exam session active.");
  };

  const startTest = () => {
    setActiveTest(currentTest || currentTestSeed);
    setResponses(Array(25).fill(null));
    setCurrentQuestion(0);
    setStatusText("");
    setIsAssessmentTimerRunning(false);
    setActiveNav("current");
    setScreenMode("attempt");
    logActivity("Assessment", "Periodic assessment test started.");
  };

  const handleSelectOption = (idx) => {
    setResponses(prev => { const n = [...prev]; n[currentQuestion] = idx; return n; });
  };

  const evaluateTest = () => {
    let correct = 0;
    const sec = [0, 0, 0, 0, 0];
    responses.forEach((r, i) => {
      const si = Math.floor(i / 5);
      if (r === testQuestions[i].answer) { correct++; sec[si] += 4; }
    });
    const sections = [
      "Signal Rules", 
      "Track Handling", 
      "Communication", 
      "Safety Response", 
      "Operational Judgement"
    ].map((title, i) => ({ title, marks: sec[i], outOf: 20 }));
    return { totalScore: correct * 4, sections };
  };

  const submitTest = (isAutoSubmit = false) => {
    setIsAssessmentTimerRunning(false);
    const { totalScore, sections } = evaluateTest();
    const today = new Date().toISOString().slice(0, 10);
    const record = {
      id: Date.now(),
      date: today,
      name: TEST_NAME,
      assessmentPeriod: activeTest ? activeTest.period : "April 2026",
      totalScore,
      sections,
      responses: [...responses],
      assessedBy: "Traffic Inspector",
      approvalStatus: "Completed",
      isOnlineExam: true
    };
    const newHistory = [record, ...history];
    setHistory(newHistory);
    localStorage.setItem(`ss_history_${employeeId}`, JSON.stringify(newHistory));
    
    setCurrentTest(null);
    localStorage.setItem(`ss_current_test_${employeeId}`, JSON.stringify(null));

    // Save MCQ result for Traffic Inspector
    const correctCount = Math.round(totalScore / 4);
    const percentage = Math.round((correctCount / 25) * 100);
    const mcqResult = {
      completed: true,
      correctCount: correctCount,
      submittedDate: today,
      percentage: percentage
    };
    localStorage.setItem(`ss_mcq_test_${employeeId}`, JSON.stringify(mcqResult));

    setSelectedRecord(record);
    setActiveTest(null);
    setActiveNav("history");
    setScreenMode("scorecard");
    
    const label = isAutoSubmit ? "Auto-submitted (Time Expired)" : "Submitted Successfully";
    setStatusText(`Assessment evaluation completed! ${label}.`);
    logActivity("Assessment", `Submitted test with score ${totalScore}% (Cat. ${getCategory(totalScore)})`);
    triggerNotification("success", `Assessment complete! Score: ${totalScore}/100. Grade: Category ${getCategory(totalScore)}`);
  };

  /* ─── Secure Session Actions ─── */
  const refreshSession = () => {
    setSessionTimeLeft(900);
    logActivity("Auth", "User secure login session refreshed to 15:00.");
    triggerNotification("success", "Operations login session renewed safely.");
  };

  /* ─── File Attachment Handlers ─── */
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const files = Array.from(e.target.files).map(f => ({
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(2) + " MB"
      }));
      setAttachedFiles(prev => [...prev, ...files]);
      logActivity("Safety", `Attached safety evidence: ${files.map(x=>x.name).join(', ')}`);
    }
  };

  const removeAttachedFile = (idx) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  /* ─── Form Submission: Track Issue ─── */
  const submitTrackIssue = (e) => {
    e.preventDefault();
    if (!trackLocation.trim() || !trackDesc.trim()) {
      alert("Please fill in location and description details.");
      return;
    }
    const newReport = {
      id: Date.now(),
      type: "Track Defect",
      defect: trackDefect,
      location: `${trackLine} - KM ${trackLocation}`,
      severity: trackSeverity,
      status: "PENDING MASTER ACTION",
      date: new Date().toISOString().slice(0, 10),
      desc: trackDesc,
      attachments: [...attachedFiles]
    };
    setSafetyReports(prev => [newReport, ...prev]);
    
    logActivity("Safety", `Safety track defect reported: ${trackDefect} at KM ${trackLocation}`);
    triggerNotification("danger", `SAFETY REPORT SUBMITTED: Defect: ${trackDefect} | Loc: KM ${trackLocation}`);
    
    // Reset
    setTrackLocation("");
    setTrackDesc("");
    setAttachedFiles([]);
    setFileInputKey(Date.now());
    setSafetySubTab("history");
    setStatusText("Safety report logged. Forwarded to Traffic Inspector & P-Way inspector.");
  };

  /* ─── Form Submission: Incident ─── */
  const submitIncidentReport = (e) => {
    e.preventDefault();
    if (!incidentTrain.trim() || !incidentAction.trim()) {
      alert("Please enter Train Number and Actions taken.");
      return;
    }
    const newReport = {
      id: Date.now(),
      type: "Abnormal Incident",
      defect: incidentType,
      location: `Train ${incidentTrain} (${incidentTime || "Current"})`,
      severity: "High - Immediate Action",
      status: "STATION INVESTIGATION ACTIVE",
      date: new Date().toISOString().slice(0, 10),
      desc: incidentAction,
      attachments: [...attachedFiles]
    };
    setSafetyReports(prev => [newReport, ...prev]);
    
    logActivity("Safety", `Abnormal incident logged: ${incidentType} in Train ${incidentTrain}`);
    triggerNotification("warning", `INCIDENT ALERT: ${incidentType} detected on Train ${incidentTrain}.`);
    
    // Reset
    setIncidentTrain("");
    setIncidentAction("");
    setIncidentTime("");
    setAttachedFiles([]);
    setFileInputKey(Date.now());
    setSafetySubTab("history");
    setStatusText("Abnormal incident report logged and dispatched to Division Controller.");
  };

  /* ─── Emergency Broadcast Actions ─── */
  const openEmergencyDialog = () => {
    setEmergencyModalOpen(true);
  };

  const triggerEmergencyBroadcast = () => {
    setEmergencyModalOpen(false);
    setEmergencyActive(true);
    setAlarmMuted(false);
    startAlarmSound();
    
    logActivity("EMERGENCY", `CRITICAL: Pulse emergency alert triggered! Type: ${emergencyType} at ${emergencyLocation}`);
    triggerNotification("danger", `🚨 BROADCAST ACTIVE: ${emergencyType} at ${emergencyLocation}. Dispatching rescue!`);
    setStatusText("EMERGENCY BROADCAST TRANSMITTING SYSTEM-WIDE!");
  };

  const clearEmergencyState = () => {
    setEmergencyActive(false);
    stopAlarmSound();
    logActivity("EMERGENCY", "Emergency alert acknowledged and cleared.");
    triggerNotification("success", "Emergency alert deactivated. Operational line clear reinstated.");
    setStatusText("Emergency broadcast deactivated. Tracks returned to safe normal status.");
  };

  const toggleAlarmMute = () => {
    if (alarmMuted) {
      startAlarmSound();
      setAlarmMuted(false);
    } else {
      stopAlarmSound();
      setAlarmMuted(true);
    }
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    logActivity("System", "Notifications inbox marked read.");
  };

  /* ═══════════════════════════════════════
     RENDER: PROFILE & AUDIT
  ═══════════════════════════════════════ */

  /* ═══════════════════════════════════════
     RENDER: PROFILE
  ═══════════════════════════════════════ */
  

  /* ═══════════════════════════════════════
     RENDER: MY ASSESSMENT (mirrors SM module exactly)
  ═══════════════════════════════════════ */
  

  /* ═══════════════════════════════════════
     RENDER: TAKE TEST SCREEN (mirrors SM renderTakeTest)
  ═══════════════════════════════════════ */
  

  /* ═══════════════════════════════════════
     RENDER: TEST HISTORY (legacy — kept for internal dispatch)
  ═══════════════════════════════════════ */
  

  /* ═══════════════════════════════════════
     RENDER: SCORECARD & QUESTION REVIEW
  ═══════════════════════════════════════ */
  

  /* ═══════════════════════════════════════
     RENDER: CURRENT TEST (SCHEDULED)
  ═══════════════════════════════════════ */
  

  /* ═══════════════════════════════════════
     RENDER: TEST ATTEMPT (WITH TIMER)
  ═══════════════════════════════════════ */
  

  /* ═══════════════════════════════════════
     RENDER: SAFETY & EMERGENCY MODULE
  ═══════════════════════════════════════ */
  

  

  



  const renderBodyContent = () => {
    if (view?.type === "staffDetail") {
      return (
        <SSStaffDetail
          s={view.data}
          setView={setView}
          handleEditUser={handleEditUser}
          setTransferringUser={setTransferringUser}
        />
      );
    }
    if (screenMode === "takeTest") {
      return (
        <SSMyAssessment
          myAssessSelected={myAssessSelected}
          setMyAssessSelected={setMyAssessSelected}
          ssMcqTest={ssMcqTest}
          testAssigned={testAssigned}
          ssActiveQIdx={ssActiveQIdx}
          setSsActiveQIdx={setSsActiveQIdx}
          ssTestResponses={ssTestResponses}
          setSsTestResponses={setSsTestResponses}
          currentTest={currentTest}
          activeTest={activeTest}
          setActiveTest={setActiveTest}
          responses={responses}
          setResponses={setResponses}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          statusText={statusText}
          history={history}
          filteredHistory={filteredHistory}
          historyDateSearch={historyDateSearch}
          setHistoryDateSearch={setHistoryDateSearch}
          historySortOrder={historySortOrder}
          setHistorySortOrder={setHistorySortOrder}
          selectedRecord={selectedRecord}
          openScorecard={openScorecard}
          isAssessmentTimerRunning={isAssessmentTimerRunning}
          assessmentTimeLeft={assessmentTimeLeft}
          setIsAssessmentTimerRunning={setIsAssessmentTimerRunning}
          submitTest={submitTest}
          setActiveNav={setActiveNav}
          setScreenMode={setScreenMode}
          screenMode={screenMode}
          fullName={fullName}
          employeeId={employeeId}
          stationSuperintendentProfile={stationSuperintendentProfile}
          performanceSummaryText={performanceSummaryText}
          historyPage={historyPage}
          setHistoryPage={setHistoryPage}
          startTestAttempt={startTestAttempt}
          handleSubmitTestAttempt={handleSubmitTestAttempt}
          handleReattempt={handleReattempt}
          startTest={startTest}
          handleSelectOption={handleSelectOption}
          logActivity={logActivity}
        />
      );
    }
    if (activeNav === "dashboard") {
      return (
        <SSDashboard
          setActiveNav={setActiveNav}
          latestScore={latestScore}
          averageScore={averageScore}
          latestCategory={latestCategory}
          history={history}
          trendData={trendData}
          pieData={pieData}
          performanceSummaryText={performanceSummaryText}
        />
      );
    }
    if (activeNav === "profile") {
      return (
        <SSProfile
          fullName={fullName}
          employeeId={employeeId}
          stationSuperintendentProfile={stationSuperintendentProfile}
          profileSubTab={profileSubTab}
          setProfileSubTab={setProfileSubTab}
          history={history}
          activityLogs={activityLogs}
          latestCategory={latestCategory}
          latestScore={latestScore}
        />
      );
    }
    if (activeNav === "myAssessment") {
      return (
        <SSMyAssessment
          myAssessSelected={myAssessSelected}
          setMyAssessSelected={setMyAssessSelected}
          ssMcqTest={ssMcqTest}
          testAssigned={testAssigned}
          ssActiveQIdx={ssActiveQIdx}
          setSsActiveQIdx={setSsActiveQIdx}
          ssTestResponses={ssTestResponses}
          setSsTestResponses={setSsTestResponses}
          currentTest={currentTest}
          activeTest={activeTest}
          setActiveTest={setActiveTest}
          responses={responses}
          setResponses={setResponses}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          statusText={statusText}
          history={history}
          filteredHistory={filteredHistory}
          historyDateSearch={historyDateSearch}
          setHistoryDateSearch={setHistoryDateSearch}
          historySortOrder={historySortOrder}
          setHistorySortOrder={setHistorySortOrder}
          selectedRecord={selectedRecord}
          openScorecard={openScorecard}
          isAssessmentTimerRunning={isAssessmentTimerRunning}
          assessmentTimeLeft={assessmentTimeLeft}
          setIsAssessmentTimerRunning={setIsAssessmentTimerRunning}
          submitTest={submitTest}
          setActiveNav={setActiveNav}
          setScreenMode={setScreenMode}
          screenMode={screenMode}
          fullName={fullName}
          employeeId={employeeId}
          stationSuperintendentProfile={stationSuperintendentProfile}
          performanceSummaryText={performanceSummaryText}
          historyPage={historyPage}
          setHistoryPage={setHistoryPage}
          startTestAttempt={startTestAttempt}
          handleSubmitTestAttempt={handleSubmitTestAttempt}
          handleReattempt={handleReattempt}
          startTest={startTest}
          handleSelectOption={handleSelectOption}
          logActivity={logActivity}
        />
      );
    }
    if (activeNav === "safety") {
      return (
        <SSSafety
          safetySubTab={safetySubTab}
          setSafetySubTab={setSafetySubTab}
          safetyReports={safetyReports}
          trackLocation={trackLocation}
          setTrackLocation={setTrackLocation}
          trackLine={trackLine}
          setTrackLine={setTrackLine}
          trackDefect={trackDefect}
          setTrackDefect={setTrackDefect}
          trackSeverity={trackSeverity}
          setTrackSeverity={setTrackSeverity}
          trackDesc={trackDesc}
          setTrackDesc={setTrackDesc}
          attachedFiles={attachedFiles}
          fileInputKey={fileInputKey}
          incidentType={incidentType}
          setIncidentType={setIncidentType}
          incidentTrain={incidentTrain}
          setIncidentTrain={setIncidentTrain}
          incidentTime={incidentTime}
          setIncidentTime={setIncidentTime}
          incidentAction={incidentAction}
          setIncidentAction={setIncidentAction}
          openEmergencyDialog={openEmergencyDialog}
          submitTrackIssue={submitTrackIssue}
          handleFileChange={handleFileChange}
          removeAttachedFile={removeAttachedFile}
          submitIncidentReport={submitIncidentReport}
        />
      );
    }
    if (activeNav === "pointsmen") {
      return (
        <SSRoleView
          roleKey="Pointsman"
          title="Pointsman"
          users={users}
          myStations={myStations}
          roleF={roleF}
          setRoleF={setRoleF}
          setView={setView}
          openAddUserModal={openAddUserModal}
          view={view}
          handleEditUser={handleEditUser}
          handleTransferClick={handleTransferClick}
          handleDeleteUser={handleDeleteUser}
          activeNav={activeNav}
        />
      );
    }
    if (activeNav === "stationMasters") {
      return (
        <SSRoleView
          roleKey="Station Master"
          title="Station Master"
          users={users}
          myStations={myStations}
          roleF={roleF}
          setRoleF={setRoleF}
          setView={setView}
          openAddUserModal={openAddUserModal}
          view={view}
          handleEditUser={handleEditUser}
          handleTransferClick={handleTransferClick}
          handleDeleteUser={handleDeleteUser}
          activeNav={activeNav}
        />
      );
    }
    return (
      <SSDashboard
        setActiveNav={setActiveNav}
        latestScore={latestScore}
        averageScore={averageScore}
        latestCategory={latestCategory}
        history={history}
        trendData={trendData}
        pieData={pieData}
        performanceSummaryText={performanceSummaryText}
      />
    );
  };

  /* ═══════════════════════════════════════
     SHELL LAYOUT
  ═══════════════════════════════════════ */
  return (
    <div className={`pm-layout ${emergencyActive ? "emergency-glow-active" : ""}`}>
      <input type="checkbox" id="sdom-sidebar-toggle" className="sdom-sidebar-checkbox" style={{ display: "none" }} />
      <label htmlFor="sdom-sidebar-toggle" className="sdom-sidebar-close-backdrop"></label>
      
      {/* ── Flashing Emergency Alert Banner ── */}
      {emergencyActive && (
        <div className="pm-emergency-siren-banner">
          <div className="siren-message">
            <span className="siren-light animate-flash">🚨 ALERT</span>
            <strong>MANDATORY EMERGENCY BROADCAST ACTIVE: {emergencyType} detected at {emergencyLocation}! All train & siding movements are frozen immediately.</strong>
          </div>
          <div className="siren-controls">
            <button className="pm-siren-mute-btn" onClick={toggleAlarmMute}>
              {alarmMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              {alarmMuted ? "Unmute Alarm" : "Mute Sound"}
            </button>
            <button className="pm-siren-clear-btn" onClick={clearEmergencyState}>
              Clear & Safe Return
            </button>
          </div>
        </div>
      )}

      <header className="pm-topbar">
        <label htmlFor="sdom-sidebar-toggle" className="sdom-sidebar-toggle-btn" style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px", background: "none", border: "none", color: "#ffffff", marginRight: "12px" }}>
          &#9776;
        </label>
        <div className="pm-topbar-brand">
          <div className="pm-topbar-logo"><img src="/logo.webp" alt="IR Logo" style={{ width: "100%", height: "100%", borderRadius: "inherit", objectFit: "cover" }} /></div>
          <div>
            <h1>Indian Railway Evaluation Command</h1>
            <p><span className="desktop-only-txt">Operations Workspace: </span>Station Supt.<span className="desktop-only-txt">erintendent Module</span></p>
          </div>
        </div>



        <div className="pm-user-strip">
          {/* ── Real-Time Notifications Bell Dropdown ── */}
          <div className="pm-notification-bell-container">
            <button className="pm-bell-btn" onClick={() => setBellDropdownOpen(!bellDropdownOpen)}>
              <Bell size={20} />
              {unreadNotificationsCount > 0 && (
                <span className="pm-bell-badge">{unreadNotificationsCount}</span>
              )}
            </button>

            {bellDropdownOpen && (
              <div className="pm-bell-dropdown">
                <div className="pm-bell-header">
                  <h4>Operations Notifications</h4>
                  {unreadNotificationsCount > 0 && (
                    <button onClick={markAllNotificationsRead}>Mark read</button>
                  )}
                </div>
                <div className="pm-bell-list">
                  {notifications.map(n => (
                    <div key={n.id} className={`pm-bell-item ${n.read ? 'read' : 'unread'} type-${n.type}`}>
                      <div className="pm-bell-item-dot"></div>
                      <div className="pm-bell-item-content">
                        <p>{n.message}</p>
                        <span>{n.time}</span>
                      </div>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <p className="pm-bell-empty">No alerts received today.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="pm-user-avatar">{fullName.charAt(0)}</div>
          <div>
            <strong>{fullName}</strong>
            <span>HRMS ID: {employeeId}</span>
          </div>
          <button className="pm-logout-btn" onClick={() => { stopAlarmSound(); onLogout(); }}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </header>

      <div className="pm-content-shell">
        <aside className="pm-sidebar">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeNav === item.key && screenMode === "default";
            return (
              <button
                key={item.key}
                className={`pm-nav-item ${isActive ? "active" : ""}`}
                onClick={() => { goToNavPage(item.key); setBellDropdownOpen(false); }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
          

        </aside>

        <main className="pm-main-panel">
          <div className="pm-main-header-band">
            <div>
              <p className="pm-hero-eyebrow">Nagpur Junction Operations</p>
              <h2 className="pm-main-title">
                {screenMode === "scorecard" ? "Detailed Evaluation scorecard"
                  : screenMode === "attempt" ? "Competency Examination Attempt"
                  : navItems.find(i => i.key === activeNav)?.label || "Workspace"}
              </h2>
            </div>
            <div className="pm-header-kpis">
              <div className="pm-hkpi">
                <Award size={14} />
                <span>{history.length} Assessments</span>
              </div>
              <div className="pm-hkpi">
                <Gauge size={14} />
                <span>Avg {averageScore}</span>
              </div>
              <div className="pm-hkpi" style={{ color: getCategoryColor(latestCategory) }}>
                <ShieldCheck size={14} />
                <span>Cat. {latestCategory}</span>
              </div>
            </div>
          </div>

          {statusText && (
            <div className="pm-status-banner">
              <CheckCircle2 size={15} /> {statusText}
            </div>
          )}

          {renderBodyContent()}
        </main>
      </div>

      {/* ── EMERGENCY BROADCAST SETUP MODAL ── */}
      {emergencyModalOpen && (
        <div className="pm-emergency-modal-overlay">
          <div className="pm-emergency-modal">
            <div className="modal-header">
              <h2>🚨 CONFIRM URGENT DIVISION-WIDE BROADCAST</h2>
              <button onClick={() => setEmergencyModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <p className="danger-notice">
                WARNING: Triggering this broadcast sends an audio warning signal and locks shunting/movement panels on all active Traffic Inspector & Superintendent terminals! Use for genuine safety emergencies only.
              </p>
              <div className="modal-fields">
                <label>Emergency Category</label>
                <select value={emergencyType} onChange={e => setEmergencyType(e.target.value)}>
                  <option value="Obstruction on Track">Obstruction on Siding (Fouling Clearance)</option>
                  <option value="Derailment Danger">Visible Rail Crack / Splitting Point</option>
                  <option value="Signal Failure">Critical Signal Lock Failure</option>
                  <option value="Hot Axle Fire Spark">Hot Axle / Spark Smoke in Incoming train</option>
                  <option value="Other Danger">Other Major Track Danger</option>
                </select>
                
                <label>Vulnerable Location / Track</label>
                <input 
                  type="text" 
                  value={emergencyLocation} 
                  onChange={e => setEmergencyLocation(e.target.value)} 
                  placeholder="e.g. Line 2 Loop Siding, KM 102/4" 
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setEmergencyModalOpen(false)}>Cancel</button>
              <button className="confirm-btn" onClick={triggerEmergencyBroadcast}>
                CONFIRM & BROADCAST ALARM
              </button>
            </div>
          </div>
        </div>
      )}
      <SSModals
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        saveEditedUser={saveEditedUser}
        transferringUser={transferringUser}
        setTransferringUser={setTransferringUser}
        confirmTransfer={confirmTransfer}
        myStations={myStations}
        showAddUserModal={showAddUserModal}
        setShowAddUserModal={setShowAddUserModal}
        newUserData={newUserData}
        setNewUserData={setNewUserData}
        handleAddUserSubmit={handleAddUserSubmit}
      />
    </div>
  );
}

export default StationSuperintendentModule;