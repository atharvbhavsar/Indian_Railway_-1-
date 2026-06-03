# 🚂 Indian Railway Staff Evaluation System (RSES)
## 🛠️ Service Layer Migration & Integration Blueprint

This document details the blueprint for moving the Indian Railway Staff Evaluation System (RSES) from hardcoded local state mock systems to a decoupled, async Service Layer architecture powered by the Supabase PostgreSQL database.

---

# 🏗️ PART 1: SERVICE LAYER DESIGN

The proposed Service Layer introduces a clean separation of concerns, ensuring components and custom state hooks never interact directly with database adapters or mock files. Instead, they call asynchronous service functions that handle validation, API mapping, data flattening, and error recovery.

```
[UI Component / View]
         │
         ▼
  [Custom State Hook]  <── (Handles UI State, Loading, Optimistic Updates)
         │
         ▼
  [Service Layer]      <── (Performs Data Sanitization, Response Mapping)
         │
         ▼
  [Supabase Client]    <── (Executes SQL Queries & Stored Procedures)
         │
         ▼
  [PostgreSQL DB]      <── (Enforces RLS, Foreign Keys, Unique Constraints)
```

## Proposed Service Catalog

| Service Module | Purpose & Scope | Target Database Tables |
| :--- | :--- | :--- |
| **`authService.js`** | User verification, password checks, role-based route locking, and session persistence. | `USERS` joined with `ROLE` |
| **`userService.js`** | Admin and division-wide staff directories, profile searches, role-shifting, and detail updates. | `USERS`, `EMPLOYEE_PROFILE`, `POINTSMAN`, `STATION_MASTER` |
| **`stationService.js`** | Station registries, division groupings, physical locations, and station-wide averages. | `STATION`, `DIVISION` |
| **`assessmentService.js`** | Loading MCQ exams, saving answer histories, logging checklist attempts, and tracking draft reviews. | `ASSESSMENT`, `TEST_ATTEMPT`, `ANSWER_HISTORY`, `QUESTION_BANK` |
| **`safetyService.js`** | Logging physical safety checks, inspector audits, rehab counseling entries, and accident records. | `SAFETY_RECORD`, `MONITORING` |
| **`analyticsService.js`** | Aggregating safety metrics, PME/REF compliance gauges, monthly progress curves, and category counts. | Views over `TEST_ATTEMPT`, `EMPLOYEE_PROFILE`, `SAFETY_RECORD` |

---

# 📊 PART 2: DATA FLOW DIAGRAMS

The following diagrams illustrate the transition from the legacy mock-reliant state flow to the clean async Service Layer.

## 1. Legacy Data Flow (Mock & Local Storage)
```
[Pointsman / SM Module] ──> [useStationMasterState] ──> [localStorage ("ti_sm_list")]
                                   │
                                   └──> [Mutates Local state array] ──> [Re-renders UI]
                                                 (Resets & clears on reload/refresh)
```

## 2. Target Data Flow (Async Service Layer)
```
[Pointsman / SM Module] 
         │ (Invokes action, e.g., Submit Assessment)
         ▼
[useStationMasterState]
         │ (Triggers loading state)
         ▼
[assessmentService.submitTestAttempt(attemptData)]
         │
         ├─── (Validates bounds: score between 0% and 100%)
         │
         ▼
[Supabase Client / API] ──> [PostgreSQL DB] (Runs INSERT transaction)
         │                                        │
         ├─── (Success: Returns db row) <─────────┘
         │
         ▼
[State Hook / Component] ──> (Applies data state changes) ──> [Re-renders UI with saved data]
```

---

# 📋 PART 3: REQUIRED SERVICES REPORT

This report breaks down the migration parameters for each distinct operational module in the RSES codebase.

## 1. AOM / General Administration Module
* **Current Data Flow:**
  * Imports `DASHBOARD_96_STATIONS`, `summaryCards`, `COMPLIANCE`, `initialPendingAssessments`, and `initialApprovedAssessments` from `src/constants/aomMockData.js`.
  * Hook `useAomState.jsx` manipulates local state arrays and saves changes to `localStorage` (e.g., keys `ti_sm_list`, `ti_tm_list`).
* **Recommended Service:** `saDataService.js`, `stationService.js`, `analyticsService.js`.
* **Service Functions Required:**
  * `fetchStations()` - Returns a list of all active stations with metrics.
  * `fetchUsers(roleFilter)` - Queries personnel directories by designation.
  * `getDashboardSummary()` - Fetches overall employee and compliance tallies.
  * `getPendingApprovals()` - Loads assessments awaiting final administrative sign-off.
  * `approveAssessment(assessmentId)` - Submits AOM approval updates.
* **Files To Update:**
  * `src/hooks/useAomState.jsx`
  * `src/SuperAdminModule.jsx`
  * `src/AOmModule.jsx`
* **Migration Complexity:** **High** (Coordinates multiple views, charts, and directories).

## 2. Traffic Inspector (TI) Module
* **Current Data Flow:**
  * Loads `TI_PROFILE`, `INIT_PM_ASSESSMENTS`, `INIT_INSPECTIONS`, and `INIT_COUNSELLING` from `mockTrafficInspectorData.js` and `trafficInspectorConstants.js`.
  * Form submissions append rows directly to local states, which reset on reload.
* **Recommended Service:** `safetyService.js`, `assessmentService.js`, `userService.js`.
* **Service Functions Required:**
  * `getInspectionLogs(stationId)` - Returns TI safety audits.
  * `createInspectionRecord(record)` - Saves a new station inspection log.
  * `getCounsellingLogs(userId)` - Returns staff rehab records.
  * `createCounsellingRecord(record)` - Adds a new counseling entry.
  * `getPendingEvaluations()` - Retrieves pointsmen checklists awaiting sign-off.
  * `signoffAssessment(attemptId, score, remarks)` - Saves TI approval logs.
* **Files To Update:**
  * `src/TrafficInspectorModule.jsx`
  * `src/hooks/useTrafficInspectorState.js`
* **Migration Complexity:** **High** (Manages safety approvals, inspection logs, and rehab trackers).

## 3. Station Master (SM) Module
* **Current Data Flow:**
  * Hydrates state via `initialPointsmen`, `pmAssessmentHistory`, and `initialDrafts` from `mockStationMasterData.js`.
  * Checklist submissions run optimistic edits and save JSON strings to local state lists.
* **Recommended Service:** `userService.js`, `assessmentService.js`.
* **Service Functions Required:**
  * `getStationPointsmen(stationId)` - Lists pointsmen assigned to the SM's station.
  * `getPointsmanDetails(userId)` - Retrieves historical scores and profile.
  * `saveAssessmentDraft(draftData)` - Stores unsubmitted checklist drafts.
  * `submitPointsmanAssessment(checklistData)` - Saves evaluation checklists.
* **Files To Update:**
  * `src/StationMasterModule.jsx`
  * `src/hooks/modules/useStationMasterState.js`
* **Migration Complexity:** **High** (Checkbox evaluations require multi-level validation checks).

## 4. Pointsman Module
* **Current Data Flow:**
  * Imports `pointsmanProfile`, `rawQuestions`, and `initialHistory` from `src/data/mockPointsmanData.js`.
  * The shunting test engine saves scores directly to a local array state.
* **Recommended Service:** `userService.js`, `assessmentService.js`.
* **Service Functions Required:**
  * `getQuestionsByRole(role)` - Loads the MCQ test questions.
  * `submitExamAttempt(attemptData)` - Saves MCQ answers and scores.
  * `getExamHistory(userId)` - Retrieves past certifications and scores.
* **Files To Update:**
  * `src/PointsmanModule.jsx`
* **Migration Complexity:** **Medium** (MCQ state machine requires transaction handling).

## 5. Train Manager (TM) Module
* **Current Data Flow:**
  * Imports `trainManagerProfile`, `rawQuestions`, and `initialHistory` from `mockTMData.js`.
  * Self-assessment exams write locally to memory state.
* **Recommended Service:** `userService.js`, `assessmentService.js`.
* **Service Functions Required:**
  * `getQuestionsByRole("Train Manager")` - Loads TM safety questions.
  * `submitExamAttempt(attemptData)` - Saves results to the database.
* **Files To Update:**
  * `src/TrainManagerModule.jsx`
* **Migration Complexity:** **Medium** (Standard MCQ exam workflow).

## 6. Station Superintendent (SS) Module
* **Current Data Flow:**
  * Imports `INIT_STATIONS`, `INIT_USERS`, and `rawQuestions` from `mockSSData.js`.
* **Recommended Service:** `stationService.js`, `userService.js`, `assessmentService.js`.
* **Service Functions Required:**
  * `getSupervisedStaff(stationId)` - Returns a directory of station staff.
  * `getStationPerformanceMetrics(stationId)` - Retrieves comparative safety compliance averages.
* **Files To Update:**
  * `src/StationSuperintendentModule.jsx`
* **Migration Complexity:** **Medium** (Focused on read-only tracking and comparative charts).

---

# 🚀 PART 4: MIGRATION PLAN

This phased roadmap outlines the tasks required to transition the application to the live database.

```
[ PHASE 1: PRE-REQUISITES ]
  ├── Initialize tables on Supabase
  └── Verify API configuration keys
            │
            ▼
[ PHASE 2: CORE SERVICES ]
  ├── Implement authService, userService, and stationService
  └── Update SuperAdmin directory pages
            │
            ▼
[ PHASE 3: EVALUATION MIGRATION ]
  ├── Seed QUESTION_BANK and ANSWER_HISTORY tables
  └── Transition MCQ exam submit handlers to database calls
            │
            ▼
[ PHASE 4: ANALYTICS & CLEANUP ]
  ├── Replace dashboard summaries with aggregate SQL queries
  └── Safely delete all legacy mock files
```

### 📋 Phase 1: Pre-Requisites & Base Configuration
1. Run `supabase_schema_provisioning.sql` on the Supabase backend.
2. Verify that `.env` includes the necessary keys:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Initialize the Supabase client inside `src/api/supabaseClient.js`.

### 📋 Phase 2: Core Services Integration (Auth, Users, Stations)
1. Implement and test `authService.js` against the `USERS` database records.
2. Wire `saDataService.js` and `userService.js` into the Super Admin module (`SuperAdminModule.jsx`) to enable personnel management.
3. Replace the mock station generator `generate96Stations` with real queries to the `STATION` table.

### 📋 Phase 3: MCQ Exam Engine & Evaluation Workflows
1. Seed the `QUESTION_BANK` database table with the 25 questions defined in the role-specific mock files.
2. Update the MCQ test submit handler in `PointsmanModule`, `StationMasterModule`, and `TrainManagerModule` to send results to `TEST_ATTEMPT` rather than local memory.
3. Replace `localStorage` queues (`ti_sm_list`) with updates to the `status` column of `TEST_ATTEMPT` records.

### 📋 Phase 4: Reports, Analytics & Cleanup
1. Replace static trend arrays (`MONTHLY_TREND`, `COMPLIANCE`) with database views or aggregate queries:
   ```sql
   CREATE VIEW v_safety_trend AS
   SELECT DATE_TRUNC('month', submitted_at) as month, AVG(obtained_marks) as avg_score
   FROM "TEST_ATTEMPT"
   GROUP BY month ORDER BY month;
   ```
2. Conduct end-to-end user flows for all system roles (AOM, TI, SM, Pointsman) to ensure proper data saving and verification.
3. Safely delete the legacy mock files from `src/data/` and `src/constants/` to finalize the backend integration.
