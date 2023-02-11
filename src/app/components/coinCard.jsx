import { StyleSheet, Text, View } from "react-native";
import { useGetTradingCoinsQuery } from "../api/api";
import numeral from "numeral";

export default function CoinCard({ coin }) {
  const { coinData } = useGetTradingCoinsQuery(undefined, {
    selectFromResult: ({ data }) => ({ coinData: data && data[coin.item].cg }),
  });

  if (!coinData) return null;
  return (
    <View style={styles.card}>
      <View style={styles.icon} />
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
            {"1h:\n" + numWrap(coinData["1h"])}
          </Text>
          <Text style={styles.cardColumn}>
            {"24h:\n" + numWrap(coinData["24h"])}
          </Text>
          <Text style={styles.cardColumn}>
            {"7d:\n" + numWrap(coinData["7d"])}
          </Text>
        </View>
      </View>
    </View>
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
  icon: {
    height: "100%",
    aspectRatio: 1,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 20,
  },
  cardColumn: {
    flex: 1,
  },
});
