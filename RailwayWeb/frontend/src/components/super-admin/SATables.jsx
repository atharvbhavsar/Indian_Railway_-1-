import React from "react";
import { Edit, Activity, Trash2 } from "lucide-react";
import { riskBadge, catBadge, statusBadge } from "../../utils/saUtils";

export function StationTable({ title, subtitle, stations }) {
  return (
    <div className="sdom-chart-card">
      <div className="sdom-chart-title" style={{ marginBottom: 4 }}>{title}</div>
      <div className="sdom-chart-subtitle">{subtitle}</div>
      <div className="sdom-table-wrap">
        <table className="sdom-table">
          <thead>
            <tr><th>#</th><th>Station</th><th>Avg Score</th><th>Safety Score</th><th>Pending</th></tr>
          </thead>
          <tbody>
            {stations.map((st, i) => (
              <tr key={st.id}>
                <td>{i + 1}</td>
                <td><div style={{ fontWeight: 600 }}>{st.name}</div><div style={{ fontSize: 11, color: "#94a3b8" }}>{st.ti}</div></td>
                <td><span className={st.score >= 80 ? "sdom-text-success" : st.score >= 50 ? "sdom-text-warning" : "sdom-text-danger"} style={{ fontWeight: 700 }}>{st.score}/100</span></td>
                <td><span className={st.safety >= 80 ? "sdom-text-success" : "sdom-text-danger"} style={{ fontWeight: 700 }}>{st.safety}/100</span></td>
                <td>{st.pending > 0 ? <span className="sdom-badge sdom-badge-danger">{st.pending}</span> : <span style={{ color: "#94a3b8" }}>0</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function EmployeeTable({ staff, onView, onEdit, onShift, onRemove, showShift = false }) {
  if (staff.length === 0) {
    return <div className="sdom-empty">No staff found matching criteria.</div>;
  }
  return (
    <div className="sdom-table-wrap">
      <table className="sdom-table">
        <thead>
          <tr>
            <th>HRMS ID</th>
            <th>Name & Contact</th>
            <th>Station & TI</th>
            <th>Cat. & Risk</th>
            <th>Score</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(s => (
            <tr key={s.id}>
              <td style={{ fontWeight: 600, color: "#1E3A5F" }}>{s.id}</td>
              <td>
                <div style={{ fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontSize: "0.75rem", color: "#64748B" }}>{s.contact}</div>
              </td>
              <td>
                <div>{s.station}</div>
                <div style={{ fontSize: "0.75rem", color: "#64748B" }}>{s.ti}</div>
              </td>
              <td>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {catBadge(s.cat)}
                  {riskBadge(s.risk)}
                </div>
              </td>
              <td style={{ fontWeight: 600, color: s.cat === "Untested" ? "#4b5563" : (s.score < 50 ? "#C53030" : "#2F855A") }}>{s.cat === "Untested" ? "Not Given Test" : `${s.score}/100`}</td>
              <td>{statusBadge(s.status)}</td>
              <td>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="sdom-btn sdom-btn-outline" style={{ padding: "5px 10px", fontSize: "0.8rem" }} onClick={() => onView(s)}>
                    View
                  </button>
                  <button className="sdom-icon-btn" title="Edit" onClick={() => onEdit(s)}>
                    <Edit size={15} color="#2563eb" />
                  </button>
                  {showShift && (
                    <button className="sdom-icon-btn" title="Shift Role" onClick={() => onShift(s)}>
                      <Activity size={15} color="#d97706" />
                    </button>
                  )}
                  <button className="sdom-icon-btn" title="Remove" onClick={() => onRemove(s.id)}>
                    <Trash2 size={15} color="#dc2626" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
