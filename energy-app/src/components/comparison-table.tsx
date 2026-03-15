"use client";

import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { ArrowUpDown, Leaf, Star } from "lucide-react";
import type { EnergyProvider } from "@/lib/database.types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ComparisonTableProps {
  data: EnergyProvider[];
  usage?: { kwh: number; gas: number };
}

const contractTypeLabels: Record<string, string> = {
  vast: "Vast",
  variabel: "Variabel",
  dynamisch: "Dynamisch",
};

const contractTypeVariant: Record<string, "default" | "secondary" | "outline"> = {
  vast: "default",
  variabel: "secondary",
  dynamisch: "outline",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function calculateYearlyCost(
  provider: EnergyProvider,
  kwh: number,
  gas: number
): number {
  const electricityCost = provider.kwh_rate * kwh;
  const gasCost = provider.gas_rate * gas;
  const standingCharges =
    (provider.standing_charge_electricity + provider.standing_charge_gas) * 12;
  return electricityCost + gasCost + standingCharges;
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

export function ComparisonTable({
  data,
  usage = { kwh: 2800, gas: 1200 },
}: ComparisonTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<EnergyProvider>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button variant="ghost" className="-ml-4" onClick={() => column.toggleSorting()}>
            Leverancier
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
              {row.original.name.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{row.original.name}</div>
              <RatingStars rating={row.original.rating} />
            </div>
          </div>
        ),
      },
      {
        accessorKey: "kwh_rate",
        header: ({ column }) => (
          <Button variant="ghost" className="-ml-4" onClick={() => column.toggleSorting()}>
            kWh tarief
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="font-mono text-sm">
            {formatCurrency(row.original.kwh_rate)}
          </span>
        ),
      },
      {
        accessorKey: "gas_rate",
        header: ({ column }) => (
          <Button variant="ghost" className="-ml-4" onClick={() => column.toggleSorting()}>
            Gas tarief
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="font-mono text-sm">
            {formatCurrency(row.original.gas_rate)}
          </span>
        ),
      },
      {
        accessorKey: "contract_type",
        header: "Contract",
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <Badge variant={contractTypeVariant[row.original.contract_type]}>
              {contractTypeLabels[row.original.contract_type]}
            </Badge>
            {row.original.contract_duration_months > 0 && (
              <span className="text-xs text-muted-foreground">
                {row.original.contract_duration_months} maanden
              </span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "green_energy",
        header: "Duurzaam",
        cell: ({ row }) =>
          row.original.green_energy ? (
            <div className="flex items-center gap-1 text-success">
              <Leaf className="h-4 w-4" />
              <span className="text-xs font-medium">Groen</span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">Grijs</span>
          ),
      },
      {
        id: "yearly_cost",
        header: ({ column }) => (
          <Button variant="ghost" className="-ml-4" onClick={() => column.toggleSorting()}>
            Geschatte jaarkosten
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        accessorFn: (row) => calculateYearlyCost(row, usage.kwh, usage.gas),
        cell: ({ row }) => {
          const cost = calculateYearlyCost(row.original, usage.kwh, usage.gas);
          return (
            <span className="font-mono text-sm font-semibold">
              {formatCurrency(cost)}
            </span>
          );
        },
        sortingFn: "basic",
      },
    ],
    [usage]
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Geen resultaten gevonden.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
