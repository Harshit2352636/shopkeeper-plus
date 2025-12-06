import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"

const connectionString = process.env.POSTGRES_URL as string

// Skip database connection during build
let client: any
let db: any

if (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'development') {
  client = postgres(connectionString, { prepare: false })
  db = drizzle(client)
} else if (process.env.VERCEL_ENV === 'production') {
  // Only create connection in production runtime, not build time
  if (connectionString) {
    client = postgres(connectionString, { prepare: false })
    db = drizzle(client)
  }
}

export { client, db }
