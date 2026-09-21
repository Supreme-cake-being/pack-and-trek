import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Item } from "../types";
import { colors } from "../constants/colors";

interface Props {
  item: Item;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ItemRow({ item, onToggle, onEdit, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.checkbox, item.isPacked && styles.checkboxPacked]}
        onPress={onToggle}
      >
        {item.isPacked && (
          <Ionicons name="checkmark" size={16} color={colors.white} />
        )}
      </Pressable>

      <Pressable style={styles.content} onPress={onToggle}>
        <Text style={[styles.name, item.isPacked && styles.namePacked]}>
          {item.name}
        </Text>

        <Text style={styles.weight}>
          {item.weightGrams} g{item.isCustom ? " • Custom" : ""}
        </Text>
      </Pressable>

      <Pressable style={styles.iconButton} onPress={onEdit}>
        <Ionicons name="pencil-outline" size={19} color={colors.slateLight} />
      </Pressable>

      <Pressable style={styles.iconButton} onPress={onDelete}>
        <Ionicons name="trash-outline" size={19} color={colors.danger} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 66,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.slateLighter,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxPacked: {
    backgroundColor: colors.forest,
    borderColor: colors.forest,
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },

  namePacked: {
    textDecorationLine: "line-through",
    color: colors.textSecondary,
  },

  weight: {
    marginTop: 4,
    color: colors.textSecondary,
    fontSize: 12,
  },

  iconButton: {
    padding: 10,
  },
});
