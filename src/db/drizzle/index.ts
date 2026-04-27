import { drizzle } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzleTurso } from "drizzle-orm/libsql";
import { postTable } from "./schemas";
import Database from "better-sqlite3";
import { resolve } from "path";
import { createClient } from "@libsql/client";

const sqliteDatabasePath = resolve(
  process.cwd(),
  process.env.DATABASE_URL || "db.sqlite3",
);
const sqliteDatabase = new Database(sqliteDatabasePath);

/* export const drizzleDb = drizzle(sqliteDatabase, {
  schema: {
    posts: postTable,
  },
  logger: false,
}); */

const getDrizzleDb = async () => {
  let db: ReturnType<typeof drizzle | typeof drizzleTurso>;

  if (process.env.NODE_ENV === "production") {
    // Turso (produção / vercel)

    const client = createClient({
      url: process.env.DATABASE_URL!,
      authToken: process.env.DATABASE_TOKEN!,
    });

    db = drizzleTurso(client, {
      schema: {
        posts: postTable,
      },
      logger: false,
    });
    return db;
  } else {
    db = drizzle(sqliteDatabase, {
      schema: {
        posts: postTable,
      },
      logger: false,
    });
    return db;
  }
};

export const drizzleDb = await getDrizzleDb();
