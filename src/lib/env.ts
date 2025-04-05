import { z } from "zod";

const EnvSchema = z.object({
  apiBaseUrl: z.string(),
});

export const env = EnvSchema.parse({
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
});
