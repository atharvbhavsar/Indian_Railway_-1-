# 🚂 Indian Railway Staff Evaluation System (RSES)
## 📝 Assessment Module Implementation & Migration Report

This document outlines the complete integration strategy for migrating the RSES Assessment Module (including the Shunting Checklist and MCQ Engines) from hardcoded mock arrays to the live Supabase database. **No UI components were modified, and mock data has been preserved as a safe fallback.**

---

# 📋 1. ASSESSMENT INTEGRATION PLAN

The Assessment engine is the core transactional module of the RSES system. The implementation phases are structured to ensure that no answers or score logs are orphaned during submission.

1.  **Service Layer Replacement:** Develop and export the asynchronous API functions via `assessmentService.js`.
2.  **State Hydration:** Modify the React quiz engines (`PointsmanModule.jsx`, `TrainManagerModule.jsx`) to execute `assessmentService.getQuestionBank(roleId)` on mount. If the query fails, fallback to iterating over the legacy array outputs (e.g., `mockPointsmanData.rawQuestions`).
3.  **Transactional Submissions:** Ensure that when a test concludes, the application creates a master `TEST_ATTEMPT` record and simultaneously bulk-inserts the individual selected options into `ANSWER_HISTORY` via `assessmentService.submitTestAttempt()`.
4.  **UI Verification:** Validate the "Assessment History" dashboards ensuring that the `ASSESSMENT`, `TEST_ATTEMPT`, and `ANSWER_HISTORY` objects render perfectly in the accordion dropdowns without breaking `camelCase` expectations.

---

# ⚙️ 2. SERVICE LAYER ARCHITECTURE

The `assessmentService.js` file has been fully rebuilt to support the complex relationships of exams, schedules, and answer histories.

### Implemented Operations:
*   `getQuestionBank(roleId)`: Retrieves active MCQ safety questions specifically curated for the given employee's role (Pointsman vs Train Manager).
*   `createAssessment(assessmentData)`: Provisions a master evaluation schedule or a "Draft" checklist that a Station Master can conduct.
*   `submitTestAttempt(attemptData, answers)`: A heavy transactional method. It inserts the final score payload into `TEST_ATTEMPT`, bulk inserts the detailed choices into `ANSWER_HISTORY`, and patches the parent `ASSESSMENT` status to `'Pending'`.
*   `getTestHistory(userId)`: Fetches the chronological history of all tests an employee has taken by performing an inner join onto the parent `ASSESSMENT` details.
*   `getAssessmentDetails(attemptId)`: Retrieves the granular details of a specific test run, joining all selected answers and comparing them to the `QUESTION_BANK`.
*   `getAssessmentAnalytics(userId)`: Dynamically calculates the employee's average scores and trendline over time (designed to map to future SQL Database Views).

---

# 🔄 3. DATA MAPPING REPORT

To shift from the legacy mock arrays (e.g., `initialHistory` in `mockPointsmanData.js`) to the normalized Supabase schema, the following mappings apply:

| Legacy Mock Field | Target Supabase Field | Source Table |
| :--- | :--- | :--- |
| `id` | `attempt_id` | `TEST_ATTEMPT` |
| `type` | `assessment_type` | `ASSESSMENT` (relational join needed) |
| `date` | `started_at` | `TEST_ATTEMPT` |
| `score` | `obtained_marks` | `TEST_ATTEMPT` |
| `status` | `status` | `ASSESSMENT` (relational join needed) |
| `evaluator` | `conducted_by` | `ASSESSMENT` |
| *(Answers Array)* | `selected_option`, `is_correct` | `ANSWER_HISTORY` (relational bulk insert required) |
| *(Questions Array)*| `question_text`, `correct_option` | `QUESTION_BANK` |

**Missing Constraints Addressed:**
Previously, mock answers were stored flatly inside test objects. To migrate this, we have fully normalized the schema, creating the `ANSWER_HISTORY` table. `submitTestAttempt()` now executes a bulk array `.insert()` to this table immediately after establishing the parent attempt, ensuring granular auditing for every safety option chosen.

---

# 🛡️ 4. ASSESSMENT WORKFLOW VALIDATION

The following established RSES workflows are explicitly preserved by this integration:
1.  **Draft Checklists:** Station Masters can create checklists that remain hidden from supervisors by saving them with `status: 'Draft'`.
2.  **Submission Locks:** Once `submitTestAttempt()` fires, the parent `ASSESSMENT` flips to `status: 'Pending'`, triggering it to appear in the Traffic Inspector's approval queue.
3.  **Category Thresholds:** The frontend continues to dictate grade classifications (A, B, C, D) before payload submission, though the database uses a strict `CHECK` constraint to ensure no invalid grades are written.

---

# 🧪 5. TESTING STRATEGY

Before stripping the mock constants, the QA team must perform the following validation pass on a connected staging environment:

1.  [ ] **Question Loading:** The MCQ exam engine successfully populates exactly 25 questions dynamically from `getQuestionBank()`.
2.  [ ] **Draft Creation:** Station Masters can successfully save a checklist locally to the DB as 'Draft' using `createAssessment()`.
3.  [ ] **Transactional Integrity:** Submitting a completed test correctly creates 1 row in `TEST_ATTEMPT` and 25 rows in `ANSWER_HISTORY`.
4.  [ ] **State Locking:** A submitted attempt correctly updates the parent assessment to 'Pending', locking it from further edits by the candidate.
5.  [ ] **History Render:** The user's historical dashboard correctly resolves the nested relational arrays returned by `getAssessmentDetails()` without breaking on `undefined` property paths (e.g., rendering `data.ASSESSMENT.status`).
