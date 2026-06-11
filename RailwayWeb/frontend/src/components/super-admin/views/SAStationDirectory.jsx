import React, { useState } from "react";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";

export function SAStationDirectory({ stations, staff = [], addStation, updateStation, deleteStation, openView }) {
  const [stF, setStF] = useState({ name: "" });
  const [showAddStation, setShowAddStation] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  const [editingStationId, setEditingStationId] = useState(null);

  const [formData, setFormData] = useState({
    stationName: "",
    stationCode: "",
    zone: "Central Railway",
    division: "Nagpur",
    section: "",
    category: "A",
    status: "Active",
    assignedTi: "",
    platforms: "3",
    runningLines: "5",
    address: "",
    district: "Nagpur",
    state: "Maharashtra",
    stationType: "Junction"
  });

  const [formErrors, setFormErrors] = useState({});

  const trafficInspectors = staff.filter(
    (u) => u.role === "ti" || u.role === "Traffic Inspector"
  );

  const filtered = stations.filter(st =>
    !stF.name || 
    st.name.toLowerCase().includes(stF.name.toLowerCase()) || 
    st.code.toLowerCase().includes(stF.name.toLowerCase())
  );

  const validateForm = () => {
    const errors = {};
    const cleanCode = formData.stationCode.trim().toUpperCase();
    const cleanName = formData.stationName.trim();

    const nameExists = stations.some(
      (st) => st.name.toLowerCase() === cleanName.toLowerCase() && st.id !== editingStationId
    );
    const codeExists = stations.some(
      (st) => st.code.toUpperCase() === cleanCode && st.id !== editingStationId
    );

    if (!cleanName) {
      errors.stationName = "Station Name is required";
    } else if (nameExists) {
      errors.stationName = "Station Name must be unique";
    }

    if (!cleanCode) {
      errors.stationCode = "Station Code is required";
    } else if (codeExists) {
      errors.stationCode = "Station Code must be unique";
    }

    if (!formData.platforms) errors.platforms = "Platforms count is required";
    if (!formData.runningLines) errors.runningLines = "Running Lines count is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.district.trim()) errors.district = "District is required";
    if (!formData.state.trim()) errors.state = "State is required";

    return errors;
  };

  const handleOpenAddModal = () => {
    setModalMode("add");
    setEditingStationId(null);
    setFormData({
      stationName: "",
      stationCode: "",
      zone: "Central Railway",
      division: "Nagpur",
      section: "",
      category: "A",
      status: "Active",
      assignedTi: "",
      platforms: "3",
      runningLines: "5",
      address: "",
      district: "Nagpur",
      state: "Maharashtra",
      stationType: "Junction"
    });
    setFormErrors({});
    setShowAddStation(true);
  };

  const handleOpenEditModal = (station) => {
    setModalMode("edit");
    setEditingStationId(station.id);
    setFormData({
      stationName: station.name || station.stationName || "",
      stationCode: station.code || station.stationCode || "",
      zone: station.zone || "Central Railway",
      division: station.division || "Nagpur",
      section: station.section || "",
      category: station.category || "A",
      status: station.status || "Active",
      assignedTi: station.assignedTi || "",
      platforms: String(station.platforms || "3"),
      runningLines: String(station.runningLines || station.tracks || "5"),
      address: station.address || "",
      district: station.district || "Nagpur",
      state: station.state || "Maharashtra",
      stationType: station.stationType || "Junction"
    });
    setFormErrors({});
    setShowAddStation(true);
  };

  const handleSaveStation = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const payload = {
      id: editingStationId,
      stationName: formData.stationName.trim(),
      stationCode: formData.stationCode.trim().toUpperCase(),
      zone: formData.zone,
      division: formData.division,
      section: "",
      category: formData.category,
      status: formData.status,
      assignedTi: "",
      platforms: Number(formData.platforms),
      runningLines: Number(formData.runningLines),
      address: formData.address.trim(),
      district: formData.district.trim(),
      state: formData.state.trim(),
      stationType: formData.stationType
    };

    if (modalMode === "add") {
      await addStation(payload);
    } else {
      await updateStation(payload);
    }
    setShowAddStation(false);
  };

  const handleDeleteClick = async (station) => {
    if (!window.confirm(`Are you sure you want to permanently delete station ${station.name}?`)) {
      return;
    }

    // Check dependency: has operational staff assigned
    const assignedStaff = staff.filter((u) => u.station === station.name);
    if (assignedStaff.length > 0) {
      const staffNames = assignedStaff.map(u => `${u.name} (${u.id})`).join(", ");
      alert(`Cannot delete station. Operational staff are currently assigned to this station: ${staffNames}. Please reassign or delete these staff members first.`);
      return;
    }

    await deleteStation(station.id, station.name);
  };

  return (
    <>
      <div className="sdom-fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <h1 className="sdom-page-title">Stations</h1>
          <p className="sdom-page-subtitle">Full list of stations in Nagpur Division. Click a station to open its complete analytics dashboard.</p>
        </div>
        <button className="sdom-btn-primary" onClick={handleOpenAddModal}>
          <Plus size={16} /> Add New Station
        </button>
      </div>

      <div className="sdom-filter-bar" style={{ flexWrap: "nowrap" }}>
        <div className="sdom-filter-field" style={{ flex: 1 }}>
          <label>Search Station</label>
          <input value={stF.name} onChange={e => setStF({ name: e.target.value })} placeholder="Station name or code..." />
        </div>
      </div>

      <div className="sdom-chart-card">
        <div className="sdom-table-wrap">
          <table className="sdom-table">
            <thead>
              <tr>
                <th>Station Name</th>
                <th>Code</th>
                <th>Assigned TI</th>
                <th>SMs</th>
                <th>Pointsmen</th>
                <th>Avg Score</th>
                <th>Safety %</th>
                <th>High Risk</th>
                <th>Pending</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(st => (
                <tr key={st.id}>
                  <td style={{ fontWeight: 700 }}>{st.name}</td>
                  <td><span className="sdom-badge sdom-badge-blue">{st.code}</span></td>
                  <td>{st.ti}</td>
                  <td>{st.smCount}</td>
                  <td>{st.pmCount}</td>
                  <td style={{ fontWeight: 700, color: st.score >= 85 ? "#16a34a" : st.score >= 75 ? "#d97706" : "#dc2626" }}>{st.score}</td>
                  <td>{st.safety}%</td>
                  <td>{st.highRisk > 3 ? <span style={{ color: "#dc2626", fontWeight: 700 }}>{st.highRisk}</span> : st.highRisk}</td>
                  <td>{st.pending}</td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "6px" }}>
                      <button 
                        className="sdom-btn-primary" 
                        style={{ padding: "6px 10px", fontSize: "0.78rem", display: "inline-flex", alignItems: "center", gap: "4px" }} 
                        onClick={() => openView("stationDetail", st)}
                      >
                        <Eye size={12} /> Dashboard
                      </button>
                      <button 
                        className="sdom-btn-outline" 
                        style={{ padding: "6px 10px", fontSize: "0.78rem", display: "inline-flex", alignItems: "center", gap: "4px" }} 
                        onClick={() => handleOpenEditModal(st)}
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                      <button 
                        className="sdom-btn-outline" 
                        style={{ padding: "6px 10px", fontSize: "0.78rem", display: "inline-flex", alignItems: "center", gap: "4px", borderColor: "#dc2626", color: "#dc2626" }} 
                        onClick={() => handleDeleteClick(st)}
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      {/* Add / Edit Station Modal */}
      {showAddStation && (
        <div className="sdom-modal-overlay" style={{ zIndex: 99999 }}>
          <div className="sdom-modal" style={{ width: "650px", maxWidth: "95vw", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#0B1F3A" }}>
                {modalMode === "add" ? "Add New Station" : "Edit Station"}
              </h3>
              <button type="button" onClick={() => setShowAddStation(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#64748b" }}>&times;</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px", paddingRight: "5px" }}>
              {/* Station Info Section */}
              <h4 style={{ gridColumn: "span 2", margin: "4px 0 0 0", color: "#1e3a8a", fontSize: "0.95rem", fontWeight: 700, borderBottom: "1.5px solid #cbd5e1", paddingBottom: "4px" }}>Station Info</h4>
              
              <div className="sdom-filter-field">
                <label style={{ fontWeight: 600, fontSize: "0.8rem", color: "#334155" }}>Station Name *</label>
                <input type="text" value={formData.stationName} onChange={e => {
                  setFormData(p => ({ ...p, stationName: e.target.value }));
                  if (formErrors.stationName) setFormErrors(p => ({ ...p, stationName: "" }));
                }} placeholder="e.g. Wardha Junction" />
                {formErrors.stationName && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "2px" }}>{formErrors.stationName}</span>}
              </div>

              <div className="sdom-filter-field">
                <label style={{ fontWeight: 600, fontSize: "0.8rem", color: "#334155" }}>Station Code *</label>
                <input type="text" value={formData.stationCode} onChange={e => {
                  setFormData(p => ({ ...p, stationCode: e.target.value.toUpperCase() }));
                  if (formErrors.stationCode) setFormErrors(p => ({ ...p, stationCode: "" }));
                }} placeholder="e.g. WR" />
                {formErrors.stationCode && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "2px" }}>{formErrors.stationCode}</span>}
              </div>

              <div className="sdom-filter-field">
                <label style={{ fontWeight: 600, fontSize: "0.8rem", color: "#334155" }}>Status</label>
                <select value={formData.status} onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="sdom-filter-field">
                <label style={{ fontWeight: 600, fontSize: "0.8rem", color: "#334155" }}>Division</label>
                <input type="text" value={formData.division} readOnly style={{ backgroundColor: "#f1f5f9", cursor: "not-allowed" }} />
              </div>

              {/* Operations & Location Section */}
              <h4 style={{ gridColumn: "span 2", margin: "10px 0 0 0", color: "#1e3a8a", fontSize: "0.95rem", fontWeight: 700, borderBottom: "1.5px solid #cbd5e1", paddingBottom: "4px" }}>Operations &amp; Location</h4>

              <div className="sdom-filter-field">
                <label style={{ fontWeight: 600, fontSize: "0.8rem", color: "#334155" }}>Platforms *</label>
                <input type="number" min="0" value={formData.platforms} onChange={e => {
                  setFormData(p => ({ ...p, platforms: e.target.value }));
                  if (formErrors.platforms) setFormErrors(p => ({ ...p, platforms: "" }));
                }} placeholder="Enter number of platforms" />
                {formErrors.platforms && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "2px" }}>{formErrors.platforms}</span>}
              </div>

              <div className="sdom-filter-field">
                <label style={{ fontWeight: 600, fontSize: "0.8rem", color: "#334155" }}>Running Lines *</label>
                <input type="number" min="0" value={formData.runningLines} onChange={e => {
                  setFormData(p => ({ ...p, runningLines: e.target.value }));
                  if (formErrors.runningLines) setFormErrors(p => ({ ...p, runningLines: "" }));
                }} placeholder="Enter number of running lines" />
                {formErrors.runningLines && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "2px" }}>{formErrors.runningLines}</span>}
              </div>

              <div className="sdom-filter-field">
                <label style={{ fontWeight: 600, fontSize: "0.8rem", color: "#334155" }}>District *</label>
                <input type="text" value={formData.district} onChange={e => {
                  setFormData(p => ({ ...p, district: e.target.value }));
                  if (formErrors.district) setFormErrors(p => ({ ...p, district: "" }));
                }} placeholder="Enter district" />
                {formErrors.district && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "2px" }}>{formErrors.district}</span>}
              </div>

              <div className="sdom-filter-field">
                <label style={{ fontWeight: 600, fontSize: "0.8rem", color: "#334155" }}>State *</label>
                <input type="text" value={formData.state} onChange={e => {
                  setFormData(p => ({ ...p, state: e.target.value }));
                  if (formErrors.state) setFormErrors(p => ({ ...p, state: "" }));
                }} placeholder="Enter state" />
                {formErrors.state && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "2px" }}>{formErrors.state}</span>}
              </div>

              <div className="sdom-filter-field" style={{ gridColumn: "span 2" }}>
                <label style={{ fontWeight: 600, fontSize: "0.8rem", color: "#334155" }}>Address *</label>
                <textarea value={formData.address} onChange={e => {
                  setFormData(p => ({ ...p, address: e.target.value }));
                  if (formErrors.address) setFormErrors(p => ({ ...p, address: "" }));
                }} placeholder="Enter address" style={{ height: "60px", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", resize: "none", width: "100%", boxSizing: "border-box" }} />
                {formErrors.address && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "2px" }}>{formErrors.address}</span>}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
              <button className="sdom-btn-outline" onClick={() => setShowAddStation(false)}>Cancel</button>
              <button className="sdom-btn-primary" onClick={handleSaveStation}>
                {modalMode === "add" ? "Create Station" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
