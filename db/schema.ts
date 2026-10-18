import { bigint, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core"

// One row per Telegram user. `state` holds the whole client game state
// (balance, inventory, requests, cooldowns) — see PlayerState in src/lib/store.tsx.
export const players = pgTable("players", {
  tgId: bigint("tg_id", { mode: "number" }).primaryKey(),
  firstName: text("first_name").notNull().default(""),
  username: text("username"),
  state: jsonb("state").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
