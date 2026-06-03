-- Migration to add COUNSELLING_RECORD for Category D auto-trigger
CREATE TABLE IF NOT EXISTS "COUNSELLING_RECORD" (
    "counselling_id" SERIAL PRIMARY KEY,
    "user_id" UUID REFERENCES "USERS"("user_id") ON DELETE CASCADE,
    "assessment_id" INT REFERENCES "ASSESSMENT"("assessment_id") ON DELETE CASCADE,
    "counselling_date" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "counsellor_id" UUID REFERENCES "USERS"("user_id") ON DELETE SET NULL,
    "remarks" TEXT,
    "status" VARCHAR(50) DEFAULT 'Pending',
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Ensure RLS is disabled for now (or enabled with policy)
ALTER TABLE "COUNSELLING_RECORD" DISABLE ROW LEVEL SECURITY;
