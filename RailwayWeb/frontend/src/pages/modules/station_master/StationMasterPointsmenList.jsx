import React from 'react';
import { 
  Search, Filter, Users, Eye, Edit, Plus, ArrowRightLeft, Trash2
} from 'lucide-react';
import { getCat, riskLevel } from '../../../utils/scoreCalculator';

export function StationMasterPointsmenList(props) {
  const {
    viewingPm,
    setViewingPm,
    openPmAdd,
    pmF,
    setPmF,
    filteredPm,
    smProfile,
    openPmEdit,
    openPmShift,
    removePm,
    renderPointsmenDetail
  } = props;

    if (viewingPm) return renderPointsmenDetail(viewingPm);

    const catMap = { A: "sdom-badge-success", B: "sdom-badge-info", C: "sdom-badge-warning", D: "sdom-badge-danger" };
    const riskMap = { Low: "sdom-badge-success", Medium: "sdom-badge-warning", High: "sdom-badge-danger" };

    return (
      <div className="sdom-fade">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h1 className="sdom-page-title">Pointsman Management</h1>
            <p className="sdom-page-subtitle">Search, filter and manage operational pointsmen in your station limits.</p>
          </div>
          <button className="sdom-btn-primary" onClick={openPmAdd}>
            <Plus size={16} /> Add New Pointsman
          </button>
        </div>

        {/* Filters */}
        <div className="sdom-filter-bar">
          <div className="sdom-filter-field" style={{ minWidth: 200 }}>
            <label>Name / ID</label>
            <input 
              value={pmF.name} 
              onChange={e => setPmF(prev => ({ ...prev, name: e.target.value }))} 
              placeholder="Search..." 
            />
          </div>
          <div className="sdom-filter-field">
            <label>Category</label>
            <select value={pmF.cat} onChange={e => setPmF(prev => ({ ...prev, cat: e.target.value }))}>
              <option>All</option><option>A</option><option>B</option><option>C</option><option>D</option>
            </select>
          </div>
          <div className="sdom-filter-field">
            <label>Risk Level</label>
            <select value={pmF.risk} onChange={e => setPmF(prev => ({ ...prev, risk: e.target.value }))}>
              <option>All</option><option>Low</option><option>Medium</option><option>High</option>
            </select>
          </div>
        </div>

        <div className="sdom-chart-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontWeight: 700, color: "#1e293b" }}>{filteredPm.length} pointsmen found</span>
          </div>
          <div className="sdom-table-wrap">
            <table className="sdom-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Emp ID</th>
                  <th>Station</th>
                  <th>Category</th>
                  <th>Risk</th>
                  <th>Last Score</th>
                  <th>PME Status</th>
                  <th>REF Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPm.length === 0 && (
                  <tr><td colSpan={9} style={{ textAlign: "center", padding: 32, color: "#94a3b8" }}>No records found</td></tr>
                )}
                {filteredPm.map(s => {
                  const riskVal = riskLevel(s);
                  const catVal = getCat(s.lastScore);
                  return (
                    <tr key={s.id || s.hrmsId}>
                      <td style={{ fontWeight: 700 }}>{s.name}</td>
                      <td style={{ color: "#64748b", fontSize: "0.85rem" }}>{s.hrmsId}</td>
                      <td>{s.station || smProfile.station}</td>
                      <td><span className={`sdom-badge ${catMap[catVal] || "sdom-badge-neutral"}`}>{catVal}</span></td>
                      <td><span className={`sdom-badge ${riskMap[riskVal] || "sdom-badge-neutral"}`}>{riskVal}</span></td>
                      <td style={{ fontWeight: 700 }}>{s.lastScore || s.score || "–"}</td>
                      <td>
                        <span className={`sdom-badge ${s.pmeStatus === "Fit" ? "sdom-badge-success" : s.pmeStatus === "Pending" ? "sdom-badge-warning" : "sdom-badge-danger"}`}>
                          {s.pmeStatus || "Fit"}
                        </span>
                      </td>
                      <td>
                        <span className={`sdom-badge ${s.refStatus === "Cleared" ? "sdom-badge-success" : s.refStatus === "Pending" ? "sdom-badge-warning" : "sdom-badge-danger"}`}>
                          {s.refStatus || "Cleared"}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button className="sdom-btn-outline" style={{ padding: "5px 10px", fontSize: "0.8rem" }} onClick={() => setViewingPm(s)}>View</button>
                          <button className="sdom-icon-btn" title="Edit" onClick={() => openPmEdit(s)}><Edit size={15} color="#2563eb" /></button>
                          <button className="sdom-icon-btn" title="Shift" onClick={() => openPmShift(s)}><ArrowRightLeft size={15} color="#d97706" /></button>
                          <button className="sdom-icon-btn" title="Remove" onClick={() => removePm(s.hrmsId)}><Trash2 size={15} color="#dc2626" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}
