import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Trip } from "../types";
import { colors } from "../constants/colors";
import {
  calculatePackedWeight,
  calculateTotalWeight,
  gramsToKg,
} from "../utils/weight";

interface Props {
  trip: Trip;
  onPress: () => void;
  onDelete: () => void;
}

const WEATHER_ICONS: Record<Trip["weatherCondition"], string> = {
  sunny: "sunny-outline",
  rainy: "rainy-outline",
  cold: "snow-outline",
  hot: "thermometer-outline",
  variable: "partly-sunny-outline",
};

export function TripCard({ trip, onPress, onDelete }: Props) {
  const total = calculateTotalWeight(trip.items);
  const packed = calculatePackedWeight(trip.items);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.icon}>
        <Ionicons
          name={WEATHER_ICONS[trip.weatherCondition] as any}
          size={25}
          color={colors.forest}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{trip.title}</Text>

        <Text style={styles.meta}>
          {trip.durationDays} {trip.durationDays === 1 ? "day" : "days"}
          {" • "}
          {trip.items.length} items
        </Text>

        <View style={styles.weightRow}>
          <Text style={styles.weight}>
            {gramsToKg(packed)} / {gramsToKg(total)} kg packed
          </Text>
        </View>
      </View>

      <Pressable
        style={styles.delete}
        onPress={(event) => {
          event.stopPropagation();
          onDelete();
        }}
      >
        <Ionicons name="trash-outline" size={19} color={colors.danger} />
      </Pressable>

      <Ionicons name="chevron-forward" size={20} color={colors.slateLighter} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  pressed: {
    opacity: 0.8,
  },

  icon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.forestLight,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
  },

  meta: {
    marginTop: 4,
    color: colors.textSecondary,
    fontSize: 12,
  },

  weightRow: {
    marginTop: 8,
  },

  weight: {
    color: colors.forest,
    fontSize: 12,
    fontWeight: "700",
  },

  delete: {
    padding: 10,
    marginRight: 4,
  },
});
