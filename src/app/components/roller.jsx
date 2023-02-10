import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGetPopularCoinsQuery } from "../api/api";

export default Roller = () => {
  const { data, error, isLoading } = useGetPopularCoinsQuery();

  if (data)
    return (
      <FlatList
        style={styles.roller}
        horizontal={true}
        contentContainerStyle={styles.rollerContent}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <View style={styles.miniCoin}>
            <Text>{item.item.symbol}</Text>
          </View>
        )}
      />
    );
  if (!data) return <ActivityIndicator style={styles.roller} />;
};

const styles = StyleSheet.create({
  roller: {
    margin: 10,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  rollerContent: { alignItems: "stretch" },
  miniCoin: {
    width: 75,
    margin: 10,
    marginRight: 0,
    paddingHorizontal: 5,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    borderRadius: 5,
    fontSize: 20,
    color: "black",
  },
});
