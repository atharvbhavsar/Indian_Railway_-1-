import React from "react";

export function SummaryCard({ icon, label, count, sub }) {
  return (
    <div className="sdom-stat-card">
      <div className="sdom-stat-icon">
        <span style={{ color: "#1E3A5F" }}>{icon}</span>
      </div>
      <div className="sdom-stat-label">{label}</div>
      <div className="sdom-stat-value">{count}</div>
      <div className="sdom-stat-sub">{sub}</div>
    </div>
  );
}

export function ComplianceCard({ title, subtitle, complianceList }) {
  return (
    <div className="sdom-chart-card">
      <div className="sdom-chart-title">{title}</div>
      <div className="sdom-chart-subtitle">{subtitle}</div>
      <div style={{ marginTop: 16 }}>
        {complianceList.map((c) => (
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
  );
}
