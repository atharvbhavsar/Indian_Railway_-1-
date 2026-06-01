import React, { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RTooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";

export function SAChartZoomModal({ isOpen, onClose, initialChartType, initialCategory, stations }) {
  const [search, setSearch] = useState("");
  const [zone, setZone] = useState("All");
  const [division, setDivision] = useState("All");
  const [stationName, setStationName] = useState("All");
  const [stationCode, setStationCode] = useState("All");
  const [category, setCategory] = useState("All");
  const [risk, setRisk] = useState("All");
  const [status, setStatus] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);

  // Reset filters and apply initial props when opened
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setZone("All");
      setDivision("All");
      setStationName("All");
      setStationCode("All");
      setCategory(initialCategory || "All");
      setRisk("All");
      setStatus("All");
      setStartDate("");
      setEndDate("");
      setPage(1);
    }
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const filtered = stations.filter(st => {
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || st.stationName.toLowerCase().includes(q) || st.stationCode.toLowerCase().includes(q);
    const matchesZone = zone === "All" || st.zone === zone;
    const matchesDivision = division === "All" || st.division === division;
    const matchesName = stationName === "All" || !stationName.trim() || st.stationName.toLowerCase().includes(stationName.toLowerCase());
    const matchesCode = stationCode === "All" || !stationCode.trim() || st.stationCode.toLowerCase().includes(stationCode.toLowerCase());
    const matchesCategory = category === "All" || st.category === category;
    const matchesRisk = risk === "All" || st.riskLevel === risk;
    const matchesStatus = status === "All" || st.assessmentStatus === status;

    let matchesDate = true;
    if (startDate) matchesDate = matchesDate && st.lastUpdatedDate >= startDate;
    if (endDate) matchesDate = matchesDate && st.lastUpdatedDate <= endDate;

    return matchesSearch && matchesZone && matchesDivision && matchesName && matchesCode && matchesCategory && matchesRisk && matchesStatus && matchesDate;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const modalChartData = paginated.map(st => ({
    station: st.stationCode,
    name: st.stationName,
    completed: st.completed,
    pending: st.pending,
    avgScore: st.avgScore
  }));

  const catA = paginated.filter(s => s.category === "A").length;
  const catB = paginated.filter(s => s.category === "B").length;
  const catC = paginated.filter(s => s.category === "C").length;
  const catD = paginated.filter(s => s.category === "D").length;
  const totalCount = catA + catB + catC + catD;

  const modalPieData = [
    { name: "Category A", value: catA, color: "#1e40af" },
    { name: "Category B", value: catB, color: "#5b21b6" },
    { name: "Category C", value: catC, color: "#92400e" },
    { name: "Category D", value: catD, color: "#9d174d" }
  ].filter(item => item.value > 0);

  const resetFilters = () => {
    setSearch(""); setZone("All"); setDivision("All"); setStationName("All");
    setStationCode("All"); setCategory("All"); setRisk("All"); setStatus("All");
    setStartDate(""); setEndDate(""); setPage(1);
  };

  return (
    <div className="zoom-modal-overlay" style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(8px)",
      zIndex: 9999, overflowY: "auto", display: "block", animation: "fadeIn 0.2s ease-out"
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
      <div className="zoom-modal-container" style={{
        backgroundColor: "#ffffff", width: "100%", minHeight: "100vh", display: "flex",
        flexDirection: "column", animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      }}>
        {/* Header */}
        <div style={{
          padding: "18px 24px", borderBottom: "1px solid #e2e8f0", display: "flex",
          justifyContent: "space-between", alignItems: "center", background: "#f8fafc", position: "sticky", top: 0, zIndex: 100
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>
              {initialChartType === "progress" ? "Station-wise Evaluation Progress" : initialChartType === "score" ? "Station-wise Average Score" : "Category Distribution"}
            </h3>
            <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#64748b", fontWeight: "600" }}>
              Page {currentPage} of {totalPages} (Showing 10 stations per page out of {filtered.length} matching stations)
            </p>
          </div>
          <button type="button" onClick={onClose} style={{
            background: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", padding: "8px 16px",
            borderRadius: "6px", fontSize: "13px", fontWeight: "700", cursor: "pointer"
          }}>
            Close Zoom View
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Filters */}
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h4 style={{ margin: 0, fontSize: "12px", fontWeight: "700", color: "#334155", textTransform: "uppercase" }}>Operational Search & Diagnostics Filters</h4>
              <button type="button" onClick={resetFilters} style={{ background: "none", border: "none", color: "#2563eb", fontSize: "12px", fontWeight: "750", cursor: "pointer", textDecoration: "underline" }}>
                Reset Filters
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px" }}>
              <div><label style={{ fontSize: "11px", color: "#64748b", fontWeight: "600" }}>Quick Search</label><input type="text" placeholder="Search..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} style={{ width: "100%", padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }} /></div>
              <div><label style={{ fontSize: "11px", color: "#64748b", fontWeight: "600" }}>Zone</label><select value={zone} onChange={e => { setZone(e.target.value); setPage(1); }} style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}><option value="All">All Zones</option><option value="CR">CR (Central Rly)</option></select></div>
              <div><label style={{ fontSize: "11px", color: "#64748b", fontWeight: "600" }}>Division</label><select value={division} onChange={e => { setDivision(e.target.value); setPage(1); }} style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}><option value="All">All Divisions</option><option value="Nagpur">Nagpur</option><option value="Pune">Pune</option><option value="Mumbai">Mumbai</option><option value="Solapur">Solapur</option><option value="Bhusawal">Bhusawal</option></select></div>
              <div><label style={{ fontSize: "11px", color: "#64748b", fontWeight: "600" }}>Category</label><select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }} style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}><option value="All">All Categories</option><option value="A">Cat. A</option><option value="B">Cat. B</option><option value="C">Cat. C</option><option value="D">Cat. D</option></select></div>
              <div><label style={{ fontSize: "11px", color: "#64748b", fontWeight: "600" }}>Risk</label><select value={risk} onChange={e => { setRisk(e.target.value); setPage(1); }} style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}><option value="All">All Risks</option><option value="Low">Low Risk</option><option value="Medium">Medium Risk</option><option value="High">High Risk</option></select></div>
              <div><label style={{ fontSize: "11px", color: "#64748b", fontWeight: "600" }}>Status</label><select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}><option value="All">All Statuses</option><option value="Approved">Approved</option><option value="Pending">Pending</option><option value="Completed">Completed</option></select></div>
            </div>
          </div>

          {/* Chart */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" }}>
            <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: "750", color: "#0f172a" }}>Chart View</h4>
            <div style={{ height: "260px", width: "100%" }}>
              {initialChartType === "category" ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", gap: "60px" }}>
                  <div style={{ width: "220px", height: "220px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={modalPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={88} dataKey="value" label={({ name, value }) => `${name.replace("Category ", "")}: ${value}`}>
                          {modalPieData.map(entry => <Cell key={entry.name} fill={entry.color} />)}
                        </Pie>
                        <RTooltip formatter={(value) => [`${value} Station(s)`, "Count"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {modalPieData.map((item) => (
                      <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: "700" }}>
                        <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: item.color }} />
                        <span>{item.name}:</span><span>{item.value} Station(s) ({((item.value / (totalCount || 1)) * 100).toFixed(0)}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={modalChartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }} barGap={6}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D9E2EC" />
                    <XAxis dataKey="station" tick={{ fontSize: 10, fill: "#475569" }} height={40} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#475569" }} domain={initialChartType === "score" ? [0, 100] : undefined} axisLine={false} tickLine={false} />
                    <RTooltip contentStyle={{ background: "#0f172a", color: "#ffffff", borderRadius: "8px", border: "none", fontSize: "12px" }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
                    {initialChartType === "progress" ? (
                      <>
                        <Bar dataKey="completed" fill="#1E3A5F" name="Completed" radius={[4, 4, 0, 0]} barSize={12} />
                        <Bar dataKey="pending" fill="#D69E2E" name="Pending" radius={[4, 4, 0, 0]} barSize={12} />
                      </>
                    ) : (
                      <Bar dataKey="avgScore" fill="#1f7a5c" name="Average Score" radius={[4, 4, 0, 0]} barSize={18} />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Table */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155" }}>Station Name</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155" }}>Code</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155", textAlign: "right" }}>Completed</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155", textAlign: "right" }}>Pending</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155", textAlign: "right" }}>Avg. Score</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155", textAlign: "center" }}>Category</th>
                  <th style={{ padding: "12px 16px", fontWeight: "700", color: "#334155", textAlign: "center" }}>Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan="7" style={{ padding: "32px", textAlign: "center", color: "#64748b" }}>No stations found.</td></tr>
                ) : (
                  paginated.map(st => (
                    <tr key={st.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 16px", fontWeight: "600" }}>{st.stationName}</td>
                      <td style={{ padding: "12px 16px", fontWeight: "700" }}>{st.stationCode}</td>
                      <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "700", color: "#1E3A5F" }}>{st.completed}</td>
                      <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "700", color: "#D69E2E" }}>{st.pending}</td>
                      <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "700", color: "#1f7a5c" }}>{st.avgScore}/100</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>Cat {st.category}</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>{st.riskLevel}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Pagination */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "13px", color: "#475569", fontWeight: "600" }}>Showing {filtered.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}</div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <button disabled={currentPage === 1} onClick={() => setPage(p => Math.max(p - 1, 1))} style={{ padding: "6px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", background: "#ffffff", fontSize: "12px", cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.5 : 1 }}>Prev</button>
            <button disabled={currentPage === totalPages} onClick={() => setPage(p => Math.min(p + 1, totalPages))} style={{ padding: "6px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", background: "#ffffff", fontSize: "12px", cursor: currentPage === totalPages ? "not-allowed" : "pointer", opacity: currentPage === totalPages ? 0.5 : 1 }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
