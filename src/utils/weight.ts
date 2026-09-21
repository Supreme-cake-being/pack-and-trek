import { Item } from "../types";

export function calculateTotalWeight(items: Item[]): number {
  return items.reduce((total, item) => total + item.weightGrams, 0);
}

export function calculatePackedWeight(items: Item[]): number {
  return items
    .filter((item) => item.isPacked)
    .reduce((total, item) => total + item.weightGrams, 0);
}

export function calculateRemainingWeight(items: Item[]): number {
  return items
    .filter((item) => !item.isPacked)
    .reduce((total, item) => total + item.weightGrams, 0);
}

export function gramsToKg(grams: number): string {
  return (grams / 1000).toFixed(2);
}
