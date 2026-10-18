CREATE TABLE "players" (
	"tg_id" bigint PRIMARY KEY,
	"first_name" text DEFAULT '' NOT NULL,
	"username" text,
	"state" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
