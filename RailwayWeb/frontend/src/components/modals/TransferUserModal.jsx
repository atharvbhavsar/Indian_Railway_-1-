import React from "react";

export default function TransferUserModal({
  transferringUser,
  setTransferringUser,
  confirmTransfer,
  myStations
}) {
  if (!transferringUser) return null;

  return (
    <div className="sdom-modal-overlay" onClick={e => e.target === e.currentTarget && setTransferringUser(null)}>
      <div className="sdom-modal" style={{ width: "450px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#0d2c4d" }}>Transfer Personnel Deployment</h3>
          <button type="button" onClick={() => setTransferringUser(null)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}>&times;</button>
        </div>

        <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0", lineHeight: "1.4" }}>
          Transfer <strong>{transferringUser.name}</strong> from <strong>{transferringUser.station}</strong> to another station section.
        </p>

        <div className="sdom-modal-field">
          <label>Select Deployment Station</label>
          <select value={transferringUser.targetStation} onChange={e=>setTransferringUser({...transferringUser, targetStation: e.target.value})}>
            {myStations.map(st => <option key={st.id || st.name} value={st.name}>{st.name}</option>)}
          </select>
        </div>

        <div className="sdom-modal-actions" style={{ marginTop: "24px" }}>
          <button type="button" className="sdom-btn-primary" style={{ flex: 1 }} onClick={confirmTransfer}>Confirm Transfer</button>
          <button type="button" className="sdom-btn-ghost" style={{ flex: 1 }} onClick={() => setTransferringUser(null)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
