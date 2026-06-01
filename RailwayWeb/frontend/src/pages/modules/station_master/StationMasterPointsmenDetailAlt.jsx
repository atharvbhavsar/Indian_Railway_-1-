import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getCat, riskLevel } from '../../../utils/scoreCalculator';

export function StationMasterPointsmenDetailAlt(props) {
  const {
    s,
    setViewingPm,
    smProfile
  } = props;

    const trendScores = [
      { month: "Dec 25", score: Math.max(50, (s.lastScore || s.score || 80) - 6) },
      { month: "Jan 26", score: Math.max(50, (s.lastScore || s.score || 80) - 4) },
      { month: "Feb 26", score: Math.max(50, (s.lastScore || s.score || 80) - 2) },
      { month: "Mar 26", score: Math.max(50, (s.lastScore || s.score || 80) + 1) },
      { month: "Apr 26", score: Math.max(50, (s.lastScore || s.score || 80) + 2) },
      { month: "May 26", score: Math.max(50, (s.lastScore || s.score || 80)) },
    ];
    const catMap = { A: "sdom-badge-success", B: "sdom-badge-info", C: "sdom-badge-warning", D: "sdom-badge-danger" };
    const pmRisk = riskLevel(s);
    const riskMap = { Low: "sdom-badge-success", Medium: "sdom-badge-warning", High: "sdom-badge-danger" };
    const catVal = getCat(s.lastScore);

    return (
      <div className="sdom-fade">
        <div style={{ marginBottom: 24 }}>
          <button className="sdom-back-btn" onClick={() => setViewingPm(null)}>
            <ArrowLeft size={16} /> Back to List
          </button>
        </div>

        {/* Hero header */}
        <div className="sdom-station-header" style={{ marginBottom: 24 }}>
          <div className="sdom-station-header-meta">
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Staff Profile</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 4 }}>{s.name}</div>
            <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Pointsman &bull; {s.station || smProfile.station} &bull; Central Railway</div>
            <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
              <span className={`sdom-badge ${catMap[catVal] || "sdom-badge-neutral"}`}>{catVal}</span>
              <span className={`sdom-badge ${riskMap[pmRisk] || "sdom-badge-neutral"}`}>{pmRisk}</span>
              <span className="sdom-badge sdom-badge-success">Active</span>
            </div>
          </div>
          <div className="sdom-station-header-stats">
            <div className="sdom-station-header-stat">
              <span className="val">{s.lastScore || s.score || "–"}</span>
              <span className="lbl">Latest Score</span>
            </div>
            <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }} />
            <div className="sdom-station-header-stat">
              <span className="val">{s.contact || "—"}</span>
              <span className="lbl">Contact</span>
            </div>
            <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }} />
            <div className="sdom-station-header-stat">
              <span className="val">{s.lastAssessDate || s.lastDate || "—"}</span>
              <span className="lbl">Last Assessment</span>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="sdom-row-2">
          <div className="sdom-chart-card">
            <div className="sdom-chart-title" style={{ marginBottom: 16 }}>Personal &amp; Professional Details</div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 15, paddingBottom: 20 }}>
              {[
                ["Employee ID / HRMS ID", s.hrmsId],
                ["Designation", s.designation || "Pointsman"],
                ["Mobile Number", s.contact || "N/A"],
                ["Email ID", `${s.hrmsId?.toLowerCase()}@rail.in`],
                ["Account Status", "Active"],
                ["Current Zone", "Central Railway"],
                ["Current Division", "Nagpur"],
                ["Current Station Placement", s.station || smProfile.station],
                ["Reporting Officer", smProfile.name || "Station Master"]
              ].map(([lbl, val]) => (
                <div key={lbl} style={{ background: "#f8fafc", borderRadius: 8, padding: "12px 16px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>{lbl}</div>
                  <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.9rem" }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Operational Specifications */}
            <div style={{ background: "#f8fafc", padding: 16, borderRadius: 10, border: "1px solid #e2e8f0", marginTop: 10 }}>
              <h4 style={{ margin: "0 0 12px", fontSize: 14, color: "#0f172a", fontWeight: 800, borderBottom: "1px solid #cbd5e1", paddingBottom: 6 }}>
                Operational Profile Specifications
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, fontSize: 13 }}>
                <div><strong>Reporting Station Master:</strong><div style={{ fontWeight: 700, color: "#1e3a5f", marginTop: 4 }}>{s.reportingSm || smProfile.name}</div></div>
                <div><strong>Assigned Shift:</strong><div style={{ fontWeight: 700, color: "#1e3a5f", marginTop: 4 }}>{s.shift || "Morning Shift (06:00 - 14:00)"}</div></div>
                <div><strong>Work Location Setup:</strong><div style={{ fontWeight: 700, color: "#1e3a5f", marginTop: 4 }}>{s.workLocation || "Yard Area"}</div></div>
              </div>
            </div>
          </div>

          <div className="sdom-chart-card">
            <div className="sdom-chart-title">Score Trend</div>
            <div className="sdom-chart-subtitle">Assessment score progression</div>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendScores}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" fontSize={11} />
                  <YAxis domain={[40, 100]} fontSize={11} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
}
