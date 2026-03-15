"use client";

import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SlidersHorizontal } from "lucide-react";

interface FiltersProps {
  contractType: string;
  onContractTypeChange: (value: string) => void;
  greenOnly: boolean;
  onGreenOnlyChange: (value: boolean) => void;
  kwh: number;
  onKwhChange: (value: number) => void;
  gas: number;
  onGasChange: (value: number) => void;
}

export function Filters({
  contractType,
  onContractTypeChange,
  greenOnly,
  onGreenOnlyChange,
  kwh,
  onKwhChange,
  gas,
  onGasChange,
}: FiltersProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Filters</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Contracttype
            </label>
            <Select
              value={contractType}
              onChange={(e) => onContractTypeChange(e.target.value)}
              placeholder="Alle contracten"
              options={[
                { value: "vast", label: "Vast" },
                { value: "variabel", label: "Variabel" },
                { value: "dynamisch", label: "Dynamisch" },
              ]}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Duurzaamheid
            </label>
            <Select
              value={greenOnly ? "green" : ""}
              onChange={(e) => onGreenOnlyChange(e.target.value === "green")}
              placeholder="Alle leveranciers"
              options={[{ value: "green", label: "Alleen groene energie" }]}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Verbruik elektriciteit (kWh/jaar)
            </label>
            <input
              type="number"
              value={kwh}
              onChange={(e) => onKwhChange(Number(e.target.value))}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Verbruik gas (m&sup3;/jaar)
            </label>
            <input
              type="number"
              value={gas}
              onChange={(e) => onGasChange(Number(e.target.value))}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
