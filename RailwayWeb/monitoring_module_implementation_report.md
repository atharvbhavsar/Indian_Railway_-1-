# 🚂 Indian Railway Staff Evaluation System (RSES)
## 🚨 Safety & Monitoring Module Implementation Report

This document outlines the complete integration strategy for migrating the RSES physical monitoring logs (PME, Refresher courses, Counseling, and Inspections) to the live Supabase database. **No UI components were modified, and mock data has been preserved as a safe fallback.**

---

# 📋 1. MONITORING MODULE PLAN

The Monitoring Module captures off-screen, real-world events that impact an employee's fitness for duty. The implementation is broken into four unified domains handled by a single service:

1.  **Risk Monitoring:** Global assignment of Risk Categories (Low, Medium, High).
2.  **Periodical Medical Examination (PME):** Tracking of physical fitness exams and their due dates.
3.  **Refresher Training (REF):** Tracking mandatory educational course attendance and expiration.
4.  **Counseling & Inspections:** Field notes logged by Traffic Inspectors against specific personnel or station yards.

---

# 🔄 2. DATA MAPPING REPORT

To translate the user's specific module requests into the finalized ERD (which was optimized for relational integrity), the following exact table mappings were implemented:

| Requested Module | Finalized Supabase Table | Distinguishing Filter / Constraint |
| :--- | :--- | :--- |
| **Monitoring** | `MONITORING` | Upserts based on `user_id` to maintain one active risk state per employee. |
| **PME** | `PME_RECORD` | Uses `pme_status` enum (`Fit`, `Unfit`, `Overdue`). |
| **REF** | `TRAINING_RECORD` | Uses `status` enum (`Cleared`, `Overdue`, `Exempted`). |
| **Counseling** | `SAFETY_RECORD` | Specifically filters where `incident_type = 'Counseling'`. |
| **Inspection** | `SAFETY_RECORD` | Specifically filters where `incident_type = 'Inspection'`. |

---

# ⚙️ 3. SERVICE LAYER DESIGN

The `monitoringService.js` was fully designed to orchestrate the read/write logic for these discrete tables.

### Key Implemented Operations:
*   `updateMonitoringStatus(userId, statusData)`: Employs a Supabase `upsert` mechanism so that if a user already has an active risk profile, it merely patches the `risk_level` instead of cluttering the DB with duplicates.
*   `getPmeHistory(userId)` & `logPmeRecord()`: Exclusively targets the `PME_RECORD` table, automatically sorting historical medical records by the `pme_due_date`.
*   `getRefresherHistory(userId)` & `logRefresherTraining()`: Targets the `TRAINING_RECORD` table, isolating course expiration dates for UI compliance rings.
*   `getSafetyRecords(userId, incidentType)`: A dynamic, polymorphic fetcher. It targets the `SAFETY_RECORD` table and allows the frontend to optionally filter for only `'Counseling'` or `'Inspection'` logs via query parameters.

---

# 🛡️ 4. SECURITY RECOMMENDATIONS

Safety & Medical records are strictly sensitive personnel data. The Supabase implementation must enforce these Row Level Security (RLS) rules:

1.  **Read Permissions:** Employees may `SELECT` their own `PME_RECORD` and `TRAINING_RECORD` to check compliance. Station Masters and Traffic Inspectors may view the records of staff in their direct jurisdiction.
2.  **Write Permissions (PME & REF):** **Strictly limited** to `AOM/General` and `Super Admin`. Ground-level operational staff should never be able to alter medical fitness expiration dates.
3.  **Write Permissions (Counseling & Inspections):** Limited to `Traffic Inspector` roles. The `user_id` embedded in the `SAFETY_RECORD` log must accurately track which officer generated the report to prevent forged audits.
4.  **Enum Locking:** Supabase `CHECK` constraints are already baked into the schema (e.g. `pme_status IN ('Fit', 'Unfit')`) to prevent frontend bugs from injecting corrupted medical states.

---

# 🧪 5. TESTING STRATEGY

Before removing the legacy mock datasets (e.g., `INIT_INSPECTIONS` or `INIT_COUNSELLING` arrays in `mockTrafficInspectorData.js`), QA must validate the staging pipeline:

1.  [ ] **Polymorphic Fetching:** Verify that calling `monitoringService.getSafetyRecords(id, 'Counseling')` strictly omits rows logged as 'Inspection' or 'Accident'.
2.  [ ] **Risk Upsert Check:** Verify that calling `updateMonitoringStatus` for an existing user correctly patches their `risk_level` rather than crashing on a Primary Key unique violation.
3.  [ ] **Medical Timeline Sort:** Confirm that `getPmeHistory()` correctly displays the most recent/upcoming medical due dates at the top of the UI list.
4.  [ ] **Role Denial:** Attempt to call `logPmeRecord()` using a test account logged in as a 'Pointsman'. Ensure Supabase RLS correctly rejects the HTTP `POST` request with a `403` or `401`.
