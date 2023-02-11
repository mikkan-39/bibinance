import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGetTradingCoinsQuery } from "../api/api";
import CoinCard from "./coinCard";
import Roller from "./roller";

export default function TradingPage() {
  const { data, error, refetch } = useGetTradingCoinsQuery({});

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  if (error) return <Text style={styles.sectionLabel}>Произошла ошибка.</Text>;

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
        data={data && Object.keys(data)}
        keyExtractor={(coin) => coin}
        ListHeaderComponent={Header}
        renderItem={(coin) => <CoinCard coin={coin} />}
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
