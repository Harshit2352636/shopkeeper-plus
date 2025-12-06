import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"

const connectionString = process.env.POSTGRES_URL as string

// Skip database connection during build
let client: any
let db: any

if (process.env.NODE_ENV !== 'development' && !connectionString) {
  // During build, export dummy objects
  client = null
  db = null
} else if (connectionString) {
  client = postgres(connectionString, { prepare: false })
  db = drizzle(client)
}

export { client, db }
