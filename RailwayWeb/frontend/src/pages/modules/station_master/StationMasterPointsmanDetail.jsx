import React from 'react';
import { 
  UserCircle2, ShieldCheck, FileText, Activity, AlertTriangle, PlayCircle, BarChart2, Plus, Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getCat, getCatColor, getCatBg, riskLevel, riskColor } from '../../../utils/scoreCalculator';

export function StationMasterPointsmanDetail(props) {
  const {
    smName,
    smId,
    smProfile = {},
    history = []
  } = props;

  // Render score trend if user has a score, otherwise empty
  let personalScoreData = (history || [])
    .filter(h => h.approvalStatus === "Approved" || h.approvalStatus === "Completed")
    .map(h => ({
      month: h.date,
      score: h.totalScore
    }))
    .reverse(); // chronological order

  if (personalScoreData.length === 0 && smProfile.score > 0) {
    personalScoreData = [{ month: "Score", score: smProfile.score }];
  }

  const category = smProfile.cat || smProfile.category || "Untested";
  const risk = smProfile.risk || smProfile.riskLevel || "Untested";

  return (
    <div className="sdom-fade">
      {/* Hero header */}
      <div className="sdom-station-header" style={{ marginBottom: 24 }}>
        <div className="sdom-station-header-meta">
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Staff Profile</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 4 }}>{smName}</div>
          <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>{smProfile.role || smProfile.designation || "Station Master"} &bull; {smProfile.station || "—"} &bull; Central Railway</div>
          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            {category !== "Untested" && (
              <span className={`sdom-badge ${category === "D" ? "sdom-badge-danger" : category === "C" ? "sdom-badge-warning" : "sdom-badge-success"}`}>
                Category {category}
              </span>
            )}
            {category === "Untested" && (
              <span className="sdom-badge sdom-badge-warning">Untested</span>
            )}
            <span className={`sdom-badge ${risk === "High" ? "sdom-badge-danger" : risk === "Medium" ? "sdom-badge-warning" : "sdom-badge-success"}`}>
              {risk} Risk
            </span>
            <span className="sdom-badge sdom-badge-success">Active</span>
          </div>
        </div>
        <div className="sdom-station-header-stats">
          <div className="sdom-station-header-stat">
            <span className="val">{smProfile.score > 0 ? smProfile.score : "—"}</span>
            <span className="lbl">Latest Score</span>
          </div>
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
          <div className="sdom-station-header-stat">
            <span className="val">{smProfile.mobile || smProfile.contact || "—"}</span>
            <span className="lbl">Contact</span>
          </div>
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
          <div className="sdom-station-header-stat">
            <span className="val">{smProfile.lastAssessDate || "—"}</span>
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
              ["Employee ID / HRMS ID", smId],
              ["Designation", smProfile.role || smProfile.designation || "Station Master"],
              ["Mobile Number", smProfile.mobile || smProfile.contact || "—"],
              ["Email ID", smProfile.email || `${smId.toLowerCase()}@rail.in`],
              ["Account Status", "Active"],
              ["Current Zone", smProfile.zone || "Central Railway"],
              ["Current Division", smProfile.division || "Nagpur"],
              ["Current Station Placement", smProfile.station || "—"],
              ["Reporting Officer", smProfile.reportingOfficer || "Station Superintendent / AOM"]
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
              <div><strong>PME Done Date:</strong><div style={{fontWeight: 700, color: "#065f46", marginTop: 4}}>{smProfile.pmeDoneDate || "—"}</div></div>
              <div><strong>PME Due Date:</strong><div style={{fontWeight: 700, color: "#991b1b", marginTop: 4}}>{smProfile.pmeDueDate || "—"}</div></div>
              <div><strong>Isolator Certificate Issued:</strong><div style={{fontWeight: 700, color: "#0d2c4d", marginTop: 4}}>{smProfile.isolatorCertificateIssuedDate || "—"}</div></div>
              <div><strong>Automatic Training Date:</strong><div style={{fontWeight: 700, color: "#0d2c4d", marginTop: 4}}>{smProfile.automaticTrainingDate || "—"}</div></div>
              <div style={{ gridColumn: "span 2" }}><strong>Refresher Counselling Date:</strong><div style={{fontWeight: 700, color: "#d97706", marginTop: 4}}>{smProfile.counsellingDate || "—"}</div></div>
            </div>
          </div>
        </div>

        <div className="sdom-chart-card">
          <div className="sdom-chart-title">Score Trend</div>
          <div className="sdom-chart-subtitle">Your assessment score progression</div>
          <div style={{ height: 300 }}>
            {personalScoreData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={personalScoreData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="month" fontSize={11}/>
                  <YAxis domain={[40, 100]} fontSize={11}/>
                  <Tooltip/>
                  <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }}/>
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontSize: "0.9rem" }}>
                No score history available (Untested)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
