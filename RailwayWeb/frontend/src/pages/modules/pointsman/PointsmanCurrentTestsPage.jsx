import React from "react";
import { Lock, CheckCircle2, ClipboardList, PlayCircle } from "lucide-react";

export function PointsmanCurrentTestsPage({
  employeeId,
  currentTest,
  handleReattempt,
  startTest
}) {
  const isTestActivated = localStorage.getItem("pm_test_activated_" + employeeId) === "true";

  return (
    <section className="pm-page-card">
      <div className="pm-page-header">
        <h2>Assigned Competency Trials</h2>
      </div>
      <p className="pm-subtitle">Mandatory periodically scheduled evaluation of SWR Rules and points shunting safety clearance.</p>

      <div className="pm-current-tests">
        {!isTestActivated ? (
          <div className="pm-no-test-banner" style={{ background: "#f8fafc", border: "2px dashed #cbd5e1" }}>
            <Lock size={40} color="#64748b" />
            <h3>Competency Exam Locked</h3>
            <p>Your periodic evaluation has not been activated by the Station Master yet. Please request your Station Master to activate your test so you can attempt it.</p>
          </div>
        ) : !currentTest ? (
          <div className="pm-no-test-banner">
            <CheckCircle2 size={40} color="#16a34a" />
            <h3>All caught up!</h3>
            <p>Your periodic evaluation for April 2026 is fully completed. Grade successfully filed to Station Supervisor records.</p>
            
            <button 
              onClick={handleReattempt}
              className="pm-start-btn" 
              style={{ 
                marginTop: "18px", 
                background: "#f97316", 
                border: "none",
                fontWeight: "800",
                padding: "10px 24px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(249, 115, 22, 0.3)"
              }}
            >
              Reappear for CBT Exam (Dev Mode)
            </button>
          </div>
        ) : (
          <article className="pm-test-card-premium">
            <div className="pm-tc-header">
              <ClipboardList size={22} color="#f97316" />
              <div>
                <h3>{currentTest.name}</h3>
                <p>Scheduled Period: <strong>{currentTest.period}</strong></p>
              </div>
            </div>
            <div className="pm-tc-meta-row">
              <span className="pm-mini-pill">📝 25 Compulsory Questions</span>
              <span className="pm-mini-pill">⏱️ Unlimited Time (No timer)</span>
              <span className="pm-mini-pill">☑️ MCQ Single Key Option</span>
              <span className="pm-mini-pill">🔒 Answering All Required to Submit</span>
            </div>
            <div className="pm-tc-sections-preview">
              {["Signal Rules", "Track Handling", "Communication", "Safety Response", "Operational Judgement"].map(s => (
                <span key={s} className="pm-tc-section-chip">{s}</span>
              ))}
            </div>
            <button className="pm-start-btn" onClick={startTest} style={{ background: "#f97316", border: "none" }}>
              <PlayCircle size={18} /> Initialize Assessment Command
            </button>
          </article>
        )}
      </div>
    </section>
  );
}
