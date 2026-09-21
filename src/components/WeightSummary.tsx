import { StyleSheet, Text, View } from "react-native";
import { Item } from "../types";
import {
  calculatePackedWeight,
  calculateRemainingWeight,
  calculateTotalWeight,
  gramsToKg,
} from "../utils/weight";
import { colors } from "../constants/colors";
import { useI18n } from "../i18n";

interface Props {
  items: Item[];
}

export function WeightSummary({ items }: Props) {
  const { t } = useI18n();
  const total = calculateTotalWeight(items);
  const packed = calculatePackedWeight(items);
  const remaining = calculateRemainingWeight(items);

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{t("trip.backpackWeight")}</Text>

        <Text style={styles.total}>{gramsToKg(total)} {t("common.kilograms")}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{gramsToKg(packed)} {t("common.kilograms")}</Text>

          <Text style={styles.statLabel}>{t("trip.packed")}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.statValue}>{gramsToKg(remaining)} {t("common.kilograms")}</Text>

          <Text style={styles.statLabel}>{t("trip.remaining")}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.statValue}>{items.length}</Text>

          <Text style={styles.statLabel}>{t("common.items")}</Text>
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
