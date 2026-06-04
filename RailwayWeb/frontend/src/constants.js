/**
 * Indian Railway Staff Evaluation System (RSES) - Centralized Constants
 * Consolidates operational schemas and grading rules to enforce DRY principles.
 */

// 1. Authorized Security Roles
export const ROLES = {
  SUPER_ADMIN: "Super Admin",
  AOM: "AOM/General",
  TRAFFIC_INSPECTOR: "Traffic Inspector",
  STATION_SUPERINTENDENT: "Station Superintendent",
  STATION_SUPERVISOR: "Station Supervisor",
  TRAIN_MANAGER: "Train Manager",
  STATION_MASTER: "Station Master",
  POINTSMAN: "Pointsman"
};

// 2. Operational Shunting Shift Configurations
export const SHIFTS = {
  MORNING: "Morning Shift (06:00 - 14:00)",
  EVENING: "Evening Shift (14:00 - 22:00)",
  NIGHT: "Night Shift (22:00 - 06:00)"
};

// 3. Competency Assessment Grading Matrix
export const GRADES = {
  A: { id: "A", label: "Category A", color: "#16a34a", bg: "#f0fdf4", minScore: 80, desc: "Mastery - Active Duty Cleared" },
  B: { id: "B", label: "Category B", color: "#2563eb", bg: "#eff6ff", minScore: 50, desc: "Satisfactory - Under Supervision" },
  C: { id: "C", label: "Category C", color: "#d97706", bg: "#fffbeb", minScore: 26, desc: "Needs Training - Restricted Yard Duty" },
  D: { id: "D", label: "Category D", color: "#dc2626", bg: "#fef2f2", minScore: 0,  desc: "Suspended - Overdue Clearance" }
};

/**
 * Derives the letter grade category based on a numerical score.
 * @param {number} score 
 * @returns {string} Category string ('A', 'B', 'C', 'D')
 */
export function getCategory(score) {
  if (score === null || score === undefined) return "—";
  if (score >= GRADES.A.minScore) return "A";
  if (score >= GRADES.B.minScore) return "B";
  if (score >= GRADES.C.minScore) return "C";
  return "D";
}

/**
 * Returns color hex code associated with a grade category.
 * @param {string} category 
 * @returns {string} Hex color
 */
export function getCategoryColor(category) {
  return GRADES[category]?.color || "#6b7280";
}

/**
 * Returns background color hex code associated with a grade category.
 * @param {string} category 
 * @returns {string} Hex background color
 */
export function getCategoryBg(category) {
  return GRADES[category]?.bg || "#f3f4f6";
}
