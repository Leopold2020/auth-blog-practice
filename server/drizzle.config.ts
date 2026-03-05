import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    user: "middleware_watcher",
    host: "localhost",
    database: "middleware_practice",
    password: "123",
    port: 5432,
    ssl: false,
  },
})
