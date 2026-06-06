/**
 * 🚂 RSES TRAFFIC INSPECTOR UTILITIES
 * Pure JavaScript utility functions for operational checks, calculations, and formatters.
 */

export const getCat = (score) => {
  return score >= 80 ? "A" : score >= 50 ? "B" : score >= 26 ? "C" : "D";
};

export const getUserRisk = (user) => {
  return user.pmeStatus === "Overdue" || user.refStatus === "Expired" || user.score < 50 
    ? "High" 
    : user.score >= 80 ? "Low" : "Medium";
};

export const computeSMScore = (form, criteriaConfig) => {
  let total = 0;
  criteriaConfig.forEach(c => {
    if (form[c.key]) {
      form[c.key]?.forEach(v => { if (v === "Yes") total += c.weight; });
    }
  });
  const km = Math.min(parseInt(form.knowledgeMarks) || 0, 25);
  return { ynScore: Math.min(total, 75), knowledge: km, total: Math.min(total, 75) + km };
};

export const computeTMScore = (form, criteriaConfig) => {
  let total = 0;
  criteriaConfig.forEach(c => {
    if (form[c.key]) {
      form[c.key]?.forEach(v => { if (v === "Yes") total += c.weight; });
    }
  });
  const km = Math.min(parseInt(form.knowledgeMarks) || 0, 25);
  return { ynScore: Math.min(total, 75), knowledge: km, total: Math.min(total, 75) + km };
};

export const computeSSScore = (form, criteriaConfig) => {
  let total = 0;
  criteriaConfig.forEach(c => {
    if (form[c.key]) {
      form[c.key]?.forEach(v => { if (v === "Yes") total += c.weight; });
    }
  });
  const km = Math.min(parseInt(form.knowledgeMarks) || 0, 25);
  return { ynScore: Math.min(total, 75), knowledge: km, total: Math.min(total, 75) + km };
};

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

export const getPerformanceSummaryText = (score, sections) => {
  if (!sections || sections.length === 0) return "Self-compliance check completed successfully.";
  const lowestSec = [...sections].sort((a, b) => a.marks - b.marks)[0];
  const highestSec = [...sections].sort((a, b) => b.marks - a.marks)[0];

  let summary = `Assessment score achieved: ${score}/100 (${score >= 80 ? 'Outstanding Competency' : score >= 50 ? 'Satisfactory Operations' : 'Requires Training'}). `;
  summary += `Demonstrated excellent compliance in "${highestSec.title}" scoring ${highestSec.marks}/${highestSec.outOf} marks. `;
  if (lowestSec.marks < lowestSec.outOf) {
    summary += `However, some area of improvement is observed in "${lowestSec.title}" (${lowestSec.marks}/${lowestSec.outOf}). It is recommended to review the standard operating manuals and safety bulletins for this section.`;
  } else {
    summary += `Achieved perfect scores across all compliance parameters.`;
  }
  return summary;
};
