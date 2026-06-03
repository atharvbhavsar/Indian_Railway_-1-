# 🚂 Indian Railway Staff Evaluation System (RSES)
## ✅ Approval Workflow Module Implementation Report

This document outlines the complete integration strategy for migrating the RSES multi-tier Approval and Review Workflows to the Supabase database. **The established business workflows strictly remain unchanged.**

---

# 🔄 1. WORKFLOW VALIDATION REPORT

The RSES implements a strict chain of command for safety assessments. Based on the finalized project requirements, the backend explicitly supports the following validation chains:

*   **Pointsman (PM) Evaluation:** `PM` takes test $\rightarrow$ `SM` conducts checklist $\rightarrow$ `TI` approves $\rightarrow$ `AOM` reviews.
*   **Station Master (SM) Evaluation:** `SM` takes test $\rightarrow$ `TI` approves $\rightarrow$ `AOM` reviews.
*   **Train Manager (TM) & Station Superintendent (SS) Evaluation:** `TM`/`SS` takes test $\rightarrow$ `TI` approves $\rightarrow$ `AOM` reviews.
*   **Traffic Inspector (TI) Evaluation:** `TI` takes test $\rightarrow$ `AOM` reviews directly.

### Relational Representation
*   **Approval Stage:** Triggers an `INSERT` into the `APPROVAL` table, referencing the `assessment_id`. The parent `ASSESSMENT.status` is patched from `'Pending'` to `'Approved'`.
*   **Review Stage:** Triggers an `INSERT` into the `REVIEW` table, directly referencing the previous `APPROVAL.approval_id`.

---

# 📋 2. APPROVAL MODULE PLAN

The module is isolated into the `approvalService.js` client to handle role-aware queueing and relational sign-offs.

### Service Operations Implemented:
1.  `getPendingSignoffs(roleName, userId)`:
    *   If called by a **Traffic Inspector**, it fetches assessments where `status = 'Pending'`.
    *   If called by an **AOM**, it fetches assessments where `status = 'Approved'`, meaning they await the final AOM review.
2.  `submitApproval(assessmentId, approvedByUserId, remarks, actionStatus)`: 
    *   Inserts the TI's `APPROVAL` row and updates the `ASSESSMENT.status`.
3.  `submitReview(approvalId, reviewedByUserId, remarks)`: 
    *   Inserts the AOM's `REVIEW` row, establishing the final link in the audit chain.
4.  `getApprovalHistory(assessmentId)`: 
    *   Executes a deep nested join (`APPROVAL` $\rightarrow$ `REVIEW` $\rightarrow$ `USERS`) to render the full chronological audit trail on the candidate's history page.

---

# 🚀 3. SUPABASE INTEGRATION STRATEGY

To integrate without disrupting the existing React views:

1.  **Component Hydration:** Update `TrafficInspectorModule.jsx` and `AOmModule.jsx` to execute `getPendingSignoffs(user.role)` inside a `useEffect` hook, replacing imports of legacy pending arrays (e.g., `INIT_PM_ASSESSMENTS`).
2.  **Fallback Mechanism:** Since the UI expects flat objects, if Supabase is offline (or `isSupabaseConfigured === false`), the service immediately yields `null`. The React hook must intercept this and load the legacy JSON to keep development unblocked.
3.  **Handling Submissions:** When a TI clicks "Approve" in the modal, the button calls `submitApproval()`. Upon resolving `true`, the React state should immediately `.filter()` the approved assessment out of the local pending queue to save a redundant network refresh.

---

# 🛡️ 4. SECURITY DESIGN

Because approvals dictate employee fitness and safety certifications, strict database-level security must be enforced.

### Row-Level Security (RLS) Policies Required
*   **Write Access to `APPROVAL`:** Only users whose `ROLE` resolves to `'Traffic Inspector'` or `'Station Master'` can insert rows into this table.
*   **Write Access to `REVIEW`:** Only users whose `ROLE` resolves to `'AOM/General'` or `'Super Admin'` can insert rows into this table.
*   **State Locking:** A PostgreSQL Database Trigger should ideally be implemented to reject any `UPDATE` statements to a `TEST_ATTEMPT` or `ANSWER_HISTORY` row if the parent `ASSESSMENT.status` is `'Approved'`.

---

# 🧪 5. TESTING STRATEGY

Before fully migrating off the mock JSON flows, QA must validate the following pipeline in staging:

1.  [ ] **TI Queue Population:** Ensure `getPendingSignoffs('Traffic Inspector')` accurately retrieves a newly submitted PM assessment (Status: 'Pending').
2.  [ ] **Approval Transaction:** Ensure `submitApproval` successfully creates the `APPROVAL` row and correctly updates the `ASSESSMENT` status to 'Approved' in one logical motion.
3.  [ ] **AOM Queue Escalation:** Ensure that exactly after the TI approval, the AOM's dashboard accurately detects the newly 'Approved' assessment using `getPendingSignoffs('AOM/General')`.
4.  [ ] **AOM Review Linkage:** Ensure `submitReview` accurately maps its `approval_id` foreign key to the correct TI's signature row.
5.  [ ] **Audit Trail Render:** Ensure `getApprovalHistory()` accurately parses the nested PostgreSQL joins and doesn't throw `undefined` errors when mapped over React list components.
