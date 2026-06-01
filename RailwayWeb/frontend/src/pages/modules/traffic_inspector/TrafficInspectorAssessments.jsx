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


export function TrafficInspectorAssessments(props) {
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

  
    const getStatusStyle = (status) => {
      if (status === "Exam Sent")  return { background: "#f3e8ff", color: "#6b21a8" };
      if (status === "Exam Taken") return { background: "#dcfce7", color: "#166534" };
      return {};
    };

    /* ─── LEVEL 3: Individual form views ─── */
    if (assessRole === "SM" && activeSmId) {
      const sm     = smList.find(s => s.id === activeSmId);
      const f      = smForms[activeSmId] || defaultSMForm();
      const locked = !!smLocked[activeSmId];
      const { ynScore, knowledge, total } = computeSMScore(f);
      const isAlcoholic = f.alcoholicStatus === "Alcoholic";
      const liveCat = isAlcoholic ? "D" : getCat(total);
      return (
        <div className="ti2-card animate-fade-in">
          <div className="ti2-card-hdr">
            <div><h2>Assess Station Master — {sm?.name}</h2><p style={{margin:"2px 0 0",fontSize:12,color:"#64748b"}}>{sm?.hrmsId} · {sm?.station}</p></div>
            <button className="ti2-link-btn" onClick={() => setActiveSmId(null)}>â† Back</button>
          </div>
          {TI_SM_CRITERIA.map((sec, si) => (
            <div key={sec.key} className="ti2-assess-section">
              <div className="ti2-assess-sec-hdr">
                <span className="ti2-assess-sec-num">{String(si+1).padStart(2,"0")}</span>
                <div><strong>{sec.label}</strong><span className="ti2-assess-sec-meta">{sec.count} criteria · {sec.weight} marks each · Total {sec.count*sec.weight}</span></div>
                <span className="ti2-assess-live-marks">{f[sec.key].filter(v=>v==="Yes").length*sec.weight} / {sec.count*sec.weight}</span>
              </div>
              <div className="ti2-yn-grid">
                {sec.criteria.map((cr, idx) => (
                  <div key={idx} className="ti2-yn-row">
                    <span className="ti2-yn-label">{idx+1}. {cr}</span>
                    <div className="ti2-yn-btns">
                      {["Yes","No"].map(v => (
                        <button key={v} disabled={locked} type="button"
                          className={`ti2-yn-btn ti2-yn-${v.toLowerCase()}${f[sec.key][idx]===v?" active":""}`}
                          onClick={() => toggleSMYN(activeSmId, sec.key, idx, v)}>{v}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="ti2-assess-section">
            <div className="ti2-assess-sec-hdr">
              <span className="ti2-assess-sec-num">06</span>
              <div><strong>Knowledge & Administrative Details</strong><span className="ti2-assess-sec-meta">Manual entry</span></div>
              <span className="ti2-assess-live-marks">{knowledge}/25</span>
            </div>
            <div className="ti2-assess-form" style={{marginTop:12}}>
              <div className="ti2-form-field"><label>Knowledge Marks (0–25)</label>
                <input type="number" min={0} max={25} disabled={locked} value={f.knowledgeMarks} onChange={e=>setSMField(activeSmId,"knowledgeMarks",e.target.value)} placeholder="Enter MCQ marks"/></div>
              <div className="ti2-form-field"><label>Alcoholic Status <span style={{color:"#dc2626"}}>*</span></label>
                <select disabled={locked} value={f.alcoholicStatus} onChange={e=>setSMField(activeSmId,"alcoholicStatus",e.target.value)}>
                  <option value="">Select…</option><option>Non-Alcoholic</option><option>Alcoholic</option>
                </select></div>
              <div className="ti2-form-field"><label>PME Status</label>
                <select disabled={locked} value={f.pmeStatus} onChange={e=>setSMField(activeSmId,"pmeStatus",e.target.value)}>
                  <option>Fit</option><option>Unfit</option><option>Pending</option>
                </select></div>
              <div className="ti2-form-field"><label>REF Status</label>
                <select disabled={locked} value={f.refStatus} onChange={e=>setSMField(activeSmId,"refStatus",e.target.value)}>
                  <option>Cleared</option><option>Pending</option><option>Failed</option>
                </select></div>
              <div className="ti2-form-field"><label>Counselling</label>
                <select disabled={locked} value={f.counselling} onChange={e=>setSMField(activeSmId,"counselling",e.target.value)}>
                  <option>Not Required</option><option>Recommended</option><option>Mandatory</option>
                </select></div>
              <div className="ti2-form-field"><label>Automatic Training</label>
                <select disabled={locked} value={f.automaticTraining} onChange={e=>setSMField(activeSmId,"automaticTraining",e.target.value)}>
                  <option>Not Required</option><option>Recommended</option><option>Mandatory</option>
                </select></div>
              <div className="ti2-form-field" style={{gridColumn:"1/-1"}}>
                <label>Remarks for AOM</label>
                <textarea rows={3} disabled={locked} value={f.remarks} onChange={e=>setSMField(activeSmId,"remarks",e.target.value)} placeholder="Enter observations…"/>
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
            <div style={{display:"flex",flexDirection:"column",gap:"10px",marginTop:"16px"}}>
              <div className="ti2-locked-banner">✓ Assessment submitted. Pending AOM Approval.</div>
              <button type="button" className="ti2-ghost-btn" style={{border:"1px solid #7c3aed",color:"#7c3aed"}} onClick={() => setSmLocked(p => ({...p,[activeSmId]:false}))}>
                <Edit size={14} style={{marginRight:6}}/> Unlock & Edit Assessment
              </button>
            </div>
          )}
          {!locked && (
            <div className="ti2-review-actions">
              <button className="ti2-primary-btn" onClick={() => submitSMAssessment(activeSmId)}>
                <CheckCircle2 size={14}/> Submit for AOM Approval
              </button>
            </div>
          )}
        </div>
      );
    }

    if (assessRole === "SS" && activeSsId) {
      const ss     = ssList.find(s => s.id === activeSsId);
      const f      = ssForms[activeSsId] || defaultSSForm();
      const locked = !!ssLocked[activeSsId];
      const { ynScore, knowledge, total } = computeSSScore(f);
      const isAlcoholic = f.alcoholicStatus === "Alcoholic";
      const liveCat = isAlcoholic ? "D" : getCat(total);
      return (
        <div className="ti2-card animate-fade-in">
          <div className="ti2-card-hdr">
            <div><h2>Assess Station Superintendent — {ss?.name}</h2><p style={{margin:"2px 0 0",fontSize:12,color:"#64748b"}}>{ss?.hrmsId} · {ss?.station}</p></div>
            <button className="ti2-link-btn" onClick={() => setActiveSsId(null)}>â† Back</button>
          </div>
          {TI_SS_CRITERIA.map((sec, si) => (
            <div key={sec.key} className="ti2-assess-section">
              <div className="ti2-assess-sec-hdr">
                <span className="ti2-assess-sec-num">{String(si+1).padStart(2,"0")}</span>
                <div><strong>{sec.label}</strong><span className="ti2-assess-sec-meta">{sec.count} criteria · {sec.weight} marks each · Total {sec.count*sec.weight}</span></div>
                <span className="ti2-assess-live-marks">{f[sec.key]?.filter(v=>v==="Yes").length*sec.weight} / {sec.count*sec.weight}</span>
              </div>
              <div className="ti2-yn-grid">
                {sec.criteria.map((cr, idx) => (
                  <div key={idx} className="ti2-yn-row">
                    <span className="ti2-yn-label">{idx+1}. {cr}</span>
                    <div className="ti2-yn-btns">
                      {["Yes","No"].map(v => (
                        <button key={v} disabled={locked} type="button"
                          className={`ti2-yn-btn ti2-yn-${v.toLowerCase()}${f[sec.key]?.[idx]===v?" active":""}`}
                          onClick={() => toggleSSYN(activeSsId, sec.key, idx, v)}>{v}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="ti2-assess-section">
            <div className="ti2-assess-sec-hdr">
              <span className="ti2-assess-sec-num">06</span>
              <div><strong>Knowledge & Administrative Details</strong><span className="ti2-assess-sec-meta">Manual entry</span></div>
              <span className="ti2-assess-live-marks">{knowledge}/25</span>
            </div>
            <div className="ti2-assess-form" style={{marginTop:12}}>
              <div className="ti2-form-field"><label>Knowledge Marks (0–25)</label>
                <input type="number" min={0} max={25} disabled={locked} value={f.knowledgeMarks} onChange={e=>setSSField(activeSsId,"knowledgeMarks",e.target.value)} placeholder="Enter MCQ marks"/></div>
              <div className="ti2-form-field"><label>Alcoholic Status <span style={{color:"#dc2626"}}>*</span></label>
                <select disabled={locked} value={f.alcoholicStatus} onChange={e=>setSSField(activeSsId,"alcoholicStatus",e.target.value)}>
                  <option value="">Select…</option><option>Non-Alcoholic</option><option>Alcoholic</option>
                </select></div>
              <div className="ti2-form-field"><label>PME Status</label>
                <select disabled={locked} value={f.pmeStatus} onChange={e=>setSSField(activeSsId,"pmeStatus",e.target.value)}>
                  <option>Fit</option><option>Unfit</option><option>Pending</option>
                </select></div>
              <div className="ti2-form-field"><label>REF Status</label>
                <select disabled={locked} value={f.refStatus} onChange={e=>setSSField(activeSsId,"refStatus",e.target.value)}>
                  <option>Cleared</option><option>Pending</option><option>Failed</option>
                </select></div>
              <div className="ti2-form-field"><label>Counselling</label>
                <select disabled={locked} value={f.counselling} onChange={e=>setSSField(activeSsId,"counselling",e.target.value)}>
                  <option>Not Required</option><option>Recommended</option><option>Mandatory</option>
                </select></div>
              <div className="ti2-form-field"><label>Automatic Training</label>
                <select disabled={locked} value={f.automaticTraining} onChange={e=>setSSField(activeSsId,"automaticTraining",e.target.value)}>
                  <option>Not Required</option><option>Recommended</option><option>Mandatory</option>
                </select></div>
              <div className="ti2-form-field" style={{gridColumn:"1/-1"}}>
                <label>Remarks for AOM</label>
                <textarea rows={3} disabled={locked} value={f.remarks} onChange={e=>setSSField(activeSsId,"remarks",e.target.value)} placeholder="Enter observations…"/>
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
            <div style={{display:"flex",flexDirection:"column",gap:"10px",marginTop:"16px"}}>
              <div className="ti2-locked-banner">✓ Assessment submitted. Pending AOM Approval.</div>
              <button type="button" className="ti2-ghost-btn" style={{border:"1px solid #7c3aed",color:"#7c3aed"}} onClick={() => setSsLocked(p => ({...p,[activeSsId]:false}))}>
                <Edit size={14} style={{marginRight:6}}/> Unlock & Edit Assessment
              </button>
            </div>
          )}
          {!locked && (
            <div className="ti2-review-actions">
              <button className="ti2-primary-btn" onClick={() => submitSSAssessment(activeSsId)}>
                <CheckCircle2 size={14}/> Submit for AOM Approval
              </button>
            </div>
          )}
        </div>
      );
    }

    if (assessRole === "TM" && activeTmId) {
      const tm     = tmList.find(t => t.id === activeTmId);
      const f      = tmForms[activeTmId] || defaultTMForm();
      const locked = !!tmLocked[activeTmId];
      const { ynScore, knowledge, total } = computeTMScore(f);
      const isAlcoholic = f.alcoholicStatus === "Alcoholic";
      const liveCat = isAlcoholic ? "D" : getCat(total);
      return (
        <div className="ti2-card animate-fade-in">
          <div className="ti2-card-hdr">
            <div><h2>Assess Train Manager — {tm?.name}</h2><p style={{margin:"2px 0 0",fontSize:12,color:"#64748b"}}>{tm?.hrmsId} · Home Station: {tm?.station}</p></div>
            <button className="ti2-link-btn" onClick={() => setActiveTmId(null)}>â† Back</button>
          </div>
          {TI_TM_CRITERIA.map((sec, si) => (
            <div key={sec.key} className="ti2-assess-section">
              <div className="ti2-assess-sec-hdr">
                <span className="ti2-assess-sec-num">{String(si+1).padStart(2,"0")}</span>
                <div><strong>{sec.label}</strong><span className="ti2-assess-sec-meta">{sec.count} criteria · {sec.weight} marks each · Total {sec.count*sec.weight}</span></div>
                <span className="ti2-assess-live-marks">{f[sec.key]?.filter(v=>v==="Yes").length*sec.weight} / {sec.count*sec.weight}</span>
              </div>
              <div className="ti2-yn-grid">
                {sec.criteria.map((cr, idx) => (
                  <div key={idx} className="ti2-yn-row">
                    <span className="ti2-yn-label">{idx+1}. {cr}</span>
                    <div className="ti2-yn-btns">
                      {["Yes","No"].map(v => (
                        <button key={v} disabled={locked} type="button"
                          className={`ti2-yn-btn ti2-yn-${v.toLowerCase()}${f[sec.key]?.[idx]===v?" active":""}`}
                          onClick={() => toggleTMYN(activeTmId, sec.key, idx, v)}>{v}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
            <div style={{display:"flex",flexDirection:"column",gap:"10px",marginTop:"16px"}}>
              <div className="ti2-locked-banner">✓ Assessment submitted. Pending AOM Approval.</div>
              <button type="button" className="ti2-ghost-btn" style={{border:"1px solid #7c3aed",color:"#7c3aed"}} onClick={() => setTmLocked(p => ({...p,[activeTmId]:false}))}>
                <Edit size={14} style={{marginRight:6}}/> Unlock & Edit Assessment
              </button>
            </div>
          )}
          {!locked && (
            <div className="ti2-review-actions">
              <button className="ti2-primary-btn" onClick={() => submitTMAssessment(activeTmId)}>
                <CheckCircle2 size={14}/> Submit for AOM Approval
              </button>
            </div>
          )}
        </div>
      );
    }

    /* ─── LEVEL 2: Role-specific list views ─── */