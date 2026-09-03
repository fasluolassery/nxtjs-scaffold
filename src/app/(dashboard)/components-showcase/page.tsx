"use client";

import { Bell, Info, Layers, MoreHorizontal, Plus, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/Card";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { type Column, DataTable } from "@/components/ui/DataTable/DataTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu/DropdownMenu";
import { Input } from "@/components/ui/Input/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/Select";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import { Switch } from "@/components/ui/Switch/Switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs/Tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip/Tooltip";
import { EmptyState } from "@/components/feedback/EmptyState";
import { toast } from "@/stores/useToastStore";

interface SampleItem {
  id: string;
  name: string;
  category: string;
  status: "active" | "inactive";
}

const sampleData: SampleItem[] = [
  { id: "1", name: "Analytics Engine", category: "Core Services", status: "active" },
  { id: "2", name: "Authentication Portal", category: "Security", status: "active" },
  { id: "3", name: "Payment Gateway", category: "Finance", status: "inactive" },
];

export default function ComponentsShowcasePage() {
  const [isChecked, setIsChecked] = useState(true);
  const [isSwitched, setIsSwitched] = useState(true);
  const [selectedRole, setSelectedRole] = useState("admin");

  const tableColumns: Column<SampleItem>[] = [
    {
      key: "name",
      header: "Component / Service",
      accessor: (item) => <span className="font-semibold">{item.name}</span>,
    },
    {
      key: "category",
      header: "Category",
      accessor: (item) => <Badge variant="secondary">{item.category}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      accessor: (item) => (
        <Badge variant={item.status === "active" ? "success" : "destructive"}>{item.status}</Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      accessor: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => toast.info("Clicked Options", `Selected ${item.name}`)}
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => toast.success("Action Triggered", `Activated ${item.name}`)}
            >
              Activate Service
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-10 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Enterprise Component Catalog
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Live interactive showcase of all polished atomic primitives, feedback systems, and layout
          components.
        </p>
      </div>

      {/* 1. Buttons & Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-blue-500" /> Buttons & Badges
          </CardTitle>
          <CardDescription>
            Type-safe variants with tactile active scaling and WCAG focus indicators.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="default">Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link Button</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large Button</Button>
            <Button size="icon" aria-label="Icon Button">
              <Bell className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="default">Default Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Active / Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline Badge</Badge>
          </div>
        </CardContent>
      </Card>

      {/* 2. Inputs, Select & Form Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Zap className="h-5 w-5 text-amber-500" /> Form Primitives & Focus Controls
          </CardTitle>
          <CardDescription>
            Refactored crisp 1px focus-visible border rings conforming to WCAG 2.2 AA.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-medium">Standard Text Input</label>
            <Input placeholder="Type something here..." />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium">Input with Error State</label>
            <Input placeholder="Invalid input value" error />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium">Radix Select Dropdown</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="manager">Product Manager</SelectItem>
                <SelectItem value="developer">Lead Developer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="chk"
                checked={isChecked}
                onCheckedChange={(val) => setIsChecked(!!val)}
              />
              <label htmlFor="chk" className="cursor-pointer text-sm font-medium">
                Interactive Checkbox
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Switch id="swt" checked={isSwitched} onCheckedChange={setIsSwitched} />
              <label htmlFor="swt" className="cursor-pointer text-sm font-medium">
                Toggle Switch
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Dialog, Tooltip, Avatar & Toast Triggers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Layers className="h-5 w-5 text-emerald-500" /> Overlay & Feedback Primitives
          </CardTitle>
          <CardDescription>Modals, Tooltips, Toast alerts, and Avatars.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Avatar fallback="Alex Morgan" />
              <Avatar fallback="Sarah Connor" size="lg" />
              <Avatar fallback="JD" size="sm" />
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Info className="h-4 w-4" /> Hover for Tooltip
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> WCAG 2.2 Accessible
                    Tooltip
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" /> Open Accessible Dialog
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Radix UI Dialog Primitive</DialogTitle>
                  <DialogDescription>
                    Features focus trapping, escape key dismissal, and backdrop blur.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 text-sm text-[var(--muted-foreground)]">
                  Modal content rendered inside portal root cleanly.
                </div>
                <DialogFooter>
                  <Button variant="outline">Close Modal</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-xs font-semibold text-[var(--muted-foreground)] uppercase">
              Toast Notification Triggers:
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success("Success Toast", "Data was saved successfully.")}
            >
              Success
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.error("Error Toast", "Something went wrong.")}
            >
              Error
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.info("Info Toast", "System update scheduled.")}
            >
              Info
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.warning("Warning Toast", "Storage capacity reaching 90%.")}
            >
              Warning
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 4. Tabs & DataTable */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Tabs & DataTable System</CardTitle>
          <CardDescription>Radix tabbed containers and generic typed data grid.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table">
            <TabsList className="mb-4">
              <TabsTrigger value="table">Data Table</TabsTrigger>
              <TabsTrigger value="skeletons">Loading Skeletons</TabsTrigger>
              <TabsTrigger value="empty">Empty State</TabsTrigger>
            </TabsList>

            <TabsContent value="table">
              <DataTable data={sampleData} columns={tableColumns} keyExtractor={(i) => i.id} />
            </TabsContent>

            <TabsContent value="skeletons" className="space-y-3">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </TabsContent>

            <TabsContent value="empty">
              <EmptyState
                title="No Records Available"
                description="Switch back to Data Table tab to view live sample data."
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
