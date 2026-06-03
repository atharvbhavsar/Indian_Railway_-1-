# 🚂 Indian Railway Staff Evaluation System (RSES)
## 🛠️ Supabase Service Architecture & Service Functions Blueprint

This document defines the complete client-side service architecture for the Indian Railway Staff Evaluation System (RSES) when integrating with Supabase. It outlines service structures, function signatures, input/output models, validation schemas, and client-side error handling policies.

---

# 📁 1. SERVICE STRUCTURE

The frontend service layer is structured under `src/services/` to isolate all database operations. Each file acts as a logical namespace containing stateless service functions.

```
src/services/
 ├── authService.js         # Authentication, HRMS login, and sessions
 ├── userService.js         # Employee profiles, hierarchies, and rosters
 ├── stationService.js      # Stations, divisions, and yard capacities
 ├── assessmentService.js   # MCQ exam engines, answer histories, and checklists
 ├── safetyService.js       # Incident reports, counseling logs, and audits
 ├── approvalService.js     # TI approvals, AOM reviews, and multi-tier sign-offs
 ├── notificationService.js # Safety alerts, overdue PME notifications
 └── reportService.js       # PDF generation lists and compliance logs
```

---

# ⚙️ 2. SERVICE FUNCTIONS

Below are the key service function declarations, including parameters and database mappings.

```javascript
import { supabase } from "../api/supabaseClient";

// =========================================================================
-- A. USER SERVICE (userService.js)
// =========================================================================

export const userService = {
  /**
   * Fetches full details for a user profile by HRMS ID.
   * @param {string} hrmsId
   * @returns {Promise<UserProfile | null>}
   */
  async getUserProfile(hrmsId) {
    const { data, error } = await supabase
      .from("USERS")
      .select(`
        user_id, hrms_id, full_name, email, mobile_no, status,
        ROLE (role_name),
        EMPLOYEE_PROFILE (dob, joining_date, qualification, address, blood_group),
        MONITORING (monitoring_status, risk_level, remarks)
      `)
      .eq("hrms_id", hrmsId)
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Creates a user in both USERS and ROLE subtype tables.
   * @param {CreateUserInput} input
   */
  async createUser(input) {
    // 1. Insert into core USERS table
    const { data: user, error: userError } = await supabase
      .from("USERS")
      .insert({
        role_id: input.role_id,
        hrms_id: input.hrms_id,
        full_name: input.full_name,
        email: input.email,
        mobile_no: input.mobile_no,
        username: input.username,
        password: input.password
      })
      .select()
      .single();
    if (userError) throw userError;

    // 2. Insert into the role subtype table (e.g. POINTSMAN)
    if (input.subtype_table) {
      const { error: subError } = await supabase
        .from(input.subtype_table)
        .insert({
          user_id: user.user_id,
          ...input.subtype_fields
        });
      if (subError) throw subError;
    }
    return user;
  }
};

// =========================================================================
-- B. STATION SERVICE (stationService.js)
// =========================================================================

export const stationService = {
  /**
   * Returns a list of stations with division details.
   */
  async getStations(divisionId = null) {
    let query = supabase
      .from("STATION")
      .select("station_id, station_name, station_code, location, DIVISION (division_name)");
    
    if (divisionId) query = query.eq("division_id", divisionId);
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
};

// =========================================================================
-- C. ASSESSMENT SERVICE (assessmentService.js)
// =========================================================================

export const assessmentService = {
  /**
   * Submits an MCQ exam attempt, inserting into attempts and answer logs.
   * Runs as a database transaction (RPC).
   */
  async submitExamAttempt(attemptData, answers) {
    const { data, error } = await supabase.rpc("submit_exam_attempt_transaction", {
      p_assessment_id: attemptData.assessment_id,
      p_employee_id: attemptData.employee_id,
      p_total_marks: attemptData.total_marks,
      p_obtained_marks: attemptData.obtained_marks,
      p_percentage: attemptData.percentage,
      p_category: attemptData.category,
      p_answers: answers -- JSON array of option selections
    });
    if (error) throw error;
    return data;
  }
};

// =========================================================================
-- D. SAFETY & MONITORING SERVICE (safetyService.js)
// =========================================================================

export const safetyService = {
  /**
   * Logs a new safety record (inspection, counseling, accident).
   */
  async createSafetyRecord(record) {
    const { data, error } = await supabase
      .from("SAFETY_RECORD")
      .insert({
        user_id: record.user_id,
        incident_type: record.incident_type,
        incident_date: record.incident_date,
        description: record.description,
        action_taken: record.action_taken
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

// =========================================================================
-- E. APPROVAL SERVICE (approvalService.js)
// =========================================================================

export const approvalService = {
  /**
   * Creates a TI sign-off approval record.
   */
  async approveAssessment(assessmentId, approvedBy, remarks) {
    const { data, error } = await supabase
      .from("APPROVAL")
      .insert({
        assessment_id: assessmentId,
        approved_by: approvedBy,
        remarks: remarks
      })
      .select()
      .single();
    if (error) throw error;

    // Update parent assessment status to Approved
    const { error: updateError } = await supabase
      .from("ASSESSMENT")
      .update({ status: "Approved" })
      .eq("assessment_id", assessmentId);
    if (updateError) throw updateError;

    return data;
  }
};
```

---

# 📦 3. INPUT & OUTPUT MODELS (DTOs)

The service layer validates requests using strict Data Transfer Objects (DTOs) to protect database integrity.

## 1. User Creation Model
### Input DTO (`CreateUserInput`)
```json
{
  "hrms_id": "PM_1092",
  "role_id": 7,
  "full_name": "Suresh Raina",
  "email": "suresh.raina@railways.gov.in",
  "mobile_no": "9876543210",
  "username": "suresh_pm1092",
  "password": "hashedpassword123",
  "subtype_table": "POINTSMAN",
  "subtype_fields": {
    "sm_id": 12,
    "shift": "Morning Shift (06:00 - 14:00)",
    "work_location": "Nagpur Junction Yard"
  }
}
```
### Output DTO (`UserOutput`)
```json
{
  "user_id": "c8a49de8-1f25-4cde-a1de-29cb8d9e2c4a",
  "hrms_id": "PM_1092",
  "full_name": "Suresh Raina",
  "email": "suresh.raina@railways.gov.in",
  "status": "Active",
  "created_at": "2026-06-03T11:58:00Z"
}
```

## 2. Test Attempt Submission Model
### Input DTO (`SubmitExamAttemptInput`)
```json
{
  "assessment_id": "b78cb4d2-f28a-49ae-be6a-e6cb810e2c8a",
  "employee_id": "c8a49de8-1f25-4cde-a1de-29cb8d9e2c4a",
  "total_marks": 25,
  "obtained_marks": 22,
  "percentage": 88.00,
  "category": "A",
  "answers": [
    { "question_id": 1, "selected_option": "A", "is_correct": true, "correct_option": "A", "marks_obtained": 1 },
    { "question_id": 2, "selected_option": "C", "is_correct": false, "correct_option": "B", "marks_obtained": 0 }
  ]
}
```

---

# 🛡️ 4. VALIDATION RULES

Before firing async backend queries, the service layer enforces frontend schemas (using custom utilities or validation libraries like Zod/Yup):

1. **HRMS IDs:** Must match role-specific regular expressions:
   * Pointsmen: `/^PM_\d{4}$/` (e.g. `PM_1001`)
   * Station Masters: `/^SM_\d{4}$/`
   * Traffic Inspectors: `/^TI_\d{4}$/`
2. **Scores & Grades:**
   * Exam scores must be bounded integers: `0 <= obtained_marks <= total_marks`.
   * Safety Category assignments must match grading thresholds:
     * $>= 80\%$ score $\rightarrow$ Category A
     * $>= 60\%$ score $\rightarrow$ Category B
     * $>= 26\%$ score $\rightarrow$ Category C
     * $< 26\%$ score $\rightarrow$ Category D
3. **PME Medical Records:** Due date must be a valid future date, and Done date must be in the past.
4. **Safety Logs:** Description fields must be non-empty and at least 15 characters long to prevent empty logs.

---

# 🚨 5. ERROR HANDLING STRATEGY

To prevent system crashes and improve user experience, the service layer wraps all Supabase queries in standard error-handling models.

```
 [Supabase API Exception] ──> [Service Error Interceptor] ──> [Custom Safety Error Type]
                                                                        │
 [UI Display Banner] <─────────── [Component Catch block] <─────────────┘
```

## Custom Error Class
```javascript
export class SafetyDomainError extends Error {
  constructor(message, code, details = null) {
    super(message);
    this.name = "SafetyDomainError";
    this.code = code;
    this.details = details;
  }
}
```

## Standardized Error Classifications

| Error Code | Triggering Scenario | User Remediation / Actionable Feedback |
| :--- | :--- | :--- |
| `ERR_AUTH_EXPIRED` | JWT/Supabase token expired during assessment submission. | Redirects user to login, preserving draft checklist in memory. |
| `ERR_UNIQUE_HRMS` | HRMS ID already exists in USERS when registering staff. | Prompts user to verify the ID or choose another. |
| `ERR_PME_OVERDUE` | Employee has an overdue PME check, blocking shunting duties. | Disables checklist access and triggers an alert modal. |
| `ERR_TRANSACTION_FAILED` | MCQ exam insertion failed in `ANSWER_HISTORY`. | Retries the transaction or saves progress locally for offline recovery. |
| `ERR_RLS_VIOLATION` | Station Master tries to submit a checklist for another station's staff. | Rejects the request, logs the event, and alerts the administrator. |
