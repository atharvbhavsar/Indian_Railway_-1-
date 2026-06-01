import React, { useState } from "react";
import { Plus } from "lucide-react";

export function SAStationDirectory({ stations, addStation, openView }) {
  const [stF, setStF] = useState({ name: "" });
  const [showAddStation, setShowAddStation] = useState(false);
  const [newStName, setNewStName] = useState("");
  const [newStCode, setNewStCode] = useState("");
  const [newStTi, setNewStTi] = useState("TI NGP");

  const filtered = stations.filter(st =>
    !stF.name || st.name.toLowerCase().includes(stF.name.toLowerCase()) || st.code.toLowerCase().includes(stF.name.toLowerCase())
  );

  const handleAddStation = async () => {
    if (!newStName.trim() || !newStCode.trim()) {
      alert("Please enter both Station Name and Station Code.");
      return;
    }
    const newStation = {
      id: `ST_${Date.now()}`,
      name: newStName.trim(),
      code: newStCode.trim().toUpperCase(),
      ti: newStTi,
      smCount: 0,
      pmCount: 0,
      score: 80,
      safety: 100,
      highRisk: 0,
      pending: 0
    };
    await addStation(newStation);
    setShowAddStation(false);
  };

  return (
    <div className="sdom-fade">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
        <div>
          <h1 className="sdom-page-title">Stations</h1>
          <p className="sdom-page-subtitle">Full list of stations in Nagpur Division. Click a station to open its complete analytics dashboard.</p>
        </div>
        <button className="sdom-btn-primary" onClick={() => {
          setNewStName("");
          setNewStCode("");
          setNewStTi("TI NGP");
          setShowAddStation(true);
        }}>
          <Plus size={16}/> Add New Station
        </button>
      </div>

      <div className="sdom-filter-bar" style={{flexWrap:"nowrap"}}>
        <div className="sdom-filter-field" style={{flex:1}}>
          <label>Search Station</label>
          <input value={stF.name} onChange={e=>setStF({name:e.target.value})} placeholder="Station name or code..." />
        </div>
      </div>

      <div className="sdom-chart-card">
        <div className="sdom-table-wrap">
          <table className="sdom-table">
            <thead>
              <tr><th>Station Name</th><th>Code</th><th>Assigned TI</th><th>SMs</th><th>Pointsmen</th><th>Avg Score</th><th>Safety %</th><th>High Risk</th><th>Pending</th><th>Dashboard</th></tr>
            </thead>
            <tbody>
              {filtered.map(st => (
                <tr key={st.id}>
                  <td style={{fontWeight:700}}>{st.name}</td>
                  <td><span className="sdom-badge sdom-badge-blue">{st.code}</span></td>
                  <td>{st.ti}</td>
                  <td>{st.smCount}</td>
                  <td>{st.pmCount}</td>
                  <td style={{fontWeight:700,color: st.score>=85?"#16a34a":st.score>=75?"#d97706":"#dc2626"}}>{st.score}</td>
                  <td>{st.safety}%</td>
                  <td>{st.highRisk>3?<span style={{color:"#dc2626",fontWeight:700}}>{st.highRisk}</span>:st.highRisk}</td>
                  <td>{st.pending}</td>
                  <td>
                    <button className="sdom-btn-primary" style={{padding:"7px 14px",fontSize:"0.82rem"}} onClick={()=>openView("stationDetail",st)}>
                      Open Station Dashboard
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Station Modal */}
      {showAddStation && (
        <div className="sdom-modal-overlay" style={{ zIndex: 9999 }}>
          <div className="sdom-modal" style={{ width: "450px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#0B1F3A" }}>Add New Station</h3>
              <button type="button" onClick={() => setShowAddStation(false)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}>&times;</button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="sdom-filter-field">
                <label style={{ fontWeight: 600, fontSize: "0.8rem", color: "#334155" }}>Station Name</label>
                <input type="text" value={newStName} onChange={e => setNewStName(e.target.value)} placeholder="e.g. Wardha Junction" />
              </div>
              <div className="sdom-filter-field">
                <label style={{ fontWeight: 600, fontSize: "0.8rem", color: "#334155" }}>Station Code</label>
                <input type="text" value={newStCode} onChange={e => setNewStCode(e.target.value)} placeholder="e.g. WR" />
              </div>
              <div className="sdom-filter-field">
                <label style={{ fontWeight: 600, fontSize: "0.8rem", color: "#334155" }}>Assigned TI Area</label>
                <select value={newStTi} onChange={e => setNewStTi(e.target.value)}>
                  <option>TI NGP</option>
                  <option>TI PAR</option>
                  <option>TI AMLA</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
              <button className="sdom-btn-outline" onClick={() => setShowAddStation(false)}>Cancel</button>
              <button className="sdom-btn-primary" onClick={handleAddStation}>Create Station</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
