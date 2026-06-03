import React, { useMemo, useState, useEffect } from "react";
import {
  BarChart3, Building2, ClipboardList, FileBarChart2, LogOut,
  Search, ShieldCheck, UserRound, Users, UserCheck, TrainFront,
  Plus, Edit, Trash2, ArrowRightLeft, ArrowLeft, TrendingUp,
  AlertTriangle, CheckCircle, Clock, XCircle, Activity,
  MapPin, Phone, Calendar, Award, UserPlus, FileText
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend,
  LineChart, Line, LabelList
} from "recharts";
import "./sdom.css";
import { dbService, isSupabaseConfigured } from "./supabaseClient";

import {
  NAV, CHART_NAVY, CAT_COLORS, RISK_COLORS, STATUS_COLORS,
  TI_OPTS, ROLE_OPTS, ROLE_MAP
} from "./utils/saConstants";
import { riskBadge, catBadge, statusBadge, SectionTitle } from "./utils/saUtils";
import { useSAData } from "./hooks/useSAData";

import { SummaryCard, ComplianceCard } from "./components/super-admin/SACards";
import { StationTable, EmployeeTable } from "./components/super-admin/SATables";
import {
  StationProgressChart, StationScoreChart, RoleDistributionChart,
  CategoryDistributionChart, PerformanceTrendChart
} from "./components/super-admin/SACharts";
import { SAStaffModal } from "./components/super-admin/SAStaffModal";
import { SAChartZoomModal } from "./components/super-admin/SAChartZoomModal";
import { SADashboard } from "./components/super-admin/views/SADashboard";
import { SARoleDirectory } from "./components/super-admin/views/SARoleDirectory";
import { SAStaffDetail } from "./components/super-admin/views/SAStaffDetail";
import { SAStationDirectory } from "./components/super-admin/views/SAStationDirectory";
import { SAStationDetail } from "./components/super-admin/views/SAStationDetail";
import { SAAssessmentRecords } from "./components/super-admin/views/SAAssessmentRecords";
import { SAReportsAnalytics } from "./components/super-admin/views/SAReportsAnalytics";
import { SAProfile } from "./components/super-admin/views/SAProfile";

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function SuperAdminModule({ user, onLogout }) {
  const { staff, stations, isLoadingLive, addStation, saveUser, removeUser } = useSAData();
  const [page, setPage] = useState("dashboard");
  const [view, setView] = useState(null); // { type, data } for drill-down pages
  const [showAddStation, setShowAddStation] = useState(false);
  const [newStName, setNewStName] = useState("");
  const [newStCode, setNewStCode] = useState("");
  const [newStTi, setNewStTi] = useState("TI NGP");
  const [modal, setModal] = useState(null); // add/edit form


  // Filters
  const [roleF, setRoleF] = useState({ name: "", station: "All", ti: "All", cat: "All", risk: "All" });
  const [stF, setStF] = useState({ name: "" });
  const [recF, setRecF] = useState({ role: "All", station: "All", status: "All", name: "" });
  const [repF, setRepF] = useState({ role: "All", station: "All", cat: "All", risk: "All", ti: "All" });
  const [repApplied, setRepApplied] = useState(false);
  const [selectedReportUserId, setSelectedReportUserId] = useState(null);

  // Chart Zoom Modal states (for showing the 96 stations graphical trends)
  const [isChartZoomModalOpen, setIsChartZoomModalOpen] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState("progress"); // "progress", "score", or "category"
  const [zoomPopupCategory, setZoomPopupCategory] = useState("All");

  const handleChartClick = (state, chartType) => {
    setSelectedChartType(chartType);
    setIsChartZoomModalOpen(true);
  };

  const handlePieClick = (data) => {
    if (data && data.name) {
      const catLetter = data.name.replace("Category ", "").trim();
      setZoomPopupCategory(catLetter);
    } else {
      setZoomPopupCategory("All");
    }
    setSelectedChartType("category");
    setIsChartZoomModalOpen(true);
  };

  const STATION_OPTS = useMemo(() => ["All", ...stations.map(s => s.name)], [stations]);

  /* ------- navigation ------- */
  function navigate(p) {
    setPage(p);
    setView(null);
    setSelectedReportUserId(null);
    setRoleF({ name: "", station: "All", ti: "All", cat: "All", risk: "All" });
  }
  function openView(type, data) { setView({ type, data }); }
  function closeView() { setView(null); }

  const handleAddStation = async () => {
    if (!newStName.trim() || !newStCode.trim()) {
      alert("Please enter both Station Name and Station Code.");
      return;
    }
    const newStation = {
      id: `ST_${Date.now()}`,
      name: newStName.trim(),
      code: newStCode.trim().toUpperCase(),
      ti: newStTi,
      smCount: 0,
      pmCount: 0,
      score: 80,
      safety: 100,
      highRisk: 0,
      pending: 0
    };
    await addStation(newStation);
    setShowAddStation(false);
  };

  /* ------- CRUD ------- */
  function openAdd(role) {
    setModal({
      mode: "add",
      role,
      data: {
        id: "",
        name: "",
        station: stations[0] ? stations[0].name : "Nagpur Junction",
        ti: "TI PAR",
        cat: "A",
        risk: "Low",
        score: 80,
        contact: "",
        lastDate: "",
        status: "Pending",
        email: "",
        division: "Nagpur",
        zone: "Central Railway",
        reportingSm: "",
        workLocation: "",
        shift: "",
        smStation: stations[0] ? stations[0].name : "Nagpur Junction",
        smZone: "Central Railway",
        smDivision: "Nagpur",
        jurisdiction: "Nagpur Division",
        reportingAom: "P. K. Verma (Sr. DOM)",
        linkedStations: ""
      }
    });
  }
  function openEdit(s) {
    setModal({ mode: "edit", role: s.role, data: { ...s } });
  }
  function openShift(s) {
    setModal({ mode: "shift", role: s.role, data: { ...s } });
  }

  const saveModal = async () => {
    if (!modal.data.name || !modal.data.id) return;
    const success = await saveUser({ ...modal.data, role: modal.role }, modal.mode);
    if (success) {
      setModal(null);
    }
  };

  const removeStaff = async (id) => {
    if (!window.confirm("Remove this staff member?")) return;
    await removeUser(id);
  };

  /* ------- filtered data ------- */
  function filterByRole(roleKey) {
    return staff.filter(s =>
      s.role === roleKey &&
      (roleF.station === "All" || s.station === roleF.station) &&
      (roleF.ti === "All" || s.ti === roleF.ti) &&
      (roleF.cat === "All" || s.cat === roleF.cat) &&
      (roleF.risk === "All" || s.risk === roleF.risk) &&
      (!roleF.name || s.name.toLowerCase().includes(roleF.name.toLowerCase()) ||
        s.id.toLowerCase().includes(roleF.name.toLowerCase()))
    );
  }

  const recFiltered = useMemo(() => {
    const hasFilter = recF.role !== "All" || recF.station !== "All" || recF.status !== "All" || recF.name;
    if (!hasFilter) return null;
    return staff.filter(s => {
      const roleLabel = ROLE_MAP[s.role] || s.role;
      return (recF.role === "All" || roleLabel === recF.role) &&
        (recF.station === "All" || s.station === recF.station) &&
        (recF.status === "All" || s.status === recF.status) &&
        (!recF.name || s.name.toLowerCase().includes(recF.name.toLowerCase()));
    });
  }, [recF, staff]);

  const repFiltered = useMemo(() => {
    if (!repApplied) return null;
    return staff.filter(s => {
      const roleLabel = ROLE_MAP[s.role] || s.role;
      return (repF.role === "All" || roleLabel === repF.role) &&
        (repF.station === "All" || s.station === repF.station) &&
        (repF.cat === "All" || s.cat === repF.cat) &&
        (repF.risk === "All" || s.risk === repF.risk) &&
        (repF.ti === "All" || s.ti === repF.ti);
    });
  }, [repApplied, repF, staff]);

  /* ═══════════════════════════════════════════
     PAGES
     ═══════════════════════════════════════════ */

  /* ── DASHBOARD ── */
  function renderDashboard() {
    return (
      <SADashboard
        staff={staff}
        stations={stations}
        handleChartClick={handleChartClick}
        handlePieClick={handlePieClick}
      />
    );
  }

  /* ── ROLE MANAGEMENT (generic for PM/SM/SS/TM/TI) ── */
  function renderRole(roleKey, title) {
    if (view?.type === "staffDetail") {
      return (
        <SAStaffDetail
          staffMember={view.data}
          view={view}
          setView={setView}
          closeView={closeView}
        />
      );
    }

    return (
      <SARoleDirectory
        roleKey={roleKey}
        title={title}
        staff={staff}
        STATION_OPTS={STATION_OPTS}
        openAdd={openAdd}
        openEdit={openEdit}
        openShift={openShift}
        removeStaff={removeStaff}
        openView={openView}
      />
    );
  }



  function renderProfile() {
    return <SAProfile user={user} staff={staff} />;
  }

  function renderStations() {
    if (view?.type === "staffDetail") {
      return (
        <SAStaffDetail
          staffMember={view.data}
          view={view}
          setView={setView}
          closeView={closeView}
        />
      );
    }
    if (view?.type === "stationDetail") {
      return (
        <SAStationDetail
          st={view.data}
          staff={staff}
          closeView={closeView}
          setView={setView}
        />
      );
    }
    return <SAStationDirectory stations={stations} addStation={addStation} openView={openView} />;
  }

  function renderRecords() {
    return <SAAssessmentRecords staff={staff} STATION_OPTS={STATION_OPTS} />;
  }

  function renderReports() {
    return <SAReportsAnalytics staff={staff} STATION_OPTS={STATION_OPTS} />;
  }

  /* ── ROUTER ── */
  function renderBody() {
    switch (page) {
      case "dashboard": return renderDashboard();
      case "pointsmen": return renderRole("pointsmen", "Pointsman");
      case "sm": return renderRole("sm", "Station Master");
      case "ss": return renderRole("ss", "Station Superintendent");
      case "tm": return renderRole("tm", "Train Manager");
      case "ti": return renderRole("ti", "Traffic Inspector");
      case "stations": return renderStations();
      case "records": return renderRecords();
      case "reports": return renderReports();
      case "profile": return renderProfile();
      default: return renderDashboard();
    }
  }

  /* ── MODALS COMPONENT USAGE IN RENDER ── */

  /* ── RENDER ── */
  return (
    <div className="sdom-app-layout">
      <input type="checkbox" id="sdom-sidebar-toggle" className="sdom-sidebar-checkbox" style={{ display: "none" }} />
      <label htmlFor="sdom-sidebar-toggle" className="sdom-sidebar-close-backdrop"></label>
      {/* Topbar */}
      <header className="sdom-topbar-fixed">
        <label htmlFor="sdom-sidebar-toggle" className="sdom-sidebar-toggle-btn" style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px", background: "none", border: "none", color: "#ffffff", marginRight: "12px" }}>
          &#9776;
        </label>
        <div className="sdom-topbar-brand">
          <div className="sdom-topbar-logo"><img src="/logo.webp" alt="IR Logo" style={{ width: "100%", height: "100%", borderRadius: "inherit", objectFit: "cover" }} /></div>
          <div>
            <div className="sdom-topbar-title">Indian Railway Evaluation System</div>
            <div className="sdom-topbar-sub"><span className="desktop-only-txt">Nagpur Division — </span>Sr. DOM Command Center</div>
          </div>
        </div>
        <div className="sdom-topbar-right">
          <div className="sdom-topbar-user">
            <div className="sdom-topbar-avatar">SD</div>
            <div>
              <div className="sdom-topbar-user-name">Sr. DOM</div>
              <div className="sdom-topbar-user-role">Super Admin</div>
            </div>
          </div>
          <button onClick={onLogout} className="sdom-logout-btn">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="sdom-body-layout">
        {/* Sidebar */}
        <aside className="sdom-sidebar-fixed">
          <div className="sdom-sidebar-section-label">Navigation</div>
          {NAV.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.key} className={`sdom-nav-btn ${page === item.key ? "active" : ""}`}
                onClick={() => navigate(item.key)}>
                <Icon size={17} /> <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Main */}
        <main className="sdom-content-scrollable">
          {renderBody()}
        </main>
      </div>

      <SAStaffModal modal={modal} setModal={setModal} stations={stations} staff={staff} saveModal={saveModal} />
      <SAChartZoomModal
        isOpen={isChartZoomModalOpen}
        onClose={() => setIsChartZoomModalOpen(false)}
        initialChartType={selectedChartType}
        initialCategory={zoomPopupCategory}
        stations={stations}
      />
    </div>
  );
}
