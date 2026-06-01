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

export function getPerformanceSummaryText(totalScore, sections) {
  if (!sections || !sections.length) return "Periodic evaluation completed successfully.";
  const lowestSec  = [...sections].sort((a, b) => a.marks - b.marks)[0];
  const highestSec = [...sections].sort((a, b) => b.marks - a.marks)[0];
  let summary = `Assessment score achieved: ${totalScore}/100 (${totalScore >= 80 ? 'Outstanding Competency' : totalScore >= 50 ? 'Satisfactory Operations' : 'Requires Training'}). `;
  summary += `Demonstrated excellent competency in "${highestSec.title}" scoring ${highestSec.marks}/${highestSec.outOf} marks. `;
  if (lowestSec.marks < lowestSec.outOf) {
    summary += `However, low-scoring markers are observed in "${lowestSec.title}" (${lowestSec.marks}/${lowestSec.outOf}). It is highly recommended to study the Station Working Rules (SWR) and undergo periodic coaching.`;
  } else {
    summary += `Achieved flawless accuracy in all modules. Recommended to maintain this premium standard in daily operations.`;
  }
  return summary;
}


export const formatQuarterPeriod = (periodStr) => {
  if (!periodStr) return "—";
  const match = periodStr.match(/Q([1-4])\s+(\d{4})/i);
  if (!match) return periodStr;
  const quarter = parseInt(match[1], 10);
  const year = match[2];
  switch (quarter) {
    case 1: return `01 Jan ${year} – 31 Mar ${year}`;
    case 2: return `01 Apr ${year} – 30 Jun ${year}`;
    case 3: return `01 Jul ${year} – 30 Sep ${year}`;
    case 4: return `01 Oct ${year} – 31 Dec ${year}`;
    default: return periodStr;
  }
};
