import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";

export function PerformanceTrendChart({ data, xAxisKey, yAxisKey, strokeColor = "#2B6CB0" }) {
  if (!data || data.length === 0) {
    return (
      <div className="sdom-chart-empty">
        <p>No performance data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
        />
        <Line 
          type="monotone" 
          dataKey={yAxisKey} 
          stroke={strokeColor} 
          strokeWidth={3}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6 }}
        >
          <LabelList dataKey={yAxisKey} position="top" style={{ fill: '#475569', fontSize: 11, fontWeight: 500 }} />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
}
