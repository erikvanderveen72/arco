"use client";

import { Search, Zap, TrendingDown, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function Hero({ onSearch, searchQuery }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-16 sm:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Vergelijk{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              energietarieven
            </span>{" "}
            in Nederland
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Bespaar honderden euro&apos;s per jaar door de beste energieleverancier te vinden.
            Vergelijk direct tarieven, contractvormen en duurzaamheid.
          </p>

          <div className="mt-8 flex items-center gap-2 mx-auto max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Zoek op leverancier..."
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            <Button size="lg" className="h-12">
              Vergelijk
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-primary" />
              <span>15+ leveranciers</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <TrendingDown className="h-4 w-4 text-success" />
              <span>Actuele tarieven</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Onafhankelijk advies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
