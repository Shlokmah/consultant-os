import "server-only";
import { createClient } from "@supabase/supabase-js";

// This client uses the secret service-role key, which bypasses Row Level
// Security entirely. The "server-only" import above makes the build fail
// if this file is ever accidentally imported into browser-facing code.
// Only import this from Server Components, Server Actions, or Route
// Handlers — never from a file marked "use client".

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing Supabase environment variables. Check .env.local for " +
      "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
  );
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});
