import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { SQLTransaction } from 'expo-sqlite';

const DB_NAME = 'bug.db';

export const getDatabase = async (dbName: string = DB_NAME) => {
  return SQLite.openDatabase(dbName);
};

// Check and run migrations
export const initDatabase = async () => {
  const db = await getDatabase();

  const dbFolder = FileSystem.documentDirectory + 'SQLite';
  console.log('[Database] SQLite directory:', decodeURIComponent(dbFolder));

  const migrations = [
    {
      version: 1,
      migrate: async (tx: SQLTransaction) => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS events (
          id varchar(255) PRIMARY KEY NOT NULL,
          start_timestamp integer NOT NULL,
          end_timestamp integer NOT NULL
        )`);
        tx.executeSql(`CREATE INDEX IF NOT EXISTS start_timestamp ON events (start_timestamp)`);
        tx.executeSql(`CREATE INDEX IF NOT EXISTS end_timestamp ON events (end_timestamp)`);

      },
    },
  ];

  // Create migrations table if it doesn't exist first, this itself cant be in a migration
  db.transaction((tx) => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS migrations (
      version integer PRIMARY KEY NOT NULL,
      migrated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`);
  });

  // Migration transaction
  db.transaction((tx) => {
    // Get current database version
    tx.executeSql('SELECT version FROM migrations ORDER BY version DESC LIMIT 1', [], (tx, results) => {
      const currentVersion = results.rows.length > 0 ? results.rows.item(0).version : 0;
      console.log('[Database] Current version:', currentVersion);

      // Run migrations
      migrations.forEach((migration) => {
        if (migration.version > currentVersion) {
          migration.migrate(tx);
          tx.executeSql('INSERT INTO migrations (version) VALUES (?)', [migration.version]);
        }
      });
    });
  });
};
