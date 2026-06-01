import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function ComplianceBarChart({ data, xAxisKey, yAxisKey, fillColors }) {
  if (!data || data.length === 0) {
    return (
      <div className="sdom-chart-empty">
        <p>No compliance data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis 
          dataKey={xAxisKey} 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b', fontSize: 12 }} 
          dy={10}
        />
        <YAxis 
          domain={[0, 100]} 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b', fontSize: 12 }}
          dx={-10}
        />
        <Tooltip 
          cursor={{ fill: '#f1f5f9' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
        />
        <Bar dataKey={yAxisKey} radius={[4, 4, 0, 0]} maxBarSize={50}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={fillColors ? (fillColors[entry[xAxisKey]] || fillColors.default) : "#2B6CB0"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
