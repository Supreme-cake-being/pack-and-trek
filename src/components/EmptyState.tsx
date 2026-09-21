import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";

interface Props {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Ionicons name="trail-sign-outline" size={36} color={colors.forest} />
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 80,
  },

  icon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.forestLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },

  description: {
    marginTop: 8,
    textAlign: "center",
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
