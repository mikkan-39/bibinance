import { StyleSheet, Text, View } from "react-native";

export default function TradingPage() {
  return (
    <View style={styles.container}>
      <Text>Trading Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
