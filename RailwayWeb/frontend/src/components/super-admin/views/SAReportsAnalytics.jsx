import React, { useState, useMemo } from "react";
import { FileBarChart2, FileText } from "lucide-react";
import { ROLE_OPTS, TI_OPTS, ROLE_MAP } from "../../../utils/saConstants";
import { catBadge, riskBadge, statusBadge } from "../../../utils/saUtils";

export function SAReportsAnalytics({ staff, STATION_OPTS }) {
  const [repF, setRepF] = useState({ role:"All", station:"All", cat:"All", risk:"All", ti:"All" });
  const [repApplied, setRepApplied] = useState(false);
  const [selectedReportUserId, setSelectedReportUserId] = useState(null);

  const repFiltered = useMemo(() => {
    if (!repApplied) return null;
    return staff.filter(s => {
      const roleLabel = ROLE_MAP[s.role] || s.role;
      return (repF.role    === "All" || roleLabel === repF.role)      &&
             (repF.station === "All" || s.station === repF.station)   &&
             (repF.cat     === "All" || s.cat     === repF.cat)       &&
             (repF.risk    === "All" || s.risk    === repF.risk)      &&
             (repF.ti      === "All" || s.ti      === repF.ti);
    });
  }, [repApplied, repF, staff]);

  if (selectedReportUserId) {
    const u = staff.find(x => x.id === selectedReportUserId);
    if (!u) return null;

    const getCat = s => s >= 80 ? "A" : s >= 50 ? "B" : s >= 26 ? "C" : "D";
    const cat = u.cat || getCat(u.score);
    
    const CAT_C  = { A: "#16a34a", B: "#2563eb", C: "#d97706", D: "#dc2626" };
    const CAT_B  = { A: "#dcfce7", B: "#dbeafe", C: "#fef3c7", D: "#fee2e2" };
    const RISK_C = { High: "#dc2626", Medium: "#d97706", Low: "#16a34a" };
    
    const isHighRisk = u.risk === "High" || u.score < 50;
    const risk = isHighRisk ? "High" : u.score >= 80 ? "Low" : "Medium";
    const pmeVal = u.risk === "High" ? "PENDING" : "FIT";
    const refVal = u.risk === "High" ? "EXPIRED" : "CLEARED";

    return (
      <div className="ti2-card animate-fade-in" style={{ padding: "24px" }}>
        {/* Header section with back button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1.5px solid #e2edf8", paddingBottom: "16px", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div className="ti2-pm-avatar" style={{ width: 48, height: 48, fontSize: 18, background: "#2563eb", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontWeight: "700" }}>{u.name.charAt(0)}</div>
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a", margin: 0 }}>{u.name}</h2>
              <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#64748b", fontWeight: "700" }}>{ROLE_MAP[u.role] || u.role} Dossier · {u.station}</p>
            </div>
          </div>
          <button className="ti2-link-btn" onClick={() => setSelectedReportUserId(null)} style={{ fontSize: "13px", fontWeight: "800", color: "#2563eb", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
            ← Back to Reports
          </button>
        </div>

        {/* Quick Info Summary metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Grand Total Score</span>
            <strong style={{ display: "block", fontSize: "24px", color: CAT_C[cat], marginTop: "4px", fontWeight: "900" }}>{u.score}/100</strong>
          </div>
          <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Safety Grade</span>
            <div>
              <span className="ti2-badge" style={{ display: "inline-block", background: CAT_B[cat], color: CAT_C[cat], fontSize: "13px", fontWeight: "800", padding: "4px 14px", borderRadius: "8px", marginTop: "8px" }}>
                Category {cat}
              </span>
            </div>
          </div>
          <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>PME Clearance</span>
            <div>
              <span className="ti2-badge" style={{ display: "inline-block", background: pmeVal === "FIT" ? "#dcfce7" : "#fee2e2", color: pmeVal === "FIT" ? "#16a34a" : "#dc2626", fontSize: "13px", fontWeight: "800", padding: "4px 14px", borderRadius: "8px", marginTop: "8px" }}>
                {pmeVal}
              </span>
            </div>
          </div>
          <div style={{ background: "#f8fafc", border: "1px solid #e2edf8", padding: "14px", borderRadius: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>REF Training</span>
            <div>
              <span className="ti2-badge" style={{ display: "inline-block", background: refVal === "CLEARED" ? "#dcfce7" : "#fee2e2", color: refVal === "CLEARED" ? "#16a34a" : "#dc2626", fontSize: "13px", fontWeight: "800", padding: "4px 14px", borderRadius: "8px", marginTop: "8px" }}>
                {refVal}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "24px" }}>
          {/* Left side details card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "14px", padding: "18px" }}>
              <h3 style={{ margin: "0 0 14px 0", fontSize: "13px", fontWeight: "800", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1.5px solid #e2edf8", paddingBottom: "8px" }}>Personnel Roster Details</h3>
              <dl style={{ display: "flex", flexDirection: "column", gap: "12px", margin: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Employee HRMS ID</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.id}</dd></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Designation</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{ROLE_MAP[u.role] || u.role}</dd></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Jurisdiction Station</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.station}</dd></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Contact Number</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.contact || "+91 98765 11001"}</dd></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Date of Appointment</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: "#1e293b" }}>{u.joiningDate || "2018-02-12"}</dd></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Alcoholic Status</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: u.alcoholicStatus === "Alcoholic" ? "#dc2626" : "#16a34a" }}>{u.alcoholicStatus || "Non-Alcoholic"}</dd></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><dt style={{ color: "#64748b", fontSize: "12px", fontWeight: "700" }}>Assigned Division Risk</dt><dd style={{ margin: 0, fontSize: "13px", fontWeight: "800", color: RISK_C[risk] }}>{risk} Risk</dd></div>
              </dl>
            </div>

            {/* Action button */}
            <button className="ti2-primary-btn" onClick={() => alert("Exporting Dossier PDF...")} style={{ width: "100%", height: "42px", justifyContent: "center", background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", borderRadius: "8px", fontWeight: "700", cursor: "pointer", border: "none", color: "#ffffff", display: "flex", alignItems: "center", gap: "6px" }}>
              <FileText size={16}/> Export Assessment Dossier (PDF)
            </button>
          </div>

          {/* Right side Performance Breakdown */}
          <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "14px", padding: "18px" }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "13px", fontWeight: "800", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1.5px solid #e2edf8", paddingBottom: "8px" }}>Sectional Competency Breakdown</h3>
            
            {u.role === "pointsmen" ? (
              /* Pointsman sections competency progress bars */
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {(() => {
                  const secs = [
                    { title: "Knowledge of Rules", score: Math.round(u.score * 0.23), max: 25 },
                    { title: "Alertness & Observation", score: Math.round(u.score * 0.22), max: 25 },
                    { title: "Safety Record", score: Math.round(u.score * 0.14), max: 15 },
                    { title: "Leadership & Management", score: Math.round(u.score * 0.13), max: 15 },
                    { title: "Discipline", score: Math.round(u.score * 0.09), max: 10 },
                    { title: "Appearance & Neatness", score: Math.round(u.score * 0.09), max: 10 },
                  ];
                  return secs.map(s => {
                    const pct = Math.round((s.score / s.max) * 100);
                    return (
                      <div key={s.title}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>
                          <span>{s.title}</span>
                          <strong>{s.score} / {s.max} ({pct}%)</strong>
                        </div>
                        <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: pct >= 80 ? "#16a34a" : pct >= 50 ? "#2563eb" : "#dc2626", borderRadius: "999px" }}/>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            ) : (
              /* Station Master sections competency progress bars */
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {(() => {
                  let totalYes = 12;
                  let knowledgeMarks = Math.max(0, u.score - 60);

                  const secs = [
                    { title: "Station Management", score: Math.round(totalYes * 5 * 0.25), max: 25 },
                    { title: "Safety & Compliance", score: Math.round(totalYes * 4 * 0.25), max: 20 },
                    { title: "Staff Supervision", score: Math.round(totalYes * 3 * 0.20), max: 15 },
                    { title: "Documentation & Reporting", score: Math.round(totalYes * 3 * 0.15), max: 15 },
                    { title: "Emergency Handling", score: Math.round(totalYes * 5 * 0.25), max: 25 },
                    { title: "Knowledge (Safety Exam)", score: knowledgeMarks, max: 25 }
                  ];

                  return secs.map(s => {
                    const pct = Math.round((s.score / s.max) * 100);
                    return (
                      <div key={s.title}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>
                          <span>{s.title}</span>
                          <strong>{s.score} / {s.max} ({pct}%)</strong>
                        </div>
                        <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: pct >= 80 ? "#16a34a" : pct >= 50 ? "#2563eb" : "#dc2626", borderRadius: "999px" }}/>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const avgScoreVal = staff.length > 0 ? Math.round(staff.reduce((acc, curr) => acc + (curr.score || 80), 0) / staff.length) : 0;
  const safetyComplianceVal = staff.length > 0 ? Math.round((staff.filter(s => s.risk === "Low").length / staff.length) * 100) : 100;
  const highRiskStaffVal = staff.filter(s => s.risk === "High").length;
  const pendingApprovalsVal = staff.filter(s => s.status === "Pending").length;
  const totalReportsVal = staff.length;

  const divSummary = [
    { label:"Average Division Score",  val:avgScoreVal    },
    { label:"Safety Compliance %",     val:`${safetyComplianceVal}%` },
    { label:"High-Risk Staff",         val:highRiskStaffVal    },
    { label:"Pending Approvals",       val:pendingApprovalsVal   },
    { label:"Total Reports Generated", val:totalReportsVal  },
  ];

  return (
    <div className="sdom-fade">
      <h1 className="sdom-page-title">Reports & Analytics</h1>
      <p className="sdom-page-subtitle">Division-level reporting hub. Use filters below to generate specific staff reports.</p>

      {/* Summary */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:16,marginBottom:24}}>
        {divSummary.map(c=>(
          <div key={c.label} className="sdom-stat-card">
            <div className="sdom-stat-value">{c.val}</div>
            <div className="sdom-stat-label">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="sdom-filter-bar">
        <div className="sdom-filter-field">
          <label>Role</label>
          <select value={repF.role} onChange={e=>{setRepF(p=>({...p,role:e.target.value}));setRepApplied(false);}}>
            {ROLE_OPTS.map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="sdom-filter-field">
          <label>TI Area</label>
          <select value={repF.ti} onChange={e=>{setRepF(p=>({...p,ti:e.target.value}));setRepApplied(false);}}>
            {TI_OPTS.map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="sdom-filter-field">
          <label>Station</label>
          <select value={repF.station} onChange={e=>{setRepF(p=>({...p,station:e.target.value}));setRepApplied(false);}}>
            {STATION_OPTS.map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="sdom-filter-field">
          <label>Category</label>
          <select value={repF.cat} onChange={e=>{setRepF(p=>({...p,cat:e.target.value}));setRepApplied(false);}}>
            <option>All</option><option>A</option><option>B</option><option>C</option><option>D</option>
          </select>
        </div>
        <div className="sdom-filter-field">
          <label>Risk Level</label>
          <select value={repF.risk} onChange={e=>{setRepF(p=>({...p,risk:e.target.value}));setRepApplied(false);}}>
            <option>All</option><option>Low</option><option>Medium</option><option>High</option>
          </select>
        </div>
        <div style={{display:"flex",alignItems:"flex-end"}}>
          <button className="sdom-btn-primary" onClick={()=>setRepApplied(true)}>
            <FileBarChart2 size={16}/> Generate Report
          </button>
        </div>
      </div>

      {repApplied && repFiltered && (
        <div className="sdom-chart-card">
          <div style={{marginBottom:14,fontWeight:700,color:"#1e293b"}}>{repFiltered.length} staff in report</div>
          <div className="sdom-table-wrap">
            <table className="sdom-table">
              <thead><tr><th>Name</th><th>Role</th><th>Station</th><th>TI Area</th><th>Score</th><th>Category</th><th>Risk</th><th>Status</th></tr></thead>
              <tbody>
                {repFiltered.length === 0 && <tr><td colSpan={8} style={{textAlign:"center",color:"#94a3b8",padding:32}}>No staff match the selected filters</td></tr>}
                {repFiltered.map(s=>(
                  <tr key={s.id} style={{ cursor: "pointer" }} onClick={() => setSelectedReportUserId(s.id)}>
                    <td style={{fontWeight:700, color: "#2563eb"}}>{s.name}</td>
                    <td>{ROLE_MAP[s.role]||s.role}</td>
                    <td>{s.station}</td>
                    <td>{s.ti}</td>
                    <td style={{fontWeight:700}}>{s.score}</td>
                    <td>{catBadge(s.cat)}</td>
                    <td>{riskBadge(s.risk)}</td>
                    <td>{statusBadge(s.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!repApplied && (
        <div className="sdom-empty">
          <FileBarChart2 size={32} style={{marginBottom:12}}/>
          <div className="sdom-empty-title">Select filters and click "Generate Report"</div>
          <div className="sdom-empty-sub">Apply one or more filters above to generate a custom staff performance report.</div>
        </div>
      )}
    </div>
  );
}
