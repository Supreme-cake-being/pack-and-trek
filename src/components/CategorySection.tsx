import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { useI18n } from "../i18n";
import { colors } from "../constants/colors";
import { Item } from "../types";
import { ItemRow } from "./ItemRow";

type CategorySectionProps = {
  titleKey: string;
  icon: string;
  items: Item[];
  onToggle: (itemId: string) => void;
  onEdit: (item: Item) => void;
  onDelete: (itemId: string) => void;
};

export function CategorySection({
  titleKey,
  icon,
  items,
  onToggle,
  onEdit,
  onDelete,
}: CategorySectionProps) {
  const { t } = useI18n();

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons
            name={icon as keyof typeof Ionicons.glyphMap}
            size={20}
            color={colors.forest}
          />

          <Text style={styles.title}>{t(titleKey)}</Text>
        </View>

        <Text style={styles.count}>{items.length}</Text>
      </View>

      {items.map((item) => (
        <ItemRow
          key={item.id}
          item={item}
          onToggle={() => onToggle(item.id)}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.slate,
  },

  count: {
    fontSize: 14,
    color: colors.slateLighter,
  },
});
