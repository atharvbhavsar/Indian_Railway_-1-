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


export function TrafficInspectorCounselling(props) {
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <h2>Staff Counselling &amp; Behaviour Records</h2>
            <p className="ti2-subtitle" style={{ margin: "2px 0 0" }}>Brief high-risk pointsmen, log safety awareness counseling sessions, and track behaviour logs.</p>
          </div>
          <button className="ti2-primary-btn" onClick={() => setShowCounForm(!showCounForm)}>
            <Plus size={13}/> {showCounForm ? "Close Form" : "Log Counselling Briefing"}
          </button>
        </div>

        {showCounForm && (
          <form onSubmit={submitCounselling} className="ti2-assess-form" style={{ padding: "18px", border: "1px dashed #cbd5e1", borderRadius: "12px", background: "#f8fafc", marginBottom: "18px" }}>
            <div className="ti2-form-field">
              <label>Staff Roster Personnel</label>
              <select value={newCoun.staffName} onChange={e=>{
                const targetUser = users.find(u => u.name === e.target.value);
                setNewCoun({ ...newCoun, staffName: e.target.value, designation: targetUser?.designation || "Pointsman", station: targetUser?.station || "Parbhani Junction" });
              }} required>
                <option value="">Select staff member…</option>
                {users.map(u => <option key={u.id} value={u.name}>{u.name} ({u.designation} - {u.station})</option>)}
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div className="ti2-form-field">
                <label>Session Duration</label>
                <input type="text" value={newCoun.duration} onChange={e=>setNewCoun({...newCoun, duration: e.target.value})} placeholder="e.g. 45 mins" required/>
              </div>
              <div className="ti2-form-field">
                <label>Progress Status</label>
                <select value={newCoun.progress} onChange={e=>setNewCoun({...newCoun, progress: e.target.value})} required>
                  <option>Under Monitor</option>
                  <option>Completed</option>
                  <option>Recommended for REF</option>
                </select>
              </div>
            </div>

            <div className="ti2-form-field" style={{ gridColumn: "1/-1" }}>
              <label>Briefing Topics &amp; Counselling Notes</label>
              <textarea rows={3} value={newCoun.topics} onChange={e=>setNewCoun({...newCoun, topics: e.target.value})} placeholder="Focus topics: Alcoholic rehabilitation, safe shunting speeds, whistle codes compliance, alertness..." required/>
            </div>

            <div style={{ gridColumn: "1/-1", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button type="button" className="ti2-ghost-btn" onClick={() => setShowCounForm(false)}>Cancel</button>
              <button type="submit" className="ti2-primary-btn">Submit Counselling Brief</button>
            </div>
          </form>
        )}

        {/* Counselling list */}
        <div className="ti2-table-wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.4fr 1.2fr 2.5fr 1fr 1.2fr", padding: "10px 14px", background: "#f8fafc", borderBottom: "1.5px solid #e2e8f0", fontWeight: "700", fontSize: "11px" }}>
            <span>Counselling Date</span>
            <span>Staff Name</span>
            <span>Designation</span>
            <span>Focus Briefing Topics</span>
            <span>Duration</span>
            <span>Progress Status</span>
          </div>

          {counsellings.map(c => (
            <div key={c.id} style={{ display: "grid", gridTemplateColumns: "1.2fr 1.4fr 1.2fr 2.5fr 1fr 1.2fr", padding: "12px 14px", borderBottom: "1px solid #f1f5f9", fontSize: "13px", alignItems: "center" }}>
              <strong>{c.date}</strong>
              <strong>{c.staffName}</strong>
              <span><span className="ti2-pill-grey" style={{ fontSize: "10px", fontWeight: "700" }}>{c.designation}</span></span>
              <span>{c.topics}</span>
              <span>{c.duration}</span>
              <span><span className="ti2-badge" style={{ background: c.progress === "Completed" ? "#d1fae5" : "#fef3c7", color: c.progress === "Completed" ? "#065f46" : "#92400e" }}>{c.progress}</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── PM REVIEW ── */
}