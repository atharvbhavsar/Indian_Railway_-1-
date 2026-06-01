import React from 'react';
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
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList
} from "recharts";

const RISK_C = { High: "#dc2626", Medium: "#d97706", Low: "#16a34a" };
const RISK_B = { High: "#fee2e2", Medium: "#fef3c7", Low: "#dcfce7" };
const CAT_C  = { A: "#16a34a", B: "#2563eb", C: "#d97706", D: "#dc2626" };
const CAT_B  = { A: "#dcfce7", B: "#dbeafe", C: "#fef3c7", D: "#fee2e2" };
const PIE_C  = ["#16a34a", "#2563eb", "#d97706", "#dc2626"];

const getUserRisk = (u) => {
  return u.pmeStatus === "Overdue" || u.refStatus === "Expired" || u.score < 50 ? "High" : u.score >= 80 ? "Low" : "Medium";
};
const getCat = s => s >= 80 ? "A" : s >= 50 ? "B" : s >= 26 ? "C" : "D";


export function TrafficInspectorPmePosition(props) {
  const {
    activePage,
    activeSmId,
    activeTmId,
    addAuditLog,
    arr,
    audit,
    auditLogs,
    avg,
    avgScoreAll,
    bellDropdownOpen,
    bestSt,
    c,
    cat,
    codeUpper,
    confirmTransfer,
    counsellings,
    current,
    currentQuestion,
    dbSearchQuery,
    dbStationFilter,
    editSections,
    editingUser,
    existing,
    exportAlert,
    f,
    filteredFsStations,
    filteredFsUsers,
    filteredPM,
    filteredReport,
    filteredStations,
    filteredUsers,
    finalScore,
    finalSecs,
    finalSum,
    finalizePM,
    fsCatFilter,
    fsPieData,
    fsRiskFilter,
    fsSearch,
    fsStBarData,
    fullscreenChart,
    getDomainScore,
    goTo,
    grade,
    handleAddStationSubmit,
    handleAddUserSubmit,
    handleDeleteUser,
    handleEditUser,
    handleSelectQuizOpt,
    handleSendExamAccess,
    handleSendTMExamAccess,
    handleStorageChange,
    handleTransferClick,
    highRiskAll,
    highRiskSt,
    inspections,
    interval,
    isAlcoholic,
    isExamAssigned,
    isHighRisk,
    latestQuizScore,
    markAllNotificationsRead,
    matchesCat,
    matchesCategory,
    matchesDesignation,
    matchesFilter,
    matchesRisk,
    matchesSearch,
    matchesStation,
    modified,
    myStations,
    newCoun,
    newInsp,
    newRecord,
    newStation,
    newStationData,
    newUser,
    newUserData,
    next,
    notifications,
    openAddUserModal,
    openPmReview,
    openSMForm,
    openTMForm,
    parsed,
    pending,
    pieData,
    pmList,
    q,
    quizAnswers,
    quizState,
    r,
    rec,
    rejectMode,
    reviewSearch,
    reviewStation,
    reviewTab,
    risk,
    riskCount,
    riskLevel,
    rpCat,
    rpRisk,
    rpSearch,
    rpSort,
    rpStation,
    s,
    saveEditedUser,
    saved,
    savedSmForms,
    savedSmList,
    savedStations,
    savedUsers,
    secs,
    selectedPM,
    selectedPmId,
    selectedRecord,
    selectedReportUserId,
    selectedSM,
    selectedStation,
    setActivePage,
    setActiveSmId,
    setActiveTmId,
    setAuditLogs,
    setBellDropdownOpen,
    setCounsellings,
    setCurrentQuestion,
    setDbSearchQuery,
    setDbStationFilter,
    setEditSections,
    setEditingUser,
    setFsCatFilter,
    setFsRiskFilter,
    setFsSearch,
    setFullscreenChart,
    setInspections,
    setIsExamAssigned,
    setLatestQuizScore,
    setNewCoun,
    setNewInsp,
    setNewStationData,
    setNewUserData,
    setNotifications,
    setPmList,
    setQuizAnswers,
    setQuizState,
    setRejectMode,
    setReviewSearch,
    setReviewStation,
    setReviewTab,
    setRpCat,
    setRpRisk,
    setRpSearch,
    setRpSort,
    setRpStation,
    setSMField,
    setSelectedPmId,
    setSelectedRecord,
    setSelectedReportUserId,
    setSelectedSM,
    setSelectedStation,
    setShowAddStationModal,
    setShowAddUserModal,
    setShowAudit,
    setShowCounForm,
    setShowInspForm,
    setSmForms,
    setSmList,
    setSmLocked,
    setStCatFilter,
    setStSearch,
    setStations,
    setStatusMsg,
    setTMField,
    setTiAssessments,
    setTiRemarks,
    setTmForms,
    setTmList,
    setTmLocked,
    setTransferringUser,
    setUserCategoryFilter,
    setUserDesignationFilter,
    setUserRiskFilter,
    setUserSearch,
    setUserStationFilter,
    setUsers,
    showAddStationModal,
    showAddUserModal,
    showAudit,
    showCounForm,
    showInspForm,
    smAssess,
    smForms,
    smList,
    smLocked,
    srch,
    st,
    stBarData,
    stCatFilter,
    stSearch,
    stUsers,
    startQuiz,
    stationStats,
    stations,
    statusMsg,
    submitCounselling,
    submitInspection,
    submitQuiz,
    submitSMAssessment,
    submitTMAssessment,
    targetAssess,
    tiAssessments,
    tiId,
    tiName,
    tiRemarks,
    timestamp,
    tmAssess,
    tmForms,
    tmList,
    tmLocked,
    today,
    toggleSMYN,
    toggleTMYN,
    total,
    totalPM,
    totalSMs,
    transferringUser,
    triggerNotification,
    updateSec,
    updated,
    userCategoryFilter,
    userDesignationFilter,
    userRiskFilter,
    userSearch,
    userStationFilter,
    users,
    worstSt,
    user,
    onLogout
  } = props;

  
    const due = users.filter(u => u.pmeStatus === "Due" || u.pmeStatus === "Pending");
    const fit = users.filter(u => u.pmeStatus === "Fit");
    const overdue = users.filter(u => u.pmeStatus === "Overdue" || u.pmeStatus === "Unfit");
    
    return (
      <div className="ti2-page-body animate-fade-in">
        <div className="ti2-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2>Periodic Medical Examination (PME) Position</h2>
              <p className="ti2-subtitle" style={{ margin: "2px 0 0" }}>Track periodic medical exam clearances, overdue alerts, and compliance targets.</p>
            </div>
            <button className="ti2-view-profile-btn" onClick={() => exportAlert("PDF", "Section_PME_Compliance_Report")}>
              <Download size={13}/> PME Report
            </button>
          </div>

          <div className="ti2-myassess-summary" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div className="ti2-report-mini" style={{ borderLeft: "4px solid #16a34a" }}><label>PME FIT Clearance</label><strong style={{ color: "#16a34a" }}>{fit.length} staff</strong></div>
            <div className="ti2-report-mini" style={{ borderLeft: "4px solid #d97706" }}><label>PME Due / Pending</label><strong style={{ color: "#d97706" }}>{due.length} staff</strong></div>
            <div className="ti2-report-mini" style={{ borderLeft: "4px solid #dc2626" }}><label>PME Overdue (High Risk)</label><strong style={{ color: "#dc2626" }}>{overdue.length} alerts</strong></div>
          </div>

          <div className="ti2-profile-sec-title" style={{ color: "#dc2626" }}>CRITICAL PME OVERDUE ALERTS ({overdue.length})</div>
          <div className="ti2-table-wrap">
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1.5fr 1fr 1.2fr", padding: "10px 14px", background: "#fee2e2", color: "#991b1b", fontWeight: "700", fontSize: "11px" }}>
              <span>Staff Name</span>
              <span>HRMS ID</span>
              <span>Designation</span>
              <span>Assigned Station</span>
              <span>PME Status</span>
              <span>Action Taken</span>
            </div>
            {overdue.map(u => (
              <div key={u.id} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1.5fr 1fr 1.2fr", padding: "12px 14px", borderBottom: "1px solid #fecdd3", fontSize: "13px", alignItems: "center" }}>
                <strong>{u.name}</strong>
                <span style={{ fontFamily: "monospace" }}>{u.id}</span>
                <span>{u.designation}</span>
                <strong>{u.station}</strong>
                <span style={{ color: "#dc2626", fontWeight: "800" }}>{u.pmeStatus}</span>
                <span><button className="ti2-danger-btn" style={{ padding: "4px 10px", fontSize: "11px" }} onClick={() => { triggerNotification("warning", `Counselling scheduled for ${u.name}`); setGoToCounselling(u.name); }}>Schedule Counselling</button></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const setGoToCounselling = (name) => {
    setNewCoun(prev => ({ ...prev, staffName: name, topics: "PME evaluation preparation and rest compliance briefings." }));
    goTo("counselling");
    setShowCounForm(true);
  };

  /* ═══════════════════════════════════════════
     RENDER: REF POSITION PAGE
  ═══════════════════════════════════════════ */