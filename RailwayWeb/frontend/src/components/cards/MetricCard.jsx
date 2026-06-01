import React from "react";

export function MetricCard({ title, value, icon: Icon, trend, trendLabel, colorClass, highlightText }) {
  return (
    <div className="sdom-stat-card">
      <div className="sdom-stat-header">
        <h3>{title}</h3>
        <div className={`sdom-stat-icon ${colorClass || ""}`}>
          {Icon && <Icon size={20} />}
        </div>
      </div>
      <div className="sdom-stat-value">{value}</div>
      {trend !== undefined && trend !== null && (
        <div className={`sdom-stat-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
          <span>{trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>
          {trendLabel && <span className="sdom-trend-label">{trendLabel}</span>}
        </div>
      )}
      {highlightText && !trend && (
        <div className="sdom-stat-trend positive">
          <span>{highlightText}</span>
        </div>
      )}
    </div>
  );
}
