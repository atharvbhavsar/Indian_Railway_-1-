import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import { ROLE_MAP } from "../../utils/saConstants";

export function SAStaffModal({ modal, setModal, stations, staff, saveModal }) {
  const [isTiDropdownOpen, setIsTiDropdownOpen] = useState(false);
  if (!modal) return null;
  const isShift = modal.mode === "shift";

  const assignedStations = staff?.filter(s => {
    if (modal.role === "sm" || modal.role === "Station Master") {
      return s.role === "sm" || s.role === "Station Master";
    }
    if (modal.role === "ss" || modal.role === "Station Superintendent") {
      return s.role === "ss" || s.role === "Station Superintendent";
    }
    return false;
  }).map(s => s.station) || [];
  const isStationDisabled = (stName) => assignedStations.includes(stName) && (modal.mode === 'add' || modal.data.station !== stName);

  const assignedTiStations = staff?.filter(s => (s.role === 'ti' || s.role === 'Traffic Inspector') && (modal.mode === 'add' || s.id !== modal.data.id)).reduce((acc, s) => {
    if (s.jurisdiction) {
       acc.push(...s.jurisdiction.split(",").map(x => x.trim()).filter(Boolean));
    }
    return acc;
  }, []);

  const selectedTiStations = modal.data.linkedStations ? modal.data.linkedStations.split(",").map(s => s.trim()).filter(Boolean) : [];
  const toggleTiStation = (stName) => {
    let newArr = [...selectedTiStations];
    if (newArr.includes(stName)) newArr = newArr.filter(n => n !== stName);
    else newArr.push(stName);
    setModal(p => ({ ...p, data: { ...p.data, linkedStations: newArr.join(", "), jurisdiction: newArr.join(", ") } }));
  };

  return (
    <div className="sdom-modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
      <div className="sdom-modal" style={!isShift ? { width: "900px", maxWidth: "95vw" } : undefined}>
        
        {!isShift ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
              <div style={{
                background: "linear-gradient(135deg, #0d2c4d 0%, #1e40af 100%)",
                width: "56px", height: "56px", borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(13, 44, 77, 0.2)", color: "#ffffff"
              }}>
                <UserPlus size={28} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "800", color: "#0d2c4d", letterSpacing: "-0.5px" }}>
                  {modal.mode === "edit" ? "EDIT SYSTEM USER" : "ADD NEW SYSTEM USER"}
                </h2>
                <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#64748b", fontWeight: "500" }}>
                  Role-Based Operational Staff Provisioning & Management Console
                </p>
              </div>
            </div>

            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0d2c4d', margin: '0 0 10px', fontSize: '15px', fontWeight: '800' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0d2c4d', display: 'inline-block' }}></span>
                1. General & Contact Information
              </h4>
              <div style={{ height: '1px', background: '#d5dfeb', marginBottom: '16px' }}></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="sdom-modal-field">
                  <label>Full Name *</label>
                  <input value={modal.data.name || ""} onChange={e => setModal(p => ({ ...p, data: { ...p.data, name: e.target.value } }))} placeholder="Enter full name" />
                </div>
                <div className="sdom-modal-field">
                  <label>Mobile Number *</label>
                  <input value={modal.data.contact || ""} onChange={e => setModal(p => ({ ...p, data: { ...p.data, contact: e.target.value } }))} placeholder="Enter 10-digit mobile number" />
                </div>
                <div className="sdom-modal-field">
                  <label>HRMS ID / Employee ID *</label>
                  <input value={modal.data.id || ""} disabled={modal.mode === "edit"} onChange={e => setModal(p => ({ ...p, data: { ...p.data, id: e.target.value } }))} placeholder="Enter unique ID" />
                </div>
                <div className="sdom-modal-field">
                  <label>Email ID *</label>
                  <input type="email" value={modal.data.email || ""} onChange={e => setModal(p => ({ ...p, data: { ...p.data, email: e.target.value } }))} placeholder="Enter email address" />
                </div>
                {modal.mode === "add" && (
                  <div className="sdom-modal-field">
                    <label>Account Password *</label>
                    <input type="password" value={modal.data.password || ""} onChange={e => setModal(p => ({ ...p, data: { ...p.data, password: e.target.value } }))} placeholder="Enter initial password" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0d2c4d', margin: '0 0 10px', fontSize: '15px', fontWeight: '800' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0d2c4d', display: 'inline-block' }}></span>
                2. Designation & Station Placement Setup
              </h4>
              <div style={{ height: '1px', background: '#d5dfeb', marginBottom: '16px' }}></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="sdom-modal-field">
                  <label>Role / Designation *</label>
                  <select value={modal.role} onChange={e => setModal(p => ({ ...p, role: e.target.value }))}>
                    {Object.entries(ROLE_MAP).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div className="sdom-modal-field">
                  <label>Division *</label>
                  <select value={modal.data.division || "Nagpur"} onChange={e => setModal(p => ({ ...p, data: { ...p.data, division: e.target.value, smDivision: e.target.value } }))}>
                    {["Nagpur", "Pune", "Mumbai", "Solapur", "Bhusawal"].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="sdom-modal-field">
                  <label>Railway Zone *</label>
                  <select value={modal.data.zone || "Central Railway"} onChange={e => setModal(p => ({ ...p, data: { ...p.data, zone: e.target.value, smZone: e.target.value } }))}>
                    {["Central Railway", "Western Railway", "Northern Railway", "Southern Railway", "Eastern Railway"].map(z => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>
                {modal.role !== "ti" && (
                  <div className="sdom-modal-field">
                    <label>Station Name *</label>
                    <select value={modal.data.station || ""} onChange={e => setModal(p => ({ ...p, data: { ...p.data, station: e.target.value, smStation: e.target.value } }))}>
                      <option value="">Select Station</option>
                      {stations.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                )}
                <div className="sdom-modal-field">
                  <label>Category *</label>
                  <select value={modal.data.cat || "A"} onChange={e => setModal(p => ({ ...p, data: { ...p.data, cat: e.target.value } }))}>
                    <option>A</option><option>B</option><option>C</option><option>D</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Role-Specific Operational Setups */}
            {modal.role === "pointsmen" && (
              <div style={{ padding: 18, background: "#f0f7ff", border: "1px solid #c2e0ff", borderRadius: 10 }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: '800' }}>Pointsman Operational Setup</h4>
                <div style={{ height: '1px', backgroundColor: '#c2e0ff', marginBottom: '16px' }}></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div className="sdom-modal-field">
                    <label>Reporting Station Master *</label>
                    <select value={modal.data.reportingSm || ""} onChange={e => setModal(p => ({ ...p, data: { ...p.data, reportingSm: e.target.value } }))}>
                      <option value="">Select Station Master</option>
                      {staff?.filter(s => s.role === 'sm' || s.role === 'Station Master').map(sm => (
                        <option key={sm.id} value={sm.name}>{sm.name} ({sm.id})</option>
                      ))}
                    </select>
                  </div>
                  <div className="sdom-modal-field">
                    <label>Work Location Setup *</label>
                    <select value={modal.data.workLocation || ""} onChange={e => setModal(p => ({ ...p, data: { ...p.data, workLocation: e.target.value } }))}>
                      <option value="">Select Location</option>
                      <option value="Yard">Yard Area</option>
                      <option value="Cabin A">Cabin A</option>
                      <option value="Cabin B">Cabin B</option>
                      <option value="Platform Area">Platform Area</option>
                      <option value="Level Crossing Gate">Level Crossing Gate</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {(modal.role === "sm" || modal.role === "ss") && (
              <div style={{ padding: 18, background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 10 }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: '800' }}>{ROLE_MAP[modal.role]} Operational Setup</h4>
                <div style={{ height: '1px', backgroundColor: '#a7f3d0', marginBottom: '16px' }}></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div className="sdom-modal-field">
                    <label>Operational Station *</label>
                    <select value={modal.data.smStation || ""} onChange={e => setModal(p => ({ ...p, data: { ...p.data, smStation: e.target.value, station: e.target.value } }))}>
                      <option value="">Select Operational Station</option>
                      {stations.map(s => (
                        <option 
                          key={s.id} 
                          value={s.name} 
                          disabled={isStationDisabled(s.name)}
                          style={isStationDisabled(s.name) ? { color: '#94a3b8', fontStyle: 'italic', backgroundColor: '#f1f5f9' } : {}}
                        >
                          {s.name} {isStationDisabled(s.name) ? "(Assigned)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {modal.role === "ti" && (
              <div style={{ padding: 18, background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10 }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: '800' }}>Traffic Inspector Operational Setup</h4>
                <div style={{ height: '1px', backgroundColor: '#fde68a', marginBottom: '16px' }}></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div className="sdom-modal-field">
                    <label>Jurisdiction Division *</label>
                    <input value={modal.data.jurisdiction || ""} onChange={e => setModal(p => ({ ...p, data: { ...p.data, jurisdiction: e.target.value } }))} placeholder="Enter Jurisdiction" />
                  </div>
                  <div className="sdom-modal-field" style={{ position: "relative" }}>
                    <label>Linked Stations under supervision *</label>
                    <div 
                      onClick={() => setIsTiDropdownOpen(!isTiDropdownOpen)}
                      style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", background: "#ffffff", cursor: "pointer", fontSize: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {selectedTiStations.length > 0 ? `${selectedTiStations.length} Station(s) Selected` : "Select Stations"}
                      </span>
                      <span style={{ fontSize: "10px", transform: isTiDropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
                    </div>
                    {isTiDropdownOpen && (
                      <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 100, maxHeight: "200px", overflowY: "auto", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "8px", background: "#ffffff", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>
                        {stations.map(s => {
                          const isOccupied = assignedTiStations.includes(s.name);
                          return (
                          <label key={s.id} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px", cursor: isOccupied ? "not-allowed" : "pointer", fontSize: "13px", borderRadius: "4px", transition: "background 0.2s", opacity: isOccupied ? 0.5 : 1 }} onMouseEnter={e => !isOccupied && (e.currentTarget.style.background="#f1f5f9")} onMouseLeave={e => !isOccupied && (e.currentTarget.style.background="transparent")}>
                            <input 
                              type="checkbox" 
                              checked={selectedTiStations.includes(s.name)}
                              onChange={() => !isOccupied && toggleTiStation(s.name)}
                              disabled={isOccupied}
                              style={{ width: "14px", height: "14px", cursor: isOccupied ? "not-allowed" : "pointer" }}
                            />
                            {s.name} {isOccupied && <span style={{fontSize: "10px", color: "#dc2626"}}>(Assigned)</span>}
                          </label>
                        )})}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {modal.role === "tm" && (
              <div style={{ padding: 18, background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: 10 }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: '800' }}>Train Manager Operational Setup</h4>
                <div style={{ height: '1px', backgroundColor: '#e9d5ff', marginBottom: '16px' }}></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div className="sdom-modal-field">
                    <label>Crew Depot *</label>
                    <select value={modal.data.workLocation || "Nagpur Depot"} onChange={e => setModal(p => ({ ...p, data: { ...p.data, workLocation: e.target.value } }))}>
                      <option value="Nagpur Depot">Nagpur Depot</option>
                      <option value="Pune Depot">Pune Depot</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="sdom-modal-title" style={{ marginBottom: 20 }}>Shift Staff Role</div>
            <div className="sdom-modal-field">
              <label>Role (Shift to)</label>
              <select value={modal.role} onChange={e => setModal(p => ({ ...p, role: e.target.value }))}>
                {Object.entries(ROLE_MAP).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </>
        )}

        <div className="sdom-modal-actions" style={{ marginTop: 24 }}>
          <button className="sdom-btn-primary" style={{ flex: 1 }} onClick={saveModal}>
            {modal.mode === "edit" ? "🔒 UPDATE USER ACCOUNT" : "👤 ADD USER ACCOUNT"}
          </button>
          <button className="sdom-btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
