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


export function TrafficInspectorAssessTM(props) {
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

  
    if (activeTmId) {
      const tm  = tmList.find(t=>t.id===activeTmId);
      const f   = tmForms[activeTmId]||defaultTMForm();
      const locked = !!tmLocked[activeTmId];
      const {ynScore,knowledge,total} = computeTMScore(f);
      const isAlcoholic = f.alcoholicStatus === "Alcoholic";
      const liveCat = isAlcoholic ? "D" : getCat(total);
      return (
        <div className="ti2-card animate-fade-in">
          <div className="ti2-card-hdr">
            <div><h2>Assess Train Manager — {tm?.name}</h2><p style={{margin:"2px 0 0",fontSize:12,color:"#64748b"}}>{tm?.hrmsId} · Home Station: {tm?.station}</p></div>
            <button className="ti2-link-btn" onClick={()=>setActiveTmId(null)}>← Back</button>
          </div>

          {TI_TM_CRITERIA.map((sec,si)=>(
            <div key={sec.key} className="ti2-assess-section">
              <div className="ti2-assess-sec-hdr">
                <span className="ti2-assess-sec-num">{String(si+1).padStart(2,"0")}</span>
                <div><strong>{sec.label}</strong><span className="ti2-assess-sec-meta">{sec.count} criteria · {sec.weight} marks each · Total {sec.count*sec.weight}</span></div>
                <span className="ti2-assess-live-marks">
                  {f[sec.key]?.filter(v=>v==="Yes").length*sec.weight} / {sec.count*sec.weight}
                </span>
              </div>
              <div className="ti2-yn-grid">
                {sec.criteria.map((cr,idx)=>(
                  <div key={idx} className="ti2-yn-row">
                    <span className="ti2-yn-label">{idx+1}. {cr}</span>
                    <div className="ti2-yn-btns">
                      {["Yes","No"].map(v=>(
                        <button key={v} disabled={locked} type="button"
                          className={`ti2-yn-btn ti2-yn-${v.toLowerCase()}${f[sec.key]?.[idx]===v?" active":""}`}
                          onClick={()=>toggleTMYN(activeTmId,sec.key,idx,v)}>
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Knowledge + additional fields */}
          <div className="ti2-assess-section">
            <div className="ti2-assess-sec-hdr">
              <span className="ti2-assess-sec-num">06</span>
              <div><strong>Knowledge & Administrative Details</strong><span className="ti2-assess-sec-meta">Manual entry</span></div>
              <span className="ti2-assess-live-marks">{knowledge}/25</span>
            </div>
            <div className="ti2-assess-form" style={{marginTop:12}}>
              <div className="ti2-form-field"><label>Knowledge Marks (0–25)</label>
                <input type="number" min={0} max={25} disabled={locked} value={f.knowledgeMarks} onChange={e=>setTMField(activeTmId,"knowledgeMarks",e.target.value)} placeholder="Enter MCQ marks"/></div>
              <div className="ti2-form-field"><label>Alcoholic Status <span style={{color:"#dc2626"}}>*</span></label>
                <select disabled={locked} value={f.alcoholicStatus} onChange={e=>setTMField(activeTmId,"alcoholicStatus",e.target.value)}>
                  <option value="">Select…</option><option>Non-Alcoholic</option><option>Alcoholic</option>
                </select></div>
              <div className="ti2-form-field"><label>PME Status</label>
                <select disabled={locked} value={f.pmeStatus} onChange={e=>setTMField(activeTmId,"pmeStatus",e.target.value)}>
                  <option>Fit</option><option>Unfit</option><option>Pending</option>
                </select></div>
              <div className="ti2-form-field"><label>REF Status</label>
                <select disabled={locked} value={f.refStatus} onChange={e=>setTMField(activeTmId,"refStatus",e.target.value)}>
                  <option>Cleared</option><option>Pending</option><option>Failed</option>
                </select></div>
              <div className="ti2-form-field"><label>Counselling</label>
                <select disabled={locked} value={f.counselling} onChange={e=>setTMField(activeTmId,"counselling",e.target.value)}>
                  <option>Not Required</option><option>Recommended</option><option>Mandatory</option>
                </select></div>
              <div className="ti2-form-field"><label>Automatic Training</label>
                <select disabled={locked} value={f.automaticTraining} onChange={e=>setTMField(activeTmId,"automaticTraining",e.target.value)}>
                  <option>Not Required</option><option>Recommended</option><option>Mandatory</option>
                </select></div>
              <div className="ti2-form-field" style={{gridColumn:"1/-1"}}>
                <label>Remarks for AOM</label>
                <textarea rows={3} disabled={locked} value={f.remarks} onChange={e=>setTMField(activeTmId,"remarks",e.target.value)} placeholder="Enter observations…"/>
              </div>
            </div>
          </div>

          <div className="ti2-live-score">
            <div><label>Yes/No Score</label><strong>{ynScore}/75</strong></div>
            <div><label>Knowledge</label><strong>{knowledge}/25</strong></div>
            <div><label>Grand Total</label><strong style={{color:CAT_C[liveCat],fontSize:22}}>{total}/100</strong></div>
            <div><label>Category</label><span className="ti2-badge" style={{background:CAT_B[liveCat],color:CAT_C[liveCat],fontSize:13,padding:"4px 14px"}}>Category {liveCat}</span></div>
          </div>

          {locked && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
              <div className="ti2-locked-banner">✓ Assessment submitted. Pending AOM Approval.</div>
              <button type="button" className="ti2-ghost-btn" style={{ border: "1px solid #7c3aed", color: "#7c3aed" }} onClick={() => setTmLocked(p => ({ ...p, [activeTmId]: false }))}>
                <Edit size={14} style={{ marginRight: 6 }}/> Unlock & Edit Assessment
              </button>
            </div>
          )}
          {!locked && (
            <div className="ti2-review-actions">
              <button className="ti2-primary-btn" onClick={()=>submitTMAssessment(activeTmId)}>
                <CheckCircle2 size={14}/> Submit for AOM Approval
              </button>
            </div>
          )}
        </div>
      );
    }

    const getStatusStyle = (status) => {
      if (status === "Exam Sent") return { background: "#f3e8ff", color: "#6b21a8" };
      if (status === "Exam Taken") return { background: "#dcfce7", color: "#166534" };
      return {};
    };

    return (
      <div className="ti2-card animate-fade-in">
        <div className="ti2-card-hdr"><h2>Assess Train Managers</h2></div>
        <p className="ti2-subtitle">Train Managers pending assessment are listed below. Open the form to conduct a structured evaluation.</p>
        
        <div className="ti2-table-wrap" style={{ marginTop: "16px" }}>
          {/* Table Header Row */}
          <div className="ti2-pm-head" style={{
            display: "grid",
            gridTemplateColumns: "1.8fr 1fr 1.5fr 1.2fr 1fr 1.3fr 2.5fr",
            gap: "12px",
            alignItems: "center",
            padding: "12px 18px",
            background: "#f8fafc",
            borderBottom: "1.5px solid #e2edf8",
            fontSize: "12px",
            fontWeight: "800",
            color: "#475569",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            <span>Train Manager</span>
            <span>HRMS ID</span>
            <span>Home Depot</span>
            <span>Last Assessed</span>
            <span>Score</span>
            <span>Exam Status</span>
            <span style={{ textAlign: "right", paddingRight: "10px" }}>Action</span>
          </div>

          {/* Table Body Rows */}
          {tmList.map(t=>(
            <div key={t.id} className="ti2-pm-data-row" style={{
              display: "grid",
              gridTemplateColumns: "1.8fr 1fr 1.5fr 1.2fr 1fr 1.3fr 2.5fr",
              gap: "12px",
              alignItems: "center",
              padding: "14px 18px",
              borderBottom: "1px solid #f1f5f9",
              transition: "background 0.15s",
              background: "#ffffff"
            }}>
              {/* Train Manager Avatar & Name */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="ti2-pm-avatar" style={{ width: 32, height: 32, fontSize: 13, display: "flex", alignItems: "center", justifycontent: "center" }}>{t.name.charAt(0)}</div>
                <strong style={{ color: "#0f172a", fontSize: "13px" }}>{t.name}</strong>
              </div>

              {/* HRMS ID */}
              <span style={{ fontSize: "13px", color: "#475569", fontWeight: "600" }}>{t.hrmsId}</span>

              {/* Home Depot */}
              <span style={{ fontSize: "13px", color: "#475569" }}>{t.station}</span>

              {/* Last Assessed Date */}
              <span style={{ fontSize: "12px", color: "#64748b" }}>{t.lastDate}</span>

              {/* Dynamic Score display */}
              <span style={{ fontSize: "13px", fontWeight: "800", color: "#0f172a" }}>
                {t.score ? `${t.score}/100` : "—"}
              </span>

              {/* Exam Status Badge */}
              <div>
                <span className={`ti2-status-pill ti2-status-${t.status.toLowerCase().replace(/\s+/g,"-")}`} style={{ ...getStatusStyle(t.status), padding: "4px 10px", fontSize: "11px", fontWeight: "700" }}>
                  {t.status}
                </span>
              </div>

              {/* Actions alignment */}
              <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "flex-end" }}>
                {t.status === "Pending" && (
                  <>
                    <button className="ti2-primary-btn-sm" style={{ background: "#7c3aed", border: "none", color: "#ffffff", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: "700", fontSize: "12px" }} onClick={()=>handleSendTMExamAccess(t.id)}>
                      Send Access
                    </button>
                    <button className="ti2-primary-btn-sm" style={{ background: "none", border: "1.5px solid #cbd5e1", color: "#475569", padding: "5px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: "700", fontSize: "12px" }} onClick={()=>openTMForm(t.id)}>
                      Open Form
                    </button>
                  </>
                )}
                {t.status === "Exam Sent" && (
                  <>
                    <span style={{ fontSize: "11px", color: "#6b21a8", fontWeight: "800", background: "#f3e8ff", padding: "6px 10px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={12}/> Waiting for TM...
                    </span>
                    <button className="ti2-primary-btn-sm" style={{ background: "none", border: "1.5px solid #cbd5e1", color: "#475569", padding: "5px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: "700", fontSize: "12px" }} onClick={()=>openTMForm(t.id)}>
                      Open Form
                    </button>
                  </>
                )}
                {t.status === "Exam Taken" && (
                  <button className="ti2-primary-btn-sm" style={{ background: "#16a34a", border: "none", color: "#ffffff", padding: "6px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "700", fontSize: "12px" }} onClick={()=>openTMForm(t.id)}>
                    Start Assessment
                  </button>
                )}
                {t.status === "Submitted" && (
                  <>
                    <button className="ti2-primary-btn-sm" style={{ background: "#2563eb", border: "none", color: "#ffffff", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: "700", fontSize: "12px" }} onClick={()=>openTMForm(t.id)}>
                      View Form
                    </button>
                    <button className="ti2-primary-btn-sm" style={{ background: "#ea580c", border: "none", color: "#ffffff", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: "700", fontSize: "12px" }} onClick={() => openTMForm(t.id, true)}>
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ── REPORTS ── */