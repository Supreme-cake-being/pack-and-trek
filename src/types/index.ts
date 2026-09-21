export type WeatherCondition = "sunny" | "rainy" | "cold" | "hot" | "variable";

export type ItemCategory =
  | "gear"
  | "clothing"
  | "food"
  | "hygiene"
  | "electronics"
  | "other";

export interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  weightGrams: number;
  isPacked: boolean;
  isCustom: boolean;
}

export interface Trip {
  id: string;
  title: string;
  durationDays: number;
  weatherCondition: WeatherCondition;
  items: Item[];
}
