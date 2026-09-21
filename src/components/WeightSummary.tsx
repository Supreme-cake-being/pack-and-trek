import { StyleSheet, Text, View } from "react-native";
import { Item } from "../types";
import {
  calculatePackedWeight,
  calculateRemainingWeight,
  calculateTotalWeight,
  gramsToKg,
} from "../utils/weight";
import { colors } from "../constants/colors";

interface Props {
  items: Item[];
}

export function WeightSummary({ items }: Props) {
  const total = calculateTotalWeight(items);
  const packed = calculatePackedWeight(items);
  const remaining = calculateRemainingWeight(items);

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Backpack Weight</Text>

        <Text style={styles.total}>{gramsToKg(total)} kg</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{gramsToKg(packed)} kg</Text>

          <Text style={styles.statLabel}>Packed</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.statValue}>{gramsToKg(remaining)} kg</Text>

          <Text style={styles.statLabel}>Remaining</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.statValue}>{items.length}</Text>

          <Text style={styles.statLabel}>Items</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.forest,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },

  total: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "800",
  },

  stats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "700",
  },

  statLabel: {
    color: "#D7E8DE",
    fontSize: 12,
    marginTop: 4,
  },

  divider: {
    width: 1,
    height: 35,
    backgroundColor: "#5D806C",
  },
});
