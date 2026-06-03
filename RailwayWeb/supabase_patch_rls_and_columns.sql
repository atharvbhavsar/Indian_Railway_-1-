-- =========================================================================================
-- 🚂 INDIAN RAILWAY STAFF EVALUATION SYSTEM (RSES)
-- SCHEMA RECONCILIATION & DATA SEEDING PATCH
-- Execute this script in the Supabase SQL Editor to finalize your backend integration.
-- =========================================================================================

-- 1. ADD MISSING COLUMNS TO EMPLOYEE_PROFILE
ALTER TABLE "EMPLOYEE_PROFILE" 
ADD COLUMN IF NOT EXISTS "current_score" INT DEFAULT 80,
ADD COLUMN IF NOT EXISTS "safety_score" INT DEFAULT 85,
ADD COLUMN IF NOT EXISTS "monitoring_status" VARCHAR(50) DEFAULT 'Active',
ADD COLUMN IF NOT EXISTS "station_id" INT REFERENCES "STATION"("station_id") ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS "division" VARCHAR(100) DEFAULT 'Nagpur',
ADD COLUMN IF NOT EXISTS "reporting_sm" VARCHAR(150),
ADD COLUMN IF NOT EXISTS "work_location" VARCHAR(150),
ADD COLUMN IF NOT EXISTS "shift" VARCHAR(100),
ADD COLUMN IF NOT EXISTS "jurisdiction" VARCHAR(150),
ADD COLUMN IF NOT EXISTS "pme_status" VARCHAR(50) DEFAULT 'Fit',
ADD COLUMN IF NOT EXISTS "refresher_status" VARCHAR(50) DEFAULT 'Cleared',
ADD COLUMN IF NOT EXISTS "category" VARCHAR(10) DEFAULT 'A';

-- 2. DISABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES TO ENABLE PUBLIC CRUD OPERATIONS
ALTER TABLE "ROLE" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "DIVISION" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "STATION" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "USERS" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "EMPLOYEE_PROFILE" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "SUPER_ADMIN" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "AOM" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "TRAFFIC_INSPECTOR" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "STATION_SUPERINTENDENT" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "STATION_MASTER" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "TRAIN_MANAGER" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "POINTSMAN" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "ASSESSMENT" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "TEST_ATTEMPT" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "ANSWER_HISTORY" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "SAFETY_RECORD" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "PME_RECORD" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "TRAINING_RECORD" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "MONITORING" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "QUESTION_BANK" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "REVIEW" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "APPROVAL" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "REPORT" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "NOTIFICATION" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "AUDIT_LOG" DISABLE ROW LEVEL SECURITY;

-- 3. SEED INITIAL DIVISION (IF NOT EXISTS)
INSERT INTO "DIVISION" (division_id, division_name, zone_name)
VALUES (1, 'Nagpur', 'Central Railway')
ON CONFLICT (division_name) DO NOTHING;

-- 4. SEED INITIAL STATIONS
INSERT INTO "STATION" (station_name, station_code, location, division_id) VALUES
('Nagpur Junction', 'NGP', 'Nagpur Main', 1),
('Wardha Junction', 'WR', 'Wardha', 1),
('Badnera Junction', 'BD', 'Badnera', 1),
('Akola Junction', 'AK', 'Akola', 1),
('Sewagram Junction', 'SEGM', 'Sewagram', 1),
('Ajni Junction', 'AJNI', 'Ajni', 1),
('Pulgaon Junction', 'PLO', 'Pulgaon', 1),
('Dhamangaon Junction', 'DMN', 'Dhamangaon', 1),
('Murtajapur Junction', 'MZR', 'Murtajapur', 1),
('Shegaon Junction', 'SEG', 'Shegaon', 1)
ON CONFLICT (station_code) DO NOTHING;

-- 5. SEED INITIAL STAFF MEMBERS AND THEIR PROFILES
-- We will use anonymous blocks to avoid duplicate inserts and insert related records atomically.
DO $$
DECLARE
    v_role_id INT;
    v_station_id INT;
    v_user_id UUID;
BEGIN
    -- Get Nagpur Junction station_id
    SELECT station_id INTO v_station_id FROM "STATION" WHERE station_code = 'NGP' LIMIT 1;

    -- A. SEED POINTSMAN (Ravi Kumar - PM101)
    SELECT role_id INTO v_role_id FROM "ROLE" WHERE role_name = 'Pointsman' LIMIT 1;
    IF NOT EXISTS (SELECT 1 FROM "USERS" WHERE hrms_id = 'PM101') THEN
        INSERT INTO "USERS" (hrms_id, full_name, email, mobile_no, username, password_hash, role_id)
        VALUES ('PM101', 'Ravi Kumar', 'ravi.kumar@rail.in', '9876543210', 'pm101', 'password123', v_role_id)
        RETURNING user_id INTO v_user_id;

        INSERT INTO "EMPLOYEE_PROFILE" (user_id, dob, joining_date, qualification, address, blood_group, current_score, safety_score, monitoring_status, station_id, division, reporting_sm, work_location, shift, category)
        VALUES (v_user_id, '1992-05-15', '2019-04-10', 'Intermediate', 'Rail Quarter A-12, Nagpur', 'B+', 82, 88, 'Active', v_station_id, 'Nagpur', 'Rajesh Sharma', 'Nagpur Yard East Cab', 'Morning Shift (06:00 - 14:00)', 'B');

        INSERT INTO "POINTSMAN" (user_id, shift, work_location)
        VALUES (v_user_id, 'Morning Shift (06:00 - 14:00)', 'Nagpur Yard East Cab');
    END IF;

    -- B. SEED STATION MASTER (Rajesh Sharma - SM201)
    SELECT role_id INTO v_role_id FROM "ROLE" WHERE role_name = 'Station Master' LIMIT 1;
    IF NOT EXISTS (SELECT 1 FROM "USERS" WHERE hrms_id = 'SM201') THEN
        INSERT INTO "USERS" (hrms_id, full_name, email, mobile_no, username, password_hash, role_id)
        VALUES ('SM201', 'Rajesh Sharma', 'rajesh.sharma@rail.in', '9876543211', 'sm201', 'password123', v_role_id)
        RETURNING user_id INTO v_user_id;

        INSERT INTO "EMPLOYEE_PROFILE" (user_id, dob, joining_date, qualification, address, blood_group, current_score, safety_score, monitoring_status, station_id, division, reporting_sm, work_location, shift, category)
        VALUES (v_user_id, '1985-08-20', '2012-03-15', 'Graduate', 'Rail Colony Block C, Wardha', 'A+', 88, 92, 'Active', v_station_id, 'Nagpur', 'Amit Patel', 'Nagpur Junction Station Master Office', 'General Shift', 'A');

        INSERT INTO "STATION_MASTER" (user_id, station_id, joining_date)
        VALUES (v_user_id, v_station_id, '2012-03-15');
    END IF;

    -- C. SEED STATION SUPERINTENDENT (Amit Patel - SS301)
    SELECT role_id INTO v_role_id FROM "ROLE" WHERE role_name = 'Station Superintendent' LIMIT 1;
    IF NOT EXISTS (SELECT 1 FROM "USERS" WHERE hrms_id = 'SS301') THEN
        INSERT INTO "USERS" (hrms_id, full_name, email, mobile_no, username, password_hash, role_id)
        VALUES ('SS301', 'Amit Patel', 'amit.patel@rail.in', '9876543212', 'ss301', 'password123', v_role_id)
        RETURNING user_id INTO v_user_id;

        INSERT INTO "EMPLOYEE_PROFILE" (user_id, dob, joining_date, qualification, address, blood_group, current_score, safety_score, monitoring_status, station_id, division, reporting_sm, work_location, shift, category)
        VALUES (v_user_id, '1980-01-10', '2005-11-20', 'Post Graduate', 'Superintendent Quarters, Nagpur', 'O+', 92, 95, 'Active', v_station_id, 'Nagpur', 'Sanjay Gupta', 'Nagpur Central Station Office', 'General Shift', 'A');

        INSERT INTO "STATION_SUPERINTENDENT" (user_id, station_id, joining_date)
        VALUES (v_user_id, v_station_id, '2005-11-20');
    END IF;

    -- D. SEED TRAIN MANAGER (Vikram Singh - TM401)
    SELECT role_id INTO v_role_id FROM "ROLE" WHERE role_name = 'Train Manager' LIMIT 1;
    IF NOT EXISTS (SELECT 1 FROM "USERS" WHERE hrms_id = 'TM401') THEN
        INSERT INTO "USERS" (hrms_id, full_name, email, mobile_no, username, password_hash, role_id)
        VALUES ('TM401', 'Vikram Singh', 'vikram.singh@rail.in', '9876543213', 'tm401', 'password123', v_role_id)
        RETURNING user_id INTO v_user_id;

        INSERT INTO "EMPLOYEE_PROFILE" (user_id, dob, joining_date, qualification, address, blood_group, current_score, safety_score, monitoring_status, station_id, division, reporting_sm, work_location, shift, category)
        VALUES (v_user_id, '1988-12-05', '2015-06-18', 'Graduate', 'LHB Rail Staff Transit Hostels, Nagpur', 'AB+', 79, 82, 'Active', v_station_id, 'Nagpur', 'Sanjay Gupta', 'Central Division Running Staff', 'Rotational Shift', 'B');

        INSERT INTO "TRAIN_MANAGER" (user_id, station_id, joining_date)
        VALUES (v_user_id, v_station_id, '2015-06-18');
    END IF;

    -- E. SEED TRAFFIC INSPECTOR (Sanjay Gupta - TI501)
    SELECT role_id INTO v_role_id FROM "ROLE" WHERE role_name = 'Traffic Inspector' LIMIT 1;
    IF NOT EXISTS (SELECT 1 FROM "USERS" WHERE hrms_id = 'TI501') THEN
        INSERT INTO "USERS" (hrms_id, full_name, email, mobile_no, username, password_hash, role_id)
        VALUES ('TI501', 'Sanjay Gupta', 'sanjay.gupta@rail.in', '9876543214', 'ti501', 'password123', v_role_id)
        RETURNING user_id INTO v_user_id;

        INSERT INTO "EMPLOYEE_PROFILE" (user_id, dob, joining_date, qualification, address, blood_group, current_score, safety_score, monitoring_status, station_id, division, reporting_sm, work_location, shift, jurisdiction, category)
        VALUES (v_user_id, '1976-03-30', '2000-09-01', 'Graduate', 'Divisional Headquarters Officers Colony, Nagpur', 'O-', 95, 98, 'Active', v_station_id, 'Nagpur', 'P. K. Verma', 'Nagpur Division Headquarters', 'General Shift', 'Nagpur Division', 'A');

        INSERT INTO "TRAFFIC_INSPECTOR" (user_id, station_id, jurisdiction)
        VALUES (v_user_id, v_station_id, 'Nagpur Division');
    END IF;

    -- F. SEED AOM (P. K. Verma - aom)
    SELECT role_id INTO v_role_id FROM "ROLE" WHERE role_name = 'AOM/General' LIMIT 1;
    IF NOT EXISTS (SELECT 1 FROM "USERS" WHERE hrms_id = 'aom') THEN
        INSERT INTO "USERS" (hrms_id, full_name, email, mobile_no, username, password_hash, role_id)
        VALUES ('aom', 'P. K. Verma', 'aom@rail.in', '9876543299', 'aom', 'password123', v_role_id)
        RETURNING user_id INTO v_user_id;

        INSERT INTO "EMPLOYEE_PROFILE" (user_id, dob, joining_date, qualification, address, blood_group, current_score, safety_score, monitoring_status, station_id, division, reporting_sm, work_location, shift, category)
        VALUES (v_user_id, '1970-04-12', '1995-08-10', 'Post Graduate', 'Sr. DOM Quarters, Nagpur', 'A+', 98, 98, 'Active', v_station_id, 'Nagpur', '', 'Nagpur Divisional Office', 'General Shift', 'A');

        INSERT INTO "AOM" (user_id, zone, join_date)
        VALUES (v_user_id, 'Central Railway', '1995-08-10');
    END IF;
END $$;
