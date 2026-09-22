import { ItemCategory } from "../types";

export const categories = [
  {
    id: "gear",
    labelKey: "categories.gear",
    icon: "briefcase-outline",
  },
  {
    id: "clothing",
    labelKey: "categories.clothing",
    icon: "shirt",
  },
  {
    id: "food",
    labelKey: "categories.food",
    icon: "restaurant",
  },
  {
    id: "hygiene",
    labelKey: "categories.hygiene",
    icon: "water",
  },
  {
    id: "electronics",
    labelKey: "categories.electronics",
    icon: "flash",
  },
  {
    id: "other",
    labelKey: "categories.other",
    icon: "cube",
  },
] as const;

export type CategoryDefinition = {
  id: ItemCategory;
  labelKey: string;
  icon: string;
};
