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

const getUserRisk = (u) => {
  return u.pmeStatus === "Overdue" || u.refStatus === "Expired" || u.score < 50 ? "High" : u.score >= 80 ? "Low" : "Medium";
};


export function TrafficInspectorChartZoomModal(props) {
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

  
    if (!isChartZoomModalOpen) return null;

    const filtered = stationStats.map(st => {
      const pmDone = myPmList.filter(p => p.station === st.name && p.status === "Approved").length;
      const smDone = mySmList.filter(s => s.station === st.name && (s.status === "Approved" || s.status === "Submitted")).length;
      const tmDone = myTmList.filter(t => t.station === st.name && (t.status === "Approved" || t.status === "Submitted")).length;
      const completed = pmDone + smDone + tmDone;

      const pmPending = myPmList.filter(p => p.station === st.name && p.status === "Pending").length;
      const smPending = mySmList.filter(s => s.station === st.name && s.status === "Pending").length;
      const tmPending = myTmList.filter(t => t.station === st.name && t.status === "Pending").length;
      const pending = pmPending + smPending + tmPending;

      const riskLevel = st.highRisk >= 2 ? "High" : st.highRisk > 0 ? "Medium" : "Low";
      const category = getCat(st.avgScore);

      return {
        ...st,
        stationName: st.name,
        stationCode: st.code,
        completed,
        pending,
        avgScore: st.avgScore,
        category,
        riskLevel,
        assessmentStatus: pending > 0 ? "Pending" : "Approved",
        lastUpdatedDate: st.lastUpdatedDate || "2026-05-28",
        zone: st.zone || "Central Railway",
        division: st.division || "Parbhani-Amla Section"
      };
    }).filter(st => {
      const q = zoomPopupSearch.trim().toLowerCase();
      const matchesSearch = !q || st.stationName.toLowerCase().includes(q) || st.stationCode.toLowerCase().includes(q);
      
      const matchesZone = zoomPopupZone === "All" || st.zone === zoomPopupZone;
      const matchesDivision = zoomPopupDivision === "All" || st.division === zoomPopupDivision;
      
      const matchesName = zoomPopupStationName === "All" || !zoomPopupStationName.trim() || st.stationName.toLowerCase().includes(zoomPopupStationName.toLowerCase());
      const matchesCode = zoomPopupStationCode === "All" || !zoomPopupStationCode.trim() || st.stationCode.toLowerCase().includes(zoomPopupStationCode.toLowerCase());
      
      const matchesCategory = zoomPopupCategory === "All" || st.category === zoomPopupCategory;
      const matchesRisk = zoomPopupRisk === "All" || st.riskLevel === zoomPopupRisk;
      const matchesStatus = zoomPopupStatus === "All" || st.assessmentStatus === zoomPopupStatus;

      let matchesDate = true;
      if (zoomPopupStartDate) {
        matchesDate = matchesDate && st.lastUpdatedDate >= zoomPopupStartDate;
      }
      if (zoomPopupEndDate) {
        matchesDate = matchesDate && st.lastUpdatedDate <= zoomPopupEndDate;
      }

      return matchesSearch && matchesZone && matchesDivision && matchesName && matchesCode && matchesCategory && matchesRisk && matchesStatus && matchesDate;
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
    const currentPage = Math.min(zoomPopupPage, totalPages);

    const paginated = filtered.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const modalChartData = paginated.map(st => ({
      station: st.stationCode,
      name: st.stationName,
      completed: st.completed,
      pending: st.pending,
      avgScore: st.avgScore
    }));

    const catA = paginated.filter(s => s.category === "A").length;
    const catB = paginated.filter(s => s.category === "B").length;
    const catC = paginated.filter(s => s.category === "C").length;
    const catD = paginated.filter(s => s.category === "D").length;
    const totalCount = catA + catB + catC + catD;

    const modalPieData = [
      { name: "Category A", value: catA, color: "#1E3A5F" },
      { name: "Category B", value: catB, color: "#2B6CB0" },
      { name: "Category C", value: catC, color: "#D69E2E" },
      { name: "Category D", value: catD, color: "#C53030" }
    ].filter(item => item.value > 0);

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

    return (
      <div 
        className="zoom-modal-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(8px)",
          zIndex: 9999,
          overflowY: "auto",
          display: "block",
          padding: 0,
          animation: "fadeIn 0.2s ease-out"
        }}
      >
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>
        <div 
          className="zoom-modal-container"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 0,
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "none",
            overflow: "visible",
            border: "none",
            animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          {/* Modal Header */}
          <div 
            style={{
              padding: "18px 24px",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f8fafc",
              position: "sticky",
              top: 0,
              zIndex: 100
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>
                {selectedChartType === "progress" 
                  ? "Station-wise Evaluation Progress" 
                  : selectedChartType === "score" 
                  ? "Station-wise Average Score" 
                  : "Category Distribution"}
              </h3>
              <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#64748b", fontWeight: "600" }}>
                Page {currentPage} of {totalPages} (Showing 10 stations per page out of {filtered.length} matching stations)
              </p>
            </div>
            
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                type="button"
                onClick={() => setIsChartZoomModalOpen(false)}
                style={{
                  background: "#fee2e2",
                  color: "#dc2626",
                  border: "1px solid #fecaca",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer"
                }}
              >
                Close Zoom View
              </button>
            </div>
          </div>

          {/* Modal Body Container */}
          <div style={{ flex: 1, padding: "24px", display: "flex", flexDirection: "column", gap: "20px", overflow: "visible" }}>
            
            {/* 1. FILTER CONTROLS GRID */}
            <div 
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "16px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <h4 style={{ margin: 0, fontSize: "12px", fontWeight: "700", color: "#334155", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Operational Search & Diagnostics Filters
                </h4>
                <button
                  type="button"
                  onClick={handleResetPopupFilters}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#2563eb",
                    fontSize: "12px",
                    fontWeight: "750",
                    cursor: "pointer",
                    textDecoration: "underline"
                  }}
                >
                  Reset Diagnostics Filters
                </button>
              </div>
              <div 
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "12px"
                }}
              >
                {/* Search */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Quick Search</label>
                  <input
                    type="text"
                    placeholder="Search name/code..."
                    value={zoomPopupSearch}
                    onChange={(e) => { setZoomPopupSearch(e.target.value); setZoomPopupPage(1); }}
                    style={{ width: "100%", padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                  />
                </div>

                {/* Zone */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Zone</label>
                  <select
                    value={zoomPopupZone}
                    onChange={(e) => { setZoomPopupZone(e.target.value); setZoomPopupPage(1); }}
                    style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", background: "#ffffff", color: "#334155" }}
                  >
                    <option value="All">All Zones</option>
                    <option value="Central Railway">Central Railway</option>
                  </select>
                </div>

                {/* Division */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Division/Section</label>
                  <select
                    value={zoomPopupDivision}
                    onChange={(e) => { setZoomPopupDivision(e.target.value); setZoomPopupPage(1); }}
                    style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", background: "#ffffff", color: "#334155" }}
                  >
                    <option value="All">All Sections</option>
                    <option value="Parbhani-Amla Section">Parbhani-Amla</option>
                  </select>
                </div>

                {/* Station Name */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Station Name</label>
                  <input
                    type="text"
                    placeholder="Filter by name..."
                    value={zoomPopupStationName === "All" ? "" : zoomPopupStationName}
                    onChange={(e) => { setZoomPopupStationName(e.target.value || "All"); setZoomPopupPage(1); }}
                    style={{ width: "100%", padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                  />
                </div>

                {/* Station Code */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Station Code</label>
                  <input
                    type="text"
                    placeholder="Filter by code..."
                    value={zoomPopupStationCode === "All" ? "" : zoomPopupStationCode}
                    onChange={(e) => { setZoomPopupStationCode(e.target.value || "All"); setZoomPopupPage(1); }}
                    style={{ width: "100%", padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                  />
                </div>

                {/* Category */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Category</label>
                  <select
                    value={zoomPopupCategory}
                    onChange={(e) => { setZoomPopupCategory(e.target.value); setZoomPopupPage(1); }}
                    style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", background: "#ffffff", color: "#334155" }}
                  >
                    <option value="All">All Categories</option>
                    <option value="A">Cat. A</option>
                    <option value="B">Cat. B</option>
                    <option value="C">Cat. C</option>
                    <option value="D">Cat. D</option>
                  </select>
                </div>

                {/* Risk Level */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Risk Level</label>
                  <select
                    value={zoomPopupRisk}
                    onChange={(e) => { setZoomPopupRisk(e.target.value); setZoomPopupPage(1); }}
                    style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", background: "#ffffff", color: "#334155" }}
                  >
                    <option value="All">All Risks</option>
                    <option value="Low">Low Risk</option>
                    <option value="Medium">Medium Risk</option>
                    <option value="High">High Risk</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Status</label>
                  <select
                    value={zoomPopupStatus}
                    onChange={(e) => { setZoomPopupStatus(e.target.value); setZoomPopupPage(1); }}
                    style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", background: "#ffffff", color: "#334155" }}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                {/* Date range start */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Start Date</label>
                  <input
                    type="date"
                    value={zoomPopupStartDate}
                    onChange={(e) => { setZoomPopupStartDate(e.target.value); setZoomPopupPage(1); }}
                    style={{ width: "100%", padding: "5px 8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", color: "#334155" }}
                  />
                </div>

                {/* Date range end */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>End Date</label>
                  <input
                    type="date"
                    value={zoomPopupEndDate}
                    onChange={(e) => { setZoomPopupEndDate(e.target.value); setZoomPopupPage(1); }}
                    style={{ width: "100%", padding: "5px 8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", color: "#334155" }}
                  />
                </div>
              </div>
            </div>

            {/* 2. DYNAMIC REAL-TIME CHART BOX */}
            <div 
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <h4 style={{ margin: 0, fontSize: "14px", fontWeight: "750", color: "#0f172a" }}>
                  {selectedChartType === "progress" 
                    ? "Evaluation Progress Trends (Completed vs Pending)" 
                    : selectedChartType === "score" 
                    ? "Average Safety Evaluation Scores (/100)" 
                    : "Category Distribution Breakdown"}
                </h4>
                <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>
                  Showing up to 10 stations on this page
                </span>
              </div>
              
              <div style={{ height: "260px", width: "100%" }}>
                {selectedChartType === "category" ? (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", gap: "60px" }}>
                    <div style={{ width: "220px", height: "220px" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={modalPieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={88}
                            dataKey="value"
                            label={({ name, value }) => `${name.replace("Category ", "")}: ${value}`}
                          >
                            {modalPieData.map((entry) => (
                              <Cell key={entry.name} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} Station(s)`, "Count"]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {modalPieData.map((item) => (
                        <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: "700", color: "#334155" }}>
                          <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: item.color }} />
                          <span>{item.name}:</span>
                          <span style={{ color: "#0f172a" }}>{item.value} Station(s) ({((item.value / (totalCount || 1)) * 100).toFixed(0)}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={modalChartData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                      barGap={6}
                    >
                      <XAxis
                        dataKey="station"
                        tick={{ fontSize: 10, fill: "#475569" }}
                        height={40}
                      />
                      <YAxis tick={{ fontSize: 10, fill: "#475569" }} domain={selectedChartType === "score" ? [0, 100] : undefined} />
                      <Tooltip 
                        contentStyle={{ background: "#0f172a", color: "#ffffff", borderRadius: "8px", border: "none", fontSize: "12px" }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
                      {selectedChartType === "progress" ? (
                        <>
                          <Bar dataKey="completed" fill="#0d2948" name="Completed Evaluations" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="pending" fill="#f5ae3f" name="Pending Evaluations" radius={[4, 4, 0, 0]} />
                        </>
                      ) : (
                        <Bar dataKey="avgScore" fill="#1f7a5c" name="Average Evaluation Score" radius={[4, 4, 0, 0]} />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* 3. DETAILED STATION DATA TABLE */}
            <div 
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155" }}>Station Name</th>
                    <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155" }}>Code</th>
                    <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155" }}>Section/Division</th>
                    <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155" }}>Zone</th>
                    <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155", textAlign: "right" }}>Completed</th>
                    <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155", textAlign: "right" }}>Pending</th>
                    <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155", textAlign: "right" }}>Avg. Score</th>
                    <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155", textAlign: "center" }}>Category</th>
                    <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155", textAlign: "center" }}>Risk Level</th>
                    <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155" }}>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan="10" style={{ padding: "32px", textAlign: "center", color: "#64748b" }}>
                        No stations matching the selected diagnostics criteria.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((st) => {
                      const riskColor = st.riskLevel === "High" ? "#ef4444" : st.riskLevel === "Medium" ? "#ea580c" : "#16a34a";
                      const riskBg = st.riskLevel === "High" ? "#fef2f2" : st.riskLevel === "Medium" ? "#fff7ed" : "#dcfce7";
                      const catBg = st.category === "A" ? "#eff6ff" : st.category === "B" ? "#f5f3ff" : st.category === "C" ? "#fffbeb" : "#fdf2f8";
                      const catColor = st.category === "A" ? "#1e40af" : st.category === "B" ? "#5b21b6" : st.category === "C" ? "#92400e" : "#9d174d";

                      return (
                        <tr key={st.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "12px 16px", fontWeight: "600", color: "#0f172a" }}>{st.stationName}</td>
                          <td style={{ padding: "12px 16px", fontWeight: "700", color: "#475569" }}>{st.stationCode}</td>
                          <td style={{ padding: "12px 16px", color: "#475569" }}>{st.division}</td>
                          <td style={{ padding: "12px 16px", color: "#475569" }}>{st.zone}</td>
                          <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "700", color: "#0d2948" }}>{st.completed}</td>
                          <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "700", color: "#f5ae3f" }}>{st.pending}</td>
                          <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "700", color: "#1f7a5c" }}>{st.avgScore}/100</td>
                          <td style={{ padding: "12px 16px", textAlign: "center" }}>
                            <span style={{ background: catBg, color: catColor, padding: "2px 8px", borderRadius: "4px", fontWeight: "700", fontSize: "11px" }}>
                              Cat {st.category}
                            </span>
                          </td>
                          <td style={{ padding: "12px 16px", textAlign: "center" }}>
                            <span style={{ background: riskBg, color: riskColor, padding: "3px 8px", borderRadius: "6px", fontWeight: "700", fontSize: "11px" }}>
                              {st.riskLevel}
                            </span>
                          </td>
                          <td style={{ padding: "12px 16px", color: "#64748b" }}>{st.lastUpdatedDate}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>

          {/* Modal Footer (SLIDER / TABS PAGINATION) */}
          <div 
            style={{
              padding: "16px 24px",
              borderTop: "1px solid #e2e8f0",
              background: "#f8fafc",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ fontSize: "13px", color: "#475569", fontWeight: "600" }}>
              Showing {filtered.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} stations
            </div>
            
            {/* Page tabs */}
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setZoomPopupPage(p => Math.max(p - 1, 1))}
                style={{
                  padding: "6px 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  background: "#ffffff",
                  color: "#334155",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: currentPage === 1 ? "default" : "pointer",
                  opacity: currentPage === 1 ? 0.5 : 1
                }}
              >
                Previous
              </button>

              <div style={{ display: "flex", gap: "4px" }}>
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  const active = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setZoomPopupPage(pageNum)}
                      style={{
                        padding: "6px 12px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        background: active ? "var(--brand-primary, #0B1F3A)" : "#ffffff",
                        color: active ? "#ffffff" : "#334155",
                        fontSize: "12px",
                        fontWeight: "700",
                        cursor: "pointer"
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setZoomPopupPage(p => Math.min(p + 1, totalPages))}
                style={{
                  padding: "6px 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  background: "#ffffff",
                  color: "#334155",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: currentPage === totalPages ? "default" : "pointer",
                  opacity: currentPage === totalPages ? 0.5 : 1
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ── User admin actions ── */
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
    setPmList(prev=>prev.map(p=>{
      if (p.id!==id) return p;
      const secs  = editSections[id]||p.originalSections;
      const total = secs.reduce((s,x)=>s+x.score,0);
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
    
    // Update target Pointsman's dynamic performance score in the main users database!
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
    const {total} = computeSMScore(f);
    
    const isAlcoholic = f.alcoholicStatus === "Alcoholic";
    const cat = isAlcoholic ? "D" : getCat(total);

    setSmList(prev=>prev.map(s=>s.id===id?{...s,status:"Submitted",score:total,category:cat}:s));
    setSmLocked(p=>({...p,[id]:true}));
    
    // Update Station Master's dynamic performance score in the main users database!
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
    const { total } = computeTMScore(f);

    const isAlcoholic = f.alcoholicStatus === "Alcoholic";
    const cat = isAlcoholic ? "D" : getCat(total);

    setTmList(prev => prev.map(t => t.id === id ? { ...t, status: "Submitted", score: total, category: cat } : t));
    setTmLocked(p => ({ ...p, [id]: true }));

    // Update Train Manager's dynamic performance score in the main users database!
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
    const { total } = computeSSScore(f);
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

  /* ── Self-Assessment Interactive Quiz ── */
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
    const finalScore = correctCount * 4; // 25 questions = 100 max
    setLatestQuizScore(finalScore);
    
    const getDomainScore = (startIdx, endIdx) => {
      let score = 0;
      for (let i = startIdx; i <= endIdx; i++) {
        if (quizAnswers[i] === TI_QUIZ[i].ans) score += 4;
      }
      return score;
    };

    // Add to assessment history in state
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

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     RENDER: DASHBOARD
     (Highly scrollable & optimized for 12 stations)
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */