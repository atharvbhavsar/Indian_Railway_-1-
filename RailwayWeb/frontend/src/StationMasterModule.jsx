import { useMemo, useState, useEffect } from "react";
import { useStationMasterState } from "./hooks/modules/useStationMasterState";
import {
  AlertTriangle,
  Award,
  BarChart3,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  FileBarChart2,
  Filter,
  Gauge,
  LogOut,
  Search,
  ShieldCheck,
  TrendingUp,
  UserCircle2,
  Users,
  XCircle,
  ArrowUpDown,
  Activity,
  Lock,
  Info,
  Shield,
  FileDown,
  Maximize2,
  Plus,
  ArrowLeft,
  Building2,
  Edit,
  Trash2,
  UserPlus,
  ArrowRightLeft,
  Clock
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar,
  LabelList
} from "recharts";
import "./sdom.css";

/* ─── NAV ─── */
const navItems = [
  { key: "dashboard",     label: "Dashboard",            icon: BarChart3 },
  { key: "profile",       label: "My Profile",           icon: UserCircle2 },
  { key: "pointsmen",     label: "Pointsmen",            icon: Users },
  { key: "assess",        label: "Assess Pointsman",     icon: ClipboardCheck },
  { key: "myAssessment",  label: "My Assessment (by TI)",icon: ClipboardCheck },
  { key: "reports",       label: "Reports & Analytics",  icon: FileBarChart2 }
];

/* ─── SM PROFILE ─── */
import { StationMasterPointsmanDetail } from './pages/modules/station_master/StationMasterPointsmanDetail';
import { StationMasterAssessForm } from './pages/modules/station_master/StationMasterAssessForm';
import { StationMasterMCQTest } from './pages/modules/station_master/StationMasterMCQTest';
import { StationMasterHistoryPage } from './pages/modules/station_master/StationMasterHistoryPage';
import { StationMasterAssessments } from './pages/modules/station_master/StationMasterAssessments';
import { StationMasterPointsmenList } from './pages/modules/station_master/StationMasterPointsmenList';
import { StationMasterPointsmanView } from './pages/modules/station_master/StationMasterPointsmanView';
import { StationMasterPointsmanModal } from './pages/modules/station_master/StationMasterPointsmanModal';
import { StationMasterPointsmenDetailAlt } from './pages/modules/station_master/StationMasterPointsmenDetailAlt';
import { StationMasterDashboard } from './pages/modules/station_master/StationMasterDashboard';
import { getCat, getCatColor, getCatBg, riskLevel, riskColor, formatQuarterPeriod } from './utils/scoreCalculator';
import { CustomTooltip } from './components/charts/CustomTooltip';
import { smProfile, initialPointsmen, pmAssessmentHistory, initialDrafts, YN_SECTIONS, defaultAssessForm, smTestQuestions, smAssessmentHistory, smSelfAssessment, monthlyTrend } from './data/mockStationMasterData';

function StationMasterModule({ user, onLogout }) {
  const state = useStationMasterState(user, onLogout);
  const {
    activatedTests,
    activeQIdx,
    activeTab,
    assessForm,
    assessLocked,
    assessTarget,
    computeScore,
    drafts,
    dynamicMonthlyTrend,
    filteredFsPointsmen,
    filteredPm,
    filteredReports,
    fsCategory,
    fsEndDate,
    fsRisk,
    fsSearch,
    fsStartDate,
    fullscreenChart,
    handleSubmitTestAttempt,
    history,
    lowPerformers,
    myAssessSelected,
    openAssessForm,
    openPmAdd,
    openPmDetail,
    openPmEdit,
    openPmShift,
    pageMode,
    pieData,
    pmF,
    pmFilter,
    pmModal,
    pointsmen,
    removePm,
    repApplied,
    repF,
    reportFilter,
    savePmModal,
    selectedPm,
    selectedReportUserId,
    setActivatedTests,
    setActiveQIdx,
    setActiveTab,
    setAssessForm,
    setAssessLocked,
    setAssessTarget,
    setDrafts,
    setFsCategory,
    setFsEndDate,
    setFsRisk,
    setFsSearch,
    setFsStartDate,
    setFullscreenChart,
    setHistory,
    setMyAssessSelected,
    setPageMode,
    setPmF,
    setPmFilter,
    setPmModal,
    setPointsmen,
    setRepApplied,
    setRepF,
    setReportFilter,
    setSelectedPm,
    setSelectedReportUserId,
    setSmMcqTest,
    setStatusMsg,
    setSubmittedAssessments,
    setTestAssigned,
    setTestResponses,
    setViewingPm,
    setViewingStaff,
    smId,
    smMcqTest,
    smName,
    startTestAttempt,
    stats,
    statusMsg,
    submitAssessment,
    submittedAssessments,
    switchTab,
    testAssigned,
    testResponses,
    toggleYN,
    viewingPm,
    viewingStaff,
    stationSms,
    assignedTi
  } = state;

  /* ════ RENDERERS ════ */

  /* ── DASHBOARD ── */
  const renderDashboard = () => (
    <StationMasterDashboard 
      stats={stats}
      pieData={pieData}
      lowPerformers={lowPerformers}
      fullscreenChart={fullscreenChart}
      setFullscreenChart={setFullscreenChart}
      fsSearch={fsSearch}
      setFsSearch={setFsSearch}
      fsCategory={fsCategory}
      setFsCategory={setFsCategory}
      fsRisk={fsRisk}
      setFsRisk={setFsRisk}
      fsStartDate={fsStartDate}
      setFsStartDate={setFsStartDate}
      fsEndDate={fsEndDate}
      setFsEndDate={setFsEndDate}
      filteredFsPointsmen={filteredFsPointsmen}
      dynamicMonthlyTrend={dynamicMonthlyTrend}
      pmAssessmentHistory={[]}
      pointsmen={pointsmen}
      smId={smId}
      drafts={drafts}
      viewingStaff={viewingStaff}
      setViewingStaff={setViewingStaff}
      setActiveTab={setActiveTab}
      openPmDetail={openPmDetail}
      user={user}
      stationSms={stationSms}
      assignedTi={assignedTi}
    />
  );

  /* ── PROFILE ── */
  const renderProfile = () => (
    <StationMasterPointsmanDetail
      smName={smName}
      smId={smId}
      smProfile={stationSms.find(s => s.hrmsId === smId) || user}
      history={history}
    />
  );

  /* ── POINTSMEN LIST ── */
  const renderPointsmen = () => (
    <StationMasterPointsmenList
      viewingPm={viewingPm}
      setViewingPm={setViewingPm}
      openPmAdd={openPmAdd}
      pmF={pmF}
      setPmF={setPmF}
      filteredPm={filteredPm}
      smProfile={user}
      openPmEdit={openPmEdit}
      openPmShift={openPmShift}
      removePm={removePm}
      renderPointsmenDetail={renderPointsmenDetail}
    />
  );

  const renderPointsmenDetail = (s) => (
    <StationMasterPointsmenDetailAlt
      s={s}
      setViewingPm={setViewingPm}
      smProfile={user}
    />
  );

  const renderPointsmenModal = () => (
    <StationMasterPointsmanModal
      pmModal={pmModal}
      setPmModal={setPmModal}
      smProfile={user}
      savePmModal={savePmModal}
    />
  );

  /* ── PM DETAIL ── */
  const renderPmDetail = (pm) => (
    <StationMasterPointsmanView
      pm={pm}
      setPageMode={setPageMode}
      smProfile={user}
      pmAssessmentHistory={[]}
      setInspectRecord={setInspectRecord}
    />
  );

  /* ── ASSESS POINTSMAN ── */
  const renderAssess = () => (
    <StationMasterAssessForm
      pageMode={pageMode}
      assessTarget={assessTarget}
      assessForm={assessForm}
      setAssessForm={setAssessForm}
      assessLocked={assessLocked}
      setPageMode={setPageMode}
      setActivatedTests={setActivatedTests}
      toggleYN={toggleYN}
      computeScore={computeScore}
      submitAssessment={submitAssessment}
      drafts={drafts}
      openAssessForm={openAssessForm}
      submittedAssessments={submittedAssessments}
    />
  );

  /* ── MY ASSESSMENT (by TI) — history list + detail view ── */
  const renderMyAssessment = () => (
    <StationMasterAssessments
      myAssessSelected={myAssessSelected}
      setMyAssessSelected={setMyAssessSelected}
      smMcqTest={smMcqTest}
      smSelfAssessment={null}
      testAssigned={testAssigned}
      smAssessmentHistory={history}
      startTestAttempt={startTestAttempt}
      smId={smId}
    />
  );

  /* ─── ONLINE MCQ SAFETY & RULE EXAM ATTEMPT SCREEN ─── */
  const renderTakeTest = () => (
    <StationMasterMCQTest
      activeQIdx={activeQIdx}
      setActiveQIdx={setActiveQIdx}
      testResponses={testResponses}
      setTestResponses={setTestResponses}
      setPageMode={setPageMode}
      smName={smName}
      smId={smId}
      handleSubmitTestAttempt={handleSubmitTestAttempt}
    />
  );

  const handleExportCSV = () => {
    const headers = ["Employee Name", "HRMS ID", "Score", "Grade", "Safety Score", "Risk Level", "Approval Status"];
    const csvRows = filteredReports.map(p => [
      `"${p.name || ""}"`,
      `"${p.hrmsId || ""}"`,
      `"${p.lastScore}/100"`,
      `"Cat. ${getCat(p.lastScore)}"`,
      `"${p.safetyScore}%"`,
      `"${riskLevel(p)}"`,
      `"${p.approvalStatus || ""}"`
    ]);
    const csvContent = [headers.join(","), ...csvRows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `SM_Pointsmen_Reports_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ── REPORTS ── */
  const renderReports = () => (
    <StationMasterHistoryPage
      selectedReportUserId={selectedReportUserId}
      setSelectedReportUserId={setSelectedReportUserId}
      repF={repF}
      setRepF={setRepF}
      pointsmen={pointsmen}
      smProfile={user}
    />
  );

  /* ─── Dispatcher ─── */
  const renderContent = () => {
    if (pageMode === "takeTest") return renderTakeTest();

    switch (activeTab) {
      case "dashboard":    return renderDashboard();
      case "profile":      return renderProfile();
      case "pointsmen":    return renderPointsmen();
      case "assess":       return renderAssess();
      case "myAssessment": return renderMyAssessment();
      case "reports":      return renderReports();
      default: return renderDashboard();
    }
  };

  /* ─── Shell ─── */
  return (
    <div className="sm2-layout">
      <input type="checkbox" id="sdom-sidebar-toggle" className="sdom-sidebar-checkbox" style={{ display: "none" }} />
      <label htmlFor="sdom-sidebar-toggle" className="sdom-sidebar-close-backdrop"></label>
      <header className="sm2-topbar">
        <label htmlFor="sdom-sidebar-toggle" className="sdom-sidebar-toggle-btn" style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px", background: "none", border: "none", color: "#ffffff", marginRight: "12px" }}>
          &#9776;
        </label>
        <div className="sm2-topbar-brand">
          <div className="sm2-topbar-logo" style={{ background: "#1E3A5F", color: "#ffffff", fontWeight: "800", fontSize: "0.95rem", padding: "0" }}><img src="/logo.webp" alt="IR Logo" style={{ width: "100%", height: "100%", borderRadius: "inherit", objectFit: "cover" }} /></div>
          <div>
            <h1>Indian Railway Evaluation System</h1>
            <p>Station Master<span className="desktop-only-txt"> Module</span></p>
          </div>
        </div>
        <div className="sm2-user-strip">
          <div className="sm2-user-avatar">{smName.charAt(0)}</div>
          <div>
            <strong>{smName}</strong>
            <span>{smId}</span>
          </div>
          <button className="sm2-logout-btn" onClick={onLogout}>
            <LogOut size={15}/> Logout
          </button>
        </div>
      </header>

      <div className="sm2-shell">
        <aside className="sm2-sidebar">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.key}
                className={`sm2-nav-item ${activeTab === item.key ? "active" : ""}`}
                onClick={() => switchTab(item.key)}>
                <Icon size={17}/>
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        <main className="sm2-main">
          {statusMsg && (
            <div className="sm2-status-banner">
              <CheckCircle2 size={14}/> {statusMsg}
              <button className="sm2-dismiss" onClick={() => setStatusMsg("")}>×</button>
            </div>
          )}
            <div className="sm2-page-wrap">
              {renderContent()}
            </div>
          </main>
        </div>

        {/* ══════════════════════════════════════════
            FULLSCREEN ANALYTICS MODAL
        ══════════════════════════════════════════ */}
        {fullscreenChart && (
          <div className="sm2-fullscreen-modal">
            {/* ── Modal Header ── */}
            <div className="sm2-fullscreen-header">
              <div style={{ display: "flex", alignItems: 12, gap: 12 }}>
                <div className="sm2-fullscreen-icon-wrap">
                  {fullscreenChart === "monthly"     && <TrendingUp size={18} color="#93c5fd"/>}
                  {fullscreenChart === "safety"      && <Activity   size={18} color="#a78bfa"/>}
                  {fullscreenChart === "performance" && <BarChart3  size={18} color="#34d399"/>}
                </div>
                <div>
                  <h2>
                    {fullscreenChart === "monthly"     && "Monthly Assessment Trend — Deep Dive"}
                    {fullscreenChart === "safety"      && "Safety Compliance Trend — Deep Dive"}
                    {fullscreenChart === "performance" && "Performance Distribution — Deep Dive"}
                  </h2>
                  <p>
                    Indian Railway Evaluation System · Station Master Analytics
                  </p>
                </div>
              </div>
              <button className="sm2-fullscreen-close-btn" onClick={() => setFullscreenChart(null)}>
                ✕ Close
              </button>
            </div>

            {/* ── Filter Bar ── */}
            <div className="sm2-fullscreen-filter-bar">
              <span className="sm2-fs-filter-tag">FILTERS</span>
              <input
                type="text" placeholder="Search staff name / HRMS…"
                value={fsSearch} onChange={e => setFsSearch(e.target.value)}
                className="sm2-fs-input"
              />
              <input type="date" value={fsStartDate} onChange={e => setFsStartDate(e.target.value)} className="sm2-fs-input" />
              <span className="sm2-fs-label">to</span>
              <input type="date" value={fsEndDate} onChange={e => setFsEndDate(e.target.value)} className="sm2-fs-input" />
              <select value={fsCategory} onChange={e => setFsCategory(e.target.value)} className="sm2-fs-select">
                <option value="All">All Categories</option>
                <option value="A">Category A</option>
                <option value="B">Category B</option>
                <option value="C">Category C</option>
                <option value="D">Category D</option>
              </select>
              <select value={fsRisk} onChange={e => setFsRisk(e.target.value)} className="sm2-fs-select">
                <option value="All">All Risks</option>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
              </select>
              <button onClick={() => { setFsSearch(""); setFsStartDate(""); setFsEndDate(""); setFsCategory("All"); setFsRisk("All"); }} className="sm2-fs-reset-btn">
                Reset
              </button>
              <div className="sm2-fs-counter">
                Showing <strong>{filteredFsPointsmen.length}</strong> of {pointsmen.length} staff
              </div>
            </div>

            {/* ── Main Content ── */}
            <div className="sm2-fullscreen-content">

              {/* KPI Summary Row */}
              <div className="sm2-fs-kpi-row">
                {[
                  { label: "Avg Score", value: filteredFsPointsmen.length ? Math.round(filteredFsPointsmen.reduce((s,p)=>s+p.lastScore,0)/filteredFsPointsmen.length) + "%" : "—", color: "#60a5fa", glowColor: "rgba(96,165,250,0.15)" },
                  { label: "Avg Safety", value: filteredFsPointsmen.length ? Math.round(filteredFsPointsmen.reduce((s,p)=>s+p.safetyScore,0)/filteredFsPointsmen.length) + "%" : "—", color: "#a78bfa", glowColor: "rgba(167,139,250,0.15)" },
                  { label: "High Risk", value: filteredFsPointsmen.filter(p=>riskLevel(p)==="High").length, color: "#f87171", glowColor: "rgba(248,113,113,0.15)" },
                  { label: "Cat A Staff", value: filteredFsPointsmen.filter(p=>getCat(p.lastScore)==="A").length, color: "#34d399", glowColor: "rgba(52,211,153,0.15)" },
                  { label: "Fit (PME)", value: filteredFsPointsmen.filter(p=>p.pmeStatus==="Fit").length, color: "#fbbf24", glowColor: "rgba(251,191,36,0.15)" },
                ].map(k => (
                  <div key={k.label} className="sm2-fs-kpi-card" style={{ "--glow": k.glowColor }}>
                    <div className="sm2-fs-kpi-value" style={{ color: k.color }}>{k.value}</div>
                    <div className="sm2-fs-kpi-label">{k.label}</div>
                  </div>
                ))}
              </div>

              {/* Large Chart */}
              <div className="sm2-fs-chart-container">
                <h3>
                  {fullscreenChart === "monthly"     && "📈 Monthly Avg Score & Assessment Volume"}
                  {fullscreenChart === "safety"      && "🛡️ Monthly Safety Compliance Avg (%)"}
                  {fullscreenChart === "performance" && "🏅 Staff Category Distribution"}
                </h3>
                <div className="sm2-fs-chart-wrapper">
                  <ResponsiveContainer width="100%" height={320}>
                    {fullscreenChart === "monthly" ? (
                      <LineChart data={dynamicMonthlyTrend} margin={{top:10,right:30,left:-10,bottom:0}}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)"/>
                        <XAxis dataKey="month" tick={{fontSize:12,fill:"#64748b"}} stroke="rgba(0,0,0,0.1)"/>
                        <YAxis tick={{fontSize:12,fill:"#64748b"}} stroke="rgba(0,0,0,0.1)"/>
                        <Tooltip contentStyle={{background:"#ffffff",border:"1px solid #cbd5e1",borderRadius:8,color:"#0f172a",fontSize:12}}/>
                        <Legend wrapperStyle={{fontSize:12,color:"#4b5563"}}/>
                        <Line type="monotone" dataKey="avgScore" name="Avg Score" stroke="#2563eb" strokeWidth={3} dot={{r:5,fill:"#2563eb"}} activeDot={{r:7}}/>
                        <Line type="monotone" dataKey="assessments" name="Assessments" stroke="#16a34a" strokeWidth={2.5} dot={{r:4,fill:"#16a34a"}} strokeDasharray="6 3"/>
                      </LineChart>
                    ) : fullscreenChart === "safety" ? (
                      <BarChart data={dynamicMonthlyTrend} margin={{top:10,right:30,left:-10,bottom:0}}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)"/>
                        <XAxis dataKey="month" tick={{fontSize:12,fill:"#64748b"}} stroke="rgba(0,0,0,0.1)"/>
                        <YAxis domain={[0,100]} tick={{fontSize:12,fill:"#64748b"}} stroke="rgba(0,0,0,0.1)"/>
                        <Tooltip contentStyle={{background:"#ffffff",border:"1px solid #cbd5e1",borderRadius:8,color:"#0f172a",fontSize:12}}/>
                        <Legend wrapperStyle={{fontSize:12,color:"#4b5563"}}/>
                        <Bar dataKey="safetyAvg" name="Safety Avg %" fill="#7c3aed" radius={[6,6,0,0]}/>
                        <Bar dataKey="avgScore"  name="Score Avg %"  fill="#2563eb" radius={[6,6,0,0]}/>
                      </BarChart>
                    ) : (
                      <PieChart>
                        <Pie
                          data={(() => {
                            const counts = {A:0,B:0,C:0,D:0};
                            filteredFsPointsmen.forEach(p => { counts[getCat(p.lastScore)]++; });
                            return Object.entries(counts).filter(([,c])=>c>0).map(([cat,count])=>({name:`Cat. ${cat}`,value:count}));
                          })()}
                          cx="50%" cy="50%" innerRadius={90} outerRadius={140}
                          dataKey="value" paddingAngle={4}
                        >
                          {["#2563eb","#16a34a","#f59e0b","#dc2626"].map((c,i) => <Cell key={i} fill={c}/>)}
                        </Pie>
                        <Tooltip contentStyle={{background:"#ffffff",border:"1px solid #cbd5e1",borderRadius:8,color:"#0f172a",fontSize:12}}/>
                        <Legend wrapperStyle={{fontSize:13,color:"#4b5563"}} iconType="circle" iconSize={10}/>
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Low Performers Deep-Dive Table */}
              <div className="sm2-fs-low-perf-section">
                <h3>
                  <span style={{color:"#f87171",marginRight:6}}>⚠</span> Low Performing Staff — Direct Intervention Required
                </h3>
                <div className="sm2-fs-grid">
                  {[...filteredFsPointsmen]
                    .sort((a,b)=>a.lastScore-b.lastScore)
                    .slice(0,6)
                    .map(p => {
                      const cat  = getCat(p.lastScore);
                      const risk = riskLevel(p);
                      const rColor = risk==="High"?"#f87171":risk==="Medium"?"#fbbf24":"#34d399";
                      return (
                        <div key={p.id} className="sm2-fs-card" style={{ "--border-color": rColor }} onClick={() => {
                          setFullscreenChart(null);
                          openPmDetail(p);
                          setActiveTab("pointsmen");
                        }}>
                          <div className="sm2-fs-card-header">
                            <div>
                              <div className="sm2-fs-card-name">{p.name}</div>
                              <div className="sm2-fs-card-id">{p.hrmsId}</div>
                            </div>
                            <span className="sm2-fs-card-cat" style={{ background: CAT_BG[cat] || "#f1f5f9", color: CAT_COLOR[cat] || "#64748b" }}>
                              {cat === "Untested" ? "Untested" : `Cat. ${cat}`}
                            </span>
                          </div>
                          <div className="sm2-fs-card-meta-row">
                            <span className="sm2-fs-card-risk-badge" style={{
                              background: risk==="High"?"rgba(248,113,113,0.15)":risk==="Medium"?"rgba(251,191,36,0.15)":"rgba(52,211,153,0.15)",
                              color: rColor
                            }}>{risk} Risk</span>
                            <span className="sm2-fs-card-incident-lbl">{p.incidents} incident{p.incidents!==1?"s":""}</span>
                          </div>
                          <div className="sm2-fs-card-progress-item">
                            <div className="sm2-fs-card-progress-lbl">
                              <span>Score</span>
                              <span style={{color:p.lastScore<50?"#f87171":"#fbbf24"}}>{p.lastScore}/100</span>
                            </div>
                            <div className="sm2-fs-card-progress-track">
                              <div className="sm2-fs-card-progress-bar" style={{ width: `${p.lastScore}%`, background: p.lastScore<50?"#f87171":"#fbbf24" }}/>
                            </div>
                          </div>
                          <div className="sm2-fs-card-progress-item" style={{ marginTop: 10 }}>
                            <div className="sm2-fs-card-progress-lbl">
                              <span>Safety Score</span>
                              <span style={{color:p.safetyScore<60?"#f87171":"#a78bfa"}}>{p.safetyScore}%</span>
                            </div>
                            <div className="sm2-fs-card-progress-track">
                              <div className="sm2-fs-card-progress-bar" style={{ width: `${p.safetyScore}%`, background: p.safetyScore<60?"#f87171":"#a78bfa" }}/>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {filteredFsPointsmen.length === 0 && (
                  <p style={{color:"#64748b",fontSize:13,gridColumn:"1/-1",textAlign:"center",padding:"24px 0"}}>No staff match the current filters.</p>
                )}
              </div>
            </div>

          </div>{/* end content */}
        </div>
      )}
      {renderPointsmenModal()}
    </div>
  );
}

export default StationMasterModule;
