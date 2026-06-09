import React from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import { useLanguage } from "../../contexts/LanguageContext";

export function TMProfile({
  fullName,
  employeeId,
  user = {},
  latestCategory,
  latestScore,
  history = []
}) {
  const { language, changeLanguage, t } = useLanguage();

  const personalScoreData = [...history].reverse().map(h => ({
    month: h.assessmentPeriod ? h.assessmentPeriod.replace(" 2026", "").replace(" 2025", "") : h.date,
    score: h.totalScore
  }));

  const category = user.category || latestCategory || "Untested";
  const score = user.score !== undefined ? user.score : latestScore;

  return (
    <div className="sdom-fade">
      {/* Hero header */}
      <div className="sdom-station-header" style={{ marginBottom: 24 }}>
        <div className="sdom-station-header-meta">
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t("Staff Profile")}</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 4 }}>{fullName}</div>
          <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>{t(user.role || "Train Manager")} &bull; {t(user.station || "—")} &bull; {t("Central Railway")}</div>
          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            {category !== "Untested" && (
              <span className={`sdom-badge ${category === "D" ? "sdom-badge-danger" : category === "C" ? "sdom-badge-warning" : "sdom-badge-success"}`}>
                {t("Category")} {category}
              </span>
            )}
            {category === "Untested" && (
              <span className="sdom-badge sdom-badge-warning">{t("Untested")}</span>
            )}
            <span className="sdom-badge sdom-badge-success">{t("Active")}</span>
          </div>
        </div>
        <div className="sdom-station-header-stats">
          <div className="sdom-station-header-stat">
            <span className="val">{score > 0 ? score : "—"}</span>
            <span className="lbl">{t("Latest Score")}</span>
          </div>
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
          <div className="sdom-station-header-stat">
            <span className="val">{user.mobile || "—"}</span>
            <span className="lbl">{t("Contact")}</span>
          </div>
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
          <div className="sdom-station-header-stat">
            <span className="val">{history.length ? history[0].date : "—"}</span>
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
              [t("Employee ID / HRMS ID"), employeeId],
              [t("Designation"), t(user.role || "Train Manager")],
              [t("Mobile Number"), user.mobile || "—"],
              [t("Email ID"), user.email || `${(employeeId || "").toLowerCase()}@rail.in`],
              [t("Account Status"), t("Active")],
              [t("Current Zone"), t(user.zone || "Central Railway")],
              [t("Current Division"), t(user.division || "Nagpur")],
              [t("Current Station Placement"), t(user.station || "—")],
              [t("Reporting Officer"), t(user.reportingSm || "Station Superintendent / AOM")]
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
              <div><strong>{t("PME Last Completed")}:</strong><div style={{fontWeight: 700, color: "#065f46", marginTop: 4}}>{user.pmeDate || "—"}</div></div>
              <div><strong>{t("PME Next Due")}:</strong><div style={{fontWeight: 700, color: "#991b1b", marginTop: 4}}>{user.pmeDueDate || "—"}</div></div>
              <div><strong>{t("Refresher Course Completed")}:</strong><div style={{fontWeight: 700, color: "#0d2c4d", marginTop: 4}}>{user.refresherDate || "—"}</div></div>
              <div><strong>{t("Refresher Course Due")}:</strong><div style={{fontWeight: 700, color: "#0d2c4d", marginTop: 4}}>{user.refresherDueDate || "—"}</div></div>
              <div style={{ gridColumn: "span 2" }}><strong>{t("Training Clearance")}:</strong><div style={{fontWeight: 700, color: "#d97706", marginTop: 4}}>{t(user.trainingStatus || "Active")}</div></div>
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
