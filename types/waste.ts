export type WasteCategory = 'Organic' | 'Recyclable' | 'Hazardous' | 'E-Waste';

export interface WasteEntry {
  id: string;
  date: string;
  category: WasteCategory;
  weightKg: number;
}
