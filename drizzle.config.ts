import {defineConfig} from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres:postgres@localhost:5432/postgres",
  },
  schema: ["./src/schema.ts"],
  out: "./migrations",
});
