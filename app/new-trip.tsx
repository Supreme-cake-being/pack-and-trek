import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../src/constants/colors";
import { WeatherCondition } from "../src/types";
import { createTrip } from "../src/data/recommendations";
import { saveTrip } from "../src/storage/storage";
import { useI18n } from "../src/i18n";
import { BackButton } from "../src/components/BackButton";

const WEATHER_OPTIONS: {
  value: WeatherCondition;
  labelKey: string;
  icon: string;
  descriptionKey: string;
}[] = [
  {
    value: "sunny",
    labelKey: "weather.sunny",
    icon: "sunny-outline",
    descriptionKey: "newTrip.weatherSunnyDescription",
  },
  {
    value: "rainy",
    labelKey: "weather.rainy",
    icon: "rainy-outline",
    descriptionKey: "newTrip.weatherRainyDescription",
  },
  {
    value: "cold",
    labelKey: "weather.cold",
    icon: "snow-outline",
    descriptionKey: "newTrip.weatherColdDescription",
  },
  {
    value: "hot",
    labelKey: "weather.hot",
    icon: "thermometer-outline",
    descriptionKey: "newTrip.weatherHotDescription",
  },
  {
    value: "variable",
    labelKey: "weather.variable",
    icon: "partly-sunny-outline",
    descriptionKey: "newTrip.weatherVariableDescription",
  },
];

export default function NewTripScreen() {
  const { t } = useI18n();
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("2");
  const [weather, setWeather] = useState<WeatherCondition>("sunny");
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    const days = Number(duration);

    if (!title.trim()) {
      Alert.alert(
        t("validation.tripNameRequired"),
        t("validation.tripNameRequiredDescription"),
      );
      return;
    }

    if (!Number.isInteger(days) || days < 1) {
      Alert.alert(
        t("validation.invalidDuration"),
        t("validation.invalidDurationDescription"),
      );
      return;
    }

    try {
      setSaving(true);

      const trip = createTrip(title.trim(), days, weather, t);

      await saveTrip(trip);

      router.replace(`/trip/${trip.id}`);
    } catch {
      Alert.alert(t("confirm.error"), t("validation.saveError"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 8,
          paddingBottom: insets.bottom + 40,
        },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <BackButton />

      <View style={styles.intro}>
        <Text style={styles.title}>{t("newTrip.introTitle")}</Text>

        <Text style={styles.description}>{t("newTrip.introDescription")}</Text>
      </View>

      <Text style={styles.label}>{t("newTrip.tripName")}</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder={t("newTrip.tripNamePlaceholder")}
        placeholderTextColor={colors.slateLighter}
        style={styles.input}
      />

      <Text style={styles.label}>{t("newTrip.duration")}</Text>

      <View style={styles.durationContainer}>
        <TextInput
          value={duration}
          onChangeText={setDuration}
          keyboardType="number-pad"
          style={styles.durationInput}
        />

        <Text style={styles.days}>{t("newTrip.days")}</Text>
      </View>

      <Text style={styles.label}>{t("newTrip.weather")}</Text>

      <View style={styles.weatherGrid}>
        {WEATHER_OPTIONS.map((option) => {
          const selected = weather === option.value;

          return (
            <Pressable
              key={option.value}
              style={[
                styles.weatherOption,
                selected && styles.weatherOptionSelected,
              ]}
              onPress={() => setWeather(option.value)}
            >
              <Ionicons
                name={option.icon as any}
                size={25}
                color={selected ? colors.forest : colors.slateLight}
              />

              <Text
                style={[
                  styles.weatherLabel,
                  selected && styles.weatherLabelSelected,
                ]}
              >
                {t(option.labelKey)}
              </Text>

              <Text style={styles.weatherDescription}>
                {t(option.descriptionKey)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="sparkles-outline" size={22} color={colors.amber} />

        <Text style={styles.infoText}>{t("newTrip.info")}</Text>
      </View>

      <Pressable
        style={[styles.createButton, saving && styles.disabled]}
        disabled={saving}
        onPress={handleCreate}
      >
        <Text style={styles.createButtonText}>
          {saving ? t("newTrip.creating") : t("newTrip.createPackingList")}
        </Text>

        <Ionicons name="arrow-forward" size={20} color={colors.white} />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
  },

  intro: {
    marginBottom: 28,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.text,
  },

  description: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },

  label: {
    marginTop: 20,
    marginBottom: 8,
    color: colors.slate,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  input: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 15,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },

  durationContainer: {
    height: 52,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
  },

  durationInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
  },

  days: {
    marginRight: 16,
    color: colors.textSecondary,
  },

  weatherGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  weatherOption: {
    width: "48%",
    minHeight: 105,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
  },

  weatherOptionSelected: {
    backgroundColor: colors.forestLight,
    borderColor: colors.forest,
  },

  weatherLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
  },

  weatherLabelSelected: {
    color: colors.forest,
  },

  weatherDescription: {
    marginTop: 3,
    fontSize: 11,
    color: colors.textSecondary,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.amberLight,
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    gap: 12,
  },

  infoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: colors.slate,
  },

  createButton: {
    height: 56,
    borderRadius: 17,
    marginTop: 24,
    backgroundColor: colors.forest,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  createButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },

  disabled: {
    opacity: 0.6,
  },
});
