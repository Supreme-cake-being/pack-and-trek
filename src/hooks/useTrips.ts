import { useCallback, useEffect, useState } from "react";
import { deleteTrip, getTrips, saveTrip } from "../storage/storage";
import { Item, Trip } from "../types";

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTrips = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getTrips();
      setTrips(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  const addTrip = async (trip: Trip) => {
    await saveTrip(trip);
    setTrips((current) => [...current, trip]);
  };

  const updateTrip = async (trip: Trip) => {
    await saveTrip(trip);

    setTrips((current) =>
      current.map((item) => (item.id === trip.id ? trip : item)),
    );
  };

  const removeTrip = async (tripId: string) => {
    await deleteTrip(tripId);

    setTrips((current) => current.filter((trip) => trip.id !== tripId));
  };

  const updateItem = async (tripId: string, updatedItem: Item) => {
    const trip = trips.find((item) => item.id === tripId);

    if (!trip) {
      return;
    }

    const updatedTrip: Trip = {
      ...trip,
      items: trip.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item,
      ),
    };

    await updateTrip(updatedTrip);
  };

  return {
    trips,
    loading,
    addTrip,
    updateTrip,
    removeTrip,
    updateItem,
    reload: loadTrips,
  };
}
