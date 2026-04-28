import { drizzle as drizzleTurso } from "drizzle-orm/libsql";
/*import { drizzle } from "drizzle-orm/better-sqlite3";*/
import { postTable } from "./schemas";
import { resolve } from "path";
import { createClient } from "@libsql/client";

const sqliteDatabasePath = resolve(
  process.cwd(),
  process.env.DATABASE_URL || "db.sqlite3",
);

/* export const drizzleDb = drizzle(sqliteDatabasePath, {
  schema: {
    posts: postTable,
  },
  logger: false,
});
*/

let db;

if (Boolean(Number(process.env.USE_TURSO))) {
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
} else {
  const { drizzle } = await import("drizzle-orm/better-sqlite3");
  const Database = (await import("better-sqlite3")).default;
  const sqliteDatabase = new Database(sqliteDatabasePath);

  db = drizzle(sqliteDatabase, {
    schema: {
      posts: postTable,
    },
    logger: false,
  });
}

export const drizzleDb = db;
