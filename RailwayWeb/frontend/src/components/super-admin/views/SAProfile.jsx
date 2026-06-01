import React from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip as RTooltip, Line } from "recharts";

export function SAProfile({ user }) {
  const divisionPerformanceData = [
    { month: "Dec'25", score: 74 },
    { month: "Jan'26", score: 76 },
    { month: "Feb'26", score: 78 },
    { month: "Mar'26", score: 80 },
    { month: "Apr'26", score: 82 },
    { month: "May'26", score: 84 }
  ];

  return (
    <div className="sdom-fade">
      {/* Hero header */}
      <div className="sdom-station-header" style={{ marginBottom: 24 }}>
        <div className="sdom-station-header-meta">
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Staff Profile</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 4 }}>{user?.name || "Super Admin User"}</div>
          <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Senior Divisional Operations Manager (Sr. DOM) &bull; Nagpur Division &bull; Central Railway</div>
          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <span className="sdom-badge sdom-badge-success">Category A</span>
            <span className="sdom-badge sdom-badge-success">Zonal HQ</span>
            <span className="sdom-badge sdom-badge-success">Active</span>
          </div>
        </div>
        <div className="sdom-station-header-stats">
          <div className="sdom-station-header-stat">
            <span className="val">84%</span>
            <span className="lbl">Division Avg</span>
          </div>
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
          <div className="sdom-station-header-stat">
            <span className="val">+91 98220 99001</span>
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
              ["Employee ID / HRMS ID", user?.hrmsId || "SA_1001"],
              ["Designation", "Senior Divisional Operations Manager (Sr. DOM)"],
              ["Mobile Number", "+91 98220 99001"],
              ["Email ID", "srdom.ngp@rail.in"],
              ["Account Status", "Active"],
              ["Current Zone", "Central Railway"],
              ["Current Division", "Nagpur"],
              ["Current Placement", "Nagpur Division HQ"],
              ["Reporting Officer", "Zonal Chief Operations Manager (COM)"]
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
                <RTooltip/>
                <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
