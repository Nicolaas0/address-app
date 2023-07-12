/* eslint-disable unicorn/filename-case */
// eslint-disable-next-line unicorn/filename-case
import { PhoneBookEntry } from "./types";

export function sortAndGroupPhoneBook(data: PhoneBookEntry[]): Record<string, PhoneBookEntry[]> {
  data.sort((a, b) => a.name.localeCompare(b.name));

  const groupedData: Record<string, PhoneBookEntry[]> = {};

  for (const entry of data) {
      const firstLetter = entry.name[0].toUpperCase();
      
      if (!groupedData[firstLetter]) {
          groupedData[firstLetter] = [];
      }
      groupedData[firstLetter].push(entry);
  }

  return groupedData;
}