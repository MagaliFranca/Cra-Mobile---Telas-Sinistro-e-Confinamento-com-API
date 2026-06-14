import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress?: () => void;
};

export default function ActionCard({ icon, title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={28} color="#14532d" />
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 95,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 30,
    backgroundColor: "#edf7ed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    color: "#14532d",
    fontWeight: "600",
  },
});