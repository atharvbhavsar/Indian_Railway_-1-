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

const CAT_COLORS = { A: "#16a34a", B: "#2563eb", C: "#d97706", D: "#dc2626" };
const RISK_COLORS = { Low: "#16a34a", Medium: "#f59e0b", High: "#ef4444" };

const MONTHLY_TREND = [
  { month: "Nov 25", assessments: 14, safetyAvg: 74 },
  { month: "Dec 25", assessments: 18, safetyAvg: 76 },
  { month: "Jan 26", assessments: 24, safetyAvg: 73 },
  { month: "Feb 26", assessments: 32, safetyAvg: 79 },
  { month: "Mar 26", assessments: 38, safetyAvg: 82 },
  { month: "Apr 26", assessments: 42, safetyAvg: 85 },
];

const getCat = s => s >= 80 ? "A" : s >= 50 ? "B" : s >= 26 ? "C" : "D";

const catBadge = (cat) => (
  <span style={{ background: CAT_B[cat] || "#f1f5f9", color: CAT_C[cat] || "#334155", padding: "2px 8px", borderRadius: 4, fontWeight: 700, fontSize: 11 }}>
    Cat {cat}
  </span>
);
const riskBadge = (risk) => (
  <span style={{ background: RISK_B[risk] || "#f1f5f9", color: RISK_C[risk] || "#334155", padding: "2px 8px", borderRadius: 4, fontWeight: 700, fontSize: 11 }}>
    {risk} Risk
  </span>
);
const statusBadge = (status) => (
  <span style={{ background: "#f1f5f9", color: "#334155", padding: "2px 8px", borderRadius: 4, fontWeight: 600, fontSize: 11 }}>
    {status}
  </span>
);

const getUserRisk = (u) => {
  return u.pmeStatus === "Overdue" || u.refStatus === "Expired" || u.score < 50 ? "High" : u.score >= 80 ? "Low" : "Medium";
};


export function TrafficInspectorStationDetail(props) {
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

  
      const stStaff = users.filter(s => s.station === st.name).map(u => ({
        ...u,
        risk: getUserRisk(u)
      }));
      const pmList = stStaff.filter(s => s.role === "Pointsman" || s.role === "pointsmen");
      const smList = stStaff.filter(s => s.role === "Station Master" || s.role === "sm");
      
      const catCount = ["A", "B", "C", "D"].map(c => ({
        cat: `Cat ${c}`,
        count: stStaff.filter(s => (s.cat || getCat(s.score)) === c).length,
        fill: CAT_COLORS[c]
      }));

      const riskCount = [
        { name: "Low", value: stStaff.filter(s => s.risk === "Low").length, fill: "#16a34a" },
        { name: "Medium", value: stStaff.filter(s => s.risk === "Medium").length, fill: "#f59e0b" },
        { name: "High", value: stStaff.filter(s => s.risk === "High").length, fill: "#ef4444" },
      ].filter(r => r.value > 0);

      const trend = MONTHLY_TREND.map(m => ({ ...m, score: Math.max(60, st.score - 8 + MONTHLY_TREND.indexOf(m) * 2) }));

      return (
        <div className="sdom-fade">
          <div style={{ marginBottom: 20 }}>
            <button className="sdom-back-btn" onClick={() => { setView(null); setSelectedStation(null); }} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontWeight: 700 }}>
              <ArrowLeft size={16} /> Back to Stations
            </button>
          </div>

          <div className="sdom-station-header">
            <div className="sdom-station-header-meta">
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Station Analytics Dashboard</div>
              <div style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: 4 }}>{st.name}</div>
              <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Code: <b>{st.code}</b> &bull; Assigned TI: <b>{st.ti}</b></div>
              <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                <span className="sdom-badge" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>{st.smCount} Station Masters</span>
                <span className="sdom-badge" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>{st.pmCount} Pointsmen</span>
                <span className={`sdom-badge ${st.highRisk > 4 ? "sdom-badge-red" : "sdom-badge-green"}`}>{st.highRisk} High-Risk</span>
              </div>
            </div>
            <div className="sdom-station-header-stats">
              <div className="sdom-station-header-stat">
                <span className="val">{st.score}</span>
                <span className="lbl">Avg Score</span>
              </div>
              <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }} />
              <div className="sdom-station-header-stat">
                <span className="val">{st.safety}%</span>
                <span className="lbl">Safety</span>
              </div>
              <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }} />
              <div className="sdom-station-header-stat">
                <span className="val">{st.pending}</span>
                <span className="lbl">Pending</span>
              </div>
              <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }} />
              <div className="sdom-station-header-stat">
                <span className="val">{stStaff.length}</span>
                <span className="lbl">Total Staff</span>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16, marginBottom: 24 }}>
            {[
              { label: "Total Staff", val: stStaff.length },
              { label: "Pending Assessments", val: st.pending },
              { label: "Completed", val: stStaff.filter(s => s.status === "Approved" || s.status === "Submitted").length },
              { label: "High-Risk Pointsmen", val: pmList.filter(s => s.risk === "High").length },
              { label: "Safety Compliance", val: `${st.safety}%` },
            ].map(c => (
              <div key={c.label} className="sdom-stat-card">
                <div className="sdom-stat-value">{c.val}</div>
                <div className="sdom-stat-label">{c.label}</div>
              </div>
            ))}
          </div>

          <div className="sdom-row-2">
            <div className="sdom-chart-card">
              <div className="sdom-chart-title">Category/Grade Distribution</div>
              <div className="sdom-chart-subtitle">A/B/C/D breakdown of staff at this station</div>
              <div style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={catCount} barSize={46} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D9E2EC" />
                    <XAxis dataKey="cat" fontSize={12} tick={{ fill: "#102A43", fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <YAxis fontSize={11} tick={{ fill: "#627D98" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: "0.85rem", borderRadius: 6, border: "1px solid #D9E2EC" }} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
                    <Bar dataKey="count" radius={[5, 5, 0, 0]}>
                      {catCount.map((d, i) => <Cell key={i} fill={CAT_COLORS[Object.keys(CAT_COLORS)[i]]} />)}
                      <LabelList dataKey="count" position="top" style={{ fontSize: 12, fontWeight: 700, fill: "#102A43" }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="sdom-chart-card">
              <div className="sdom-chart-title">Risk Distribution</div>
              <div className="sdom-chart-subtitle">Staff risk level breakdown at this station</div>
              <div style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={riskCount} cx="50%" cy="50%" innerRadius={70} outerRadius={105}
                         dataKey="value" paddingAngle={4}
                         label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                         labelLine={false}>
                      {riskCount.map((d, i) => <Cell key={i} fill={RISK_COLORS[d.name]} />)}
                    </Pie>
                    <Legend wrapperStyle={{ fontSize: "0.82rem" }} />
                    <Tooltip contentStyle={{ fontSize: "0.85rem", borderRadius: 6, border: "1px solid #D9E2EC" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="sdom-row-1">
            <div className="sdom-chart-card">
              <div className="sdom-chart-title" style={{ marginBottom: 16 }}>Station Masters</div>
              <div className="sdom-table-wrap">
                <table className="sdom-table">
                  <thead><tr><th>Name</th><th>HRMS ID</th><th>Category</th><th>Last Score</th><th>Last Assessment</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {smList.length === 0 && <tr><td colSpan={7} style={{ textAlign: "center", color: "#94a3b8", padding: 24 }}>No Station Masters assigned</td></tr>}
                    {smList.map(s => (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 700 }}>{s.name}</td>
                        <td style={{ color: "#64748b", fontSize: "0.85rem" }}>{s.id}</td>
                        <td>{catBadge(s.cat || getCat(s.score))}</td>
                        <td style={{ fontWeight: 700 }}>{s.score}</td>
                        <td>{s.lastAssessDate || s.lastDate || "—"}</td>
                        <td>{statusBadge(s.status || "Active")}</td>
                        <td><button className="sdom-btn-ghost" onClick={() => setView({ type: "staffDetail", data: s, returnTo: "stationDetail", stationData: st })}>View Details</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="sdom-row-1">
            <div className="sdom-chart-card">
              <div className="sdom-chart-title" style={{ marginBottom: 16 }}>Pointsmen</div>
              <div className="sdom-table-wrap">
                <table className="sdom-table">
                  <thead><tr><th>Name</th><th>HRMS ID</th><th>Category</th><th>Risk Level</th><th>Latest Score</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {pmList.length === 0 && <tr><td colSpan={7} style={{ textAlign: "center", color: "#94a3b8", padding: 24 }}>No Pointsmen assigned</td></tr>}
                    {pmList.map(s => (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 700 }}>{s.name}</td>
                        <td style={{ color: "#64748b", fontSize: "0.85rem" }}>{s.id}</td>
                        <td>{catBadge(s.cat || getCat(s.score))}</td>
                        <td>{riskBadge(s.risk)}</td>
                        <td style={{ fontWeight: 700 }}>{s.score}</td>
                        <td>{statusBadge(s.status || "Active")}</td>
                        <td><button className="sdom-btn-ghost" onClick={() => setView({ type: "staffDetail", data: s, returnTo: "stationDetail", stationData: st })}>View Details</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    };

    if (view?.type === "staffDetail") return renderStaffDetail(view.data);
    if (view?.type === "stationDetail") return renderStationDetail(view.data);

    // Main Station List rendering (looks exactly like AOM's renderStations)
    const filtered = stationStats.map(st => {
      const smCount = users.filter(u => u.station === st.name && (u.role === "Station Master" || u.role === "sm")).length;
      const pmCount = users.filter(u => u.station === st.name && (u.role === "Pointsman" || u.role === "pointsmen")).length;
      const pmPending = myPmList.filter(p => p.station === st.name && p.status === "Pending").length;
      const smPending = mySmList.filter(s => s.station === st.name && s.status === "Pending").length;
      const tmPending = myTmList.filter(t => t.station === st.name && t.status === "Pending").length;
      const pending = pmPending + smPending + tmPending;
      
      return {
        ...st,
        ti: user.name || "TI R. Khan",
        smCount,
        pmCount,
        score: st.avgScore,
        safety: st.safetyPct,
        highRisk: st.highRisk,
        pending
      };
    }).filter(st => {
      const q = stSearch.toLowerCase();
      const matchesSearch = !q || st.name.toLowerCase().includes(q) || st.code.toLowerCase().includes(q);
      const matchesCat = stCatFilter === "All" || getCat(st.avgScore) === stCatFilter;
      return matchesSearch && matchesCat;
    });

    return (
      <div className="sdom-fade">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <h1 className="sdom-page-title">Stations</h1>
            <p className="sdom-page-subtitle">Full list of stations under your jurisdiction. Click a station to open its complete analytics dashboard.</p>
          </div>
          <button className="sdom-btn-primary" onClick={() => {
            setNewStationData({ name: "", code: "" });
            setShowAddStationModal(true);
          }} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Plus size={16} /> Add New Station
          </button>
        </div>

        <div className="sdom-filter-bar" style={{ display: "flex", gap: "12px", flexWrap: "nowrap", marginBottom: "16px" }}>
          <div className="sdom-filter-field" style={{ flex: 1 }}>
            <label>Search Station</label>
            <input value={stSearch} onChange={e => setStSearch(e.target.value)} placeholder="Station name or code..." />
          </div>
          <div className="sdom-filter-field" style={{ width: "200px" }}>
            <label>Category Filter</label>
            <select value={stCatFilter} onChange={e => setStCatFilter(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="A">Grade A Stations</option>
              <option value="B">Grade B Stations</option>
              <option value="C">Grade C Stations</option>
              <option value="D">Grade D Stations</option>
            </select>
          </div>
        </div>

        <div className="sdom-chart-card">
          <div className="sdom-table-wrap">
            <table className="sdom-table">
              <thead>
                <tr>
                  <th>Station Name</th>
                  <th>Code</th>
                  <th>Assigned TI</th>
                  <th>SMs</th>
                  <th>Pointsmen</th>
                  <th>Avg Score</th>
                  <th>Safety %</th>
                  <th>High Risk</th>
                  <th>Pending</th>
                  <th>Dashboard</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={10} style={{ textAlign: "center", color: "#64748b", padding: "24px" }}>
                      No stations found matching filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map(st => (
                    <tr key={st.id}>
                      <td style={{ fontWeight: 700 }}>{st.name}</td>
                      <td><span className="sdom-badge sdom-badge-blue">{st.code}</span></td>
                      <td>{st.ti}</td>
                      <td>{st.smCount}</td>
                      <td>{st.pmCount}</td>
                      <td style={{ fontWeight: 700, color: st.score >= 85 ? "#16a34a" : st.score >= 75 ? "#d97706" : "#dc2626" }}>{st.score}%</td>
                      <td>{st.safety}%</td>
                      <td>{st.highRisk > 3 ? <span style={{ color: "#dc2626", fontWeight: 700 }}>{st.highRisk}</span> : st.highRisk}</td>
                      <td>{st.pending}</td>
                      <td>
                        <button className="sdom-btn-primary" style={{ padding: "7px 14px", fontSize: "0.82rem" }} onClick={() => setSelectedStation(st)}>
                          Open Station Dashboard
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showAddStationModal && (
          <div className="sdom-modal-overlay" style={{ zIndex: 9999 }}>
            <div className="sdom-modal" style={{ width: "450px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#0B1F3A" }}>Add New Station</h3>
                <button type="button" onClick={() => setShowAddStationModal(false)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}>&times;</button>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div className="sdom-filter-field">
                  <label style={{ fontWeight: 600, fontSize: "0.8rem", color: "#334155" }}>Station Name</label>
                  <input type="text" value={newStationData.name} onChange={e => setNewStationData({ ...newStationData, name: e.target.value })} placeholder="e.g. Wardha Junction" />
                </div>
                <div className="sdom-filter-field">
                  <label style={{ fontWeight: 600, fontSize: "0.8rem", color: "#334155" }}>Station Code</label>
                  <input type="text" value={newStationData.code} onChange={e => setNewStationData({ ...newStationData, code: e.target.value })} placeholder="e.g. WR" />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
                <button className="sdom-btn-outline" onClick={() => setShowAddStationModal(false)}>Cancel</button>
                <button className="sdom-btn-primary" onClick={handleAddStationSubmit}>Create Station</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     RENDER: ROLE VIEW (Parity with AOM Pointsmen & Station Masters Directories)
     (Allows search, filter, edit, shift, and delete actions for scoped roles)
     (Provides full AOM design alignment using sdom.css tokens)
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */