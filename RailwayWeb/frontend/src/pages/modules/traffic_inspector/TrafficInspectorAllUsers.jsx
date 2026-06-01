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


export function TrafficInspectorAllUsers(props) {
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
    <div className="ti2-page-body animate-fade-in">
      <div className="ti2-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h2>All Users &amp; Roster Management</h2>
            <p className="ti2-subtitle" style={{ margin: "2px 0 0" }}>Manage personnel, assign roles, edit details, and transfer station masters and pointsmen.</p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="ti2-primary-btn" onClick={openAddUserModal} style={{ height: "36px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Plus size={13}/> Add User
            </button>
            <button className="ti2-view-profile-btn" onClick={() => exportAlert("Excel", "Section_Staff_Master_List")} style={{ height: "36px" }}>
              <FileSpreadsheet size={13}/> Export Excel Ledger
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="ti2-filter-row">
          <div className="ti2-search-box" style={{ flex: 1.5 }}>
            <Search size={13}/><input placeholder="Search user name, ID, or contact number…" value={userSearch} onChange={e=>setUserSearch(e.target.value)}/>
          </div>
          <select className="ti2-select" value={userStationFilter} onChange={e=>setUserStationFilter(e.target.value)}>
            <option value="All">All Stations</option>
            {myStations.map(st => <option key={st.id} value={st.name}>{st.name}</option>)}
          </select>
          <select className="ti2-select" value={userDesignationFilter} onChange={e=>setUserDesignationFilter(e.target.value)}>
            <option value="All">All Roles</option>
            <option value="Station Master">Station Masters</option>
            <option value="Pointsman">Pointsmen</option>
          </select>
          <select className="ti2-select" value={userCategoryFilter} onChange={e=>setUserCategoryFilter(e.target.value)}>
            <option value="All">All Grades</option>
            <option value="A">Grade A</option>
            <option value="B">Grade B</option>
            <option value="C">Grade C</option>
            <option value="D">Grade D</option>
          </select>
          <select className="ti2-select" value={userRiskFilter} onChange={e=>setUserRiskFilter(e.target.value)}>
            <option value="All">All Risks</option>
            <option value="High">High Risk Only</option>
            <option value="Non-High">Normal Compliance</option>
          </select>
        </div>

        {/* Main Users Table */}
        <div className="ti2-table-wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1.2fr 1.4fr 0.8fr 0.8fr 0.8fr 0.8fr 1.5fr", gap: "8px", padding: "10px 16px", background: "#f8fafc", borderBottom: "1.5px solid #e2e8f0", fontWeight: "700", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4px" }}>
            <span>Name</span>
            <span>Staff ID</span>
            <span>Designation</span>
            <span>Station</span>
            <span>Category</span>
            <span>PME</span>
            <span>REF</span>
            <span>Score</span>
            <span>Actions</span>
          </div>

          {filteredUsers.length === 0 && <p className="ti2-empty">No railway personnel matching filters in this section.</p>}

          {filteredUsers.map(u => {
            const grade = getCat(u.score);
            return (
              <div key={u.id} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1.2fr 1.4fr 0.8fr 0.8fr 0.8fr 0.8fr 1.5fr", gap: "8px", padding: "12px 16px", borderBottom: "1px solid #f1f5f9", fontSize: "13px", alignItems: "center" }}>
                <div>
                  <strong>{u.name}</strong>
                  <div style={{ fontSize: "10px", color: "#64748b" }}>{u.contact}</div>
                </div>
                <span style={{ fontFamily: "monospace" }}>{u.id}</span>
                <span><span className="ti2-pill-grey" style={{ fontSize: "10px", fontWeight: "700" }}>{u.designation}</span></span>
                <strong>{u.station}</strong>
                <span><span className="ti2-badge" style={{ background: CAT_B[grade], color: CAT_C[grade] }}>Grade {grade}</span></span>
                <span style={{ color: u.pmeStatus === "Fit" ? "#16a34a" : "#dc2626", fontWeight: "600" }}>{u.pmeStatus}</span>
                <span style={{ color: u.refStatus === "Cleared" ? "#16a34a" : "#dc2626", fontWeight: "600" }}>{u.refStatus}</span>
                <strong>{u.score}%</strong>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button className="ti2-view-profile-btn" onClick={() => handleEditUser(u)} style={{ padding: "4px 8px" }} title="Edit Personnel details">
                    <Edit size={11}/>
                  </button>
                  <button className="ti2-link-btn-sm" onClick={() => handleTransferClick(u)} style={{ padding: "4px 8px" }} title="Transfer station">
                    <RefreshCw size={11}/>
                  </button>
                  <button className="ti2-danger-btn" onClick={() => handleDeleteUser(u.id, u.name)} style={{ padding: "4px 8px" }} title="Revoke access clearance">
                    <Trash2 size={11}/>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(15,23,42,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <form onSubmit={saveEditedUser} className="ti2-card" style={{ width: "450px", margin: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div className="ti2-card-hdr" style={{ marginBottom: 0 }}>
              <h3>Edit Personnel Details</h3>
              <button type="button" onClick={() => setEditingUser(null)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>×</button>
            </div>

            <div className="ti2-form-field">
              <label>Full Name</label>
              <input type="text" value={editingUser.name} onChange={e=>setEditingUser({...editingUser, name: e.target.value})} required/>
            </div>
            
            <div className="ti2-form-field">
              <label>Contact Mobile</label>
              <input type="text" value={editingUser.contact} onChange={e=>setEditingUser({...editingUser, contact: e.target.value})} required/>
            </div>

            <div className="ti2-form-field">
              <label>Role / Assignment</label>
              <select value={editingUser.role} onChange={e=>setEditingUser({...editingUser, role: e.target.value, designation: e.target.value})} required>
                <option value="Station Master">Station Master</option>
                <option value="Pointsman">Pointsman</option>
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div className="ti2-form-field">
                <label>PME Status</label>
                <select value={editingUser.pmeStatus} onChange={e=>setEditingUser({...editingUser, pmeStatus: e.target.value})} required>
                  <option>Fit</option>
                  <option>Unfit</option>
                  <option>Overdue</option>
                </select>
              </div>
              <div className="ti2-form-field">
                <label>REF Status</label>
                <select value={editingUser.refStatus} onChange={e=>setEditingUser({...editingUser, refStatus: e.target.value})} required>
                  <option>Cleared</option>
                  <option>Pending</option>
                  <option>Expired</option>
                </select>
              </div>
            </div>

            <div className="ti2-review-actions" style={{ marginTop: "10px" }}>
              <button type="button" className="ti2-ghost-btn" onClick={() => setEditingUser(null)}>Cancel</button>
              <button type="submit" className="ti2-primary-btn">Save Changes</button>
            </div>
          </form>
        </div>
      )}

      {/* Transfer User Modal */}
      {transferringUser && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(15,23,42,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="ti2-card" style={{ width: "420px", margin: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="ti2-card-hdr" style={{ marginBottom: 0 }}>
              <h3>Transfer Personnel Deployment</h3>
              <button type="button" onClick={() => setTransferringUser(null)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>×</button>
            </div>

            <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
              Transfer <strong>{transferringUser.name}</strong> from <strong>{transferringUser.station}</strong> to another station section.
            </p>

            <div className="ti2-form-field">
              <label>Select Deployment Station</label>
              <select value={transferringUser.targetStation} onChange={e=>setTransferringUser({...transferringUser, targetStation: e.target.value})}>
                {myStations.map(st => <option key={st.id} value={st.name}>{st.name}</option>)}
              </select>
            </div>

            <div className="ti2-review-actions" style={{ marginTop: "8px" }}>
              <button type="button" className="ti2-ghost-btn" onClick={() => setTransferringUser(null)}>Cancel</button>
              <button type="button" className="ti2-primary-btn" onClick={confirmTransfer}>Confirm Transfer</button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(15,23,42,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <form onSubmit={handleAddUserSubmit} className="ti2-card" style={{ width: "480px", margin: "16px", display: "flex", flexDirection: "column", gap: "14px", border: "1px solid #cbd5e1", maxHeight: "90vh", overflowY: "auto" }}>
            <div className="ti2-card-hdr" style={{ marginBottom: 0 }}>
              <h3>Add New Railway Personnel</h3>
              <button type="button" onClick={() => setShowAddUserModal(false)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}>×</button>
            </div>

            <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
              Log a new Station Master or Pointsman under your jurisdiction. All sections (PME, REF, and Dashboard stats) will be dynamically updated in real-time.
            </p>

            <div className="ti2-form-field">
              <label>Full Name <span style={{ color: "#dc2626" }}>*</span></label>
              <input 
                type="text" 
                value={newUserData.name} 
                onChange={e => setNewUserData({ ...newUserData, name: e.target.value })} 
                placeholder="e.g. Ramesh Kumar" 
                required 
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "10px" }}>
              <div className="ti2-form-field">
                <label>Staff HRMS ID <span style={{ color: "#dc2626" }}>*</span></label>
                <input 
                  type="text" 
                  value={newUserData.id} 
                  onChange={e => setNewUserData({ ...newUserData, id: e.target.value })} 
                  placeholder="e.g. 2405 (will auto-prepend)" 
                  required 
                />
              </div>
              <div className="ti2-form-field">
                <label>Prefix Preview</label>
                <div style={{ padding: "9px 12px", border: "1.5px dashed #cbd5e1", background: "#f8fafc", borderRadius: "9px", fontSize: "13px", fontWeight: "700", textAlign: "center", color: "#2563eb", marginTop: "1px" }}>
                  {newUserData.role === "Station Master" ? "SM_" : "PM_"}{newUserData.id.replace(/^SM_|^PM_/i, "")}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div className="ti2-form-field">
                <label>Role / Assignment <span style={{ color: "#dc2626" }}>*</span></label>
                <select 
                  value={newUserData.role} 
                  onChange={e => {
                    const selectedRole = e.target.value;
                    const defaultDesig = selectedRole === "Station Master" ? "Station Master" : "Pointsman Grade I";
                    setNewUserData({ ...newUserData, role: selectedRole, designation: defaultDesig });
                  }} 
                  required
                >
                  <option value="Station Master">Station Master</option>
                  <option value="Pointsman">Pointsman</option>
                </select>
              </div>

              {newUserData.role === "Pointsman" ? (
                <div className="ti2-form-field">
                  <label>Designation <span style={{ color: "#dc2626" }}>*</span></label>
                  <select 
                    value={newUserData.designation} 
                    onChange={e => setNewUserData({ ...newUserData, designation: e.target.value })} 
                    required
                  >
                    <option value="Pointsman Grade I">Pointsman Grade I</option>
                    <option value="Pointsman Grade II">Pointsman Grade II</option>
                    <option value="Pointsman Grade III">Pointsman Grade III</option>
                  </select>
                </div>
              ) : (
                <div className="ti2-form-field">
                  <label>Designation</label>
                  <input type="text" value="Station Master" disabled />
                </div>
              )}
            </div>

            <div className="ti2-form-field">
              <label>Assigned Station <span style={{ color: "#dc2626" }}>*</span></label>
              <select 
                value={newUserData.station} 
                onChange={e => setNewUserData({ ...newUserData, station: e.target.value })} 
                required
              >
                {myStations.map(st => (
                  <option key={st.id} value={st.name}>{st.name} ({st.code})</option>
                ))}
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div className="ti2-form-field">
                <label>Contact Mobile <span style={{ color: "#dc2626" }}>*</span></label>
                <input 
                  type="text" 
                  value={newUserData.contact} 
                  onChange={e => setNewUserData({ ...newUserData, contact: e.target.value })} 
                  placeholder="e.g. +91 98765 43210" 
                  required 
                />
              </div>
              <div className="ti2-form-field">
                <label>Joining Date <span style={{ color: "#dc2626" }}>*</span></label>
                <input 
                  type="date" 
                  value={newUserData.joiningDate} 
                  onChange={e => setNewUserData({ ...newUserData, joiningDate: e.target.value })} 
                  required 
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div className="ti2-form-field">
                <label>PME Status</label>
                <select value={newUserData.pmeStatus} onChange={e => setNewUserData({ ...newUserData, pmeStatus: e.target.value })}>
                  <option>Fit</option>
                  <option>Unfit</option>
                  <option>Overdue</option>
                  <option>Pending</option>
                </select>
              </div>
              <div className="ti2-form-field">
                <label>REF Status</label>
                <select value={newUserData.refStatus} onChange={e => setNewUserData({ ...newUserData, refStatus: e.target.value })}>
                  <option>Cleared</option>
                  <option>Pending</option>
                  <option>Expired</option>
                </select>
              </div>
            </div>

            <div className="ti2-review-actions" style={{ marginTop: "12px" }}>
              <button type="button" className="ti2-ghost-btn" onClick={() => setShowAddUserModal(false)}>Cancel</button>
              <button type="submit" className="ti2-primary-btn">Save Personnel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );

  /* ═══════════════════════════════════════════
     RENDER: MY ASSESSMENTS PAGE
     (Interactive Quiz + timeline scorecard history)
  ═══════════════════════════════════════════ */
}