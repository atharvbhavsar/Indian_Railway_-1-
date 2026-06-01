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


export function TrafficInspectorAddUserModal(props) {
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

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(15,23,42,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={handleAddUserSubmit} className="ti2-card" style={{ width: "480px", margin: "16px", display: "flex", flexDirection: "column", gap: "14px", border: "1px solid #cbd5e1", maxHeight: "90vh", overflowY: "auto" }}>
        <div className="ti2-card-hdr" style={{ marginBottom: 0 }}>
          <h3>Add New Railway Personnel</h3>
          <button type="button" onClick={() => setShowAddUserModal(false)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}>×</button>
        </div>

        <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
          Log new personnel under your jurisdiction. All sections (PME, REF, and stats) will update in real-time.
        </p>

        <div className="ti2-form-field">
          <label>Full Name <span style={{ color: "#dc2626" }}>*</span></label>
          <input 
            type="text" 
            value={newUserData.name} 
            onChange={e => setNewUserData({ ...newUserData, name: e.target.value })} 
            placeholder="e.g. Ramesh Kumar" 
            required 
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "10px" }}>
          <div className="ti2-form-field">
            <label>Staff HRMS ID <span style={{ color: "#dc2626" }}>*</span></label>
            <input 
              type="text" 
              value={newUserData.id} 
              onChange={e => setNewUserData({ ...newUserData, id: e.target.value })} 
              placeholder="e.g. 2405 (will auto-prepend)" 
              required 
            />
          </div>
          <div className="ti2-form-field">
            <label>Prefix Preview</label>
            <div style={{ padding: "9px 12px", border: "1.5px dashed #cbd5e1", background: "#f8fafc", borderRadius: "9px", fontSize: "13px", fontWeight: "700", textAlign: "center", color: "#2563eb", marginTop: "1px" }}>
              {newUserData.role === "Station Master" ? "SM_" : newUserData.role === "Station Superintendent" ? "SS_" : newUserData.role === "Train Manager" ? "TM_" : "PM_"}{newUserData.id.replace(/^SM_|^PM_|^SS_|^TM_/i, "")}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div className="ti2-form-field">
            <label>Role / Assignment <span style={{ color: "#dc2626" }}>*</span></label>
            <select 
              value={newUserData.role} 
              onChange={e => {
                const selectedRole = e.target.value;
                const defaultDesig = selectedRole === "Pointsman" ? "Pointsman Grade I" : selectedRole;
                setNewUserData({ ...newUserData, role: selectedRole, designation: defaultDesig });
              }} 
              required
            >
              <option value="Pointsman">Pointsman</option>
              <option value="Station Master">Station Master</option>
              <option value="Station Superintendent">Station Superintendent</option>
              <option value="Train Manager">Train Manager</option>
            </select>
          </div>

          {newUserData.role === "Pointsman" ? (
            <div className="ti2-form-field">
              <label>Designation <span style={{ color: "#dc2626" }}>*</span></label>
              <select 
                value={newUserData.designation} 
                onChange={e => setNewUserData({ ...newUserData, designation: e.target.value })} 
                required
              >
                <option value="Pointsman Grade I">Pointsman Grade I</option>
                <option value="Pointsman Grade II">Pointsman Grade II</option>
                <option value="Pointsman Grade III">Pointsman Grade III</option>
              </select>
            </div>
          ) : (
            <div className="ti2-form-field">
              <label>Designation</label>
              <input type="text" value={newUserData.designation || newUserData.role} disabled />
            </div>
          )}
        </div>

        <div className="ti2-form-field">
          <label>Assigned Station <span style={{ color: "#dc2626" }}>*</span></label>
          <select 
            value={newUserData.station} 
            onChange={e => setNewUserData({ ...newUserData, station: e.target.value })} 
            required
          >
            {myStations.map(st => (
              <option key={st.id} value={st.name}>{st.name} ({st.code})</option>
            ))}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div className="ti2-form-field">
            <label>Contact Mobile <span style={{ color: "#dc2626" }}>*</span></label>
            <input 
              type="text" 
              value={newUserData.contact} 
              onChange={e => setNewUserData({ ...newUserData, contact: e.target.value })} 
              placeholder="e.g. +91 98765 43210" 
              required 
            />
          </div>
          <div className="ti2-form-field">
            <label>Joining Date <span style={{ color: "#dc2626" }}>*</span></label>
            <input 
              type="date" 
              value={newUserData.joiningDate} 
              onChange={e => setNewUserData({ ...newUserData, joiningDate: e.target.value })} 
              required 
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div className="ti2-form-field">
            <label>PME Status</label>
            <select value={newUserData.pmeStatus} onChange={e => setNewUserData({ ...newUserData, pmeStatus: e.target.value })}>
              <option>Fit</option>
              <option>Unfit</option>
              <option>Overdue</option>
              <option>Pending</option>
            </select>
          </div>
          <div className="ti2-form-field">
            <label>REF Status</label>
            <select value={newUserData.refStatus} onChange={e => setNewUserData({ ...newUserData, refStatus: e.target.value })}>
              <option>Cleared</option>
              <option>Pending</option>
              <option>Expired</option>
            </select>
          </div>
        </div>

        {newUserData.role === "Pointsman" && (
          <>
            <div className="ti2-form-field">
              <label>Reporting Station Master <span style={{ color: "#dc2626" }}>*</span></label>
              <input 
                type="text" 
                value={newUserData.reportingSm || ""} 
                onChange={e => setNewUserData({ ...newUserData, reportingSm: e.target.value })} 
                placeholder="Station Master Name"
                required
              />
            </div>
            <div className="ti2-form-field">
              <label>Work Location Setup <span style={{ color: "#dc2626" }}>*</span></label>
              <select 
                value={newUserData.workLocation || ""} 
                onChange={e => setNewUserData({ ...newUserData, workLocation: e.target.value })}
                required
              >
                <option value="">Select Location</option>
                <option value="Yard">Yard Area</option>
                <option value="Cabin A">Cabin A</option>
                <option value="Cabin B">Cabin B</option>
                <option value="Platform Area">Platform Area</option>
                <option value="Level Crossing Gate">Level Crossing Gate</option>
              </select>
            </div>
            <div className="ti2-form-field">
              <label>Assigned Shift <span style={{ color: "#dc2626" }}>*</span></label>
              <select 
                value={newUserData.shift || ""} 
                onChange={e => setNewUserData({ ...newUserData, shift: e.target.value })}
                required
              >
                <option value="">Select Shift</option>
                <option value="Morning Shift (06:00 - 14:00)">Morning Shift (06:00 - 14:00)</option>
                <option value="Evening Shift (14:00 - 22:00)">Evening Shift (14:00 - 22:00)</option>
                <option value="Night Shift (22:00 - 06:00)">Night Shift (22:00 - 06:00)</option>
                <option value="General Shift (09:00 - 18:00)">General Shift (09:00 - 18:00)</option>
              </select>
            </div>
          </>
        )}

        {newUserData.role === "Train Manager" && (
          <>
            <div className="ti2-form-field">
              <label>Crew Depot <span style={{ color: "#dc2626" }}>*</span></label>
              <select 
                value={newUserData.workLocation || "Nagpur Depot"} 
                onChange={e => setNewUserData({ ...newUserData, workLocation: e.target.value })}
                required
              >
                <option value="Nagpur Depot">Nagpur Depot</option>
                <option value="Pune Depot">Pune Depot</option>
                <option value="Mumbai Depot">Mumbai Depot</option>
                <option value="Solapur Depot">Solapur Depot</option>
                <option value="Bhusawal Depot">Bhusawal Depot</option>
              </select>
            </div>
            <div className="ti2-form-field">
              <label>Assigned Section Beats <span style={{ color: "#dc2626" }}>*</span></label>
              <input 
                type="text" 
                value={newUserData.reportingSm || "NGP-BSL Section"} 
                onChange={e => setNewUserData({ ...newUserData, reportingSm: e.target.value })} 
                placeholder="E.g. NGP-BSL Section"
                required
              />
            </div>
            <div className="ti2-form-field">
              <label>Assigned Shift <span style={{ color: "#dc2626" }}>*</span></label>
              <select 
                value={newUserData.shift || "Goods Train Beat"} 
                onChange={e => setNewUserData({ ...newUserData, shift: e.target.value })}
                required
              >
                <option value="Mail/Express Beat">Mail/Express Beat</option>
                <option value="Passenger Beat">Passenger Beat</option>
                <option value="Goods Train Beat">Goods Train Beat</option>
              </select>
            </div>
          </>
        )}

        <div className="ti2-review-actions" style={{ marginTop: "12px" }}>
          <button type="button" className="ti2-ghost-btn" onClick={() => setShowAddUserModal(false)}>Cancel</button>
          <button type="submit" className="ti2-primary-btn">Save Personnel</button>
        </div>
      </form>
    </div>
  );
}