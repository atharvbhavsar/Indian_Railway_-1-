/**
 * 🚂 RSES CHART ZOOM MODAL COMPONENT
 * Reusable dynamic chart visualizer, search diagnostics, and paginated data explorer.
 */
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

export default function ZoomChartModal({
  isOpen,
  onClose,
  chartType,
  modalPieData,
  modalChartData,
  totalCount,
  filteredCount,
  paginatedData,
  currentPage,
  totalPages,
  zoomPopupSearch,
  setZoomPopupSearch,
  zoomPopupZone,
  setZoomPopupZone,
  zoomPopupDivision,
  setZoomPopupDivision,
  zoomPopupStationName,
  setZoomPopupStationName,
  zoomPopupStationCode,
  setZoomPopupStationCode,
  zoomPopupCategory,
  setZoomPopupCategory,
  zoomPopupRisk,
  setZoomPopupRisk,
  zoomPopupStatus,
  setZoomPopupStatus,
  zoomPopupStartDate,
  setZoomPopupStartDate,
  zoomPopupEndDate,
  setZoomPopupEndDate,
  setZoomPopupPage,
  handleResetPopupFilters
}) {
  if (!isOpen) return null;

  const itemsPerPage = 10;

  return (
    <div 
      className="zoom-modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(8px)",
        zIndex: 9999,
        overflowY: "auto",
        display: "block",
        padding: 0,
        animation: "fadeIn 0.2s ease-out"
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      
      <div 
        className="zoom-modal-container"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 0,
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "none",
          overflow: "visible",
          border: "none",
          animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {/* Modal Header */}
        <div 
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#f8fafc",
            position: "sticky",
            top: 0,
            zIndex: 100
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>
              {chartType === "progress" 
                ? "Station-wise Evaluation Progress" 
                : chartType === "score" 
                ? "Station-wise Average Score" 
                : "Category Distribution"}
            </h3>
            <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#64748b", fontWeight: "600" }}>
              Page {currentPage} of {totalPages} (Showing 10 stations per page out of {filteredCount} matching stations)
            </p>
          </div>
          
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                border: "1px solid #fecaca",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              Close Zoom View
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div style={{ flex: 1, padding: "24px", display: "flex", flexDirection: "column", gap: "20px", overflow: "visible" }}>
          
          {/* 1. FILTER CONTROLS GRID */}
          <div 
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "16px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h4 style={{ margin: 0, fontSize: "12px", fontWeight: "700", color: "#334155", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Operational Search & Diagnostics Filters
              </h4>
              <button
                type="button"
                onClick={handleResetPopupFilters}
                style={{
                  background: "none",
                  border: "none",
                  color: "#2563eb",
                  fontSize: "12px",
                  fontWeight: "750",
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              >
                Reset Diagnostics Filters
              </button>
            </div>
            <div 
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "12px"
              }}
            >
              {/* Search */}
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Quick Search</label>
                <input
                  type="text"
                  placeholder="Search name/code..."
                  value={zoomPopupSearch}
                  onChange={(e) => { setZoomPopupSearch(e.target.value); setZoomPopupPage(1); }}
                  style={{ width: "100%", padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                />
              </div>

              {/* Zone */}
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Zone</label>
                <select
                  value={zoomPopupZone}
                  onChange={(e) => { setZoomPopupZone(e.target.value); setZoomPopupPage(1); }}
                  style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", background: "#ffffff", color: "#334155" }}
                >
                  <option value="All">All Zones</option>
                  <option value="Central Railway">Central Railway</option>
                </select>
              </div>

              {/* Division */}
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Division/Section</label>
                <select
                  value={zoomPopupDivision}
                  onChange={(e) => { setZoomPopupDivision(e.target.value); setZoomPopupPage(1); }}
                  style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", background: "#ffffff", color: "#334155" }}
                >
                  <option value="All">All Sections</option>
                  <option value="Parbhani-Amla Section">Parbhani-Amla</option>
                </select>
              </div>

              {/* Station Name */}
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Station Name</label>
                <input
                  type="text"
                  placeholder="Filter by name..."
                  value={zoomPopupStationName === "All" ? "" : zoomPopupStationName}
                  onChange={(e) => { setZoomPopupStationName(e.target.value || "All"); setZoomPopupPage(1); }}
                  style={{ width: "100%", padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                />
              </div>

              {/* Station Code */}
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Station Code</label>
                <input
                  type="text"
                  placeholder="Filter by code..."
                  value={zoomPopupStationCode === "All" ? "" : zoomPopupStationCode}
                  onChange={(e) => { setZoomPopupStationCode(e.target.value || "All"); setZoomPopupPage(1); }}
                  style={{ width: "100%", padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                />
              </div>

              {/* Category */}
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Category</label>
                <select
                  value={zoomPopupCategory}
                  onChange={(e) => { setZoomPopupCategory(e.target.value); setZoomPopupPage(1); }}
                  style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", background: "#ffffff", color: "#334155" }}
                >
                  <option value="All">All Categories</option>
                  <option value="A">Cat. A</option>
                  <option value="B">Cat. B</option>
                  <option value="C">Cat. C</option>
                  <option value="D">Cat. D</option>
                </select>
              </div>

              {/* Risk Level */}
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Risk Level</label>
                <select
                  value={zoomPopupRisk}
                  onChange={(e) => { setZoomPopupRisk(e.target.value); setZoomPopupPage(1); }}
                  style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", background: "#ffffff", color: "#334155" }}
                >
                  <option value="All">All Risks</option>
                  <option value="Low">Low Risk</option>
                  <option value="Medium">Medium Risk</option>
                  <option value="High">High Risk</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Status</label>
                <select
                  value={zoomPopupStatus}
                  onChange={(e) => { setZoomPopupStatus(e.target.value); setZoomPopupPage(1); }}
                  style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", background: "#ffffff", color: "#334155" }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              {/* Date range start */}
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Start Date</label>
                <input
                  type="date"
                  value={zoomPopupStartDate}
                  onChange={(e) => { setZoomPopupStartDate(e.target.value); setZoomPopupPage(1); }}
                  style={{ width: "100%", padding: "5px 8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", color: "#334155" }}
                />
              </div>

              {/* Date range end */}
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>End Date</label>
                <input
                  type="date"
                  value={zoomPopupEndDate}
                  onChange={(e) => { setZoomPopupEndDate(e.target.value); setZoomPopupPage(1); }}
                  style={{ width: "100%", padding: "5px 8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", color: "#334155" }}
                />
              </div>
            </div>
          </div>

          {/* 2. DYNAMIC REAL-TIME CHART BOX */}
          <div 
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
            }}
          >
            <div style={{ display: "flex", justifycontent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h4 style={{ margin: 0, fontSize: "14px", fontWeight: "750", color: "#0f172a" }}>
                {chartType === "progress" 
                  ? "Evaluation Progress Trends (Completed vs Pending)" 
                  : chartType === "score" 
                  ? "Average Safety Evaluation Scores (/100)" 
                  : "Category Distribution Breakdown"}
              </h4>
              <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>
                Showing up to 10 stations on this page
              </span>
            </div>
            
            <div style={{ height: "260px", width: "100%" }}>
              {chartType === "category" ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", gap: "60px" }}>
                  <div style={{ width: "220px", height: "220px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={modalPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={88}
                          dataKey="value"
                          label={({ name, value }) => `${name.replace("Category ", "")}: ${value}`}
                        >
                          {modalPieData.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} Station(s)`, "Count"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {modalPieData.map((item) => (
                      <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: "700", color: "#334155" }}>
                        <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: item.color }} />
                        <span>{item.name}:</span>
                        <span style={{ color: "#0f172a" }}>{item.value} Station(s) ({((item.value / (totalCount || 1)) * 100).toFixed(0)}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={modalChartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                    barGap={6}
                  >
                    <XAxis
                      dataKey="station"
                      tick={{ fontSize: 10, fill: "#475569" }}
                      height={40}
                    />
                    <YAxis tick={{ fontSize: 10, fill: "#475569" }} domain={chartType === "score" ? [0, 100] : undefined} />
                    <Tooltip 
                      contentStyle={{ background: "#0f172a", color: "#ffffff", borderRadius: "8px", border: "none", fontSize: "12px" }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
                    {chartType === "progress" ? (
                      <>
                        <Bar dataKey="completed" fill="#0d2948" name="Completed Evaluations" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="pending" fill="#f5ae3f" name="Pending Evaluations" radius={[4, 4, 0, 0]} />
                      </>
                    ) : (
                      <Bar dataKey="avgScore" fill="#1f7a5c" name="Average Evaluation Score" radius={[4, 4, 0, 0]} />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* 3. DETAILED STATION DATA TABLE */}
          <div 
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155" }}>Station Name</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155" }}>Code</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155" }}>Section/Division</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155" }}>Zone</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155", textAlign: "right" }}>Completed</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155", textAlign: "right" }}>Pending</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155", textAlign: "right" }}>Avg. Score</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155", textAlign: "center" }}>Category</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155", textAlign: "center" }}>Risk Level</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155" }}>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="10" style={{ padding: "32px", textAlign: "center", color: "#64748b" }}>
                      No stations matching the selected diagnostics criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((st) => {
                    const riskColor = st.riskLevel === "High" ? "#ef4444" : st.riskLevel === "Medium" ? "#ea580c" : "#16a34a";
                    const riskBg = st.riskLevel === "High" ? "#fef2f2" : st.riskLevel === "Medium" ? "#fff7ed" : "#dcfce7";
                    const catBg = st.category === "A" ? "#eff6ff" : st.category === "B" ? "#f5f3ff" : st.category === "C" ? "#fffbeb" : "#fdf2f8";
                    const catColor = st.category === "A" ? "#1e40af" : st.category === "B" ? "#5b21b6" : st.category === "C" ? "#92400e" : "#9d174d";

                    return (
                      <tr key={st.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "12px 16px", fontWeight: "600", color: "#0f172a" }}>{st.stationName}</td>
                        <td style={{ padding: "12px 16px", fontWeight: "700", color: "#475569" }}>{st.stationCode}</td>
                        <td style={{ padding: "12px 16px", color: "#475569" }}>{st.division}</td>
                        <td style={{ padding: "12px 16px", color: "#475569" }}>{st.zone}</td>
                        <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "700", color: "#0d2948" }}>{st.completed}</td>
                        <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "700", color: "#f5ae3f" }}>{st.pending}</td>
                        <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "700", color: "#1f7a5c" }}>{st.avgScore}/100</td>
                        <td style={{ padding: "12px 16px", textAlign: "center" }}>
                          <span style={{ background: catBg, color: catColor, padding: "2px 8px", borderRadius: "4px", fontWeight: "700", fontSize: "11px" }}>
                            Cat {st.category}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px", textAlign: "center" }}>
                          <span style={{ background: riskBg, color: riskColor, padding: "3px 8px", borderRadius: "6px", fontWeight: "700", fontSize: "11px" }}>
                            {st.riskLevel}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px", color: "#64748b" }}>{st.lastUpdatedDate}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* Modal Footer (SLIDER / TABS PAGINATION) */}
        <div 
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #e2e8f0",
            background: "#f8fafc",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div style={{ fontSize: "13px", color: "#475569", fontWeight: "600" }}>
            Showing {filteredCount > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredCount)} of {filteredCount} stations
          </div>
          
          {/* Page tabs */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setZoomPopupPage(p => Math.max(p - 1, 1))}
              style={{
                padding: "6px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                background: "#ffffff",
                color: "#334155",
                fontSize: "12px",
                fontWeight: "600",
                cursor: currentPage === 1 ? "default" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1
              }}
            >
              Previous
            </button>

            <div style={{ display: "flex", gap: "4px" }}>
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const active = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setZoomPopupPage(pageNum)}
                    style={{
                      padding: "6px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      background: active ? "var(--brand-primary, #0B1F3A)" : "#ffffff",
                      color: active ? "#ffffff" : "#334155",
                      fontSize: "12px",
                      fontWeight: "700",
                      cursor: "pointer"
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setZoomPopupPage(p => Math.min(p + 1, totalPages))}
              style={{
                padding: "6px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                background: "#ffffff",
                color: "#334155",
                fontSize: "12px",
                fontWeight: "600",
                cursor: currentPage === totalPages ? "default" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
