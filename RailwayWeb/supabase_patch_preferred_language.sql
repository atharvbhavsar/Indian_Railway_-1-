-- 🚂 INDIAN RAILWAY STAFF EVALUATION SYSTEM (RSES)
-- DATABASE PATCH: ADD preferred_language COLUMN TO USERS
-- =========================================================================================

ALTER TABLE "USERS" 
ADD COLUMN IF NOT EXISTS "preferred_language" VARCHAR(5) DEFAULT 'en';
