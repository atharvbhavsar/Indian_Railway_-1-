import React from 'react';
import { 
  UserCircle2, ShieldCheck, FileText, Activity, AlertTriangle, PlayCircle, BarChart2, Plus, Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getCat, getCatColor, getCatBg, riskLevel, riskColor } from '../../../utils/scoreCalculator';
import { useLanguage } from '../../../contexts/LanguageContext';

export function StationMasterPointsmanDetail(props) {
  const { language, changeLanguage, t } = useLanguage();

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
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t("Staff Profile")}</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 4 }}>{smName}</div>
          <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>{t(smProfile.role || smProfile.designation || "Station Master")} &bull; {t(smProfile.station || "—")} &bull; {t("Central Railway")}</div>
          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            {category !== "Untested" && (
              <span className={`sdom-badge ${category === "D" ? "sdom-badge-danger" : category === "C" ? "sdom-badge-warning" : "sdom-badge-success"}`}>
                {t("Category")} {category}
              </span>
            )}
            {category === "Untested" && (
              <span className="sdom-badge sdom-badge-warning">{t("Untested")}</span>
            )}
            <span className={`sdom-badge ${risk === "High" ? "sdom-badge-danger" : risk === "Medium" ? "sdom-badge-warning" : "sdom-badge-success"}`}>
              {t(risk)} {t("Risk")}
            </span>
            <span className="sdom-badge sdom-badge-success">{t("Active")}</span>
          </div>
        </div>
        <div className="sdom-station-header-stats">
          <div className="sdom-station-header-stat">
            <span className="val">{smProfile.score > 0 ? smProfile.score : "—"}</span>
            <span className="lbl">{t("Latest Score")}</span>
          </div>
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
          <div className="sdom-station-header-stat">
            <span className="val">{smProfile.mobile || smProfile.contact || "—"}</span>
            <span className="lbl">{t("Contact")}</span>
          </div>
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
          <div className="sdom-station-header-stat">
            <span className="val">{smProfile.lastAssessDate || "—"}</span>
            <span className="lbl">{t("Last Assessment")}</span>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="sdom-row-2" style={{ marginBottom: "24px" }}>
        <div className="sdom-chart-card">
          <div className="sdom-chart-title" style={{ marginBottom: "16px" }}>{t("Personal & Professional Details")}</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', paddingBottom: '20px' }}>
            {[
              [t("Employee ID / HRMS ID"), smId],
              [t("Designation"), t(smProfile.role || smProfile.designation || "Station Master")],
              [t("Mobile Number"), smProfile.mobile || smProfile.contact || "—"],
              [t("Email ID"), smProfile.email || `${smId.toLowerCase()}@rail.in`],
              [t("Account Status"), t("Active")],
              [t("Current Zone"), t(smProfile.zone || "Central Railway")],
              [t("Current Division"), t(smProfile.division || "Nagpur")],
              [t("Current Station Placement"), t(smProfile.station || "—")],
              [t("Reporting Officer"), t(smProfile.reportingOfficer || "Station Superintendent / AOM")]
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
              {t("Operational & Safety Dates")}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', fontSize: '13px' }}>
              <div><strong>{t("PME Done Date")}:</strong><div style={{fontWeight: 700, color: "#065f46", marginTop: 4}}>{smProfile.pmeDoneDate || "—"}</div></div>
              <div><strong>{t("PME Due Date")}:</strong><div style={{fontWeight: 700, color: "#991b1b", marginTop: 4}}>{smProfile.pmeDueDate || "—"}</div></div>
              <div><strong>{t("Isolator Certificate Issued")}:</strong><div style={{fontWeight: 700, color: "#0d2c4d", marginTop: 4}}>{smProfile.isolatorCertificateIssuedDate || "—"}</div></div>
              <div><strong>{t("Automatic Training Date")}:</strong><div style={{fontWeight: 700, color: "#0d2c4d", marginTop: 4}}>{smProfile.automaticTrainingDate || "—"}</div></div>
              <div style={{ gridColumn: "span 2" }}><strong>{t("Refresher Counselling Date")}:</strong><div style={{fontWeight: 700, color: "#d97706", marginTop: 4}}>{smProfile.counsellingDate || "—"}</div></div>
            </div>
          </div>

          {/* User Preferences */}
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginTop: '16px' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '14px', color: '#0f172a', fontWeight: '800', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px' }}>
              {t("User Preferences")}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>{t("Language Preference")}</label>
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#0f172a',
                  outline: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: '240px'
                }}
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="sdom-chart-card">
          <div className="sdom-chart-title">{t("Score Trend")}</div>
          <div className="sdom-chart-subtitle">{t("Your assessment score progression")}</div>
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
                {t("No score history available (Untested)")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
