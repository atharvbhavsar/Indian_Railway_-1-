import React from "react";
import { AlertTriangle, FileText, ShieldCheck, Paperclip, Plus } from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";

export function PointsmanSafetyPage({
  safetySubTab,
  setSafetySubTab,
  openEmergencyDialog,
  safetyReports,
  
  // Track Defect Form
  submitTrackIssue,
  trackLine, setTrackLine,
  trackLocation, setTrackLocation,
  trackDefect, setTrackDefect,
  trackSeverity, setTrackSeverity,
  trackDesc, setTrackDesc,
  
  // File Uploads
  fileInputKey,
  handleFileChange,
  attachedFiles,
  removeAttachedFile,
  
  // Incident Form
  submitIncidentReport,
  incidentType, setIncidentType,
  incidentTrain, setIncidentTrain,
  incidentTime, setIncidentTime,
  incidentAction, setIncidentAction
}) {
  const { t } = useLanguage();

  return (
    <section className="pm-page-card">
      <div className="pm-page-header">
        <h2>{t("Safety Broadcast & Incident Reports")}</h2>
        <button className="pm-emergency-trigger-btn animate-pulse" onClick={openEmergencyDialog}>
          {t("🚨 TRIGGER SYSTEM EMERGENCY ALERT")}
        </button>
      </div>
      <p className="pm-subtitle font-semibold">{t("Immediate access to railway safety logs, abnormal track defect forms, and division-wide broadcasts.")}</p>

      {/* Safety Sub-Tabs */}
      <div className="pm-subnav-tabs" style={{ marginBottom: "16px" }}>
        <button 
          className={`pm-subtab-btn ${safetySubTab === "track" ? "active" : ""}`}
          onClick={() => setSafetySubTab("track")}
        >
          <AlertTriangle size={16} /> {t("Report Track Defect")}
        </button>
        <button 
          className={`pm-subtab-btn ${safetySubTab === "incident" ? "active" : ""}`}
          onClick={() => setSafetySubTab("incident")}
        >
          <FileText size={16} /> {t("Log Abnormal Incident")}
        </button>
        <button 
          className={`pm-subtab-btn ${safetySubTab === "history" ? "active" : ""}`}
          onClick={() => setSafetySubTab("history")}
        >
          <ShieldCheck size={16} /> {t("View Filed Safety Tickets")} ({safetyReports.length})
        </button>
      </div>

      {safetySubTab === "track" && (
        <form onSubmit={submitTrackIssue} className="pm-safety-form">
          <div className="pm-safety-form-grid">
            <div className="pm-form-field">
              <label>{t("Siding / Station Line Location")}</label>
              <select value={trackLine} onChange={e => setTrackLine(e.target.value)}>
                <option value="Line 1 Main">{t("Line 1 Main")}</option>
                <option value="Line 2 Loop">{t("Line 2 Loop")}</option>
                <option value="Siding Line A">{t("Siding Line A")}</option>
                <option value="Marshalling Yard Point 14">{t("Marshalling Yard Point 14")}</option>
                <option value="Cross-over 11A">{t("Cross-over 11A")}</option>
              </select>
            </div>
            <div className="pm-form-field">
              <label>{t("KM Mark Location (e.g. 102/4)")}</label>
              <input 
                type="text" 
                placeholder={t("Enter KM Mark")} 
                value={trackLocation} 
                onChange={e => setTrackLocation(e.target.value)} 
                required 
              />
            </div>
            <div className="pm-form-field">
              <label>{t("Track Defect Class")}</label>
              <select value={trackDefect} onChange={e => setTrackDefect(e.target.value)}>
                <option value="Rail Joint Crack / Fracture">{t("Rail Joint Crack / Fracture")}</option>
                <option value="Siding Point Jam / Failure">{t("Siding Point Jam / Failure")}</option>
                <option value="Obstruction on Siding (Fouling)">{t("Obstruction on Siding (Fouling)")}</option>
                <option value="Ballast Washout / Sinkage">{t("Ballast Washout / Sinkage")}</option>
                <option value="High Vegetation Overgrowth">{t("High Vegetation Overgrowth")}</option>
              </select>
            </div>
            <div className="pm-form-field">
              <label>{t("Severity Category")}</label>
              <select value={trackSeverity} onChange={e => setTrackSeverity(e.target.value)}>
                <option value="High - Urgent Action">{t("High - Urgent (Suspend Movements)")}</option>
                <option value="Medium - Caution Advised">{t("Medium - Caution (15 km/h restriction)")}</option>
                <option value="Low - Monitor Area">{t("Low - Watchful (Monitor daily)")}</option>
              </select>
            </div>
            <div className="pm-form-field pm-field-wide">
              <label>{t("Defect Observations & Technical Details")}</label>
              <textarea 
                rows="4" 
                placeholder={t("Explain the visual findings, track alignment defects, or points feedback failures in detail...")}
                value={trackDesc}
                onChange={e => setTrackDesc(e.target.value)}
                required
              />
            </div>
            
            {/* File Attachment Upload Mock */}
            <div className="pm-form-field pm-field-wide pm-upload-area">
              <label><Paperclip size={14} /> {t("Upload Details (Photos, Track Reports, Audio Logs)")}</label>
              <div className="pm-file-selector-box">
                <input 
                  key={fileInputKey}
                  type="file" 
                  multiple 
                  onChange={handleFileChange} 
                  className="pm-hidden-file-input" 
                  id="safety-evidence-files" 
                />
                <label htmlFor="safety-evidence-files" className="pm-file-upload-label">
                  <Plus size={18} /> {t("Click to Choose Files to Upload")}
                </label>
              </div>

              {attachedFiles.length > 0 && (
                <div className="pm-attached-files-list">
                  <h5>{t("Evidence Files Queued")} ({attachedFiles.length}):</h5>
                  <ul>
                    {attachedFiles.map((file, fIdx) => (
                      <li key={fIdx}>
                        <span>📎 {file.name} ({file.size})</span>
                        <button type="button" onClick={() => removeAttachedFile(fIdx)}>{t("Remove")}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="pm-safety-submit-btn">
            {t("Log Track defect safety ticket")}
          </button>
        </form>
      )}

      {safetySubTab === "incident" && (
        <form onSubmit={submitIncidentReport} className="pm-safety-form">
          <div className="pm-safety-form-grid">
            <div className="pm-form-field">
              <label>{t("Abnormal incident Type")}</label>
              <select value={incidentType} onChange={e => setIncidentType(e.target.value)}>
                <option value="Hot Axle">{t("Hot Axle / Sparks on Wheel")}</option>
                <option value="Flat Tyre">{t("Flat Tyre / Heavy Impact Thuds")}</option>
                <option value="Brake Binding">{t("Brake Binding (Heavy Smoke)")}</option>
                <option value="Hanging Parts">{t("Hanging Coupling / Gear Parts")}</option>
                <option value="SPAD Incident">{t("SPAD (Signal Passed at Danger)")}</option>
                <option value="Open Siding Gate">{t("Unlocked Siding Gate during transit")}</option>
              </select>
            </div>
            <div className="pm-form-field">
              <label>{t("Train Number & Name (e.g. 12289 Duronto)")}</label>
              <input 
                type="text" 
                placeholder={t("Enter Train Details")} 
                value={incidentTrain} 
                onChange={e => setIncidentTrain(e.target.value)} 
                required 
              />
            </div>
            <div className="pm-form-field">
              <label>{t("Time of Observation")}</label>
              <input 
                type="datetime-local" 
                value={incidentTime} 
                onChange={e => setIncidentTime(e.target.value)} 
              />
            </div>
            <div className="pm-form-field">
              <label>{t("Immediate Safety Actions Taken")}</label>
              <input 
                type="text" 
                placeholder={t("e.g. Flagged Red, informed SM on Walkie-Talkie")} 
                value={incidentAction} 
                onChange={e => setIncidentAction(e.target.value)} 
                required
              />
            </div>
            <div className="pm-form-field pm-field-wide">
              <label>{t("Incident Details & Hand-Signal Remarks")}</label>
              <textarea 
                rows="4" 
                placeholder={t("Describe the train movement, shunting speeds, visual smoke, wheel fire, or hand signal exchanges...")}
                value={trackDesc}
                onChange={e => setTrackDesc(e.target.value)}
              />
            </div>
            
            {/* File Upload Incident Details */}
            <div className="pm-form-field pm-field-wide pm-upload-area">
              <label><Paperclip size={14} /> {t("Upload Incident Photos / Logs")}</label>
              <div className="pm-file-selector-box">
                <input 
                  key={fileInputKey}
                  type="file" 
                  multiple 
                  onChange={handleFileChange} 
                  className="pm-hidden-file-input" 
                  id="incident-evidence-files" 
                />
                <label htmlFor="incident-evidence-files" className="pm-file-upload-label">
                  <Plus size={18} /> {t("Choose Evidence Logs")}
                </label>
              </div>

              {attachedFiles.length > 0 && (
                <div className="pm-attached-files-list">
                  <h5>{t("Attached Evidence Logs")} ({attachedFiles.length}):</h5>
                  <ul>
                    {attachedFiles.map((file, fIdx) => (
                      <li key={fIdx}>
                        <span>📎 {file.name} ({file.size})</span>
                        <button type="button" onClick={() => removeAttachedFile(fIdx)}>{t("Remove")}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="pm-safety-submit-btn warning">
            {t("File Critical Incident Report")}
          </button>
        </form>
      )}

      {safetySubTab === "history" && (
        <div className="pm-safety-records-list">
          <h3 style={{ fontSize: "16px", color: "#0e2e4f", marginBottom: "14px" }}>{t("Submitted Safety Reports Ledger")}</h3>
          <div className="pm-safety-ledger-grid">
            {safetyReports.map(report => (
              <article key={report.id} className="pm-safety-ticket-card">
                <div className="pm-ticket-header">
                  <span className={`pm-ticket-type-badge ${report.type === "Track Defect" ? "defect" : "incident"}`}>
                    {t(report.type)}
                  </span>
                  <span className="pm-ticket-date font-mono">{report.date}</span>
                </div>
                <h4>{t(report.defect)}</h4>
                <div className="pm-ticket-details">
                  <div><strong>{t("Loc:")}</strong> {t(report.location)}</div>
                  <div><strong>{t("Severity:")}</strong> <span className="text-danger-bold">{t(report.severity)}</span></div>
                </div>
                <p className="pm-ticket-desc">{t(report.desc)}</p>
                {report.attachments && report.attachments.length > 0 && (
                  <div className="pm-ticket-attachments">
                    <strong>{t("Attachments")} ({report.attachments.length}):</strong>
                    <ul>
                      {report.attachments.map((at, idx) => <li key={idx} className="font-mono text-small">📎 {at.name} ({at.size})</li>)}
                    </ul>
                  </div>
                )}
                <div className="pm-ticket-footer">
                  <span>{t("Ticket #")}{report.id}</span>
                  <span className={`pm-ticket-status ${report.status.replace(/\s+/g, '-').toLowerCase()}`}>
                    {t(report.status)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
