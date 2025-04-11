import { WasteEntry } from '../types/waste';

let mockData: WasteEntry[] = [];

export const getWasteEntries = (): WasteEntry[] => mockData;

export const addWasteEntry = (entry: WasteEntry) => {
  mockData.push(entry);
};
