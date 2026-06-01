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


export function TrafficInspectorReports(props) {
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

  
    if (selectedReportUserId) {
      const u = users.find(x => x.id === selectedReportUserId);
      if (!u) return null;

      const cat = u.cat || getCat(u.score);
      const isHighRisk = u.pmeStatus === "Overdue" || u.refStatus === "Expired" || u.score < 50;
      const risk = isHighRisk ? "High" : u.score >= 80 ? "Low" : "Medium";
      
      // Get detailed assessments from state if available
      const pmAssess = pmList.find(p => p.hrmsId === u.id);
      const smAssess = smList.find(s => s.hrmsId === u.id);
      const smForm = smForms[smAssess?.id];

      return (
        <div className="ti2-card animate-fade-in" style={{ padding: "24px" }}>
          {/* Header section with back button */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1.5px solid #e2edf8", paddingBottom: "16px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div className="ti2-pm-avatar" style={{ width: 48, height: 48, fontSize: 18, background: "#2563eb", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>{u.name.charAt(0)}</div>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a", margin: 0 }}>{u.name}</h2>
                <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#64748b", fontWeight: "700" }}>{u.role} Dossier · {u.station}</p>
              </div>
            </div>
            <button className="ti2-link-btn" onClick={() => setSelectedReportUserId(null)} style={{ fontSize: "13px", fontWeight: "800", color: "#2563eb", background: "none", border: "none", cursor: "pointer" }}>
              ← Back to Reports
            </button>
          </div>

          {/* Quick Info Summary metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
            <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Grand Total Score</span>
              <strong style={{ display: "block", fontSize: "24px", color: CAT_C[cat], marginTop: "4px", fontWeight: "900" }}>{u.score}/100</strong>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Safety Grade</span>
              <div>
                <span className="ti2-badge" style={{ display: "inline-block", background: CAT_B[cat], color: CAT_C[cat], fontSize: "13px", fontWeight: "800", padding: "4px 14px", borderRadius: "8px", marginTop: "8px" }}>
                  Category {cat}
                </span>
              </div>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>PME Clearance</span>
              <div>
                <span className="ti2-badge" style={{ display: "inline-block", background: u.pmeStatus === "Fit" ? "#dcfce7" : "#fee2e2", color: u.pmeStatus === "Fit" ? "#16a34a" : "#dc2626", fontSize: "13px", fontWeight: "800", padding: "4px 14px", borderRadius: "8px", marginTop: "8px" }}>
                  {u.pmeStatus}
                </span>
              </div>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>REF Training</span>
              <div>
                <span className="ti2-badge" style={{ display: "inline-block", background: u.refStatus === "Cleared" ? "#dcfce7" : "#fee2e2", color: u.refStatus === "Cleared" ? "#16a34a" : "#dc2626", fontSize: "13px", fontWeight: "800", padding: "4px 14px", borderRadius: "8px", marginTop: "8px" }}>
                  {u.refStatus}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "24px" }}>
            {/* Left side details card */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "14px", padding: "18px" }}>
                <h3 style={{ margin: "0 0 14px 0", fontSize: "13px", fontWeight: "800", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1.5px solid #e2edf8", paddingBottom: "8px" }}>Personnel Roster Details</h3>
                <dl style={{ display: "flex", flexDirection: "column", gap: "12px", margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Employee HRMS ID</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.id}</dd></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Designation</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.designation || u.role}</dd></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Jurisdiction Station</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.station}</dd></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Contact Number</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.contact || "+91 98765 11001"}</dd></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Date of Appointment</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.joiningDate || "2019-04-12"}</dd></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Alcoholic Status</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: u.alcoholicStatus === "Alcoholic" ? "#dc2626" : "#16a34a" }}>{u.alcoholicStatus || "Non-Alcoholic"}</dd></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Assigned Division Risk</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: RISK_C[risk] }}>{risk} Risk</dd></div>
                </dl>
              </div>

              {/* Action buttons */}
              <button className="ti2-primary-btn" onClick={() => exportAlert("PDF", `Employee_Assessment_Dossier_${u.id}`)} style={{ width: "100%", height: "42px", justifyContent: "center", background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", borderRadius: "8px", fontWeight: "700", cursor: "pointer", border: "none", color: "#ffffff", gap: "6px" }}>
                <FileText size={16}/> Export Assessment Dossier (PDF)
              </button>
            </div>

            {/* Right side Performance Breakdown */}
            <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "14px", padding: "18px" }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: "13px", fontWeight: "800", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1.5px solid #e2edf8", paddingBottom: "8px" }}>Sectional Competency Breakdown</h3>
              
              {u.role === "Pointsman" ? (
                /* Pointsman sections competency progress bars */
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {(() => {
                    const secs = pmAssess?.finalSections || pmAssess?.originalSections || [
                      { title: "Knowledge of Rules", score: Math.round(u.score * 0.23), max: 25 },
                      { title: "Alertness & Observation", score: Math.round(u.score * 0.22), max: 25 },
                      { title: "Safety Record", score: Math.round(u.score * 0.14), max: 15 },
                      { title: "Leadership & Management", score: Math.round(u.score * 0.13), max: 15 },
                      { title: "Discipline", score: Math.round(u.score * 0.09), max: 10 },
                      { title: "Appearance & Neatness", score: Math.round(u.score * 0.09), max: 10 },
                    ];
                    return secs.map(s => {
                      const pct = Math.round((s.score / s.max) * 100);
                      return (
                        <div key={s.title}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>
                            <span>{s.title}</span>
                            <strong>{s.score} / {s.max} ({pct}%)</strong>
                          </div>
                          <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "999px", overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${pct}%`, background: pct >= 80 ? "#16a34a" : pct >= 50 ? "#2563eb" : "#dc2626", borderRadius: "999px" }}/>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              ) : (
                /* Station Master sections competency progress bars */
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {(() => {
                    let totalYes = smForm ? smForm.stationMgmt.filter(v => v === "Yes").length +
                                           smForm.safety.filter(v => v === "Yes").length +
                                           smForm.staffSupervision.filter(v => v === "Yes").length +
                                           smForm.documentation.filter(v => v === "Yes").length +
                                           smForm.emergency.filter(v => v === "Yes").length : 12;
                    let knowledgeMarks = smForm ? Math.min(parseInt(smForm.knowledgeMarks) || 0, 25) : Math.max(0, u.score - 60);

                    const secs = [
                      { title: "Station Management", score: smForm ? smForm.stationMgmt.filter(v => v === "Yes").length * 5 : Math.round(totalYes * 5 * 0.25), max: 25 },
                      { title: "Safety & Compliance", score: smForm ? smForm.safety.filter(v => v === "Yes").length * 4 : Math.round(totalYes * 4 * 0.25), max: 20 },
                      { title: "Staff Supervision", score: smForm ? smForm.staffSupervision.filter(v => v === "Yes").length * 3 : Math.round(totalYes * 3 * 0.20), max: 15 },
                      { title: "Documentation & Reporting", score: smForm ? smForm.documentation.filter(v => v === "Yes").length * 3 : Math.round(totalYes * 3 * 0.15), max: 15 },
                      { title: "Emergency Handling", score: smForm ? smForm.emergency.filter(v => v === "Yes").length * 5 : Math.round(totalYes * 5 * 0.25), max: 25 },
                      { title: "Knowledge (Safety Exam)", score: knowledgeMarks, max: 25 }
                    ];

                    return secs.map(s => {
                      const pct = Math.round((s.score / s.max) * 100);
                      return (
                        <div key={s.title}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>
                            <span>{s.title}</span>
                            <strong>{s.score} / {s.max} ({pct}%)</strong>
                          </div>
                          <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "999px", overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${pct}%`, background: pct >= 80 ? "#16a34a" : pct >= 50 ? "#2563eb" : "#dc2626", borderRadius: "999px" }}/>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    const cats={A:0,B:0,C:0,D:0};
    filteredReport.forEach(r=>cats[r.cat || getCat(r.score)]++);
    const riskCnt={Low:0,Medium:0,High:0};
    filteredReport.forEach(r=>riskCnt[r.risk]++);

    return (
      <div className="ti2-card animate-fade-in">
        <div className="ti2-card-hdr"><h2>Reports &amp; Analytics</h2></div>
        <p className="ti2-subtitle">Cross-station performance data. Click any row to view their complete performance dossier.</p>

        {/* Filters */}
        <div className="ti2-filter-row">
          <div className="ti2-search-box">
            <Search size={13}/><input placeholder="Search staff…" value={rpSearch} onChange={e=>setRpSearch(e.target.value)}/>
          </div>
          <select className="ti2-select" value={rpStation} onChange={e=>setRpStation(e.target.value)}>
            <option value="All">All Stations</option>
            {myStations.map(s=><option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
          <select className="ti2-select" value={rpCat} onChange={e=>setRpCat(e.target.value)}>
            {["All","A","B","C","D"].map(o=><option key={o}>{o}</option>)}
          </select>
          <select className="ti2-select" value={rpRisk} onChange={e=>setRpRisk(e.target.value)}>
            {["All","Low","Medium","High"].map(o=><option key={o}>{o}</option>)}
          </select>
          <div className="ti2-sort-wrap"><ArrowUpDown size={12}/>
            <select value={rpSort} onChange={e=>setRpSort(e.target.value)}>
              <option value="date-desc">Default</option>
              <option value="score-desc">High Score</option>
              <option value="score-asc">Low Score</option>
            </select>
          </div>
        </div>

        {/* Summary mini-cards */}
        <div className="ti2-report-summary">
          {[
            { label:"Filtered Staff",   v: filteredReport.length },
            { label:"Avg Score",        v: filteredReport.length? Math.round(filteredReport.reduce((s,r)=>s+r.score,0)/filteredReport.length) : "—" },
            { label:"High Risk",        v: riskCnt.High },
            { label:"Cat. A",           v: cats.A },
          ].map(c=>(
            <div key={c.label} className="ti2-report-mini"><label>{c.label}</label><strong>{c.v}</strong></div>
          ))}
        </div>

        {/* Table */}
        <div className="ti2-table-wrap" style={{marginTop:16}}>
          <div className="ti2-rp-head ti2-rp-row">
            {["Name","HRMS ID","Station","Score","Grade","Risk","Date"].map(h=><span key={h}>{h}</span>)}
          </div>
          {filteredReport.map((r,i)=>{
            const cat=r.cat;
            return (
              <div key={i} className="ti2-rp-row ti2-rp-data-row" style={{ cursor: "pointer" }} onClick={() => setSelectedReportUserId(r.hrmsId)}>
                <span><strong>{r.name}</strong></span>
                <span>{r.hrmsId}</span>
                <span>{r.station}</span>
                <span><strong>{r.score}/100</strong></span>
                <span><span className="ti2-badge" style={{background:CAT_B[cat],color:CAT_C[cat]}}>Cat. {cat}</span></span>
                <span><span className="ti2-badge" style={{background:RISK_B[r.risk],color:RISK_C[r.risk]}}>{r.risk}</span></span>
                <span>{r.date}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════
     RENDER: CONTENT ROUTER
  ═══════════════════════════════════════════ */