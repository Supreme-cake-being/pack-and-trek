import { Item, ItemCategory, Trip, WeatherCondition } from "../types";
import { createId } from "../utils/id";

interface RecommendationItem {
  name: string;
  category: ItemCategory;
  weightGrams: number;
}

const BASE_ITEMS: RecommendationItem[] = [
  {
    name: "Backpack",
    category: "gear",
    weightGrams: 1200,
  },
  {
    name: "Sleeping bag",
    category: "gear",
    weightGrams: 900,
  },
  {
    name: "Sleeping mat",
    category: "gear",
    weightGrams: 500,
  },
  {
    name: "Tent",
    category: "gear",
    weightGrams: 1800,
  },
  {
    name: "Headlamp",
    category: "electronics",
    weightGrams: 100,
  },
  {
    name: "Water bottle",
    category: "gear",
    weightGrams: 150,
  },
  {
    name: "First aid kit",
    category: "hygiene",
    weightGrams: 250,
  },
  {
    name: "Map / compass",
    category: "gear",
    weightGrams: 100,
  },
  {
    name: "Toothbrush",
    category: "hygiene",
    weightGrams: 20,
  },
  {
    name: "Toothpaste",
    category: "hygiene",
    weightGrams: 30,
  },
  {
    name: "Phone",
    category: "electronics",
    weightGrams: 200,
  },
  {
    name: "Power bank",
    category: "electronics",
    weightGrams: 250,
  },
];

const WEATHER_ITEMS: Record<WeatherCondition, RecommendationItem[]> = {
  sunny: [
    {
      name: "Sun hat",
      category: "clothing",
      weightGrams: 80,
    },
    {
      name: "Sunscreen",
      category: "hygiene",
      weightGrams: 100,
    },
    {
      name: "Sunglasses",
      category: "clothing",
      weightGrams: 30,
    },
  ],

  rainy: [
    {
      name: "Rain jacket",
      category: "clothing",
      weightGrams: 350,
    },
    {
      name: "Rain pants",
      category: "clothing",
      weightGrams: 250,
    },
    {
      name: "Backpack rain cover",
      category: "gear",
      weightGrams: 150,
    },
  ],

  cold: [
    {
      name: "Insulated jacket",
      category: "clothing",
      weightGrams: 600,
    },
    {
      name: "Thermal base layer",
      category: "clothing",
      weightGrams: 300,
    },
    {
      name: "Warm hat",
      category: "clothing",
      weightGrams: 80,
    },
    {
      name: "Gloves",
      category: "clothing",
      weightGrams: 100,
    },
    {
      name: "Warm socks",
      category: "clothing",
      weightGrams: 100,
    },
  ],

  hot: [
    {
      name: "Lightweight shirt",
      category: "clothing",
      weightGrams: 150,
    },
    {
      name: "Lightweight shorts",
      category: "clothing",
      weightGrams: 150,
    },
    {
      name: "Extra water bottle",
      category: "gear",
      weightGrams: 150,
    },
    {
      name: "Sunscreen",
      category: "hygiene",
      weightGrams: 100,
    },
  ],

  variable: [
    {
      name: "Light rain jacket",
      category: "clothing",
      weightGrams: 300,
    },
    {
      name: "Light fleece",
      category: "clothing",
      weightGrams: 350,
    },
  ],
};

const LONG_TRIP_ITEMS: RecommendationItem[] = [
  {
    name: "Extra shirt",
    category: "clothing",
    weightGrams: 180,
  },
  {
    name: "Extra underwear",
    category: "clothing",
    weightGrams: 100,
  },
  {
    name: "Extra socks",
    category: "clothing",
    weightGrams: 100,
  },
];

const VERY_LONG_TRIP_ITEMS: RecommendationItem[] = [
  {
    name: "Extra food supplies",
    category: "food",
    weightGrams: 800,
  },
  {
    name: "Additional hygiene supplies",
    category: "hygiene",
    weightGrams: 150,
  },
];

function toItem(recommendation: RecommendationItem): Item {
  return {
    id: createId(),
    name: recommendation.name,
    category: recommendation.category,
    weightGrams: recommendation.weightGrams,
    isPacked: false,
    isCustom: false,
  };
}

export function generateRecommendations(
  durationDays: number,
  weatherCondition: WeatherCondition,
): Item[] {
  const recommendations: RecommendationItem[] = [
    ...BASE_ITEMS,
    ...WEATHER_ITEMS[weatherCondition],
  ];

  if (durationDays > 3) {
    recommendations.push(...LONG_TRIP_ITEMS);
  }

  if (durationDays > 7) {
    recommendations.push(...VERY_LONG_TRIP_ITEMS);
  }

  return recommendations.map(toItem);
}

export function createTrip(
  title: string,
  durationDays: number,
  weatherCondition: WeatherCondition,
): Trip {
  return {
    id: createId(),
    title,
    durationDays,
    weatherCondition,
    items: generateRecommendations(durationDays, weatherCondition),
  };
}
