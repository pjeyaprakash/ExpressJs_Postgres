import { Pool } from "pg";
import {env} from "./env.js"

export const db = new Pool({
  host: env.dbHost,
  port: env.dbPort,
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
  ssl: env.nodeEnv === "production" ? { rejectUnauthorized: false } : false
})

// db.on("connect", () => {
//   console.log("PostgreSQL connected");
// })

try {
  const client = await db.connect();
  console.log("PostgreSQL connected");
  client.release();
} catch (err) {
  console.error("Failed to connect PostgreSQL", err.message);
  process.exit(1);
}
