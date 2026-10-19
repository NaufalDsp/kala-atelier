import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  let dbStatus = "not_configured";

  if (isSupabaseConfigured) {
    try {
      const supabase = createServerClient();
      // Lightweight query to keep Supabase Postgres active
      const { error } = await supabase.from("projects").select("id").limit(1);
      if (error) {
        dbStatus = `error: ${error.message}`;
      } else {
        dbStatus = "connected";
      }
    } catch (err) {
      dbStatus = err instanceof Error ? err.message : "unknown_error";
    }
  }

  return NextResponse.json(
    {
      ok: true,
      service: "Kala Atelier Health Ping",
      timestamp: new Date().toISOString(),
      database: dbStatus,
    },
    { status: 200 }
  );
}

