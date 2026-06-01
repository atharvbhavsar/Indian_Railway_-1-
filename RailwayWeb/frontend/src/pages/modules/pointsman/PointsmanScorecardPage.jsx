import React from "react";
import { ShieldCheck, Clock } from "lucide-react";
import { getCategory, getCategoryBg, getCategoryColor } from "../../../constants";
import { testQuestions } from "../../../data/mockPointsmanData";

export function PointsmanScorecardPage({
  selectedRecord,
  setScreenMode,
  performanceSummaryText
}) {
  if (!selectedRecord) {
    return (
      <section className="pm-page-card">
        <p className="pm-empty-state">Select a record from History to review.</p>
      </section>
    );
  }

  const cat = getCategory(selectedRecord.totalScore);

  return (
    <div className="ti2-card animate-fade-in" style={{ padding: "24px", maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}>
      <div className="ti2-card-hdr" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "14px", marginBottom: "20px" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: 0 }}><ShieldCheck size={22} color="#16a34a"/> Detailed Evaluation Scorecard</h2>
        <button className="ti2-primary-btn" onClick={() => setScreenMode("default")}>← Return to History</button>
      </div>

      <div className="pm-scorecard-hero" style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", display: "flex", alignItems: "center", gap: "24px", marginBottom: "24px" }}>
        <div className="pm-sc-score-circle" style={{ width: "90px", height: "90px", borderRadius: "50%", border: `6px solid ${getCategoryColor(cat)}`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flexShrink: 0, background: "#fff" }}>
          <strong style={{ fontSize: "24px", color: getCategoryColor(cat), fontWeight: "800" }}>{selectedRecord.totalScore}</strong>
          <span style={{ fontSize: "10px", color: "#64748b", fontWeight: "600", marginTop: "-2px" }}>/100</span>
        </div>
        <div>
          <span className="pm-cat-badge-lg" style={{ background: getCategoryBg(cat), color: getCategoryColor(cat), display: "inline-block", padding: "4px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", marginBottom: "6px" }}>
            Final Category: Category {cat}
          </span>
          <p className="pm-sc-period" style={{ margin: "2px 0", fontSize: "14px", color: "#1e293b", fontWeight: "600" }}>{selectedRecord.assessmentPeriod} - Self-Compliance Audit</p>
          <p className="pm-sc-date" style={{ margin: "2px 0 0", fontSize: "12px", color: "#64748b" }}>Attempt Completed: {selectedRecord.date} &nbsp;·&nbsp; Assessed By: S. Deshmukh (Station Master)</p>
        </div>
      </div>

      {/* Dynamic Performance Summary */}
      <div className="pm-performance-summary-box" style={{ background: "#eff6ff", borderLeft: "4px solid #2563eb", padding: "16px", borderRadius: "8px", marginBottom: "24px" }}>
        <h4 style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#1e3a8a", display: "flex", alignItems: "center", gap: "6px" }}>📊 Official Performance Evaluation Summary</h4>
        <p style={{ margin: 0, fontSize: "13px", color: "#1e3a8a", lineHeight: "1.5" }}>{performanceSummaryText}</p>
      </div>

      {/* Competency Module Breakdown */}
      <div className="pm-sc-sections" style={{ marginBottom: "30px" }}>
        <h3 style={{ fontSize: "15px", color: "#0f172a", marginBottom: "16px", fontWeight: "700" }}>Safety Domain Competency Breakdown</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {selectedRecord.sections?.map(s => {
            const spc = Math.round((s.marks / s.outOf) * 100);
            const barColor = getCategoryColor(getCategory(spc));
            return (
              <div key={s.title} className="pm-sc-section-row" style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "13px" }}>
                <span className="pm-sc-section-name" style={{ width: "260px", fontWeight: "600", color: "#334155" }}>{s.title}</span>
                <div className="pm-sc-bar-wrap" style={{ flexGrow: 1, height: "8px", background: "#e2e8f0", borderRadius: "999px", overflow: "hidden" }}>
                  <div className="pm-sc-bar-fill" style={{ width: `${spc}%`, height: "100%", background: barColor, borderRadius: "999px" }} />
                </div>
                <span className="pm-sc-section-marks" style={{ width: "60px", textAlign: "right", fontWeight: "700", color: "#0f172a" }}>{s.marks}/{s.outOf}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Complete MCQ Question Review */}
      <div className="pm-mcq-review-panel" style={{ borderTop: "1px solid #e2e8f0", paddingTop: "24px" }}>
        <div className="pm-chart-header" style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
          <Clock size={16} color="#475569"/>
          <h3 style={{ margin: 0, fontSize: "15px", color: "#0f172a", fontWeight: "700" }}>Complete Assessment Question Review</h3>
        </div>
        <p className="pm-subtitle" style={{ fontSize: "12px", color: "#64748b", marginTop: "-10px", marginBottom: "20px" }}>
          Below is the detailed response evaluation for all 25 compulsory questions. Correct responses are highlighted in green; incorrect choices are highlighted in red.
        </p>

        <div className="pm-review-questions-list" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {testQuestions.map((q, qIndex) => {
            const selectedOpt = selectedRecord.responses ? selectedRecord.responses[qIndex] : null;
            const isCorrect = selectedOpt === q.answer;

            return (
              <div key={qIndex} className={`pm-review-question-card ${isCorrect ? "correct-card" : "wrong-card"}`}>
                <div className="pm-rq-header">
                  <span className="pm-rq-number">Question {qIndex + 1}</span>
                  {isCorrect ? (
                    <span className="pm-rq-badge success">Correct (+4 Marks)</span>
                  ) : (
                    <span className="pm-rq-badge danger">Incorrect (0 Marks)</span>
                  )}
                </div>
                <h4 className="pm-rq-text">{q.text}</h4>

                <div className="pm-rq-options-grid">
                  {q.options.map((opt, oIdx) => {
                    const wasSelected = selectedOpt === oIdx;
                    const isOptCorrect = q.answer === oIdx;
                    
                    let optClass = "";
                    if (wasSelected) {
                      optClass = isCorrect ? "opt-selected-correct" : "opt-selected-wrong";
                    } else if (isOptCorrect) {
                      optClass = "opt-correct-unselected";
                    }

                    return (
                      <div key={oIdx} className={`pm-rq-option-item ${optClass}`}>
                        <span className="font-mono opt-prefix">{["A", "B", "C", "D"][oIdx]}</span>
                        <span className="opt-label-text">{opt}</span>
                        {wasSelected && (
                          <span className="opt-user-tag">{isCorrect ? "✓ Selected" : "✗ Selected"}</span>
                        )}
                        {!wasSelected && isOptCorrect && (
                          <span className="opt-correct-tag">✓ Correct Key</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Operational Safety Explanation */}
                {q.explanation && (
                  <div style={{ marginTop: "16px", background: "#f8fafc", padding: "12px 16px", borderRadius: "8px", borderLeft: "4px solid #f97316", fontSize: "12.5px", color: "#334155" }}>
                    <strong style={{ color: "#c2410c" }}>💡 Operational Safety Explanation: </strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
