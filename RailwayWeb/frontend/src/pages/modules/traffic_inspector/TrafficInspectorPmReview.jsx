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


export function TrafficInspectorPmReview(props) {
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

  
    /* Detail view */
    if (selectedPM) {
      const secs = editSections[selectedPM.id]||selectedPM.originalSections;
      const liveTotal = secs.reduce((s,x)=>s+x.score,0);
      const liveCat   = getCat(liveTotal);
      const locked    = selectedPM.status!=="Pending";
      const reject    = rejectMode[selectedPM.id]||false;

      return (
        <div className="ti2-card animate-fade-in">
          <div className="ti2-card-hdr">
            <div>
              <h2>Review — {selectedPM.pointsmanName} ({selectedPM.hrmsId})</h2>
              <p style={{margin:"2px 0 0",fontSize:12,color:"#64748b"}}>{selectedPM.station} · Submitted by {selectedPM.assessingSM} on {selectedPM.submissionDate}</p>
            </div>
            <button className="ti2-link-btn" onClick={()=>setSelectedPmId(null)}>← Back</button>
          </div>

          {/* Pointsman info */}
          <div className="ti2-review-meta">
            <div><label>Pointsman</label><strong>{selectedPM.pointsmanName}</strong></div>
            <div><label>HRMS ID</label><strong>{selectedPM.hrmsId}</strong></div>
            <div><label>Station</label><strong>{selectedPM.station}</strong></div>
            <div><label>PME Status</label><strong className={selectedPM.meta.pmeStatus==="Fit"?"ti2-green":"ti2-red"}>{selectedPM.meta.pmeStatus}</strong></div>
            <div><label>REF Status</label><strong className={selectedPM.meta.refStatus==="Cleared"?"ti2-green":"ti2-amber"}>{selectedPM.meta.refStatus}</strong></div>
            <div><label>Alcoholic Status</label><strong>{selectedPM.meta.alcoholicStatus}</strong></div>
          </div>

          {/* Section-wise edit */}
          <h4 className="ti2-sec-title">Section-wise Assessment Marks</h4>
          <div className="ti2-review-sections">
            {secs.map((sec,idx)=>{
              const pct = Math.round((sec.score/sec.max)*100);
              return (
                <div key={sec.title} className="ti2-review-sec-row">
                  <span className="ti2-review-sec-name">{sec.title}</span>
                  <div className="ti2-review-bar-wrap">
                    <div className="ti2-review-bar" style={{width:`${pct}%`,background:pct>=80?"#16a34a":pct>=50?"#2563eb":"#dc2626"}}/>
                  </div>
                  {locked ? (
                    <span className="ti2-review-score-static">{sec.score}/{sec.max}</span>
                  ) : (
                    <div className="ti2-review-score-input">
                      <input type="number" min={0} max={sec.max} value={sec.score}
                        onChange={e=>updateSec(selectedPM.id,idx,e.target.value)}/>
                      <span className="ti2-sec-max">/ {sec.max}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Live score */}
          <div className="ti2-live-score">
            <div><label>Grand Total</label><strong style={{color:CAT_C[liveCat],fontSize:22}}>{liveTotal}/100</strong></div>
            <div><label>Category</label><span className="ti2-badge" style={{background:CAT_B[liveCat],color:CAT_C[liveCat],fontSize:13,padding:"4px 14px"}}>Category {liveCat}</span></div>
          </div>

          {/* TI remarks */}
          {!locked && (
            <div className="ti2-form-field">
              <label>TI Remarks</label>
              <textarea rows={3} value={tiRemarks[selectedPM.id]||""} onChange={e=>setTiRemarks(p=>({...p,[selectedPM.id]:e.target.value}))} placeholder="Add remarks…"/>
            </div>
          )}

          {/* Reject input */}
          {reject && !locked && (
            <div className="ti2-form-field" style={{marginTop:10}}>
              <label style={{color:"#dc2626"}}>Rejection Reason (mandatory)</label>
              <textarea rows={2} placeholder="Enter rejection reason…" id={`reject-${selectedPM.id}`}/>
            </div>
          )}

          {/* Audit trail */}
          {selectedPM.auditTrail?.length>0 && (
            <div>
              <button className="ti2-link-btn-sm" style={{marginTop:12}} onClick={()=>setShowAudit(p=>({...p,[selectedPM.id]:!p[selectedPM.id]}))}>
                {showAudit[selectedPM.id]?"Hide":"View"} Audit Trail
              </button>
              {showAudit[selectedPM.id] && (
                <div className="ti2-audit-trail">
                  {selectedPM.auditTrail.map((a,i)=>(
                    <div key={i} className="ti2-audit-row">
                      <strong>{a.action}</strong> · {a.by} · {a.date}
                      {a.remark && <div style={{fontSize:11,color:"#64748b",marginTop:2}}>"{a.remark}"</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {locked && (
            <div className="ti2-locked-banner">
              {selectedPM.status==="Approved"?"✓ Assessment Approved and Locked":"✗ Assessment Rejected"}
              {selectedPM.tiRemarks && <div style={{marginTop:4,fontSize:12}}>Remarks: {selectedPM.tiRemarks}</div>}
            </div>
          )}

          {!locked && !reject && (
            <div className="ti2-review-actions">
              <button className="ti2-danger-btn" onClick={()=>setRejectMode(p=>({...p,[selectedPM.id]:true}))}>
                <XCircle size={14}/> Reject
              </button>
              <button className="ti2-ghost-btn" onClick={()=>finalizePM(selectedPM.id,"approve")}>
                <CheckCircle2 size={14}/> Approve as Submitted
              </button>
              <button className="ti2-primary-btn" onClick={()=>finalizePM(selectedPM.id,"modify")}>
                <CheckCircle2 size={14}/> Modify & Approve
              </button>
            </div>
          )}
          {reject && !locked && (
            <div className="ti2-review-actions">
              <button className="ti2-ghost-btn" onClick={()=>setRejectMode(p=>({...p,[selectedPM.id]:false}))}>Cancel</button>
              <button className="ti2-danger-btn" onClick={()=>{
                const note=document.getElementById(`reject-${selectedPM.id}`)?.value||"No reason provided";
                finalizePM(selectedPM.id,"reject",note);
              }}>Confirm Rejection</button>
            </div>
          )}
        </div>
      );
    }

    /* List view */
    const tabs=["Pending","Approved","Rejected"];
    return (
      <div className="ti2-card animate-fade-in">
        <div className="ti2-card-hdr"><h2>Review Pointsman Assessments</h2></div>
        <p className="ti2-subtitle">Review, edit, and approve Pointsman assessments submitted by Station Masters.</p>

        {/* Tabs */}
        <div className="ti2-tabs">
          {tabs.map(t=>(
            <button key={t} className={`ti2-tab ${reviewTab===t?"active":""}`} onClick={()=>setReviewTab(t)}>
              {t} <span className="ti2-tab-count">{pmList.filter(p=>p.status===t).length}</span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="ti2-filter-row">
          <div className="ti2-search-box">
            <Search size={13}/><input placeholder="Search pointsman…" value={reviewSearch} onChange={e=>setReviewSearch(e.target.value)}/>
          </div>
          <select className="ti2-select" value={reviewStation} onChange={e=>setReviewStation(e.target.value)}>
            <option value="All">All Stations</option>
            {myStations.map(s=><option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="ti2-table-wrap">
          <div className="ti2-pm-head ti2-pm-row">
            {["Pointsman","HRMS ID","Station","Assessing SM","Date","Score","Status","Action"].map(h=><span key={h}>{h}</span>)}
          </div>
          {filteredPM.length===0&&<p className="ti2-empty">No records in this category.</p>}
          {filteredPM.map(p=>{
            const total = (p.finalSections||p.originalSections).reduce((s,x)=>s+x.score,0);
            const cat   = getCat(total);
            return (
              <div key={p.id} className="ti2-pm-row ti2-pm-data-row">
                <span><strong>{p.pointsmanName}</strong></span>
                <span>{p.hrmsId}</span>
                <span>{p.station}</span>
                <span>{p.assessingSM}</span>
                <span>{p.submissionDate}</span>
                <span><strong>{total}/100</strong></span>
                <span>
                  <span className={`ti2-status-pill ti2-status-${p.status.toLowerCase()}`}>{p.status}</span>
                </span>
                <span>
                  <button className="ti2-link-btn-sm" onClick={()=>openPmReview(p.id)}>
                    {p.status==="Pending"?<><ClipboardCheck size={12}/> Review</>:<><Eye size={12}/> View</>}
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* ── ASSESS SM ── */