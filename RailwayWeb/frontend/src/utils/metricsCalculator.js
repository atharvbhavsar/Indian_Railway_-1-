export const metricsCalculator = {
  calculateAverageScore: (employees) => {
    if (!employees || employees.length === 0) return 0;
    const totalScore = employees.reduce((sum, emp) => sum + (emp.current_score || 0), 0);
    return Math.round(totalScore / employees.length);
  },

  calculateSafetyCompliance: (employees) => {
    if (!employees || employees.length === 0) return 0;
    const safeEmployees = employees.filter(emp => emp.safety_score >= 80).length;
    return Math.round((safeEmployees / employees.length) * 100);
  },

  aggregateCategoryDistribution: (employees) => {
    let catA = 0, catB = 0, catC = 0, catD = 0;
    employees.forEach(emp => {
      const score = emp.current_score || 0;
      if (score >= 80) catA++;
      else if (score >= 50) catB++;
      else if (score >= 26) catC++;
      else catD++;
    });
    return { catA, catB, catC, catD };
  },

  calculateOverallRiskLevel: (employees) => {
    if (!employees || employees.length === 0) return "Unknown";
    const compliance = metricsCalculator.calculateSafetyCompliance(employees);
    if (compliance >= 90) return "Low";
    if (compliance >= 75) return "Medium";
    return "High";
  }
};
