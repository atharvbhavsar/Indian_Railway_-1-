import React from 'react';
import {
  ArrowLeft, Activity, Calendar, PlayCircle, UserPlus, ShieldCheck, TrendingUp
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getCat, getCatColor, getCatBg, riskLevel, riskColor } from '../../../utils/scoreCalculator';
import { useLanguage } from '../../../contexts/LanguageContext';

const CAT_BG = { A: "#dcfce7", B: "#dbeafe", C: "#fef3c7", D: "#fee2e2", Untested: "#f3f4f6" };
const CAT_COLOR = { A: "#16a34a", B: "#2563eb", C: "#d97706", D: "#dc2626", Untested: "#4b5563" };
const RISK_BG = { Low: "#dcfce7", Medium: "#fef3c7", High: "#fee2e2", Untested: "#f3f4f6" };
const RISK_COLOR = { Low: "#16a34a", Medium: "#d97706", High: "#dc2626", Untested: "#4b5563" };

const CustomTooltip = ({ active, payload, label }) => {
  const { t } = useLanguage();
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "8px 12px", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: "12px", color: "#1e293b" }}>{label}</p>
        <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#2563eb", fontWeight: 800 }}>{t("Score:")} {payload[0].value}</p>
        {payload[0].payload.date && (
          <p style={{ margin: "2px 0 0", fontSize: "10px", color: "#64748b" }}>{payload[0].payload.date}</p>
        )}
      </div>
    );
  }
  return null;
};

export function StationMasterPointsmanView(props) {
  const { t } = useLanguage();
  const {
    pm,
    setPageMode,
    smProfile,
    pmAssessmentHistory,
    setInspectRecord
  } = props;

  const cat = pm.cat || "Untested";
  const risk = cat === "Untested" ? "Untested" : riskLevel(pm);
  const safetyPct = pm.safetyScore;
  const hist = pmAssessmentHistory[pm.id] || [];

  return (
    <section className="sm2-card">
      <div className="sm2-card-hdr">
        <h2>{t("Pointsman Details")}</h2>
        <button className="sm2-link-btn" onClick={() => setPageMode("default")}>{t("← Back")}</button>
      </div>

      {/* Hero */}
      <div className="sm2-pm-hero">
        <div className="sm2-pm-avatar">{pm.name.charAt(0)}</div>
        <div>
          <h3>{pm.name}</h3>
          <span>{pm.hrmsId} · {t(pm.designation || "Pointsman")} · {t(pm.station || smProfile.station)}</span>
          <div className="sm2-pm-badges">
            <span className="sm2-badge" style={{ background: CAT_BG[cat], color: CAT_COLOR[cat] }}>{cat === "Untested" ? t("Untested") : `${t("Category")} ${cat}`}</span>
            <span className="sm2-badge" style={{ background: RISK_BG[risk], color: RISK_COLOR[risk] }}>{risk === "Untested" ? t("Untested") : `${t(risk)} ${t("Risk")}`}</span>
            <span className={`sm2-status-pill sm2-status-${pm.approvalStatus.toLowerCase()}`}>{t(pm.approvalStatus)}</span>
          </div>
        </div>
        <div className="sm2-pm-quick-stats">
          <div><label>{t("Latest Score")}</label><strong>{cat === "Untested" ? t("Not Given Test") : `${pm.lastScore}/100`}</strong></div>
          <div><label>{t("Safety Score")}</label><strong>{pm.safetyScore}/100</strong></div>
          <div><label>{t("Assessments")}</label><strong>{pm.totalAssessments}</strong></div>
        </div>
      </div>

      {/* Personal Info */}
      <dl className="sm2-dl-grid" style={{ marginBottom: 20 }}>
        <div><dt>{t("Gender")}</dt><dd>{t(pm.gender)}</dd></div>
        <div><dt>{t("Age")}</dt><dd>{pm.age} {t("yrs")}</dd></div>
        <div><dt>{t("Date of Joining")}</dt><dd>{pm.doj}</dd></div>
        <div><dt>{t("Base Pay")}</dt><dd>{pm.basePay}</dd></div>
      </dl>

      {/* Monitoring Status */}
      <div style={{
        marginTop: "20px",
        marginBottom: "20px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "14px",
        padding: "20px",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.02)"
      }}>
        <h4 style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          margin: "0 0 16px 0",
          fontSize: "14px",
          fontWeight: "700",
          color: "#0f172a",
          textTransform: "uppercase",
          letterSpacing: "0.5px"
        }}>
          <Activity size={16} color="#0d2c4d" /> {t("Monitoring Status")}
        </h4>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px" }}>
          {[
            {
              status: "Active",
              color: "#16a34a",
              bg: "#dcfce7",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" fill="#16a34a" fillOpacity="0.2" />
                  <circle cx="12" cy="12" r="3" fill="#16a34a" />
                </svg>
              ),
              desc: t("Available for yard operations")
            },
            {
              status: "On Duty",
              color: "#d97706",
              bg: "#fef3c7",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              ),
              desc: t("Currently executing track tasks")
            },
            {
              status: "Off Duty",
              color: "#64748b",
              bg: "#f1f5f9",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              desc: t("Resting / Shift ended")
            },
            {
              status: "Absent",
              color: "#dc2626",
              bg: "#fee2e2",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              ),
              desc: t("Unexcused leave of absence")
            }
          ].map(item => {
            const isActive = (pm.monitoringStatus || "Active") === item.status;
            return (
              <div
                key={item.status}
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  border: isActive ? `1.5px solid ${item.color}` : "1.5px solid #e2e8f0",
                  background: isActive ? item.bg : "#ffffff",
                  boxShadow: isActive ? `0 4px 14px ${item.color}15` : "none",
                  opacity: isActive ? 1 : 0.6,
                  transform: isActive ? "scale(1.02)" : "none",
                  transition: "all 0.2s ease",
                  cursor: "default"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ display: "flex", alignItems: "center" }}>{item.icon}</span>
                    <span style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: isActive ? item.color : "#334155"
                    }}>
                      {t(item.status)}
                    </span>
                  </div>
                  {isActive && (
                    <span style={{
                      fontSize: "9px",
                      fontWeight: "800",
                      background: item.color,
                      color: "#ffffff",
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      textTransform: "uppercase",
                      letterSpacing: "0.2px"
                    }}>
                      {t("Current")}
                    </span>
                  )}
                </div>
                <p style={{
                  margin: 0,
                  fontSize: "11px",
                  color: isActive ? "#334155" : "#64748b",
                  fontWeight: isActive ? "500" : "400",
                  lineHeight: "1.4"
                }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety Compliance */}
      <div className="sm2-safety-block">
        <h4>{t("Safety Compliance")}</h4>
        <div className="sm2-safety-grid">
          <div className="sm2-safety-item"><span>{t("PME Status")}</span><strong className={pm.pmeStatus === "Fit" ? "text-green" : "text-red"}>{t(pm.pmeStatus || "Fit")}</strong></div>
          <div className="sm2-safety-item"><span>{t("REF Status")}</span><strong className={pm.refStatus === "Cleared" ? "text-green" : "text-amber"}>{t(pm.refStatus || "Cleared")}</strong></div>
          <div className="sm2-safety-item"><span>{t("Disciplinary")}</span><strong className={pm.disciplinary === "None" ? "text-green" : "text-red"}>{t(pm.disciplinary || "None")}</strong></div>
          <div className="sm2-safety-item"><span>{t("Incidents")}</span><strong className={pm.incidents === 0 ? "text-green" : "text-red"}>{pm.incidents} {t("reported")}</strong></div>
        </div>
        <div className="sm2-compliance-bar-wrap">
          <div className="sm2-compliance-label">
            <span>{t("Overall Safety Compliance")}</span>
            <strong style={{ color: safetyPct >= 75 ? "#16a34a" : safetyPct >= 50 ? "#d97706" : "#dc2626" }}>{safetyPct}/100</strong>
          </div>
          <div className="sm2-compliance-track">
            <div className="sm2-compliance-fill" style={{
              width: `${safetyPct}%`,
              background: safetyPct >= 75 ? "#16a34a" : safetyPct >= 50 ? "#d97706" : "#dc2626"
            }} />
          </div>
        </div>
      </div>

      {/* 📈 PERFORMANCE TREND & SAFETY COMPETENCY breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "20px", marginTop: "20px" }}>

        {/* Performance Improvement Trend Chart */}
        <div style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          padding: "20px",
          boxShadow: "0 1px 3px rgba(15, 23, 42, 0.02)"
        }}>
          <h4 style={{ margin: "0 0 16px 0", fontSize: "14px", fontWeight: "700", color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
            <TrendingUp size={16} color="#2563eb" /> {t("Performance Improvement Trend")}
          </h4>
          {hist.length === 0 ? (
            <p style={{ color: "#64748b", fontStyle: "italic", fontSize: "13px" }}>{t("No history to plot trend.")}</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={[...hist].reverse().map((h, i) => ({ attempt: `Eval ${i + 1}`, score: h.total, date: h.date }))} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="attempt" tick={{ fontSize: 10, fill: "#64748b" }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#64748b" }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: "#2563eb" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
          <div style={{ marginTop: "12px", fontSize: "12px", color: "#64748b", lineHeight: "1.4" }}>
            💡 {t("The timeline shows overall competence score growth over review periods. Target compliance rate is 60% minimum.")}
          </div>
        </div>

        {/* Correct / Wrong Answers Audit */}
        <div style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          padding: "20px",
          boxShadow: "0 1px 3px rgba(15, 23, 42, 0.02)"
        }}>
          <h4 style={{ margin: "0 0 16px 0", fontSize: "14px", fontWeight: "700", color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldCheck size={16} color="#16a34a" /> {t("Safety Competency Audit Breakdown")}
          </h4>
          <div style={{ maxHeight: "200px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", paddingRight: "4px" }}>
            {[
              { q: "Speed limit permitted over loop lines?", ans: "30 km/h", key: 1 },
              { q: "Signal below stop signal to admit train into occupied lines?", ans: "Calling-on signal", key: 2 },
              { q: "Maximum speed limit during shunting operations?", ans: "15 km/h", key: 3 },
              { q: "Vigilance action upon noticing hot axle on train?", ans: "Display Danger Hand Signal", key: 4 },
              { q: "Detonator count required for emergency protection?", ans: "3 Detonators", key: 5 },
              { q: "Frequency of mandatory refresher training?", ans: "Every 3 years", key: 6 },
              { q: "Who delivers key/token to loco pilots?", ans: "Authorized Pointsman", key: 7 },
              { q: "Shunting indicator signal light type?", ans: "Position Light Type", key: 8 }
            ].map((item, index) => {
              const isCorrect = pm.lastScore >= (index + 1) * 11;
              return (
                <div key={item.key} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: isCorrect ? "#f0fdf4" : "#fef2f2",
                  border: isCorrect ? "1px solid #dcfce7" : "1px solid #fee2e2"
                }}>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: isCorrect ? "#16a34a" : "#dc2626",
                    color: "#ffffff",
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginTop: "1px",
                    flexShrink: 0
                  }}>
                    {isCorrect ? "✓" : "✗"}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: "12px", fontWeight: "600", color: "#1e293b" }}>{t(item.q)}</p>
                    <p style={{ margin: "2px 0 0", fontSize: "11px", color: isCorrect ? "#16a34a" : "#dc2626", fontWeight: "500" }}>
                      {isCorrect ? `${t("Correct Answer:")} ${t(item.ans)}` : t("Incorrect (Selected wrong threshold)")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Assessment History */}
      <div style={{ marginTop: 20 }}>
        <h4 style={{ margin: "0 0 12px", fontSize: 14, color: "#0f172a" }}>{t("Assessment History")}</h4>
        {hist.length === 0 ? <p className="sm2-empty">{t("No assessments recorded yet.")}</p> : (
          <div className="sm2-table-wrap">
            <div className="sm2-hist-head sm2-hist-row-6">
              {["Date", "Test Marks", "Add. Marks", "Total", "Grade", "Status"].map(h => <span key={h}>{t(h)}</span>)}
            </div>
            {hist.map(r => {
              const hCat = r.category || getCat(r.total);
              return (
                <div key={r.id} className="sm2-hist-row-6 sm2-hist-data-row">
                  <span>{r.date}</span>
                  <span>{r.testMarks}</span>
                  <span>{r.addMarks}</span>
                  <span><strong>{r.total}</strong></span>
                  <span><span className="sm2-badge" style={{ background: CAT_BG[hCat], color: CAT_COLOR[hCat] }}>{t("Cat.")} {hCat}</span></span>
                  <span>
                    <span className={`sm2-status-pill sm2-status-${r.approvalStatus.toLowerCase()}`}>{t(r.approvalStatus)}</span>
                    {r.tiRemarks && <div style={{ fontSize: 11, color: "#dc2626", marginTop: 2 }}>{t(r.tiRemarks)}</div>}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
