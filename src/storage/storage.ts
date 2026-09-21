import AsyncStorage from "@react-native-async-storage/async-storage";
import { Trip } from "../types";

const TRIPS_STORAGE_KEY = "@pack_and_trek/trips";

export async function getTrips(): Promise<Trip[]> {
  try {
    const stored = await AsyncStorage.getItem(TRIPS_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored) as Trip[];
  } catch (error) {
    console.error("Failed to load trips:", error);
    return [];
  }
}

export async function saveTrips(trips: Trip[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
  } catch (error) {
    console.error("Failed to save trips:", error);
    throw error;
  }
}

export async function saveTrip(trip: Trip): Promise<void> {
  const trips = await getTrips();

  const index = trips.findIndex((existing) => existing.id === trip.id);

  if (index === -1) {
    trips.push(trip);
  } else {
    trips[index] = trip;
  }

  await saveTrips(trips);
}

export async function deleteTrip(tripId: string): Promise<void> {
  const trips = await getTrips();

  await saveTrips(trips.filter((trip) => trip.id !== tripId));
}
