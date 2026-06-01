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
import { getCat, getCatColor, getCatBg, riskLevel, riskColor } from '../../../utils/scoreCalculator';

// Any constants that are globally defined in TrafficInspectorModule
const RISK_C = { High: "#dc2626", Medium: "#d97706", Low: "#16a34a" };
const RISK_B = { High: "#fee2e2", Medium: "#fef3c7", Low: "#dcfce7" };
const CAT_C  = { A: "#16a34a", B: "#2563eb", C: "#d97706", D: "#dc2626" };
const CAT_B  = { A: "#dcfce7", B: "#dbeafe", C: "#fef3c7", D: "#fee2e2" };
const PIE_C  = ["#16a34a", "#2563eb", "#d97706", "#dc2626"];

const getCat = s => s >= 80 ? "A" : s >= 50 ? "B" : s >= 26 ? "C" : "D";

const catBadge = (cat) => (
  <span style={{ background: CAT_B[cat] || "#f1f5f9", color: CAT_C[cat] || "#334155", padding: "2px 8px", borderRadius: 4, fontWeight: 700, fontSize: 11 }}>
    Cat {cat}
  </span>
);
const riskBadge = (risk) => (
  <span style={{ background: RISK_B[risk] || "#f1f5f9", color: RISK_C[risk] || "#334155", padding: "2px 8px", borderRadius: 4, fontWeight: 700, fontSize: 11 }}>
    {risk} Risk
  </span>
);
const statusBadge = (status) => (
  <span style={{ background: "#f1f5f9", color: "#334155", padding: "2px 8px", borderRadius: 4, fontWeight: 600, fontSize: 11 }}>
    {status}
  </span>
);

const getUserRisk = (u) => {
  return u.pmeStatus === "Overdue" || u.refStatus === "Expired" || u.score < 50 ? "High" : u.score >= 80 ? "Low" : "Medium";
};


export function TrafficInspectorRoleView(props) {
  const {
    activePage,
    activeSmId,
    activeSsId,
    activeTmId,
    addAuditLog,
    approvedCount,
    assessRole,
    auditLogs,
    avg,
    avgScoreAll,
    bellDropdownOpen,
    bestSt,
    bottomStations,
    c,
    cat,
    catLetter,
    codeUpper,
    counsellings,
    current,
    currentQuestion,
    dbSearchQuery,
    dbStationFilter,
    editSections,
    editingUser,
    existing,
    exportAlert,
    filteredFsStations,
    filteredFsUsers,
    filteredPM,
    filteredReport,
    filteredStations,
    filteredUsers,
    fsCatFilter,
    fsPieData,
    fsRiskFilter,
    fsSearch,
    fsStBarData,
    fullscreenChart,
    goTo,
    grade,
    handleAddStationSubmit,
    handleAddUserSubmit,
    handleChartClick,
    handlePieClick,
    handleStorageChange,
    hasSS,
    highRiskAll,
    highRiskSt,
    initialList,
    inspections,
    interval,
    isChartZoomModalOpen,
    isExamAssigned,
    isHighRisk,
    isRoleMatch,
    latestQuizScore,
    matched,
    matchesCat,
    matchesCategory,
    matchesFilter,
    matchesRisk,
    matchesSearch,
    matchesStation,
    myAssessmentMonthly,
    myCompliance,
    myPipeline,
    myPmList,
    mySmList,
    myStations,
    myStationsProgress,
    myTmList,
    myUsers,
    newCoun,
    newInsp,
    newStation,
    newStationData,
    newUser,
    newUserData,
    notifications,
    openAddUserModal,
    overallSafetyPct,
    overdueCount,
    parsed,
    pending,
    pendingCount,
    pieData,
    pmCompleted,
    pmCount,
    pmList,
    pmPending,
    pmeCompletionRate,
    pmeFitCount,
    q,
    quizAnswers,
    quizState,
    r,
    refClearedCount,
    refCompletionRate,
    rejectMode,
    rejectedCount,
    repApplied,
    repF,
    reviewSearch,
    reviewStation,
    reviewTab,
    risk,
    riskCount,
    riskLevel,
    roleBarData,
    rpCat,
    rpRisk,
    rpSearch,
    rpSort,
    rpStation,
    s,
    saved,
    savedSmForms,
    savedSmList,
    savedStations,
    savedUsers,
    scale,
    selectedChartType,
    selectedPM,
    selectedPmId,
    selectedRecord,
    selectedReportUserId,
    selectedSM,
    selectedStation,
    setActivePage,
    setActiveSmId,
    setActiveSsId,
    setActiveTmId,
    setAssessRole,
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
    setIsChartZoomModalOpen,
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
    setRepApplied,
    setRepF,
    setReviewSearch,
    setReviewStation,
    setReviewTab,
    setRpCat,
    setRpRisk,
    setRpSearch,
    setRpSort,
    setRpStation,
    setSelectedChartType,
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
    setSsForms,
    setSsList,
    setSsLocked,
    setStCatFilter,
    setStSearch,
    setStations,
    setStatusMsg,
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
    setView,
    setZoomPopupCategory,
    setZoomPopupDivision,
    setZoomPopupEndDate,
    setZoomPopupPage,
    setZoomPopupRisk,
    setZoomPopupSearch,
    setZoomPopupStartDate,
    setZoomPopupStationCode,
    setZoomPopupStationName,
    setZoomPopupStatus,
    setZoomPopupZone,
    showAddStationModal,
    showAddUserModal,
    showAudit,
    showCounForm,
    showInspForm,
    smAssess,
    smCompleted,
    smCount,
    smForms,
    smList,
    smLocked,
    smPending,
    srch,
    ssForms,
    ssList,
    ssLocked,
    st,
    stBarData,
    stCatFilter,
    stSearch,
    stUsers,
    stationStats,
    stations,
    statusMsg,
    tiAssessments,
    tiId,
    tiName,
    tiRemarks,
    timestamp,
    tmCompleted,
    tmCount,
    tmForms,
    tmList,
    tmLocked,
    tmPending,
    topStations,
    totalPM,
    totalSMs,
    transferringUser,
    triggerNotification,
    updated,
    userCategoryFilter,
    userDesignationFilter,
    userRiskFilter,
    userSearch,
    userStationFilter,
    users,
    view,
    worstSt,
    zoomPopupCategory,
    zoomPopupDivision,
    zoomPopupEndDate,
    zoomPopupPage,
    zoomPopupRisk,
    zoomPopupSearch,
    zoomPopupStartDate,
    zoomPopupStationCode,
    zoomPopupStationName,
    zoomPopupStatus,
    zoomPopupZone,
    user,
    onLogout
  } = props;

  
    // If a profile detail is being viewed
    if (view?.type === "staffDetail") return renderStaffDetail(view.data);

    return (
      <div className="ti2-page-body animate-fade-in">
        <div className="sdom-fade">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <h1 className="sdom-page-title">{title} Management</h1>
              <p className="sdom-page-subtitle">Search, filter, and manage all {title.toLowerCase()}s under your Nagpur Division jurisdiction.</p>
            </div>
            <button className="sdom-btn-primary" onClick={() => openAddUserModal(roleKey)} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Plus size={16} /> Add New {title}
            </button>
          </div>

          {/* Filters - matching AOM/SuperAdmin style */}
          <div className="sdom-filter-bar" style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
            <div className="sdom-filter-field" style={{ minWidth: 200, flex: 1.5 }}>
              <label>Name / ID</label>
              <input value={userSearch} onChange={e => setUserSearch(e.target.value)} placeholder={`Search ${title.toLowerCase()} name or ID...`} />
            </div>
            <div className="sdom-filter-field" style={{ flex: 1 }}>
              <label>Station Location</label>
              <select value={userStationFilter} onChange={e => setUserStationFilter(e.target.value)}>
                <option value="All">All Stations</option>
                {myStations.map(st => <option key={st.id} value={st.name}>{st.name}</option>)}
              </select>
            </div>
            <div className="sdom-filter-field" style={{ flex: 1 }}>
              <label>Category Grade</label>
              <select value={userCategoryFilter} onChange={e => setUserCategoryFilter(e.target.value)}>
                <option value="All">All Grades</option>
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="C">Grade C</option>
                <option value="D">Grade D</option>
              </select>
            </div>
            <div className="sdom-filter-field" style={{ flex: 1 }}>
              <label>Risk Level</label>
              <select value={userRiskFilter} onChange={e => setUserRiskFilter(e.target.value)}>
                <option value="All">All Risks</option>
                <option value="High">High Risk Only</option>
                <option value="Non-High">Normal Compliance</option>
              </select>
            </div>
          </div>

          <div className="sdom-chart-card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontWeight: 700, color: "#1e293b" }}>{filteredUsers.length} {title.toLowerCase()}s found</span>
              <button className="sdom-btn-outline" onClick={() => exportAlert("Excel", `Section_${title.replace(/\s+/g, '_')}_List`)} style={{ padding: "6px 12px", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <FileSpreadsheet size={13}/> Export Ledger
              </button>
            </div>
            <div className="sdom-table-wrap">
              <table className="sdom-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>HRMS ID</th>
                    <th>Station Location</th>
                    <th>Division</th>
                    <th>Category</th>
                    <th>Risk</th>
                    <th>Last Score</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={9} style={{ textAlign: "center", padding: 32, color: "#94a3b8" }}>
                        No {title.toLowerCase()} records match your current filter selections.
                      </td>
                    </tr>
                  )}
                  {filteredUsers.map(s => {
                    const grade = getCat(s.score);
                    const computedRisk = getUserRisk(s);
                    const computedStatus = s.pmeStatus === "Unfit" ? "Rejected" : s.refStatus === "Expired" ? "Pending" : "Approved";
                    
                    return (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 700 }}>{s.name}</td>
                        <td style={{ color: "#64748b", fontFamily: "monospace", fontSize: "0.85rem" }}>{s.id}</td>
                        <td style={{ fontWeight: "600" }}>{s.station}</td>
                        <td>Nagpur Division</td>
                        <td>{catBadge(grade)}</td>
                        <td>{riskBadge(computedRisk)}</td>
                        <td style={{ fontWeight: 700 }}>{s.score}%</td>
                        <td>{statusBadge(computedStatus)}</td>
                        <td>
                          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", alignItems: "center" }}>
                            <button className="sdom-btn-outline" style={{ padding: "4px 8px", fontSize: "0.8rem" }}
                              onClick={() => setView({ type: "staffDetail", data: s, returnTo: activePage })}>
                              View
                            </button>
                            <button className="ti2-view-profile-btn" onClick={() => handleEditUser(s)} style={{ padding: "6px 8px" }} title={`Edit ${title}`}>
                              <Edit size={11}/>
                            </button>
                            <button className="ti2-link-btn-sm" onClick={() => handleTransferClick(s)} style={{ padding: "6px 8px" }} title="Transfer Station">
                              <RefreshCw size={11}/>
                            </button>
                            <button className="ti2-danger-btn" onClick={() => handleDeleteUser(s.id, s.name)} style={{ padding: "6px 8px" }} title="Remove Record">
                              <Trash2 size={11}/>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modals rendered inside the page for visual safety */}
        {editingUser && renderEditUserModal()}
        {transferringUser && renderTransferUserModal()}
        {showAddUserModal && renderAddUserModal()}
      </div>
    );
  };

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     RENDER: MY ASSESSMENTS PAGE
     (Interactive Quiz + timeline scorecard history)
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */