# 🚂 Indian Railway Staff Evaluation System (RSES)
## 🧹 Safe Mock-Data Removal Strategy & Transition Plan

This document provides a highly structured strategy for safely deprecating and removing hardcoded mock datasets from the RSES frontend codebase. **No files should be deleted until the strict transition criteria are met.**

---

# 📑 1. DEPENDENCY VERIFICATION REPORT

This report details the mock files, their dependencies, and which services must be successfully wired and tested before the mock files can be safely removed.

### 1. `src/data/mockPointsmanData.js`
*   **Pages Depending on It:** `PointsmanModule.jsx`
*   **Contained Datasets:** `pointsmanProfile`, `rawQuestions`, `initialHistory`.
*   **Services That Must Be Connected First:** `userService.getUserProfile`, `assessmentService.getQuestionBank`, `assessmentService.getTestHistory`.
*   **Retain or Remove:** **Remove** entirely once services are active.

### 2. `src/data/mockStationMasterData.js`
*   **Pages Depending on It:** `StationMasterModule.jsx`
*   **Contained Datasets:** `smProfile`, `initialPointsmen`, `pmAssessmentHistory`, `initialDrafts`, `smTestQuestions`, `smAssessmentHistory`.
*   **Services That Must Be Connected First:** `userService.getStationStaff`, `assessmentService.getPendingSignoffs`.
*   **Retain or Remove:** **Remove** entirely once services are active.

### 3. `src/data/mockTrafficInspectorData.js` & `src/constants/trafficInspectorConstants.js`
*   **Pages Depending on It:** `TrafficInspectorModule.jsx`
*   **Contained Datasets:** `TI_PROFILE`, `INIT_PM_ASSESSMENTS`, `INIT_INSPECTIONS`, `INIT_COUNSELLING`, `TI_QUIZ`.
*   **Services That Must Be Connected First:** `safetyService.getInspectionLogs`, `safetyService.getCounsellingLogs`, `approvalService.getPendingApprovals`.
*   **Retain or Remove:** **Remove** entirely once services are active.

### 4. `src/data/mockTMData.js` & `src/data/mockSSData.js`
*   **Pages Depending on It:** `TrainManagerModule.jsx`, `StationSuperintendentModule.jsx`.
*   **Contained Datasets:** `trainManagerProfile`, `INIT_STATIONS`, `INIT_USERS`, `rawQuestions`, `initialHistory`.
*   **Services That Must Be Connected First:** `userService.getUserProfile`, `stationService.getStations`.
*   **Retain or Remove:** **Remove** entirely once services are active.

### 5. `src/constants/aomMockData.js`
*   **Pages Depending on It:** `AOmModule.jsx`, `SuperAdminModule.jsx`.
*   **Contained Datasets:** `MONTHLY_TREND`, `ASSESSMENT_MONTHLY`, `COMPLIANCE`, `DASHBOARD_96_STATIONS`, `summaryCards`, `aomReadOnlyProfile`.
*   **Services That Must Be Connected First:** `analyticsService.getDashboardMetrics`, `stationService.getStations`.
*   **Retain or Remove:** **Remove** entirely.

### 6. `src/constants/mockData.jsx` & `src/constants.js`
*   **Pages Depending on It:** Multiple chart components, sidebar navigations, and global color themes.
*   **Contained Datasets:** `MONTHLY_TREND`, `COMPLIANCE` (Mock Data) AND `CAT_COLORS`, `RISK_COLORS`, `sidebarItems`, `ROLES`, `GRADES` (UI Configurations).
*   **Services That Must Be Connected First:** `analyticsService` (for the data).
*   **Retain or Remove:** **PARTIAL REMOVAL**. 
    *   *Action:* Delete all mock arrays (like `stationProgressData`, `categoryData`). 
    *   *Action:* **Retain** the UI constants (`CAT_COLORS`, `sidebarItems`, `ROLES`). These should be extracted to a permanent `src/constants/theme.js` or remain in `constants.js` before `mockData.jsx` is deleted.

---

# 🚥 2. SAFE DELETION ORDER

To prevent the frontend from breaking or throwing unresolved import reference errors, follow this exact deletion sequence.

1.  **Extract Constants (Pre-Deletion):** Move all UI styling objects (`CAT_COLORS`, `sidebarItems`, `STATUS_COLORS`) from `mockData.jsx` and `aomMockData.js` into a clean, unified `src/constants/config.js` file. Update all component imports to point to this new config file.
2.  **Phase 1 Deletions (Role Exam Engines):** Delete `mockPointsmanData.js`, `mockTMData.js`, and `mockSSData.js`. (These are isolated to single views and pose the lowest risk of cross-module crashes).
3.  **Phase 2 Deletions (Middle Management Workflows):** Delete `mockStationMasterData.js` and `mockTrafficInspectorData.js` once multi-tiered approvals are verified.
4.  **Phase 3 Deletions (Global State & Dashboards):** Delete `aomMockData.js`. (This file feeds multiple heavy charts and dashboards, requiring the longest QA validation).
5.  **Phase 4 Deletions (Cleanup):** Delete `mockData.jsx` entirely, once all static configurations have been safely relocated.

---

# ✅ 3. MOCK DATA REMOVAL CHECKLIST

Before executing `rm` on any of the mock files, ensure all four of the following prerequisites are met for the respective module:

- [ ] **1. Supabase Tables Exist:** The target tables (e.g. `TEST_ATTEMPT`, `QUESTION_BANK`) are fully provisioned in the remote database.
- [ ] **2. Services Exist:** The asynchronous service function (e.g. `assessmentService.getQuestionBank()`) is written, exported, and properly handles Supabase query exceptions.
- [ ] **3. Component Re-Wired:** The React components and custom hooks no longer `import` the mock data array. Instead, they use a `useEffect` hook to call the service layer and populate local React `useState`.
- [ ] **4. Data Loads Successfully:** Network logs confirm a `200 OK` response from the Supabase API, and the data renders correctly in the UI.
- [ ] **5. UI Validation Completed:** Interactions (like clicking a table row or rendering a pie chart) have been tested against the live backend payload to ensure no `undefined` property crashes occur (e.g., verifying `camelCase` vs `snake_case` properties).

---

# 🚀 4. FINAL BACKEND TRANSITION PLAN

This plan bridges the gap between today's frontend mock state and the fully integrated backend state.

### Step 1: The Parallel Run Strategy
For 1-2 weeks, run the application in a **Hybrid Mode** using the `isSupabaseConfigured` feature toggle (already present in the codebase). 
*   **Behavior:** If the environment variables are set, the app queries the database via the Service Layer. If the environment variables are absent or the fetch fails, it falls back to parsing the imported mock data.
*   **Benefit:** This prevents blocking frontend UI/UX development while the backend schema is finalized.

### Step 2: The Refactoring Sprint
*   **Task:** Remove the fallback conditionals inside the custom hooks (`useAomState.jsx`, `useStationMasterState.js`).
*   **Task:** Force the React application to rely entirely on the Service Layer Promises.
*   **Task:** Identify and fix all UI crashes caused by missing or malformed database fields.

### Step 3: Deprecation & Purge
*   **Task:** Once QA confirms all modules load and mutate data correctly against a staging Supabase instance, execute the **Safe Deletion Order** detailed in Section 2.
*   **Task:** Run your bundle analyzer (e.g., Vite/Webpack build logs) to ensure overall bundle size drops significantly after the massive mock JSON arrays are purged.
