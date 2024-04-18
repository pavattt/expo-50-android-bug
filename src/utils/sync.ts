import { fetchEvents } from './api';

export async function downloadAndSaveEvents() {
  return fetchEvents().then(async (events: any[]) => {
    console.log(events);
    if (events.length === 0) {
      return;
    }
  });
}
