import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import { Item, ItemCategory } from "../types";

import { colors } from "../constants/colors";
import { createId } from "../utils/id";
import { useI18n } from "../i18n";

interface Props {
  visible: boolean;
  item?: Item | null;
  onClose: () => void;
  onSave: (item: Item) => void;
}

const CATEGORIES: ItemCategory[] = [
  "gear",
  "clothing",
  "food",
  "hygiene",
  "electronics",
  "other",
];

export function AddItemModal({ visible, item, onClose, onSave }: Props) {
  const { t } = useI18n();

  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState<ItemCategory>("gear");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setWeight(String(item.weightGrams));
      setCategory(item.category);
    } else {
      setName("");
      setWeight("");
      setCategory("gear");
    }
  }, [item, visible]);

  const handleSave = () => {
    const parsedWeight = Number(weight);

    if (!name.trim() || !parsedWeight) {
      return;
    }

    const newItem: Item = {
      id: item?.id ?? createId(),
      name: name.trim(),
      category,
      weightGrams: parsedWeight,
      isPacked: item?.isPacked ?? false,
      isCustom: item?.isCustom ?? true,
    };

    onSave(newItem);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {item ? t("item.editItem") : t("item.addCustomItem")}
            </Text>

            <Pressable onPress={onClose}>
              <Text style={styles.close}>{t("common.cancel")}</Text>
            </Pressable>
          </View>

          <Text style={styles.label}>{t("item.nameLabel")}</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={t("item.nameExample")}
            placeholderTextColor={colors.slateLighter}
            style={styles.input}
          />

          <Text style={styles.label}>{t("item.weightLabel")}</Text>

          <View style={styles.weightInput}>
            <TextInput
              value={weight}
              onChangeText={setWeight}
              keyboardType="number-pad"
              placeholder="500"
              placeholderTextColor={colors.slateLighter}
              style={styles.weightTextInput}
            />

            <Text style={styles.unit}>{t("common.grams")}</Text>
          </View>

          <Text style={styles.label}>{t("item.categoryLabel")}</Text>

          <View style={styles.categories}>
            {CATEGORIES.map((value) => {
              const selected = category === value;

              return (
                <Pressable
                  key={value}
                  style={[styles.category, selected && styles.categorySelected]}
                  onPress={() => setCategory(value)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selected && styles.categoryTextSelected,
                    ]}
                  >
                    {t(`categories.${value}`)}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>
              {item ? t("item.saveChanges") : t("trip.addItem")}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  modal: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.text,
  },

  close: {
    color: colors.slateLight,
    fontWeight: "600",
  },

  label: {
    marginTop: 20,
    marginBottom: 8,
    color: colors.slate,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  input: {
    height: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.text,
  },

  weightInput: {
    height: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
  },

  weightTextInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 14,
    color: colors.text,
  },

  unit: {
    marginRight: 14,
    color: colors.textSecondary,
  },

  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  category: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },

  categorySelected: {
    backgroundColor: colors.forestLight,
    borderColor: colors.forest,
  },

  categoryText: {
    fontSize: 12,
    color: colors.slateLight,
    textTransform: "capitalize",
  },

  categoryTextSelected: {
    color: colors.forest,
    fontWeight: "800",
  },

  saveButton: {
    marginTop: 24,
    height: 52,
    borderRadius: 15,
    backgroundColor: colors.forest,
    alignItems: "center",
    justifyContent: "center",
  },

  saveText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
});
