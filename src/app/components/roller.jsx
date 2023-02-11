import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGetPopularCoinsQuery, useGetTradingCoinsQuery } from "../api/api";

function getPercent(data) {
  if (!data?.cg?.price?.USDT) return "~";
  return data.cg.price.USDT + "$";
}

export default Roller = () => {
  const { data: popularCoins, error: e1 } = useGetPopularCoinsQuery();
  const { data: coinsData, error: e2 } = useGetTradingCoinsQuery();

  if (e1 || e2) return <Text style={styles.roller}>Произошла ошибка.</Text>;
  if (popularCoins && coinsData)
    return (
      <FlatList
        style={styles.roller}
        horizontal={true}
        contentContainerStyle={styles.rollerContent}
        data={popularCoins}
        keyExtractor={(coin) => coin.symbol}
        // Да, так при любом чихе в данных все карточки рендерятся,
        // но в любом случае мы обновляем курс всех валют разом.
        renderItem={(coin) => (
          <View style={styles.miniCoin}>
            <View style={styles.icon} />
            <View style={styles.textWrap}>
              <Text>{coin.item.symbol}</Text>
              <Text>{getPercent(coinsData[coin.item.symbol])}</Text>
            </View>
          </View>
        )}
      />
    );
  if (!popularCoins || !coinsData)
    return <ActivityIndicator style={styles.roller} />;
};

const styles = StyleSheet.create({
  roller: {
    margin: 10,
    height: 70,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  rollerContent: { alignItems: "stretch" },
  miniCoin: {
    margin: 10,
    marginRight: 0,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#eee",
    borderRadius: 5,
    fontSize: 20,
    color: "black",
  },
  icon: {
    minWidth: 40,
    height: 40,
    borderColor: "#333",
    borderWidth: 1,
    marginRight: 5,
  },
  textWrap: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
