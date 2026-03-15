import { Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold">EnergieVergelijker</span>
        </div>
        <nav className="flex items-center gap-4">
          <a href="#vergelijk" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Vergelijk
          </a>
          <a href="#hoe-werkt-het" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Hoe werkt het?
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
