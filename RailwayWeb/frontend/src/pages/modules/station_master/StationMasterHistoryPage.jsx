import React from 'react';
import { 
  Search, Filter, Calendar, TrendingUp, Download, Eye, Award, CheckCircle2, AlertTriangle, PlayCircle, FileText
} from 'lucide-react';
import { getCat, getCatColor, getCatBg, riskLevel, riskColor } from '../../../utils/scoreCalculator';
import { formatQuarterPeriod } from '../../../utils/scoreCalculator';
import { useLanguage } from '../../../contexts/LanguageContext';

export function StationMasterHistoryPage(props) {
  const { t } = useLanguage();
  const {
    selectedReportUserId,
    setSelectedReportUserId,
    repF,
    setRepF,
    pointsmen,
    smProfile,
    allDbAssessments
  } = props;

  const ROLE_MAP = { 
    pointsmen: t("Pointsman"), 
    sm: t("Station Master"), 
    ss: t("Station Superintendent"), 
    tm: t("Train Manager"), 
    ti: t("Traffic Inspector"), 
    Pointsman: t("Pointsman"), 
    "Station Master": t("Station Master"), 
    "Station Superintendent": t("Station Superintendent"), 
    "Train Manager": t("Train Manager"), 
    "Traffic Inspector": t("Traffic Inspector") 
  };

  if (selectedReportUserId) {
    const u = pointsmen.find(x => x.hrmsId === selectedReportUserId);
    if (!u) return null;

    const cat = u.cat || "Untested";
    
    const CAT_C  = { A: "#16a34a", B: "#2563eb", C: "#d97706", D: "#dc2626", Untested: "#64748b" };
    const CAT_B  = { A: "#dcfce7", B: "#dbeafe", C: "#fef3c7", D: "#fee2e2", Untested: "#f1f5f9" };
    const RISK_C = { High: "#dc2626", Medium: "#d97706", Low: "#16a34a", Untested: "#64748b" };
    
    const risk = cat === "Untested" ? "Untested" : riskLevel(u);
    const isHighRisk = risk === "High";
    const pmeVal = u.pmeStatus === "Fit" ? "FIT" : u.pmeStatus === "Pending" ? "PENDING" : u.pmeStatus === "Overdue" ? "OVERDUE" : "UNFIT";
    const refVal = u.refStatus === "Cleared" ? "CLEARED" : "EXPIRED";

    return (
      <div className="ti2-card animate-fade-in" style={{ padding: "24px", background: "white", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0" }}>
        {/* Header section with back button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1.5px solid #e2edf8", paddingBottom: "16px", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div className="ti2-pm-avatar" style={{ width: 48, height: 48, fontSize: 18, background: "#2563eb", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontWeight: "700" }}>{u.name.charAt(0)}</div>
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a", margin: 0 }}>{u.name}</h2>
              <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#64748b", fontWeight: "700" }}>{ROLE_MAP[u.role] || t(u.designation) || t(u.role)} {t("Dossier")} · {t(u.stationName)}</p>
            </div>
          </div>
          <button className="ti2-link-btn" onClick={() => setSelectedReportUserId(null)} style={{ fontSize: "13px", fontWeight: "800", color: "#2563eb", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
            {t("← Back to Reports")}
          </button>
        </div>

        {/* Quick Info Summary metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{t("Grand Total Score")}</span>
            <strong style={{ display: "block", fontSize: "24px", color: CAT_C[cat] || "#2563eb", marginTop: "4px", fontWeight: "900" }}>{cat === "Untested" ? t("Not Given Test") : `${u.lastScore}/100`}</strong>
          </div>
          <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{t("Safety Grade")}</span>
            <div>
              <span className="ti2-badge" style={{ display: "inline-block", background: CAT_B[cat] || "#dbeafe", color: CAT_C[cat] || "#2563eb", fontSize: "13px", fontWeight: "800", padding: "4px 14px", borderRadius: "8px", marginTop: "8px" }}>
                {cat === "Untested" ? t("Untested") : `${t("Category")} ${cat}`}
              </span>
            </div>
          </div>
          <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{t("PME Clearance")}</span>
            <div>
              <span className="ti2-badge" style={{ display: "inline-block", background: pmeVal === "FIT" ? "#dcfce7" : "#fee2e2", color: pmeVal === "FIT" ? "#16a34a" : "#dc2626", fontSize: "13px", fontWeight: "800", padding: "4px 14px", borderRadius: "8px", marginTop: "8px" }}>
                {t(pmeVal)}
              </span>
            </div>
          </div>
          <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{t("REF Training")}</span>
            <div>
              <span className="ti2-badge" style={{ display: "inline-block", background: refVal === "CLEARED" ? "#dcfce7" : "#fee2e2", color: refVal === "CLEARED" ? "#16a34a" : "#dc2626", fontSize: "13px", fontWeight: "800", padding: "4px 14px", borderRadius: "8px", marginTop: "8px" }}>
                {t(refVal)}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "24px" }}>
          {/* Left side details card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "14px", padding: "18px" }}>
              <h3 style={{ margin: "0 0 14px 0", fontSize: "13px", fontWeight: "800", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1.5px solid #e2edf8", paddingBottom: "8px" }}>{t("Personnel Roster Details")}</h3>
              <dl style={{ display: "flex", flexDirection: "column", gap: "12px", margin: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>{t("Employee HRMS ID")}</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.hrmsId}</dd></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>{t("Designation")}</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{ROLE_MAP[u.role] || t(u.designation) || t(u.role)}</dd></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>{t("Jurisdiction Station")}</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{t(u.stationName)}</dd></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>{t("Contact Number")}</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.mobileNo || "+91 98765 11001"}</dd></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>{t("Date of Appointment")}</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.doj || "2018-02-12"}</dd></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>{t("Alcoholic Status")}</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#16a34a" }}>{t("Non-Alcoholic")}</dd></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>{t("Assigned Division Risk")}</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: RISK_C[risk] || "#64748b" }}>{risk === "Untested" ? t("Untested") : `${t(risk)} ${t("Risk")}`}</dd></div>
              </dl>
            </div>

            {/* Action button */}
            <button className="ti2-primary-btn" onClick={() => alert(t("Exporting Dossier PDF..."))} style={{ width: "100%", height: "42px", justifyContent: "center", background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", borderRadius: "8px", fontWeight: "700", cursor: "pointer", border: "none", color: "#ffffff", display: "flex", alignItems: "center", gap: "6px" }}>
              <FileText size={16}/> {t("Export Assessment Dossier (PDF)")}
            </button>
          </div>

          {/* Right side Performance Breakdown */}
          <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "14px", padding: "18px" }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "13px", fontWeight: "800", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1.5px solid #e2edf8", paddingBottom: "8px" }}>{t("Sectional Competency Breakdown")}</h3>
            
            {/* Pointsman sections competency progress bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {(() => {
                // Find latest approved assessment for selected pointsman
                const pmAssessments = (allDbAssessments || []).filter(a => a.employee?.hrms_id === u.hrmsId);
                const sortedAssessments = [...pmAssessments].sort((a, b) => new Date(b.assessment_date || b.created_at) - new Date(a.assessment_date || a.created_at));
                const latestAssess = sortedAssessments.find(a => ["Approved", "Submitted", "Completed", "EVALUATED"].includes(a.status));
                
                let secScores = {
                  knowledge: null,
                  alertness: null,
                  safety: null,
                  leadership: null,
                  discipline: null,
                  appearance: null
                };

                if (latestAssess) {
                  const ta = latestAssess.TEST_ATTEMPT?.[0];
                  const answers = ta?.answers;
                  if (answers) {
                    if (answers.knowledgeMarks !== undefined && answers.knowledgeMarks !== "") {
                      secScores.knowledge = parseFloat(answers.knowledgeMarks) || 0;
                    }
                    if (Array.isArray(answers.sections)) {
                      answers.sections.forEach(sec => {
                        const title = (sec.title || "").toLowerCase();
                        if (title.includes("alertness")) secScores.alertness = sec.marks;
                        else if (title.includes("safety")) secScores.safety = sec.marks;
                        else if (title.includes("leadership")) secScores.leadership = sec.marks;
                        else if (title.includes("discipline")) secScores.discipline = sec.marks;
                        else if (title.includes("appearance")) secScores.appearance = sec.marks;
                      });
                    }
                    const YN_WEIGHTS = { alertness: 5, safety: 3, leadership: 3, discipline: 2, appearance: 2 };
                    Object.keys(YN_WEIGHTS).forEach(key => {
                      if (secScores[key] === null && Array.isArray(answers[key])) {
                        secScores[key] = answers[key].filter(x => x === "Yes").length * YN_WEIGHTS[key];
                      }
                    });
                  }
                }

                const dbKnowledge = secScores.knowledge !== null ? secScores.knowledge : Math.round((u.lastScore || 0) * 0.25);
                const dbAlertness = secScores.alertness !== null ? secScores.alertness : Math.round((u.lastScore || 0) * 0.25);
                const dbSafety = secScores.safety !== null ? secScores.safety : Math.round((u.lastScore || 0) * 0.15);
                const dbLeadership = secScores.leadership !== null ? secScores.leadership : Math.round((u.lastScore || 0) * 0.15);
                const dbDiscipline = secScores.discipline !== null ? secScores.discipline : Math.round((u.lastScore || 0) * 0.10);
                const dbAppearance = secScores.appearance !== null ? secScores.appearance : Math.round((u.lastScore || 0) * 0.10);

                const secs = [
                  { title: "Knowledge of Rules", score: dbKnowledge, max: 25 },
                  { title: "Alertness and Observation of Rules", score: dbAlertness, max: 25 },
                  { title: "Safety Record", score: dbSafety, max: 15 },
                  { title: "Leadership and Management", score: dbLeadership, max: 15 },
                  { title: "Discipline", score: dbDiscipline, max: 10 },
                  { title: "Appearance and Neatness", score: dbAppearance, max: 10 },
                ];
                return secs.map(s => {
                  const pct = Math.round((s.score / s.max) * 100);
                  return (
                    <div key={s.title}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>
                        <span>{t(s.title)}</span>
                        <strong>{s.score} / {s.max}</strong>
                      </div>
                      <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: pct >= 80 ? "#16a34a" : pct >= 50 ? "#2563eb" : "#dc2626", borderRadius: "999px" }}/>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const testedPointsmen = pointsmen.filter(p => p.cat && p.cat !== "Untested" && p.lastScore > 0);
  const avgScore = testedPointsmen.length ? Math.round(testedPointsmen.reduce((s, p) => s + (p.lastScore || 0), 0) / testedPointsmen.length) : 0;
  const testedForSafety = pointsmen.filter(p => p.cat && p.cat !== "Untested" && p.safetyScore !== null && p.safetyScore !== undefined);
  const safetyPct = testedForSafety.length ? Math.round(testedForSafety.reduce((s, p) => s + (p.safetyScore || 0), 0) / testedForSafety.length) : 0;
  const highRisk = pointsmen.filter(p => riskLevel(p) === "High").length;
  const pending = pointsmen.filter(p => p.approvalStatus === "Pending").length;

  const divSummary = [
    { label: t("Average Station Score"),  val: avgScore > 0 ? avgScore : "—" },
    { label: t("Safety Compliance"),     val: safetyPct > 0 ? `${safetyPct}/100` : "—" },
    { label: t("High-Risk Staff"),         val: highRisk },
    { label: t("Pending Approvals"),       val: pending },
    { label: t("Total Reports Generated"), val: pointsmen.length },
  ];

  const ROLE_OPTS    = ["All","Pointsman"];
  const STATION_OPTS = ["All", smProfile?.station || smProfile?.stationName || "Nagpur Junction"];
  const TI_OPTS      = ["All", "Nagpur Division"];

  const repFiltered = pointsmen.filter(s => {
    const matchesSearch = !repF.search || 
      (s.name || "").toLowerCase().includes(repF.search.toLowerCase()) || 
      (s.hrmsId || "").toLowerCase().includes(repF.search.toLowerCase());
    const matchesCat = repF.cat === "All" || (s.cat || "Untested") === repF.cat;
    const risk = s.cat === "Untested" ? "Untested" : riskLevel(s);
    const matchesRisk = repF.risk === "All" || risk === repF.risk;
    return matchesSearch && matchesCat && matchesRisk;
  });

  const catBadge = c => <span className="sdom-badge" style={{ background: { A: "#dcfce7", B: "#dbeafe", C: "#fef3c7", D: "#fee2e2" }[c] || "#f3f4f6", color: { A: "#16a34a", B: "#2563eb", C: "#d97706", D: "#dc2626" }[c] || "#6b7280" }}>{c === "Untested" ? t("Untested") : (c ? `${t("Cat.")} ${c}` : "—")}</span>;
  const riskBadge = r => <span className="sdom-badge" style={{ background: { Low: "#dcfce7", Medium: "#fef3c7", High: "#fee2e2" }[r] || "#f3f4f6", color: { Low: "#16a34a", Medium: "#d97706", High: "#dc2626" }[r] || "#6b7280" }}>{t(r)}</span>;
  const statusBadge = s => <span className="sdom-badge" style={{ background: { Approved: "#dcfce7", Pending: "#fef3c7", Rejected: "#fee2e2", Completed: "#dcfce7", Fit: "#dcfce7" }[s] || "#f3f4f6", color: { Approved: "#16a34a", Pending: "#d97706", Rejected: "#dc2626", Completed: "#16a34a", Fit: "#16a34a" }[s] || "#6b7280" }}>{t(s)}</span>;

  return (
    <div className="sdom-fade" style={{ background: "#f8fafc", padding: "24px", borderRadius: "16px" }}>
      <h1 className="sdom-page-title" style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>{t("Reports & Analytics")}</h1>
      <p className="sdom-page-subtitle" style={{ fontSize: "14px", color: "#64748b", margin: "0 0 24px" }}>{t("Division-level reporting hub. Use filters below to generate specific staff reports.")}</p>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "16px", marginBottom: "24px" }}>
        {divSummary.map(c => (
          <div key={c.label} className="sdom-stat-card" style={{ background: "white", border: "1px solid #e2e8f0", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div className="sdom-stat-value" style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>{c.val}</div>
            <div className="sdom-stat-label" style={{ fontSize: "12px", color: "#64748b", marginTop: "4px", fontWeight: "600", textTransform: "uppercase" }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="sdom-filter-bar" style={{ display: "flex", gap: "16px", background: "white", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "24px", flexWrap: "wrap", alignItems: "flex-end" }}>
        <div className="sdom-filter-field" style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 2, minWidth: "200px" }}>
          <label style={{ fontSize: "11px", fontWeight: "800", color: "#475569", textTransform: "uppercase" }}>{t("Search by Name/HRMS ID")}</label>
          <div style={{ position: "relative" }}>
            <Search size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }}/>
            <input 
              type="text" 
              placeholder={t("Type name or HRMS ID...")} 
              value={repF.search || ""} 
              onChange={e => setRepF(p => ({ ...p, search: e.target.value }))} 
              style={{ width: "100%", height: "42px", padding: "0 12px 0 36px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", fontWeight: "600", outline: "none" }}
            />
          </div>
        </div>
        <div className="sdom-filter-field" style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: "100px" }}>
          <label style={{ fontSize: "11px", fontWeight: "800", color: "#475569", textTransform: "uppercase" }}>{t("Category")}</label>
          <select value={repF.cat} onChange={e => setRepF(p => ({ ...p, cat: e.target.value }))} style={{ height: "42px", padding: "0 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", fontWeight: "600" }}>
            <option value="All">{t("All")}</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
            <option value="Untested">{t("Untested")}</option>
          </select>
        </div>
        <div className="sdom-filter-field" style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: "120px" }}>
          <label style={{ fontSize: "11px", fontWeight: "800", color: "#475569", textTransform: "uppercase" }}>{t("Risk Level")}</label>
          <select value={repF.risk} onChange={e => setRepF(p => ({ ...p, risk: e.target.value }))} style={{ height: "42px", padding: "0 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", fontWeight: "600" }}>
            <option value="All">{t("All")}</option>
            <option value="Low">{t("Low")}</option>
            <option value="Medium">{t("Medium")}</option>
            <option value="High">{t("High")}</option>
            <option value="Untested">{t("Untested")}</option>
          </select>
        </div>
        <div>
          <button className="sdom-btn-primary" style={{ height: "42px", display: "flex", alignItems: "center", gap: "8px", background: "#2563eb", color: "white", padding: "0 20px", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}>
            <Search size={16}/> {t("Search")}
          </button>
        </div>
      </div>

      <div className="sdom-chart-card" style={{ background: "white", border: "1px solid #e2e8f0", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ marginBottom: 14, fontWeight: 700, color: "#1e293b" }}>{repFiltered.length} {t("staff in report")}</div>
        <div className="sdom-table-wrap" style={{ overflowX: "auto" }}>
          <table className="sdom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1.5px solid #e2e8f0", background: "#f8fafc", textAlign: "left" }}>
                <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>{t("Name")}</th>
                <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>{t("Role")}</th>
                <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>{t("Station")}</th>
                <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>{t("TI Area")}</th>
                <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>{t("Score")}</th>
                <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>{t("Category")}</th>
                <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>{t("Risk")}</th>
                <th style={{ padding: "12px 16px", fontSize: "12px", color: "#475569", fontWeight: "700" }}>{t("Status")}</th>
              </tr>
            </thead>
            <tbody>
              {repFiltered.length === 0 && <tr><td colSpan={8} style={{ textAlign: "center", color: "#94a3b8", padding: 32 }}>{t("No staff match the selected filters")}</td></tr>}
              {repFiltered.map(s => {
                const sCat = s.cat || "Untested";
                const risk = sCat === "Untested" ? "Untested" : riskLevel(s);
                return (
                  <tr key={s.id} style={{ cursor: "pointer", borderBottom: "1px solid #f1f5f9" }} onClick={() => setSelectedReportUserId(s.hrmsId)}>
                    <td style={{ padding: "12px 16px", fontWeight: 700, color: "#2563eb" }}>{s.name}</td>
                    <td style={{ padding: "12px 16px", color: "#334155", fontWeight: "500" }}>{ROLE_MAP[s.role] || s.role}</td>
                    <td style={{ padding: "12px 16px", color: "#334155", fontWeight: "500" }}>{t(s.stationName)}</td>
                    <td style={{ padding: "12px 16px", color: "#334155", fontWeight: "500" }}>{s.ti || "—"}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 700, color: "#0f172a" }}>{sCat === "Untested" ? t("Not Given Test") : (s.lastScore > 0 ? `${s.lastScore}/100` : "—")}</td>
                    <td style={{ padding: "12px 16px" }}>{catBadge(sCat)}</td>
                    <td style={{ padding: "12px 16px" }}>{riskBadge(risk)}</td>
                    <td style={{ padding: "12px 16px" }}>{statusBadge(s.approvalStatus)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
