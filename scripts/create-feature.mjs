import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const featureName = process.argv[2]?.toLowerCase();

if (!featureName) {
  console.error("❌ Error: Please specify a feature name.");
  console.log("Usage: node scripts/create-feature.mjs <feature-name>");
  process.exit(1);
}

const pascalName = featureName.charAt(0).toUpperCase() + featureName.slice(1);
const targetDir = path.resolve(__dirname, `../src/features/${featureName}`);

if (fs.existsSync(targetDir)) {
  console.error(`❌ Error: Feature '${featureName}' already exists at ${targetDir}`);
  process.exit(1);
}

// Directory layout
const subDirs = ["types", "schemas", "actions", "hooks", "components"];
subDirs.forEach((dir) => fs.mkdirSync(path.join(targetDir, dir), { recursive: true }));

// 1. types/<feature>.ts
const typeContent = `export interface ${pascalName} {
  id: string;
  name: string;
  createdAt: string;
}

export interface Create${pascalName}Dto {
  name: string;
}
`;
fs.writeFileSync(path.join(targetDir, `types/${featureName}.ts`), typeContent);

// 2. schemas/<feature>Schema.ts
const schemaContent = `import { z } from "zod";

export const create${pascalName}Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type Create${pascalName}Input = z.infer<typeof create${pascalName}Schema>;
`;
fs.writeFileSync(path.join(targetDir, `schemas/${featureName}Schema.ts`), schemaContent);

// 3. actions/<feature>Actions.ts
const actionContent = `"use server";

import { create${pascalName}Schema } from "@/features/${featureName}/schemas/${featureName}Schema";
import type { Create${pascalName}Dto, ${pascalName} } from "@/features/${featureName}/types/${featureName}";
import { ValidationError } from "@/lib/errors/AppError";
import { logger } from "@/lib/logger/logger";
import type { ApiResponse } from "@/types/api";

export async function get${pascalName}sAction(): Promise<ApiResponse<${pascalName}[]>> {
  logger.info("Executing get${pascalName}sAction");
  return {
    success: true,
    data: [],
  };
}

export async function create${pascalName}Action(dto: Create${pascalName}Dto): Promise<ApiResponse<${pascalName}>> {
  const validated = create${pascalName}Schema.safeParse(dto);
  if (!validated.success) {
    throw new ValidationError("Invalid payload");
  }

  const newItem: ${pascalName} = {
    id: \`${featureName}_\${Date.now()}\`,
    name: validated.data.name,
    createdAt: new Date().toISOString(),
  };

  return {
    success: true,
    data: newItem,
  };
}
`;
fs.writeFileSync(path.join(targetDir, `actions/${featureName}Actions.ts`), actionContent);

// 4. hooks/use<Feature>.ts
const hookContent = `"use client";

import { useQuery } from "@tanstack/react-query";
import { get${pascalName}sAction } from "@/features/${featureName}/actions/${featureName}Actions";

export function use${pascalName}s() {
  return useQuery({
    queryKey: ["${featureName}s"],
    queryFn: async () => {
      const res = await get${pascalName}sAction();
      return res.data;
    },
  });
}
`;
fs.writeFileSync(path.join(targetDir, `hooks/use${pascalName}s.ts`), hookContent);

// 5. components/<Feature>List.tsx
const componentContent = `"use client";

import { use${pascalName}s } from "@/features/${featureName}/hooks/use${pascalName}s";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import { EmptyState } from "@/components/feedback/EmptyState";

export function ${pascalName}List() {
  const { data, isLoading } = use${pascalName}s();

  if (isLoading) return <Skeleton className="h-32 w-full" />;
  if (!data || data.length === 0) return <EmptyState title="No ${featureName}s" />;

  return (
    <ul className="space-y-2">
      {data.map((item) => (
        <li key={item.id} className="p-3 border rounded bg-[var(--card)]">
          {item.name}
        </li>
      ))}
    </ul>
  );
}
`;
fs.writeFileSync(path.join(targetDir, `components/${pascalName}List.tsx`), componentContent);

// 6. index.ts (Public API Boundary Export)
const indexContent = `/**
 * PUBLIC API EXPORT BOUNDARY FOR ${featureName.toUpperCase()} FEATURE
 */

export type { ${pascalName}, Create${pascalName}Dto } from "./types/${featureName}";
export { create${pascalName}Schema } from "./schemas/${featureName}Schema";
export { get${pascalName}sAction, create${pascalName}Action } from "./actions/${featureName}Actions";
export { use${pascalName}s } from "./hooks/use${pascalName}s";
export { ${pascalName}List } from "./components/${pascalName}List";
`;
fs.writeFileSync(path.join(targetDir, "index.ts"), indexContent);

// 7. Dashboard Route Page under src/app/(dashboard)/<feature>/page.tsx
const pageDir = path.resolve(__dirname, `../src/app/(dashboard)/${featureName}`);
if (!fs.existsSync(pageDir)) {
  fs.mkdirSync(pageDir, { recursive: true });
  const pageContent = `import { ${pascalName}List } from "@/features/${featureName}";

export default function ${pascalName}Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">${pascalName} Management</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Manage and monitor academy ${featureName} records.
        </p>
      </div>
      <${pascalName}List />
    </div>
  );
}
`;
  fs.writeFileSync(path.join(pageDir, "page.tsx"), pageContent);
  console.log(`✅ Route page created at src/app/(dashboard)/${featureName}/page.tsx`);
}

console.log(`✅ Feature '${featureName}' scaffolded successfully at src/features/${featureName}/`);
