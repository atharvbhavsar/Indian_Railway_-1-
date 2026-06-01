/**
 * 🚂 RSES PERSONNEL TABLE COMPONENT
 * Renders a highly responsive table with search, role filters, and a mobile-friendly card layout fallback.
 */
import React from "react";
import { Plus, Edit, RefreshCw, Trash2, Shield, User } from "lucide-react";
import { getCat, getUserRisk } from "../../utils/trafficInspectorUtils";

// Badge Renderers
const renderCatBadge = (grade) => {
  const catBg = grade === "A" ? "#eff6ff" : grade === "B" ? "#f5f3ff" : grade === "C" ? "#fffbeb" : "#fdf2f8";
  const catColor = grade === "A" ? "#1e40af" : grade === "B" ? "#5b21b6" : grade === "C" ? "#92400e" : "#9d174d";
  return (
    <span 
      style={{ 
        background: catBg, 
        color: catColor, 
        padding: "3px 10px", 
        borderRadius: "999px", 
        fontWeight: "800", 
        fontSize: "11px",
        display: "inline-block"
      }}
    >
      Cat {grade}
    </span>
  );
};

const renderRiskBadge = (risk) => {
  const riskColor = risk === "High" ? "#ef4444" : risk === "Medium" ? "#ea580c" : "#16a34a";
  const riskBg = risk === "High" ? "#fef2f2" : risk === "Medium" ? "#fff7ed" : "#dcfce7";
  return (
    <span 
      style={{ 
        background: riskBg, 
        color: riskColor, 
        padding: "3px 10px", 
        borderRadius: "999px", 
        fontWeight: "850", 
        fontSize: "11px",
        display: "inline-block"
      }}
    >
      {risk} Risk
    </span>
  );
};

const renderStatusBadge = (status) => {
  const statusBg = status === "Approved" ? "#dcfce7" : status === "Pending" ? "#fff7ed" : "#fee2e2";
  const statusColor = status === "Approved" ? "#15803d" : status === "Pending" ? "#c2410c" : "#b91c1c";
  return (
    <span 
      style={{ 
        background: statusBg, 
        color: statusColor, 
        padding: "3px 10px", 
        borderRadius: "999px", 
        fontWeight: "800", 
        fontSize: "11px",
        display: "inline-block"
      }}
    >
      {status}
    </span>
  );
};

export default function PersonnelTable({
  title,
  roleKey,
  users,
  stations,
  stationTiMap = {},
  roleF,
  setRoleF,
  onView,
  onEdit,
  onTransfer,
  onDelete,
  onAdd
}) {
  // Scoped list filtering matching backend rules
  const filtered = users.filter(s => {
    const isRoleMatch = s.role === roleKey;
    if (!isRoleMatch) return false;
    
    const userTi = stationTiMap[s.station] || "TI NGP";
    const userCat = s.cat || getCat(s.score);
    const isHighRisk = s.pmeStatus === "Overdue" || s.refStatus === "Expired" || s.score < 50;
    const userRisk = isHighRisk ? "High" : s.score >= 80 ? "Low" : "Medium";
    
    return (
      (roleF.station === "All" || s.station === roleF.station) &&
      (roleF.ti      === "All" || userTi    === roleF.ti)      &&
      (roleF.cat     === "All" || userCat   === roleF.cat)     &&
      (roleF.risk    === "All" || userRisk  === roleF.risk)    &&
      (!roleF.name   || s.name.toLowerCase().includes(roleF.name.toLowerCase()) ||
                        s.id.toLowerCase().includes(roleF.name.toLowerCase()))
    );
  });

  const STATION_OPTS = ["All", ...stations.map(s => s.name)];
  const TI_OPTS      = ["All", "TI PAR", "TI AMLA", "TI NGP"];

  return (
    <div className="ti2-page-body animate-fade-in">
      <div className="sdom-fade">
        {/* Page Header */}
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "16px"
          }}
        >
          <div>
            <h1 className="sdom-page-title">{title} Management</h1>
            <p className="sdom-page-subtitle">Search, filter and manage all {title.toLowerCase()}s in the division.</p>
          </div>
          <button className="sdom-btn-primary" onClick={onAdd}>
            <Plus size={16} /> Add New {title}
          </button>
        </div>

        {/* Filters */}
        <div className="sdom-filter-bar">
          <div className="sdom-filter-field" style={{ minWidth: "200px" }}>
            <label>Name / ID</label>
            <input 
              value={roleF.name} 
              onChange={e => setRoleF(p => ({ ...p, name: e.target.value }))} 
              placeholder="Search by name or HRMS ID..." 
            />
          </div>
          <div className="sdom-filter-field">
            <label>Station</label>
            <select value={roleF.station} onChange={e => setRoleF(p => ({ ...p, station: e.target.value }))}>
              {STATION_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="sdom-filter-field">
            <label>TI Area</label>
            <select value={roleF.ti} onChange={e => setRoleF(p => ({ ...p, ti: e.target.value }))}>
              {TI_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="sdom-filter-field">
            <label>Category</label>
            <select value={roleF.cat} onChange={e => setRoleF(p => ({ ...p, cat: e.target.value }))}>
              <option value="All">All</option>
              <option value="A">Cat. A</option>
              <option value="B">Cat. B</option>
              <option value="C">Cat. C</option>
              <option value="D">Cat. D</option>
            </select>
          </div>
          <div className="sdom-filter-field">
            <label>Risk Level</label>
            <select value={roleF.risk} onChange={e => setRoleF(p => ({ ...p, risk: e.target.value }))}>
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Table/Card Responsive Container */}
        <div className="sdom-chart-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontWeight: 700, color: "#1e293b" }}>{filtered.length} staff found</span>
          </div>
          
          {/* Desktop Table View */}
          <div className="sdom-table-wrap table-desktop">
            <table className="sdom-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Emp ID</th>
                  <th>Station</th>
                  <th>TI Area</th>
                  <th>Category</th>
                  <th>Risk</th>
                  <th>Last Score</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: "center", padding: 32, color: "#94a3b8" }}>
                      No records found
                    </td>
                  </tr>
                ) : (
                  filtered.map(s => {
                    const grade = s.cat || getCat(s.score);
                    const computedRisk = getUserRisk(s);
                    const computedStatus = s.pmeStatus === "Unfit" ? "Rejected" : s.refStatus === "Expired" ? "Pending" : "Approved";
                    return (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 700 }}>{s.name}</td>
                        <td style={{ color: "#64748b", fontSize: "0.85rem" }}>{s.id}</td>
                        <td>{s.station}</td>
                        <td>{stationTiMap[s.station] || "TI NGP"}</td>
                        <td>{renderCatBadge(grade)}</td>
                        <td>{renderRiskBadge(computedRisk)}</td>
                        <td style={{ fontWeight: 700 }}>{s.score}%</td>
                        <td>{renderStatusBadge(computedStatus)}</td>
                        <td>
                          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", alignItems: "center" }}>
                            <button 
                              className="sdom-btn-outline" 
                              style={{ padding: "5px 10px", fontSize: "0.8rem" }} 
                              onClick={() => onView(s)}
                            >
                              View
                            </button>
                            <button 
                              className="sdom-icon-btn" 
                              title="Edit" 
                              onClick={() => onEdit(s)} 
                              style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <Edit size={15} color="#2563eb"/>
                            </button>
                            <button 
                              className="sdom-icon-btn" 
                              title="Transfer Station" 
                              onClick={() => onTransfer(s)} 
                              style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <RefreshCw size={15} color="#d97706"/>
                            </button>
                            <button 
                              className="sdom-icon-btn" 
                              title="Remove" 
                              onClick={() => onDelete(s.id, s.name)} 
                              style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <Trash2 size={15} color="#dc2626"/>
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

          {/* Responsive Mobile Layout (Card view) */}
          <div className="mobile-cards-container" style={{ display: "none" }}>
            <style>{`
              @media (max-width: 991px) {
                .table-desktop { display: none !important; }
                .mobile-cards-container { display: flex !important; flex-direction: column; gap: 16px; }
              }
            `}</style>
            
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px", color: "#64748b", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                No records found matching current search.
              </div>
            ) : (
              filtered.map(s => {
                const grade = s.cat || getCat(s.score);
                const computedRisk = getUserRisk(s);
                const computedStatus = s.pmeStatus === "Unfit" ? "Rejected" : s.refStatus === "Expired" ? "Pending" : "Approved";
                
                return (
                  <div 
                    key={s.id}
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                      <div>
                        <div style={{ fontWeight: "800", fontSize: "15px", color: "#0f172a" }}>{s.name}</div>
                        <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600", marginTop: "2px" }}>ID: {s.id}</div>
                      </div>
                      {renderCatBadge(grade)}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "13px", color: "#334155" }}>
                      <div>
                        <span style={{ color: "#64748b", fontSize: "11px", display: "block", fontWeight: "600" }}>STATION</span>
                        <strong>{s.station}</strong>
                      </div>
                      <div>
                        <span style={{ color: "#64748b", fontSize: "11px", display: "block", fontWeight: "600" }}>TI AREA</span>
                        <strong>{stationTiMap[s.station] || "TI NGP"}</strong>
                      </div>
                      <div>
                        <span style={{ color: "#64748b", fontSize: "11px", display: "block", fontWeight: "600" }}>RISK LEVEL</span>
                        {renderRiskBadge(computedRisk)}
                      </div>
                      <div>
                        <span style={{ color: "#64748b", fontSize: "11px", display: "block", fontWeight: "600" }}>LAST SCORE</span>
                        <strong style={{ fontSize: "14px", color: "#0f172a" }}>{s.score}%</strong>
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e2e8f0", paddingTop: "12px", marginTop: "4px" }}>
                      <div>
                        <span style={{ color: "#64748b", fontSize: "11px", display: "block", fontWeight: "600", marginBottom: "2px" }}>STATUS</span>
                        {renderStatusBadge(computedStatus)}
                      </div>
                      
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button 
                          className="sdom-btn-outline" 
                          style={{ padding: "6px 12px", fontSize: "12px", fontWeight: "700" }} 
                          onClick={() => onView(s)}
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => onEdit(s)}
                          style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "6px 10px", borderRadius: "6px", display: "inline-flex", alignItems: "center", cursor: "pointer" }}
                        >
                          <Edit size={14} color="#2563eb"/>
                        </button>
                        <button 
                          onClick={() => onTransfer(s)}
                          style={{ background: "#fff7ed", border: "1px solid #fed7aa", padding: "6px 10px", borderRadius: "6px", display: "inline-flex", alignItems: "center", cursor: "pointer" }}
                        >
                          <RefreshCw size={14} color="#ea580c"/>
                        </button>
                        <button 
                          onClick={() => onDelete(s.id, s.name)}
                          style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "6px 10px", borderRadius: "6px", display: "inline-flex", alignItems: "center", cursor: "pointer" }}
                        >
                          <Trash2 size={14} color="#dc2626"/>
                        </button>
                      </div>
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
