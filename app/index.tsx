import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";

import { useTrips } from "../src/hooks/useTrips";
import { TripCard } from "../src/components/TripCard";
import { EmptyState } from "../src/components/EmptyState";
import { colors } from "../src/constants/colors";
import { useI18n } from "../src/i18n";

export default function HomeScreen() {
  const { trips, loading, removeTrip, reload } = useTrips();
  const { t } = useI18n();

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const handleDelete = (tripId: string) => {
    Alert.alert(
      t("confirm.deleteTrip"),
      t("confirm.deleteTripDescription"),
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: () => removeTrip(tripId),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View>
          <Text style={styles.eyebrow}>{t("home.adventures")}</Text>

          <Text style={styles.heading}>
            {t("home.tagline")}
          </Text>
        </View>

        <View style={styles.heroIcon}>
          <Ionicons name="trail-sign" size={34} color={colors.forest} />
        </View>
      </View>

      {loading ? (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>{t("home.loading")}</Text>
        </View>
      ) : trips.length === 0 ? (
        <EmptyState
          title={t("home.emptyTitle")}
          description={t("home.emptyDescription")}
        />
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(trip) => trip.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TripCard
              trip={item}
              onPress={() => router.push(`/trip/${item.id}`)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      )}

      <Pressable style={styles.fab} onPress={() => router.push("/new-trip")}>
        <Ionicons name="add" size={28} color={colors.white} />

        <Text style={styles.fabText}>{t("home.planNewTrip")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  hero: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: "800",
    color: colors.forest,
  },

  heading: {
    marginTop: 6,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "900",
    color: colors.text,
  },

  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: colors.amberLight,
    alignItems: "center",
    justifyContent: "center",
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: colors.textSecondary,
  },

  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
    backgroundColor: colors.forest,
    borderRadius: 18,
    paddingHorizontal: 18,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    elevation: 5,
    shadowColor: colors.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  fabText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
  },
});
