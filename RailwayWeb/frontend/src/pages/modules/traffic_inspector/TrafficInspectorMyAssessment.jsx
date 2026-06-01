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


export function TrafficInspectorMyAssessment(props) {
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

  
    if (quizState === "quiz") {
      const q = TI_QUIZ[currentQuestion];
      const answeredCount = quizAnswers.filter(v => v !== null).length;
      const completionRate = Math.round((answeredCount / 25) * 100);

      return (
        <div className="ti2-card animate-fade-in" style={{ padding: "24px" }}>
          <div className="ti2-card-hdr" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "14px", marginBottom: "20px" }}>
            <h2 style={{ margin: 0 }}>Self-Compliance Assessment Test</h2>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#475569" }}>Question {currentQuestion + 1} of 25</span>
          </div>
          <p className="ti2-subtitle" style={{ fontSize: "13px", color: "#64748b", marginTop: "-12px", marginBottom: "18px" }}>
            Verify your operational guidelines knowledge as a Traffic Inspector. All 25 questions are compulsory.
          </p>
          
          {/* Progress Bar */}
          <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "999px", overflow: "hidden", margin: "14px 0 6px 0" }}>
            <div style={{ height: "100%", background: "#2563eb", width: `${completionRate}%`, transition: "width 0.3s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748b", marginBottom: "20px", fontWeight: "600" }}>
            <span>Progress: {completionRate}%</span>
            <span>{answeredCount}/25 Answered</span>
          </div>
          
          {/* Question Box */}
          <div style={{ padding: "20px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", marginTop: "10px", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#2563eb", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Compulsory Question {currentQuestion + 1}</span>
            <h4 style={{ margin: "0 0 18px 0", color: "#0f172a", fontSize: "15px", fontWeight: "700", lineHeight: "1.5" }}>
              <HelpCircle size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px", marginTop: "-2px" }}/> 
              {q.q}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {q.opts.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectQuizOpt(idx)}
                  style={{ padding: "14px", borderRadius: "8px", border: quizAnswers[currentQuestion] === idx ? "2px solid #2563eb" : "1.5px solid #cbd5e1", background: quizAnswers[currentQuestion] === idx ? "#eff6ff" : "#fff", color: "#0f172a", fontSize: "13px", fontWeight: "600", cursor: "pointer", textAlign: "left", transition: "all 0.15s", display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span style={{ display: "inline-flex", width: "24px", height: "24px", borderRadius: "50%", background: quizAnswers[currentQuestion] === idx ? "#2563eb" : "#f1f5f9", color: quizAnswers[currentQuestion] === idx ? "#fff" : "#475569", alignItems: "center", justifyContent: "center", fontSize: "12px", fontFamily: "monospace" }}>{String.fromCharCode(65 + idx)}</span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question Grid Navigator */}
          <div style={{ marginTop: "24px", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "10px", textAlign: "center" }}>Assessment Question Navigator</span>
            <div className="pm-question-panel" style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
              {TI_QUIZ.map((item, index) => {
                const isCurrent = index === currentQuestion;
                const isAnswered = quizAnswers[index] !== null;
                return (
                  <button
                    key={index}
                    type="button"
                    className={`pm-question-pill ${isCurrent ? "current" : ""} ${isAnswered ? "answered" : ""}`}
                    onClick={() => setCurrentQuestion(index)}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.15s"
                    }}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", alignItems: "center" }}>
            <button className="ti2-ghost-btn" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(p=>p-1)} style={{ padding: "10px 18px", fontSize: "13px", fontWeight: "600" }}>← Previous</button>
            <button className="ti2-primary-btn" disabled={currentQuestion === 24} onClick={() => setCurrentQuestion(p=>p+1)} style={{ padding: "10px 18px", fontSize: "13px", fontWeight: "600" }}>Next Question →</button>
          </div>

          {/* Submit Row & Compulsory Guidance */}
          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "20px", marginTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div>
              {answeredCount < 25 ? (
                <span style={{ color: "#d97706", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}>
                  ⚠️ Compulsory: {25 - answeredCount} unanswered questions remaining. Submit disabled.
                </span>
              ) : (
                <span style={{ color: "#16a34a", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}>
                  ✓ All 25 questions answered. Safety compliance verification ready.
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button 
                type="button"
                className="ti2-ghost-btn" 
                style={{ color: "#dc2626", borderColor: "#fca5a5" }}
                onClick={() => {
                  if (confirm("Are you sure you want to cancel the self-assessment? No progress will be saved.")) {
                    setQuizState("idle");
                  }
                }}
              >
                Cancel Assessment
              </button>
              <button 
                type="button"
                className="ti2-primary-btn" 
                style={{ background: "#16a34a", opacity: answeredCount < 25 ? 0.6 : 1 }} 
                disabled={answeredCount < 25} 
                onClick={submitQuiz}
              >
                Submit Assessment
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (quizState === "result") {
      const record = selectedRecord || {
        totalScore: latestQuizScore,
        category: getCat(latestQuizScore),
        period: "Self-Check",
        date: new Date().toISOString().slice(0, 10),
        aomRemarks: "Self-compliance check completed.",
        sections: [
          { title: "Whistle Codes & Hand Signals",          marks: 0, outOf: 20 },
          { title: "Token & Line Clear Authorities",        marks: 0, outOf: 20 },
          { title: "Station Interlocking & Track Circuits", marks: 0, outOf: 20 },
          { title: "Shunting Operations & Point Locking",   marks: 0, outOf: 20 },
          { title: "Gate Signals & Siding Isolation",        marks: 0, outOf: 20 }
        ]
      };
      
      const cat = record.category || getCat(record.totalScore);
      const performanceSummary = getPerformanceSummaryText(record.totalScore, record.sections);

      return (
        <div className="ti2-card animate-fade-in" style={{ padding: "24px" }}>
          <div className="ti2-card-hdr" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "14px", marginBottom: "20px" }}>
            <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: 0 }}><ShieldCheck size={22} color="#16a34a"/> Detailed Evaluation Scorecard</h2>
            <button className="ti2-primary-btn" onClick={() => { setQuizState("idle"); setSelectedRecord(null); }}>← Return to Ledger</button>
          </div>

          <div className="pm-scorecard-hero" style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", display: "flex", alignItems: "center", gap: "24px", marginBottom: "24px" }}>
            <div className="pm-sc-score-circle" style={{ width: "90px", height: "90px", borderRadius: "50%", border: `6px solid ${CAT_C[cat] || "#2563eb"}`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flexShrink: 0, background: "#fff" }}>
              <strong style={{ fontSize: "24px", color: CAT_C[cat] || "#2563eb", fontWeight: "800" }}>{record.totalScore}</strong>
              <span style={{ fontSize: "10px", color: "#64748b", fontWeight: "600", marginTop: "-2px" }}>/100</span>
            </div>
            <div>
              <span className="pm-cat-badge-lg" style={{ background: CAT_B[cat], color: CAT_C[cat], display: "inline-block", padding: "4px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", marginBottom: "6px" }}>
                Final Category: Category {cat}
              </span>
              <p className="pm-sc-period" style={{ margin: "2px 0", fontSize: "14px", color: "#1e293b", fontWeight: "600" }}>{record.period} - Self-Compliance Audit</p>
              <p className="pm-sc-date" style={{ margin: "2px 0 0", fontSize: "12px", color: "#64748b" }}>Attempt Completed: {record.date} &nbsp;·&nbsp; Assessed By: {record.assessedBy || "Self Compliance"}</p>
            </div>
          </div>

          {/* Dynamic Performance Summary */}
          <div className="pm-performance-summary-box" style={{ background: "#eff6ff", borderLeft: "4px solid #2563eb", padding: "16px", borderRadius: "8px", marginBottom: "24px" }}>
            <h4 style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#1e3a8a", display: "flex", alignItems: "center", gap: "6px" }}>📊 Official Performance Evaluation Summary</h4>
            <p style={{ margin: 0, fontSize: "13px", color: "#1e3a8a", lineHeight: "1.5" }}>{performanceSummary}</p>
          </div>

          {/* Module Performance Details */}
          <div className="pm-sc-sections" style={{ marginBottom: "30px" }}>
            <h3 style={{ fontSize: "15px", color: "#0f172a", marginBottom: "16px", fontWeight: "700" }}>Safety Domain Competency Breakdown</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {record.sections.map(s => {
                const spc = Math.round((s.marks / s.outOf) * 100);
                const barColor = spc >= 80 ? "#16a34a" : spc >= 50 ? "#2563eb" : spc >= 26 ? "#d97706" : "#dc2626";
                return (
                  <div key={s.title} className="pm-sc-section-row" style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "13px" }}>
                    <span className="pm-sc-section-name" style={{ width: "260px", fontWeight: "600", color: "#334155" }}>{s.title}</span>
                    <div className="pm-sc-bar-wrap" style={{ flexGrow: 1, height: "8px", background: "#e2e8f0", borderRadius: "999px", overflow: "hidden" }}>
                      <div className="pm-sc-bar-fill" style={{ width: `${spc}%`, height: "100%", background: barColor, borderRadius: "999px" }} />
                    </div>
                    <span className="pm-sc-section-marks" style={{ width: "60px", textAlign: "right", fontWeight: "700", color: "#0f172a" }}>{s.marks}/{s.outOf}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Complete MCQ Question Review */}
          <div className="pm-mcq-review-panel" style={{ borderTop: "1px solid #e2e8f0", paddingTop: "24px" }}>
            <div className="pm-chart-header" style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Clock size={16} color="#475569"/>
              <h3 style={{ margin: 0, fontSize: "15px", color: "#0f172a", fontWeight: "700" }}>Complete Self-Assessment Question Review</h3>
            </div>
            <p className="pm-subtitle" style={{ fontSize: "12px", color: "#64748b", marginTop: "-10px", marginBottom: "20px" }}>
              Below is the detailed response evaluation for all 25 compulsory questions. Correct responses are highlighted in green; incorrect choices are highlighted in red.
            </p>

            <div className="pm-review-questions-list" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {TI_QUIZ.map((q, qIndex) => {
                const selectedOpt = quizAnswers ? quizAnswers[qIndex] : null;
                const isCorrect = selectedOpt === q.ans;

                return (
                  <div key={qIndex} className={`pm-review-question-card ${isCorrect ? "correct-card" : "wrong-card"}`}>
                    <div className="pm-rq-header">
                      <span className="pm-rq-number">Question {qIndex + 1}</span>
                      {isCorrect ? (
                        <span className="pm-rq-badge success">Correct (+4 Marks)</span>
                      ) : (
                        <span className="pm-rq-badge danger">Incorrect (0 Marks)</span>
                      )}
                    </div>
                    <h4 className="pm-rq-text">{q.q}</h4>

                    <div className="pm-rq-options-grid">
                      {q.opts.map((opt, oIdx) => {
                        const wasSelected = selectedOpt === oIdx;
                        const isOptCorrect = q.ans === oIdx;
                        
                        let optClass = "";
                        if (wasSelected) {
                          optClass = isCorrect ? "opt-selected-correct" : "opt-selected-wrong";
                        } else if (isOptCorrect) {
                          optClass = "opt-correct-unselected";
                        }

                        return (
                          <div key={oIdx} className={`pm-rq-option-item ${optClass}`}>
                            <span className="font-mono opt-prefix">{["A", "B", "C", "D"][oIdx]}</span>
                            <span className="opt-label-text">{opt}</span>
                            {wasSelected && (
                              <span className="opt-user-tag">{isCorrect ? "✓ Selected" : "✗ Selected"}</span>
                            )}
                            {!wasSelected && isOptCorrect && (
                              <span className="opt-correct-tag">✓ Correct Key</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    const avgScore = Math.round(tiAssessments.reduce((s,a)=>s+a.totalScore,0)/tiAssessments.length);
    return (
      <div className="ti2-card animate-fade-in" style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h2>Self-Assessments &amp; Timeline Ledger</h2>
            <p className="ti2-subtitle" style={{ margin: "2px 0 0" }}>Evaluations conducted by Area Operation Managers (AOM) and self safety audits.</p>
          </div>
          
          <div style={{ display: "flex", gap: "8px" }}>
            {isExamAssigned ? (
              <button 
                className="ti2-primary-btn" 
                onClick={startQuiz} 
                style={{ background: "#16a34a", animation: "pulse 2s infinite", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <Plus size={13}/> Take Assigned Safety Assessment
              </button>
            ) : (
              <button 
                className="ti2-primary-btn" 
                disabled 
                style={{ background: "#64748b", cursor: "not-allowed", opacity: 0.8, display: "flex", alignItems: "center", gap: "6px" }}
                title="Assessment access is locked until assigned by AOM"
              >
                <Lock size={13}/> Safety Exam Locked (Awaiting AOM)
              </button>
            )}
            <button className="ti2-view-profile-btn" onClick={() => exportAlert("PDF", "TI_Assessment_History_R Khan")}>
              <Download size={13}/> Export Timeline
            </button>
          </div>
        </div>

        {/* Real-time AOM Exam Assignment Banner */}
        {isExamAssigned ? (
          <div style={{ background: "#dcfce7", borderLeft: "4px solid #16a34a", padding: "16px", borderRadius: "8px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <ShieldCheck size={26} color="#16a34a" style={{ flexShrink: 0 }}/>
              <div>
                <strong style={{ color: "#14532d", fontSize: "14px", display: "block" }}>📝 Assigned Exam Dispatch Alert</strong>
                <span style={{ color: "#166534", fontSize: "12px", lineHeight: "1.4" }}>The Area Operation Manager (AOM) has assigned a standard 25-question Safety & Compliance Assessment for you. Please complete it now.</span>
              </div>
            </div>
            <button 
              className="ti2-primary-btn" 
              onClick={startQuiz} 
              style={{ background: "#16a34a", flexShrink: 0, padding: "8px 14px", fontSize: "12px", fontWeight: "700" }}
            >
              Start Assigned Exam
            </button>
          </div>
        ) : (
          <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderLeft: "4px solid #64748b", padding: "16px", borderRadius: "8px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
            <Lock size={22} color="#64748b" style={{ flexShrink: 0 }}/>
            <div>
              <strong style={{ color: "#334155", fontSize: "14px", display: "block" }}>🔒 No Pending Assigned Exams</strong>
              <span style={{ color: "#64748b", fontSize: "12px", lineHeight: "1.4" }}>You have no pending safety exams assigned to you by the AOM. Safety compliance assessments must be explicitly dispatched by the AOM before you can attempt them.</span>
            </div>
          </div>
        )}

        <div className="ti2-myassess-summary">
          {[
            { label:"Total Assessments", v: tiAssessments.length },
            { label:"Latest Score",      v: `${tiAssessments[0]?.totalScore || 0}/100` },
            { label:"Average Score",     v: `${avgScore || 0}/100` },
            { label:"Latest Category",   v: tiAssessments[0]?.category || "Grade A" },
          ].map(c=>(
            <div key={c.label} className="ti2-report-mini">
              <label>{c.label}</label>
              <strong style={c.label==="Latest Category"?{color:CAT_C[c.v]}:{}}>{c.v}</strong>
            </div>
          ))}
        </div>

        {/* Timeline representation list */}
        <div className="ti2-myassess-list">
          <div className="ti2-myassess-head">
            {["Period","Date","Total Score","Category","Assessed By","Status",""].map(h=><span key={h}>{h}</span>)}
          </div>
          {tiAssessments.map(sc=>{
            const cat=sc.category;
            return (
              <div key={sc.id} className="ti2-myassess-row" style={{ gridTemplateColumns: "1.3fr 1fr 1fr 1fr 1.8fr 1fr 0.8fr" }}>
                <span><strong>{sc.period}</strong></span>
                <span>{sc.date}</span>
                <span><strong>{sc.totalScore}/100</strong></span>
                <span><span className="ti2-badge" style={{background:CAT_B[cat],color:CAT_C[cat]}}>Cat. {cat}</span></span>
                <span style={{fontSize:12,color:"#64748b"}}>{sc.assessedBy}</span>
                <span><span className={`ti2-status-pill ti2-status-${sc.approvalStatus.toLowerCase()}`}>{sc.approvalStatus}</span></span>
                <span style={{color:"#2563eb",fontSize:12,fontWeight:600,cursor:"pointer"}} onClick={() => { setSelectedRecord(sc); setLatestQuizScore(sc.totalScore); setQuizAnswers(sc.userAnswers || generateTiMockResponses(sc.totalScore)); setQuizState("result"); }}>Review</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════
     RENDER: PME POSITION PAGE
  ═══════════════════════════════════════════ */