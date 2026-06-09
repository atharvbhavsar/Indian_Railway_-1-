import React from 'react';
import { UserPlus } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export function StationMasterPointsmanModal(props) {
  const { t } = useLanguage();
  const {
    pmModal,
    setPmModal,
    smProfile,
    savePmModal
  } = props;

  if (!pmModal) return null;
  const isShift = pmModal.mode === "shift";
  return (
    <div className="sdom-modal-overlay" style={{ zIndex: 99999 }} onClick={e=>e.target===e.currentTarget&&setPmModal(null)}>
      <div className="sdom-modal" style={!isShift ? { width: "900px", maxWidth: "95vw" } : undefined}>
        
        {!isShift ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Header inside modal */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
              <div style={{
                background: "linear-gradient(135deg, #0d2c4d 0%, #1e40af 100%)",
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(13, 44, 77, 0.2)",
                color: "#ffffff"
              }}>
                <UserPlus size={28} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "800", color: "#0d2c4d", letterSpacing: "-0.5px" }}>
                  {pmModal.mode === "edit" ? t("EDIT OPERATIONAL POINTSMAN") : t("ADD NEW OPERATIONAL POINTSMAN")}
                </h2>
                <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#64748b", fontWeight: "500" }}>
                  {t("Role-Based Operational Staff Provisioning & Management Console")}
                </p>
              </div>
            </div>

            {/* Section 1: General & Contact Information */}
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0d2c4d', margin: '0 0 10px', fontSize: '15px', fontWeight: '800' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0d2c4d', display: 'inline-block' }}></span>
                {t("1. General & Contact Information")}
              </h4>
              <div style={{ height: '1px', background: '#d5dfeb', marginBottom: '16px' }}></div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="sdom-modal-field">
                  <label>{t("Full Name *")}</label>
                  <input 
                    value={pmModal.data.name || ""} 
                    onChange={e => setPmModal(p => ({ ...p, data: { ...p.data, name: e.target.value } }))} 
                    placeholder={t("Enter full name (e.g. A. K. Sharma)")} 
                  />
                </div>
                <div className="sdom-modal-field">
                  <label>{t("Mobile Number *")}</label>
                  <input 
                    value={pmModal.data.contact || ""} 
                    onChange={e => setPmModal(p => ({ ...p, data: { ...p.data, contact: e.target.value } }))} 
                    placeholder={t("Enter 10-digit mobile number")} 
                  />
                </div>
                <div className="sdom-modal-field">
                  <label>{t("HRMS ID / Employee ID *")}</label>
                  <input 
                    value={pmModal.data.hrmsId || ""} 
                    disabled={pmModal.mode === "edit"}
                    onChange={e => setPmModal(p => ({ ...p, data: { ...p.data, hrmsId: e.target.value, id: e.target.value } }))} 
                    placeholder={t("Enter unique ID (e.g. PM_8820)")} 
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Designation & Station Placement Setup */}
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0d2c4d', margin: '0 0 10px', fontSize: '15px', fontWeight: '800' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0d2c4d', display: 'inline-block' }}></span>
                {t("2. Designation & Station Placement Setup")}
              </h4>
              <div style={{ height: '1px', background: '#d5dfeb', marginBottom: '16px' }}></div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="sdom-modal-field">
                  <label>{t("Role / Designation *")}</label>
                  <select value="Pointsman" disabled>
                    <option value="Pointsman">{t("Pointsman")}</option>
                  </select>
                </div>
                <div className="sdom-modal-field">
                  <label>{t("Station Name *")}</label>
                  <select value={pmModal.data.station || ""} disabled>
                    <option value={smProfile.station}>{t(smProfile.station)}</option>
                  </select>
                </div>
                <div className="sdom-modal-field">
                  <label>{t("Category *")}</label>
                  <select 
                    value={pmModal.data.cat || "A"} 
                    onChange={e => setPmModal(p => ({ ...p, data: { ...p.data, cat: e.target.value } }))}
                  >
                    <option>A</option><option>B</option><option>C</option><option>D</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Pointsman Operational Setup */}
            <div style={{ padding: 18, background: "#f0f7ff", border: "1px solid #c2e0ff", borderRadius: 10 }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0d2c4d', margin: '0 0 10px', fontSize: '14px', fontWeight: '800' }}>
                {t("Pointsman Operational Setup")}
              </h4>
              <div style={{ height: '1px', backgroundColor: '#c2e0ff', marginBottom: '16px' }}></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="sdom-modal-field">
                  <label>{t("Reporting Station Master *")}</label>
                  <input 
                    value={pmModal.data.reportingSm || ""} 
                    onChange={e => setPmModal(p => ({ ...p, data: { ...p.data, reportingSm: e.target.value } }))} 
                    placeholder={t("Station Master Name")}
                  />
                </div>
                <div className="sdom-modal-field">
                  <label>{t("Work Location Setup *")}</label>
                  <select 
                    value={pmModal.data.workLocation || ""} 
                    onChange={e => setPmModal(p => ({ ...p, data: { ...p.data, workLocation: e.target.value } }))}
                  >
                    <option value="">{t("Select Location")}</option>
                    <option value="Yard">{t("Yard Area")}</option>
                    <option value="Cabin A">{t("Cabin A")}</option>
                    <option value="Cabin B">{t("Cabin B")}</option>
                    <option value="Platform Area">{t("Platform Area")}</option>
                    <option value="Level Crossing Gate">{t("Level Crossing Gate")}</option>
                  </select>
                </div>
                <div className="sdom-modal-field">
                  <label>{t("Assigned Shift *")}</label>
                  <select 
                    value={pmModal.data.shift || ""} 
                    onChange={e => setPmModal(p => ({ ...p, data: { ...p.data, shift: e.target.value } }))}
                  >
                    <option value="">{t("Select Shift")}</option>
                    <option value="Morning Shift (06:00 - 14:00)">{t("Morning Shift (06:00 - 14:00)")}</option>
                    <option value="Evening Shift (14:00 - 22:00)">{t("Evening Shift (14:00 - 22:00)")}</option>
                    <option value="Night Shift (22:00 - 06:00)">{t("Night Shift (22:00 - 06:00)")}</option>
                    <option value="General Shift (09:00 - 18:00)">{t("General Shift (09:00 - 18:00)")}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="sdom-modal-title" style={{ marginBottom: 20 }}>{t("Shift Staff Role")}</div>
            <div className="sdom-modal-field">
              <label>{t("Role (Shift to)")}</label>
              <select 
                value={pmModal.role || "Pointsman"} 
                onChange={e=>setPmModal(p=>({...p, role: e.target.value}))}
              >
                <option value="Pointsman">{t("Pointsman")}</option>
                <option value="Station Master">{t("Station Master")}</option>
                <option value="Station Superintendent">{t("Station Superintendent")}</option>
                <option value="Train Manager">{t("Train Manager")}</option>
                <option value="Traffic Inspector">{t("Traffic Inspector")}</option>
              </select>
            </div>
          </>
        )}

        <div className="sdom-modal-actions" style={{ marginTop: 24 }}>
          <button className="sdom-btn-primary" style={{ flex: 1 }} onClick={savePmModal}>
            {pmModal.mode === "edit" ? t("🔒 UPDATE POINTSMAN") : isShift ? t("🔄 SHIFT POINTSMAN ROLE") : t("👤 ADD POINTSMAN")}
          </button>
          <button className="sdom-btn-ghost" style={{ flex: 1 }} onClick={()=>setPmModal(null)}>{t("Cancel")}</button>
        </div>
      </div>
    </div>
  );
}
