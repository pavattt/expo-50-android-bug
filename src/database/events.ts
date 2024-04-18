import { getDatabase } from "../utils/database";

export async function retrieveLocalEvents(filter?: string): Promise<
  {
    id: string;
    name: string;
    occurrence_count: number;
    default_event_id: string;
    default_start_timestamp: number;
    default_end_timestamp: number;
    timezone: string;
  }[]
> {
  const db = await getDatabase();
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          SELECT
              *
          FROM
              events
          ORDER BY start_timestamp ASC
        `,
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  });
}
