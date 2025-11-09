import { sql } from "drizzle-orm";
import { pgTable, text, varchar, doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const reliefCenters = pgTable("relief_centers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: varchar("type", { length: 20 }).notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  address: text("address").notNull(),
  phone: text("phone"),
  hours: text("hours"),
  lastUpdated: timestamp("last_updated").notNull().default(sql`now()`),
});

export const insertReliefCenterSchema = createInsertSchema(reliefCenters).omit({
  id: true,
  lastUpdated: true,
});

export type InsertReliefCenter = z.infer<typeof insertReliefCenterSchema>;
export type ReliefCenter = typeof reliefCenters.$inferSelect;
