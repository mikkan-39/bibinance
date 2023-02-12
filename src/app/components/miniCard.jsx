import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGetTradingCoinsQuery } from "../api/api";
import IconComponent from "./iconComponent";

function MiniCard({ coinName }) {
  const navigation = useNavigation();
  const { coinData } = useGetTradingCoinsQuery(undefined, {
    selectFromResult: ({ data }) => ({ coinData: data && data[coinName] }),
  });

  if (!coinData) return <ActivityIndicator style={styles.miniCoin} />;
  return (
    <Pressable
      onPress={() => navigation.navigate("CoinPage", { coinName })}
      style={styles.miniCoin}
    >
      <IconComponent coinName={coinName} style={styles.icon} />
      <View style={styles.textWrap}>
        <Text>{coinName}</Text>
        <Text>{getPercent(coinData)}</Text>
      </View>
    </Pressable>
  );
}

export default React.memo(MiniCard);

function getPercent(data) {
  if (!data?.cg?.price?.USDT) return "~";
  return +parseFloat(data.cg.price.USDT).toFixed(2) + "$";
}

const styles = StyleSheet.create({
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
    minWidth: 100,
  },
  icon: {
    minWidth: 40,
    height: 40,
    marginRight: 5,
    borderRadius: 0,
  },
  textWrap: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
