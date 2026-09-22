import { Pressable, StyleSheet, Text } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nProvider, useI18n } from "../src/i18n";
import { colors } from "../src/constants/colors";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <I18nProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </I18nProvider>
    </SafeAreaProvider>
  );
}
