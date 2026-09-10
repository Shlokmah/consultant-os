// One-off diagnostic script for Phase 2: confirms the app can reach
// Supabase and that every core relationship works, then cleans up after
// itself. Not part of the running app — run with:
//   node --env-file=.env.local scripts/test-connection.mjs

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Run this with: node --env-file=.env.local scripts/test-connection.mjs",
  );
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

function step(name) {
  console.log(`\n--- ${name} ---`);
}

function fail(name, error) {
  console.error(`FAILED: ${name}`);
  console.error(error);
  process.exit(1);
}

async function main() {
  step("1. Connect");
  {
    const { error } = await supabase
      .from("clients")
      .select("id", { count: "exact", head: true });
    if (error) fail("connect", error);
    console.log("Connected to Supabase.");
  }

  step("2. Retrieve clients");
  {
    const { data, error } = await supabase.from("clients").select("*");
    if (error) fail("retrieve clients", error);
    console.log(`OK — ${data.length} client(s) found.`);
  }

  step("3. Create a client");
  let client;
  {
    const { data, error } = await supabase
      .from("clients")
      .insert({ name: "[TEST] Acme Corp", status: "active" })
      .select()
      .single();
    if (error) fail("create client", error);
    client = data;
    console.log(`OK — created client ${client.id}`);
  }

  step("4. Retrieve projects");
  {
    const { data, error } = await supabase.from("projects").select("*");
    if (error) fail("retrieve projects", error);
    console.log(`OK — ${data.length} project(s) found.`);
  }

  step("5. Create a project linked to the client");
  let project;
  {
    const { data, error } = await supabase
      .from("projects")
      .insert({
        client_id: client.id,
        name: "[TEST] Market Entry Study",
        status: "not_started",
        priority: "medium",
      })
      .select()
      .single();
    if (error) fail("create project", error);
    project = data;
    console.log(`OK — created project ${project.id}`);
  }

  step("6. Verify client -> project relationship");
  {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("client_id", client.id);
    if (error) fail("client -> project", error);
    if (data.length !== 1 || data[0].id !== project.id) {
      fail("client -> project", "Relationship mismatch");
    }
    console.log("OK — project correctly linked to client.");
  }

  step("7. Verify project -> task relationship");
  let task;
  {
    const created = await supabase
      .from("tasks")
      .insert({
        project_id: project.id,
        title: "[TEST] Draft interview guide",
        status: "not_started",
        priority: "medium",
      })
      .select()
      .single();
    if (created.error) fail("create task", created.error);
    task = created.data;

    const check = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", project.id);
    if (check.error) fail("project -> task", check.error);
    if (check.data.length !== 1) fail("project -> task", "Relationship mismatch");
    console.log("OK — task correctly linked to project.");
  }

  step("8. Verify client/project -> meeting relationship");
  let meeting;
  {
    const created = await supabase
      .from("meetings")
      .insert({
        client_id: client.id,
        project_id: project.id,
        title: "[TEST] Kickoff call",
        meeting_date: new Date().toISOString(),
      })
      .select()
      .single();
    if (created.error) fail("create meeting", created.error);
    meeting = created.data;

    const check = await supabase
      .from("meetings")
      .select("*")
      .eq("project_id", project.id);
    if (check.error) fail("client/project -> meeting", check.error);
    if (check.data.length !== 1) {
      fail("client/project -> meeting", "Relationship mismatch");
    }
    console.log("OK — meeting correctly linked to client and project.");
  }

  step("Cleanup");
  {
    await supabase.from("meetings").delete().eq("id", meeting.id);
    await supabase.from("tasks").delete().eq("id", task.id);
    await supabase.from("projects").delete().eq("id", project.id);
    await supabase.from("clients").delete().eq("id", client.id);
    console.log("Removed all test rows — database is empty again.");
  }

  console.log("\nAll 8 checks passed.");
}

main();
