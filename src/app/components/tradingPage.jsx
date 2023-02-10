import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGetTradingCoinsQuery } from "../api/api";
import Roller from "./roller";

export default function TradingPage() {
  const { data, error, isLoading, refetch } = useGetTradingCoinsQuery({});

  useEffect(() => {
    if (data) console.log(data[0]);
  }, [data, error, isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const Header = () => {
    return (
      <View style={styles.headerView}>
        <Text style={styles.sectionLabel}>Популярное</Text>
        <Roller />
        <Text style={styles.sectionLabel}>Все криптовалюты</Text>
        {!data && (
          <ActivityIndicator style={[styles.card, { marginTop: 15 }]} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={Header}
        renderItem={(item) => (
          <View style={styles.card}>
            <Text>{item.item.id}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "stretch",
    justifyContent: "center",
  },
  headerView: {
    marginBottom: 15,
  },
  sectionLabel: {
    fontSize: 30,
    marginLeft: 20,
    marginTop: 15,
    fontFamily: "System",
  },
  card: {
    height: 100,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    padding: 10,
    alignContent: "center",
    justifyContent: "center",
  },
});
