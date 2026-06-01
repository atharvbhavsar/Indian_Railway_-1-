import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { ROLE_OPTS, ROLE_MAP } from "../../../utils/saConstants";
import { catBadge, statusBadge } from "../../../utils/saUtils";

export function SAAssessmentRecords({ staff, STATION_OPTS }) {
  const [recF, setRecF] = useState({ role:"All", station:"All", status:"All", name:"" });

  const recFiltered = useMemo(() => {
    const hasFilter = recF.role !== "All" || recF.station !== "All" || recF.status !== "All" || recF.name;
    if (!hasFilter) return null;
    return staff.filter(s => {
      const roleLabel = ROLE_MAP[s.role] || s.role;
      return (recF.role    === "All" || roleLabel === recF.role)      &&
             (recF.station === "All" || s.station === recF.station)   &&
             (recF.status  === "All" || s.status  === recF.status)    &&
             (!recF.name   || s.name.toLowerCase().includes(recF.name.toLowerCase()));
    });
  }, [recF, staff]);

  const hasFilter = recF.role!=="All"||recF.station!=="All"||recF.status!=="All"||recF.name;
  const totalByRole = Object.entries(ROLE_MAP).map(([k,v])=>({ label:v, count: staff.filter(s=>s.role===k).length }));

  return (
    <div className="sdom-fade">
      <h1 className="sdom-page-title">Assessment Records</h1>
      <p className="sdom-page-subtitle">Division-wide assessment data. Apply filters to search specific records.</p>

      {/* Overview cards */}
      <div className="sdom-overview-cards">
        {[
          { label:"Total Assessments", val: staff.length, color:"#2563eb" },
          { label:"Pending",           val: staff.filter(s => s.status === "Pending").length,  color:"#d97706" },
          { label:"Approved",          val: staff.filter(s => s.status === "Approved").length, color:"#16a34a" },
          { label:"Rejected",          val: staff.filter(s => s.status === "Rejected").length,   color:"#dc2626" },
          { label:"Overdue",           val: staff.filter(s => s.status === "Overdue" || s.risk === "High").length,   color:"#7c3aed" },
        ].map(c=>(
          <div key={c.label} className="sdom-overview-card">
            <div className="sdom-overview-card-val" style={{color:c.color}}>{c.val.toLocaleString()}</div>
            <div className="sdom-overview-card-lbl">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Role-wise summary */}
      <div className="sdom-chart-card" style={{marginBottom:24}}>
        <div className="sdom-chart-title" style={{marginBottom:16}}>Role-wise Assessment Summary</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:16}}>
          {totalByRole.map(r=>(
            <div key={r.label} style={{background:"#f8fafc",borderRadius:10,padding:"16px 20px",border:"1px solid #e2e8f0",textAlign:"center"}}>
              <div style={{fontSize:"1.5rem",fontWeight:800,color:"#0f172a"}}>{r.count}</div>
              <div style={{fontSize:"0.78rem",fontWeight:600,color:"#64748b",marginTop:4}}>{r.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="sdom-filter-bar">
        <div className="sdom-filter-field" style={{minWidth:200}}>
          <label>Name</label>
          <input value={recF.name} onChange={e=>setRecF(p=>({...p,name:e.target.value}))} placeholder="Search staff name..." />
        </div>
        <div className="sdom-filter-field">
          <label>Role</label>
          <select value={recF.role} onChange={e=>setRecF(p=>({...p,role:e.target.value}))}>
            {ROLE_OPTS.map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="sdom-filter-field">
          <label>Station</label>
          <select value={recF.station} onChange={e=>setRecF(p=>({...p,station:e.target.value}))}>
            {STATION_OPTS.map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="sdom-filter-field">
          <label>Status</label>
          <select value={recF.status} onChange={e=>setRecF(p=>({...p,status:e.target.value}))}>
            <option>All</option><option>Approved</option><option>Pending</option><option>Rejected</option>
          </select>
        </div>
      </div>

      {hasFilter && (
        <div className="sdom-chart-card">
          <div style={{marginBottom:12,fontWeight:700,color:"#1e293b"}}>{(recFiltered||[]).length} records found</div>
          <div className="sdom-table-wrap">
            <table className="sdom-table">
              <thead><tr><th>Name</th><th>Role</th><th>Station</th><th>TI Area</th><th>Score</th><th>Category</th><th>Status</th><th>Last Date</th></tr></thead>
              <tbody>
                {(recFiltered||[]).length === 0 && <tr><td colSpan={8} style={{textAlign:"center",color:"#94a3b8",padding:32}}>No records match the filters</td></tr>}
                {(recFiltered||[]).map(s=>(
                  <tr key={s.id}>
                    <td style={{fontWeight:700}}>{s.name}<br/><span style={{fontSize:"0.78rem",color:"#94a3b8"}}>{s.id}</span></td>
                    <td>{ROLE_MAP[s.role]||s.role}</td>
                    <td>{s.station}</td>
                    <td>{s.ti}</td>
                    <td style={{fontWeight:700}}>{s.score}</td>
                    <td>{catBadge(s.cat)}</td>
                    <td>{statusBadge(s.status)}</td>
                    <td>{s.lastDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!hasFilter && (
        <div className="sdom-empty">
          <Search size={32} style={{marginBottom:12}}/>
          <div className="sdom-empty-title">Apply filters to search records</div>
          <div className="sdom-empty-sub">Select a role, station, or enter a staff name above to view assessment records.</div>
        </div>
      )}
    </div>
  );
}
