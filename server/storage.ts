import { type User, type InsertUser, type ReliefCenter, type InsertReliefCenter, users, reliefCenters } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getReliefCenters(): Promise<ReliefCenter[]>;
  getReliefCentersNearby(latitude: number, longitude: number, radiusKm: number): Promise<ReliefCenter[]>;
  createReliefCenter(center: InsertReliefCenter): Promise<ReliefCenter>;
  seedReliefCenters(centers: InsertReliefCenter[]): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getReliefCenters(): Promise<ReliefCenter[]> {
    return db.select().from(reliefCenters);
  }

  async getReliefCentersNearby(latitude: number, longitude: number, radiusKm: number): Promise<ReliefCenter[]> {
    const results = await db.select().from(reliefCenters);
    
    return results.filter(center => {
      const distance = this.calculateDistance(
        latitude,
        longitude,
        center.latitude,
        center.longitude
      );
      return distance <= radiusKm;
    });
  }

  async createReliefCenter(center: InsertReliefCenter): Promise<ReliefCenter> {
    const [newCenter] = await db
      .insert(reliefCenters)
      .values(center)
      .returning();
    return newCenter;
  }

  async seedReliefCenters(centers: InsertReliefCenter[]): Promise<void> {
    if (centers.length === 0) return;
    await db.insert(reliefCenters).values(centers);
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

export const storage = new DatabaseStorage();
