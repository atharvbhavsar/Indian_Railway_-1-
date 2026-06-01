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


export function TrafficInspectorProfile(props) {
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

  return (
    <div className="ti2-page-body animate-fade-in">
      <div className="ti2-card">
        <div className="ti2-card-hdr" style={{ marginBottom: 20 }}>
          <h2>My Profile</h2>
          <span className="ti2-pill-grey">View Only</span>
        </div>
        <div className="ti2-profile-hero">
          <div className="ti2-profile-avatar">{tiName.charAt(0)}</div>
          <div style={{ flex: 1 }}>
            <div className="ti2-profile-name">{tiName}</div>
            <div className="ti2-profile-role">{TI_PROFILE.designation} &nbsp;·&nbsp; {TI_PROFILE.jurisdiction}</div>
            <div className="ti2-pm-badges" style={{ marginTop: 12 }}>
              <span className="ti2-badge" style={{ background: CAT_B["A"], color: CAT_C["A"], fontSize: 12, padding: "4px 12px" }}>Category A</span>
              <span className="ti2-pill-grey" style={{ fontSize: 12 }}>ID: {tiId}</span>
            </div>
          </div>
          <div className="ti2-profile-snaps">
            <div><label>Compliance Score</label><strong style={{ color: CAT_C["A"], fontSize: 22 }}>88<span style={{ fontSize: 13, color: "#64748b" }}>/100</span></strong></div>
            <div><label>Category</label><strong style={{ color: CAT_C["A"], fontSize: 22 }}>Grade A</strong></div>
            <div><label>Medical Exam</label><strong style={{ fontSize: 13, color: "#16a34a" }}>FIT (PME)</strong></div>
          </div>
        </div>
      </div>

      <div className="ti2-card">
        <div className="ti2-profile-sec-title">Personal Details</div>
        <div className="ti2-profile-fields">
          <div className="ti2-profile-field"><span>Full Name</span><strong>{tiName}</strong></div>
          <div className="ti2-profile-field"><span>Employee ID / HRMS ID</span><strong>{tiId}</strong></div>
          <div className="ti2-profile-field"><span>Date of Birth</span><strong>{TI_PROFILE.dob}</strong></div>
          <div className="ti2-profile-field"><span>Date of Appointment</span><strong>{TI_PROFILE.doa}</strong></div>
          <div className="ti2-profile-field"><span>Designation &amp; Role</span><strong>{TI_PROFILE.designation}</strong></div>
          <div className="ti2-profile-field"><span>Contact Number</span><strong>+91 98900 12211</strong></div>
          <div className="ti2-profile-field"><span>Assigned Division</span><strong>{TI_PROFILE.jurisdiction}</strong></div>
        </div>
      </div>

      <div className="ti2-card">
        <div className="ti2-profile-sec-title">Health &amp; Training Compliance</div>
        <div className="ti2-profile-fields">
          <div className="ti2-profile-field"><span>PME Done Date</span><strong>{TI_PROFILE.pmeDoneDate}</strong></div>
          <div className="ti2-profile-field"><span>PME Due Date</span><strong>{TI_PROFILE.pmeDueDate}</strong></div>
          <div className="ti2-profile-field"><span>Isolator Certificate Issued Date</span><strong>{TI_PROFILE.isolatorCertDate}</strong></div>
          <div className="ti2-profile-field"><span>Automatic Training Date</span><strong>{TI_PROFILE.autoTrainingDate}</strong></div>
          <div className="ti2-profile-field"><span>Counselling Date</span><strong>{TI_PROFILE.counsellingDate}</strong></div>
          <div className="ti2-profile-field" style={{ gridColumn: "1/-1" }}>
            <span>Assigned Stations Under Section ({myStations.length})</span>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "8px" }}>
              {myStations.map(st => <span key={st.id} className="ti2-pill-grey" style={{ fontSize: "11px", fontWeight: "700" }}>{st.code} - {st.name}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════
     RENDER: STATIONS
     (Card grid layout + detailed clickable sub-view)
  ═══════════════════════════════════════════ */
}