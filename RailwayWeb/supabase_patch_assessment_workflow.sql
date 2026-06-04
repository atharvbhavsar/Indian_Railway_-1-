-- =========================================================================================
-- 🚂 INDIAN RAILWAY STAFF EVALUATION SYSTEM (RSES)
-- ASSESSMENT WORKFLOW, COUNSELLING & RETEST SCHEDULING SCHEMAS PATCH
-- Execute this script in the Supabase SQL Editor to support the final assessment workflows.
-- =========================================================================================

-- 1. DROP EXISTING STATUS CHECK CONSTRAINT TO SUPPORT NEW WORKFLOW STATUSES
ALTER TABLE "ASSESSMENT" DROP CONSTRAINT IF EXISTS "ASSESSMENT_status_check";

-- 2. RE-ADD THE EXPANDED CHECK CONSTRAINT
-- Supports the full status flow in both uppercase and camelCase:
-- LOCKED, AVAILABLE, IN_PROGRESS, SUBMITTED, EVALUATED, APPROVED, COMPLETED
-- Draft, Pending, Approved, Rejected, Scheduled, Completed, In Progress, Submitted, Evaluated, Locked, Available
ALTER TABLE "ASSESSMENT" ADD CONSTRAINT "ASSESSMENT_status_check" 
CHECK ("status" IN (
    'LOCKED', 'AVAILABLE', 'IN_PROGRESS', 'SUBMITTED', 'EVALUATED', 'APPROVED', 'COMPLETED', 
    'Draft', 'Pending', 'Approved', 'Rejected', 'Scheduled', 'Completed', 'In Progress', 'Submitted', 'Evaluated', 'Locked', 'Available'
));

-- 3. CREATE COUNSELLING_RECORD TABLE (with proper UUID foreign key)
CREATE TABLE IF NOT EXISTS "COUNSELLING_RECORD" (
    "counselling_id" SERIAL PRIMARY KEY,
    "user_id" UUID NOT NULL REFERENCES "USERS"("user_id") ON DELETE CASCADE,
    "assessment_id" UUID REFERENCES "ASSESSMENT"("assessment_id") ON DELETE CASCADE,
    "counselling_date" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "counsellor_id" UUID REFERENCES "USERS"("user_id") ON DELETE SET NULL,
    "remarks" TEXT,
    "status" VARCHAR(50) DEFAULT 'Pending' CHECK ("status" IN ('Pending', 'Completed', 'Cancelled')),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. CREATE RETEST_SCHEDULING TABLE
CREATE TABLE IF NOT EXISTS "RETEST_SCHEDULING" (
    "retest_id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "employee_id" UUID NOT NULL REFERENCES "USERS"("user_id") ON DELETE CASCADE,
    "original_assessment_id" UUID NOT NULL REFERENCES "ASSESSMENT"("assessment_id") ON DELETE CASCADE,
    "retest_assessment_id" UUID REFERENCES "ASSESSMENT"("assessment_id") ON DELETE SET NULL,
    "scheduled_date" DATE NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'Scheduled' CHECK ("status" IN ('Scheduled', 'Completed', 'Cancelled')),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. CREATE INDEXES FOR COUNSELLING & RETEST SCHEDULING
CREATE INDEX IF NOT EXISTS "idx_counselling_user" ON "COUNSELLING_RECORD"("user_id");
CREATE INDEX IF NOT EXISTS "idx_counselling_assess" ON "COUNSELLING_RECORD"("assessment_id");
CREATE INDEX IF NOT EXISTS "idx_retest_employee" ON "RETEST_SCHEDULING"("employee_id");
CREATE INDEX IF NOT EXISTS "idx_retest_original" ON "RETEST_SCHEDULING"("original_assessment_id");

-- 6. DISABLE ROW LEVEL SECURITY (RLS) FOR public CRUD OPERATIONS ON PATCHED TABLES
ALTER TABLE "COUNSELLING_RECORD" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "RETEST_SCHEDULING" DISABLE ROW LEVEL SECURITY;

-- 7. TRANSACTIONAL DATABASE RPC: submit_test_attempt_rpc
-- Ensures Category D auto-triggers (Counselling Record, Retest Scheduling, LOCKED Assessment,
-- Employee Profile risk update, Monitoring, Notifications, and Audit Logs) run in a single atomic transaction.
CREATE OR REPLACE FUNCTION submit_test_attempt_rpc(
  p_employee_id UUID,
  p_assessment_id UUID,
  p_total_marks INT,
  p_obtained_marks INT,
  p_percentage NUMERIC,
  p_category VARCHAR,
  p_conducted_by UUID,
  p_answers JSONB DEFAULT '[]'::jsonb
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_assessment_id UUID := p_assessment_id;
  v_attempt_id UUID;
  v_retest_date DATE := CURRENT_DATE + INTERVAL '1 month';
  v_score NUMERIC;
  v_ans_record RECORD;
  v_response_data JSONB;
BEGIN
  -- A. Validation
  v_score := COALESCE(p_percentage, 0);
  IF v_score < 0 OR v_score > 100 THEN
    RAISE EXCEPTION 'Validation Error: Out-of-bounds competency score of %.', v_score;
  END IF;

  -- B. Resolve or create assessment_id
  IF v_assessment_id IS NULL THEN
    SELECT assessment_id INTO v_assessment_id
    FROM "ASSESSMENT"
    WHERE employee_id = p_employee_id
      AND status IN ('AVAILABLE', 'LOCKED', 'IN_PROGRESS', 'Draft', 'Pending', 'Scheduled')
    ORDER BY created_at DESC
    LIMIT 1;

    IF v_assessment_id IS NULL THEN
      INSERT INTO "ASSESSMENT" (employee_id, conducted_by, assessment_type, status)
      VALUES (
        p_employee_id,
        COALESCE(p_conducted_by, p_employee_id),
        'Pointsman Periodic Assessment',
        'IN_PROGRESS'
      )
      RETURNING assessment_id INTO v_assessment_id;
    END IF;
  END IF;

  -- C. Create TEST_ATTEMPT record
  INSERT INTO "TEST_ATTEMPT" (
    assessment_id,
    employee_id,
    total_marks,
    obtained_marks,
    percentage,
    category,
    submitted_at
  )
  VALUES (
    v_assessment_id,
    p_employee_id,
    COALESCE(p_total_marks, 100),
    p_obtained_marks,
    v_score,
    p_category,
    NOW()
  )
  RETURNING attempt_id INTO v_attempt_id;

  -- D. Bulk insert answers if provided
  IF p_answers IS NOT NULL AND jsonb_array_length(p_answers) > 0 THEN
    FOR v_ans_record IN 
      SELECT 
        (value->>'questionId')::INT as question_id,
        (value->>'selectedOption') as selected_option,
        (value->>'isCorrect')::BOOLEAN as is_correct,
        (value->>'correctOption') as correct_option,
        (value->>'marksObtained')::INT as marks_obtained
      FROM jsonb_array_elements(p_answers)
    LOOP
      INSERT INTO "ANSWER_HISTORY" (
        attempt_id,
        question_id,
        selected_option,
        is_correct,
        correct_option,
        marks_obtained
      )
      VALUES (
        v_attempt_id,
        v_ans_record.question_id,
        v_ans_record.selected_option,
        v_ans_record.is_correct,
        v_ans_record.correct_option,
        v_ans_record.marks_obtained
      );
    END LOOP;
  END IF;

  -- E. Update assessment status to Submitted
  UPDATE "ASSESSMENT"
  SET status = 'Submitted'
  WHERE assessment_id = v_assessment_id;

  -- F. Trigger Category D/Failure logic if score is low (Category D is < 26% or explicitly 'D' or percentage < 50 for counselling trigger)
  IF p_category = 'D' OR v_score < 50 THEN
    -- F.1. Counselling Record
    INSERT INTO "COUNSELLING_RECORD" (user_id, assessment_id, counsellor_id, remarks, status)
    VALUES (
      p_employee_id,
      v_assessment_id,
      p_conducted_by,
      'System Auto-Generated: Score was ' || v_score || '%. Category D: Immediate safety counselling required.',
      'Pending'
    );

    -- F.2. Retest scheduling record
    INSERT INTO "RETEST_SCHEDULING" (employee_id, original_assessment_id, scheduled_date, status)
    VALUES (
      p_employee_id,
      v_assessment_id,
      v_retest_date,
      'Scheduled'
    );

    -- F.3. Mandatory Retest assessment setup
    INSERT INTO "ASSESSMENT" (employee_id, conducted_by, assessment_type, due_date, status)
    VALUES (
      p_employee_id,
      COALESCE(p_conducted_by, p_employee_id),
      'Mandatory Retest (Category D)',
      v_retest_date,
      'LOCKED'
    );

    -- F.4. Update Employee Profile
    UPDATE "EMPLOYEE_PROFILE"
    SET 
      monitoring_status = 'High Risk',
      category = 'D',
      current_score = v_score
    WHERE user_id = p_employee_id;

    -- F.5. Update Monitoring table
    INSERT INTO "MONITORING" (user_id, monitoring_status, risk_level, remarks, updated_at)
    VALUES (
      p_employee_id,
      'Under Observation',
      'High',
      'Automated high risk observation triggered after scoring ' || v_score || '% (Category D) on assessment.',
      NOW()
    )
    ON CONFLICT (user_id) DO UPDATE
    SET 
      monitoring_status = EXCLUDED.monitoring_status,
      risk_level = EXCLUDED.risk_level,
      remarks = EXCLUDED.remarks,
      updated_at = NOW();

    -- F.6. Notifications
    INSERT INTO "NOTIFICATION" (user_id, title, message, is_read)
    VALUES (
      p_employee_id,
      'Mandatory Counselling & Retest Scheduled',
      'You have scored Category D (' || v_score || '%). Mandatory safety counselling has been scheduled, your profile is marked as High Risk, and a retest is scheduled in 1 month.',
      FALSE
    );

    IF p_conducted_by IS NOT NULL AND p_conducted_by <> p_employee_id THEN
      INSERT INTO "NOTIFICATION" (user_id, title, message, is_read)
      VALUES (
        p_conducted_by,
        'Category D Safety Warning: Employee graded D',
        'Safety Alert: Employee graded Category D with score of ' || v_score || '%. Counselling and high-risk monitoring protocols have been automatically triggered.',
        FALSE
      );
    END IF;

    -- F.7. Audit Log entry
    INSERT INTO "AUDIT_LOG" (user_id, action, table_name, record_id)
    VALUES (
      COALESCE(p_conducted_by, p_employee_id),
      'CATEGORY_D_AUTO_TRIGGER',
      'TEST_ATTEMPT',
      v_attempt_id::VARCHAR
    );
  END IF;

  -- G. Return summary object
  SELECT jsonb_build_object(
    'attempt_id', v_attempt_id,
    'assessment_id', v_assessment_id,
    'success', true
  ) INTO v_response_data;

  RETURN v_response_data;
END;
$$;
