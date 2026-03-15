import { Suspense } from "react";
import { EnergyDashboard } from "@/components/energy-dashboard";
import { TableSkeleton } from "@/components/table-skeleton";
import { demoProviders } from "@/lib/demo-data";
import type { EnergyProvider } from "@/lib/database.types";

async function getProviders(): Promise<EnergyProvider[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not configured, use demo data
  if (!supabaseUrl || !supabaseKey || supabaseUrl === "https://your-project-id.supabase.co") {
    return demoProviders;
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from("energy_providers")
    .select("*")
    .order("kwh_rate", { ascending: true });

  if (error) {
    console.error("Supabase error:", error.message);
    return demoProviders;
  }

  return data as EnergyProvider[];
}

async function ProvidersContent() {
  const providers = await getProviders();
  return <EnergyDashboard initialProviders={providers} />;
}

export default function Home() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <ProvidersContent />
    </Suspense>
  );
}
