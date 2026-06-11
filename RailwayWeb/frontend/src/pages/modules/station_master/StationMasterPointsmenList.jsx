import React from 'react';
import { 
  Search, Filter, Users, Eye, Edit, Plus, ArrowRightLeft, Trash2
} from 'lucide-react';
import { getCat, riskLevel } from '../../../utils/scoreCalculator';
import { useLanguage } from '../../../contexts/LanguageContext';

export function StationMasterPointsmenList(props) {
  const { t } = useLanguage();
  const {
    viewingPm,
    setViewingPm,
    openPmAdd,
    pmF,
    setPmF,
    filteredPm,
    smProfile,
    openPmEdit,
    openPmShift,
    removePm,
    renderPointsmenDetail
  } = props;

  if (viewingPm) return renderPointsmenDetail(viewingPm);

  const catMap = { A: "sdom-badge-success", B: "sdom-badge-info", C: "sdom-badge-warning", D: "sdom-badge-danger" };
  const riskMap = { Low: "sdom-badge-success", Medium: "sdom-badge-warning", High: "sdom-badge-danger" };

  return (
    <div className="sdom-fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 className="sdom-page-title">{t("Pointsman Management")}</h1>
          <p className="sdom-page-subtitle">{t("Search, filter and manage operational pointsmen in your station limits.")}</p>
        </div>
        <button className="sdom-btn-primary" onClick={openPmAdd}>
          <Plus size={16} /> {t("Add New Pointsman")}
        </button>
      </div>

      {/* Filters */}
      <div className="sdom-filter-bar">
        <div className="sdom-filter-field" style={{ minWidth: 200 }}>
          <label>{t("Name / ID")}</label>
          <input 
            value={pmF.name} 
            onChange={e => setPmF(prev => ({ ...prev, name: e.target.value }))} 
            placeholder={t("Search...")} 
          />
        </div>
        <div className="sdom-filter-field">
          <label>{t("Category")}</label>
          <select value={pmF.cat} onChange={e => setPmF(prev => ({ ...prev, cat: e.target.value }))}>
            <option value="All">{t("All")}</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
            <option>Untested</option>
          </select>
        </div>
        <div className="sdom-filter-field">
          <label>{t("Risk Level")}</label>
          <select value={pmF.risk} onChange={e => setPmF(prev => ({ ...prev, risk: e.target.value }))}>
            <option value="All">{t("All")}</option>
            <option value="Low">{t("Low")}</option>
            <option value="Medium">{t("Medium")}</option>
            <option value="High">{t("High")}</option>
            <option value="Untested">{t("Untested")}</option>
          </select>
        </div>
      </div>

      <div className="sdom-chart-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontWeight: 700, color: "#1e293b" }}>{filteredPm.length} {t("pointsmen found")}</span>
        </div>
        <div className="sdom-table-wrap">
          <table className="sdom-table">
            <thead>
              <tr>
                <th>{t("Name")}</th>
                <th>{t("Emp ID")}</th>
                <th>{t("Station")}</th>
                <th>{t("Category")}</th>
                <th>{t("Risk")}</th>
                <th>{t("Last Score")}</th>
                <th>{t("PME Status")}</th>
                <th>{t("REF Status")}</th>
                <th>{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredPm.length === 0 && (
                <tr><td colSpan={9} style={{ textAlign: "center", padding: 32, color: "#94a3b8" }}>{t("No records found")}</td></tr>
              )}
              {filteredPm.map(s => {
                const riskVal = riskLevel(s);
                const catVal = s.cat || "Untested";
                return (
                  <tr key={s.id || s.hrmsId}>
                    <td style={{ fontWeight: 700 }}>{s.name}</td>
                    <td style={{ color: "#64748b", fontSize: "0.85rem" }}>{s.hrmsId}</td>
                    <td>{t(s.station || smProfile.station)}</td>
                    <td><span className={`sdom-badge ${catMap[catVal] || "sdom-badge-neutral"}`}>{catVal}</span></td>
                    <td><span className={`sdom-badge ${riskMap[riskVal] || "sdom-badge-neutral"}`}>{t(riskVal)}</span></td>
                    <td style={{ fontWeight: 700 }}>{s.cat === "Untested" ? "Not Given Test" : ((s.lastScore || s.score) ? `${s.lastScore || s.score}/100` : "—")}</td>
                    <td>
                      <span className={`sdom-badge ${s.pmeStatus === "Fit" ? "sdom-badge-success" : s.pmeStatus === "Pending" ? "sdom-badge-warning" : "sdom-badge-danger"}`}>
                        {t(s.pmeStatus || "Fit")}
                      </span>
                    </td>
                    <td>
                      <span className={`sdom-badge ${s.refStatus === "Cleared" ? "sdom-badge-success" : s.refStatus === "Pending" ? "sdom-badge-warning" : "sdom-badge-danger"}`}>
                        {t(s.refStatus || "Cleared")}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="sdom-btn-outline" style={{ padding: "5px 10px", fontSize: "0.8rem" }} onClick={() => setViewingPm(s)}>{t("View")}</button>
                        <button className="sdom-icon-btn" title={t("Edit")} onClick={() => openPmEdit(s)}><Edit size={15} color="#2563eb" /></button>
                        <button className="sdom-icon-btn" title={t("Shift")} onClick={() => openPmShift(s)}><ArrowRightLeft size={15} color="#d97706" /></button>
                        <button className="sdom-icon-btn" title={t("Remove")} onClick={() => removePm(s.hrmsId)}><Trash2 size={15} color="#dc2626" /></button>
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
  );
}
