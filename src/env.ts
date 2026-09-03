import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    API_BASE_URL: z.string().url().default("https://api.example.com"),
    API_SECRET_KEY: z.string().min(1).default("super_secret_enterprise_key_change_in_prod"),
  },
  client: {
    NEXT_PUBLIC_APP_NAME: z.string().min(1).default("Enterprise Scaffold"),
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
    NEXT_PUBLIC_ENABLE_ANALYTICS: z
      .string()
      .transform((val) => val === "true")
      .default(false),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_NAME: process.env["NEXT_PUBLIC_APP_NAME"],
    NEXT_PUBLIC_APP_URL: process.env["NEXT_PUBLIC_APP_URL"],
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env["NEXT_PUBLIC_ENABLE_ANALYTICS"],
  },
  skipValidation: !!process.env["SKIP_ENV_VALIDATION"],
  emptyStringAsUndefined: true,
});
