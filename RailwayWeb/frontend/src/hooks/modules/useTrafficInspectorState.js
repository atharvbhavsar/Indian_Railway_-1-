/**
 * 🚂 RSES TRAFFIC INSPECTOR STATE HOOK
 * Centrally manages all state machines, reactive filters, dialog toggles, MCQ quizzes,
 * and local cache synchs for the Traffic Inspector safety console.
 */
import { useState, useEffect, useMemo } from "react";
import { 
  getCat, getUserRisk, computeSMScore, computeTMScore, computeSSScore
} from "../../utils/trafficInspectorUtils";
import {
  INIT_STATIONS, INIT_USERS, DEFAULT_SS_TM_USERS, MONTHLY, INIT_PM_ASSESSMENTS,
  TI_SM_CRITERIA, TI_TM_CRITERIA, TI_SS_CRITERIA, INIT_INSPECTIONS, INIT_COUNSELLING,
  TI_QUIZ, INIT_TI_ASSESS_HISTORY, defaultSMForm, defaultTMForm, defaultSSForm
} from "../../constants/trafficInspectorConstants";

export function useTrafficInspectorState(user, onLogout) {
  // Navigation & Sub-views
  const [activePage, setActivePage] = useState("dashboard");
  const [statusMsg, setStatusMsg] = useState("");
  const [view, setView] = useState(null);

  // Layout modals
  const [showAddStationModal, setShowAddStationModal] = useState(false);
  const [newStationData, setNewStationData] = useState({ name: "", code: "" });
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    id: "", name: "", role: "Station Master", designation: "Station Master",
    station: "", contact: "", joiningDate: "", pmeStatus: "Fit", refStatus: "Cleared",
    reportingSm: "", shift: "", workLocation: ""
  });

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: "warning", message: "Station Master P. Wankhede: PME is Overdue since 2026-03-01.", time: "2 hours ago", read: false },
    { id: 2, type: "danger", message: "Pointsman H. Singh: REF safety training has EXPIRED.", time: "5 hours ago", read: false },
    { id: 3, type: "warning", message: "Pointsman B. Yadav: PME is Overdue since 2026-03-05.", time: "1 day ago", read: true },
    { id: 4, type: "success", message: "Monthly safety audit successfully filed for Parbhani Junction.", time: "2 days ago", read: true }
  ]);
  const [bellDropdownOpen, setBellDropdownOpen] = useState(false);

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, timestamp: "2026-05-28 10:15:32", event: "Approved PM Assessment", details: "Approved assessment for Pointsman J. Shaikh (PM_1004). Final Score: 88/100." },
    { id: 2, timestamp: "2026-05-27 14:22:05", event: "Profile Update", details: "Updated designation for Station Master S. Deshmukh (SM_1001)." },
    { id: 3, timestamp: "2026-05-25 09:05:44", event: "Added New Station", details: "Added station Akola Junction (AK) under active jurisdiction." }
  ]);

  // Core Data Cache (Hydrated from LocalStorage if present, otherwise initial mock)
  const [stations, setStations] = useState(() => {
    const saved = localStorage.getItem("ti_stations");
    return saved ? JSON.parse(saved) : INIT_STATIONS;
  });
  useEffect(() => {
    localStorage.setItem("ti_stations", JSON.stringify(stations));
  }, [stations]);

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("ti_users");
    return saved ? JSON.parse(saved) : INIT_USERS;
  });
  useEffect(() => {
    localStorage.setItem("ti_users", JSON.stringify(users));
  }, [users]);

  const [pmList, setPmList] = useState(() => {
    const saved = localStorage.getItem("ti_pm_list");
    return saved ? JSON.parse(saved) : INIT_PM_ASSESSMENTS;
  });
  useEffect(() => {
    localStorage.setItem("ti_pm_list", JSON.stringify(pmList));
  }, [pmList]);

  // SS List
  const POPULATED_SS = DEFAULT_SS_TM_USERS.filter(u => u.role === "Station Superintendent");
  const [ssList, setSsList] = useState(() => {
    const saved = localStorage.getItem("ti_ss_list");
    return saved ? JSON.parse(saved) : POPULATED_SS;
  });
  useEffect(() => {
    localStorage.setItem("ti_ss_list", JSON.stringify(ssList));
  }, [ssList]);

  // SM List
  const POPULATED_SM = INIT_USERS.filter(u => u.role === "Station Master");
  const [smList, setSmList] = useState(() => {
    const saved = localStorage.getItem("ti_sm_list");
    if (saved) return JSON.parse(saved);
    
    // Fallback: Populate initial status
    return POPULATED_SM.map(u => ({
      id: u.id, name: u.name, hrmsId: u.id, station: u.station,
      contact: u.contact, score: u.score,
      status: u.id === "SM_1001" ? "Approved" : u.id === "SM_2102" ? "Submitted" : u.id === "SM_2201" ? "Pending" : "Pending",
      examScore: u.id === "SM_1001" ? 22 : u.id === "SM_2102" ? 18 : undefined,
      submissionDate: u.id === "SM_1001" ? "2026-03-20" : u.id === "SM_2102" ? "2026-04-12" : undefined,
      pmeStatus: u.pmeStatus, refStatus: u.refStatus
    }));
  });
  useEffect(() => {
    localStorage.setItem("ti_sm_list", JSON.stringify(smList));
  }, [smList]);

  // TM List
  const POPULATED_TM = DEFAULT_SS_TM_USERS.filter(u => u.role === "Train Manager");
  const [tmList, setTmList] = useState(() => {
    const saved = localStorage.getItem("ti_tm_list");
    if (saved) return JSON.parse(saved);

    return POPULATED_TM.map(u => ({
      id: u.id, name: u.name, hrmsId: u.id, station: u.station,
      contact: u.contact, score: u.score,
      status: u.id === "TM_1001" ? "Approved" : u.id === "TM_1002" ? "Submitted" : "Pending",
      examScore: u.id === "TM_1001" ? 23 : u.id === "TM_1002" ? 19 : undefined,
      submissionDate: u.id === "TM_1001" ? "2026-04-20" : u.id === "TM_1002" ? "2026-04-22" : undefined,
      pmeStatus: u.pmeStatus, refStatus: u.refStatus
    }));
  });
  useEffect(() => {
    localStorage.setItem("ti_tm_list", JSON.stringify(tmList));
  }, [tmList]);

  // Hotfix user/SM mismatches in mock
  useEffect(() => {
    const savedUsers = localStorage.getItem("ti_users");
    if (savedUsers) {
      try {
        const parsed = JSON.parse(savedUsers);
        let changed = false;
        const updated = parsed.map(u => {
          if (u.id === "SM_2101") {
            changed = true;
            return { ...u, id: "SM_1001" };
          }
          return u;
        });
        if (changed) {
          localStorage.setItem("ti_users", JSON.stringify(updated));
          setUsers(updated);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const savedSmList = localStorage.getItem("ti_sm_list");
    if (savedSmList) {
      try {
        const parsed = JSON.parse(savedSmList);
        let changed = false;
        const updated = parsed.map(s => {
          if (s.hrmsId === "SM_2101") {
            changed = true;
            return { ...s, hrmsId: "SM_1001" };
          }
          return s;
        });
        if (changed) {
          localStorage.setItem("ti_sm_list", JSON.stringify(updated));
          setSmList(updated);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const [inspections, setInspections] = useState(INIT_INSPECTIONS);
  const [counsellings, setCounsellings] = useState(INIT_COUNSELLING);

  // Self assessment state
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [tiAssessments, setTiAssessments] = useState(() => {
    const saved = localStorage.getItem("ti_assessments");
    return saved ? JSON.parse(saved) : INIT_TI_ASSESS_HISTORY;
  });
  useEffect(() => {
    localStorage.setItem("ti_assessments", JSON.stringify(tiAssessments));
  }, [tiAssessments]);

  // Safety Exam assignment simulation from AOM
  const [isExamAssigned, setIsExamAssigned] = useState(() => localStorage.getItem("ti_exam_assigned") === "true");

  // Search/Sort/Filter inputs
  const [selectedReportUserId, setSelectedReportUserId] = useState(null);
  const [selectedSM, setSelectedSM] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [stSearch, setStSearch] = useState("");
  const [stCatFilter, setStCatFilter] = useState("All");

  const [userSearch, setUserSearch] = useState("");
  const [userStationFilter, setUserStationFilter] = useState("All");
  const [userDesignationFilter, setUserDesignationFilter] = useState("All");
  const [userCategoryFilter, setUserCategoryFilter] = useState("All");
  const [userRiskFilter, setUserRiskFilter] = useState("All");

  const [editingUser, setEditingUser] = useState(null);
  const [transferringUser, setTransferringUser] = useState(null);

  const [reviewTab, setReviewTab] = useState("Pending");
  const [reviewSearch, setReviewSearch] = useState("");
  const [reviewStation, setReviewStation] = useState("All");
  const [selectedPmId, setSelectedPmId] = useState(null);
  const [editSections, setEditSections] = useState({});
  const [tiRemarks, setTiRemarks] = useState({});
  const [showAudit, setShowAudit] = useState({});
  const [rejectMode, setRejectMode] = useState({});

  // Assessment Forms
  const [smForms, setSmForms] = useState(() => {
    const saved = localStorage.getItem("ti_sm_forms");
    return saved ? JSON.parse(saved) : {};
  });
  useEffect(() => {
    localStorage.setItem("ti_sm_forms", JSON.stringify(smForms));
  }, [smForms]);
  const [smLocked, setSmLocked] = useState({});
  const [activeSmId, setActiveSmId] = useState(null);

  const [tmForms, setTmForms] = useState(() => {
    const saved = localStorage.getItem("ti_tm_forms");
    return saved ? JSON.parse(saved) : {};
  });
  useEffect(() => {
    localStorage.setItem("ti_tm_forms", JSON.stringify(tmForms));
  }, [tmForms]);
  const [tmLocked, setTmLocked] = useState({});
  const [activeTmId, setActiveTmId] = useState(null);

  const [ssForms, setSsForms] = useState(() => {
    const saved = localStorage.getItem("ti_ss_forms");
    return saved ? JSON.parse(saved) : {};
  });
  useEffect(() => {
    localStorage.setItem("ti_ss_forms", JSON.stringify(ssForms));
  }, [ssForms]);
  const [ssLocked, setSsLocked] = useState({});
  const [activeSsId, setActiveSsId] = useState(null);

  const [assessRole, setAssessRole] = useState(null);
  const [rosterSearch, setRosterSearch] = useState("");
  const [rosterStation, setRosterStation] = useState("All");
  const [rosterStatus, setRosterStatus] = useState("All");
  const [rosterDate, setRosterDate] = useState("");

  const [repApplied, setRepApplied] = useState(false);

  // Report filters
  const [rpStation, setRpStation] = useState("All");
  const [rpCat, setRpCat] = useState("All");
  const [rpRisk, setRpRisk] = useState("All");
  const [rpSearch, setRpSearch] = useState("");
  const [rpSort, setRpSort] = useState("date-desc");

  // Inspections / Counselling forms
  const [showInspForm, setShowInspForm] = useState(false);
  const [newInsp, setNewInsp] = useState({ station: "Parbhani Junction", officer: "TI R. Khan", observations: "", risk: "Low" });
  const [showCounForm, setShowCounForm] = useState(false);
  const [newCoun, setNewCoun] = useState({ staffName: "", designation: "Pointsman Grade I", station: "Parbhani Junction", topics: "", duration: "30 mins", progress: "Under Monitor" });

  const [dbStationFilter, setDbStationFilter] = useState("All");
  const [dbSearchQuery, setDbSearchQuery] = useState("");

  const [fsSearch, setFsSearch] = useState("");
  const [fsCatFilter, setFsCatFilter] = useState("All");
  const [fsRiskFilter, setFsRiskFilter] = useState("All");

  // Role roster filter (used in Personnel pages)
  const [roleF, setRoleF] = useState({ name: "", station: "All", ti: "All", cat: "All", risk: "All" });

  // Reports page filter object
  const [repF, setRepF] = useState({ search: "", role: "All", station: "All", cat: "All", risk: "All", sort: "score-desc" });

  // Fullscreen Analytics chart state
  const [fullscreenChart, setFullscreenChart] = useState(null);

  // MCQ Quiz Attempts
  const [quizState, setQuizState] = useState("idle");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState(Array(25).fill(null));
  const [latestQuizScore, setLatestQuizScore] = useState(null);

  // High Fidelity Zoom Modals
  const [isChartZoomModalOpen, setIsChartZoomModalOpen] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState("progress");
  const [zoomPopupSearch, setZoomPopupSearch] = useState("");
  const [zoomPopupZone, setZoomPopupZone] = useState("All");
  const [zoomPopupDivision, setZoomPopupDivision] = useState("All");
  const [zoomPopupStationName, setZoomPopupStationName] = useState("All");
  const [zoomPopupStationCode, setZoomPopupStationCode] = useState("All");
  const [zoomPopupCategory, setZoomPopupCategory] = useState("All");
  const [zoomPopupRisk, setZoomPopupRisk] = useState("All");
  const [zoomPopupStatus, setZoomPopupStatus] = useState("All");
  const [zoomPopupStartDate, setZoomPopupStartDate] = useState("");
  const [zoomPopupEndDate, setZoomPopupEndDate] = useState("");
  const [zoomPopupPage, setZoomPopupPage] = useState(1);

  // Sync exam assigned status continuously
  useEffect(() => {
    const handleStorageChange = () => {
      setIsExamAssigned(localStorage.getItem("ti_exam_assigned") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(() => {
      setIsExamAssigned(localStorage.getItem("ti_exam_assigned") === "true");
    }, 1000);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const tiName = user?.name || "R. Khan";
  const tiId = user?.hrmsId || "TI_1001";

  // Reactive memo filters
  const myStations = useMemo(() => {
    return stations.filter(st => !st.assignedTi || st.assignedTi === tiId);
  }, [stations, tiId]);

  const myUsers = useMemo(() => {
    return users.filter(u => myStations.some(st => st.name === u.station));
  }, [users, myStations]);

  const myPmList = useMemo(() => {
    return pmList.filter(p => myStations.some(st => st.name === p.station));
  }, [pmList, myStations]);

  const mySmList = useMemo(() => {
    return smList.filter(s => myStations.some(st => st.name === s.station));
  }, [smList, myStations]);

  const myTmList = useMemo(() => {
    return tmList.filter(t => myStations.some(st => st.name === t.station));
  }, [tmList, myStations]);

  const totalPM = myUsers.filter(u => u.role === "Pointsman").length;
  const totalSMs = myUsers.filter(u => u.role === "Station Master").length;
  const pending = myPmList.filter(p => p.status === "Pending").length;
  const highRiskAll = myUsers.filter(u => u.pmeStatus === "Overdue" || u.refStatus === "Expired" || u.score < 50).length;
  const avgScoreAll = myUsers.length ? Math.round(myUsers.reduce((sum, u) => sum + (u.score || 0), 0) / myUsers.length) : 0;

  const stationStats = useMemo(() => {
    return myStations.map(st => {
      const stUsers = users.filter(u => u.station === st.name);
      const avg = stUsers.length ? Math.round(stUsers.reduce((s, u) => s + u.score, 0) / stUsers.length) : st.avgScore;
      const riskCount = stUsers.filter(u => u.pmeStatus === "Overdue" || u.refStatus === "Expired" || u.score < 50).length;
      return {
        ...st,
        avgScore: avg,
        highRisk: riskCount,
        safetyPct: Math.max(50, Math.min(100, 100 - (riskCount * 12)))
      };
    });
  }, [myStations, users]);

  const bestSt = [...stationStats].sort((a, b) => b.avgScore - a.avgScore)[0];
  const worstSt = [...stationStats].sort((a, b) => a.avgScore - b.avgScore)[0];
  const highRiskSt = [...stationStats].sort((a, b) => b.highRisk - a.highRisk)[0];

  const filteredStations = useMemo(() => {
    return stationStats.filter(st => {
      const matchesSearch = st.name.toLowerCase().includes(dbSearchQuery.toLowerCase()) || st.code.toLowerCase().includes(dbSearchQuery.toLowerCase());
      const matchesFilter = dbStationFilter === "All" || st.name === dbStationFilter;
      return matchesSearch && matchesFilter;
    });
  }, [stationStats, dbSearchQuery, dbStationFilter]);

  const stBarData = filteredStations.map(st => ({ 
    name: st.code, nameFull: st.name, avgScore: st.avgScore, safetyPct: st.safetyPct, highRisk: st.highRisk 
  }));

  const pieData = useMemo(() => {
    const c = { A: 0, B: 0, C: 0, D: 0 };
    myUsers.forEach(u => {
      const cat = u.cat || getCat(u.score);
      if (c[cat] !== undefined) c[cat]++;
    });
    return Object.entries(c).map(([name, value]) => ({ name, value }));
  }, [myUsers]);

  const myStationsProgress = useMemo(() => {
    return myStations.map(st => {
      const pmCompleted = myPmList.filter(p => p.station === st.name && p.status === "Approved").length;
      const pmPending = myPmList.filter(p => p.station === st.name && p.status === "Pending").length;
      const smCompleted = mySmList.filter(s => s.station === st.name && (s.status === "Submitted" || s.status === "Approved")).length;
      const smPending = mySmList.filter(s => s.station === st.name && s.status === "Pending").length;
      const ssCompleted = ssList.filter(s => s.station === st.name && (s.status === "Submitted" || s.status === "Approved")).length;
      const ssPending = ssList.filter(s => s.station === st.name && s.status === "Pending").length;
      const tmCompleted = myTmList.filter(t => t.station === st.name && (t.status === "Submitted" || t.status === "Approved")).length;
      const tmPending = myTmList.filter(t => t.station === st.name && t.status === "Pending").length;

      return {
        name: st.code,
        completed: pmCompleted + smCompleted + ssCompleted + tmCompleted,
        pending: pmPending + smPending + ssPending + tmPending
      };
    });
  }, [myStations, myPmList, mySmList, ssList, myTmList]);

  const roleBarData = useMemo(() => {
    const pmCount = myUsers.filter(u => u.role === "Pointsman").length;
    const smCount = myUsers.filter(u => u.role === "Station Master").length;
    const ssCount = myUsers.filter(u => u.role === "Station Superintendent").length;
    const tmCount = myUsers.filter(u => u.role === "Train Manager").length;
    return [
      { role: "Pointsmen", count: pmCount },
      { role: "Station Masters", count: smCount },
      { role: "Station Superintendents", count: ssCount },
      { role: "Train Managers", count: tmCount }
    ];
  }, [myUsers]);

  const myCompliance = useMemo(() => {
    const overallSafetyPct = myStations.length ? Math.round(stationStats.reduce((s, st) => s + st.safetyPct, 0) / myStations.length) : 0;
    const pmeFitCount = myUsers.filter(u => u.pmeStatus === "Fit").length;
    const pmeCompletionRate = myUsers.length ? Math.round((pmeFitCount / myUsers.length) * 100) : 0;
    const refClearedCount = myUsers.filter(u => u.refStatus === "Cleared").length;
    const refCompletionRate = myUsers.length ? Math.round((refClearedCount / myUsers.length) * 100) : 0;

    return [
      { label: "Overall Safety Compliance", pct: overallSafetyPct, color: "#16a34a" },
      { label: "PME Completion Rate", pct: pmeCompletionRate, color: "#2563eb" },
      { label: "REF Completion Rate", pct: refCompletionRate, color: "#7c3aed" },
      { label: "Incident Reporting Compliance", pct: 92, color: "#0891b2" },
      { label: "Disciplinary Clean Record", pct: 96, color: "#16a34a" }
    ];
  }, [myStations, stationStats, myUsers]);

  const topStations = useMemo(() => [...stationStats].sort((a, b) => b.avgScore - a.avgScore).slice(0, 5), [stationStats]);
  const bottomStations = useMemo(() => [...stationStats].sort((a, b) => a.avgScore - b.avgScore).slice(0, 5), [stationStats]);

  const myPipeline = useMemo(() => {
    const approvedCount = myPmList.filter(p => p.status === "Approved").length + mySmList.filter(s => s.status === "Approved").length + myTmList.filter(t => t.status === "Approved").length;
    const pendingCount = myPmList.filter(p => p.status === "Pending").length + mySmList.filter(s => s.status === "Pending" || s.status === "Submitted").length + myTmList.filter(t => t.status === "Pending" || t.status === "Submitted").length;
    const rejectedCount = mySmList.filter(s => s.status === "Rejected").length + myTmList.filter(t => t.status === "Rejected").length;
    const overdueCount = myUsers.filter(u => u.pmeStatus === "Overdue" || u.refStatus === "Expired").length;

    return [
      { label: "Approved", count: approvedCount, dot: "#1E3A5F" },
      { label: "Pending", count: pendingCount, dot: "#4A90D9" },
      { label: "Rejected", count: rejectedCount, dot: "#B83A3A" },
      { label: "Overdue", count: overdueCount, dot: "#5A6B7C" }
    ];
  }, [myPmList, mySmList, myTmList, myUsers]);

  const myAssessmentMonthly = useMemo(() => {
    return MONTHLY.map(m => {
      const scale = myStations.length / 12.0;
      return {
        month: m.month,
        approved: Math.round(m.assessments * scale * 0.8),
        pending: Math.round(m.assessments * scale * 0.15),
        rejected: Math.round(m.assessments * scale * 0.04),
        overdue: Math.round(m.assessments * scale * 0.01)
      };
    });
  }, [myStations]);

  // Fullscreen view filters
  const filteredFsStations = useMemo(() => {
    return stationStats.filter(st => {
      const q = fsSearch.toLowerCase();
      const matchesSearch = st.name.toLowerCase().includes(q) || st.code.toLowerCase().includes(q);
      const grade = getCat(st.avgScore);
      const matchesCat = fsCatFilter === "All" || grade === fsCatFilter;
      const riskLevel = st.highRisk >= 2 ? "High" : st.highRisk > 0 ? "Medium" : "Low";
      const matchesRisk = fsRiskFilter === "All" || riskLevel === fsRiskFilter;
      return matchesSearch && matchesCat && matchesRisk;
    });
  }, [stationStats, fsSearch, fsCatFilter, fsRiskFilter]);

  const fsStBarData = useMemo(() => {
    return filteredFsStations.map(st => ({
      name: st.code, nameFull: st.name, avgScore: st.avgScore, safetyPct: st.safetyPct, highRisk: st.highRisk
    }));
  }, [filteredFsStations]);

  const filteredFsUsers = useMemo(() => {
    return users.filter(u => {
      if (u.role !== "Pointsman") return false;
      const q = fsSearch.toLowerCase();
      const matchesSearch = u.name.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
      const grade = getCat(u.score);
      const matchesCat = fsCatFilter === "All" || grade === fsCatFilter;
      const risk = u.pmeStatus === "Overdue" || u.refStatus === "Expired" || u.score < 50 ? "High" : u.score >= 80 ? "Low" : "Medium";
      const matchesRisk = fsRiskFilter === "All" || risk === fsRiskFilter;
      return matchesSearch && matchesCat && matchesRisk;
    });
  }, [users, fsSearch, fsCatFilter, fsRiskFilter]);

  const fsPieData = useMemo(() => {
    const c = { A: 0, B: 0, C: 0, D: 0 };
    filteredFsUsers.forEach(u => { c[getCat(u.score)]++; });
    return Object.entries(c).map(([name, value]) => ({ name, value }));
  }, [filteredFsUsers]);

  const filteredPM = useMemo(() => {
    return pmList.filter(p => {
      const st = p.status === reviewTab;
      const s = !reviewSearch || p.pointsmanName.toLowerCase().includes(reviewSearch.toLowerCase()) || p.hrmsId.toLowerCase().includes(reviewSearch.toLowerCase());
      const r = reviewStation === "All" || p.station === reviewStation;
      return st && s && r;
    });
  }, [pmList, reviewTab, reviewSearch, reviewStation]);

  const selectedPM = pmList.find(p => p.id === selectedPmId) || null;

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const isRoleMatch = 
        activePage === "pointsmen" ? u.role === "Pointsman" : 
        activePage === "stationMasters" ? u.role === "Station Master" : 
        activePage === "stationSuperintendents" ? u.role === "Station Superintendent" : 
        activePage === "trainManagers" ? u.role === "Train Manager" : true;
      if (!isRoleMatch) return false;

      const q = userSearch.toLowerCase();
      const matchesSearch = !q || u.name.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
      const matchesStation = userStationFilter === "All" || u.station === userStationFilter;
      const matchesCategory = userCategoryFilter === "All" || (u.cat || getCat(u.score)) === userCategoryFilter;
      const isHighRisk = u.pmeStatus === "Overdue" || u.refStatus === "Expired" || u.score < 50;
      const matchesRisk = userRiskFilter === "All" || (userRiskFilter === "High" && isHighRisk) || (userRiskFilter === "Non-High" && !isHighRisk);

      return matchesSearch && matchesStation && matchesCategory && matchesRisk;
    });
  }, [users, userSearch, userStationFilter, userCategoryFilter, userRiskFilter, activePage]);

  const filteredReport = useMemo(() => {
    let list = users.map(u => ({
      name: u.name, hrmsId: u.id, station: u.station, score: u.score,
      cat: u.cat || getCat(u.score),
      risk: u.pmeStatus === "Overdue" || u.refStatus === "Expired" || u.score < 50 ? "High" : u.score >= 80 ? "Low" : "Medium",
      date: u.lastAssessDate
    }));
    list = list.filter(r => {
      const q = rpSearch.toLowerCase();
      const srch = !q || r.name.toLowerCase().includes(q) || r.station.toLowerCase().includes(q);
      const st = rpStation === "All" || r.station === rpStation;
      const cat = rpCat === "All" || r.cat === rpCat;
      const risk = rpRisk === "All" || r.risk === rpRisk;
      return srch && st && cat && risk;
    });
    if (rpSort === "score-desc") list = [...list].sort((a, b) => b.score - a.score);
    if (rpSort === "score-asc") list = [...list].sort((a, b) => a.score - b.score);
    return list;
  }, [users, rpSearch, rpStation, rpCat, rpRisk, rpSort]);

  // Floating helper actions
  const triggerNotification = (type, message) => {
    setNotifications(prev => [{ id: Date.now(), type, message, time: "Just now", read: false }, ...prev]);
  };

  const addAuditLog = (event, details) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setAuditLogs(prev => [{ id: Date.now(), timestamp, event, details }, ...prev]);
  };

  const exportAlert = (format, filename) => {
    alert(`✓ EXPORT COMPLETE: Dataset "${filename}" exported successfully in ${format} format to your local downloads directory.`);
    addAuditLog("Report Exported", `File: ${filename}.${format.toLowerCase()}`);
    triggerNotification("success", `Report "${filename}" exported safely.`);
  };

  // Station level Detail card mapping
  useEffect(() => {
    if (selectedStation) {
      const matched = stationStats.find(s => s.name === selectedStation.name || s.code === selectedStation.code) || selectedStation;
      const smCount = users.filter(u => u.station === matched.name && (u.role === "Station Master" || u.role === "sm")).length;
      const pmCount = users.filter(u => u.station === matched.name && (u.role === "Pointsman" || u.role === "pointsmen")).length;
      const pmPending = myPmList.filter(p => p.station === matched.name && p.status === "Pending").length;
      const smPending = mySmList.filter(s => s.station === matched.name && s.status === "Pending").length;
      const tmPending = myTmList.filter(t => t.station === matched.name && t.status === "Pending").length;
      const pendingCount = pmPending + smPending + tmPending;

      setView({
        type: "stationDetail",
        data: {
          ...matched, ti: tiName, smCount, pmCount,
          score: matched.avgScore || matched.score,
          safety: matched.safetyPct || matched.safety,
          highRisk: matched.highRisk, pending: pendingCount
        }
      });
    } else {
      setView(null);
    }
  }, [selectedStation, stationStats, users, myPmList, mySmList, myTmList, tiName]);

  const handleChartClick = (state, chartType) => {
    let clickedStationName = "";
    if (state && state.activeLabel) {
      const matched = stationStats.find(st => st.code === state.activeLabel);
      if (matched) clickedStationName = matched.name;
    }
    if (clickedStationName) {
      setZoomPopupSearch(clickedStationName);
    } else {
      setZoomPopupSearch("");
    }
    setSelectedChartType(chartType);
    setIsChartZoomModalOpen(true);
    setZoomPopupPage(1);
  };

  const handlePieClick = (data) => {
    if (data && data.name) {
      const catLetter = data.name.replace("Category ", "").trim();
      setZoomPopupCategory(catLetter);
    } else {
      setZoomPopupCategory("All");
    }
    setSelectedChartType("category");
    setIsChartZoomModalOpen(true);
    setZoomPopupPage(1);
  };

  const handleResetPopupFilters = () => {
    setZoomPopupSearch("");
    setZoomPopupZone("All");
    setZoomPopupDivision("All");
    setZoomPopupStationName("All");
    setZoomPopupStationCode("All");
    setZoomPopupCategory("All");
    setZoomPopupRisk("All");
    setZoomPopupStatus("All");
    setZoomPopupStartDate("");
    setZoomPopupEndDate("");
    setZoomPopupPage(1);
  };

  // Nav helper
  const goTo = pg => {
    setActivePage(pg);
    setStatusMsg("");
    setSelectedPmId(null);
    setActiveSmId(null);
    setActiveSsId(null);
    setActiveTmId(null);
    setAssessRole(null);
    setSelectedStation(null);
    setSelectedReportUserId(null);
    setRepApplied(false);
    setBellDropdownOpen(false);
    setView(null);
  };

  /* ── Operational / Admin Actions ── */
  const handleAddStationSubmit = (e) => {
    e.preventDefault();
    if (!newStationData.name || !newStationData.code) return;
    const newSt = {
      id: Date.now(),
      name: newStationData.name,
      code: newStationData.code.toUpperCase(),
      division: "Parbhani-Amla Section",
      zone: "Central Railway",
      completed: 0,
      pending: 2,
      avgScore: 0,
      category: "B",
      riskLevel: "Medium",
      lastUpdatedDate: new Date().toISOString().slice(0, 10)
    };
    setStations(prev => [...prev, newSt]);
    addAuditLog("Added New Station", `Station: ${newSt.name} (${newSt.code})`);
    triggerNotification("success", `Station ${newSt.name} added to division.`);
    setNewStationData({ name: "", code: "" });
    setShowAddStationModal(false);
  };

  const openAddUserModal = () => {
    setNewUserData({
      id: "",
      name: "",
      role: "Pointsman",
      designation: "Pointsman Grade I",
      station: myStations[0]?.name || "",
      contact: "",
      joiningDate: new Date().toISOString().slice(0, 10),
      pmeStatus: "Fit",
      refStatus: "Cleared",
      reportingSm: "",
      shift: "Morning Shift (06:00 - 14:00)",
      workLocation: "Platform Area"
    });
    setShowAddUserModal(true);
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      ...newUserData,
      score: 75,
      cat: "B",
      lastAssessDate: new Date().toISOString().slice(0, 10)
    };
    setUsers(prev => [...prev, newUser]);
    addAuditLog("New User Created", `Staff ID: ${newUser.id}, Name: ${newUser.name}`);
    triggerNotification("success", `Account provisioned for ${newUser.name}.`);
    setShowAddUserModal(false);
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
    setStatusMsg("User profile updated successfully.");
  };

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you absolutely sure you want to revoke operational access for ${userName} (${userId})?`)) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      addAuditLog("Revoked User Access", `Staff ID: ${userId}, Name: ${userName}`);
      triggerNotification("danger", `Revoked access: ${userName} (${userId}).`);
      setStatusMsg(`Revoked evaluation and access clearance for ${userName}.`);
    }
  };

  const handleTransferClick = (userRec) => {
    setTransferringUser({ ...userRec, targetStation: userRec.station });
  };

  const confirmTransfer = () => {
    setUsers(prev => prev.map(u => u.id === transferringUser.id ? { ...u, station: transferringUser.targetStation } : u));
    addAuditLog("Staff Station Transfer", `Staff: ${transferringUser.name} moved from ${transferringUser.station} to ${transferringUser.targetStation}`);
    triggerNotification("warning", `Transferred ${transferringUser.name} to ${transferringUser.targetStation}.`);
    setStatusMsg(`Operational deployment of ${transferringUser.name} transferred to ${transferringUser.targetStation}.`);
    setTransferringUser(null);
  };

  /* ── PM Review Actions ── */
  const openPmReview = id => {
    const rec = pmList.find(p=>p.id===id);
    if (!rec) return;
    setSelectedPmId(id);
    setEditSections(prev=>({...prev,[id]:rec.originalSections.map(s=>({...s}))}));
    setTiRemarks(prev=>({...prev,[id]:rec.tiRemarks||""}));
    setRejectMode(prev=>({...prev,[id]:false}));
  };

  const updateSec = (id,idx,val) => {
    setEditSections(prev=>{
      const arr=[...prev[id]]; arr[idx]={...arr[idx],score:Math.max(0,Math.min(arr[idx].max,Number(val)||0))};
      return {...prev,[id]:arr};
    });
  };

  const finalizePM = (id,mode,rejectNote="") => {
    let total = 0;
    setPmList(prev=>prev.map(p=>{
      if (p.id!==id) return p;
      const secs  = editSections[id]||p.originalSections;
      total = secs.reduce((s,x)=>s+x.score,0);
      const modified = JSON.stringify(secs)!==JSON.stringify(p.originalSections);
      const audit = [...(p.auditTrail||[]),{
        action: mode==="reject"?"Rejected":(modified?"Modified & Approved":"Approved without modification"),
        by:`TI ${tiName}`, date:new Date().toISOString().slice(0,10),
        remark: mode==="reject"?rejectNote:(tiRemarks[id]||"")
      }];
      return {
        ...p, status: mode==="reject"?"Rejected":"Approved",
        finalSections:mode==="reject"?p.originalSections:secs,
        finalScore:total, tiRemarks:tiRemarks[id]||rejectNote,
        tiModified:modified, approvalDate:new Date().toISOString().slice(0,10),
        auditTrail:audit
      };
    }));
    
    const targetAssess = pmList.find(p => p.id === id);
    if (targetAssess && mode !== "reject") {
      const finalSecs = editSections[id] || targetAssess.originalSections;
      const finalSum = finalSecs.reduce((s, x) => s + x.score, 0);
      setUsers(prev => prev.map(u => u.id === targetAssess.hrmsId ? { ...u, score: finalSum, cat: getCat(finalSum) } : u));
    }

    setSelectedPmId(null);
    setStatusMsg(mode==="reject"?"Assessment rejected. SM has been notified.":`Assessment ${mode==="approve"?"approved":"modified & approved"} successfully.`);
    addAuditLog(mode==="reject"?"Rejected PM Assessment":"Approved PM Assessment", `Staff ID: ${targetAssess?.hrmsId || ""}, Score: ${mode==="reject"?"-":total}`);
    triggerNotification("success", `Reviewed PM Assessment for ${targetAssess?.pointsmanName || ""}.`);
    setReviewTab(mode==="reject"?"Rejected":"Approved");
  };

  /* ── SM Form ── */
  const openSMForm = (id, forceUnlock = false) => {
    setActiveSmId(id);
    const smAssess = smList.find(s => s.id === id);
    setSmLocked(prev => ({
      ...prev,
      [id]: forceUnlock ? false : (smAssess ? smAssess.status === "Submitted" : false)
    }));
    setSmForms(prev => {
      const existing = prev[id] || defaultSMForm();
      if (smAssess && smAssess.examScore !== undefined) {
        return {
          ...prev,
          [id]: {
            ...existing,
            knowledgeMarks: smAssess.examScore.toString()
          }
        };
      }
      return {
        ...prev,
        [id]: existing
      };
    });
  };

  const handleSendExamAccess = (id) => {
    setSmList(prev => prev.map(s => s.id === id ? { ...s, status: "Exam Sent" } : s));
    setStatusMsg("Exam access link sent successfully to the Station Master.");
    addAuditLog("Sent Exam Access", `Exam sent to SM: ${smList.find(s => s.id === id)?.name}`);
    triggerNotification("success", `Exam access granted to SM ${smList.find(s => s.id === id)?.name}`);
  };

  const toggleSMYN = (id,key,idx,val) => {
    if (smLocked[id]) return;
    setSmForms(prev=>{
      const f={...prev[id]}; const arr=[...f[key]]; arr[idx]=arr[idx]===val?null:val;
      return {...prev,[id]:{...f,[key]:arr}};
    });
  };

  const setSMField = (id,key,val) => { if(smLocked[id])return; setSmForms(p=>({...p,[id]:{...p[id],[key]:val}})); };

  const submitSMAssessment = id => {
    const f = smForms[id];
    if (!f?.alcoholicStatus){ setStatusMsg("Alcoholic/Non-Alcoholic status is mandatory."); return; }
    const {total} = computeSMScore(f, TI_SM_CRITERIA);
    
    const isAlcoholic = f.alcoholicStatus === "Alcoholic";
    const cat = isAlcoholic ? "D" : getCat(total);

    setSmList(prev=>prev.map(s=>s.id===id?{...s,status:"Submitted",score:total,category:cat}:s));
    setSmLocked(p=>({...p,[id]:true}));
    
    const smAssess = smList.find(s => s.id === id);
    if (smAssess) {
      setUsers(prev => prev.map(u => u.id === smAssess.hrmsId ? {
        ...u,
        score: total,
        cat: cat,
        alcoholicStatus: f.alcoholicStatus,
        pmeStatus: f.pmeStatus,
        refStatus: f.refStatus
      } : u));
    }

    setStatusMsg("SM assessment submitted. Pending AOM approval.");
    addAuditLog("Submitted SM Assessment", `SM: ${smAssess?.name || ""}, Grand Score: ${total}`);
    triggerNotification("success", `Field evaluation logged for SM ${smAssess?.name || ""}.`);
    setActiveSmId(null);
  };

  /* ── TM Form ── */
  const openTMForm = (id, forceUnlock = false) => {
    setActiveTmId(id);
    const tmAssess = tmList.find(t => t.id === id);
    setTmLocked(prev => ({
      ...prev,
      [id]: forceUnlock ? false : (tmAssess ? tmAssess.status === "Submitted" : false)
    }));
    setTmForms(prev => {
      const existing = prev[id] || defaultTMForm();
      if (tmAssess && tmAssess.examScore !== undefined) {
        return {
          ...prev,
          [id]: {
            ...existing,
            knowledgeMarks: tmAssess.examScore.toString()
          }
        };
      }
      return {
        ...prev,
        [id]: existing
      };
    });
  };

  const handleSendTMExamAccess = (id) => {
    setTmList(prev => prev.map(t => t.id === id ? { ...t, status: "Exam Sent" } : t));
    setStatusMsg("Exam access link sent successfully to the Train Manager.");
    addAuditLog("Sent Exam Access", `Exam sent to TM: ${tmList.find(t => t.id === id)?.name}`);
    triggerNotification("success", `Exam access granted to TM ${tmList.find(t => t.id === id)?.name}`);
  };

  const toggleTMYN = (id, key, idx, val) => {
    if (tmLocked[id]) return;
    setTmForms(prev => {
      const f = { ...prev[id] };
      const arr = [...f[key]];
      arr[idx] = arr[idx] === val ? null : val;
      return { ...prev, [id]: { ...f, [key]: arr } };
    });
  };

  const setTMField = (id, key, val) => {
    if (tmLocked[id]) return;
    setTmForms(p => ({ ...p, [id]: { ...p[id], [key]: val } }));
  };

  const submitTMAssessment = id => {
    const f = tmForms[id];
    if (!f?.alcoholicStatus) {
      setStatusMsg("Alcoholic/Non-Alcoholic status is mandatory.");
      return;
    }
    const { total } = computeTMScore(f, TI_TM_CRITERIA);

    const isAlcoholic = f.alcoholicStatus === "Alcoholic";
    const cat = isAlcoholic ? "D" : getCat(total);

    setTmList(prev => prev.map(t => t.id === id ? { ...t, status: "Submitted", score: total, category: cat } : t));
    setTmLocked(p => ({ ...p, [id]: true }));

    const tmAssess = tmList.find(t => t.id === id);
    if (tmAssess) {
      setUsers(prev => prev.map(u => u.id === tmAssess.hrmsId ? {
        ...u,
        score: total,
        cat: cat,
        alcoholicStatus: f.alcoholicStatus,
        pmeStatus: f.pmeStatus,
        refStatus: f.refStatus
      } : u));
    }

    setStatusMsg("TM assessment submitted. Pending AOM approval.");
    addAuditLog("Submitted TM Assessment", `TM: ${tmAssess?.name || ""}, Grand Score: ${total}`);
    triggerNotification("success", `Field evaluation logged for TM ${tmAssess?.name || ""}.`);
    setActiveTmId(null);
  };

  /* ── SS Helpers ── */
  const openSSForm = (id, forceUnlock = false) => {
    if (forceUnlock) setSsLocked(p => ({ ...p, [id]: false }));
    setActiveSsId(id);
    setAssessRole("SS");
    setActivePage("assessments");
  };

  const handleSendSSExamAccess = (id) => {
    setSsList(prev => prev.map(s => s.id === id ? { ...s, status: "Exam Sent" } : s));
    triggerNotification("info", "Exam access link sent to Station Superintendent.");
  };

  const toggleSSYN = (id, key, idx, val) => {
    if (ssLocked[id]) return;
    setSsForms(p => ({
      ...p,
      [id]: {
        ...(p[id] || defaultSSForm()),
        [key]: (p[id]?.[key] || Array(5).fill(null)).map((v, i) => i === idx ? (v === val ? null : val) : v)
      }
    }));
  };

  const setSSField = (id, key, val) => { if (ssLocked[id]) return; setSsForms(p => ({ ...p, [id]: { ...(p[id] || defaultSSForm()), [key]: val } })); };

  const submitSSAssessment = id => {
    const f = ssForms[id];
    if (!f?.alcoholicStatus) {
      setStatusMsg("Alcoholic/Non-Alcoholic status is mandatory.");
      return;
    }
    const { total } = computeSSScore(f, TI_SS_CRITERIA);
    const isAlcoholic = f.alcoholicStatus === "Alcoholic";
    const cat = isAlcoholic ? "D" : getCat(total);

    setSsList(prev => prev.map(s => s.id === id ? { ...s, status: "Submitted", score: total, category: cat } : s));
    setSsLocked(p => ({ ...p, [id]: true }));

    const ssAssess = ssList.find(s => s.id === id);
    if (ssAssess) {
      setUsers(prev => prev.map(u => u.id === ssAssess.hrmsId ? {
        ...u, score: total, cat: cat,
        alcoholicStatus: f.alcoholicStatus, pmeStatus: f.pmeStatus, refStatus: f.refStatus
      } : u));
    }

    setStatusMsg("SS assessment submitted. Pending AOM approval.");
    addAuditLog("Submitted SS Assessment", `SS: ${ssAssess?.name || ""}, Grand Score: ${total}`);
    triggerNotification("success", `Field evaluation logged for SS ${ssAssess?.name || ""}.`);
    setActiveSsId(null);
  };

  /* ── Logging Inspections & Counselling ── */
  const submitInspection = (e) => {
    e.preventDefault();
    const newRecord = {
      id: "IN_" + Date.now(),
      date: new Date().toISOString().slice(0, 10),
      station: newInsp.station,
      officer: newInsp.officer,
      observations: newInsp.observations,
      risk: newInsp.risk,
      status: "Active"
    };
    setInspections(prev => [newRecord, ...prev]);
    addAuditLog("Logged Station Inspection", `Station: ${newInsp.station}, Risk: ${newInsp.risk}`);
    triggerNotification("warning", `NEW INSPECTION REPORT FILED: ${newInsp.station}`);
    setStatusMsg(`Inspection audit log successfully created for ${newInsp.station}.`);
    setNewInsp({ station: "Parbhani Junction", officer: "TI R. Khan", observations: "", risk: "Low" });
    setShowInspForm(false);
  };

  const submitCounselling = (e) => {
    e.preventDefault();
    const newRecord = {
      id: "CL_" + Date.now(),
      date: new Date().toISOString().slice(0, 10),
      staffName: newCoun.staffName,
      designation: newCoun.designation,
      station: newCoun.station,
      topics: newCoun.topics,
      duration: newCoun.duration,
      progress: newCoun.progress
    };
    setCounsellings(prev => [newRecord, ...prev]);
    addAuditLog("Logged Counselling Session", `Staff: ${newCoun.staffName}, Topics: ${newCoun.topics.slice(0,25)}...`);
    triggerNotification("success", `Counselling session registered for ${newCoun.staffName}.`);
    setStatusMsg(`Staff safety counseling briefing registered for ${newCoun.staffName}.`);
    setNewCoun({ staffName: "", designation: "Pointsman Grade I", station: "Parbhani Junction", topics: "", duration: "30 mins", progress: "Under Monitor" });
    setShowCounForm(false);
  };

  /* ── Self-Assessment Quiz ── */
  const startQuiz = () => {
    setQuizAnswers(Array(25).fill(null));
    setCurrentQuestion(0);
    setQuizState("quiz");
  };

  const handleSelectQuizOpt = (optIdx) => {
    setQuizAnswers(prev => {
      const next = [...prev];
      next[currentQuestion] = optIdx;
      return next;
    });
  };

  const submitQuiz = () => {
    let correctCount = 0;
    quizAnswers.forEach((ans, idx) => {
      if (ans === TI_QUIZ[idx].ans) correctCount++;
    });
    const finalScore = correctCount * 4;
    setLatestQuizScore(finalScore);
    
    const getDomainScore = (startIdx, endIdx) => {
      let score = 0;
      for (let i = startIdx; i <= endIdx; i++) {
        if (quizAnswers[i] === TI_QUIZ[i].ans) score += 4;
      }
      return score;
    };

    const today = new Date().toISOString().slice(0, 10);
    const newRecord = {
      id: Date.now(),
      date: today,
      period: "Assigned Assessment " + today,
      assessedBy: "AOM Assigned Exam",
      totalScore: finalScore,
      category: getCat(finalScore),
      approvalStatus: "Approved",
      aomRemarks: "Assigned safety compliance assessment submitted by Traffic Inspector R. Khan.",
      sections: [
        { title: "Whistle Codes & Hand Signals", marks: getDomainScore(0, 4), outOf: 20 },
        { title: "Token & Line Clear Authorities", marks: getDomainScore(5, 9), outOf: 20 },
        { title: "Station Interlocking & Track Circuits", marks: getDomainScore(10, 14), outOf: 20 },
        { title: "Shunting Operations & Point Locking", marks: getDomainScore(15, 19), outOf: 20 },
        { title: "Gate Signals & Siding Isolation", marks: getDomainScore(20, 24), outOf: 20 }
      ],
      userAnswers: [...quizAnswers]
    };
    
    setTiAssessments(prev => [newRecord, ...prev]);
    setSelectedRecord(newRecord);
    localStorage.removeItem("ti_exam_assigned");
    setIsExamAssigned(false);
    addAuditLog("Assigned Assessment Completed", `Score: ${finalScore}/100`);
    triggerNotification("success", `Compliance check complete: Scored ${finalScore}%`);
    setQuizState("result");
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addAuditLog("Notifications Inbox Read", "Marked all alerts read.");
  };

  return {
    activePage, setActivePage, goTo,
    statusMsg, setStatusMsg,
    view, setView,
    notifications, setNotifications,
    bellDropdownOpen, setBellDropdownOpen,
    auditLogs, setAuditLogs,
    stations, setStations,
    users, setUsers,
    pmList, setPmList,
    smList, setSmList,
    tmList, setTmList,
    ssList, setSsList,
    inspections, setInspections,
    counsellings, setCounsellings,
    selectedRecord, setSelectedRecord,
    tiAssessments, setTiAssessments,
    isExamAssigned, setIsExamAssigned,
    selectedReportUserId, setSelectedReportUserId,
    selectedSM, setSelectedSM,
    selectedStation, setSelectedStation,
    stSearch, setStSearch,
    stCatFilter, setStCatFilter,
    userSearch, setUserSearch,
    userStationFilter, setUserStationFilter,
    userDesignationFilter, setUserDesignationFilter,
    userCategoryFilter, setUserCategoryFilter,
    userRiskFilter, setUserRiskFilter,
    editingUser, setEditingUser,
    transferringUser, setTransferringUser,
    reviewTab, setReviewTab,
    reviewSearch, setReviewSearch,
    reviewStation, setReviewStation,
    selectedPmId, setSelectedPmId,
    editSections, setEditSections,
    tiRemarks, setTiRemarks,
    showAudit, setShowAudit,
    rejectMode, setRejectMode,
    smForms, setSmForms,
    smLocked, setSmLocked,
    activeSmId, setActiveSmId,
    tmForms, setTmForms,
    tmLocked, setTmLocked,
    activeTmId, setActiveTmId,
    ssForms, setSsForms,
    ssLocked, setSsLocked,
    activeSsId, setActiveSsId,
    assessRole, setAssessRole,
    rosterSearch, setRosterSearch,
    rosterStation, setRosterStation,
    rosterStatus, setRosterStatus,
    rosterDate, setRosterDate,
    repApplied, setRepApplied,
    rpStation, setRpStation,
    rpCat, setRpCat,
    rpRisk, setRpRisk,
    rpSearch, setRpSearch,
    rpSort, setRpSort,
    showInspForm, setShowInspForm,
    newInsp, setNewInsp,
    showCounForm, setShowCounForm,
    newCoun, setNewCoun,
    dbStationFilter, setDbStationFilter,
    dbSearchQuery, setDbSearchQuery,
    fsSearch, setFsSearch,
    fsCatFilter, setFsCatFilter,
    fsRiskFilter, setFsRiskFilter,
    quizState, setQuizState,
    currentQuestion, setCurrentQuestion,
    quizAnswers, setQuizAnswers,
    latestQuizScore, setLatestQuizScore,
    isChartZoomModalOpen, setIsChartZoomModalOpen,
    selectedChartType, setSelectedChartType,
    zoomPopupSearch, setZoomPopupSearch,
    zoomPopupZone, setZoomPopupZone,
    zoomPopupDivision, setZoomPopupDivision,
    zoomPopupStationName, setZoomPopupStationName,
    zoomPopupStationCode, setZoomPopupStationCode,
    zoomPopupCategory, setZoomPopupCategory,
    zoomPopupRisk, setZoomPopupRisk,
    zoomPopupStatus, setZoomPopupStatus,
    zoomPopupStartDate, setZoomPopupStartDate,
    zoomPopupEndDate, setZoomPopupEndDate,
    zoomPopupPage, setZoomPopupPage,

    // Memo calculations
    tiName, tiId,
    myStations, myUsers, myPmList, mySmList, myTmList,
    totalPM, totalSMs, pending, highRiskAll, avgScoreAll,
    stationStats, bestSt, worstSt, highRiskSt,
    filteredStations, stBarData, pieData, myStationsProgress,
    roleBarData, myCompliance, topStations, bottomStations, myPipeline, myAssessmentMonthly,
    filteredFsStations, fsStBarData, filteredFsUsers, fsPieData,
    filteredPM, selectedPM, filteredUsers, filteredReport,

    // Extra state vars previously missing from exports
    roleF, setRoleF,
    repF, setRepF,
    fullscreenChart, setFullscreenChart,

    // Helper functions
    triggerNotification, addAuditLog, exportAlert,
    handleChartClick, handlePieClick, handleResetPopupFilters,

    // Station modal actions
    showAddStationModal, setShowAddStationModal, newStationData, setNewStationData,
    showAddUserModal, setShowAddUserModal, newUserData, setNewUserData,

    // Operations / Admin Actions
    handleAddStationSubmit, openAddUserModal, handleAddUserSubmit, handleEditUser, saveEditedUser, handleDeleteUser, handleTransferClick, confirmTransfer,
    openPmReview, updateSec, finalizePM, openSMForm, handleSendExamAccess, toggleSMYN, setSMField, submitSMAssessment, openTMForm, handleSendTMExamAccess, toggleTMYN, setTMField, submitTMAssessment,
    openSSForm, handleSendSSExamAccess, toggleSSYN, setSSField, submitSSAssessment, submitInspection, submitCounselling, startQuiz, handleSelectQuizOpt, submitQuiz, markAllNotificationsRead
  };
}
export default useTrafficInspectorState;
