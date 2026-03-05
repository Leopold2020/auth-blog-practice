// import { drizzle } from 'drizzle-orm/node-postgres'
// import { Pool } from 'pg'
// import * as schema from './schema'

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// })

// export const db = drizzle(pool, { schema })

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  user: "events_manager",
  host: "localhost",
  database: "middleware_watcher",
  password: "123",
  port: 5432,
});

export const db = drizzle(pool);