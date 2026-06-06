import React from 'react';
import { UserCircle2, Clock, ShieldCheck, FileText, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SSProfile({
  fullName,
  employeeId,
  stationSuperintendentProfile,
  profileSubTab,
  setProfileSubTab,
  history,
  activityLogs,
  latestCategory,
  latestScore
}) {
  // RENDER BODY

    const personalScoreData = [...history].reverse().map(h => ({
      month: h.assessmentPeriod.replace(" 2026", "").replace(" 2025", ""),
      score: h.totalScore
    }));

      return (
      <div className="sdom-fade">
        {/* Hero header */}
        <div className="sdom-station-header" style={{ marginBottom: 24 }}>
          <div className="sdom-station-header-meta">
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Staff Profile</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 4 }}>{fullName}</div>
            <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>{stationSuperintendentProfile.designation} &bull; {stationSuperintendentProfile.stationName} &bull; Central Railway</div>
            <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
              <span className="sdom-badge sdom-badge-success">
                {(!latestCategory || latestCategory === "—" || latestCategory === "Untested" || latestCategory.includes("Awaiting")) ? "Awaiting Approval" : `Category ${latestCategory}`}
              </span>
              <span className="sdom-badge sdom-badge-success">Low Risk</span>
              <span className="sdom-badge sdom-badge-success">Active</span>
            </div>
          </div>
          <div className="sdom-station-header-stats">
            <div className="sdom-station-header-stat">
              <span className="val">{latestScore !== null ? (String(latestScore).includes("/") ? latestScore : `${latestScore}/100`) : "—"}</span>
              <span className="lbl">Latest Score</span>
            </div>
            <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
            <div className="sdom-station-header-stat">
              <span className="val">{stationSuperintendentProfile.mobileNumber}</span>
              <span className="lbl">Contact</span>
            </div>
            <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
            <div className="sdom-station-header-stat">
              <span className="val">{history.length ? history[0].date : stationSuperintendentProfile.joiningDate}</span>
              <span className="lbl">Last Assessment</span>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="sdom-row-2" style={{ marginBottom: "24px" }}>
          <div className="sdom-chart-card">
            <div className="sdom-chart-title" style={{ marginBottom: "16px" }}>Personal & Professional Details</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', paddingBottom: '20px' }}>
              {[
                ["Employee ID / HRMS ID", employeeId],
                ["Designation", stationSuperintendentProfile.designation],
                ["Mobile Number", stationSuperintendentProfile.mobileNumber],
                ["Email ID", `${(employeeId || "").toLowerCase()}@rail.in`],
                ["Account Status", "Active"],
                ["Current Zone", "Central Railway"],
                ["Current Division", "Nagpur"],
                ["Current Station Placement", stationSuperintendentProfile.stationName],
                ["Reporting Officer", stationSuperintendentProfile.reportingOfficer]
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
                <div><strong>PME Last Completed:</strong><div style={{fontWeight: 700, color: "#065f46", marginTop: 4}}>2024-10-16 (FIT)</div></div>
                <div><strong>PME Next Due:</strong><div style={{fontWeight: 700, color: "#991b1b", marginTop: 4}}>2028-10-15</div></div>
                <div><strong>Refresher Course Completed:</strong><div style={{fontWeight: 700, color: "#0d2c4d", marginTop: 4}}>2024-04-13</div></div>
                <div><strong>Refresher Course Due:</strong><div style={{fontWeight: 700, color: "#0d2c4d", marginTop: 4}}>2027-04-12</div></div>
                <div style={{ gridColumn: "span 2" }}><strong>Training Clearance:</strong><div style={{fontWeight: 700, color: "#d97706", marginTop: 4}}>{stationSuperintendentProfile.trainingStatus}</div></div>
              </div>
            </div>
          </div>

          <div className="sdom-chart-card">
            <div className="sdom-chart-title">Score Trend</div>
            <div className="sdom-chart-subtitle">Your assessment score progression</div>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={personalScoreData}>
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
  };
