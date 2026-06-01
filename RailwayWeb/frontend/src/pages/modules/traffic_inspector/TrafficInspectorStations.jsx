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


export function TrafficInspectorStations(props) {
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

  
    if (selectedStation) {
      const st = selectedStation;
      const stUsers = users.filter(u => u.station === st.name);
      const stSms = stUsers.filter(u => u.role === "Station Master");
      const stPms = stUsers.filter(u => u.role === "Pointsman");
      const stInsps = inspections.filter(i => i.station === st.name);
      const riskLevel = st.highRisk >= 2 ? "High" : st.highRisk > 0 ? "Medium" : "Low";

      return (
        <div className="ti2-page-body animate-fade-in">
          <div className="ti2-card">
            <div className="ti2-card-hdr">
              <div>
                <h2>{st.name} ({st.code}) Detailed Analytics</h2>
                <p className="ti2-subtitle" style={{ margin: "2px 0 0" }}>Operational safety compliance, PME/REF audits, and rosters under jurisdiction.</p>
              </div>
              <button className="ti2-link-btn" onClick={() => setSelectedStation(null)}>← Back to Stations</button>
            </div>

            <div className="ti2-profile-hero" style={{ padding: "16px", background: "#f8fafc", borderRadius: "12px", border: "1.5px dashed #cbd5e1" }}>
              <div className="ti2-station-code" style={{ width: "54px", height: "54px", fontSize: "13px" }}>{st.code}</div>
              <div style={{ flex: 1 }}>
                <div className="ti2-profile-name">{st.name}</div>
                <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                  <span className="ti2-badge" style={{ background: RISK_B[riskLevel], color: RISK_C[riskLevel] }}>{riskLevel} Risk Level</span>
                  <span className="ti2-pill-grey">Safety Compliance Score: <strong>{st.safetyPct}%</strong></span>
                </div>
              </div>
              <div className="ti2-profile-snaps">
                <div><label>Station Masters</label><strong>{stSms.length}</strong></div>
                <div><label>Total Pointsmen</label><strong>{stPms.length}</strong></div>
                <div><label>Station Avg Score</label><strong style={{ color: "#2563eb" }}>{st.avgScore}%</strong></div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginTop: "20px" }}>
              <div>
                <div className="ti2-profile-sec-title">Station Master Roster</div>
                <div className="ti2-sm-table-wrap">
                  {stSms.map(sm => (
                    <div key={sm.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#fff", borderBottom: "1px solid #f1f5f9" }}>
                      <div>
                        <strong>{sm.name}</strong>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>ID: {sm.id} · PME: {sm.pmeStatus}</div>
                      </div>
                      <span className="ti2-badge" style={{ background: CAT_B[sm.cat], color: CAT_C[sm.cat] }}>Grade {sm.cat} ({sm.score}%)</span>
                    </div>
                  ))}
                  {stSms.length === 0 && <p className="ti2-empty">No Station Masters logged in this station roster.</p>}
                </div>
              </div>

              <div>
                <div className="ti2-profile-sec-title">Pointsmen Roster</div>
                <div className="ti2-sm-table-wrap">
                  {stPms.map(pm => (
                    <div key={pm.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#fff", borderBottom: "1px solid #f1f5f9" }}>
                      <div>
                        <strong>{pm.name}</strong>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>ID: {pm.id} · REF: {pm.refStatus}</div>
                      </div>
                      <span className="ti2-badge" style={{ background: CAT_B[pm.cat], color: CAT_C[pm.cat] }}>Grade {pm.cat} ({pm.score}%)</span>
                    </div>
                  ))}
                  {stPms.length === 0 && <p className="ti2-empty">No Pointsmen logged in this station roster.</p>}
                </div>
              </div>
            </div>

            {/* Inspection logs for this station */}
            <div style={{ marginTop: "24px" }}>
              <div className="ti2-profile-sec-title">Field Safety Inspections Ledger ({stInsps.length})</div>
              <div className="ti2-table-wrap">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr", padding: "10px 14px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontWeight: "700", fontSize: "11px" }}>
                  <span>Date</span>
                  <span>Safety Observations</span>
                  <span>Risk Class</span>
                  <span>Audit Status</span>
                </div>
                {stInsps.map(insp => (
                  <div key={insp.id} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr", padding: "10px 14px", borderBottom: "1px solid #f1f5f9", fontSize: "12px", alignItems: "center" }}>
                    <strong>{insp.date}</strong>
                    <span>{insp.observations}</span>
                    <span><span className="ti2-badge" style={{ background: RISK_B[insp.risk], color: RISK_C[insp.risk] }}>{insp.risk}</span></span>
                    <span><span className="ti2-pill-grey">{insp.status}</span></span>
                  </div>
                ))}
                {stInsps.length === 0 && <p className="ti2-empty">No safety inspections recorded for this station yet.</p>}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="ti2-page-body animate-fade-in">
        <div className="ti2-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <h2>Stations Database &amp; Audit Logs</h2>
              <p className="ti2-subtitle" style={{ margin: "2px 0 0" }}>Audit evaluations, safety rosters, and risk classifications of all {myStations.length} stations.</p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button className="ti2-primary-btn" onClick={() => setShowAddStationModal(true)} style={{ height: "36px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Plus size={13}/> Add Station
              </button>
              <button className="ti2-view-profile-btn" onClick={() => exportAlert("PDF", `${myStations.length}_Stations_Roster_Master`)} style={{ height: "36px" }}>
                <Download size={13}/> Export PDF Report
              </button>
            </div>
          </div>

          <div className="ti2-filter-row">
            <div className="ti2-search-box">
              <Search size={13}/><input placeholder="Search station name / code…" value={stSearch} onChange={e=>setStSearch(e.target.value)}/>
            </div>
            <select className="ti2-select" value={stCatFilter} onChange={e=>setStCatFilter(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="A">Grade A Stations</option>
              <option value="B">Grade B Stations</option>
              <option value="C">Grade C Stations</option>
            </select>
          </div>

          {/* 12 Station List - Table layout */}
          <div className="ti2-table-wrap" style={{ marginTop: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr 1.5fr 2fr 1.5fr 1.5fr 1.8fr", gap: "8px", padding: "10px 16px", background: "#f8fafc", borderBottom: "1.5px solid #e2e8f0", fontWeight: "700", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4px" }}>
              <span>Code</span>
              <span>Station Name</span>
              <span>Compliance Score</span>
              <span>Avg Score Grade</span>
              <span>Total Staff</span>
              <span>Risk Level</span>
              <span>Action</span>
            </div>

            {stationStats.filter(st => {
              const q = stSearch.toLowerCase();
              const matchesSearch = !q || st.name.toLowerCase().includes(q) || st.code.toLowerCase().includes(q);
              const matchesCat = stCatFilter === "All" || getCat(st.avgScore) === stCatFilter;
              return matchesSearch && matchesCat;
            }).map(st => {
              const riskLevel = st.highRisk >= 2 ? "High" : st.highRisk > 0 ? "Medium" : "Low";
              const grade = getCat(st.avgScore);
              return (
                <div key={st.id} style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr 1.5fr 2fr 1.5fr 1.5fr 1.8fr", gap: "8px", padding: "12px 16px", borderBottom: "1px solid #f1f5f9", fontSize: "13px", alignItems: "center" }}>
                  <span style={{ fontFamily: "monospace", fontWeight: "700" }}>{st.code}</span>
                  <strong>{st.name}</strong>
                  <strong style={{ color: st.safetyPct >= 80 ? "#16a34a" : "#d97706" }}>{st.safetyPct}%</strong>
                  <span style={{ color: CAT_C[grade], fontWeight: "700" }}>Grade {grade} ({st.avgScore}%)</span>
                  <span>{users.filter(u => u.station === st.name).length} personnel</span>
                  <span><span className="ti2-badge" style={{ background: RISK_B[riskLevel], color: RISK_C[riskLevel] }}>{riskLevel} Risk</span></span>
                  <button className="ti2-primary-btn-sm" onClick={() => setSelectedStation(st)} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", padding: "6px 12px", width: "fit-content" }}>
                    <Eye size={12}/> View Analytics
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* Add Station Modal */}
          {showAddStationModal && (
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(15,23,42,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <form onSubmit={handleAddStationSubmit} className="ti2-card" style={{ width: "450px", margin: "16px", display: "flex", flexDirection: "column", gap: "14px", border: "1px solid #cbd5e1" }}>
                <div className="ti2-card-hdr" style={{ marginBottom: 0 }}>
                  <h3>Add New Station</h3>
                  <button type="button" onClick={() => setShowAddStationModal(false)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}>×</button>
                </div>

                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  Add a new station under your jurisdiction. This station will be associated with your TI account and will not be visible to other Traffic Inspectors.
                </p>

                <div className="ti2-form-field">
                  <label>Station Name <span style={{ color: "#dc2626" }}>*</span></label>
                  <input 
                    type="text" 
                    value={newStationData.name} 
                    onChange={e => setNewStationData({ ...newStationData, name: e.target.value })} 
                    placeholder="e.g. Jalna Junction" 
                    required 
                  />
                </div>
                
                <div className="ti2-form-field">
                  <label>Station Code <span style={{ color: "#dc2626" }}>*</span></label>
                  <input 
                    type="text" 
                    value={newStationData.code} 
                    onChange={e => setNewStationData({ ...newStationData, code: e.target.value })} 
                    placeholder="e.g. J or JALNA" 
                    required 
                  />
                </div>

                <div className="ti2-review-actions" style={{ marginTop: "10px" }}>
                  <button type="button" className="ti2-ghost-btn" onClick={() => setShowAddStationModal(false)}>Cancel</button>
                  <button type="submit" className="ti2-primary-btn">Add Station</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════
     RENDER: ALL USERS PAGE
     (Editable details, Transfers, search/filters)
  ═══════════════════════════════════════════ */