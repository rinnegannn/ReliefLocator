import { drizzle as drizzleNeon } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import { Pool, neonConfig } from '@neondatabase/serverless';
import Database from 'better-sqlite3';
import ws from "ws";
import * as pgSchema from "@shared/schema";
import * as sqliteSchema from "@shared/sqlite-schema";

neonConfig.webSocketConstructor = ws;

// Auto-detect database type based on DATABASE_URL
export const isDatabaseSqlite = !process.env.DATABASE_URL;

let dbInstance: any;
let poolInstance: Pool | null = null;

if (isDatabaseSqlite) {
  // SQLite for local development
  console.log('📁 Using SQLite database for local development (./dev.db)');
  const sqlite = new Database('./dev.db');
  
  // Enable foreign keys
  sqlite.pragma('foreign_keys = ON');
  
  dbInstance = drizzleSqlite(sqlite, { schema: sqliteSchema });
  
  // Initialize tables for SQLite
  // IMPORTANT: These CREATE TABLE statements must match shared/sqlite-schema.ts
  // When modifying the schema, update BOTH files to prevent drift
  // 
  // Note: SQL DEFAULT clauses are omitted because Drizzle handles defaults
  // via $defaultFn at insert-time (see shared/sqlite-schema.ts)
  const tableStatements = [
    // Users table - structure matches shared/sqlite-schema.ts
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`,
    // Relief centers table - structure matches shared/sqlite-schema.ts
    `CREATE TABLE IF NOT EXISTS relief_centers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      address TEXT NOT NULL,
      phone TEXT,
      hours TEXT,
      last_updated INTEGER NOT NULL
    )`
  ];
  
  for (const statement of tableStatements) {
    sqlite.exec(statement);
  }
  
  console.log('✓ SQLite tables initialized');
} else {
  // PostgreSQL/Neon for production
  console.log('🔗 Using PostgreSQL database (Neon)');
  poolInstance = new Pool({ connectionString: process.env.DATABASE_URL });
  dbInstance = drizzleNeon({ client: poolInstance, schema: pgSchema });
}

export const db = dbInstance;
export const pool = poolInstance;
export const schema = isDatabaseSqlite ? sqliteSchema : pgSchema;
