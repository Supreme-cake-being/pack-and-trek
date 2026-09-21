import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../src/constants/colors";
import { useTrips } from "../../src/hooks/useTrips";
import { Item } from "../../src/types";

import { WeightSummary } from "../../src/components/WeightSummary";
import { CategorySection } from "../../src/components/CategorySection";
import { AddItemModal } from "../../src/components/AddItemModal";
import { categories } from "../../src/constants/categories";
import { useI18n } from "../../src/i18n";

type Filter = "all" | "packed" | "unpacked";

export default function TripDetailScreen() {
  const { t } = useI18n();
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { trips, updateTrip } = useTrips();

  const trip = trips.find((item) => item.id === id);

  const [filter, setFilter] = useState<Filter>("all");

  const [search, setSearch] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const filteredItems = useMemo(() => {
    if (!trip) {
      return [];
    }

    const query = search.trim().toLowerCase();

    return trip.items.filter((item) => {
      const matchesSearch = !query || item.name.toLowerCase().includes(query);

      const matchesFilter =
        filter === "all" ||
        (filter === "packed" && item.isPacked) ||
        (filter === "unpacked" && !item.isPacked);

      return matchesSearch && matchesFilter;
    });
  }, [trip, search, filter]);

  if (!trip) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundTitle}>{t("trip.notFound")}</Text>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>{t("common.back")}</Text>
        </Pressable>
      </View>
    );
  }

  const updateItems = async (items: Item[]) => {
    await updateTrip({
      ...trip,
      items,
    });
  };

  const toggleItem = async (item: Item) => {
    await updateItems(
      trip.items.map((current) =>
        current.id === item.id
          ? {
              ...current,
              isPacked: !current.isPacked,
            }
          : current,
      ),
    );
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setModalVisible(true);
  };

  const handleSaveItem = async (item: Item) => {
    const exists = trip.items.some((current) => current.id === item.id);

    if (exists) {
      await updateItems(
        trip.items.map((current) => (current.id === item.id ? item : current)),
      );
    } else {
      await updateItems([...trip.items, item]);
    }
  };

  const handleDelete = (item: Item) => {
    Alert.alert(
      t("confirm.deleteItem"),
      t("trip.removeItem"),
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: () =>
            updateItems(trip.items.filter((current) => current.id !== item.id)),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.tripHeader}>
          <View style={styles.tripHeaderText}>
            <Text style={styles.title}>{trip.title}</Text>

            <Text style={styles.subtitle}>
              {trip.durationDays} {t("trip.days")} • {t(`weather.${trip.weatherCondition}`)}
            </Text>
          </View>

          <Ionicons name="leaf-outline" size={28} color={colors.forest} />
        </View>

        <WeightSummary items={trip.items} />

        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={19}
            color={colors.slateLighter}
          />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder={t("trip.searchItems")}
            placeholderTextColor={colors.slateLighter}
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {(
            [
              ["all", "trip.all"],
              ["unpacked", "trip.unpacked"],
              ["packed", "trip.packed"],
            ] as [Filter, string][]
          ).map(([value, label]) => {
            const selected = filter === value;

            return (
              <Pressable
                key={value}
                style={[styles.filter, selected && styles.filterSelected]}
                onPress={() => setFilter(value)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selected && styles.filterTextSelected,
                  ]}
                >
                  {t(label)}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {categories.map((category) => (
          <CategorySection
            key={category.id}
            titleKey={category.labelKey}
            icon={category.icon}
            items={filteredItems.filter((item) => item.category === category.id)}
            onToggle={toggleItem}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

        {filteredItems.length === 0 && (
          <View style={styles.noResults}>
            <Ionicons
              name="search-outline"
              size={30}
              color={colors.slateLighter}
            />

            <Text style={styles.noResultsTitle}>{t("trip.noItems")}</Text>

            <Text style={styles.noResultsText}>
              {t("trip.noItemsDescription")}
            </Text>
          </View>
        )}
      </ScrollView>

      <Pressable style={styles.addButton} onPress={handleAdd}>
        <Ionicons name="add" size={24} color={colors.white} />

        <Text style={styles.addButtonText}>{t("trip.addItem")}</Text>
      </Pressable>

      <AddItemModal
        visible={modalVisible}
        item={editingItem}
        onClose={() => {
          setModalVisible(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 110,
  },

  tripHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  tripHeaderText: {
    flex: 1,
  },

  title: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.text,
  },

  subtitle: {
    marginTop: 5,
    color: colors.textSecondary,
    fontSize: 13,
    textTransform: "capitalize",
  },

  searchContainer: {
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  searchInput: {
    flex: 1,
    marginLeft: 9,
    color: colors.text,
    fontSize: 14,
  },

  filters: {
    paddingVertical: 14,
    gap: 8,
  },

  filter: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },

  filterSelected: {
    backgroundColor: colors.forest,
    borderColor: colors.forest,
  },

  filterText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.slateLight,
  },

  filterTextSelected: {
    color: colors.white,
  },

  noResults: {
    alignItems: "center",
    paddingVertical: 50,
  },

  noResultsTitle: {
    marginTop: 10,
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },

  noResultsText: {
    marginTop: 5,
    color: colors.textSecondary,
    fontSize: 13,
  },

  addButton: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    height: 54,
    backgroundColor: colors.forest,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    elevation: 5,
  },

  addButtonText: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 15,
  },

  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },

  notFoundTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },

  backText: {
    marginTop: 12,
    color: colors.forest,
    fontWeight: "700",
  },
});
