"use server";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

function getSupabaseServer() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function getProviders() {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("energy_providers")
    .select("*")
    .order("kwh_rate", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}
