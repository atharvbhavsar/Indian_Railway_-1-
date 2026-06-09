import React from "react";
import { Lock, CheckCircle2, ClipboardList, PlayCircle } from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";

export function PointsmanCurrentTestsPage({
  employeeId,
  currentTest,
  handleReattempt,
  startTest
}) {
  const { t } = useLanguage();
  const isTestActivated = localStorage.getItem("pm_test_activated_" + employeeId) === "true";

  return (
    <section className="pm-page-card">
      <div className="pm-page-header">
        <h2>{t("Assigned Competency Trials")}</h2>
      </div>
      <p className="pm-subtitle">{t("Mandatory periodically scheduled evaluation of SWR Rules and points shunting safety clearance.")}</p>

      <div className="pm-current-tests">
        {!isTestActivated ? (
          <div className="pm-no-test-banner" style={{ background: "#f8fafc", border: "2px dashed #cbd5e1" }}>
            <Lock size={40} color="#64748b" />
            <h3>{t("Competency Exam Locked")}</h3>
            <p>{t("Your periodic safety and competency evaluation is locked. Please request your Station Master to activate your test so you can attempt it.")}</p>
          </div>
        ) : !currentTest ? (
          <div className="pm-no-test-banner">
            <CheckCircle2 size={40} color="#16a34a" />
            <h3>{t("All caught up!")}</h3>
            <p>{t("Your periodic evaluation for April 2026 is fully completed. Grade successfully filed to Station Supervisor records.")}</p>
            
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
              {t("Reappear for CBT Exam (Dev Mode)")}
            </button>
          </div>
        ) : (
          <article className="pm-test-card-premium">
            <div className="pm-tc-header">
              <ClipboardList size={22} color="#f97316" />
              <div>
                <h3>{t(currentTest.name)}</h3>
                <p>{t("Scheduled Period:")} <strong>{t(currentTest.period)}</strong></p>
              </div>
            </div>
            <div className="pm-tc-meta-row">
              <span className="pm-mini-pill">{t("📝 25 Compulsory Questions")}</span>
              <span className="pm-mini-pill">{t("⏱️ Unlimited Time (No timer)")}</span>
              <span className="pm-mini-pill">{t("☑️ MCQ Single Key Option")}</span>
              <span className="pm-mini-pill">{t("🔒 Answering All Required to Submit")}</span>
            </div>
            <div className="pm-tc-sections-preview">
              {["Signal Rules", "Track Handling", "Communication", "Safety Response", "Operational Judgement"].map(s => (
                <span key={s} className="pm-tc-section-chip">{t(s)}</span>
              ))}
            </div>
            <button className="pm-start-btn" onClick={startTest} style={{ background: "#f97316", border: "none" }}>
              <PlayCircle size={18} /> {t("Initialize Assessment Command")}
            </button>
          </article>
        )}
      </div>
    </section>
  );
}
