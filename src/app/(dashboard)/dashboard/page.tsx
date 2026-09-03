import { ArrowRight, Code2, Layers, ShieldCheck, Terminal, Zap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/Card";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="success">Production Ready</Badge>
          <Badge variant="outline">Next.js 16 App Router</Badge>
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Frontend Template Foundation
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Production-grade architecture featuring strict TypeScript, fail-fast env validation, Radix
          UI design system, and Node.js backend proxy integration.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Type Safety</CardTitle>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Strict 100%</div>
            <p className="text-xs text-[var(--muted-foreground)]">Zero unchecked index access</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">UI Components</CardTitle>
            <Layers className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15+ Primitives</div>
            <p className="text-xs text-[var(--muted-foreground)]">WCAG 2.2 AA accessible</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Integration</CardTitle>
            <Zap className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Node.js Ready</div>
            <p className="text-xs text-[var(--muted-foreground)]">Express / NestJS proxy client</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feature Generator</CardTitle>
            <Terminal className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Instant CLI</div>
            <p className="text-xs text-[var(--muted-foreground)]">`npm run create-feature`</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start Shortcuts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-[var(--border)] shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-blue-500" /> Scaffolding New Features
            </CardTitle>
            <CardDescription>
              Generate fully typed domain feature slices instantly with one command.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-md border border-[var(--border)] bg-[var(--muted)] p-3 font-mono text-xs text-[var(--foreground)]">
              npm run create-feature &lt;feature-name&gt;
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Scaffolds <code className="text-blue-400">types/</code>,{" "}
              <code className="text-blue-400">schemas/</code>,{" "}
              <code className="text-blue-400">actions/</code>,{" "}
              <code className="text-blue-400">hooks/</code>,{" "}
              <code className="text-blue-400">components/</code>, and public boundary export{" "}
              <code className="text-blue-400">index.ts</code>.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-emerald-500" /> Interactive Component Catalog
            </CardTitle>
            <CardDescription>
              Preview and verify all Radix UI primitives, toast alerts, dialogs, and tables.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-[var(--muted-foreground)]">
              Explore live interactive demonstrations of every button, form input, modal, avatar,
              and data table.
            </p>
            <Link href="/components-showcase">
              <Button className="gap-2">
                Open UI Catalog <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
