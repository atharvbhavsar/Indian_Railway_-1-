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

const MONTHLY = [
  { month: "Nov 25", assessments: 14, avgScore: 72, safetyAvg: 74 },
  { month: "Dec 25", assessments: 18, avgScore: 74, safetyAvg: 76 },
  { month: "Jan 26", assessments: 24, avgScore: 71, safetyAvg: 73 },
  { month: "Feb 26", assessments: 32, avgScore: 77, safetyAvg: 79 },
  { month: "Mar 26", assessments: 38, avgScore: 80, safetyAvg: 82 },
  { month: "Apr 26", assessments: 42, avgScore: 83, safetyAvg: 85 },
];

const TiTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="ti2-tooltip">
      <strong>{label}</strong>
      {payload.map(p => <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</div>)}
    </div>
  );
};

const getUserRisk = (u) => {
  return u.pmeStatus === "Overdue" || u.refStatus === "Expired" || u.score < 50 ? "High" : u.score >= 80 ? "Low" : "Medium";
};
const getCat = s => s >= 80 ? "A" : s >= 50 ? "B" : s >= 26 ? "C" : "D";


export function TrafficInspectorDashboard(props) {
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
    <div className="ti2-dashboard animate-fade-in">
      
      {/* ── Grouped analytics summary KPIs ── */}
      <div className="ti2-sum-cards">
        {[
          { label: "Total Stations",      v: myStations.length,      icon: <Building2 size={20} color="#2563eb"/>,     bg: "#eff6ff", onClick: () => goTo("stations") },
          { label: "Station Masters",     v: totalSMs,             icon: <Users size={20} color="#7c3aed"/>,         bg: "#f5f3ff", onClick: () => { goTo("allUsers"); setUserDesignationFilter("Station Master"); setUserStationFilter("All"); setUserCategoryFilter("All"); setUserRiskFilter("All"); setUserSearch(""); } },
          { label: "Total Pointsmen",     v: totalPM,              icon: <Users size={20} color="#0891b2"/>,         bg: "#ecfeff", onClick: () => { goTo("allUsers"); setUserDesignationFilter("Pointsman"); setUserStationFilter("All"); setUserCategoryFilter("All"); setUserRiskFilter("All"); setUserSearch(""); } },
          { label: "Pending Approvals",   v: pending,              icon: <ClipboardCheck size={20} color="#d97706"/>, bg: "#fef3c7", onClick: () => { goTo("reviewPM"); setReviewTab("Pending"); } },
          { label: "Average Score",       v: `${avgScoreAll}/100`, icon: <Activity size={20} color="#16a34a"/>,      bg: "#dcfce7", onClick: () => goTo("reports") },
          { label: "High-Risk Staff",     v: highRiskAll,          icon: <AlertTriangle size={20} color="#dc2626"/>, bg: "#fee2e2", onClick: () => { goTo("allUsers"); setUserRiskFilter("High"); setUserDesignationFilter("All"); setUserStationFilter("All"); setUserCategoryFilter("All"); setUserSearch(""); } },
        ].map(c=>(
          <article key={c.label} className="ti2-sum-card" style={{ cursor: c.onClick ? "pointer" : "default" }} onClick={c.onClick}>
            <div className="ti2-sum-icon" style={{ background: c.bg }}>{c.icon}</div>
            <div>
              <label>{c.label}</label>
              <strong>{c.v}</strong>
            </div>
          </article>
        ))}
      </div>

      {/* ── Smart Grouped Performance Cards ── */}
      <div className="ti2-highlights">
        {[
          { label: "Best Performing Station", st: bestSt,     icon: <TrendingUp size={15} color="#16a34a"/>,   accent: "#16a34a", bg: "#f0fdf4" },
          { label: "Worst Performing Station",st: worstSt,    icon: <TrendingDown size={15} color="#dc2626"/>, accent: "#dc2626", bg: "#fff1f2" },
          { label: "Most Improved Station",   st: myStations[9] || myStations[myStations.length - 1] || null, icon: <TrendingUp size={15} color="#2563eb"/>,   accent: "#2563eb", bg: "#eff6ff" },
          { label: "Highest Risk Station",    st: highRiskSt, icon: <AlertTriangle size={15} color="#d97706"/>, accent: "#d97706", bg: "#fffbeb" },
        ].map(h=>(
          <div key={h.label} className="ti2-highlight-card" style={{ borderTop: `3.5px solid ${h.accent}`, background: h.bg }}>
            <div className="ti2-hl-label" style={{ color: h.accent }}>{h.icon}{h.label}</div>
            <div className="ti2-hl-station">{h.st?.name || "Station"}</div>
            <div className="ti2-hl-meta">Avg {h.st?.avgScore || 0}/100 &nbsp;·&nbsp; {h.st?.highRisk || 0} high-risk staff</div>
          </div>
        ))}
      </div>

      {/* ── High-risk Station Heatmap (New Grouped Matrix) ── */}
      <div className="ti2-card">
        <div className="ti2-chart-hdr"><AlertTriangle size={15} color="#dc2626"/><h3>High-Risk Section Heatmap</h3></div>
        <p className="ti2-subtitle" style={{ marginBottom: 14 }}>Real-time compliance checklist status across all 12 stations under jurisdiction.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "10px" }}>
          {stationStats.map(st => {
            const level = st.highRisk >= 2 ? "High" : st.highRisk > 0 ? "Medium" : "Low";
            return (
              <div key={st.id} style={{ border: "1.5px dashed #cbd5e1", borderRadius: "10px", padding: "12px", background: "#f8fafc", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "13px", color: "#0f172a" }}>{st.code}</strong>
                  <span className="ti2-badge" style={{ background: RISK_B[level], color: RISK_C[level], scale: "0.9" }}>{level}</span>
                </div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>{st.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginTop: "6px" }}>
                  <span>Avg: <strong>{st.avgScore}%</strong></span>
                  <span>Compliance: <strong style={{ color: st.safetyPct >= 80 ? "#16a34a" : "#d97706" }}>{st.safetyPct}%</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Advanced Scrollable Charts & Station Filters ── */}
      <div className="ti2-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
          <div className="ti2-chart-hdr" style={{ margin: 0 }}>
            <BarChart3 size={16}/>
            <h3 style={{ margin: 0 }}>Station-wise Average Performance Score &amp; Safety Compliance</h3>
          </div>
          
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button 
              onClick={() => { setFullscreenChart("station"); setFsSearch(""); setFsCatFilter("All"); setFsRiskFilter("All"); }} 
              style={{
                background: "none", 
                border: "none", 
                color: "#2563eb", 
                fontSize: "11px", 
                fontWeight: "750", 
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center", 
                gap: "4px",
                padding: "4px 8px",
                borderRadius: "4px",
                transition: "all 0.15s"
              }}
              className="sm2-fullscreen-btn"
            >
              <Maximize2 size={11}/> View Full Screen
            </button>
            <div className="ti2-search-box" style={{ padding: "6px 12px", flex: "none", width: "180px" }}>
              <Search size={12}/><input style={{ fontSize: "12px" }} placeholder="Search station..." value={dbSearchQuery} onChange={e=>setDbSearchQuery(e.target.value)}/>
            </div>
            <select className="ti2-select" style={{ padding: "6px 12px", fontSize: "12px" }} value={dbStationFilter} onChange={e=>setDbStationFilter(e.target.value)}>
              <option value="All">All Stations</option>
              {myStations.map(st => <option key={st.id} value={st.name}>{st.code} - {st.name}</option>)}
            </select>
            <button className="ti2-view-profile-btn" onClick={() => exportAlert("Excel", "Station_Performance_Matrix")} style={{ padding: "7px 12px" }}>
              <Download size={12}/> Excel
            </button>
          </div>
        </div>
        
        {/* Horizontal scrollable chart container to avoid clutters */}
        <div style={{ overflowX: "auto", width: "100%" }}>
          <div style={{ minWidth: "800px", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stBarData} margin={{ top: 8, right: 10, left: -20, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b", fontWeight: 700 }}/>
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false}/>
                <Tooltip content={<TiTooltip/>}/>
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 12 }}/>
                <Bar dataKey="avgScore" name="Avg Performance Score (%)" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={38}/>
                <Bar dataKey="safetyPct" name="Safety Compliance Rate (%)" fill="#7c3aed" radius={[4, 4, 0, 0]} maxBarSize={38}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Monthly Assessment Trend and Risky Staff Breakdown ── */}
      <div className="ti2-chart-row-2col">
        <div className="ti2-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div className="ti2-chart-hdr" style={{ margin: 0 }}><TrendingUp size={15}/><h3>Compliance &amp; Assessment Trends</h3></div>
            <button 
              onClick={() => { setFullscreenChart("trend"); setFsSearch(""); setFsCatFilter("All"); setFsRiskFilter("All"); }} 
              style={{
                background: "none", 
                border: "none", 
                color: "#2563eb", 
                fontSize: "11px", 
                fontWeight: "750", 
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center", 
                gap: "4px",
                padding: "4px 8px",
                borderRadius: "4px",
                transition: "all 0.15s"
              }}
              className="sm2-fullscreen-btn"
            >
              <Maximize2 size={11}/> View Full Screen
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={MONTHLY} margin={{ top: 8, right: 10, left: -24, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }}/>
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false}/>
              <Tooltip content={<TiTooltip/>}/>
              <Line type="monotone" dataKey="assessments" name="Tests Taken" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }}/>
              <Line type="monotone" dataKey="safetyAvg" name="Safety compliance avg" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 3 }}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="ti2-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div className="ti2-chart-hdr" style={{ margin: 0 }}><BarChart3 size={15}/><h3>Staff Grade Distribution (Pointsmen Roster)</h3></div>
            <button 
              onClick={() => { setFullscreenChart("grade"); setFsSearch(""); setFsCatFilter("All"); setFsRiskFilter("All"); }} 
              style={{
                background: "none", 
                border: "none", 
                color: "#2563eb", 
                fontSize: "11px", 
                fontWeight: "750", 
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center", 
                gap: "4px",
                padding: "4px 8px",
                borderRadius: "4px",
                transition: "all 0.15s"
              }}
              className="sm2-fullscreen-btn"
            >
              <Maximize2 size={11}/> View Full Screen
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={78} dataKey="value" paddingAngle={4}>
                {pieData.map((e,i)=><Cell key={e.name} fill={PIE_C[i]}/>)}
              </Pie>
              <Tooltip formatter={(v,n,p)=>[`${v} Staff`,`Category ${p.payload.name}`]}/>
              <Legend formatter={(v,e)=>`Grade ${e.payload.name} — ${e.payload.value} staff`} iconType="circle" iconSize={9} wrapperStyle={{ fontSize: 12 }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );

  /* ═══════════════════════════════════════════
     RENDER: PROFILE
  ═══════════════════════════════════════════ */
}