"use client";

import { useState, useMemo } from "react";
import type { EnergyProvider } from "@/lib/database.types";
import { Hero } from "@/components/hero";
import { Filters } from "@/components/filters";
import { StatsCards } from "@/components/stats-cards";
import { ComparisonTable } from "@/components/comparison-table";

interface EnergyDashboardProps {
  initialProviders: EnergyProvider[];
}

export function EnergyDashboard({ initialProviders }: EnergyDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [contractType, setContractType] = useState("");
  const [greenOnly, setGreenOnly] = useState(false);
  const [kwh, setKwh] = useState(2800);
  const [gas, setGas] = useState(1200);

  const filteredProviders = useMemo(() => {
    return initialProviders.filter((provider) => {
      if (searchQuery && !provider.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (contractType && provider.contract_type !== contractType) {
        return false;
      }
      if (greenOnly && !provider.green_energy) {
        return false;
      }
      return true;
    });
  }, [initialProviders, searchQuery, contractType, greenOnly]);

  return (
    <>
      <Hero onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main className="container mx-auto px-4 py-8 space-y-6" id="vergelijk">
        <StatsCards providers={filteredProviders} />

        <Filters
          contractType={contractType}
          onContractTypeChange={setContractType}
          greenOnly={greenOnly}
          onGreenOnlyChange={setGreenOnly}
          kwh={kwh}
          onKwhChange={setKwh}
          gas={gas}
          onGasChange={setGas}
        />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Alle leveranciers{" "}
              <span className="text-sm font-normal text-muted-foreground">
                ({filteredProviders.length} resultaten)
              </span>
            </h2>
          </div>
          <ComparisonTable data={filteredProviders} usage={{ kwh, gas }} />
        </div>

        <section id="hoe-werkt-het" className="py-12">
          <h2 className="text-2xl font-bold mb-6">Hoe werkt het?</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Vul je verbruik in",
                description:
                  "Voer je jaarlijks elektriciteits- en gasverbruik in. Dit staat op je jaarafrekening.",
              },
              {
                step: "2",
                title: "Vergelijk leveranciers",
                description:
                  "Filter op contracttype, duurzaamheid en sorteer op prijs om de beste deal te vinden.",
              },
              {
                step: "3",
                title: "Stap over",
                description:
                  "Kies je nieuwe leverancier. Het overstappen wordt voor je geregeld, zonder onderbreking.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-xl border bg-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
