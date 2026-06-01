import { useMemo, useState, useEffect } from "react";
import {
  Activity, AlertTriangle, ArrowUpDown, Award, BarChart3, Building2,
  CheckCircle2, ChevronRight, ClipboardCheck,
  FileBarChart2, Filter, LogOut, Search, ShieldCheck,
  TrendingUp, TrendingDown, UserCircle2, Users, XCircle, Eye,
  Calendar, BookOpen, Clock, HeartHandshake, HelpCircle, Download,
  FileSpreadsheet, FileText, Bell, Plus, RefreshCw, Edit, Trash2, Lock, Maximize2,
  ArrowLeft, UserCheck, BusFront, ClipboardList
} from "lucide-react";
import {
  NAV,
  TI_PROFILE,
  getCat,
  CAT_C,
  CAT_B,
  PIE_C,
  RISK_C,
  RISK_B,
  INIT_STATIONS,
  INIT_USERS,
  MONTHLY,
  INIT_PM_ASSESSMENTS,
  TI_SM_CRITERIA,
  defaultSMForm,
  computeSMScore,
  INIT_SM_LIST,
  TI_TM_CRITERIA,
  defaultTMForm,
  computeTMScore,
  INIT_TM_LIST,
  INIT_INSPECTIONS,
  INIT_COUNSELLING,
  TI_QUIZ,
  generateTiMockResponses,
  getPerformanceSummaryText,
  INIT_TI_ASSESS_HISTORY,
  DEFAULT_SS_TM_USERS,
  INIT_SS_LIST
} from '../../data/mockTrafficInspectorData';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList
} from "recharts";

export function useTrafficInspectorState(user, onLogout) {

  const [activePage, setActivePage]       = useState("dashboard");
  const [statusMsg, setStatusMsg]         = useState("");
  const [view, setView]                   = useState(null);

  // Chart Zoom Modal States
  const [isChartZoomModalOpen, setIsChartZoomModalOpen] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState("progress"); // "progress" | "score" | "category"
  const [zoomPopupPage, setZoomPopupPage] = useState(1);
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

  // Fullscreen Analytics States
  const [fullscreenChart, setFullscreenChart] = useState(null); // 'station' | 'trend' | 'grade' | null
  const [fsSearch, setFsSearch] = useState("");
  const [fsCatFilter, setFsCatFilter] = useState("All");
  const [fsRiskFilter, setFsRiskFilter] = useState("All");

  // Notifications Bell
  const [bellDropdownOpen, setBellDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: "danger", message: "CRITICAL: PME overdue for SM P. Wankhede (Akola Junction)", time: "Just now", read: false },
    { id: 2, type: "warning", message: "Safety alert: Joint gap crack observed at Chandrapur Crossing 12B", time: "2 hours ago", read: false },
    { id: 3, type: "success", message: "Audit cleared: Parbhani Junction monthly logs verified.", time: "1 day ago", read: true }
  ]);

  // System Audit Logs
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, timestamp: "2026-05-27 10:00:12", event: "User session initialized.", details: "IP: 10.24.12.8" },
    { id: 2, timestamp: "2026-05-27 10:02:44", event: "Dashboard KPI matrices synced successfully.", details: "Calculations based on 12 stations" }
  ]);

  // Master Users & Stations States
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("ti_users");
    const initialList = saved ? JSON.parse(saved) : INIT_USERS;
    const hasSS = initialList.some(u => u.role === "Station Superintendent");
    if (!hasSS) {
      return [...initialList, ...DEFAULT_SS_TM_USERS];
    }
    return initialList;
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

  const [showAddStationModal, setShowAddStationModal] = useState(false);
  const [newStationData, setNewStationData] = useState({ name: "", code: "" });

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

  const [pmList, setPmList]               = useState(INIT_PM_ASSESSMENTS);
  const [smList, setSmList]               = useState(() => {
    const saved = localStorage.getItem("ti_sm_list");
    return saved ? JSON.parse(saved) : INIT_SM_LIST;
  });
  useEffect(() => {
    localStorage.setItem("ti_sm_list", JSON.stringify(smList));
  }, [smList]);

  const [tmList, setTmList]               = useState(() => {
    const saved = localStorage.getItem("ti_tm_list");
    return saved ? JSON.parse(saved) : INIT_TM_LIST;
  });
  useEffect(() => {
    localStorage.setItem("ti_tm_list", JSON.stringify(tmList));
  }, [tmList]);

  useEffect(() => {
    // Migration: automatically update any references of SM_2101 to SM_1001 in localStorage
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

  const [inspections, setInspections]     = useState(INIT_INSPECTIONS);
  const [counsellings, setCounsellings]   = useState(INIT_COUNSELLING);
  
  // Interactive Self-Assessment State
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [tiAssessments, setTiAssessments] = useState(() => {
    const saved = localStorage.getItem("ti_assessments");
    let history = saved ? JSON.parse(saved) : INIT_TI_ASSESS_HISTORY;
    let changed = false;
    history = history.map(item => {
      if (!item.userAnswers) {
        changed = true;
        return {
          ...item,
          userAnswers: generateTiMockResponses(item.totalScore)
        };
      }
      return item;
    });
    if (changed) {
      localStorage.setItem("ti_assessments", JSON.stringify(history));
    }
    return history;
  });
  useEffect(() => {
    localStorage.setItem("ti_assessments", JSON.stringify(tiAssessments));
  }, [tiAssessments]);

  const [quizState, setQuizState]         = useState("idle"); // "idle" | "quiz" | "result"
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers]     = useState(Array(25).fill(null));
  const [latestQuizScore, setLatestQuizScore] = useState(null);

  // AOM Assigned Exam State
  const [isExamAssigned, setIsExamAssigned] = useState(() => localStorage.getItem("ti_exam_assigned") === "true");

  // Search, Filters & Expanded Blocks
  const [selectedReportUserId, setSelectedReportUserId] = useState(null);
  const [selectedSM, setSelectedSM]       = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [stSearch, setStSearch]           = useState("");
  const [stCatFilter, setStCatFilter]     = useState("All");
  
  // All Users Page Controls
  const [userSearch, setUserSearch]       = useState("");
  const [userStationFilter, setUserStationFilter] = useState("All");
  const [userDesignationFilter, setUserDesignationFilter] = useState("All");
  const [userCategoryFilter, setUserCategoryFilter] = useState("All");
  const [userRiskFilter, setUserRiskFilter] = useState("All");
  
  // Edit User Modal State
  const [editingUser, setEditingUser]     = useState(null);
  const [transferringUser, setTransferringUser] = useState(null);

  // PM Review Page States
  const [reviewTab, setReviewTab]         = useState("Pending");
  const [reviewSearch, setReviewSearch]   = useState("");
  const [reviewStation, setReviewStation] = useState("All");
  const [selectedPmId, setSelectedPmId]   = useState(null);
  const [editSections, setEditSections]   = useState({});
  const [tiRemarks, setTiRemarks]         = useState({});
  const [showAudit, setShowAudit]         = useState({});
  const [rejectMode, setRejectMode]       = useState({});

  // SM Assess States
  const [activeSmId, setActiveSmId]       = useState(null);
  const [smForms, setSmForms]             = useState(() => {
    const saved = localStorage.getItem("ti_sm_forms");
    return saved ? JSON.parse(saved) : {};
  });
  useEffect(() => {
    localStorage.setItem("ti_sm_forms", JSON.stringify(smForms));
  }, [smForms]);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedUsers = localStorage.getItem("ti_users");
      if (savedUsers) setUsers(JSON.parse(savedUsers));

      const savedStations = localStorage.getItem("ti_stations");
      if (savedStations) setStations(JSON.parse(savedStations));

      const savedSmList = localStorage.getItem("ti_sm_list");
      if (savedSmList) setSmList(JSON.parse(savedSmList));

      const savedSmForms = localStorage.getItem("ti_sm_forms");
      if (savedSmForms) setSmForms(JSON.parse(savedSmForms));

      setIsExamAssigned(localStorage.getItem("ti_exam_assigned") === "true");
    };
    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      const current = localStorage.getItem("ti_exam_assigned") === "true";
      setIsExamAssigned(current);
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const [smLocked, setSmLocked]           = useState({});

  // TM Assess States
  const [activeTmId, setActiveTmId]       = useState(null);
  const [tmForms, setTmForms]             = useState(() => {
    const saved = localStorage.getItem("ti_tm_forms");
    return saved ? JSON.parse(saved) : {};
  });
  useEffect(() => {
    localStorage.setItem("ti_tm_forms", JSON.stringify(tmForms));
  }, [tmForms]);
  const [tmLocked, setTmLocked]           = useState({});

  // Station Superintendent assessment state
  const [ssList, setSsList]               = useState(() => {
    const saved = localStorage.getItem("ti_ss_list");
    return saved ? JSON.parse(saved) : INIT_SS_LIST;
  });
  useEffect(() => {
    localStorage.setItem("ti_ss_list", JSON.stringify(ssList));
  }, [ssList]);
  const [ssForms, setSsForms]             = useState(() => {
    const saved = localStorage.getItem("ti_ss_forms");
    return saved ? JSON.parse(saved) : {};
  });
  useEffect(() => {
    localStorage.setItem("ti_ss_forms", JSON.stringify(ssForms));
  }, [ssForms]);
  const [ssLocked, setSsLocked]           = useState({});
  const [activeSsId, setActiveSsId]       = useState(null);

  // Unified Assessments page sub-state
  const [assessRole, setAssessRole]       = useState(null); // "SM" | "SS" | "TM"

  const [repF, setRepF] = useState({ search: "", role: "All", station: "All", cat: "All", risk: "All" });
  const [repApplied, setRepApplied] = useState(false);

  useEffect(() => {
    if (activeSmId) {
      const smAssess = smList.find(s => s.id === activeSmId);
      if (smAssess && smAssess.examScore !== undefined) {
        setSmForms(prev => {
          const existing = prev[activeSmId];
          if (existing && existing.knowledgeMarks !== smAssess.examScore.toString()) {
            return {
              ...prev,
              [activeSmId]: {
                ...existing,
                knowledgeMarks: smAssess.examScore.toString()
              }
            };
          }
          return prev;
        });
      }
    }
  }, [smList, activeSmId]);

  // Reports Filters
  const [rpStation, setRpStation]         = useState("All");
  const [rpCat, setRpCat]                 = useState("All");
  const [rpRisk, setRpRisk]               = useState("All");
  const [rpSearch, setRpSearch]           = useState("");
  const [rpSort, setRpSort]               = useState("date-desc");

  // Inspections / Counselling forms
  const [showInspForm, setShowInspForm]   = useState(false);
  const [newInsp, setNewInsp]             = useState({ station: "Parbhani Junction", officer: "TI R. Khan", observations: "", risk: "Low" });
  const [showCounForm, setShowCounForm]   = useState(false);
  const [newCoun, setNewCoun]             = useState({ staffName: "", designation: "Pointsman Grade I", station: "Parbhani Junction", topics: "", duration: "30 mins", progress: "Under Monitor" });

  // Dashboard filtering & scroll toggle
  const [dbStationFilter, setDbStationFilter] = useState("All");
  const [dbSearchQuery, setDbSearchQuery] = useState("");

  const tiName = user?.name  || "R. Khan";
  const tiId   = user?.hrmsId || "TI_1001";

  const myStations = useMemo(() => {
    return stations.filter(st => !st.assignedTi || st.assignedTi === tiId);
  }, [stations, tiId]);

  const handleAddStationSubmit = (e) => {
    e.preventDefault();
    if (!newStationData.name.trim() || !newStationData.code.trim()) {
      setStatusMsg("Station name and code are required.");
      return;
    }
    const codeUpper = newStationData.code.trim().toUpperCase();
    if (stations.some(st => st.code.toUpperCase() === codeUpper)) {
      setStatusMsg(`Station with code ${codeUpper} already exists!`);
      return;
    }
    const newStation = {
      id: "ST_" + Date.now(),
      name: newStationData.name.trim(),
      code: codeUpper,
      avgScore: 80,
      safetyPct: 100,
      highRisk: 0,
      pointsmenCount: 0,
      assignedTi: tiId
    };
    setStations(prev => [...prev, newStation]);
    setShowAddStationModal(false);
    setNewStationData({ name: "", code: "" });
    setStatusMsg(`Station "${newStation.name}" successfully added under your jurisdiction.`);
    addAuditLog("Added New Station", `Station: ${newStation.name} (${newStation.code})`);
    triggerNotification("success", `Added Station: ${newStation.name} (${newStation.code})`);
  };

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
      setStatusMsg("Please fill out all required fields.");
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
      setStatusMsg(`User with Employee ID ${finalId} already exists!`);
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
    
    setStatusMsg(`Personnel "${newUser.name}" successfully added and rostered.`);
    addAuditLog("Added New User", `Staff: ${newUser.name} (${newUser.id})`);
    triggerNotification("success", `Added Staff: ${newUser.name} (${newUser.id})`);
  };

  const handleDeleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name} (${id})?`)) {
      setUsers(prev => prev.filter(u => u.id !== id));
      setStatusMsg(`User "${name}" successfully deleted.`);
      addAuditLog("Deleted User", `Staff: ${name} (${id})`);
      triggerNotification("warning", `Deleted Staff: ${name} (${id})`);
    }
  };

  const handleEditUser = (u) => {
    setEditingUser({ ...u });
  };

  const saveEditedUser = (e) => {
    if (e) e.preventDefault();
    if (!editingUser) return;
    setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
    setStatusMsg(`User "${editingUser.name}" details successfully updated.`);
    addAuditLog("Updated User Details", `Staff: ${editingUser.name} (${editingUser.id})`);
    triggerNotification("success", `Updated Staff: ${editingUser.name} (${editingUser.id})`);
  };

  const handleTransferClick = (u) => {
    setTransferringUser({ ...u, targetStation: u.station });
  };

  const confirmTransfer = () => {
    if (!transferringUser) return;
    const oldStation = transferringUser.station;
    const newStation = transferringUser.targetStation;
    setUsers(prev => prev.map(u => u.id === transferringUser.id ? { ...u, station: newStation } : u));
    setTransferringUser(null);
    setStatusMsg(`User "${transferringUser.name}" successfully transferred to ${newStation}.`);
    addAuditLog("Transferred Personnel", `Staff: ${transferringUser.name} (${transferringUser.id}) from ${oldStation} to ${newStation}`);
    triggerNotification("success", `Transferred Staff: ${transferringUser.name} to ${newStation}`);
  };

  const submitInspection = (e) => {
    e.preventDefault();
    const newRecord = {
      id: "IN_" + Date.now(),
      date: new Date().toISOString().slice(0, 10),
      station: newInsp.station,
      officer: newInsp.officer || `TI ${tiName}`,
      observations: newInsp.observations,
      risk: newInsp.risk,
      status: "Active"
    };
    setInspections(prev => [newRecord, ...prev]);
    addAuditLog("Logged Station Inspection", `Station: ${newInsp.station}, Risk: ${newInsp.risk}`);
    triggerNotification("warning", `NEW INSPECTION REPORT FILED: ${newInsp.station}`);
    setStatusMsg(`Inspection audit log successfully created for ${newInsp.station}.`);
    setNewInsp({ station: myStations[0]?.name || "Parbhani Junction", officer: `TI ${tiName}`, observations: "", risk: "Low" });
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
    addAuditLog("Logged Counselling Session", `Staff: ${newCoun.staffName}, Topics: ${newCoun.topics.slice(0, 25)}...`);
    triggerNotification("success", `Counselling session registered for ${newCoun.staffName}.`);
    setStatusMsg(`Staff safety counseling briefing registered for ${newCoun.staffName}.`);
    setNewCoun({ staffName: "", designation: "Pointsman Grade I", station: myStations[0]?.name || "Parbhani Junction", topics: "", duration: "30 mins", progress: "Under Monitor" });
    setShowCounForm(false);
  };

  // Trigger Notifications & Audit Logs Helper
  const triggerNotification = (type, message) => {
    setNotifications(prev => [{ id: Date.now(), type, message, time: "Just now", read: false }, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
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

  /* ── Derived calculations ── */
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

  const totalPM     = myUsers.filter(u => u.role === "Pointsman").length;
  const totalSMs    = myUsers.filter(u => u.role === "Station Master").length;
  const pending     = myPmList.filter(p=>p.status==="Pending").length;
  const highRiskAll = myUsers.filter(u => u.pmeStatus === "Overdue" || u.refStatus === "Expired" || u.score < 50).length;
  const avgScoreAll = Math.round(myUsers.reduce((s, u) => s + u.score, 0) / (myUsers.length || 1));

  // Station level scores derived dynamically from user database!
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

  const bestSt  = [...stationStats].sort((a,b)=>b.avgScore-a.avgScore)[0];
  const worstSt = [...stationStats].sort((a,b)=>a.avgScore-b.avgScore)[0];
  const highRiskSt = [...stationStats].sort((a,b)=>b.highRisk-a.highRisk)[0];

  const filteredStations = useMemo(() => {
    return stationStats.filter(st => {
      const matchesSearch = st.name.toLowerCase().includes(dbSearchQuery.toLowerCase()) || st.code.toLowerCase().includes(dbSearchQuery.toLowerCase());
      const matchesFilter = dbStationFilter === "All" || st.name === dbStationFilter;
      return matchesSearch && matchesFilter;
    });
  }, [stationStats, dbSearchQuery, dbStationFilter]);

  const stBarData = filteredStations.map(st=>({ name:st.code, nameFull: st.name, avgScore:st.avgScore, safetyPct:st.safetyPct, highRisk:st.highRisk }));

  const pieData = useMemo(()=>{
    const c = { A: 0, B: 0, C: 0, D: 0 };
    myUsers.filter(u => u.role === "Pointsman").forEach(u => {
      c[getCat(u.score)]++;
    });
    return Object.entries(c).map(([name,value])=>({name,value}));
  }, [myUsers]);

  const myStationsProgress = useMemo(() => {
    return myStations.map(st => {
      const pmCompleted = myPmList.filter(p => p.station === st.name && p.status === "Approved").length;
      const pmPending = myPmList.filter(p => p.station === st.name && p.status === "Pending").length;
      
      const smCompleted = mySmList.filter(s => s.station === st.name && (s.status === "Submitted" || s.status === "Approved")).length;
      const smPending = mySmList.filter(s => s.station === st.name && s.status === "Pending").length;
      
      const tmCompleted = myTmList.filter(t => t.station === st.name && (t.status === "Submitted" || t.status === "Approved")).length;
      const tmPending = myTmList.filter(t => t.station === st.name && t.status === "Pending").length;

      return {
        station: st.code,
        completed: pmCompleted + smCompleted + tmCompleted,
        pending: pmPending + smPending + tmPending
      };
    });
  }, [myStations, myPmList, mySmList, myTmList]);

  const roleBarData = useMemo(() => {
    const pmCount = myUsers.filter(u => u.role === "Pointsman").length;
    const smCount = myUsers.filter(u => u.role === "Station Master").length;
    const tmCount = myTmList.length;

    return [
      { role: "Pointsmen", count: pmCount },
      { role: "Station Masters", count: smCount },
      { role: "Train Managers", count: tmCount }
    ];
  }, [myUsers, myTmList]);

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

  // Fullscreen Derived Calculations
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
      name: st.code,
      nameFull: st.name,
      avgScore: st.avgScore,
      safetyPct: st.safetyPct,
      highRisk: st.highRisk
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
    filteredFsUsers.forEach(u => {
      c[getCat(u.score)]++;
    });
    return Object.entries(c).map(([name, value]) => ({ name, value }));
  }, [filteredFsUsers]);

  const filteredPM = useMemo(()=>{
    return pmList.filter(p=>{
      const st = p.status === reviewTab;
      const s  = !reviewSearch || p.pointsmanName.toLowerCase().includes(reviewSearch.toLowerCase()) || p.hrmsId.toLowerCase().includes(reviewSearch.toLowerCase());
      const r  = reviewStation==="All" || p.station===reviewStation;
      return st && s && r;
    });
  },[pmList,reviewTab,reviewSearch,reviewStation]);

  const selectedPM = pmList.find(p=>p.id===selectedPmId)||null;

  /* ── Role Roster filtering ── */
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

  const filteredReport = useMemo(()=>{
    let list = users.map(u => ({
      name: u.name,
      hrmsId: u.id,
      station: u.station,
      score: u.score,
      cat: u.cat || getCat(u.score),
      risk: u.pmeStatus === "Overdue" || u.refStatus === "Expired" || u.score < 50 ? "High" : u.score >= 80 ? "Low" : "Medium",
      date: u.lastAssessDate
    }));
    list = list.filter(r=>{
      const q = rpSearch.toLowerCase();
      const srch = !q||r.name.toLowerCase().includes(q)||r.station.toLowerCase().includes(q);
      const st   = rpStation==="All"||r.station===rpStation;
      const cat  = rpCat==="All"||r.cat===rpCat;
      const risk = rpRisk==="All"||r.risk===rpRisk;
      return srch&&st&&cat&&risk;
    });
    if (rpSort==="score-desc") list=[...list].sort((a,b)=>b.score-a.score);
    if (rpSort==="score-asc")  list=[...list].sort((a,b)=>a.score-b.score);
    return list;
  },[users,rpSearch,rpStation,rpCat,rpRisk,rpSort]);

  /* ── Navigation ── */
  const goTo = pg => {
    setActivePage(pg);
    setStatusMsg("");
    setSelectedPmId(null);
    setActiveSmId(null);
    setSelectedStation(null);
    setSelectedReportUserId(null);
    setRepApplied(false);
    setBellDropdownOpen(false);
  };

  useEffect(() => {
    if (selectedStation) {
      const st = selectedStation;
      const matched = stationStats.find(s => s.name === st.name || s.code === st.code) || st;
      
      const smCount = users.filter(u => u.station === matched.name && (u.role === "Station Master" || u.role === "sm")).length;
      const pmCount = users.filter(u => u.station === matched.name && (u.role === "Pointsman" || u.role === "pointsmen")).length;
      const pmPending = myPmList.filter(p => p.station === matched.name && p.status === "Pending").length;
      const smPending = mySmList.filter(s => s.station === matched.name && s.status === "Pending").length;
      const tmPending = myTmList.filter(t => t.station === matched.name && t.status === "Pending").length;
      const pending = pmPending + smPending + tmPending;
      
      setView({
        type: "stationDetail",
        data: {
          ...matched,
          ti: user.name || "TI R. Khan",
          smCount,
          pmCount,
          score: matched.avgScore || matched.score,
          safety: matched.safetyPct || matched.safety,
          highRisk: matched.highRisk,
          pending
        }
      });
    } else {
      setView(null);
    }
  }, [selectedStation, stationStats, users, myPmList, mySmList, myTmList, user]);

  const handleChartClick = (state, chartType) => {
    let clickedStationName = "";
    if (state && state.activeLabel) {
      const matched = stationStats.find(st => st.code === state.activeLabel);
      if (matched) {
        clickedStationName = matched.name;
      }
    }
    
    if (clickedStationName) {
      setZoomPopupSearch(clickedStationName);
      setSelectedChartType(chartType);
      setIsChartZoomModalOpen(true);
      setZoomPopupPage(1);
    } else {
      setSelectedChartType(chartType);
      setIsChartZoomModalOpen(true);
      setZoomPopupPage(1);
    }
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
  
  return {
    // Navigation & Page State
    activePage, setActivePage, goTo, statusMsg, setStatusMsg, view, setView,

    // TI Identity
    tiName, tiId,

    // Notifications
    bellDropdownOpen, setBellDropdownOpen, notifications, setNotifications, markAllNotificationsRead,

    // Constants needed by orchestrator
    NAV, MONTHLY,

    // Audit Logs
    auditLogs, setAuditLogs, addAuditLog, triggerNotification, exportAlert,

    // Core Data
    users, setUsers, stations, setStations, pmList, setPmList,
    smList, setSmList, tmList, setTmList,
    inspections, setInspections, counsellings, setCounsellings,

    // Derived Data (hook-level consts & useMemos)
    myStations, myUsers, myPmList, mySmList, myTmList,
    stationStats, stBarData, pieData,
    totalPM, totalSMs, pending, highRiskAll, avgScoreAll,
    bestSt, worstSt, highRiskSt,
    topStations, bottomStations,
    filteredStations, filteredFsStations, filteredFsUsers, filteredPM, filteredReport, filteredUsers,
    fsStBarData, fsPieData,
    myStationsProgress, roleBarData, myCompliance, myPipeline, myAssessmentMonthly,
    selectedPM,

    // Fullscreen Chart State
    fullscreenChart, setFullscreenChart,
    fsSearch, setFsSearch,
    fsCatFilter, setFsCatFilter,
    fsRiskFilter, setFsRiskFilter,

    // Chart Zoom Modal
    isChartZoomModalOpen, setIsChartZoomModalOpen,
    selectedChartType, setSelectedChartType,
    zoomPopupPage, setZoomPopupPage,
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
    handleChartClick, handlePieClick,

    // Station Modal
    showAddStationModal, setShowAddStationModal,
    newStationData, setNewStationData,
    handleAddStationSubmit,

    // User Modal
    showAddUserModal, setShowAddUserModal,
    newUserData, setNewUserData,
    openAddUserModal, handleAddUserSubmit,
    editingUser, setEditingUser,
    transferringUser, setTransferringUser,
    handleDeleteUser, handleEditUser, saveEditedUser, handleTransferClick, confirmTransfer,

    // Station Filter/Search
    stSearch, setStSearch, stCatFilter, setStCatFilter,
    selectedStation, setSelectedStation,
    dbStationFilter, setDbStationFilter,
    dbSearchQuery, setDbSearchQuery,

    // User Filter/Search
    userSearch, setUserSearch,
    userStationFilter, setUserStationFilter,
    userDesignationFilter, setUserDesignationFilter,
    userCategoryFilter, setUserCategoryFilter,
    userRiskFilter, setUserRiskFilter,

    // PM Review
    reviewTab, setReviewTab,
    reviewSearch, setReviewSearch,
    reviewStation, setReviewStation,
    selectedPmId, setSelectedPmId,
    editSections, setEditSections,
    tiRemarks, setTiRemarks,
    showAudit, setShowAudit,
    rejectMode, setRejectMode,

    // SM Assessment
    activeSmId, setActiveSmId,
    smForms, setSmForms,
    smLocked, setSmLocked,

    // TM Assessment
    activeTmId, setActiveTmId,
    tmForms, setTmForms,
    tmLocked, setTmLocked,

    // SS Assessment
    activeSsId, setActiveSsId,
    ssList, setSsList,
    ssForms, setSsForms,
    ssLocked, setSsLocked,

    // Unified Assessment Role
    assessRole, setAssessRole,

    // Self-Assessment / Quiz
    selectedRecord, setSelectedRecord,
    tiAssessments, setTiAssessments,
    quizState, setQuizState,
    currentQuestion, setCurrentQuestion,
    quizAnswers, setQuizAnswers,
    latestQuizScore, setLatestQuizScore,
    isExamAssigned, setIsExamAssigned,

    // Reports
    repF, setRepF,
    repApplied, setRepApplied,
    rpStation, setRpStation,
    rpCat, setRpCat,
    rpRisk, setRpRisk,
    rpSearch, setRpSearch,
    rpSort, setRpSort,
    selectedReportUserId, setSelectedReportUserId,

    // Inspections & Counselling
    showInspForm, setShowInspForm,
    newInsp, setNewInsp,
    showCounForm, setShowCounForm,
    newCoun, setNewCoun,
    submitInspection, submitCounselling,

    // SM/SS/TM Review lists
    selectedSM, setSelectedSM,
  };
}
