import { Item, ItemCategory, Trip, WeatherCondition } from "../types";
import { createId } from "../utils/id";
import { en } from "../i18n/locales/en";

interface RecommendationItem {
  nameKey: string;
  category: ItemCategory;
  weightGrams: number;
}

function translateEnglishRecommendation(key: string): string {
  const itemKey = key.replace(
    "recommendations.",
    "",
  ) as keyof typeof en.recommendations;

  return en.recommendations[itemKey] ?? key;
}

const BASE_ITEMS: RecommendationItem[] = [
  {
    nameKey: "recommendations.backpack",
    category: "gear",
    weightGrams: 1200,
  },
  {
    nameKey: "recommendations.sleepingBag",
    category: "gear",
    weightGrams: 900,
  },
  {
    nameKey: "recommendations.sleepingMat",
    category: "gear",
    weightGrams: 500,
  },
  {
    nameKey: "recommendations.tent",
    category: "gear",
    weightGrams: 1800,
  },
  {
    nameKey: "recommendations.headlamp",
    category: "electronics",
    weightGrams: 100,
  },
  {
    nameKey: "recommendations.waterBottle",
    category: "gear",
    weightGrams: 150,
  },
  {
    nameKey: "recommendations.firstAidKit",
    category: "hygiene",
    weightGrams: 250,
  },
  {
    nameKey: "recommendations.mapCompass",
    category: "gear",
    weightGrams: 100,
  },
  {
    nameKey: "recommendations.toothbrush",
    category: "hygiene",
    weightGrams: 20,
  },
  {
    nameKey: "recommendations.toothpaste",
    category: "hygiene",
    weightGrams: 30,
  },
  {
    nameKey: "recommendations.phone",
    category: "electronics",
    weightGrams: 200,
  },
  {
    nameKey: "recommendations.powerBank",
    category: "electronics",
    weightGrams: 250,
  },
];

const WEATHER_ITEMS: Record<WeatherCondition, RecommendationItem[]> = {
  sunny: [
    {
      nameKey: "recommendations.sunHat",
      category: "clothing",
      weightGrams: 80,
    },
    {
      nameKey: "recommendations.sunscreen",
      category: "hygiene",
      weightGrams: 100,
    },
    {
      nameKey: "recommendations.sunglasses",
      category: "clothing",
      weightGrams: 30,
    },
  ],

  rainy: [
    {
      nameKey: "recommendations.rainJacket",
      category: "clothing",
      weightGrams: 350,
    },
    {
      nameKey: "recommendations.rainPants",
      category: "clothing",
      weightGrams: 250,
    },
    {
      nameKey: "recommendations.backpackRainCover",
      category: "gear",
      weightGrams: 150,
    },
  ],

  cold: [
    {
      nameKey: "recommendations.insulatedJacket",
      category: "clothing",
      weightGrams: 600,
    },
    {
      nameKey: "recommendations.thermalBaseLayer",
      category: "clothing",
      weightGrams: 300,
    },
    {
      nameKey: "recommendations.warmHat",
      category: "clothing",
      weightGrams: 80,
    },
    {
      nameKey: "recommendations.gloves",
      category: "clothing",
      weightGrams: 100,
    },
    {
      nameKey: "recommendations.warmSocks",
      category: "clothing",
      weightGrams: 100,
    },
  ],

  hot: [
    {
      nameKey: "recommendations.lightweightShirt",
      category: "clothing",
      weightGrams: 150,
    },
    {
      nameKey: "recommendations.lightweightShorts",
      category: "clothing",
      weightGrams: 150,
    },
    {
      nameKey: "recommendations.extraWaterBottle",
      category: "gear",
      weightGrams: 150,
    },
    {
      nameKey: "recommendations.sunscreen",
      category: "hygiene",
      weightGrams: 100,
    },
  ],

  variable: [
    {
      nameKey: "recommendations.lightRainJacket",
      category: "clothing",
      weightGrams: 300,
    },
    {
      nameKey: "recommendations.lightFleece",
      category: "clothing",
      weightGrams: 350,
    },
  ],
};

const LONG_TRIP_ITEMS: RecommendationItem[] = [
  {
    nameKey: "recommendations.extraShirt",
    category: "clothing",
    weightGrams: 180,
  },
  {
    nameKey: "recommendations.extraUnderwear",
    category: "clothing",
    weightGrams: 100,
  },
  {
    nameKey: "recommendations.extraSocks",
    category: "clothing",
    weightGrams: 100,
  },
];

const VERY_LONG_TRIP_ITEMS: RecommendationItem[] = [
  {
    nameKey: "recommendations.extraFoodSupplies",
    category: "food",
    weightGrams: 800,
  },
  {
    nameKey: "recommendations.additionalHygieneSupplies",
    category: "hygiene",
    weightGrams: 150,
  },
];

function toItem(
  recommendation: RecommendationItem,
  t: (key: string) => string,
): Item {
  return {
    id: createId(),
    name: t(recommendation.nameKey),
    category: recommendation.category,
    weightGrams: recommendation.weightGrams,
    isPacked: false,
    isCustom: false,
  };
}

export function generateRecommendations(
  durationDays: number,
  weatherCondition: WeatherCondition,
  t: (key: string) => string = translateEnglishRecommendation,
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

  return recommendations.map((recommendation) => toItem(recommendation, t));
}

export function createTrip(
  title: string,
  durationDays: number,
  weatherCondition: WeatherCondition,
  t: (key: string) => string = translateEnglishRecommendation,
): Trip {
  return {
    id: createId(),
    title,
    durationDays,
    weatherCondition,
    items: generateRecommendations(durationDays, weatherCondition, t),
  };
}
