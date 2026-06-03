import React, { useMemo } from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip as RTooltip, Bar, Cell } from "recharts";

export function SAProfile({ user, staff = [] }) {
  const { avgScore, realChartData } = useMemo(() => {
    const validStaff = staff.filter(s => typeof s.score === 'number');
    const avg = validStaff.length ? Math.round(validStaff.reduce((acc, s) => acc + s.score, 0) / validStaff.length) : 0;
    
    const dist = { "0-25": 0, "26-50": 0, "51-79": 0, "80-100": 0 };
    validStaff.forEach(s => {
      if (s.score <= 25) dist["0-25"]++;
      else if (s.score <= 50) dist["26-50"]++;
      else if (s.score <= 79) dist["51-79"]++;
      else dist["80-100"]++;
    });
    
    const chartData = [
      { range: "0-25", count: dist["0-25"], fill: "#ef4444" },
      { range: "26-50", count: dist["26-50"], fill: "#f59e0b" },
      { range: "51-79", count: dist["51-79"], fill: "#3b82f6" },
      { range: "80-100", count: dist["80-100"], fill: "#10b981" }
    ];
    return { avgScore: avg, realChartData: chartData };
  }, [staff]);

  return (
    <div className="sdom-fade">
      {/* Hero header */}
      <div className="sdom-station-header" style={{ marginBottom: 24 }}>
        <div className="sdom-station-header-meta">
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Staff Profile</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 4 }}>{user?.name || "Super Admin User"}</div>
          <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Senior Divisional Operations Manager (Sr. DOM) &bull; Nagpur Division &bull; Central Railway</div>
          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <span className="sdom-badge sdom-badge-success">Zonal HQ</span>
            <span className="sdom-badge sdom-badge-success">Active</span>
          </div>
        </div>
        <div className="sdom-station-header-stats">
          <div className="sdom-station-header-stat">
            <span className="val">{avgScore}%</span>
            <span className="lbl">Division Avg</span>
          </div>
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }} />
          <div className="sdom-station-header-stat">
            <span className="val">+91 98220 99001</span>
            <span className="lbl">Contact</span>
          </div>
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }} />
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
              ["Designation", user?.role === "Super Admin" ? "Senior Divisional Operations Manager (Sr. DOM)" : "Operations Officer"],
              ["Mobile Number", user?.mobile || "+91 98220 99001"],
              ["Email ID", user?.email || "srdom.ngp@rail.in"],
              ["Account Status", user?.status || "Active"],
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
              <div><strong>Last Division Audit Done:</strong><div style={{ fontWeight: 700, color: "#065f46", marginTop: 4 }}>2026-05-20</div></div>
              <div><strong>Next Audit Due:</strong><div style={{ fontWeight: 700, color: "#991b1b", marginTop: 4 }}>2026-06-20</div></div>
              <div><strong>Executive Safety Training:</strong><div style={{ fontWeight: 700, color: "#0d2c4d", marginTop: 4 }}>2025-10-12</div></div>
              <div><strong>Safety Summit Attended:</strong><div style={{ fontWeight: 700, color: "#0d2c4d", marginTop: 4 }}>2026-03-15</div></div>
              <div style={{ gridColumn: "span 2" }}><strong>Zonal Operations Review:</strong><div style={{ fontWeight: 700, color: "#d97706", marginTop: 4 }}>2026-04-18</div></div>
            </div>
          </div>
        </div>

        <div className="sdom-chart-card">
          <div className="sdom-chart-title">Real-Time Division Score Distribution</div>
          <div className="sdom-chart-subtitle">Current staff performance breakdown across Nagpur Division</div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={realChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="range" fontSize={11} />
                <YAxis allowDecimals={false} fontSize={11} />
                <RTooltip cursor={{fill: 'transparent'}}/>
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {realChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
