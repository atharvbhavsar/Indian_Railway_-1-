export function getCat(score) {
  if (score >= 80) return "A";
  if (score >= 50) return "B";
  if (score >= 26) return "C";
  return "D";
}


export function riskLevel(pm) {
  if (pm.safetyScore < 60 || pm.lastScore < 50)  return "High";
  if (pm.safetyScore < 75 || pm.lastScore < 65)  return "Medium";
  return "Low";
}

export function getCatColor(cat) {
  if (cat === "A") return "#16a34a";
  if (cat === "B") return "#2563eb";
  if (cat === "C") return "#d97706";
  return "#dc2626";
}

export function getCatBg(cat) {
  if (cat === "A") return "#f0fdf4";
  if (cat === "B") return "#eff6ff";
  if (cat === "C") return "#fffbeb";
  return "#fef2f2";
}

export function riskColor(risk) {
  if (risk === "Low") return "#16a34a";
  if (risk === "Medium") return "#f59e0b";
  return "#ef4444";
}

export function getPerformanceSummaryText(totalScore, sections, t = (x) => x) {
  if (!sections || !sections.length) return t("Periodic evaluation completed successfully.");
  const lowestSec  = [...sections].sort((a, b) => a.marks - b.marks)[0];
  const highestSec = [...sections].sort((a, b) => b.marks - a.marks)[0];
  
  const isCBT = sections.some(s => s.outOf === 25 || s.outOf === 5);
  if (isCBT) {
    const percentage = Math.round((totalScore / 25) * 100);
    let summary = `${t("MCQ Assessment score achieved:")} ${totalScore}/25 (${percentage}%). `;
    summary += `${t("Demonstrated excellent competency in")} "${t(highestSec.title)}" ${t("scoring")} ${highestSec.marks}/${highestSec.outOf} ${t("marks")}. `;
    if (lowestSec.marks < lowestSec.outOf) {
      summary += `${t("However, minor gaps are observed in")} "${t(lowestSec.title)}" (${lowestSec.marks}/${lowestSec.outOf}). ${t("Reviewing these areas will help prepare for official Traffic Inspector/Station Supervisor field evaluation.")}`;
    } else {
      summary += t("Achieved flawless accuracy in all MCQ sections. Recommended to maintain this standard.");
    }
    return summary;
  }

  const competencyText = totalScore >= 80 ? t('Outstanding Competency') : totalScore >= 50 ? t('Satisfactory Operations') : t('Requires Training');
  let summary = `${t("Assessment score achieved:")} ${totalScore}/100 (${competencyText}). `;
  summary += `${t("Demonstrated excellent competency in")} "${t(highestSec.title)}" ${t("scoring")} ${highestSec.marks}/${highestSec.outOf} ${t("marks")}. `;
  if (lowestSec.marks < lowestSec.outOf) {
    summary += `${t("However, low-scoring markers are observed in")} "${t(lowestSec.title)}" (${lowestSec.marks}/${lowestSec.outOf}). ${t("It is highly recommended to study the Station Working Rules (SWR) and undergo periodic coaching.")}`;
  } else {
    summary += t("Achieved flawless accuracy in all modules. Recommended to maintain this premium standard in daily operations.");
  }
  return summary;
}


export const formatQuarterPeriod = (periodStr, t = (x) => x) => {
  if (!periodStr) return "—";
  const match = periodStr.match(/Q([1-4])\s+(\d{4})/i);
  if (!match) return t(periodStr);
  const quarter = parseInt(match[1], 10);
  const year = match[2];
  switch (quarter) {
    case 1: return `01 ${t("Jan")} ${year} – 31 ${t("Mar")} ${year}`;
    case 2: return `01 ${t("Apr")} ${year} – 30 ${t("Jun")} ${year}`;
    case 3: return `01 ${t("Jul")} ${year} – 30 ${t("Sep")} ${year}`;
    case 4: return `01 ${t("Oct")} ${year} – 31 ${t("Dec")} ${year}`;
    default: return t(periodStr);
  }
};
