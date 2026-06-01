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


export function TrafficInspectorTMList(props) {
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
            <h2>Assessments — Train Managers</h2>
            <p className="ti2-subtitle" style={{margin:"4px 0 0"}}>Train Managers pending assessment are listed below. Open the form to conduct a structured evaluation.</p>
          </div>
          <button className="ti2-link-btn" onClick={() => setAssessRole(null)}>â† Back to Roles</button>
        </div>
        <div className="ti2-table-wrap" style={{marginTop:"16px"}}>
          <div className="ti2-pm-head" style={{display:"grid",gridTemplateColumns:"1.8fr 1fr 1.5fr 1.2fr 1fr 1.3fr 2.5fr",gap:"12px",alignItems:"center",padding:"12px 18px",background:"#f8fafc",borderBottom:"1.5px solid #e2edf8",fontSize:"12px",fontWeight:"800",color:"#475569",textTransform:"uppercase",letterSpacing:"0.5px"}}>
            <span>Train Manager</span><span>HRMS ID</span><span>Home Depot</span><span>Last Assessed</span><span>Score</span><span>Exam Status</span><span style={{textAlign:"right",paddingRight:"10px"}}>Action</span>
          </div>
          {tmList.map(t => (
            <div key={t.id} className="ti2-pm-data-row" style={{display:"grid",gridTemplateColumns:"1.8fr 1fr 1.5fr 1.2fr 1fr 1.3fr 2.5fr",gap:"12px",alignItems:"center",padding:"14px 18px",borderBottom:"1px solid #f1f5f9",background:"#ffffff"}}>
              <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                <div className="ti2-pm-avatar" style={{width:32,height:32,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>{t.name.charAt(0)}</div>
                <strong style={{color:"#0f172a",fontSize:"13px"}}>{t.name}</strong>
              </div>
              <span style={{fontSize:"13px",color:"#475569",fontWeight:"600"}}>{t.hrmsId}</span>
              <span style={{fontSize:"13px",color:"#475569"}}>{t.station}</span>
              <span style={{fontSize:"12px",color:"#64748b"}}>{t.lastDate}</span>
              <span style={{fontSize:"13px",fontWeight:"800",color:"#0f172a"}}>{t.score ? `${t.score}/100` : "—"}</span>
              <div><span className={`ti2-status-pill ti2-status-${t.status.toLowerCase().replace(/\s+/g,"-")}`} style={{...getStatusStyle(t.status),padding:"4px 10px",fontSize:"11px",fontWeight:"700"}}>{t.status}</span></div>
              <div style={{display:"flex",gap:"8px",alignItems:"center",justifyContent:"flex-end"}}>
                {t.status === "Pending" && (<>
                  <button className="ti2-primary-btn-sm" style={{background:"#7c3aed",border:"none",color:"#fff",padding:"6px 12px",borderRadius:"8px",cursor:"pointer",fontWeight:"700",fontSize:"12px"}} onClick={()=>handleSendTMExamAccess(t.id)}>Send Access</button>
                  <button className="ti2-primary-btn-sm" style={{background:"none",border:"1.5px solid #cbd5e1",color:"#475569",padding:"5px 12px",borderRadius:"8px",cursor:"pointer",fontWeight:"700",fontSize:"12px"}} onClick={()=>openTMForm(t.id)}>Open Form</button>
                </>)}
                {t.status === "Exam Sent" && (<>
                  <span style={{fontSize:"11px",color:"#6b21a8",fontWeight:"800",background:"#f3e8ff",padding:"6px 10px",borderRadius:"8px",display:"flex",alignItems:"center",gap:"4px"}}><Clock size={12}/> Waiting for TM...</span>
                  <button className="ti2-primary-btn-sm" style={{background:"none",border:"1.5px solid #cbd5e1",color:"#475569",padding:"5px 12px",borderRadius:"8px",cursor:"pointer",fontWeight:"700",fontSize:"12px"}} onClick={()=>openTMForm(t.id)}>Open Form</button>
                </>)}
                {t.status === "Exam Taken" && (
                  <button className="ti2-primary-btn-sm" style={{background:"#16a34a",border:"none",color:"#fff",padding:"6px 16px",borderRadius:"8px",cursor:"pointer",fontWeight:"700",fontSize:"12px"}} onClick={()=>openTMForm(t.id)}>Start Assessment</button>
                )}
                {t.status === "Submitted" && (<>
                  <button className="ti2-primary-btn-sm" style={{background:"#2563eb",border:"none",color:"#fff",padding:"6px 12px",borderRadius:"8px",cursor:"pointer",fontWeight:"700",fontSize:"12px"}} onClick={()=>openTMForm(t.id)}>View Form</button>
                  <button className="ti2-primary-btn-sm" style={{background:"#ea580c",border:"none",color:"#fff",padding:"6px 12px",borderRadius:"8px",cursor:"pointer",fontWeight:"700",fontSize:"12px"}} onClick={()=>openTMForm(t.id, true)}>Edit</button>
                </>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    if (assessRole === "SM") return renderSMList();
    if (assessRole === "SS") return renderSSList();
    if (assessRole === "TM") return renderTMList();

    /* ─── LEVEL 1: Role picker ─── */
    const smPending = smList.filter(s => s.status === "Pending" || s.status === "Exam Sent").length;
    const ssPending = ssList.filter(s => s.status === "Pending" || s.status === "Exam Sent").length;
    const tmPending = tmList.filter(t => t.status === "Pending" || t.status === "Exam Sent").length;

    const roles = [
      {
        key: "SM",
        label: "Station Masters",
        icon: Building2,
        color: "#2563eb",
        bg: "#eff6ff",
        border: "#bfdbfe",
        pending: smPending,
        total: smList.length,
        desc: "Conduct structured field evaluations for Station Masters on safety compliance, rule knowledge, and administrative duties."
      },
      {
        key: "SS",
        label: "Station Superintendents",
        icon: UserCheck,
        color: "#7c3aed",
        bg: "#f5f3ff",
        border: "#ddd6fe",
        pending: ssPending,
        total: ssList.length,
        desc: "Evaluate Station Superintendents on operational supervision, staff management, safety compliance, and infrastructure upkeep."
      },
      {
        key: "TM",
        label: "Train Managers",
        icon: BusFront,
        color: "#16a34a",
        bg: "#f0fdf4",
        border: "#bbf7d0",
        pending: tmPending,
        total: tmList.length,
        desc: "Assess Train Managers on train safety, signaling compliance, shunting operations, documentation, and emergency protocols."
      }
    ];

    return (
      <div className="ti2-card animate-fade-in">
        <div className="ti2-card-hdr" style={{marginBottom:"8px"}}>
          <div>
            <h2>Assessments</h2>
            <p className="ti2-subtitle" style={{margin:"4px 0 0"}}>Select a staff category to conduct structured competency assessments.</p>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"20px",marginTop:"20px"}}>
          {roles.map(role => (
            <button
              key={role.key}
              onClick={() => setAssessRole(role.key)}
              style={{
                background: role.bg,
                border: `2px solid ${role.border}`,
                borderRadius: "16px",
                padding: "28px 24px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${role.color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px"}}>
                <div style={{width:48,height:48,borderRadius:"12px",background:role.color,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <role.icon size={24} color="#fff"/>
                </div>
                {role.pending > 0 && (
                  <span style={{background:"#dc2626",color:"#fff",borderRadius:"999px",fontSize:"11px",fontWeight:"800",padding:"3px 10px",minWidth:24,textAlign:"center"}}>
                    {role.pending} pending
                  </span>
                )}
              </div>
              <h3 style={{margin:"0 0 6px",fontSize:"17px",fontWeight:"800",color:"#0f172a"}}>{role.label}</h3>
              <p style={{margin:"0 0 16px",fontSize:"12.5px",color:"#475569",lineHeight:"1.5"}}>{role.desc}</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:"12px",color:"#64748b"}}>{role.total} personnel on roster</span>
                <span style={{fontSize:"13px",fontWeight:"700",color:role.color,display:"flex",alignItems:"center",gap:"4px"}}>
                  Open <ChevronRight size={16}/>
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Quick stats strip */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"14px",marginTop:"24px",padding:"18px",background:"#f8fafc",borderRadius:"12px",border:"1px solid #e2e8f0"}}>
          {[
            { label:"Total Personnel", value: smList.length + ssList.length + tmList.length },
            { label:"Pending Assessments", value: smPending + ssPending + tmPending, color:"#dc2626" },
            { label:"Submitted This Month", value: [...smList,...ssList,...tmList].filter(x=>x.status==="Submitted").length, color:"#16a34a" }
          ].map((stat,i) => (
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontSize:"26px",fontWeight:"800",color:stat.color||"#0f172a"}}>{stat.value}</div>
              <div style={{fontSize:"11px",color:"#64748b",fontWeight:"600",textTransform:"uppercase",letterSpacing:"0.5px"}}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };


  /* ── REPORTS ── */
}