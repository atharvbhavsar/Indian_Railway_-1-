import React, { useState, useMemo, useEffect } from 'react';
import { useAomState } from './hooks/useAomState.jsx';
import { MONTHLY_TREND, ASSESSMENT_MONTHLY, COMPLIANCE, CAT_COLORS, RISK_COLORS, STATUS_COLORS, generate96Stations, DASHBOARD_96_STATIONS, stationProgressData, categoryData, sidebarItems, summaryCards, designationOptions, departmentOptions, userTypeOptions, reportingOfficerOptions, aomReadOnlyProfile, initialUserFormData, initialFilterData, stationZoneOptions, stationDivisionOptions, stationCategoryOptions, stationTypeOptions, initialStationFormData, initialStationFilterData, initialStations, tiCategoryOptions, tiAssessmentStatusOptions, initialTrafficInspectors, hrmsTiDirectory, initialTiFormData, stationAverageScoreData, initialPendingAssessments, initialApprovedAssessments, initialReportRows, assessmentCriteria } from './constants/aomMockData';
import { TI_SM_CRITERIA } from './constants/trafficInspectorConstants';
import { 
  Activity, AlertCircle, AlertTriangle, ArrowRightLeft, ArrowLeft, BarChart3, Building2, BusFront, 
  ClipboardCheck, Eye, ExternalLink, Filter, Cog, FileCheck, FileDown, FileText, FileBarChart2, 
  LayoutDashboard, Lock, LogOut, PlusCircle, Plus, Search, ShieldCheck, Star, UserCheck, UserPlus, 
  UserRoundSearch, Users, Edit, Trash2, TrendingUp, UserRound, TrainFront, CheckCircle, Clock, XCircle, 
  MapPin, Phone, Calendar, Award, Globe, Tag, GitBranch, Cpu, Layers, Zap, Mail, AlignJustify, Gauge, UserCircle2 
} from 'lucide-react';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line, CartesianGrid, LabelList } from 'recharts';
import './sdom.css';

function AOmModule({ user, onLogout }) {
  const state = useAomState(user, onLogout);
  const {
    activePage,
    setActivePage,
    pmModal,
    setPmModal,
    pmF,
    setPmF,
    openPmAdd,
    openPmEdit,
    openPmShift,
    savePmModal,
    removePm,
    openSmAdd,
    openSmEdit,
    openSmShift,
    saveSmModal,
    removeSm,
    openTiAdd,
    openTiEdit,
    removeTi,
    saveTiModal,
    openSsAdd,
    openSsEdit,
    openSsShift,
    saveSsModal,
    removeSs,
    openTmAdd,
    openTmEdit,
    openTmShift,
    saveTmModal,
    removeTm,
    showAddUserForm,
    setShowAddUserForm,
    selectedPeriod,
    setSelectedPeriod,
    aomCatColor,
    aomCurrentList,
    aomSelectedItem,
    aomFilteredList,
    aomOpenReview,
    aomSMList,
    aomSSList,
    aomTMList,
    aomGetCat,
    aomUpdateSec,
    aomFinalize,
    aomApprovalTab,
    setAomApprovalTab,
    aomReviewTab,
    setAomReviewTab,
    aomReviewSearch,
    setAomReviewSearch,
    aomReviewStation,
    setAomReviewStation,
    aomSelectedId,
    setAomSelectedId,
    aomEditSections,
    aomAomRemarks,
    setAomAomRemarks,
    aomShowAudit,
    setAomShowAudit,
    aomRejectMode,
    setAomRejectMode,
    aomApprovalNotice,
    aomAllStations,
    searchStations,
    setSearchStations,
    isChartZoomModalOpen,
    setIsChartZoomModalOpen,
    selectedChartType,
    setSelectedChartType,
    zoomPopupPage,
    setZoomPopupPage,
    zoomPopupSearch,
    setZoomPopupSearch,
    zoomPopupZone,
    setZoomPopupZone,
    zoomPopupDivision,
    setZoomPopupDivision,
    zoomPopupStationName,
    setZoomPopupStationName,
    zoomPopupStationCode,
    setZoomPopupStationCode,
    zoomPopupCategory,
    setZoomPopupCategory,
    zoomPopupRisk,
    setZoomPopupRisk,
    zoomPopupStatus,
    setZoomPopupStatus,
    zoomPopupStartDate,
    setZoomPopupStartDate,
    zoomPopupEndDate,
    setZoomPopupEndDate,
    userFormData,
    setUserFormData,
    formErrors,
    setFormErrors,
    users,
    setUsers,
    editingUserId,
    setEditingUserId,
    pendingFilters,
    setPendingFilters,
    appliedFilters,
    setAppliedFilters,
    tableSearch,
    setTableSearch,
    currentPage,
    setCurrentPage,
    stations,
    setStations,
    stationFormData,
    setStationFormData,
    stationFormErrors,
    setStationFormErrors,
    pendingStationFilters,
    setPendingStationFilters,
    appliedStationFilters,
    setAppliedStationFilters,
    stationSearch,
    setStationSearch,
    stationMasterSearch,
    setStationMasterSearch,
    stationCurrentPage,
    setStationCurrentPage,
    selectedUserProfile,
    setSelectedUserProfile,
    selectedSMProfile,
    setSelectedSMProfile,
    userShiftDrafts,
    setUserShiftDrafts,
    view,
    setView,
    stF,
    setStF,
    newStName,
    setNewStName,
    newStCode,
    setNewStCode,
    newStTi,
    setNewStTi,
    newStDivision,
    setNewStDivision,
    newStZone,
    setNewStZone,
    newStCategory,
    setNewStCategory,
    newStClass,
    setNewStClass,
    newStType,
    setNewStType,
    newStSignaling,
    setNewStSignaling,
    newStPlatforms,
    setNewStPlatforms,
    newStTracks,
    setNewStTracks,
    newStDailyFootfall,
    setNewStDailyFootfall,
    newStLatitude,
    setNewStLatitude,
    newStLongitude,
    setNewStLongitude,
    newStContactNumber,
    setNewStContactNumber,
    newStEmailId,
    setNewStEmailId,
    newStLineConfig,
    setNewStLineConfig,
    newStElectrified,
    setNewStElectrified,
    showAddStation,
    setShowAddStation,
    selectedSMForPointsmen,
    setSelectedSMForPointsmen,
    selectedPointsmanForMonitoring,
    setSelectedPointsmanForMonitoring,
    pointsmanSearchText,
    setPointsmanSearchText,
    pointsmanRiskFilter,
    setPointsmanRiskFilter,
    pointsmanStatusFilter,
    setPointsmanStatusFilter,
    handleChartClick,
    handlePieClick,
    aomPointsmenSeed,
    aomPointsmen,
    setAomPointsmen,
    aomStationMasters,
    setAomStationMasters,
    smModal,
    setSmModal,
    ssModal,
    setSsModal,
    tmModal,
    setTmModal,
    tiModal,
    setTiModal,
    getPmCat,
    getPmRisk,
    handleTiViewClick,
    handleStationMasterClick,
    stationDetailId,
    setStationDetailId,
    isStationEditMode,
    setIsStationEditMode,
    tiSearch,
    setTiSearch,
    trafficInspectors,
    setTrafficInspectors,
    tiFormData,
    setTiFormData,
    tiFormErrors,
    setTiFormErrors,
    tiAddMode,
    setTiAddMode,
    tiHrmsSearch,
    setTiHrmsSearch,
    tiNotice,
    setTiNotice,
    selectedTiId,
    setSelectedTiId,
    tiLinkTargetId,
    setTiLinkTargetId,
    tiLinkDraft,
    setTiLinkDraft,
    tiShiftDrafts,
    setTiShiftDrafts,
    smShiftDrafts,
    setSmShiftDrafts,
    selectedTIForStationMasters,
    setSelectedTIForStationMasters,
    pendingAssessments,
    setPendingAssessments,
    approvedAssessments,
    setApprovedAssessments,
    reportRows,
    setReportRows,
    reportSearchQuery,
    setReportSearchQuery,
    reportDesignation,
    setReportDesignation,
    repF,
    setRepF,
    repApplied,
    setRepApplied,
    selectedReportUserId,
    setSelectedReportUserId,
    assessmentActionNotice,
    setAssessmentActionNotice,
    assessmentRoleTab,
    setAssessmentRoleTab,
    openAssessmentId,
    setOpenAssessmentId,
    answersByAssessment,
    setAnswersByAssessment,
    expandedCriterionKey,
    setExpandedCriterionKey,
    assessSearch,
    setAssessSearch,
    assessStation,
    setAssessStation,
    assessStatus,
    setAssessStatus,
    assessDate,
    setAssessDate,
    aomSettings,
    setAomSettings,
    settingsNotice,
    setSettingsNotice,
    empSearchText,
    setEmpSearchText,
    empDesignationFilter,
    setEmpDesignationFilter,
    empStationFilter,
    setEmpStationFilter,
    empDivisionFilter,
    setEmpDivisionFilter,
    empZoneFilter,
    setEmpZoneFilter,
    empCategoryFilter,
    setEmpCategoryFilter,
    empRiskFilter,
    setEmpRiskFilter,
    empStatusFilter,
    setEmpStatusFilter,
    empMonitoringFilter,
    setEmpMonitoringFilter,
    empSortConfig,
    setEmpSortConfig,
    empCurrentPage,
    setEmpCurrentPage,
    deactivatedUserIds,
    setDeactivatedUserIds,
    empShiftDrafts,
    setEmpShiftDrafts,
    roleFilterName,
    setRoleFilterName,
    roleFilterStation,
    setRoleFilterStation,
    roleFilterDivision,
    setRoleFilterDivision,
    roleFilterCat,
    setRoleFilterCat,
    roleFilterRisk,
    setRoleFilterRisk,
    selectedRoleEmployee,
    setSelectedRoleEmployee,
    roleShiftDrafts,
    setRoleShiftDrafts,
    tiActivatedAssessments,
    setTiActivatedAssessments,
    tiAssessmentFormOpen,
    setTiAssessmentFormOpen,
    tiAssessmentAnswers,
    setTiAssessmentAnswers,
    aomSuperintendents,
    setAomSuperintendents,
    aomTrainManagers,
    setAomTrainManagers,
    allEmployees,
    pageSize,
    stationPageSize,
    todayIso,
    extractDesignation,
    resolveAssessmentTab,
    buildPrefilledAnswers,
    getTiSectionScore,
    calculateAssessmentScore,
    countAnsweredCriteria,
    computeScoreAndGrade,
    buildAssessmentTableMeta,
    handleViewAssessmentDetails,
    handleApproveAssessment,
    handleRejectAssessment,
    handleStartAssessment,
    handleOpenAssessmentForm,
    getTiRosterList,
    openTiForm,
    handleAnswerChange,
    handleSelectAllYes,
    handleApproveAllInSelectedOption,
    toggleCriterion,
    handleViewReport,
    handleAssessReport,
    handleSettingsToggle,
    handleSettingsSelect,
    handleSaveSettings,
    filteredReportRows,
    handleSidebarClick,
    handleStationSubPage,
    handleUserFormChange,
    handleFilterChange,
    validateUserForm,
    handleSubmitUser,
    handleEditUser,
    handleDeleteUser,
    handleFilterSubmit,
    filteredUsers,
    totalPages,
    pagedUsers,
    goToPrevPage,
    goToNextPage,
    handleStationFormChange,
    handleStationStatusToggle,
    validateStationForm,
    handleAddStationSubmit,
    handleResetStationForm,
    handleStationFilterChange,
    handleApplyStationFilter,
    filteredStations,
    stationTotalPages,
    pagedStations,
    goToPrevStationPage,
    goToNextStationPage,
    openStationView,
    handleUpdateStation,
    handleDeleteStation,
    handleTiFormChange,
    validateTiForm,
    handleAddTiByForm,
    matchedTiByHrms,
    handleAddTiByHrms,
    handleRemoveTi,
    handleOpenTiProfile,
    handleOpenLinkTi,
    toggleMultiValue,
    handleSaveTiLinks,
    handleShiftTi,
    filteredTrafficInspectors,
    selectedTiProfile,
    linkTargetTi,
    stationLinkOptions,
    smLinkOptions,
    handleExportCSV,
    resetRoleFilters,
    isStationMatch,
    unifiedStaff,
    unifiedStations,
    ROLE_MAP,
    riskBadge,
    catBadge,
    statusBadge,
    handleAddStation,
    stationMastersDirectory,
    filteredStationMasters,
    handleShiftStationMaster,
    handleDeleteStationMaster,
    renderCategoryBadge,
    renderEmployeeManagement,
    renderStations,
    renderAomRole,
    renderPointsmanMonitoringDetail,
    renderStationFormFields,
    renderChartZoomModal,
    renderPmModal,
    renderSmModal,
    renderSsModal,
    renderTmModal,
    renderTiModal,
    renderAddStationModal
  } = state;

  const renderPageContent = () => {
    switch (activePage) {
      case "Station Master Profile":
        if (!selectedSMProfile) return null;
        return (
          <div className="user-management-page">
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                  STATION MASTER PROFILE
                </h2>
                <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#64748b" }}>
                  Detailed operational card for Station Master <strong>{selectedSMProfile.name}</strong>
                </p>
              </div>
              <button 
                type="button" 
                className="action-btn" 
                onClick={() => setActivePage("Station Masters")}
                style={{ background: "#64748b", color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}
              >
                ← Back to List
              </button>
            </div>

            <div className="chart-card ti-profile-card animate-fade-in" style={{ borderTop: '4px solid #059669', backgroundColor: '#fcfdfe', padding: '20px' }}>
              <div className="ti-profile-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#059669', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: '800', fontSize: '18px' }}>
                    {selectedSMProfile.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ margin: '0', fontSize: '18px', fontWeight: '800', color: '#059669' }}>
                      {selectedSMProfile.name}
                    </h3>
                    <p style={{ margin: '0', fontSize: '12px', color: '#64748b' }}>Designation: Station Master | Station: {selectedSMProfile.stationName} ({selectedSMProfile.stationCode})</p>
                  </div>
                </div>
              </div>

              <div className="ti-profile-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', padding: '15px 0' }}>
                <div><strong>Designation:</strong> <span style={{ color: '#059669', fontWeight: '700' }}>Station Master</span></div>
                <div><strong>Mobile No:</strong> {selectedSMProfile.contactNumber}</div>
                <div><strong>Email ID:</strong> {selectedSMProfile.emailId}</div>
                <div><strong>Account Status:</strong> <span style={{ color: '#10b981', fontWeight: '700' }}>Active</span></div>
                
                <div><strong>Current Zone:</strong> {selectedSMProfile.zone}</div>
                <div><strong>Current Division:</strong> {selectedSMProfile.division}</div>
                <div><strong>Station Name:</strong> {selectedSMProfile.stationName}</div>
                <div><strong>Station Code:</strong> {selectedSMProfile.stationCode}</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '15px' }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '14px', color: '#0f172a', fontWeight: '800' }}>Station Master Operational Authority</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '13px' }}>
                  <div><strong>Station Category:</strong> {selectedSMProfile.category}</div>
                  <div><strong>Division HQ:</strong> {selectedSMProfile.division} Division</div>
                  <div><strong>Supervising Authority:</strong> AOM ({selectedSMProfile.division})</div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Traffic Inspector Profile":
        if (!selectedTiProfile) return null;
        return (
          <div className="user-management-page">
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                  TRAFFIC INSPECTOR PROFILE
                </h2>
                <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#64748b" }}>
                  Detailed operational card for Traffic Inspector <strong>{selectedTiProfile.name}</strong>
                </p>
              </div>
              <button 
                type="button" 
                className="action-btn" 
                onClick={() => setActivePage("Traffic Inspector")}
                style={{ background: "#64748b", color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}
              >
                ← Back to List
              </button>
            </div>

            <div className="chart-card ti-profile-card animate-fade-in" style={{ borderTop: '4px solid #2563eb', backgroundColor: '#fcfdfe', padding: '20px' }}>
              <div className="ti-profile-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: '800', fontSize: '18px' }}>
                    {selectedTiProfile.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ margin: '0', fontSize: '18px', fontWeight: '800', color: '#2563eb' }}>
                      {selectedTiProfile.name}
                    </h3>
                    <p style={{ margin: '0', fontSize: '12px', color: '#64748b' }}>HRMS ID: {selectedTiProfile.employeeId} | Designation: {selectedTiProfile.category}</p>
                  </div>
                </div>
              </div>

              <div className="ti-profile-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', padding: '15px 0' }}>
                <div><strong>Designation:</strong> <span style={{ color: '#2563eb', fontWeight: '700' }}>{selectedTiProfile.category}</span></div>
                <div><strong>Employee ID:</strong> {selectedTiProfile.employeeId}</div>
                <div><strong>Jurisdiction:</strong> {selectedTiProfile.jurisdiction} Division</div>
                <div><strong>Account Status:</strong> <span style={{ color: '#10b981', fontWeight: '700' }}>Active</span></div>
                
                <div><strong>Mobile No:</strong> {selectedTiProfile.phone || "+91 98900 12211"}</div>
                <div><strong>Email ID:</strong> {selectedTiProfile.email || "ti.officer@rail.in"}</div>
                <div><strong>Assessment Status:</strong> <span style={{ color: selectedTiProfile.assessmentStatus === "Completed" ? '#10b981' : '#f59e0b', fontWeight: '700' }}>{selectedTiProfile.assessmentStatus}</span></div>
                <div><strong>Department:</strong> Operations</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '15px' }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '14px', color: '#0f172a', fontWeight: '800' }}>Assigned Supervision Jurisdiction</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', fontSize: '13px' }}>
                  <div>
                    <strong>Supervised Stations:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                      {selectedTiProfile.linkedStations && selectedTiProfile.linkedStations.length ? (
                        selectedTiProfile.linkedStations.map(st => (
                          <span key={st} className="station-code-chip" style={{ background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>{st}</span>
                        ))
                      ) : (
                        <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No stations linked yet. Use "Link Stations & SMs" to assign.</span>
                      )}
                    </div>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <strong>Supervised Station Masters:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                      {selectedTiProfile.linkedSms && selectedTiProfile.linkedSms.length ? (
                        selectedTiProfile.linkedSms.map(sm => (
                          <span key={sm} className="station-code-chip" style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>{sm}</span>
                        ))
                      ) : (
                        <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No Station Masters linked yet. Use "Link Stations & SMs" to assign.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Employee Management":
        return renderEmployeeManagement();

      case "Dashboard": {
        const counts = {
          stations: stations.length,
          pointsmen: aomPointsmen.length,
          sm: stationMastersDirectory.length,
          ss: aomSuperintendents.length,
          tm: aomTrainManagers.length,
          ti: trafficInspectors.length
        };

        const summaryCards = [
          { key: "stations", label: "Stations", count: 96, sub: "Total in Nagpur Division", icon: <Building2 size={18} />, color: "#1E3A5F" },
          { key: "pointsmen", label: "Pointsmen", count: counts.pointsmen, sub: "Operational pointsmen", icon: <Users size={18} />, color: "#1E3A5F" },
          { key: "sm", label: "Station Masters", count: counts.sm, sub: "Across all stations", icon: <UserRound size={18} />, color: "#1E3A5F" },
          { key: "ss", label: "Station Superintendents", count: counts.ss, sub: "Division supervisors", icon: <UserCheck size={18} />, color: "#1E3A5F" },
          { key: "tm", label: "Train Managers", count: counts.tm, sub: "Active train managers", icon: <TrainFront size={18} />, color: "#1E3A5F" },
          { key: "ti", label: "Traffic Inspectors", count: counts.ti, sub: "Jurisdiction coverage", icon: <ShieldCheck size={18} />, color: "#1E3A5F" },
        ];

        const roleBar = [
          { role: "Pointsmen", count: counts.pointsmen },
          { role: "Station Masters", count: counts.sm },
          { role: "Station Superintendents", count: counts.ss },
          { role: "Train Managers", count: counts.tm },
          { role: "Traffic Inspectors", count: counts.ti },
        ];

        const catData = [
          { name: "Grade A", value: 14.6, fill: "#1E3A5F" },
          { name: "Grade B", value: 37.5, fill: "#2B6CB0" },
          { name: "Grade C", value: 36.5, fill: "#D69E2E" },
          { name: "Grade D", value: 11.5, fill: "#C53030" }
        ];

        const top10 = [...DASHBOARD_96_STATIONS].sort((a, b) => b.avgScore - a.avgScore).slice(0, 10);
        const bottom10 = [...DASHBOARD_96_STATIONS].sort((a, b) => a.avgScore - b.avgScore).slice(0, 10);

        const pipeline = [
          { label: "Approved", count: 4520, dot: "#1E3A5F" },
          { label: "Pending", count: 246, dot: "#4A90D9" },
          { label: "Rejected", count: 87, dot: "#B83A3A" },
          { label: "Overdue", count: 33, dot: "#5A6B7C" }
        ];

        return (
          <div className="sdom-fade">
            {/* Page header */}
            <h1 className="sdom-page-title">Nagpur Division Command Center</h1>
            <p className="sdom-page-subtitle">Complete strategic overview of the division — staff, performance, safety and assessment pipeline.</p>

            {/* ── Summary Cards ── */}
            <div className="sdom-summary-cards">
              {summaryCards.map((c) => (
                <div 
                  className="sdom-stat-card" 
                  key={c.key}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (c.key === "stations") setActivePage("Stations");
                    else if (c.key === "pointsmen") setActivePage("Pointsmen");
                    else if (c.key === "sm") setActivePage("Station Masters");
                    else if (c.key === "ss") setActivePage("Station Superintendents");
                    else if (c.key === "tm") setActivePage("Train Managers");
                    else if (c.key === "ti") setActivePage("Traffic Inspectors");
                  }}
                >
                  <div className="sdom-stat-icon">
                    <span style={{ color: "#1E3A5F" }}>{c.icon}</span>
                  </div>
                  <div className="sdom-stat-label">{c.label}</div>
                  <div className="sdom-stat-value">{c.count}</div>
                  <div className="sdom-stat-sub">{c.sub}</div>
                </div>
              ))}
            </div>

            {/* ── Station-wise Evaluation Progress & Average Score at the Top ── */}
            <div className="sdom-row-2">
              {/* Station-wise Evaluation Progress */}
              <div className="sdom-chart-card">
                <div className="chart-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <div className="sdom-chart-title">Station-wise Evaluation Progress</div>
                    <div className="sdom-chart-subtitle">Click anywhere on chart to zoom & filter 96 stations</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChartClick(null, "progress")}
                    style={{
                      background: "var(--brand-primary, #0B1F3A)",
                      color: "#ffffff",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    View Full Screen
                  </button>
                </div>
                <div style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stationProgressData}
                      margin={{ top: 8, right: 12, left: -20, bottom: 5 }}
                      barGap={6}
                      onClick={(state) => handleChartClick(state, "progress")}
                      style={{ cursor: "pointer" }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D9E2EC" />
                      <XAxis
                        dataKey="station"
                        tick={{ fontSize: 10, fill: "#627D98" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis tick={{ fontSize: 10, fill: "#627D98" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ fontSize: "0.85rem", borderRadius: 6, border: "1px solid #D9E2EC" }} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                      <Bar
                        dataKey="completed"
                        fill="var(--brand-secondary, #1E3A5F)"
                        radius={[4, 4, 0, 0]}
                        name="Completed"
                        barSize={12}
                      />
                      <Bar
                        dataKey="pending"
                        fill="#D69E2E"
                        radius={[4, 4, 0, 0]}
                        name="Pending"
                        barSize={12}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Station-wise Average Score */}
              <div className="sdom-chart-card">
                <div className="chart-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <div className="sdom-chart-title">Station-wise Average Score</div>
                    <div className="sdom-chart-subtitle">Click anywhere on chart to zoom & filter 96 stations</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChartClick(null, "score")}
                    style={{
                      background: "#1f7a5c",
                      color: "#ffffff",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    View Full Screen
                  </button>
                </div>
                <div style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stationAverageScoreData}
                      margin={{ top: 8, right: 12, left: -20, bottom: 5 }}
                      onClick={(state) => handleChartClick(state, "score")}
                      style={{ cursor: "pointer" }}
                      barSize={18}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D9E2EC" />
                      <XAxis
                        dataKey="station"
                        tick={{ fontSize: 10, fill: "#627D98" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#627D98" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ fontSize: "0.85rem", borderRadius: 6, border: "1px solid #D9E2EC" }} formatter={(value) => [`${value}/100`, "Average Score"]} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                      <Bar
                        dataKey="avgScore"
                        fill="#1f7a5c"
                        radius={[4, 4, 0, 0]}
                        name="Average Score"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* ── Role-wise Distribution ── */}
            <div className="sdom-row-1" style={{ marginBottom: "24px" }}>
              <div className="sdom-chart-card">
                <div className="sdom-chart-title">Role-wise Staff Distribution</div>
                <div className="sdom-chart-subtitle">Staff count per role across the division</div>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roleBar} margin={{ top: 16, right: 40, left: 0, bottom: 8 }} barSize={52}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D9E2EC" />
                      <XAxis dataKey="role" fontSize={12} tick={{ fill: "#102A43", fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis fontSize={11} tick={{ fill: "#627D98" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ fontSize: "0.85rem", borderRadius: 6, border: "1px solid #D9E2EC" }} />
                      <Bar dataKey="count" fill="#1E3A5F" radius={[5, 5, 0, 0]}>
                        <LabelList dataKey="count" position="top" style={{ fontSize: 12, fontWeight: 700, fill: "#102A43" }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* ── Category + Safety ── */}
            <div className="sdom-row-2">
              <div className="sdom-chart-card">
                <div className="chart-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <div className="sdom-chart-title">Category Distribution (Division-wide)</div>
                    <div className="sdom-chart-subtitle">Click anywhere on chart to zoom & filter 96 stations</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePieClick(null)}
                    style={{
                      background: "var(--brand-primary, #0B1F3A)",
                      color: "#ffffff",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    View Full Screen
                  </button>
                </div>
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart style={{ cursor: "pointer" }}>
                      <Pie
                        data={catData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        dataKey="value"
                        paddingAngle={3}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        onClick={(data) => handlePieClick(data)}
                      >
                        {catData.map((d, i) => (
                          <Cell key={i} fill={d.fill} style={{ cursor: "pointer" }} />
                        ))}
                      </Pie>
                      <Legend onClick={(data) => handlePieClick({ name: data.value })} wrapperStyle={{ cursor: "pointer" }} />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="sdom-chart-card">
                <div className="sdom-chart-title">Safety Compliance Analytics</div>
                <div className="sdom-chart-subtitle">Division-wide compliance across all categories</div>
                <div style={{ marginTop: 16 }}>
                  {COMPLIANCE.map((c) => (
                    <div className="sdom-compliance-item" key={c.label}>
                      <div className="sdom-compliance-header">
                        <span>{c.label}</span>
                        <span className="sdom-compliance-pct">{c.pct}%</span>
                      </div>
                      <div className="sdom-compliance-track">
                        <div className="sdom-compliance-fill" style={{ width: `${c.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Score Trend ── */}
            <div className="sdom-row-1" style={{ marginBottom: "24px" }}>
              <div className="sdom-chart-card">
                <div className="sdom-chart-title">Division-wide Performance & Safety Trend (Last 6 Months)</div>
                <div className="sdom-chart-subtitle">Average assessment scores and safety compliance percentage over time</div>
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MONTHLY_TREND} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" fontSize={12} />
                      <YAxis domain={[60, 100]} fontSize={12} />
                      <Tooltip contentStyle={{ fontSize: "0.85rem", borderRadius: 6, border: "1px solid #D9E2EC" }} />
                      <Legend wrapperStyle={{ fontSize: "0.82rem" }} />
                      <Line type="monotone" dataKey="score" name="Avg Score" stroke="#1E3A5F" strokeWidth={2.5} dot={{ r: 4, fill: "#1E3A5F" }} />
                      <Line type="monotone" dataKey="safety" name="Safety Compliance%" stroke="#2F855A" strokeWidth={2.5} dot={{ r: 4, fill: "#2F855A" }} strokeDasharray="5 3" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* ── Station Performance Top/Bottom ── */}
            <div className="sdom-row-2">
              <div className="sdom-chart-card">
                <div className="sdom-chart-title" style={{ marginBottom: 4 }}>Top 10 Performing Stations</div>
                <div className="sdom-chart-subtitle">Sorted by average assessment score</div>
                <div className="sdom-table-wrap">
                  <table className="sdom-table">
                    <thead>
                      <tr><th>#</th><th>Station</th><th>Avg Score</th><th>Safety %</th><th>Pending</th></tr>
                    </thead>
                    <tbody>
                      {top10.map((st, i) => (
                        <tr key={st.id}>
                          <td style={{ color: "#9FB3C8", fontWeight: 700 }}>{i + 1}</td>
                          <td style={{ fontWeight: 600 }}>{st.stationName}</td>
                          <td><span style={{ color: "#2F855A", fontWeight: 700 }}>{st.avgScore}</span></td>
                          <td>{st.avgScore + 5}%</td>
                          <td>{st.pending}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="sdom-chart-card">
                <div className="sdom-chart-title" style={{ marginBottom: 4 }}>Bottom 10 — Stations Needing Attention</div>
                <div className="sdom-chart-subtitle">Sorted by average assessment score (ascending)</div>
                <div className="sdom-table-wrap">
                  <table className="sdom-table">
                    <thead>
                      <tr><th>#</th><th>Station</th><th>Avg Score</th><th>High Risk</th><th>Pending</th></tr>
                    </thead>
                    <tbody>
                      {bottom10.map((st, i) => (
                        <tr key={st.id}>
                          <td style={{ color: "#9FB3C8", fontWeight: 700 }}>{i + 1}</td>
                          <td style={{ fontWeight: 600 }}>{st.stationName}</td>
                          <td><span style={{ color: st.avgScore < 75 ? "#C53030" : "#D69E2E", fontWeight: 700 }}>{st.avgScore}</span></td>
                          <td>{st.riskLevel === "High" ? <span style={{ color: "#C53030", fontWeight: 700 }}>1</span> : 0}</td>
                          <td>{st.pending}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ── Assessment Pipeline ── */}
            <div className="sdom-row-1">
              <div className="sdom-chart-card">
                <div className="sdom-chart-title">Assessment Pipeline</div>
                <div className="sdom-chart-subtitle">Current assessment status and monthly trend</div>
                <div className="sdom-pipeline-row">
                  {pipeline.map((p) => (
                    <div className="sdom-pipeline-card" key={p.label}>
                      <div className="sdom-pipeline-dot" style={{ background: p.dot }} />
                      <div>
                        <div className="sdom-pipeline-lbl">{p.label}</div>
                        <div className="sdom-pipeline-val">{p.count.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ height: 280, marginTop: 8 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ASSESSMENT_MONTHLY} barCategoryGap="30%" barGap={4}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D9E2EC" />
                      <XAxis dataKey="month" fontSize={12} tick={{ fill: "#627D98" }} axisLine={false} tickLine={false} />
                      <YAxis fontSize={11} tick={{ fill: "#627D98" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ fontSize: "0.85rem", borderRadius: 6, border: "1px solid #D9E2EC" }} />
                      <Legend wrapperStyle={{ fontSize: "0.82rem" }} />
                      <Bar dataKey="approved" name="Approved" fill="#1E3A5F" barSize={12} radius={[2, 2, 0, 0]} />
                      <Bar dataKey="pending" name="Pending" fill="#4A90D9" barSize={12} radius={[2, 2, 0, 0]} />
                      <Bar dataKey="rejected" name="Rejected" fill="#B83A3A" barSize={12} radius={[2, 2, 0, 0]} />
                      <Bar dataKey="overdue" name="Overdue" fill="#5A6B7C" barSize={12} radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "Station Management":
      case "All Stations":
        return (
          <div className="user-management-page">
            <div className="page-header">
              <h2>STATION MANAGEMENT</h2>
            </div>

            <div className="chart-card station-list-intro">
              <div>
                <h3>All Stations Directory</h3>
                <p>Manage station records, quickly search data, and keep operational information up to date.</p>
              </div>
              <div className="station-list-kpi">Total Stations: {stations.length}</div>
            </div>

            <div className="station-action-bar chart-card">
              <button type="button" className="submit-btn" onClick={() => handleStationSubPage("Add Station")}>
                Add New Station
              </button>
              <input
                type="text"
                className="users-table-search"
                placeholder="Search by Station Name / Code"
                value={stationSearch}
                onChange={(e) => {
                  setStationSearch(e.target.value);
                  setStationCurrentPage(1);
                }}
              />
            </div>

            <div className="users-filter-section chart-card">
              <form className="filter-grid station-filter-grid" onSubmit={handleApplyStationFilter}>
                <div className="form-group">
                  <label>Zone</label>
                  <select name="zone" value={pendingStationFilters.zone} onChange={handleStationFilterChange}>
                    <option value="">All Zones</option>
                    {stationZoneOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Division</label>
                  <select name="division" value={pendingStationFilters.division} onChange={handleStationFilterChange}>
                    <option value="">All Divisions</option>
                    {stationDivisionOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Station Category</label>
                  <select name="category" value={pendingStationFilters.category} onChange={handleStationFilterChange}>
                    <option value="">All Categories</option>
                    {stationCategoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={pendingStationFilters.status} onChange={handleStationFilterChange}>
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="filter-submit-wrap">
                  <button type="submit" className="submit-btn">Apply Filter</button>
                </div>
              </form>
            </div>

            <div className="users-list-container">
              <div className="users-table-wrapper">
                <div className="users-table station-table-wide">
                  <div className="table-header station-table-cols">
                    <div>Sr No</div>
                    <div>Station Name</div>
                    <div>Station Code</div>
                    <div>Zone</div>
                    <div>Division</div>
                    <div>Category</div>
                    <div>Platforms</div>
                    <div>Tracks</div>
                    <div>Station Type</div>
                    <div>Status</div>
                    <div>Created By</div>
                    <div>Actions</div>
                  </div>

                  {pagedStations.length === 0 ? (
                    <div className="table-empty-state">No stations found.</div>
                  ) : (
                    pagedStations.map((station, index) => (
                      <div key={station.id} className="table-row station-table-cols">
                        <div>{(stationCurrentPage - 1) * stationPageSize + index + 1}</div>
                        <div>{station.stationName}</div>
                        <div>
                          <span className="station-code-chip">{station.stationCode}</span>
                        </div>
                        <div>{station.zone}</div>
                        <div>{station.division}</div>
                        <div>{renderCategoryBadge(station.category)}</div>
                        <div>{station.platforms}</div>
                        <div>{station.tracks}</div>
                        <div>{station.stationType}</div>
                        <div>
                          <span className={station.status === "Active" ? "status-active-pill" : "status-inactive-pill"}>
                            {station.status}
                          </span>
                        </div>
                        <div>{station.createdBy}</div>
                        <div className="table-action-cell">
                          <button type="button" className="action-btn" onClick={() => openStationView(station.id, false)}>
                            View
                          </button>
                          <button type="button" className="action-btn action-edit" onClick={() => openStationView(station.id, true)}>
                            Edit
                          </button>
                          <button type="button" className="action-btn action-delete" onClick={() => handleDeleteStation(station.id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="table-pagination-wrap">
                <button
                  type="button"
                  className="pagination-btn"
                  onClick={goToPrevStationPage}
                  disabled={stationCurrentPage === 1}
                >
                  Prev
                </button>
                <span className="pagination-text">
                  Page {stationCurrentPage} of {stationTotalPages}
                </span>
                <button
                  type="button"
                  className="pagination-btn"
                  onClick={goToNextStationPage}
                  disabled={stationCurrentPage === stationTotalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        );

      case "Stations":
        return renderStations();

      case "Pointsmen":
        return renderAomRole("pointsmen", "Pointsman");

      case "Station Masters":
        return renderAomRole("sm", "Station Master");

      case "Station Superintendents":
        return renderAomRole("ss", "Station Superintendent");

      case "Train Managers":
        return renderAomRole("tm", "Train Manager");

      case "Traffic Inspectors":
        return renderAomRole("ti", "Traffic Inspector");

      case "Station Masters Under TI": {
        if (!selectedTIForStationMasters) return null;
        
        const tiSmsNames = selectedTIForStationMasters.linkedSms || [];
        const smsForTI = stationMastersDirectory.filter(sm => tiSmsNames.includes(sm.name));
        
        // Find total pointsmen under these SMs
        const smStationCodes = smsForTI.map(sm => sm.stationCode);
        const pmForTI = aomPointsmen.filter(pm => smStationCodes.includes(pm.stationCode));
        
        const approvedCount = pmForTI.filter(p => p.approvalStatus === "Approved").length;
        const highRiskCount = pmForTI.filter(p => getPmRisk(p) === "High").length;

        return (
          <div className="user-management-page">
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                  Station Masters Management – {selectedTIForStationMasters.name}
                </h2>
                <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#64748b" }}>
                  Supervising operations in {selectedTIForStationMasters.jurisdiction} Division
                </p>
              </div>
              <button
                type="button"
                className="sm2-monitor-btn"
                onClick={() => {
                  setActivePage("Traffic Inspector");
                  setSelectedTIForStationMasters(null);
                }}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#334155",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                ← Back to Traffic Inspectors
              </button>
            </div>

            {/* KPI Cards */}
            <div className="metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "24px", marginTop: "20px" }}>
              <div className="metric-card" onClick={() => setActivePage("Station Masters")} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(15, 23, 42, 0.02)", cursor: "pointer", transition: "box-shadow 0.2s, border-color 0.2s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(37,99,235,0.15)"; e.currentTarget.style.borderColor = "#93c5fd"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(15,23,42,0.02)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Users size={24} />
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Station Masters</span>
                  <h3 style={{ margin: "2px 0 0 0", fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>{smsForTI.length}</h3>
                </div>
              </div>
              <div className="metric-card" onClick={() => setActivePage("Pointsmen")} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(15, 23, 42, 0.02)", cursor: "pointer", transition: "box-shadow 0.2s, border-color 0.2s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(239,68,68,0.15)"; e.currentTarget.style.borderColor = "#fca5a5"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(15,23,42,0.02)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#fef2f2", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Users size={24} />
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Pointsman</span>
                  <h3 style={{ margin: "2px 0 0 0", fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>{pmForTI.length}</h3>
                </div>
              </div>
              <div className="metric-card" onClick={() => setActivePage("Assessments")} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(15, 23, 42, 0.02)", cursor: "pointer", transition: "box-shadow 0.2s, border-color 0.2s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(22,163,74,0.15)"; e.currentTarget.style.borderColor = "#86efac"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(15,23,42,0.02)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>Approved Assessments</span>
                  <h3 style={{ margin: "2px 0 0 0", fontSize: "24px", fontWeight: "800", color: "#16a34a" }}>{approvedCount}</h3>
                </div>
              </div>
              <div className="metric-card" onClick={() => { setActivePage("Employee Management"); setEmpRiskFilter("High"); }} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(15, 23, 42, 0.02)", cursor: "pointer", transition: "box-shadow 0.2s, border-color 0.2s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(234,88,12,0.15)"; e.currentTarget.style.borderColor = "#fdba74"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(15,23,42,0.02)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#fff7ed", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>High Risk Staff</span>
                  <h3 style={{ margin: "2px 0 0 0", fontSize: "24px", fontWeight: "800", color: "#ea580c" }}>{highRiskCount}</h3>
                </div>
              </div>
            </div>

            <div className="users-list-container" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px", boxShadow: "0 1px 3px rgba(15, 23, 42, 0.02)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "16px", paddingLeft: "8px" }}>Station Masters Directory</h3>
              <div className="users-table-wrapper" style={{ overflowX: "auto" }}>
                <div className="users-table" style={{ minWidth: "1000px" }}>
                  <div className="table-header" style={{
                    display: "grid",
                    gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1fr 1fr",
                    padding: "16px",
                    background: "linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%)",
                    borderBottom: "1px solid #e2e8f0",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    color: "#475569",
                    fontWeight: "700",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    <div>Station Master</div>
                    <div>Station</div>
                    <div>Division</div>
                    <div>Category</div>
                    <div>Assessment</div>
                    <div>Risk Level</div>
                    <div style={{ textAlign: "right" }}>Action</div>
                  </div>

                  {smsForTI.length === 0 ? (
                    <div style={{ padding: "32px", textAlign: "center", color: "#64748b", fontSize: "14px" }}>
                      No Station Masters found under this Traffic Inspector.
                    </div>
                  ) : (
                    smsForTI.map((row, idx) => {
                      // Mocking risk and assessment for SM
                      const smRisk = idx % 3 === 0 ? "Medium" : "Low";
                      const smRiskColor = smRisk === "High" ? "#ef4444" : smRisk === "Medium" ? "#ea580c" : "#16a34a";
                      const smRiskBg = smRisk === "High" ? "#fef2f2" : smRisk === "Medium" ? "#fff7ed" : "#dcfce7";
                      
                      const smAss = idx % 2 === 0 ? "Completed" : "Pending";
                      const smAssColor = smAss === "Completed" ? "#16a34a" : "#ca8a04";
                      const smAssBg = smAss === "Completed" ? "#dcfce7" : "#fef08a";

                      return (
                        <div key={row.id || row.name} className="table-row" style={{
                          display: "grid",
                          gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1fr 1fr",
                          padding: "16px",
                          borderBottom: "1px solid #e2e8f0",
                          alignItems: "center",
                          transition: "background 0.2s",
                          cursor: "default"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                          <div>
                            <div style={{ fontWeight: "700", color: "#0f172a", fontSize: "14px" }}>{row.name}</div>
                            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>ID: SM_{1000 + idx}</div>
                          </div>
                          <div>
                            <div style={{ fontWeight: "600", color: "#334155", fontSize: "13px" }}>{row.stationName}</div>
                            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{row.stationCode}</div>
                          </div>
                          <div style={{ fontSize: "13px", color: "#475569", fontWeight: "500" }}>{row.division}</div>
                          <div>
                            <span style={{
                              background: "#f1f5f9",
                              color: "#475569",
                              padding: "4px 10px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: "600",
                              border: "1px solid #e2e8f0"
                            }}>
                              {row.category}
                            </span>
                          </div>
                          <div>
                            <span style={{
                              background: smAssBg,
                              color: smAssColor,
                              padding: "4px 10px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: "700"
                            }}>
                              {smAss}
                            </span>
                          </div>
                          <div>
                            <span style={{
                              background: smRiskBg,
                              color: smRiskColor,
                              padding: "4px 10px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: "700",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px"
                            }}>
                              <span style={{ fontSize: "10px" }}>●</span> {smRisk}
                            </span>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <button
                              type="button"
                              onClick={() => handleStationMasterClick(row)}
                              style={{
                                background: "#eff6ff",
                                color: "#2563eb",
                                border: "1px solid #bfdbfe",
                                padding: "6px 16px",
                                borderRadius: "6px",
                                fontSize: "13px",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.2s"
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#2563eb";
                                e.currentTarget.style.color = "#ffffff";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#eff6ff";
                                e.currentTarget.style.color = "#2563eb";
                              }}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "Pointsman Under Station Master":
        if (!selectedSMForPointsmen) return null;
        
        // Find pointsmen under this station
        const stationPointsmen = aomPointsmen.filter(
          (pm) => pm.stationCode === selectedSMForPointsmen.stationCode
        );

        // Calculate KPI summaries
        const approvedCount = stationPointsmen.filter(p => p.approvalStatus === "Approved").length;
        const pendingCount = stationPointsmen.filter(p => p.approvalStatus === "Pending").length;
        const highRiskCount = stationPointsmen.filter(p => getPmRisk(p) === "High").length;

        // Apply filters
        const filteredStationPointsmen = stationPointsmen.filter((pm) => {
          const risk = getPmRisk(pm);
          const searchText = pointsmanSearchText.trim().toLowerCase();
          const matchesSearch =
            searchText.length === 0 ||
            pm.name.toLowerCase().includes(searchText) ||
            pm.hrmsId.toLowerCase().includes(searchText);
            
          const matchesRisk = pointsmanRiskFilter === "All" || risk === pointsmanRiskFilter;
          const matchesStatus = pointsmanStatusFilter === "All" || pm.approvalStatus === pointsmanStatusFilter;
          
          return matchesSearch && matchesRisk && matchesStatus;
        });

        return (
          <div className="user-management-page">
            {selectedPointsmanForMonitoring ? (
              renderPointsmanMonitoringDetail(selectedPointsmanForMonitoring)
            ) : (
              <>
                <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                      Pointsman Management – {selectedSMForPointsmen.stationName}
                    </h2>
                    <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#64748b" }}>
                      Operational directory under Station Master: <strong>{selectedSMForPointsmen.name}</strong> ({selectedSMForPointsmen.stationCode})
                    </p>
                  </div>
                  <button
                    type="button"
                    className="sm2-monitor-btn"
                    onClick={() => {
                      setActivePage("Station Masters");
                      setSelectedSMForPointsmen(null);
                    }}
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#334155",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                  >
                    ← Back to Station Masters
                  </button>
                </div>

                {/* KPI Cards */}
                <div className="metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "24px", marginTop: "20px" }}>
                  <div className="metric-card" onClick={() => setActivePage("Pointsmen")} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(15, 23, 42, 0.02)", cursor: "pointer", transition: "box-shadow 0.2s, border-color 0.2s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(37,99,235,0.15)"; e.currentTarget.style.borderColor = "#93c5fd"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(15,23,42,0.02)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Users size={24} />
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Pointsmen</span>
                      <h3 style={{ margin: "2px 0 0 0", fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>{stationPointsmen.length}</h3>
                    </div>
                  </div>
                  <div className="metric-card" onClick={() => setActivePage("Assessments")} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(15, 23, 42, 0.02)", cursor: "pointer", transition: "box-shadow 0.2s, border-color 0.2s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(22,163,74,0.15)"; e.currentTarget.style.borderColor = "#86efac"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(15,23,42,0.02)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>Approved Staff</span>
                      <h3 style={{ margin: "2px 0 0 0", fontSize: "24px", fontWeight: "800", color: "#16a34a" }}>{approvedCount}</h3>
                    </div>
                  </div>
                  <div className="metric-card" onClick={() => setActivePage("Assessments")} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(15, 23, 42, 0.02)", cursor: "pointer", transition: "box-shadow 0.2s, border-color 0.2s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(37,99,235,0.15)"; e.currentTarget.style.borderColor = "#93c5fd"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(15,23,42,0.02)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#eff6ff", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ClipboardCheck size={24} />
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>Pending Assessments</span>
                      <h3 style={{ margin: "2px 0 0 0", fontSize: "24px", fontWeight: "800", color: "#2563eb" }}>{pendingCount}</h3>
                    </div>
                  </div>
                  <div className="metric-card" onClick={() => { setActivePage("Employee Management"); setEmpRiskFilter("High"); }} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(15, 23, 42, 0.02)", cursor: "pointer", transition: "box-shadow 0.2s, border-color 0.2s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(220,38,38,0.15)"; e.currentTarget.style.borderColor = "#fca5a5"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(15,23,42,0.02)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#fee2e2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>High Risk Staff</span>
                      <h3 style={{ margin: "2px 0 0 0", fontSize: "24px", fontWeight: "800", color: "#dc2626" }}>{highRiskCount}</h3>
                    </div>
                  </div>
                </div>

                {/* Filter Toolbar */}
                <div className="station-action-bar chart-card" style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "20px", background: "#ffffff", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0", marginTop: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                    <Search size={16} color="#64748b" />
                    <input
                      type="text"
                      className="users-table-search"
                      placeholder="Search by Pointsman Name / HRMS ID..."
                      value={pointsmanSearchText}
                      onChange={(e) => setPointsmanSearchText(e.target.value)}
                      style={{ flex: 1, border: "none", outline: "none", fontSize: "14px", background: "transparent" }}
                    />
                  </div>
                  
                  <div style={{ display: "flex", gap: "12px" }}>
                    <select 
                      value={pointsmanRiskFilter} 
                      onChange={(e) => setPointsmanRiskFilter(e.target.value)}
                      style={{
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        padding: "6px 12px",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#334155",
                        background: "#ffffff"
                      }}
                    >
                      <option value="All">All Risk Levels</option>
                      <option value="Low">Low Risk</option>
                      <option value="Medium">Medium Risk</option>
                      <option value="High">High Risk</option>
                    </select>
                    <select 
                      value={pointsmanStatusFilter} 
                      onChange={(e) => setPointsmanStatusFilter(e.target.value)}
                      style={{
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        padding: "6px 12px",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#334155",
                        background: "#ffffff"
                      }}
                    >
                      <option value="All">All Approval Statuses</option>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="users-list-container">
                  <div className="users-table-wrapper">
                    <div className="users-table pointsman-list-table-wide">
                      <div className="table-header pointsman-list-table-cols">
                        <div>Sr No</div>
                        <div>Pointsman Name</div>
                        <div>HRMS ID</div>
                        <div>Grade / Category</div>
                        <div>Last Assessment Score</div>
                        <div>Last Assessed Date</div>
                        <div>Approval Status</div>
                        <div>Risk Level</div>
                        <div>Action</div>
                      </div>

                      {filteredStationPointsmen.length === 0 ? (
                        <div className="table-empty-state">No Pointsman staff found.</div>
                      ) : (
                        filteredStationPointsmen.map((pm, idx) => {
                          const cat = getPmCat(pm.lastScore);
                          const risk = getPmRisk(pm);
                          const isHighRisk = risk === "High";
                          const isMedRisk = risk === "Medium";
                          
                          return (
                            <div 
                              key={pm.id} 
                              className="table-row pointsman-list-table-cols"
                              style={{ cursor: "default" }}
                            >
                              <div>{idx + 1}</div>
                              <div><strong>{pm.name}</strong></div>
                              <div>{pm.hrmsId}</div>
                              <div>
                                <span style={{
                                  background: cat === "A" ? "#dcfce7" : cat === "B" ? "#dbeafe" : cat === "C" ? "#fef3c7" : "#fee2e2",
                                  color: cat === "A" ? "#15803d" : cat === "B" ? "#1d4ed8" : cat === "C" ? "#b45309" : "#b91c1c",
                                  padding: "2px 8px",
                                  borderRadius: "4px",
                                  fontWeight: "700",
                                  fontSize: "11px"
                                }}>Category {cat}</span>
                              </div>
                              <div><strong>{pm.lastScore}/100</strong></div>
                              <div>
                                {pm.hrmsId === "PM_1001" ? "2026-03-28" : 
                                 pm.hrmsId === "PM_1102" ? "2026-03-10" : 
                                 pm.hrmsId === "PM_1103" ? "2026-02-15" : 
                                 pm.hrmsId === "PM_1104" ? "2026-03-18" : 
                                 pm.hrmsId === "PM_1105" ? "2026-01-20" : 
                                 pm.hrmsId === "PM_1106" ? "2026-03-05" : 
                                 pm.hrmsId === "PM_1107" ? "2026-03-20" : 
                                 pm.hrmsId === "PM_1108" ? "2026-02-01" : "—"}
                              </div>
                              <div>
                                <span className={`sm2-status-pill sm2-status-${pm.approvalStatus.toLowerCase()}`} style={{ display: "inline-block" }}>
                                  {pm.approvalStatus}
                                </span>
                              </div>
                              <div>
                                <span style={{
                                  background: isHighRisk ? "#fee2e2" : isMedRisk ? "#fef3c7" : "#dcfce7",
                                  color: isHighRisk ? "#b91c1c" : isMedRisk ? "#b45309" : "#15803d",
                                  padding: "2px 8px",
                                  borderRadius: "4px",
                                  fontWeight: "700",
                                  fontSize: "11px"
                                }}>{risk}</span>
                              </div>
                              <div>
                                <button
                                  type="button"
                                  className="sm2-monitor-btn"
                                  onClick={() => {
                                    setSelectedPointsmanForMonitoring(pm);
                                  }}
                                  style={{
                                    backgroundColor: "#1d4ed8",
                                    color: "#ffffff",
                                    border: "none",
                                    padding: "6px 12px",
                                    fontSize: "12px",
                                    borderRadius: "6px",
                                    fontWeight: "700",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    boxShadow: "0 2px 4px rgba(29, 78, 216, 0.15)"
                                  }}
                                >
                                  Monitor
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>

                <style>{`
                  .pointsman-list-table-wide {
                    min-width: 1000px;
                  }
                  .pointsman-list-table-cols {
                    display: grid;
                    grid-template-columns: 60px 1.5fr 1fr 1.2fr 1.3fr 1.3fr 1.2fr 1fr 100px;
                    align-items: center;
                    gap: 10px;
                  }
                `}</style>
              </>
            )}
          </div>
        );

      case "Add Station":
        return (
          <div className="user-management-page">
            <div className="add-user-title-wrap">
              <h2>ADD STATION</h2>
            </div>

            <div className="form-container structured-form-card">
              <form onSubmit={handleAddStationSubmit} className="user-form">
                {renderStationFormFields(false)}

                <div className="add-user-actions two-btn-actions">
                  <button type="button" className="action-btn" onClick={handleResetStationForm}>
                    Reset
                  </button>
                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      case "View / Edit Station":
        return (
          <div className="user-management-page">
            <div className="page-header">
              <h2>VIEW / EDIT STATION</h2>
            </div>

            <div className="form-container structured-form-card">
              <form onSubmit={handleUpdateStation} className="user-form">
                {renderStationFormFields(!isStationEditMode)}

                <div className="add-user-actions two-btn-actions">
                  <button type="button" className="action-btn" onClick={() => setActivePage("Station Management")}>
                    Back
                  </button>
                  {!isStationEditMode ? (
                    <button type="button" className="submit-btn" onClick={() => setIsStationEditMode(true)}>
                      Edit Station
                    </button>
                  ) : (
                    <button type="submit" className="submit-btn">
                      Update
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        );

      case "Traffic Inspector":
        return (
          <div className="user-management-page">
            <div className="page-header">
              <h2>TRAFFIC INSPECTOR MANAGEMENT</h2>
            </div>

            <div className="chart-card ti-top-search">
              <label htmlFor="ti-top-search-input">Search (Name / HRMS ID)</label>
              <div className="ti-top-search-input-wrap">
                <Search size={16} />
                <input
                  id="ti-top-search-input"
                  type="text"
                  placeholder="Type name or HRMS ID"
                  value={tiSearch}
                  onChange={(e) => setTiSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="users-list-container">
              <div className="users-table-wrapper">
                <div className="users-table ti-table-wide">
                  <div className="table-header ti-table-cols">
                    <div>Name</div>
                    <div>Employee ID</div>
                    <div>Jurisdiction</div>
                    <div>Category</div>
                    <div>Assessment Status</div>
                    <div>Actions</div>
                  </div>

                  {filteredTrafficInspectors.length === 0 ? (
                    <div className="table-empty-state">No Traffic Inspectors found.</div>
                  ) : (
                    filteredTrafficInspectors.map((row) => (
                      <div key={row.id} className="table-row ti-table-cols">
                        <div>
                          <button type="button" className="ti-name-link" onClick={() => handleOpenTiProfile(row.id)}>
                            {row.name}
                          </button>
                        </div>
                        <div>{row.employeeId}</div>
                        <div>{row.jurisdiction}</div>
                        <div>{renderCategoryBadge(row.category)}</div>
                        <div>
                          <span className={row.assessmentStatus === "Completed" ? "status-active-pill" : "status-inactive-pill"}>
                            {row.assessmentStatus}
                          </span>
                        </div>
                        <div className="table-action-cell ti-actions-cell">
                          <button type="button" className="action-btn" onClick={() => handleTiViewClick(row)}>
                            View
                          </button>
                          <button
                            type="button"
                            className="action-btn"
                            style={{
                              background: localStorage.getItem("ti_exam_assigned") === "true" ? "#16a34a" : "#2563eb",
                              color: "#fff",
                              fontWeight: "600"
                            }}
                            onClick={() => {
                              const currentStatus = localStorage.getItem("ti_exam_assigned") === "true";
                              if (currentStatus) {
                                localStorage.removeItem("ti_exam_assigned");
                                alert(`Exam recalled for Traffic Inspector ${row.name || ""}.`);
                                setTrafficInspectors(prev => prev.map(ti => ti.id === row.id ? { ...ti, assessmentStatus: "Pending" } : ti));
                              } else {
                                localStorage.setItem("ti_exam_assigned", "true");
                                alert(`Exam assigned and sent to Traffic Inspector ${row.name || ""}.`);
                                setTrafficInspectors(prev => prev.map(ti => ti.id === row.id ? { ...ti, assessmentStatus: "In Progress" } : ti));
                              }
                              window.dispatchEvent(new Event("storage"));
                            }}
                          >
                            {localStorage.getItem("ti_exam_assigned") === "true" ? "Exam Sent ✓" : "Send Exam"}
                          </button>
                          <button type="button" className="action-btn action-edit" onClick={() => handleOpenLinkTi(row.id)}>
                            Link Stations & SMs
                          </button>
                          <div className="ti-shift-inline">
                            <select
                              value={tiShiftDrafts[row.id] || ""}
                              onChange={(e) =>
                                setTiShiftDrafts((prev) => ({
                                  ...prev,
                                  [row.id]: e.target.value
                                }))
                              }
                            >
                              <option value="">Shift to...</option>
                              {stationDivisionOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <button type="button" className="action-btn" onClick={() => handleShiftTi(row.id)}>
                              <ArrowRightLeft size={14} />
                              Shift
                            </button>
                          </div>
                          <button type="button" className="action-btn action-delete" onClick={() => handleRemoveTi(row.id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>



            {linkTargetTi && (
              <div className="chart-card ti-link-card">
                <div className="ti-profile-header">
                  <h3>Link {linkTargetTi.name} to Stations & SMs</h3>
                  <button
                    type="button"
                    className="action-btn"
                    onClick={() => {
                      setTiLinkTargetId(null);
                      setTiLinkDraft({ stations: [], sms: [] });
                    }}
                  >
                    Close
                  </button>
                </div>

                <div className="ti-link-grid">
                  <div className="ti-link-block">
                    <h4>Stations</h4>
                    {stationLinkOptions.map((stationName) => (
                      <label key={stationName} className="ti-link-option">
                        <input
                          type="checkbox"
                          checked={tiLinkDraft.stations.includes(stationName)}
                          onChange={() => toggleMultiValue("stations", stationName)}
                        />
                        <span>{stationName}</span>
                      </label>
                    ))}
                  </div>

                  <div className="ti-link-block">
                    <h4>Station Masters</h4>
                    {smLinkOptions.map((smName) => (
                      <label key={smName} className="ti-link-option">
                        <input
                          type="checkbox"
                          checked={tiLinkDraft.sms.includes(smName)}
                          onChange={() => toggleMultiValue("sms", smName)}
                        />
                        <span>{smName}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="add-user-actions">
                  <button type="button" className="submit-btn" onClick={handleSaveTiLinks}>
                    Save Links
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      
      case "User Management": {
        const uniqueStationsList = Array.from(new Set(DASHBOARD_96_STATIONS.map(s => s.stationName))).sort();
        
        return (
          <div className="user-management-page">
            <div className="add-user-title-wrap" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div style={{
                background: "linear-gradient(135deg, #0d2c4d 0%, #1e40af 100%)",
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(13, 44, 77, 0.2)",
                color: "#ffffff"
              }}>
                <UserPlus size={28} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "800", color: "#0d2c4d", letterSpacing: "-0.5px" }}>ADD NEW SYSTEM USER</h2>
                <p className="subtitle-text" style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#64748b" }}>
                  Role-Based Operational Staff Provisioning & Management Console
                </p>
              </div>
            </div>

            <div className="form-container structured-form-card">
              <form onSubmit={handleSubmitUser} className="user-form">
                
                {/* Field Group 1: General & Contact Info */}
                <div className="form-section-header">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0d2c4d', margin: '0 0 10px', fontSize: '15px', fontWeight: '800' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0d2c4d', display: 'inline-block' }}></span>
                    1. General & Contact Information
                  </h4>
                  <div className="section-divider" style={{ height: '1px', background: '#d5dfeb', marginBottom: '16px' }}></div>
                </div>
                
                <div className="add-user-grid">
                  <div className="add-user-col">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="employeeName"
                        value={userFormData.employeeName}
                        onChange={handleUserFormChange}
                        placeholder="Enter full name (e.g. A. K. Sharma)"
                        className={formErrors.employeeName ? "error" : ""}
                      />
                      {formErrors.employeeName && <span className="error-text">{formErrors.employeeName}</span>}
                    </div>

                    <div className="form-group">
                      <label>HRMS ID / Employee ID *</label>
                      <input
                        type="text"
                        name="hrmsId"
                        value={userFormData.hrmsId}
                        onChange={handleUserFormChange}
                        placeholder="Enter unique ID (e.g. PM_8820)"
                        className={formErrors.hrmsId ? "error" : ""}
                      />
                      {formErrors.hrmsId && <span className="error-text">{formErrors.hrmsId}</span>}
                    </div>
                  </div>

                  <div className="add-user-col">
                    <div className="form-group">
                      <label>Mobile Number *</label>
                      <input
                        type="text"
                        name="mobileNo"
                        value={userFormData.mobileNo}
                        onChange={handleUserFormChange}
                        placeholder="Enter 10-digit mobile number"
                        className={formErrors.mobileNo ? "error" : ""}
                      />
                      {formErrors.mobileNo && <span className="error-text">{formErrors.mobileNo}</span>}
                    </div>

                    <div className="form-group">
                      <label>Email ID *</label>
                      <input
                        type="email"
                        name="emailId"
                        value={userFormData.emailId}
                        onChange={handleUserFormChange}
                        placeholder="Enter email address (e.g. user@rail.in)"
                        className={formErrors.emailId ? "error" : ""}
                      />
                      {formErrors.emailId && <span className="error-text">{formErrors.emailId}</span>}
                    </div>
                  </div>
                </div>

                {/* Field Group 2: Designation & Station Placement */}
                <div className="form-section-header" style={{ marginTop: '24px' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0d2c4d', margin: '0 0 10px', fontSize: '15px', fontWeight: '800' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0d2c4d', display: 'inline-block' }}></span>
                    2. Designation & Station Placement Setup
                  </h4>
                  <div className="section-divider" style={{ height: '1px', background: '#d5dfeb', marginBottom: '16px' }}></div>
                </div>

                <div className="add-user-grid">
                  <div className="add-user-col">
                    <div className="form-group">
                      <label>Role / Designation *</label>
                      <select
                        name="designation"
                        value={userFormData.designation}
                        onChange={handleUserFormChange}
                        className={formErrors.designation ? "error" : ""}
                      >
                        <option value="">Select Role</option>
                        {designationOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {formErrors.designation && <span className="error-text">{formErrors.designation}</span>}
                    </div>

                    <div className="form-group">
                      <label>Railway Zone *</label>
                      <select
                        name="zone"
                        value={userFormData.zone}
                        onChange={handleUserFormChange}
                        className={formErrors.zone ? "error" : ""}
                      >
                        <option value="">Select Zone</option>
                        {stationZoneOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {formErrors.zone && <span className="error-text">{formErrors.zone}</span>}
                    </div>
                  </div>

                  <div className="add-user-col">
                    <div className="form-group">
                      <label>Division *</label>
                      <select
                        name="division"
                        value={userFormData.division}
                        onChange={handleUserFormChange}
                        className={formErrors.division ? "error" : ""}
                      >
                        <option value="">Select Division</option>
                        {stationDivisionOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {formErrors.division && <span className="error-text">{formErrors.division}</span>}
                    </div>

                    <div className="form-group">
                      <label>Station Name *</label>
                      <select
                        name="stationName"
                        value={userFormData.stationName}
                        onChange={handleUserFormChange}
                        className={formErrors.stationName ? "error" : ""}
                      >
                        <option value="">Select Station</option>
                        {uniqueStationsList.map((station) => (
                          <option key={station} value={station}>
                            {station}
                          </option>
                        ))}
                      </select>
                      {formErrors.stationName && <span className="error-text">{formErrors.stationName}</span>}
                    </div>
                  </div>
                </div>

                {/* Field Group 3: Dynamic Role-Based Custom Operational Profile */}
                {userFormData.designation === "Pointsman" && (
                  <div className="role-specific-section pointsman-box animate-fade-in" style={{ marginTop: '24px', padding: '18px', background: '#f0f7ff', border: '1px solid #c2e0ff', borderRadius: '10px' }}>
                    <div className="form-section-header">
                      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0d2c4d', margin: '0 0 10px', fontSize: '14px', fontWeight: '800' }}>
                        Pointsman Operational Setup
                      </h4>
                      <div className="section-divider" style={{ height: '1px', backgroundColor: '#c2e0ff', marginBottom: '16px' }}></div>
                    </div>
                    <div className="add-user-grid">
                      <div className="add-user-col">
                        <div className="form-group">
                          <label>Reporting Station Master *</label>
                          <input
                            type="text"
                            name="reportingSm"
                            value={userFormData.reportingSm}
                            onChange={handleUserFormChange}
                            placeholder="Station Master Name"
                            className={formErrors.reportingSm ? "error" : ""}
                          />
                          {formErrors.reportingSm && <span className="error-text">{formErrors.reportingSm}</span>}
                        </div>
                        <div className="form-group">
                          <label>Work Location Setup *</label>
                          <select
                            name="workLocation"
                            value={userFormData.workLocation}
                            onChange={handleUserFormChange}
                            className={formErrors.workLocation ? "error" : ""}
                          >
                            <option value="">Select Location</option>
                            <option value="Yard">Yard Area</option>
                            <option value="Cabin A">Cabin A</option>
                            <option value="Cabin B">Cabin B</option>
                            <option value="Platform Area">Platform Area</option>
                            <option value="Level Crossing Gate">Level Crossing Gate</option>
                          </select>
                          {formErrors.workLocation && <span className="error-text">{formErrors.workLocation}</span>}
                        </div>
                      </div>
                      <div className="add-user-col">
                        <div className="form-group">
                          <label>Assigned Shift *</label>
                          <select
                            name="shift"
                            value={userFormData.shift}
                            onChange={handleUserFormChange}
                            className={formErrors.shift ? "error" : ""}
                          >
                            <option value="">Select Shift</option>
                            <option value="Morning Shift (06:00 - 14:00)">Morning Shift (06:00 - 14:00)</option>
                            <option value="Evening Shift (14:00 - 22:00)">Evening Shift (14:00 - 22:00)</option>
                            <option value="Night Shift (22:00 - 06:00)">Night Shift (22:00 - 06:00)</option>
                            <option value="General Shift (09:00 - 18:00)">General Shift (09:00 - 18:00)</option>
                          </select>
                          {formErrors.shift && <span className="error-text">{formErrors.shift}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {userFormData.designation === "Station Master" && (
                  <div className="role-specific-section sm-box animate-fade-in" style={{ marginTop: '24px', padding: '18px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '10px' }}>
                    <div className="form-section-header">
                      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#065f46', margin: '0 0 10px', fontSize: '14px', fontWeight: '800' }}>
                        Station Master Operational Setup
                      </h4>
                      <div className="section-divider" style={{ height: '1px', backgroundColor: '#a7f3d0', marginBottom: '16px' }}></div>
                    </div>
                    <div className="add-user-grid">
                      <div className="add-user-col">
                        <div className="form-group">
                          <label>Operational Station *</label>
                          <select
                            name="smStation"
                            value={userFormData.smStation}
                            onChange={handleUserFormChange}
                            className={formErrors.smStation ? "error" : ""}
                          >
                            <option value="">Select Operational Station</option>
                            {uniqueStationsList.map((station) => (
                              <option key={station} value={station}>
                                {station}
                              </option>
                            ))}
                          </select>
                          {formErrors.smStation && <span className="error-text">{formErrors.smStation}</span>}
                        </div>
                        <div className="form-group">
                          <label>Operational Zone *</label>
                          <select
                            name="smZone"
                            value={userFormData.smZone}
                            onChange={handleUserFormChange}
                            className={formErrors.smZone ? "error" : ""}
                          >
                            <option value="">Select Zone</option>
                            {stationZoneOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          {formErrors.smZone && <span className="error-text">{formErrors.smZone}</span>}
                        </div>
                      </div>
                      <div className="add-user-col">
                        <div className="form-group">
                          <label>Operational Division *</label>
                          <select
                            name="smDivision"
                            value={userFormData.smDivision}
                            onChange={handleUserFormChange}
                            className={formErrors.smDivision ? "error" : ""}
                          >
                            <option value="">Select Division</option>
                            {stationDivisionOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          {formErrors.smDivision && <span className="error-text">{formErrors.smDivision}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {userFormData.designation === "Traffic Inspector" && (
                  <div className="role-specific-section ti-box animate-fade-in" style={{ marginTop: '24px', padding: '18px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px' }}>
                    <div className="form-section-header">
                      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#92400e', margin: '0 0 10px', fontSize: '14px', fontWeight: '800' }}>
                        Traffic Inspector Operational Setup
                      </h4>
                      <div className="section-divider" style={{ height: '1px', backgroundColor: '#fde68a', marginBottom: '16px' }}></div>
                    </div>
                    <div className="add-user-grid">
                      <div className="add-user-col">
                        <div className="form-group">
                          <label>Jurisdiction Division *</label>
                          <input
                            type="text"
                            name="jurisdiction"
                            value={userFormData.jurisdiction}
                            onChange={handleUserFormChange}
                            placeholder="Enter Jurisdiction (e.g. Nagpur Division)"
                            className={formErrors.jurisdiction ? "error" : ""}
                          />
                          {formErrors.jurisdiction && <span className="error-text">{formErrors.jurisdiction}</span>}
                        </div>
                        <div className="form-group">
                          <label>Reporting AOM *</label>
                          <select
                            name="reportingAom"
                            value={userFormData.reportingAom}
                            onChange={handleUserFormChange}
                            className={formErrors.reportingAom ? "error" : ""}
                          >
                            <option value="">Select AOM</option>
                            <option value="A. K. Sinha (AOM/G)">A. K. Sinha (AOM/G)</option>
                            <option value="M. K. Nair (AOM/Safety)">M. K. Nair (AOM/Safety)</option>
                            <option value="R. S. Prasad (AOM/Chg)">R. S. Prasad (AOM/Chg)</option>
                            <option value="P. K. Verma (Sr. DOM)">P. K. Verma (Sr. DOM)</option>
                          </select>
                          {formErrors.reportingAom && <span className="error-text">{formErrors.reportingAom}</span>}
                        </div>
                      </div>
                      <div className="add-user-col">
                        <div className="form-group">
                          <label>Linked Stations under supervision *</label>
                          <input
                            type="text"
                            name="linkedStations"
                            value={userFormData.linkedStations}
                            onChange={handleUserFormChange}
                            placeholder="E.g. Nagpur Main, Wardha Jn, Sewagram"
                            className={formErrors.linkedStations ? "error" : ""}
                          />
                          {formErrors.linkedStations && <span className="error-text">{formErrors.linkedStations}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="add-user-actions" style={{ marginTop: '24px' }}>
                  <button type="submit" className="submit-btn" style={{ padding: '12px 36px', fontSize: '14px' }}>
                    {editingUserId ? "🔒 UPDATE USER ACCOUNT" : "👤 ADD USER ACCOUNT"}
                  </button>
                </div>
              </form>
            </div>

            <div className="users-filter-section chart-card">
              <form className="filter-grid" onSubmit={handleFilterSubmit}>
                <div className="form-group">
                  <label>Mobile No</label>
                  <input
                    type="text"
                    name="mobileNo"
                    value={pendingFilters.mobileNo}
                    onChange={handleFilterChange}
                    placeholder="Filter by mobile"
                  />
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <select name="designation" value={pendingFilters.designation} onChange={handleFilterChange}>
                    <option value="">All Designations</option>
                    {designationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>HRMS ID</label>
                  <input
                    type="text"
                    name="hrmsId"
                    value={pendingFilters.hrmsId}
                    onChange={handleFilterChange}
                    placeholder="Filter by HRMS ID"
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select name="department" value={pendingFilters.department} onChange={handleFilterChange}>
                    <option value="">All Departments</option>
                    {departmentOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>User Type</label>
                  <select name="userType" value={pendingFilters.userType} onChange={handleFilterChange}>
                    <option value="">All User Types</option>
                    {userTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="filter-submit-wrap">
                  <button type="submit" className="submit-btn">Search / Submit</button>
                </div>
              </form>
            </div>

            <div className="users-list-container">
              <div className="users-table-toolbar">
                <h3>System User Directory</h3>
                <input
                  type="text"
                  className="users-table-search"
                  placeholder="Search users..."
                  value={tableSearch}
                  onChange={(e) => {
                    setTableSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="users-table-wrapper">
                <div className="users-table users-table-wide" style={{ minWidth: '1280px' }}>
                  <div className="table-header" style={{ display: 'grid', gridTemplateColumns: '60px 1.8fr 1.2fr 1.8fr 1.5fr 1.2fr 3fr' }}>
                    <div>Sr No</div>
                    <div>Employee Profile</div>
                    <div>Designation</div>
                    <div>Appointed</div>
                    <div>Contact Info</div>
                    <div>Account Status</div>
                    <div style={{ textAlign: 'center' }}>Actions</div>
                  </div>

                  {pagedUsers.length === 0 ? (
                    <div className="table-empty-state">No user accounts match criteria.</div>
                  ) : (
                    pagedUsers.map((row, idx) => (
                      <div key={row.id} className="table-row" style={{ display: 'grid', gridTemplateColumns: '60px 1.8fr 1.2fr 1.8fr 1.5fr 1.2fr 3fr', alignItems: 'center' }}>
                        <div>{(currentPage - 1) * pageSize + idx + 1}</div>
                        <div>
                          <button
                            type="button"
                            className="ti-name-link"
                            onClick={() => setSelectedUserProfile(row)}
                            style={{ display: 'block', textDecoration: 'underline', color: '#0d2c4d', fontSize: '13px', fontWeight: '800' }}
                          >
                            {row.employeeName}
                          </button>
                          <span style={{ fontSize: '11px', color: '#64748b' }}>HRMS: {row.hrmsId}</span>
                        </div>
                        <div>
                          <span style={{ padding: '4px 8px', borderRadius: '4px', background: row.designation === "Pointsman" ? '#eff6ff' : row.designation === "Station Master" ? '#ecfdf5' : '#fffbeb', color: row.designation === "Pointsman" ? '#1d4ed8' : row.designation === "Station Master" ? '#047857' : '#b45309', fontWeight: '700', fontSize: '11px' }}>
                            {row.designation}
                          </span>
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: '500' }}>{row.stationName}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{row.division} / {row.zone === "Central Railway" ? "CR" : row.zone}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '12px' }}>{row.mobileNo}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{row.emailId || "No Email"}</div>
                        </div>
                        <div>
                          <button
                            type="button"
                            className={row.status === "Inactive" ? "status-inactive-pill" : "status-active-pill"}
                            onClick={() => {
                              setUsers((prev) =>
                                prev.map((u) =>
                                  u.id === row.id
                                    ? { ...u, status: u.status === "Inactive" ? "Active" : "Inactive" }
                                    : u
                                )
                              );
                            }}
                            style={{ cursor: 'pointer', border: '0', fontSize: '11px', padding: '4px 10px', borderRadius: '12px', fontWeight: '700' }}
                          >
                            {row.status || "Active"}
                          </button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <button type="button" className="action-btn" onClick={() => setSelectedUserProfile(row)}>
                            Profile
                          </button>
                          
                          <button type="button" className="action-btn action-edit" onClick={() => handleEditUser(row.id)}>
                            Edit
                          </button>

                          <div className="ti-shift-inline" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <select
                              value={userShiftDrafts[row.id] || ""}
                              onChange={(e) =>
                                setUserShiftDrafts((prev) => ({
                                  ...prev,
                                  [row.id]: e.target.value
                                }))
                              }
                              style={{ height: '30px', border: '1px solid #d1dce8', borderRadius: '6px', fontSize: '11px', padding: '0 4px', background: '#fff' }}
                            >
                              <option value="">Shift Div...</option>
                              {stationDivisionOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              className="action-btn"
                              onClick={() => {
                                const newDiv = userShiftDrafts[row.id];
                                if (!newDiv) {
                                  alert("Please select a division to shift.");
                                  return;
                                }
                                setUsers((prev) =>
                                  prev.map((u) =>
                                    u.id === row.id
                                      ? {
                                          ...u,
                                          division: newDiv,
                                          smDivision: newDiv,
                                          jurisdiction: newDiv + " Division"
                                        }
                                      : u
                                  )
                                );
                                alert(`Successfully shifted ${row.employeeName} to ${newDiv} Division.`);
                              }}
                              style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '4px 8px' }}
                            >
                              <ArrowRightLeft size={12} />
                              Shift
                            </button>
                          </div>

                          <button type="button" className="action-btn action-delete" onClick={() => handleDeleteUser(row.id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="table-pagination-wrap">
                <button type="button" className="pagination-btn" onClick={goToPrevPage} disabled={currentPage === 1}>
                  Prev
                </button>
                <span className="pagination-text">
                  Page {currentPage} of {totalPages}
                </span>
                <button type="button" className="pagination-btn" onClick={goToNextPage} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            </div>

            {/* Premium User Profile View Detail Card */}
            {selectedUserProfile && (
              <div className="chart-card ti-profile-card animate-fade-in" style={{ marginTop: '20px', borderTop: '4px solid #0d2c4d', backgroundColor: '#fcfdfe' }}>
                <div className="ti-profile-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0d2c4d', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: '800', fontSize: '16px' }}>
                      {selectedUserProfile.employeeName?.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ margin: '0', fontSize: '18px', fontWeight: '800', color: '#0d2c4d' }}>
                        {selectedUserProfile.employeeName}
                      </h3>
                      <p style={{ margin: '0', fontSize: '12px', color: '#64748b' }}>HRMS ID: {selectedUserProfile.hrmsId} | Department: {selectedUserProfile.department || "Operations"}</p>
                    </div>
                  </div>
                  <button type="button" className="action-btn" onClick={() => setSelectedUserProfile(null)} style={{ background: '#64748b', color: '#fff' }}>
                    Close Profile
                  </button>
                </div>

                <div className="ti-profile-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', padding: '15px 0' }}>
                  <div><strong>Designation:</strong> <span style={{ color: '#1d4ed8', fontWeight: '700' }}>{selectedUserProfile.designation}</span></div>
                  <div><strong>Mobile No:</strong> {selectedUserProfile.mobileNo}</div>
                  <div><strong>Email ID:</strong> {selectedUserProfile.emailId || "N/A"}</div>
                  <div><strong>Account Status:</strong> <span style={{ color: selectedUserProfile.status === "Inactive" ? '#ef4444' : '#10b981', fontWeight: '700' }}>{selectedUserProfile.status || "Active"}</span></div>
                  
                  <div><strong>Current Zone:</strong> {selectedUserProfile.zone || "N/A"}</div>
                  <div><strong>Current Division:</strong> {selectedUserProfile.division || "N/A"}</div>
                  <div><strong>Current Station:</strong> {selectedUserProfile.stationName || "N/A"}</div>
                  <div><strong>Reporting Officer:</strong> {selectedUserProfile.reportingOfficer || "N/A"}</div>
                </div>

                {/* Role Specific details */}
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '10px' }}>
                  <h4 style={{ margin: '0 0 8px', fontSize: '14px', color: '#0f172a', fontWeight: '800' }}>Operational Profile Specifications</h4>
                  
                  {selectedUserProfile.designation === "Pointsman" && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '13px' }}>
                      <div><strong>Reporting Station Master:</strong> {selectedUserProfile.reportingSm || "N/A"}</div>
                      <div><strong>Assigned Shift:</strong> {selectedUserProfile.shift || "N/A"}</div>
                      <div><strong>Work Location Setup:</strong> {selectedUserProfile.workLocation || "N/A"}</div>
                    </div>
                  )}

                  {selectedUserProfile.designation === "Station Master" && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '13px' }}>
                      <div><strong>Operational Station:</strong> {selectedUserProfile.smStation || selectedUserProfile.stationName || "N/A"}</div>
                      <div><strong>Operational Division:</strong> {selectedUserProfile.smDivision || selectedUserProfile.division || "N/A"}</div>
                      <div><strong>Operational Zone:</strong> {selectedUserProfile.smZone || selectedUserProfile.zone || "N/A"}</div>
                    </div>
                  )}

                  {selectedUserProfile.designation === "Traffic Inspector" && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '13px' }}>
                      <div><strong>Jurisdiction Division:</strong> {selectedUserProfile.jurisdiction || "N/A"}</div>
                      <div><strong>Reporting AOM Officer:</strong> {selectedUserProfile.reportingAom || "N/A"}</div>
                      <div style={{ gridColumn: 'span 3', marginTop: '5px' }}><strong>Linked Stations under supervision:</strong> {selectedUserProfile.linkedStations || "N/A"}</div>
                    </div>
                  )}

                  {!["Pointsman", "Station Master", "Traffic Inspector"].includes(selectedUserProfile.designation) && (
                    <span style={{ fontSize: '13px', color: '#64748b' }}>No dynamic operational specifications required for this designation.</span>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      }
      
      case "Pending Approvals": {
        const getEmployeeName = (empLine) => {
          if (!empLine) return "—";
          const match = empLine.match(/Employee:\s*([^|]+)/i);
          return match ? match[1].trim() : empLine;
        };
        const getDivision = (empLine) => {
          if (!empLine) return "—";
          const match = empLine.match(/Division:\s*(.+)/i);
          return match ? match[1].trim() : "—";
        };
        const getAssessedBy = (byLine) => {
          if (!byLine) return "—";
          const match = byLine.match(/(?:Assessed by|Awaiting):\s*([^-]+)/i);
          return match ? match[1].trim() : byLine;
        };
        const getPendingSince = (byLine) => {
          if (!byLine) return "—";
          const match = byLine.match(/on\s+(\d{4}-\d{2}-\d{2})/i);
          return match ? match[1].trim() : "2026-04-12";
        };
        const getDesignation = (title) => {
          if (!title) return "—";
          return title.split(" - ")[0] || "Employee";
        };
        
        const handleViewDetails = (item) => {
          const tab = resolveAssessmentTab(item.title);
          setAssessmentRoleTab(tab);
          setOpenAssessmentId(item.id);
          setActivePage("Assessments");
        };

        return (
          <div className="reports-page">
            <div className="page-header" style={{ marginBottom: "20px" }}>
              <h2>Pending Approval Requests</h2>
              <p>Review safety and performance metrics, then approve or reject pending evaluations.</p>
            </div>

            {assessmentActionNotice && (
              <div className="notice-card success" style={{ marginBottom: "16px", padding: "12px 16px" }}>
                <span>✓</span>
                <p><strong>System Action:</strong> {assessmentActionNotice}</p>
                <button 
                  type="button" 
                  onClick={() => setAssessmentActionNotice("")} 
                  style={{ marginLeft: "auto", background: "none", border: "none", color: "#16a34a", cursor: "pointer", fontWeight: "bold" }}
                >
                  ✕
                </button>
              </div>
            )}

            <div className="reports-container">
              <div className="reports-table-section">
                <h3>Awaiting Sign-Off ({pendingAssessments.length})</h3>
                <div style={{ overflowX: "auto" }}>
                  <table className="reports-table">
                    <thead>
                      <tr>
                        <th>HRMS ID</th>
                        <th>Employee Details</th>
                        <th>Designation</th>
                        <th>Submitted Score</th>
                        <th>Submitted By</th>
                        <th>Pending Since</th>
                        <th style={{ textAlign: "center" }}>Approval Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingAssessments.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                            No pending assessments require approval at this time.
                          </td>
                        </tr>
                      ) : (
                        pendingAssessments.map((item) => {
                          const { score, grade } = computeScoreAndGrade(item);
                          const empName = getEmployeeName(item.employeeLine);
                          const division = getDivision(item.employeeLine);
                          const designation = getDesignation(item.title);
                          const assessedBy = getAssessedBy(item.assessedByLine);
                          const pendingSince = getPendingSince(item.assessedByLine);

                          return (
                            <tr key={item.id}>
                              <td><strong>{item.id}</strong></td>
                              <td>
                                <div style={{ fontWeight: 600, color: "#0f172a" }}>{empName}</div>
                                <div style={{ fontSize: "11px", color: "#64748b" }}>Division: {division}</div>
                              </td>
                              <td>
                                <span style={{
                                  padding: "4px 8px",
                                  borderRadius: "6px",
                                  backgroundColor: "#f1f5f9",
                                  color: "#475569",
                                  fontSize: "11px",
                                  fontWeight: "600",
                                  textTransform: "uppercase"
                                }}>
                                  {designation}
                                </span>
                              </td>
                              <td>
                                <strong style={{ color: score >= 90 ? "#16a34a" : score >= 80 ? "#2563eb" : "#dc2626" }}>
                                  {score}/100
                                </strong>
                                <span style={{
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  backgroundColor: "#eff6ff",
                                  color: "#2563eb",
                                  fontSize: "11px",
                                  fontWeight: "600",
                                  marginLeft: "6px"
                                }}>
                                  Grade {grade}
                                </span>
                              </td>
                              <td>{assessedBy}</td>
                              <td>{pendingSince}</td>
                              <td>
                                <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                  <button
                                    type="button"
                                    className="sm2-monitor-btn"
                                    onClick={() => handleViewDetails(item)}
                                    style={{
                                      backgroundColor: "#eff6ff",
                                      color: "#2563eb",
                                      border: "1px solid #bfdbfe",
                                      padding: "6px 12px",
                                      fontSize: "12px"
                                    }}
                                  >
                                    View Details
                                  </button>
                                  <button
                                    type="button"
                                    className="sm2-monitor-btn"
                                    onClick={() => handleApproveAssessment(item.id)}
                                    style={{
                                      backgroundColor: "#f0fdf4",
                                      color: "#16a34a",
                                      border: "1px solid #bbf7d0",
                                      padding: "6px 12px",
                                      fontSize: "12px"
                                    }}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    type="button"
                                    className="sm2-monitor-btn"
                                    onClick={() => handleRejectAssessment(item.id)}
                                    style={{
                                      backgroundColor: "#fef2f2",
                                      color: "#dc2626",
                                      border: "1px solid #fecaca",
                                      padding: "6px 12px",
                                      fontSize: "12px"
                                    }}
                                  >
                                    Reject
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      }
      
      case "Assessments": {
        // We resolve if there's an active assessment open (Level 3 - Form View)
        // If openAssessmentId is NOT null, activeAssessment is the item in pendingAssessments (or approvedAssessments)
        const activeAssessment = pendingAssessments.find((item) => item.id === openAssessmentId) || 
                                 approvedAssessments.find((item) => item.id === openAssessmentId) || null;
        
        if (activeAssessment) {
          // Render Level 3: Structured Evaluation Form View!
          const activeAnswers = answersByAssessment[activeAssessment.id] || buildPrefilledAnswers(activeAssessment.title);
          const liveScore = calculateAssessmentScore(activeAnswers, true);
          
          // Map to TI employee info
          const tiEmployee = trafficInspectors.find(t => t.employeeId === activeAssessment.id);
          const name = tiEmployee ? tiEmployee.name : (activeAssessment.employeeLine?.match(/Employee:\s*([^|]+)/i)?.[1]?.trim() || "Traffic Inspector");
          const hrmsId = activeAssessment.id;
          const division = tiEmployee ? tiEmployee.division : (activeAssessment.employeeLine?.match(/Division:\s*(.+)/i)?.[1]?.trim() || "Nagpur");
          
          const isApproved = approvedAssessments.some(a => a.id === activeAssessment.id);
          const locked = isApproved;
          
          let ynScore = 0;
          assessmentCriteria.forEach(sec => {
            if (sec.key !== "knowledgeOfRules") {
              ynScore += getTiSectionScore(sec.key, activeAnswers);
            }
          });
          const isAlcoholic = activeAnswers.alcoholicStatus === "Alcoholic";
          const liveCat = isAlcoholic ? "D" : (liveScore >= 90 ? "A" : liveScore >= 80 ? "B" : "C");
          
          const CAT_B = { A: "#dcfce7", B: "#eff6ff", C: "#fff7ed", D: "#fef2f2" };
          const CAT_C = { A: "#16a34a", B: "#2563eb", C: "#ea580c", D: "#dc2626" };

          const checklistDetails = {
            alertnessAndObservation: [
              "Maintains high situational awareness during station safety audits",
              "Monitors and corrects hand signaling compliance among pointsmen",
              "Inspects station master cabins for correct block instrument procedures"
            ],
            safetyRecord: [
              "No active safety violation reports or warnings on personal record",
              "Proactively reports and documents track and signaling safety defects"
            ],
            leadershipAndManagement: [
              "Conducts regular safety counseling sessions for supervised station staff",
              "Resolves operational bottlenecks efficiently during duty shifts"
            ],
            discipline: [
              "Adheres strictly to official inspection rosters and schedules",
              "Maintains up-to-date and accurate inspection logbooks"
            ],
            appearanceAndNeatness: [
              "Wears prescribed uniform, cap, and badges during active duty hours",
              "Exhibits neat, professional, and highly disciplined personal conduct"
            ]
          };

          const isActivated = localStorage.getItem(`ti_exam_assigned_${activeAssessment.id}`) === "true";
          const isMcqCompleted = localStorage.getItem(`ti_exam_taken_${activeAssessment.id}`) === "true";
          const knowledge = isMcqCompleted ? 25 : 0;

          return (
            <section className="sm2-card animate-fade-in" style={{ padding: "24px" }}>
              {/* Header */}
              <div className="sm2-card-hdr" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div>
                  <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                    Assessment — {name}
                  </h2>
                  <p style={{ margin: "4px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
                    {hrmsId} · {division} Division
                  </p>
                </div>
                <button
                  className="sm2-ghost-btn"
                  style={{ display: "flex", alignItems: "center", gap: "6px", border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer", padding: "8px 16px", borderRadius: "8px", fontWeight: "700", fontSize: "13px", color: "#475569" }}
                  onClick={() => setOpenAssessmentId(null)}
                >
                  ← Back
                </button>
              </div>

              {assessmentActionNotice && (
                <div className="assessment-action-notice" style={{ marginBottom: "16px", padding: "10px 14px", background: "#e8f5e9", border: "1px solid #c8e6c9", color: "#1b5e20", borderRadius: "6px", fontSize: "13px", fontWeight: "600" }}>
                  {assessmentActionNotice}
                </div>
              )}

              {/* ── Section 1: Knowledge of Rules ── */}
              <div className="sm2-assess-section">
                <div className="sm2-assess-sec-hdr">
                  <span className="sm2-assess-sec-num">01</span>
                  <div>
                    <strong>Knowledge of Rules (MCQ-based)</strong>
                    <span className="sm2-assess-sec-meta">Auto-calculated from Traffic Inspector Online Competency Test</span>
                  </div>
                  <span className="sm2-assess-live-marks">{knowledge} / 25</span>
                </div>

                <div className="sm2-mcq-card-container" style={{ marginTop: 16 }}>
                  {isMcqCompleted ? (
                    <div className="sm2-mcq-success-card">
                      <div className="sm2-mcq-card-header">
                        <div className="sm2-mcq-status">
                          <span className="sm2-status-dot green"></span>
                          <span className="sm2-status-text text-green font-semibold">MCQ Test Completed</span>
                        </div>
                        <div className="sm2-mcq-lock-badge">
                          <Lock size={12} />
                          <span>Read-Only (Synced)</span>
                        </div>
                      </div>

                      <div className="sm2-mcq-card-body">
                        <div className="sm2-mcq-score-display">
                          <div className="sm2-mcq-large-score">
                            <strong>25</strong>
                            <span>/ 25</span>
                          </div>
                          <div className="sm2-mcq-percentage-badge">
                            100% Score
                          </div>
                          <button
                            type="button"
                            style={{ marginLeft: "auto", background: "#fee2e2", border: "none", color: "#dc2626", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}
                            onClick={() => {
                              localStorage.removeItem(`ti_exam_taken_${activeAssessment.id}`);
                              handleAnswerChange(activeAssessment.id, "knowledgeOfRules", "no");
                            }}
                          >
                            Reset Mock Exam
                          </button>
                        </div>

                        <div className="sm2-mcq-progress-container">
                          <div className="sm2-mcq-progress-bar">
                            <div
                              className="sm2-mcq-progress-fill"
                              style={{
                                width: `100%`,
                                background: "#16a34a"
                              }}
                            />
                          </div>
                        </div>

                        <div className="sm2-mcq-meta-grid">
                          <div className="sm2-mcq-meta-item">
                            <span className="sm2-mcq-meta-label">Submitted On</span>
                            <strong className="sm2-mcq-meta-val">30 May 2026</strong>
                          </div>
                          <div className="sm2-mcq-meta-item">
                            <span className="sm2-mcq-meta-label">Assessed Entity</span>
                            <strong className="sm2-mcq-meta-val">{name}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="sm2-mcq-pending-card">
                      <div className="sm2-mcq-card-header">
                        <div className="sm2-mcq-status">
                          <span className={`sm2-status-dot ${isActivated ? "amber" : "red"}`}></span>
                          <span className={`sm2-status-text text-${isActivated ? "amber" : "red"} font-semibold`}>
                            {isActivated ? "MCQ Test Active" : "MCQ Test Locked"}
                          </span>
                        </div>
                        <div className="sm2-mcq-lock-badge">
                          <Lock size={12} />
                          <span>Read-Only</span>
                        </div>
                      </div>

                      <div className="sm2-mcq-card-body pending" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div className="sm2-mcq-pending-message" style={{ display: "flex", gap: "12px", background: isActivated ? "#fffbeb" : "#fef2f2", border: isActivated ? "1px solid #fef3c7" : "1px solid #fee2e2", padding: "16px", borderRadius: "8px" }}>
                          <AlertTriangle size={24} color={isActivated ? "#d97706" : "#dc2626"} style={{ marginTop: 2, flexShrink: 0 }} />
                          <div>
                            <h4 style={{ margin: "0 0 4px", fontSize: 14, color: isActivated ? "#b45309" : "#991b1b" }}>{isActivated ? "Awaiting Traffic Inspector Attempt" : "Competency Exam Locked"}</h4>
                            <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: isActivated ? "#d97706" : "#dc2626" }}>
                              {isActivated ? (
                                <span>The Traffic Inspector safety competency trial is active. Request TI (<strong>{name}</strong>) to log into their portal and attempt the 25 safety questions to automatically sync scores.</span>
                              ) : (
                                <span>The Traffic Inspector MCQ exam is currently locked. You must click the <strong>Activate Safety Exam</strong> button below to enable the Traffic Inspector to log in and attempt the test.</span>
                              )}
                            </p>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "12px" }}>
                          <button
                            type="button"
                            style={{
                              padding: "8px 16px",
                              borderRadius: "8px",
                              fontSize: "13px",
                              fontWeight: "700",
                              cursor: "pointer",
                              border: "none",
                              background: isActivated ? "#fef2f2" : "#2563eb",
                              color: isActivated ? "#dc2626" : "#ffffff",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                            }}
                            onClick={() => {
                              const nextVal = !isActivated;
                              localStorage.setItem(`ti_exam_assigned_${activeAssessment.id}`, nextVal ? "true" : "false");
                              handleAnswerChange(activeAssessment.id, "knowledgeOfRules", "no");
                            }}
                          >
                            {isActivated ? "Deactivate Safety Competency Exam" : "Activate Safety Competency Exam"}
                          </button>
                        </div>

                        <div className="sm2-mcq-meta-grid">
                          <div className="sm2-mcq-meta-item">
                            <span className="sm2-mcq-meta-label">Assessment Status</span>
                            <strong className={`sm2-mcq-meta-val text-${isActivated ? "amber" : "red"}`}>{isActivated ? "Active & Awaiting Attempt" : "Locked (Awaiting Activation)"}</strong>
                          </div>
                          <div className="sm2-mcq-meta-item">
                            <span className="sm2-mcq-meta-label">Assessed Entity</span>
                            <strong className="sm2-mcq-meta-val">{name}</strong>
                          </div>
                          <div className="sm2-mcq-meta-item">
                            <span className="sm2-mcq-meta-label">Total Questions</span>
                            <strong className="sm2-mcq-meta-val">25 Questions (1 mark each)</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Sections 02-06: Yes/No blocks ── */}
              {assessmentCriteria.filter(x => x.key !== "knowledgeOfRules").map((sec, si) => {
                const checklist = checklistDetails[sec.key] || [];
                const count = checklist.length;
                const sectionScore = getTiSectionScore(sec.key, activeAnswers);
                const sectionMax = sec.marks;
                const weight = count > 0 ? (sectionMax / count).toFixed(2) : 0;

                return (
                  <div key={sec.key} className="sm2-assess-section" style={{ opacity: 1 }}>
                    <div className="sm2-assess-sec-hdr">
                      <span className="sm2-assess-sec-num">{String(si + 2).padStart(2, "0")}</span>
                      <div>
                        <strong>{sec.label}</strong>
                        <span className="sm2-assess-sec-meta">{count} criteria · {weight} marks each · Total {sectionMax}</span>
                      </div>
                      <span className="sm2-assess-live-marks">{sectionScore} / {sectionMax}</span>
                    </div>
                    <div className="sm2-yn-grid">
                      {checklist.map((itemText, idx) => {
                        const itemKey = `${sec.key}_${idx}`;
                        const currentAnswer = activeAnswers[itemKey] || "no";

                        return (
                          <div key={idx} className="sm2-yn-row">
                            <span style={{ fontSize: "13.5px" }} className="sm2-yn-label">{idx + 1}. {itemText}</span>
                            <div className="sm2-yn-btns">
                              <button
                                type="button" disabled={locked}
                                className={currentAnswer === "yes" ? "sm2-yn-btn sm2-yn-yes active" : "sm2-yn-btn sm2-yn-yes"}
                                style={{ cursor: locked ? "not-allowed" : "pointer" }}
                                onClick={() => handleAnswerChange(activeAssessment.id, itemKey, "yes")}
                              >
                                Yes
                              </button>
                              <button
                                type="button" disabled={locked}
                                className={currentAnswer === "no" ? "sm2-yn-btn sm2-yn-no active" : "sm2-yn-btn sm2-yn-no"}
                                style={{ cursor: locked ? "not-allowed" : "pointer" }}
                                onClick={() => handleAnswerChange(activeAssessment.id, itemKey, "no")}
                              >
                                No
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* ── Section 07: Additional Details ── */}
              <div className="sm2-assess-section" style={{ opacity: 1 }}>
                <div className="sm2-assess-sec-hdr">
                  <span className="sm2-assess-sec-num">07</span>
                  <div><strong>Additional Details</strong><span className="sm2-assess-sec-meta">Mandatory fields</span></div>
                </div>
                <div className="sm2-assess-form" style={{ marginTop: 12 }}>
                  <div className="sm2-form-field">
                    <label>Knowledge Marks (MCQ Test)</label>
                    <input type="number" min={0} max={25} disabled={locked} value={knowledge} style={{ background: "#f1f5f9" }} readOnly />
                  </div>
                  <div className="sm2-form-field">
                    <label>Alcoholic Status <span style={{ color: "#dc2626" }}>*</span></label>
                    <select disabled={locked} value={activeAnswers.alcoholicStatus || "Non-Alcoholic"} onChange={e => handleAnswerChange(activeAssessment.id, "alcoholicStatus", e.target.value)}>
                      <option value="">Select…</option>
                      <option>Non-Alcoholic</option>
                      <option>Alcoholic</option>
                    </select>
                  </div>
                  <div className="sm2-form-field">
                    <label>PME Status</label>
                    <select disabled={locked} value={activeAnswers.pmeStatus || "Fit"} onChange={e => handleAnswerChange(activeAssessment.id, "pmeStatus", e.target.value)}>
                      <option>Fit</option><option>Unfit</option><option>Pending</option>
                    </select>
                  </div>
                  <div className="sm2-form-field">
                    <label>REF Status</label>
                    <select disabled={locked} value={activeAnswers.refStatus || "Cleared"} onChange={e => handleAnswerChange(activeAssessment.id, "refStatus", e.target.value)}>
                      <option>Cleared</option><option>Pending</option><option>Failed</option>
                    </select>
                  </div>
                  <div className="sm2-form-field">
                    <label>Counselling</label>
                    <select disabled={locked} value={activeAnswers.counselling || "Not Required"} onChange={e => handleAnswerChange(activeAssessment.id, "counselling", e.target.value)}>
                      <option>Not Required</option><option>Recommended</option><option>Mandatory</option>
                    </select>
                  </div>
                  <div className="sm2-form-field">
                    <label>Automatic Training</label>
                    <select disabled={locked} value={activeAnswers.automaticTraining || "Not Required"} onChange={e => handleAnswerChange(activeAssessment.id, "automaticTraining", e.target.value)}>
                      <option>Not Required</option><option>Recommended</option><option>Mandatory</option>
                    </select>
                  </div>
                  <div className="sm2-form-field sm2-form-full" style={{ gridColumn: "1/-1" }}>
                    <label>Remarks for Officer / AOM</label>
                    <textarea rows={3} disabled={locked} value={activeAnswers.remarks || ""} onChange={e => handleAnswerChange(activeAssessment.id, "remarks", e.target.value)} placeholder="Enter observations, recommendations…" />
                  </div>
                </div>
              </div>

              {/* ── Live Score Bar ── */}
              <div className="sm2-live-score" style={{ opacity: 1 }}>
                <div><label>Knowledge (MCQ)</label><strong>{knowledge}/25</strong></div>
                <div><label>Yes/No Score</label><strong>{ynScore}/75</strong></div>
                <div><label>Grand Total</label><strong style={{ color: CAT_C[liveCat], fontSize: 22 }}>{liveScore}/100</strong></div>
                <div><label>Category</label><span className="sm2-badge" style={{ background: CAT_B[liveCat], color: CAT_C[liveCat], fontSize: 13, padding: "4px 14px" }}>Category {liveCat}</span></div>
              </div>

              {locked ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
                  <div style={{ background: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0", padding: "12px", borderRadius: "8px", fontWeight: "700", fontSize: "13px", textAlign: "center" }}>
                    ✓ Assessment Approved and Locked (AOM Approved)
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                    <button
                      className="sm2-ghost-btn"
                      style={{ padding: "10px 20px", borderRadius: "8px", fontWeight: "700", border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer", color: "#334155" }}
                      onClick={() => {
                        alert("Assessment saved as draft successfully!");
                      }}
                    >
                      Save as Draft
                    </button>
                    <button
                      className="sm2-ghost-btn"
                      style={{ padding: "10px 20px", borderRadius: "8px", fontWeight: "700", border: "1px solid #fca5a5", background: "#fef2f2", cursor: "pointer", color: "#dc2626" }}
                      onClick={() => handleRejectAssessment(activeAssessment.id)}
                    >
                      Reject
                    </button>
                    <button
                      className="sm2-primary-btn"
                      style={{ padding: "10px 20px", borderRadius: "8px", fontWeight: "700", border: "none", background: "#2563eb", color: "#ffffff", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
                      onClick={() => handleApproveAssessment(activeAssessment.id)}
                    >
                      <CheckCircle size={14} /> Approve &amp; Lock Assessment
                    </button>
                  </div>
                </div>
              )}
            </section>
          );
        }

        // --- LEVEL 2: Roster View ---
        const isTI = assessmentRoleTab === "TI";
        const rolePrefix = isTI ? "ti" : "ss";
        const roleTitle = isTI ? "Traffic Inspectors" : "Station Superintendents";
        const roleDesc = isTI
          ? "Traffic Inspectors pending assessment are listed below. Open the form to conduct a structured evaluation."
          : "Station Superintendents pending assessment are listed below. Open the form to conduct a structured evaluation.";

        // Dynamic source list
        const sourceEmployees = isTI ? trafficInspectors : aomSuperintendents;

        const rosterList = sourceEmployees.map((emp) => {
          const pending = pendingAssessments.find(p => p.id === emp.employeeId);
          const approved = approvedAssessments.find(a => a.id === emp.employeeId);
          
          let status = "Pending";
          let score = emp.lastScore || "";
          let lastAssessed = emp.lastAssessedDate || "2026-05-30";
          
          if (pending) {
            const isExamAssigned = localStorage.getItem(`${rolePrefix}_exam_assigned_${emp.employeeId}`) === "true";
            const isExamTaken = localStorage.getItem(`${rolePrefix}_exam_taken_${emp.employeeId}`) === "true";
            
            if (isExamTaken) {
              status = "Exam Taken";
            } else if (isExamAssigned) {
              status = "Exam Sent";
            } else if (pending.actionType === "approval") {
              status = "Submitted";
            } else {
              status = "Pending";
            }
          } else if (approved) {
            status = "Approved";
            const match = approved.score?.match(/Score:\s*(\d+)/i);
            score = match ? parseInt(match[1]) : (emp.lastScore || 85);
            const dateMatch = approved.detail?.match(/on\s+(\d{4}-\d{2}-\d{2})/i);
            lastAssessed = dateMatch ? dateMatch[1] : "2026-05-30";
          } else {
            status = emp.assessmentStatus === "Completed" ? "Approved" : (emp.assessmentStatus || "Pending");
          }
          
          return {
            ...emp,
            status,
            score,
            lastAssessed
          };
        });

        // Roster totals
        const totalEmployeesCount = rosterList.length;
        const pendingCount = rosterList.filter(x => x.status === "Pending" || x.status === "Exam Sent").length;
        const completedCount = rosterList.filter(x => x.status === "Approved" || x.status === "Exam Taken" || x.status === "Submitted").length;
        const rejectedCount = rosterList.filter(x => x.status === "Rejected").length;
        const lastUpdatedDate = "30 May 2026";

        // Filter elements
        const uniqueStationsList = ["All", ...new Set(stations.map(s => s.name || s.stationName).filter(Boolean))];
        
        const filteredList = rosterList.filter((emp) => {
          const matchesSearch = assessSearch === "" ||
            emp.name.toLowerCase().includes(assessSearch.toLowerCase()) ||
            emp.employeeId.toLowerCase().includes(assessSearch.toLowerCase());
          
          const matchesStation = assessStation === "All" ||
            emp.stationName === assessStation ||
            emp.division === assessStation;
            
          const matchesStatus = assessStatus === "All" || emp.status === assessStatus;
          const matchesDate = assessDate === "" || emp.lastAssessed === assessDate;
          
          return matchesSearch && matchesStation && matchesStatus && matchesDate;
        });

        const openForm = (emp) => {
          let pendingItem = pendingAssessments.find(p => p.id === emp.employeeId);
          if (!pendingItem) {
            const approvedItem = approvedAssessments.find(a => a.id === emp.employeeId);
            if (approvedItem) {
              pendingItem = {
                id: approvedItem.id,
                title: approvedItem.title,
                statusLabel: "Approved",
                assessedByLine: approvedItem.detail,
                employeeLine: `Employee: ${emp.name} | Division: ${emp.division || "Nagpur"}`,
                actionType: "approval"
              };
            } else {
              pendingItem = {
                id: emp.employeeId,
                title: `${isTI ? "Traffic Inspector" : "Station Superintendent"} - ${emp.employeeId}`,
                statusLabel: "Pending Assessment",
                assessedByLine: `Awaiting: Your Assessment - on ${todayIso()}`,
                employeeLine: `Employee: ${emp.name} | Division: ${emp.division || "Nagpur"}`,
                actionType: "assessment"
              };
              setPendingAssessments(prev => [pendingItem, ...prev]);
            }
          }
          
          setOpenAssessmentId(pendingItem.id);
          setAnswersByAssessment((prev) => {
            if (prev[pendingItem.id]) {
              return prev;
            }
            return {
              ...prev,
              [pendingItem.id]: buildPrefilledAnswers(pendingItem.title)
            };
          });
        };

        const stationCodeMap = {
          "Parbhani Junction": "PBN",
          "Amla": "AMLA",
          "Nagpur Junction": "NGP",
          "Pune Junction": "PUNE",
          "Mumbai Junction": "BCT",
          "Delhi Junction": "DLI"
        };

        return (
          <div className="ti2-page-body animate-fade-in" style={{ padding: "24px", background: "#f8fafc", minHeight: "100%", width: "100%", boxSizing: "border-box" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>
                  Assessments — {roleTitle}
                </h1>
                <p style={{ margin: 0, fontSize: "14px", color: "#64748b", fontWeight: "500" }}>
                  {roleDesc}
                </p>
              </div>
            </div>

            {/* Unified Role Choice Selection Boxes */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
              <div
                onClick={() => {
                  setAssessmentRoleTab("TI");
                  setAssessSearch("");
                  setAssessStation("All");
                  setAssessStatus("All");
                  setAssessDate("");
                }}
                style={{
                  background: "#ffffff",
                  border: assessmentRoleTab === "TI" ? "2px solid #2563eb" : "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "20px 24px",
                  cursor: "pointer",
                  boxShadow: assessmentRoleTab === "TI" ? "0 4px 12px rgba(37,99,235,0.08)" : "0 1px 3px rgba(0,0,0,0.02)",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px"
                }}
              >
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  background: assessmentRoleTab === "TI" ? "#eff6ff" : "#f8fafc",
                  color: assessmentRoleTab === "TI" ? "#2563eb" : "#64748b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>
                    Traffic Inspectors (TI)
                  </h3>
                  <p style={{ margin: 0, fontSize: "12.5px", color: "#64748b", fontWeight: "500", lineHeight: "1.4" }}>
                    Conduct safety audits, check online exams, and manage inspector approvals.
                  </p>
                </div>
              </div>

              <div
                onClick={() => {
                  setAssessmentRoleTab("SS");
                  setAssessSearch("");
                  setAssessStation("All");
                  setAssessStatus("All");
                  setAssessDate("");
                }}
                style={{
                  background: "#ffffff",
                  border: assessmentRoleTab === "SS" ? "2px solid #2563eb" : "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "20px 24px",
                  cursor: "pointer",
                  boxShadow: assessmentRoleTab === "SS" ? "0 4px 12px rgba(37,99,235,0.08)" : "0 1px 3px rgba(0,0,0,0.02)",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px"
                }}
              >
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  background: assessmentRoleTab === "SS" ? "#eff6ff" : "#f8fafc",
                  color: assessmentRoleTab === "SS" ? "#2563eb" : "#64748b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <UserCheck size={24} />
                </div>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>
                    Station Superintendents (SS)
                  </h3>
                  <p style={{ margin: 0, fontSize: "12.5px", color: "#64748b", fontWeight: "500", lineHeight: "1.4" }}>
                    Track safety performance, perform active shift audits, and view compliance lists.
                  </p>
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "24px" }}>
              {[
                { label: `Total ${isTI ? "Traffic Inspectors" : "Station Superintendents"}`, value: totalEmployeesCount, subtitle: "In your jurisdiction", icon: Users, bg: "#ffffff", color: "#475569", valColor: "#0f172a" },
                { label: "Pending Assessments", value: pendingCount, subtitle: "Awaiting completion", icon: ClipboardCheck, bg: "#ffffff", color: "#ea580c", valColor: "#ea580c" },
                { label: "Completed This Month", value: completedCount, subtitle: "Assessments done", icon: CheckCircle, bg: "#ffffff", color: "#16a34a", valColor: "#16a34a" },
                { label: "Rejected", value: rejectedCount, subtitle: "Needs review", icon: AlertTriangle, bg: "#ffffff", color: "#dc2626", valColor: "#dc2626" },
                { label: "Last Updated", value: lastUpdatedDate, subtitle: "Recent activity", icon: Calendar, bg: "#ffffff", color: "#64748b", valColor: "#0f172a" }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "20px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px"
                  }}
                >
                  <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", color: stat.color, flexShrink: 0 }}>
                    <stat.icon size={20} />
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                      <span style={{ fontSize: "22px", fontWeight: "800", color: stat.valColor }}>{stat.value}</span>
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "#334155", marginTop: "2px" }}>{stat.label}</div>
                    <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "500", marginTop: "1px" }}>{stat.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters Section */}
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr auto", gap: "16px", alignItems: "end" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                    Search {isTI ? "Traffic Inspector" : "Station Superintendent"}
                  </label>
                  <div style={{ position: "relative" }}>
                    <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                    <input
                      type="text"
                      placeholder="Name or HRMS ID..."
                      value={assessSearch}
                      onChange={(e) => setAssessSearch(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px 10px 36px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#0f172a",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Station</label>
                  <select
                    value={assessStation}
                    onChange={(e) => setAssessStation(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#0f172a",
                      boxSizing: "border-box"
                    }}
                  >
                    <option value="All">All Stations</option>
                    {uniqueStationsList.filter(x => x !== "All").map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Exam Status</label>
                  <select
                    value={assessStatus}
                    onChange={(e) => setAssessStatus(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#0f172a",
                      boxSizing: "border-box"
                    }}
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Exam Sent">Exam Sent</option>
                    <option value="Exam Taken">Exam Taken</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Last Assessed</label>
                  <div style={{ position: "relative" }}>
                    <Calendar size={14} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                    <input
                      type="date"
                      value={assessDate}
                      onChange={(e) => setAssessDate(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 36px 10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#0f172a",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => { setAssessSearch(""); setAssessStation("All"); setAssessStatus("All"); setAssessDate(""); }}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #cbd5e1",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#475569",
                      cursor: "pointer"
                    }}
                  >
                    Reset
                  </button>
                  <button
                    style={{
                      background: "#0f172a",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#ffffff",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer"
                    }}
                  >
                    <Filter size={14} /> Apply Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Roster Table */}
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
              }}
            >
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1.5px solid #e2e8f0", background: "#f8fafc", textAlign: "left" }}>
                      <th style={{ padding: "12px 16px", fontSize: "11px", color: "#475569", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {isTI ? "TRAFFIC INSPECTOR" : "STATION SUPERINTENDENT"}
                      </th>
                      <th style={{ padding: "12px 16px", fontSize: "11px", color: "#475569", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" }}>HRMS ID</th>
                      <th style={{ padding: "12px 16px", fontSize: "11px", color: "#475569", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" }}>STATION</th>
                      <th style={{ padding: "12px 16px", fontSize: "11px", color: "#475569", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" }}>LAST ASSESSED</th>
                      <th style={{ padding: "12px 16px", fontSize: "11px", color: "#475569", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" }}>SCORE</th>
                      <th style={{ padding: "12px 16px", fontSize: "11px", color: "#475569", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" }}>EXAM STATUS</th>
                      <th style={{ padding: "12px 16px", fontSize: "11px", color: "#475569", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "right" }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredList.map((item) => {
                      const stationCode = stationCodeMap[item.stationName] || "STN";

                      const examStatusBadgeStyle = (status) => {
                        if (status === "Exam Sent") return { bg: "#f3e8ff", color: "#6b21a8" };
                        if (status === "Exam Taken") return { bg: "#dcfce7", color: "#166534" };
                        if (status === "Submitted") return { bg: "#dbeafe", color: "#2563eb" };
                        if (status === "Rejected") return { bg: "#fee2e2", color: "#dc2626" };
                        if (status === "Approved") return { bg: "#dcfce7", color: "#166534" };
                        return { bg: "#f1f5f9", color: "#475569" };
                      };

                      const statusColors = examStatusBadgeStyle(item.status);

                      return (
                        <tr key={item.id || item.employeeId} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "14px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#1e3a8a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "14px" }}>
                                {item.name.charAt(0)}
                              </div>
                              <div>
                                <div style={{ fontWeight: "700", color: "#0f172a", fontSize: "14px" }}>{item.name}</div>
                                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "500", marginTop: "2px" }}>
                                  {isTI ? "Traffic Inspector" : "Station Superintendent"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "14px 16px", color: "#475569", fontWeight: "600", fontSize: "13px", fontFamily: "monospace" }}>
                            {item.employeeId}
                          </td>
                          <td style={{ padding: "14px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <span style={{ color: "#334155", fontSize: "13px", fontWeight: "500" }}>{item.stationName}</span>
                              <span style={{ background: "#eff6ff", color: "#2563eb", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "700" }}>
                                {stationCode}
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: "14px 16px", color: "#64748b", fontSize: "13px", fontWeight: "500" }}>
                            {item.lastAssessed || "—"}
                          </td>
                          <td style={{ padding: "14px 16px", color: "#0f172a", fontWeight: "800", fontSize: "14px" }}>
                            {item.score ? `${item.score}/100` : "—"}
                          </td>
                          <td style={{ padding: "14px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <span style={{ background: statusColors.bg, color: statusColors.color, padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "700" }}>
                                {item.status}
                              </span>
                              {item.status === "Exam Sent" && (
                                <span style={{ background: "#f3e8ff", color: "#6b21a8", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}>
                                  <Clock size={12} /> Waiting for Response
                                </span>
                              )}
                              {item.status === "Rejected" && (
                                <span style={{ background: "#fee2e2", color: "#dc2626", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}>
                                  <AlertTriangle size={12} /> Needs Review
                                </span>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: "14px 16px", textAlign: "right" }}>
                            <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "flex-end" }}>
                              {(item.status === "Pending" || item.status === "Rejected") && (
                                <>
                                  <button
                                    onClick={() => {
                                      localStorage.setItem(`${rolePrefix}_exam_assigned_${item.employeeId}`, "true");
                                      const exists = pendingAssessments.some(p => p.id === item.employeeId);
                                      if (!exists) {
                                        setPendingAssessments(prev => [{
                                          id: item.employeeId,
                                          title: `${isTI ? "Traffic Inspector" : "Station Superintendent"} - ${item.employeeId}`,
                                          statusLabel: "Pending Assessment",
                                          assessedByLine: `Awaiting: Your Assessment - on ${todayIso()}`,
                                          employeeLine: `Employee: ${item.name} | Division: ${item.division || "Nagpur"}`,
                                          actionType: "assessment"
                                        }, ...prev]);
                                      }
                                      alert(`Exam assigned and sent to ${isTI ? "Traffic Inspector" : "Station Superintendent"} ${item.name || ""}.`);
                                      setAssessmentActionNotice(`Exam assigned to ${item.name}.`);
                                    }}
                                    style={{
                                      background: "#7c3aed",
                                      border: "none",
                                      color: "#ffffff",
                                      padding: "6px 12px",
                                      borderRadius: "8px",
                                      cursor: "pointer",
                                      fontWeight: "700",
                                      fontSize: "12px"
                                    }}
                                  >
                                    Send Access
                                  </button>
                                  <button
                                    onClick={() => openForm(item)}
                                    style={{
                                      background: "#ffffff",
                                      border: "1px solid #cbd5e1",
                                      padding: "5px 12px",
                                      borderRadius: "8px",
                                      fontSize: "12px",
                                      fontWeight: "700",
                                      color: "#475569",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      cursor: "pointer"
                                    }}
                                  >
                                    Open Form <ExternalLink size={12} />
                                  </button>
                                </>
                              )}
                              {item.status === "Exam Sent" && (
                                <>
                                  <button
                                    onClick={() => {
                                      localStorage.setItem(`${rolePrefix}_exam_taken_${item.employeeId}`, "true");
                                      alert(`Mock sync: ${isTI ? "Traffic Inspector" : "Station Superintendent"} ${item.name} completed the online exam.`);
                                      setAssessmentActionNotice(`Online exam completed by ${item.name}.`);
                                    }}
                                    style={{
                                      background: "#2563eb",
                                      border: "none",
                                      color: "#ffffff",
                                      padding: "6px 12px",
                                      borderRadius: "8px",
                                      cursor: "pointer",
                                      fontWeight: "700",
                                      fontSize: "12px"
                                    }}
                                  >
                                    Simulate Exam Taken
                                  </button>
                                  <button
                                    onClick={() => openForm(item)}
                                    style={{
                                      background: "#ffffff",
                                      border: "1px solid #cbd5e1",
                                      padding: "5px 12px",
                                      borderRadius: "8px",
                                      fontSize: "12px",
                                      fontWeight: "700",
                                      color: "#475569",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      cursor: "pointer"
                                    }}
                                  >
                                    Open Form <ExternalLink size={12} />
                                  </button>
                                </>
                              )}
                              {item.status === "Exam Taken" && (
                                <button
                                  onClick={() => openForm(item)}
                                  style={{
                                    background: "#16a34a",
                                    border: "none",
                                    color: "#ffffff",
                                    padding: "6px 16px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "700",
                                    fontSize: "12px"
                                  }}
                                >
                                  Start Assessment
                                </button>
                              )}
                              {item.status === "Submitted" && (
                                <>
                                  <button
                                    onClick={() => openForm(item)}
                                    style={{
                                      background: "#2563eb",
                                      border: "none",
                                      color: "#ffffff",
                                      padding: "6px 12px",
                                      borderRadius: "8px",
                                      cursor: "pointer",
                                      fontWeight: "700",
                                      fontSize: "12px"
                                    }}
                                  >
                                    View Form
                                  </button>
                                  <button
                                    onClick={() => openForm(item)}
                                    style={{
                                      background: "#ea580c",
                                      border: "none",
                                      color: "#ffffff",
                                      padding: "6px 12px",
                                      borderRadius: "8px",
                                      cursor: "pointer",
                                      fontWeight: "700",
                                      fontSize: "12px"
                                    }}
                                  >
                                    Edit
                                  </button>
                                </>
                              )}
                              {item.status === "Approved" && (
                                <button
                                  onClick={() => openForm(item)}
                                  style={{
                                    background: "#2563eb",
                                    border: "none",
                                    color: "#ffffff",
                                    padding: "6px 12px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "700",
                                    fontSize: "12px"
                                  }}
                                >
                                  View Form
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredList.length === 0 && (
                      <tr>
                        <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "#64748b", fontSize: "14px", fontWeight: "500" }}>
                          No {isTI ? "Traffic Inspectors" : "Station Superintendents"} match your current filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Info */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>
                  Showing 1 to {filteredList.length} of {filteredList.length} entries
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    disabled
                    style={{
                      background: "#ffffff",
                      border: "1px solid #cbd5e1",
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#cbd5e1",
                      cursor: "not-allowed"
                    }}
                  >
                    &lt;
                  </button>
                  <button
                    style={{
                      background: "#0f172a",
                      border: "none",
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "13px"
                    }}
                  >
                    1
                  </button>
                  <button
                    disabled
                    style={{
                      background: "#ffffff",
                      border: "1px solid #cbd5e1",
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#cbd5e1",
                      cursor: "not-allowed"
                    }}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
      
      case "Reports and Analytics": {
        const ROLE_MAP = { pointsmen: "Pointsman", sm: "Station Master", ss: "Station Superintendent", tm: "Train Manager", ti: "Traffic Inspector" };
        
        if (selectedReportUserId) {
          const u = allEmployees.find(x => x.hrmsId === selectedReportUserId);
          if (!u) return null;

          const getCat = s => s >= 80 ? "A" : s >= 50 ? "B" : s >= 26 ? "C" : "D";
          const cat = u.category || getCat(u.lastScore || 0);
          
          const CAT_C  = { A: "#16a34a", B: "#2563eb", C: "#d97706", D: "#dc2626" };
          const CAT_B  = { A: "#dcfce7", B: "#dbeafe", C: "#fef3c7", D: "#fee2e2" };
          const RISK_C = { High: "#dc2626", Medium: "#d97706", Low: "#16a34a" };
          
          const isHighRisk = u.riskLevel === "High" || (u.lastScore || 0) < 50;
          const risk = isHighRisk ? "High" : (u.lastScore || 0) >= 80 ? "Low" : "Medium";
          const pmeVal = u.riskLevel === "High" ? "PENDING" : "FIT";
          const refVal = u.riskLevel === "High" ? "EXPIRED" : "CLEARED";

          return (
            <div className="ti2-card animate-fade-in" style={{ padding: "24px", background: "white", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0" }}>
              {/* Header section with back button */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1.5px solid #e2edf8", paddingBottom: "16px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div className="ti2-pm-avatar" style={{ width: 48, height: 48, fontSize: 18, background: "#2563eb", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontWeight: "700" }}>{u.name.charAt(0)}</div>
                  <div>
                    <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a", margin: 0 }}>{u.name}</h2>
                    <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#64748b", fontWeight: "700" }}>{ROLE_MAP[u.role] || u.designation || u.role} Dossier · {u.stationName}</p>
                  </div>
                </div>
                <button className="ti2-link-btn" onClick={() => setSelectedReportUserId(null)} style={{ fontSize: "13px", fontWeight: "800", color: "#2563eb", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                  ← Back to Reports
                </button>
              </div>

              {/* Quick Info Summary metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
                <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Grand Total Score</span>
                  <strong style={{ display: "block", fontSize: "24px", color: CAT_C[cat] || "#2563eb", marginTop: "4px", fontWeight: "900" }}>{u.lastScore}/100</strong>
                </div>
                <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Safety Grade</span>
                  <div>
                    <span className="ti2-badge" style={{ display: "inline-block", background: CAT_B[cat] || "#dbeafe", color: CAT_C[cat] || "#2563eb", fontSize: "13px", fontWeight: "800", padding: "4px 14px", borderRadius: "8px", marginTop: "8px" }}>
                      Category {cat}
                    </span>
                  </div>
                </div>
                <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>PME Clearance</span>
                  <div>
                    <span className="ti2-badge" style={{ display: "inline-block", background: pmeVal === "FIT" ? "#dcfce7" : "#fee2e2", color: pmeVal === "FIT" ? "#16a34a" : "#dc2626", fontSize: "13px", fontWeight: "800", padding: "4px 14px", borderRadius: "8px", marginTop: "8px" }}>
                      {pmeVal}
                    </span>
                  </div>
                </div>
                <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>REF Training</span>
                  <div>
                    <span className="ti2-badge" style={{ display: "inline-block", background: refVal === "CLEARED" ? "#dcfce7" : "#fee2e2", color: refVal === "CLEARED" ? "#16a34a" : "#dc2626", fontSize: "13px", fontWeight: "800", padding: "4px 14px", borderRadius: "8px", marginTop: "8px" }}>
                      {refVal}
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
                      <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Employee HRMS ID</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.hrmsId}</dd></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Designation</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{ROLE_MAP[u.role] || u.designation}</dd></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Jurisdiction Station</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.stationName}</dd></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Contact Number</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.mobileNo || "+91 98765 11001"}</dd></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Date of Appointment</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.doj || "2018-02-12"}</dd></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Alcoholic Status</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#16a34a" }}>Non-Alcoholic</dd></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Assigned Division Risk</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: RISK_C[risk] }}>{risk} Risk</dd></div>
                    </dl>
                  </div>

                  {/* Action button */}
                  <button className="ti2-primary-btn" onClick={() => alert("Exporting Dossier PDF...")} style={{ width: "100%", height: "42px", justifyContent: "center", background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", borderRadius: "8px", fontWeight: "700", cursor: "pointer", border: "none", color: "#ffffff", display: "flex", alignItems: "center", gap: "6px" }}>
                    <FileText size={16}/> Export Assessment Dossier (PDF)
                  </button>
                </div>

                {/* Right side Performance Breakdown */}
                <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "14px", padding: "18px" }}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: "13px", fontWeight: "800", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1.5px solid #e2edf8", paddingBottom: "8px" }}>Sectional Competency Breakdown</h3>
                  
                  {u.role === "pointsmen" ? (
                    /* Pointsman sections competency progress bars */
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {(() => {
                        const secs = [
                          { title: "Knowledge of Rules", score: Math.round(u.lastScore * 0.23), max: 25 },
                          { title: "Alertness & Observation", score: Math.round(u.lastScore * 0.22), max: 25 },
                          { title: "Safety Record", score: Math.round(u.lastScore * 0.14), max: 15 },
                          { title: "Leadership & Management", score: Math.round(u.lastScore * 0.13), max: 15 },
                          { title: "Discipline", score: Math.round(u.lastScore * 0.09), max: 10 },
                          { title: "Appearance & Neatness", score: Math.round(u.lastScore * 0.09), max: 10 },
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
                        let totalYes = 12;
                        let knowledgeMarks = Math.max(0, u.lastScore - 60);

                        const secs = [
                          { title: "Station Management", score: Math.round(totalYes * 5 * 0.25), max: 25 },
                          { title: "Safety & Compliance", score: Math.round(totalYes * 4 * 0.25), max: 20 },
                          { title: "Staff Supervision", score: Math.round(totalYes * 3 * 0.20), max: 15 },
                          { title: "Documentation & Reporting", score: Math.round(totalYes * 3 * 0.15), max: 15 },
                          { title: "Emergency Handling", score: Math.round(totalYes * 5 * 0.25), max: 25 },
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

        const divSummary = [
          { label: "Average Division Score",  val: 87    },
          { label: "Safety Compliance %",     val: "91%" },
          { label: "High-Risk Staff",         val: 18    },
          { label: "Pending Approvals",       val: 246   },
          { label: "Total Reports Generated", val: 6245  },
        ];

        const STATION_OPTS = ["All", ...stations.map(s => s.stationName)];
        const TI_OPTS      = ["All","TI PAR","TI AMLA","TI NGP"];
        const ROLE_OPTS    = ["All","Pointsman","Station Master","Station Superintendent","Train Manager","Traffic Inspector"];

        const repFiltered = allEmployees.filter(s => {
          const matchesSearch = !repF.search || 
            (s.name || "").toLowerCase().includes(repF.search.toLowerCase()) || 
            (s.hrmsId || "").toLowerCase().includes(repF.search.toLowerCase());
          const matchesRole = repF.role === "All" || (s.designation || "").toLowerCase().includes(repF.role.toLowerCase()) || (ROLE_MAP[s.role] || "").toLowerCase().includes(repF.role.toLowerCase());
          const matchesTi = repF.ti === "All" || (s.division || "").toLowerCase().includes(repF.ti.replace("TI ", "").toLowerCase());
          const matchesStation = repF.station === "All" || s.stationName === repF.station;
          const matchesCat = repF.cat === "All" || s.category === repF.cat;
          const matchesRisk = repF.riskLevel === repF.risk || repF.risk === "All";
          return matchesSearch && matchesRole && matchesTi && matchesStation && matchesCat && matchesRisk;
        });

        const catBadge = c => <span className="sdom-badge" style={{ background: { A: "#dcfce7", B: "#dbeafe", C: "#fef3c7", D: "#fee2e2" }[c] || "#f3f4f6", color: { A: "#16a34a", B: "#2563eb", C: "#d97706", D: "#dc2626" }[c] || "#6b7280" }}>{c ? `Cat. ${c}` : "—"}</span>;
        const riskBadge = r => <span className="sdom-badge" style={{ background: { Low: "#dcfce7", Medium: "#fef3c7", High: "#fee2e2" }[r] || "#f3f4f6", color: { Low: "#16a34a", Medium: "#d97706", High: "#dc2626" }[r] || "#6b7280" }}>{r}</span>;
        const statusBadge = s => <span className="sdom-badge" style={{ background: { Approved: "#dcfce7", Pending: "#fef3c7", Rejected: "#fee2e2", Completed: "#dcfce7" }[s] || "#f3f4f6", color: { Approved: "#16a34a", Pending: "#d97706", Rejected: "#dc2626", Completed: "#16a34a" }[s] || "#6b7280" }}>{s}</span>;

        return (
          <div className="sdom-fade" style={{ background: "#f8fafc", padding: "24px", borderRadius: "16px" }}>
            <h1 className="sdom-page-title" style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>Reports &amp; Analytics</h1>
            <p className="sdom-page-subtitle" style={{ fontSize: "14px", color: "#64748b", margin: "0 0 24px" }}>Division-level reporting hub. Use filters below to generate specific staff reports.</p>

            {/* Summary */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "16px", marginBottom: "24px" }}>
              {divSummary.map(c => (
                <div key={c.label} className="sdom-stat-card" onClick={() => {
                  if (c.label === "High-Risk Staff") setRepF(p => ({ ...p, risk: "High", role: "All", search: "", cat: "All", station: "All", ti: "All" }));
                  else if (c.label === "Pending Approvals") setRepF(p => ({ ...p, risk: "All", role: "All", search: "", cat: "All", station: "All", ti: "All" }));
                  else setRepF(p => ({ ...p, risk: "All", role: "All", search: "", cat: "All", station: "All", ti: "All" }));
                }} style={{ background: "white", border: "1px solid #e2e8f0", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", cursor: "pointer", transition: "box-shadow 0.2s, border-color 0.2s, transform 0.15s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(30,58,95,0.12)"; e.currentTarget.style.borderColor = "#93c5fd"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)"; e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div className="sdom-stat-value" style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>{c.val}</div>
                  <div className="sdom-stat-label" style={{ fontSize: "12px", color: "#64748b", marginTop: "4px", fontWeight: "600", textTransform: "uppercase" }}>{c.label}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="sdom-filter-bar" style={{ display: "flex", gap: "16px", background: "white", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "24px", flexWrap: "wrap", alignItems: "flex-end" }}>
              <div className="sdom-filter-field" style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 2, minWidth: "200px" }}>
                <label style={{ fontSize: "11px", fontWeight: "800", color: "#475569", textTransform: "uppercase" }}>Search by Name/HRMS ID</label>
                <div style={{ position: "relative" }}>
                  <Search size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }}/>
                  <input 
                    type="text" 
                    placeholder="Type name or HRMS ID..." 
                    value={repF.search || ""} 
                    onChange={e => setRepF(p => ({ ...p, search: e.target.value }))} 
                    style={{ width: "100%", height: "42px", padding: "0 12px 0 36px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", fontWeight: "600", outline: "none" }}
                  />
                </div>
              </div>
              <div className="sdom-filter-field" style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: "120px" }}>
                <label style={{ fontSize: "11px", fontWeight: "800", color: "#475569", textTransform: "uppercase" }}>Role</label>
                <select value={repF.role} onChange={e => setRepF(p => ({ ...p, role: e.target.value }))} style={{ height: "42px", padding: "0 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", fontWeight: "600" }}>
                  {ROLE_OPTS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="sdom-filter-field" style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: "120px" }}>
                <label style={{ fontSize: "11px", fontWeight: "800", color: "#475569", textTransform: "uppercase" }}>TI Area</label>
                <select value={repF.ti} onChange={e => setRepF(p => ({ ...p, ti: e.target.value }))} style={{ height: "42px", padding: "0 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", fontWeight: "600" }}>
                  {TI_OPTS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="sdom-filter-field" style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: "140px" }}>
                <label style={{ fontSize: "11px", fontWeight: "800", color: "#475569", textTransform: "uppercase" }}>Station</label>
                <select value={repF.station} onChange={e => setRepF(p => ({ ...p, station: e.target.value }))} style={{ height: "42px", padding: "0 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", fontWeight: "600" }}>
                  {STATION_OPTS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="sdom-filter-field" style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: "100px" }}>
                <label style={{ fontSize: "11px", fontWeight: "800", color: "#475569", textTransform: "uppercase" }}>Category</label>
                <select value={repF.cat} onChange={e => setRepF(p => ({ ...p, cat: e.target.value }))} style={{ height: "42px", padding: "0 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", fontWeight: "600" }}>
                  <option>All</option><option>A</option><option>B</option><option>C</option><option>D</option>
                </select>
              </div>
              <div className="sdom-filter-field" style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: "110px" }}>
                <label style={{ fontSize: "11px", fontWeight: "800", color: "#475569", textTransform: "uppercase" }}>Risk Level</label>
                <select value={repF.risk} onChange={e => setRepF(p => ({ ...p, risk: e.target.value }))} style={{ height: "42px", padding: "0 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", fontWeight: "600" }}>
                  <option>All</option><option>Low</option><option>Medium</option><option>High</option>
                </select>
              </div>
              <div>
                <button className="sdom-btn-primary" style={{ height: "42px", display: "flex", alignItems: "center", gap: "8px", background: "#2563eb", color: "white", padding: "0 20px", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}>
                  <Search size={16}/> Search
                </button>
              </div>
            </div>

            <div className="sdom-chart-card" style={{ background: "white", border: "1px solid #e2e8f0", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ marginBottom: 14, fontWeight: 700, color: "#1e293b" }}>{repFiltered.length} staff in report</div>
              <div className="sdom-table-wrap" style={{ overflowX: "auto" }}>
                <table className="sdom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1.5px solid #e2e8f0", background: "#f8fafc", textAlign: "left" }}>
                      <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>Name</th>
                      <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>Role</th>
                      <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>Station</th>
                      <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>TI Area</th>
                      <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>Score</th>
                      <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>Category</th>
                      <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>Risk</th>
                      <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repFiltered.length === 0 && <tr><td colSpan={8} style={{ textAlign: "center", color: "#94a3b8", padding: 32 }}>No staff match the selected filters</td></tr>}
                    {repFiltered.map(s => (
                      <tr key={s.hrmsId} style={{ cursor: "pointer", borderBottom: "1px solid #f1f5f9" }} onClick={() => setSelectedReportUserId(s.hrmsId)}>
                        <td style={{ padding: "12px 16px", fontWeight: 700, color: "#2563eb" }}>{s.name}</td>
                        <td style={{ padding: "12px 16px", color: "#334155", fontWeight: "500" }}>{ROLE_MAP[s.role] || s.designation}</td>
                        <td style={{ padding: "12px 16px", color: "#334155", fontWeight: "500" }}>{s.stationName}</td>
                        <td style={{ padding: "12px 16px", color: "#334155", fontWeight: "500" }}>{s.division}</td>
                        <td style={{ padding: "12px 16px", fontWeight: 700, color: "#0f172a" }}>{s.lastScore}</td>
                        <td style={{ padding: "12px 16px" }}>{catBadge(s.category)}</td>
                        <td style={{ padding: "12px 16px" }}>{riskBadge(s.riskLevel)}</td>
                        <td style={{ padding: "12px 16px" }}>{statusBadge(s.assessmentStatus)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

      case "Settings":
        return (
          <div className="reports-page">
            <div className="page-header">
              <h2>Settings</h2>
              <p>Configure AOM console preferences</p>
            </div>

            <div className="reports-container settings-container">
              {settingsNotice && <div className="assessment-action-notice">{settingsNotice}</div>}

              <div className="settings-grid">
                <div className="settings-card">
                  <h3>Notification Preferences</h3>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={aomSettings.emailAlerts}
                      onChange={() => handleSettingsToggle("emailAlerts")}
                    />
                    <span>Email alerts for approvals and pending items</span>
                  </label>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={aomSettings.smsAlerts}
                      onChange={() => handleSettingsToggle("smsAlerts")}
                    />
                    <span>SMS alerts for critical safety and escalation events</span>
                  </label>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={aomSettings.weeklyDigest}
                      onChange={() => handleSettingsToggle("weeklyDigest")}
                    />
                    <span>Weekly performance digest summary</span>
                  </label>
                </div>

                <div className="settings-card">
                  <h3>Workflow Preferences</h3>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={aomSettings.autoEscalation}
                      onChange={() => handleSettingsToggle("autoEscalation")}
                    />
                    <span>Auto escalation for overdue assessments</span>
                  </label>

                  <div className="form-group">
                    <label>Default Assessment Tab</label>
                    <select
                      value={aomSettings.defaultAssessmentTab}
                      onChange={(e) => handleSettingsSelect("defaultAssessmentTab", e.target.value)}
                    >
                      <option value="TI">TI Assessment + Approval</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Report Visibility</label>
                    <select
                      value={aomSettings.reportVisibility}
                      onChange={(e) => handleSettingsSelect("reportVisibility", e.target.value)}
                    >
                      <option value="All">All Staff</option>
                      <option value="SM_TM_TI_SS">SM/TM/TI/SS</option>
                      <option value="Operational">Operational Roles Only</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="add-user-actions">
                <button type="button" className="submit-btn" onClick={handleSaveSettings}>
                  Save Settings
                </button>
              </div>
            </div>

            <style>{`
              .settings-container {
                display: grid;
                gap: 14px;
              }

              .settings-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 14px;
              }

              .settings-card {
                border: 1px solid #dbe4ef;
                border-radius: 10px;
                padding: 14px;
                background: #f9fbfe;
              }

              .settings-card h3 {
                margin: 0 0 10px;
                color: #1f3653;
              }

              .settings-toggle {
                display: flex;
                align-items: flex-start;
                gap: 8px;
                margin-bottom: 10px;
                color: #334155;
                font-size: 13px;
              }
            `}</style>
          </div>
        );

      case "My Profile": {
        const divisionPerformanceData = [
          { month: "Dec'25", score: 72 },
          { month: "Jan'26", score: 74 },
          { month: "Feb'26", score: 76 },
          { month: "Mar'26", score: 78 },
          { month: "Apr'26", score: 80 },
          { month: "May'26", score: 82 }
        ];

        return (
          <div className="sdom-fade">
            {/* Hero header */}
            <div className="sdom-station-header" style={{ marginBottom: 24 }}>
              <div className="sdom-station-header-meta">
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Staff Profile</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 4 }}>{user?.name || "General Manager User"}</div>
                <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>{aomReadOnlyProfile.designation} &bull; Nagpur Division &bull; Central Railway</div>
                <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                  <span className="sdom-badge sdom-badge-success">Category A</span>
                  <span className="sdom-badge sdom-badge-success">Executive</span>
                  <span className="sdom-badge sdom-badge-success">Active</span>
                </div>
              </div>
              <div className="sdom-station-header-stats">
                <div className="sdom-station-header-stat">
                  <span className="val">82%</span>
                  <span className="lbl">Division Avg</span>
                </div>
                <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
                <div className="sdom-station-header-stat">
                  <span className="val">{aomReadOnlyProfile.contact}</span>
                  <span className="lbl">Contact</span>
                </div>
                <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
                <div className="sdom-station-header-stat">
                  <span className="val">2026-05-27</span>
                  <span className="lbl">Last Audit</span>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div className="sdom-row-2" style={{ marginBottom: "24px" }}>
              <div className="sdom-chart-card">
                <div className="sdom-chart-title" style={{ marginBottom: "16px" }}>Personal & Professional Details</div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', paddingBottom: '20px' }}>
                  {[
                    ["Employee ID / HRMS ID", user?.hrmsId || "GM_1001"],
                    ["Designation", aomReadOnlyProfile.designation],
                    ["Mobile Number", aomReadOnlyProfile.contact],
                    ["Email ID", aomReadOnlyProfile.email],
                    ["Account Status", "Active"],
                    ["Current Zone", "Central Railway"],
                    ["Current Division", aomReadOnlyProfile.division],
                    ["Current Placement", aomReadOnlyProfile.zoneHq],
                    ["Reporting Officer", aomReadOnlyProfile.reportingOfficer]
                  ].map(([lbl, val]) => (
                    <div key={lbl} style={{ background: "#f8fafc", borderRadius: 8, padding: "12px 16px", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>{lbl}</div>
                      <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.9rem" }}>{val}</div>
                    </div>
                  ))}
                </div>

                {/* Operational Specifications */}
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginTop: '10px' }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '14px', color: '#0f172a', fontWeight: '800', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px' }}>
                    Operational & Safety Dates
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', fontSize: '13px' }}>
                    <div><strong>Last Division Audit Done:</strong><div style={{fontWeight: 700, color: "#065f46", marginTop: 4}}>2026-05-20</div></div>
                    <div><strong>Next Audit Due:</strong><div style={{fontWeight: 700, color: "#991b1b", marginTop: 4}}>2026-06-20</div></div>
                    <div><strong>Executive Safety Training:</strong><div style={{fontWeight: 700, color: "#0d2c4d", marginTop: 4}}>2025-10-12</div></div>
                    <div><strong>Safety Summit Attended:</strong><div style={{fontWeight: 700, color: "#0d2c4d", marginTop: 4}}>2026-03-15</div></div>
                    <div style={{ gridColumn: "span 2" }}><strong>Zonal Operations Review:</strong><div style={{fontWeight: 700, color: "#d97706", marginTop: 4}}>2026-04-18</div></div>
                  </div>
                </div>
              </div>

              <div className="sdom-chart-card">
                <div className="sdom-chart-title">Division Performance Trend</div>
                <div className="sdom-chart-subtitle">Nagpur Division Average Score progression</div>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={divisionPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                      <XAxis dataKey="month" fontSize={11}/>
                      <YAxis domain={[40, 100]} fontSize={11}/>
                      <Tooltip/>
                      <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }}/>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "Approvals": {
        const aomCAT_C = { A: "#16a34a", B: "#2563eb", C: "#d97706", D: "#dc2626" };
        const aomCAT_B = { A: "#dcfce7", B: "#dbeafe", C: "#fef3c7", D: "#fee2e2" };
        const tabs = ["Pending", "Approved", "Rejected"];

        /* ─── DETAIL VIEW ─── */
        if (aomSelectedItem) {
          const secs      = aomEditSections[aomSelectedItem.id] || [];
          const liveTotal = secs.reduce((s, x) => s + x.score, 0);
          const liveCat   = aomGetCat(liveTotal);
          const locked    = aomSelectedItem.status !== "Submitted" && aomSelectedItem.status !== "Pending";
          const reject    = aomRejectMode[aomSelectedItem.id] || false;

          const savedForms = aomApprovalTab === "SM"
            ? (localStorage.getItem("ti_sm_forms") ? JSON.parse(localStorage.getItem("ti_sm_forms")) : {})
            : aomApprovalTab === "SS"
            ? (localStorage.getItem("ti_ss_forms") ? JSON.parse(localStorage.getItem("ti_ss_forms")) : {})
            : (localStorage.getItem("ti_tm_forms") ? JSON.parse(localStorage.getItem("ti_tm_forms")) : {});
          const form = savedForms[aomSelectedItem.id] || {};
          const pme  = form.pmeStatus || aomSelectedItem.pmeStatus || (aomSelectedItem.meta?.pmeStatus) || "Fit";
          const ref  = form.refStatus || aomSelectedItem.refStatus || (aomSelectedItem.meta?.refStatus) || "Cleared";
          const alc  = form.alcoholicStatus || aomSelectedItem.alcoholicStatus || (aomSelectedItem.meta?.alcoholicStatus) || "Non-Alcoholic";

          return (
            <div className="ti2-card animate-fade-in">
              <div className="ti2-card-hdr">
                <div>
                  <h2>Review — {aomSelectedItem.name} ({aomSelectedItem.hrmsId})</h2>
                  <p style={{margin:"2px 0 0",fontSize:12,color:"#64748b"}}>
                    {aomSelectedItem.station} · {aomApprovalTab === "SM" ? "Station Master" : aomApprovalTab === "SS" ? "Station Superintendent" : "Train Manager"} · Assessed on {aomSelectedItem.submissionDate || aomSelectedItem.lastDate}
                  </p>
                </div>
                <button className="ti2-link-btn" onClick={() => setAomSelectedId(null)}>← Back</button>
              </div>

              {/* Info meta — same ti2-review-meta grid as TI */}
              <div className="ti2-review-meta">
                <div><label>{aomApprovalTab === "SM" ? "Station Master" : aomApprovalTab === "SS" ? "Station Superintendent" : "Train Manager"}</label><strong>{aomSelectedItem.name}</strong></div>
                <div><label>HRMS ID</label><strong>{aomSelectedItem.hrmsId}</strong></div>
                <div><label>Station</label><strong>{aomSelectedItem.station}</strong></div>
                <div><label>PME Status</label><strong className={pme==="Fit"?"ti2-green":"ti2-red"}>{pme}</strong></div>
                <div><label>REF Status</label><strong className={ref==="Cleared"?"ti2-green":"ti2-amber"}>{ref}</strong></div>
                <div><label>Alcoholic Status</label><strong>{alc}</strong></div>
              </div>

              {/* Section-wise marks — same ti2-review-sections as TI */}
              <h4 className="ti2-sec-title">Section-wise Assessment Marks</h4>
              <div className="ti2-review-sections">
                {secs.map((sec, idx) => {
                  const pct = sec.max > 0 ? Math.round((sec.score / sec.max) * 100) : 0;
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
                            onChange={e => aomUpdateSec(aomSelectedItem.id, idx, e.target.value)}/>
                          <span className="ti2-sec-max">/ {sec.max}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Detailed TI Responses (if available for SM) */}
              {aomApprovalTab === "SM" && aomSelectedItem.tiAnswers && Object.values(aomSelectedItem.tiAnswers).some(arr => arr && arr.length > 0) && (
                <div style={{ marginTop: "24px", background: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <h4 style={{ margin: "0 0 16px", fontSize: "13px", color: "#334155", textTransform: "uppercase", letterSpacing: "0.5px" }}>TI Evaluation Details (Y/N Answers)</h4>
                  <div style={{ display: "grid", gap: "16px" }}>
                    {TI_SM_CRITERIA.map(sec => {
                      const answers = aomSelectedItem.tiAnswers[sec.key] || [];
                      if (answers.length === 0) return null;
                      return (
                        <div key={sec.key} style={{ background: "#ffffff", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                          <h5 style={{ margin: "0 0 10px", fontSize: "13px", color: "#0f172a", fontWeight: "700" }}>{sec.label}</h5>
                          <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "12px", color: "#475569" }}>
                            {sec.criteria.map((crit, i) => (
                              <li key={i} style={{ marginBottom: "6px" }}>
                                {crit}: <strong style={{ color: answers[i] === "Yes" ? "#16a34a" : answers[i] === "No" ? "#dc2626" : "#94a3b8" }}>
                                  {answers[i] || "Not Answered"}
                                </strong>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Live score — same ti2-live-score as TI */}
              <div className="ti2-live-score">
                <div><label>Grand Total</label><strong style={{color:aomCAT_C[liveCat],fontSize:22}}>{liveTotal}/100</strong></div>
                <div><label>Category</label><span className="ti2-badge" style={{background:aomCAT_B[liveCat],color:aomCAT_C[liveCat],fontSize:13,padding:"4px 14px"}}>Category {liveCat}</span></div>
              </div>

              {/* AOM remarks — mirrors TI Remarks */}
              {!locked && (
                <div className="ti2-form-field">
                  <label>AOM Remarks</label>
                  <textarea rows={3}
                    value={aomAomRemarks[aomSelectedItem.id] || ""}
                    onChange={e => setAomAomRemarks(p => ({...p,[aomSelectedItem.id]:e.target.value}))}
                    placeholder="Add remarks…"/>
                </div>
              )}

              {/* Reject reason input */}
              {reject && !locked && (
                <div className="ti2-form-field" style={{marginTop:10}}>
                  <label style={{color:"#dc2626"}}>Rejection Reason (mandatory)</label>
                  <textarea rows={2} placeholder="Enter rejection reason…" id={`aom-reject-${aomSelectedItem.id}`}/>
                </div>
              )}

              {/* Audit trail */}
              {aomSelectedItem.auditTrail?.length > 0 && (
                <div>
                  <button className="ti2-link-btn-sm" style={{marginTop:12}}
                    onClick={() => setAomShowAudit(p => ({...p,[aomSelectedItem.id]:!p[aomSelectedItem.id]}))}>
                    {aomShowAudit[aomSelectedItem.id] ? "Hide" : "View"} Audit Trail
                  </button>
                  {aomShowAudit[aomSelectedItem.id] && (
                    <div className="ti2-audit-trail">
                      {aomSelectedItem.auditTrail.map((a, i) => (
                        <div key={i} className="ti2-audit-row">
                          <strong>{a.action}</strong> · {a.by} · {a.date}
                          {a.remark && <div style={{fontSize:11,color:"#64748b",marginTop:2}}>"{a.remark}"</div>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Locked banner */}
              {locked && (
                <div className="ti2-locked-banner">
                  {aomSelectedItem.status === "Approved" ? "✓ Assessment Approved and Locked" : "✗ Assessment Rejected"}
                  {aomSelectedItem.aomRemarks && <div style={{marginTop:4,fontSize:12}}>Remarks: {aomSelectedItem.aomRemarks}</div>}
                </div>
              )}

              {/* Action buttons — exact same as TI: Reject / Approve as Submitted / Modify & Approve */}
              {!locked && !reject && (
                <div className="ti2-review-actions">
                  <button className="ti2-danger-btn" onClick={() => setAomRejectMode(p => ({...p,[aomSelectedItem.id]:true}))}>
                    <XCircle size={14}/> Reject
                  </button>
                  <button className="ti2-ghost-btn" onClick={() => aomFinalize(aomSelectedItem.id, "approve")}>
                    <CheckCircle size={14}/> Approve as Submitted
                  </button>
                  <button className="ti2-primary-btn" onClick={() => aomFinalize(aomSelectedItem.id, "modify")}>
                    <CheckCircle size={14}/> Modify &amp; Approve
                  </button>
                </div>
              )}
              {reject && !locked && (
                <div className="ti2-review-actions">
                  <button className="ti2-ghost-btn" onClick={() => setAomRejectMode(p => ({...p,[aomSelectedItem.id]:false}))}>Cancel</button>
                  <button className="ti2-danger-btn" onClick={() => {
                    const note = document.getElementById(`aom-reject-${aomSelectedItem.id}`)?.value || "No reason provided";
                    aomFinalize(aomSelectedItem.id, "reject", note);
                  }}>Confirm Rejection</button>
                </div>
              )}
            </div>
          );
        }

        /* ─── LIST VIEW ─── */
        return (
          <div className="ti2-card animate-fade-in">
            <div className="ti2-card-hdr">
              <h2>Approvals — {aomApprovalTab === "SM" ? "Station Masters" : aomApprovalTab === "SS" ? "Station Superintendents" : "Train Managers"}</h2>
            </div>
            <p className="ti2-subtitle">Review and approve {aomApprovalTab === "SM" ? "Station Master" : aomApprovalTab === "SS" ? "Station Superintendent" : "Train Manager"} assessments submitted by Traffic Inspectors.</p>

            {/* Role switch — mirrors TI's ti2-tabs style */}
            <div className="ti2-tabs" style={{marginBottom:4}}>
              {["SM","SS","TM"].map(role => (
                <button key={role}
                  className={`ti2-tab ${aomApprovalTab === role ? "active" : ""}`}
                  onClick={() => { setAomApprovalTab(role); setAomSelectedId(null); setAomReviewTab("Pending"); setAomReviewSearch(""); setAomReviewStation("All"); }}>
                  {role === "SM" ? "Station Masters" : role === "SS" ? "Station Superintendents" : "Train Managers"}
                  <span className="ti2-tab-count">
                    {(role === "SM" ? aomSMList : role === "SS" ? aomSSList : aomTMList).filter(p => p.status === "Submitted").length}
                  </span>
                </button>
              ))}
            </div>

            {/* Status tabs — same ti2-tabs as TI */}
            <div className="ti2-tabs">
              {tabs.map(t => (
                <button key={t} className={`ti2-tab ${aomReviewTab === t ? "active" : ""}`} onClick={() => setAomReviewTab(t)}>
                  {t} <span className="ti2-tab-count">
                    {aomCurrentList.filter(p => t === "Pending" ? p.status === "Submitted" : p.status === t).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Filters — exact same as TI */}
            <div className="ti2-filter-row">
              <div className="ti2-search-box">
                <Search size={13}/>
                <input placeholder={`Search ${aomApprovalTab === "SM" ? "station master" : aomApprovalTab === "SS" ? "station superintendent" : "train manager"}…`}
                  value={aomReviewSearch} onChange={e => setAomReviewSearch(e.target.value)}/>
              </div>
              <select className="ti2-select" value={aomReviewStation} onChange={e => setAomReviewStation(e.target.value)}>
                <option value="All">All Stations</option>
                {aomAllStations.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {aomApprovalNotice && (
              <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",color:"#15803d",padding:"10px 14px",borderRadius:"8px",marginBottom:"12px",fontWeight:700,fontSize:"13px"}}>
                {aomApprovalNotice}
              </div>
            )}

            {/* Table — exact same structure as TI */}
            <div className="ti2-table-wrap">
              <div className="ti2-pm-head ti2-pm-row">
                {["Name","HRMS ID","Station","Submitted By","Date","Score","Status","Action"].map(h => <span key={h}>{h}</span>)}
              </div>
              {aomFilteredList.length === 0 && <p className="ti2-empty">No records in this category.</p>}
              {aomFilteredList.map(item => {
                const score = item.score || 0;
                const cat   = item.category || aomGetCat(score);
                return (
                  <div key={item.id} className="ti2-pm-row ti2-pm-data-row">
                    <span><strong>{item.name}</strong></span>
                    <span>{item.hrmsId}</span>
                    <span>{item.station}</span>
                    <span>Traffic Inspector</span>
                    <span>{item.lastDate}</span>
                    <span><strong style={{color:aomCAT_C[cat]}}>{score}/100</strong></span>
                    <span>
                      <span className={`ti2-status-pill ti2-status-${item.status.toLowerCase() === "submitted" ? "pending" : item.status.toLowerCase()}`}>
                        {item.status === "Submitted" ? "Pending" : item.status}
                      </span>
                    </span>
                    <span>
                      <button className="ti2-link-btn-sm" onClick={() => aomOpenReview(item.id)}>
                        {item.status === "Submitted" ? <><ClipboardCheck size={12}/> Review</> : <><Eye size={12}/> View</>}
                      </button>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      default:
        return (
          <div className="page-header">
            <h2>{activePage}</h2>
            <p style={{ marginTop: "20px", fontSize: "14px", color: "#6a7385" }}>
              {activePage} content will be displayed here.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="app-shell">
      <input type="checkbox" id="sdom-sidebar-toggle" className="sdom-sidebar-checkbox" style={{ display: "none" }} />
      <label htmlFor="sdom-sidebar-toggle" className="sdom-sidebar-close-backdrop"></label>
      <header className="topbar">
        <label htmlFor="sdom-sidebar-toggle" className="sdom-sidebar-toggle-btn" style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px", background: "none", border: "none", color: "#ffffff", marginRight: "12px" }}>
          &#9776;
        </label>
        <div className="brand-group">
          <div className="brand-mark"><img src="/logo.webp" alt="IR Logo" style={{ width: "100%", height: "100%", borderRadius: "inherit", objectFit: "cover" }} /></div>
          <div>
            <h1>Indian Railway Evaluation System</h1>
            <p>AOM Console</p>
          </div>
        </div>
        <div className="topbar-right">
          <div className="admin-badge">
            <div className="avatar">{user.hrmsId.substring(0, 2).toUpperCase()}</div>
            <div>
              <strong>AOM Console</strong>
              <span>Zonal Headquarters</span>
            </div>
          </div>
          <button className="logout-btn" type="button" onClick={onLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="layout-grid">
        <aside className="sidebar">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const stationPageActive = ["Station Management", "All Stations", "Add Station", "View / Edit Station"].includes(activePage);
            const assessmentsPageActive = ["Assessments", "Pending Approvals"].includes(activePage);
            const stationMastersActive = ["Station Masters", "Pointsman Under Station Master"].includes(activePage);
            const isActive = 
              item.label === "Station Management" ? stationPageActive : 
              item.label === "Assessments" ? assessmentsPageActive : 
              item.label === "Station Masters" ? stationMastersActive : 
              item.label === "Approvals" ? activePage === "Approvals" :
              activePage === item.label;

            return (
              <button
                key={item.label}
                type="button"
                className={`sidebar-item ${isActive ? "active" : ""}`}
                onClick={() => handleSidebarClick(item.label)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        <main className="main-content">
          <div className="category-legend-row">
            <span className="category-legend-label">Category Legend</span>
            <div className="category-legend-circles">
              {[
                { key: "A", className: "category-a" },
                { key: "B", className: "category-b" },
                { key: "C", className: "category-c" },
                { key: "D", className: "category-d" }
              ].map((item) => (
                <span key={item.key} className={`category-circle ${item.className}`}>
                  {item.key}
                </span>
              ))}
            </div>
          </div>
          {renderPageContent()}
        </main>
      </div>
      {renderChartZoomModal()}
      {renderPmModal()}
      {renderSmModal()}
      {renderSsModal()}
      {renderTmModal()}
      {renderTiModal()}
      {renderAddStationModal()}
    </div>
  );
}

export default AOmModule;
