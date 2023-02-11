import { StyleSheet, Text, View, Pressable } from "react-native";
import { useGetTradingCoinsQuery } from "../api/api";
import numeral from "numeral";
import IconComponent from "./iconComponent";
import { useNavigation } from "@react-navigation/native";

export default function CoinCard({ coin }) {
  const navigation = useNavigation();
  const { coinData } = useGetTradingCoinsQuery(undefined, {
    selectFromResult: ({ data }) => ({ coinData: data && data[coin.item].cg }),
  });

  if (!coinData) return null;
  return (
    <Pressable
      onPress={() => navigation.navigate("CoinPage", { coinName: coin.item })}
      style={styles.card}
    >
      <IconComponent coinName={coin.item} />
      <View style={styles.dataColumn}>
        <View style={styles.dataRow}>
          <Text style={styles.label}>
            {coin.item + priceWrap(coinData.price.USDT)}
          </Text>
          <Text style={styles.cap}>
            {"Cap: " + capWrap(coinData.market_cap.USDT)}
          </Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.cardColumn}>
            {"1h:\n"}
            {cText(numWrap(coinData["1h"]))}
          </Text>
          <Text style={styles.cardColumn}>
            {"24h:\n"}
            {cText(numWrap(coinData["24h"]))}
          </Text>
          <Text style={styles.cardColumn}>
            {"7d:\n"}
            {cText(numWrap(coinData["7d"]))}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function cText(str) {
  return (
    <Text style={{ color: str && str[0] == "+" ? "green" : "red" }}>{str}</Text>
  );
}

function priceWrap(price) {
  return ": " + +parseFloat(price).toFixed(2) + "$";
}

function capWrap(cap) {
  return cap ? numeral(cap).format("0a") + "$" : "~";
}

function numWrap(num) {
  if (!num) return "~";
  var n = +parseFloat(num).toFixed(2);
  n = (n < 0 ? "" : "+") + n;
  return n ? n + "%" : "~";
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "stretch",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  cap: {
    marginRight: 20,
  },
  dataColumn: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardColumn: {
    flex: 1,
  },
});
