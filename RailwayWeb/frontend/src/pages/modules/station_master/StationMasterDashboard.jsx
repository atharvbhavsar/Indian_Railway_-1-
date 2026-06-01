import React from 'react';
import { 
  Users, AlertTriangle, CheckCircle, Clock, Search, Filter, Calendar, X, Download, ArrowLeft, ArrowRight,
  TrendingUp, Activity, FileText, Lock, Plus, RefreshCw, Paperclip, Trash2, ShieldCheck, Gauge, Award, Target
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar, LabelList } from 'recharts';
import { getCat, getCatColor, getCatBg, riskLevel, riskColor } from '../../../utils/scoreCalculator';
import { CustomTooltip } from '../../../components/charts/CustomTooltip';

export function StationMasterDashboard(props) {
  const {
    stats, pieData, lowPerformers,
    fullscreenChart, setFullscreenChart,
    fsSearch, setFsSearch,
    fsCategory, setFsCategory,
    fsRisk, setFsRisk,
    fsStartDate, setFsStartDate,
    fsEndDate, setFsEndDate,
    filteredFsPointsmen, dynamicMonthlyTrend,
    pmAssessmentHistory, pointsmen,
    smId, drafts, viewingStaff, setViewingStaff, setActiveTab, openPmDetail
  } = props;

    // palettes
    const CAT_COLORS  = { A: "#1E3A5F", B: "#2B6CB0", C: "#D69E2E", D: "#C53030" };
    const RISK_COLORS = { Low: "#2F855A", Medium: "#D69E2E", High: "#C53030" };

    const tiSmListStr = localStorage.getItem("ti_sm_list");
    const smListState = tiSmListStr ? JSON.parse(tiSmListStr) : [];
    const myAssess = smListState.find(s => s.hrmsId === smId);
    const hasAssignedExam = myAssess && myAssess.status === "Exam Sent";

    // Station mock object dynamically tied to our pointsmen scores!
    const avgScore = pointsmen.length ? Math.round(pointsmen.reduce((s, p) => s + p.lastScore, 0) / pointsmen.length) : 0;
    const safetyVal = pointsmen.length ? Math.round(pointsmen.reduce((s, p) => s + p.safetyScore, 0) / pointsmen.length) : 0;

    const myStationObj = {
      name: "Nagpur Junction",
      code: "NGP",
      ti: "TI NGP",
      smCount: 4,
      pmCount: pointsmen.length,
      score: avgScore,
      safety: safetyVal,
      highRisk: pointsmen.filter(p => riskLevel(p) === "High").length,
      pending: drafts.length
    };

    // calculate category distribution dynamically from pointsmen!
    const catCount = ["A", "B", "C", "D"].map(c => ({
      cat: `Cat ${c}`,
      count: pointsmen.filter(p => getCat(p.lastScore) === c).length,
      fill: CAT_COLORS[c]
    }));

    // calculate risk distribution dynamically!
    const riskCount = [
      { name: "Low",    value: pointsmen.filter(p => riskLevel(p) === "Low").length,    fill: RISK_COLORS.Low },
      { name: "Medium", value: pointsmen.filter(p => riskLevel(p) === "Medium").length, fill: RISK_COLORS.Medium },
      { name: "High",   value: pointsmen.filter(p => riskLevel(p) === "High").length,   fill: RISK_COLORS.High },
    ].filter(r => r.value > 0);

    const trend = [
      { month: "Dec'25", score: 82, safety: 86 },
      { month: "Jan'26", score: 85, safety: 89 },
      { month: "Feb'26", score: 88, safety: 91 },
      { month: "Mar'26", score: 91, safety: 93 },
      { month: "Apr'26", score: 90, safety: 94 },
      { month: "May'26", score: avgScore, safety: safetyVal } // current month tied dynamically!
    ];

    const smList = [
      { id: "SM_1001", name: "S. Deshmukh",  hrmsId: "SM_1001", cat: "A", score: 88, lastDate: "2026-04-01", status: "Approved", role: "sm", station: "Nagpur Junction" },
      { id: "SM_2301", name: "D. Nair",      hrmsId: "SM_2301", cat: "A", score: 94, lastDate: "2026-04-15", status: "Approved", role: "sm", station: "Nagpur Junction" },
      { id: "SM_2302", name: "K. Solanki",   hrmsId: "SM_2302", cat: "A", score: 90, lastDate: "2026-04-12", status: "Approved", role: "sm", station: "Nagpur Junction" },
      { id: "SM_2303", name: "L. Raut",      hrmsId: "SM_2303", cat: "B", score: 78, lastDate: "2026-03-22", status: "Pending",  role: "sm", station: "Nagpur Junction" }
    ];

    const tiPerson = { name: "R. Khan", id: "TI_1001", contact: "+91 99999 33333", email: "r.khan@rail.in", role: "ti", station: "Nagpur Junction" };

    return (
      <div className="sdom-fade">

        {/* Station Hero */}
        <div className="sdom-station-header" style={{ marginBottom: "24px" }}>
          <div className="sdom-station-header-meta">
            <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Station Analytics Dashboard</div>
            <div style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: 4 }}>{myStationObj.name}</div>
            <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Code: <b>{myStationObj.code}</b> &bull; Assigned TI: <b>{myStationObj.ti}</b></div>
            <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
              <span className="sdom-badge" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>{myStationObj.smCount} Station Masters</span>
              <span className="sdom-badge" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>{myStationObj.pmCount} Pointsmen</span>
              <span className={`sdom-badge ${myStationObj.highRisk > 4 ? "sdom-badge-red" : "sdom-badge-green"}`}>{myStationObj.highRisk} High-Risk</span>
            </div>
          </div>
          <div className="sdom-station-header-stats">
            <div className="sdom-station-header-stat">
              <span className="val">{myStationObj.score}</span>
              <span className="lbl">Avg Score</span>
            </div>
            <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
            <div className="sdom-station-header-stat">
              <span className="val">{myStationObj.safety}%</span>
              <span className="lbl">Safety</span>
            </div>
            <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
            <div className="sdom-station-header-stat">
              <span className="val">{myStationObj.pending}</span>
              <span className="lbl">Pending</span>
            </div>
            <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}/>
            <div className="sdom-station-header-stat">
              <span className="val">{smList.length + pointsmen.length}</span>
              <span className="lbl">Total Staff</span>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Total Station Staff",   val: smList.length + pointsmen.length },
            { label: "Pending Assessments",   val: myStationObj.pending },
            { label: "Completed Evaluations", val: pointsmen.length - myStationObj.pending },
            { label: "High-Risk Pointsmen",   val: myStationObj.highRisk },
            { label: "Safety Compliance",     val: `${myStationObj.safety}%` },
          ].map(c => (
            <div key={c.label} className="sdom-stat-card">
              <div className="sdom-stat-value">{c.val}</div>
              <div className="sdom-stat-label">{c.label}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="sdom-row-2" style={{ marginBottom: "24px" }}>
          <div className="sdom-chart-card">
            <div className="sdom-chart-title">Category Distribution</div>
            <div className="sdom-chart-subtitle">A/B/C/D breakdown of pointsmen at Nagpur Junction</div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={catCount} barSize={46} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D9E2EC"/>
                  <XAxis dataKey="cat" fontSize={12} tick={{ fill: "#102A43", fontWeight: 600 }} axisLine={false} tickLine={false}/>
                  <YAxis fontSize={11} tick={{ fill: "#627D98" }} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{ fontSize: "0.85rem", borderRadius: 6, border: "1px solid #D9E2EC" }} cursor={{ fill: "rgba(0,0,0,0.03)" }}/>
                  <Bar dataKey="count" radius={[5, 5, 0, 0]}>
                    {catCount.map((d, i) => <Cell key={i} fill={CAT_COLORS[Object.keys(CAT_COLORS)[i]]}/>)}
                    <LabelList dataKey="count" position="top" style={{ fontSize: 12, fontWeight: 700, fill: "#102A43" }}/>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="sdom-chart-card">
            <div className="sdom-chart-title">Risk Distribution</div>
            <div className="sdom-chart-subtitle">Pointsmen risk level breakdown at Nagpur Junction</div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={riskCount} cx="50%" cy="50%" innerRadius={70} outerRadius={105}
                       dataKey="value" paddingAngle={4}
                       label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                       labelLine={false}>
                    {riskCount.map((d, i) => <Cell key={i} fill={RISK_COLORS[d.name]}/>)}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: "0.82rem" }}/>
                  <Tooltip contentStyle={{ fontSize: "0.85rem", borderRadius: 6, border: "1px solid #D9E2EC" }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="sdom-row-1" style={{ marginBottom: "24px" }}>
          <div className="sdom-chart-card">
            <div className="sdom-chart-title">Score & Safety Trend (Last 6 Months)</div>
            <div className="sdom-chart-subtitle">Monthly performance tracking for Nagpur Junction</div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D9E2EC"/>
                  <XAxis dataKey="month" fontSize={12} tick={{ fill: "#627D98" }} axisLine={false} tickLine={false}/>
                  <YAxis domain={[50, 100]} fontSize={11} tick={{ fill: "#627D98" }} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{ fontSize: "0.85rem", borderRadius: 6, border: "1px solid #D9E2EC" }}/>
                  <Legend wrapperStyle={{ fontSize: "0.82rem" }}/>
                  <Line type="monotone" dataKey="score" name="Avg Score" stroke="#1E3A5F" strokeWidth={2.5} dot={{ r: 4, fill: "#1E3A5F" }}/>
                  <Line type="monotone" dataKey="safety" name="Safety %" stroke="#2F855A" strokeWidth={2.5} strokeDasharray="5 3" dot={{ r: 4, fill: "#2F855A" }}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Station Masters */}
        <div className="sdom-row-1" style={{ marginBottom: "24px" }}>
          <div className="sdom-chart-card">
            <div className="sdom-chart-title" style={{ marginBottom: 16 }}>Station Masters</div>
            <div className="sdom-table-wrap">
              <table className="sdom-table">
                <thead>
                  <tr><th>Name</th><th>HRMS ID</th><th>Category</th><th>Last Score</th><th>Last Assessment</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {smList.map(s => (
                    <tr key={s.id}>
                      <td style={{ fontWeight: 700 }}>{s.name}</td>
                      <td style={{ color: "#64748b", fontSize: "0.85rem" }}>{s.hrmsId}</td>
                      <td>
                        <span className="sdom-badge sdom-badge-success">{s.cat}</span>
                      </td>
                      <td style={{ fontWeight: 700 }}>{s.score}</td>
                      <td>{s.lastDate}</td>
                      <td>
                        <span className="sdom-badge sdom-badge-success">{s.status}</span>
                      </td>
                      <td>
                        <button className="sdom-btn-ghost" onClick={() => setViewingStaff({ ...s, reportingAom: "P. K. Verma (Sr. DOM)" })}>View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pointsmen */}
        <div className="sdom-row-1" style={{ marginBottom: "24px" }}>
          <div className="sdom-chart-card">
            <div className="sdom-chart-title" style={{ marginBottom: 16 }}>Pointsmen</div>
            <div className="sdom-table-wrap">
              <table className="sdom-table">
                <thead>
                  <tr><th>Name</th><th>HRMS ID</th><th>Category</th><th>Risk Level</th><th>Latest Score</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {pointsmen.map(p => {
                    const cat = getCat(p.lastScore);
                    const risk = riskLevel(p);
                    return (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 700 }}>{p.name}</td>
                        <td style={{ color: "#64748b", fontSize: "0.85rem" }}>{p.hrmsId}</td>
                        <td>
                          <span className={`sdom-badge ${cat === "A" ? "sdom-badge-success" : cat === "B" ? "sdom-badge-info" : cat === "C" ? "sdom-badge-warning" : "sdom-badge-danger"}`}>{cat}</span>
                        </td>
                        <td>
                          <span className={`sdom-badge ${risk === "Low" ? "sdom-badge-success" : risk === "Medium" ? "sdom-badge-warning" : "sdom-badge-danger"}`}>{risk}</span>
                        </td>
                        <td style={{ fontWeight: 700 }}>{p.lastScore}/100</td>
                        <td>
                          <span className={`sdom-badge ${p.approvalStatus === "Approved" ? "sdom-badge-success" : p.approvalStatus === "Pending" ? "sdom-badge-warning" : "sdom-badge-danger"}`}>{p.approvalStatus}</span>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button className="sdom-btn-ghost" onClick={() => setViewingStaff({ ...p, reportingAom: "S. Deshmukh (SM)", email: `${p.hrmsId.toLowerCase()}@rail.in`, role: "pointsmen" })}>Profile</button>
                            <button className="sdom-btn-ghost" style={{ color: "#2563eb" }} onClick={() => { openPmDetail(p); setActiveTab("pointsmen"); }}>Monitor</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* TI Card */}
        <div className="sdom-row-1" style={{ marginBottom: "24px" }}>
          <div className="sdom-chart-card">
            <div className="sdom-chart-title" style={{ marginBottom: 16 }}>Assigned Traffic Inspector</div>
            <div className="sdom-ti-card">
              <div>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#1e3a5f", marginBottom: 4 }}>{tiPerson.name}</div>
                <div style={{ color: "#4b6a9b", fontSize: "0.9rem", marginBottom: 8 }}>Traffic Inspector &bull; {myStationObj.ti}</div>
                <div style={{ display: "flex", gap: 16 }}>
                  <span style={{ fontSize: "0.85rem", color: "#64748b" }}><b>ID:</b> {tiPerson.id}</span>
                  <span style={{ fontSize: "0.85rem", color: "#64748b" }}><b>Contact:</b> {tiPerson.contact}</span>
                </div>
              </div>
              <button className="sdom-btn-outline" onClick={() => setViewingStaff(tiPerson)}>View Profile</button>
            </div>
          </div>
        </div>

        {/* Detailed Staff Profile Modal */}
        {viewingStaff && (
          <div className="sdom-modal-overlay" style={{ zIndex: 9999 }} onClick={() => setViewingStaff(null)}>
            <div className="sdom-modal" style={{ width: "650px", maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
                <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800, color: "#0B1F3A" }}>Detailed Staff Card</h3>
                <button type="button" onClick={() => setViewingStaff(null)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}>&times;</button>
              </div>

              <div className="sdom-station-header" style={{ marginBottom: "20px", padding: "16px" }}>
                <div className="sdom-station-header-meta">
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>Staff Profile</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 2 }}>{viewingStaff.name}</div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>{viewingStaff.role === "sm" ? "Station Master" : viewingStaff.role === "ti" ? "Traffic Inspector" : "Pointsman"} &bull; {viewingStaff.hrmsId || viewingStaff.id}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "16px" }}>
                {[
                  ["Employee ID / HRMS ID", viewingStaff.hrmsId || viewingStaff.id],
                  ["Designation", viewingStaff.role === "sm" ? "Station Master" : viewingStaff.role === "ti" ? "Traffic Inspector" : "Pointsman"],
                  ["Contact Number", viewingStaff.contact || "+91 98220 44556"],
                  ["Email ID", viewingStaff.email || `${(viewingStaff.hrmsId || viewingStaff.id).toLowerCase()}@rail.in`],
                  ["Current Station Placement", viewingStaff.station || "Nagpur Junction"],
                  ["Reporting Officer", viewingStaff.reportingAom || "P. K. Verma (Sr. DOM)"],
                  ["Operational Zone", "Central Railway"],
                  ["Operational Division", "Nagpur"]
                ].map(([lbl, val]) => (
                  <div key={lbl} style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 14px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.04em" }}>{lbl}</div>
                    <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.85rem" }}>{val}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                <button className="sdom-btn-primary" onClick={() => setViewingStaff(null)}>Close Profile</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
