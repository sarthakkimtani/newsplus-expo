import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("newsplus.db");

export function initDatabase() {
  db.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source TEXT,
      author TEXT,
      title TEXT NOT NULL,
      description TEXT,
      url TEXT NOT NULL UNIQUE,
      urlToImage TEXT,
      publishedAt TEXT
    );
  `);
}
