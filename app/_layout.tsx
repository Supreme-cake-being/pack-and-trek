import { Pressable, StyleSheet, Text } from "react-native";
import { Stack } from "expo-router";
import { I18nProvider, useI18n } from "../src/i18n";
import { colors } from "../src/constants/colors";

export default function RootLayout() {
  return (
    <I18nProvider>
      <AppNavigator />
    </I18nProvider>
  );
}

function AppNavigator() {
  const { language, setLanguage, t } = useI18n();

  return (
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "800",
          },
          headerShadowVisible: false,
          headerRight: () => (
            <Pressable
              accessibilityLabel={t("settings.language")}
              hitSlop={8}
              onPress={() => setLanguage(language === "uk" ? "en" : "uk")}
              style={styles.languageButton}
            >
              <Text style={styles.languageText}>
                {language === "uk" ? "EN" : "UK"}
              </Text>
            </Pressable>
          ),
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Pack&Trek",
          }}
        />

        <Stack.Screen
          name="new-trip"
          options={{
            title: t("newTrip.title"),
            presentation: "modal",
          }}
        />

        <Stack.Screen
          name="trip/[id]"
          options={{
            title: t("trip.packingList"),
          }}
        />
      </Stack>
  );
}

const styles = StyleSheet.create({
  languageButton: {
    minWidth: 38,
    minHeight: 32,
    borderRadius: 16,
    backgroundColor: colors.forestLight,
    alignItems: "center",
    justifyContent: "center",
  },
  languageText: {
    color: colors.forest,
    fontSize: 12,
    fontWeight: "800",
  },
});
