import { Stack } from "expo-router";
import { I18nProvider } from "../src/i18n";
import { colors } from "../src/constants/colors";

export default function RootLayout() {
  return (
    <I18nProvider>
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
            title: "Plan New Trip",
            presentation: "modal",
          }}
        />

        <Stack.Screen
          name="trip/[id]"
          options={{
            title: "Packing List",
          }}
        />
      </Stack>
    </I18nProvider>
  );
}
