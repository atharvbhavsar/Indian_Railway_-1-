import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend,
  LineChart, Line, LabelList
} from "recharts";

export function StationProgressChart({ data, onChartClick }) {
  return (
    <div className="sdom-chart-card">
      <div className="chart-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", gap: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <div className="sdom-chart-title">Station-wise Evaluation Progress</div>
          <div className="sdom-chart-subtitle">Click anywhere on chart to zoom & filter 96 stations</div>
        </div>
        <button
          type="button"
          onClick={() => onChartClick(null, "progress")}
          style={{
            background: "var(--brand-primary, #0B1F3A)",
            color: "#ffffff", border: "none", padding: "6px 14px",
            borderRadius: "6px", fontSize: "12px", fontWeight: "700",
            cursor: "pointer", transition: "all 0.2s ease",
          }}
        >
          View Full Screen
        </button>
      </div>
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 12, left: -20, bottom: 5 }}
            barGap={6}
            onClick={(state) => onChartClick(state, "progress")}
            style={{ cursor: "pointer" }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D9E2EC" />
            <XAxis dataKey="station" tick={{ fontSize: 10, fill: "#627D98" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#627D98" }} axisLine={false} tickLine={false} />
            <RTooltip contentStyle={{ fontSize: "0.85rem", borderRadius: 6, border: "1px solid #D9E2EC" }} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
            <Bar dataKey="completed" fill="var(--brand-secondary, #1E3A5F)" radius={[4, 4, 0, 0]} name="Completed" barSize={12} />
            <Bar dataKey="pending" fill="#D69E2E" radius={[4, 4, 0, 0]} name="Pending" barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function StationScoreChart({ data, onChartClick }) {
  return (
    <div className="sdom-chart-card">
      <div className="chart-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", gap: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <div className="sdom-chart-title">Station-wise Average Score</div>
          <div className="sdom-chart-subtitle">Click anywhere on chart to zoom & filter 96 stations</div>
        </div>
        <button
          type="button"
          onClick={() => onChartClick(null, "score")}
          style={{
            background: "#1f7a5c", color: "#ffffff", border: "none", padding: "6px 14px",
            borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s ease",
          }}
        >
          View Full Screen
        </button>
      </div>
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data} margin={{ top: 8, right: 12, left: -20, bottom: 5 }}
            onClick={(state) => onChartClick(state, "score")} style={{ cursor: "pointer" }} barSize={18}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D9E2EC" />
            <XAxis dataKey="station" tick={{ fontSize: 10, fill: "#627D98" }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#627D98" }} axisLine={false} tickLine={false} />
            <RTooltip contentStyle={{ fontSize: "0.85rem", borderRadius: 6, border: "1px solid #D9E2EC" }} formatter={(value) => [`${value}/100`, "Average Score"]} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
            <Bar dataKey="avgScore" fill="#1f7a5c" radius={[4, 4, 0, 0]} name="Average Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function RoleDistributionChart({ data }) {
  return (
    <div className="sdom-chart-card">
      <div className="sdom-chart-title">Role-wise Staff Distribution</div>
      <div className="sdom-chart-subtitle">Staff count per role across the division</div>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 40, left: 0, bottom: 8 }} barSize={52}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D9E2EC" />
            <XAxis dataKey="role" fontSize={12} tick={{ fill: "#102A43", fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis fontSize={11} tick={{ fill: "#627D98" }} axisLine={false} tickLine={false} />
            <RTooltip contentStyle={{ fontSize: "0.85rem", borderRadius: 6, border: "1px solid #D9E2EC" }} />
            <Bar dataKey="count" fill="#1E3A5F" radius={[5, 5, 0, 0]}>
              <LabelList dataKey="count" position="top" style={{ fontSize: 12, fontWeight: 700, fill: "#102A43" }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function CategoryDistributionChart({ data, onPieClick }) {
  return (
    <div className="sdom-chart-card">
      <div className="chart-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", gap: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <div className="sdom-chart-title">Category Distribution (Division-wide)</div>
          <div className="sdom-chart-subtitle">Click anywhere on chart to zoom & filter 96 stations</div>
        </div>
        <button
          type="button"
          onClick={() => onPieClick(null)}
          style={{
            background: "var(--brand-primary, #0B1F3A)", color: "#ffffff", border: "none", padding: "6px 14px",
            borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s ease",
          }}
        >
          View Full Screen
        </button>
      </div>
      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart style={{ cursor: "pointer" }}>
            <Pie
              data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value"
              paddingAngle={3} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              onClick={(data) => onPieClick(data)}
            >
              {data.map((d, i) => <Cell key={i} fill={d.fill} style={{ cursor: "pointer" }} />)}
            </Pie>
            <Legend onClick={(data) => onPieClick({ name: data.value })} wrapperStyle={{ cursor: "pointer" }} />
            <RTooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function PerformanceTrendChart({ data }) {
  return (
    <div className="sdom-chart-card">
      <div className="sdom-chart-title">Division-wide Performance & Safety Trend (Last 6 Months)</div>
      <div className="sdom-chart-subtitle">Average assessment scores and safety compliance percentage over time</div>
      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis domain={[60, 100]} fontSize={12} />
            <RTooltip contentStyle={{ fontSize: "0.85rem", borderRadius: 6, border: "1px solid #D9E2EC" }} />
            <Legend wrapperStyle={{ fontSize: "0.82rem" }} />
            <Line type="monotone" dataKey="score" name="Avg Score" stroke="#1E3A5F" strokeWidth={2.5} dot={{ r: 4, fill: "#1E3A5F" }} />
            <Line type="monotone" dataKey="safety" name="Safety Compliance%" stroke="#2F855A" strokeWidth={2.5} dot={{ r: 4, fill: "#2F855A" }} strokeDasharray="5 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
