import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const reliefCenters = sqliteTable("relief_centers", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  type: text("type").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  address: text("address").notNull(),
  phone: text("phone"),
  hours: text("hours"),
  lastUpdated: integer("last_updated", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const insertReliefCenterSchema = createInsertSchema(reliefCenters).omit({
  id: true,
  lastUpdated: true,
});

export type InsertReliefCenter = z.infer<typeof insertReliefCenterSchema>;
export type ReliefCenter = typeof reliefCenters.$inferSelect;
