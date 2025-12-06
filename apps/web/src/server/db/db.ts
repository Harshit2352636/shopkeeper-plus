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

interface CreditDebtEntry {
  credit_and_debt: {
    transactionDate: string | null;
    transactionId: string;
    transactionAmount: number;
    // Add other fields as needed
  };
  // Add other fields as needed
}

interface CreditDebtData {
  count: number;
  creditDebt: CreditDebtEntry[];
}

const { data } = api.creditDebt.getCreditDebt.useQuery<CreditDebtData>()

const count = data?.count ?? 0;
const tableData =
  data?.creditDebt?.map((entry: CreditDebtEntry) => ({
    transactionDate: entry.credit_and_debt.transactionDate ?? '',
    transactionId: entry.credit_and_debt.transactionId,
    transactionAmount: entry.credit_and_debt.transactionId,
  })) ?? []

export { client, db }
