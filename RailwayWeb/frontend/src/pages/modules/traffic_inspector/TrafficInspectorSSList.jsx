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


export function TrafficInspectorSSList(props) {
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
      <div className="ti2-card animate-fade-in">
        <div className="ti2-card-hdr">
          <div>
            <h2>Assessments — Station Superintendents</h2>
            <p className="ti2-subtitle" style={{margin:"4px 0 0"}}>Station Superintendents pending assessment are listed below. Open the form to conduct a structured evaluation.</p>
          </div>
          <button className="ti2-link-btn" onClick={() => setAssessRole(null)}>â† Back to Roles</button>
        </div>
        <div className="ti2-table-wrap" style={{marginTop:"16px"}}>
          <div className="ti2-pm-head" style={{display:"grid",gridTemplateColumns:"1.8fr 1fr 1.5fr 1.2fr 1fr 1.3fr 2.5fr",gap:"12px",alignItems:"center",padding:"12px 18px",background:"#f8fafc",borderBottom:"1.5px solid #e2edf8",fontSize:"12px",fontWeight:"800",color:"#475569",textTransform:"uppercase",letterSpacing:"0.5px"}}>
            <span>Superintendent</span><span>HRMS ID</span><span>Station</span><span>Last Assessed</span><span>Score</span><span>Exam Status</span><span style={{textAlign:"right",paddingRight:"10px"}}>Action</span>
          </div>
          {ssList.map(s => (
            <div key={s.id} className="ti2-pm-data-row" style={{display:"grid",gridTemplateColumns:"1.8fr 1fr 1.5fr 1.2fr 1fr 1.3fr 2.5fr",gap:"12px",alignItems:"center",padding:"14px 18px",borderBottom:"1px solid #f1f5f9",background:"#ffffff"}}>
              <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                <div className="ti2-pm-avatar" style={{width:32,height:32,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>{s.name.charAt(0)}</div>
                <strong style={{color:"#0f172a",fontSize:"13px"}}>{s.name}</strong>
              </div>
              <span style={{fontSize:"13px",color:"#475569",fontWeight:"600"}}>{s.hrmsId}</span>
              <span style={{fontSize:"13px",color:"#475569"}}>{s.station}</span>
              <span style={{fontSize:"12px",color:"#64748b"}}>{s.lastDate}</span>
              <span style={{fontSize:"13px",fontWeight:"800",color:"#0f172a"}}>{s.score ? `${s.score}/100` : "—"}</span>
              <div><span className={`ti2-status-pill ti2-status-${s.status.toLowerCase().replace(/\s+/g,"-")}`} style={{...getStatusStyle(s.status),padding:"4px 10px",fontSize:"11px",fontWeight:"700"}}>{s.status}</span></div>
              <div style={{display:"flex",gap:"8px",alignItems:"center",justifyContent:"flex-end"}}>
                {s.status === "Pending" && (<>
                  <button className="ti2-primary-btn-sm" style={{background:"#7c3aed",border:"none",color:"#fff",padding:"6px 12px",borderRadius:"8px",cursor:"pointer",fontWeight:"700",fontSize:"12px"}} onClick={()=>handleSendSSExamAccess(s.id)}>Send Access</button>
                  <button className="ti2-primary-btn-sm" style={{background:"none",border:"1.5px solid #cbd5e1",color:"#475569",padding:"5px 12px",borderRadius:"8px",cursor:"pointer",fontWeight:"700",fontSize:"12px"}} onClick={()=>openSSForm(s.id)}>Open Form</button>
                </>)}
                {s.status === "Exam Sent" && (<>
                  <span style={{fontSize:"11px",color:"#6b21a8",fontWeight:"800",background:"#f3e8ff",padding:"6px 10px",borderRadius:"8px",display:"flex",alignItems:"center",gap:"4px"}}><Clock size={12}/> Waiting for SS...</span>
                  <button className="ti2-primary-btn-sm" style={{background:"none",border:"1.5px solid #cbd5e1",color:"#475569",padding:"5px 12px",borderRadius:"8px",cursor:"pointer",fontWeight:"700",fontSize:"12px"}} onClick={()=>openSSForm(s.id)}>Open Form</button>
                </>)}
                {s.status === "Exam Taken" && (
                  <button className="ti2-primary-btn-sm" style={{background:"#16a34a",border:"none",color:"#fff",padding:"6px 16px",borderRadius:"8px",cursor:"pointer",fontWeight:"700",fontSize:"12px"}} onClick={()=>openSSForm(s.id)}>Start Assessment</button>
                )}
                {s.status === "Submitted" && (<>
                  <button className="ti2-primary-btn-sm" style={{background:"#2563eb",border:"none",color:"#fff",padding:"6px 12px",borderRadius:"8px",cursor:"pointer",fontWeight:"700",fontSize:"12px"}} onClick={()=>openSSForm(s.id)}>View Form</button>
                  <button className="ti2-primary-btn-sm" style={{background:"#ea580c",border:"none",color:"#fff",padding:"6px 12px",borderRadius:"8px",cursor:"pointer",fontWeight:"700",fontSize:"12px"}} onClick={()=>openSSForm(s.id, true)}>Edit</button>
                </>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}