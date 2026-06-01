import React from "react";
import { PerformanceTrendChart } from "../../../components/charts/PerformanceTrendChart";

export function PointsmanProfile({
  history,
  fullName,
  profile,
  latestCategory,
  latestScore,
  employeeId
}) {
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
          <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>{profile.designation} &bull; {profile.stationName} &bull; Central Railway</div>
          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <span className="sdom-badge sdom-badge-success">Category {latestCategory}</span>
            <span className="sdom-badge sdom-badge-success">Low Risk</span>
            <span className="sdom-badge sdom-badge-success">Active</span>
          </div>
        </div>
        <div className="sdom-station-header-stats">
          <div className="sdom-station-header-stat">
            <span className="val">{latestScore !== null ? latestScore : "—"}</span>
            <span className="lbl">Latest Score</span>
          </div>
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
          <div className="sdom-station-header-stat">
            <span className="val">{profile.mobileNumber}</span>
            <span className="lbl">Contact</span>
          </div>
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
          <div className="sdom-station-header-stat">
            <span className="val">{history.length ? history[0].date : profile.joiningDate}</span>
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
              ["Designation", profile.designation],
              ["Mobile Number", profile.mobileNumber],
              ["Email ID", `${employeeId.toLowerCase()}@rail.in`],
              ["Account Status", "Active"],
              ["Current Zone", "Central Railway"],
              ["Current Division", "Nagpur"],
              ["Current Station Placement", profile.stationName],
              ["Reporting Officer", profile.reportingOfficer]
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
              <div style={{ gridColumn: "span 2" }}><strong>PME Status Check:</strong><div style={{fontWeight: 700, color: "#065f46", marginTop: 4}}>{profile.pmeStatus}</div></div>
              <div style={{ gridColumn: "span 2" }}><strong>Refresher Course Status:</strong><div style={{fontWeight: 700, color: "#0d2c4d", marginTop: 4}}>{profile.refStatus}</div></div>
              <div style={{ gridColumn: "span 2" }}><strong>Training Clearance:</strong><div style={{fontWeight: 700, color: "#d97706", marginTop: 4}}>{profile.trainingStatus}</div></div>
            </div>
          </div>
        </div>

        <div className="sdom-chart-card">
          <div className="sdom-chart-title">Score Trend</div>
          <div className="sdom-chart-subtitle">Your assessment score progression</div>
          <div style={{ height: 300, marginTop: "16px" }}>
            <PerformanceTrendChart 
              data={personalScoreData} 
              xAxisKey="month" 
              yAxisKey="score" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
