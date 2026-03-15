import type { EnergyProvider } from "@/lib/database.types";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Zap, Leaf } from "lucide-react";

interface StatsCardsProps {
  providers: EnergyProvider[];
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 4,
  }).format(value);
}

export function StatsCards({ providers }: StatsCardsProps) {
  if (providers.length === 0) return null;

  const cheapestKwh = providers.reduce((min, p) => (p.kwh_rate < min.kwh_rate ? p : min), providers[0]);
  const cheapestGas = providers.reduce((min, p) => (p.gas_rate < min.gas_rate ? p : min), providers[0]);
  const greenCount = providers.filter((p) => p.green_energy).length;
  const avgKwh = providers.reduce((sum, p) => sum + p.kwh_rate, 0) / providers.length;

  const stats = [
    {
      label: "Goedkoopste stroom",
      value: formatCurrency(cheapestKwh.kwh_rate) + "/kWh",
      description: cheapestKwh.name,
      icon: TrendingDown,
      iconColor: "text-success",
    },
    {
      label: "Goedkoopste gas",
      value: formatCurrency(cheapestGas.gas_rate) + "/m\u00B3",
      description: cheapestGas.name,
      icon: TrendingUp,
      iconColor: "text-primary",
    },
    {
      label: "Gemiddeld stroomtarief",
      value: formatCurrency(avgKwh) + "/kWh",
      description: `Gebaseerd op ${providers.length} leveranciers`,
      icon: Zap,
      iconColor: "text-amber-500",
    },
    {
      label: "Groene leveranciers",
      value: `${greenCount} van ${providers.length}`,
      description: `${Math.round((greenCount / providers.length) * 100)}% biedt groene energie`,
      icon: Leaf,
      iconColor: "text-success",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </div>
            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
