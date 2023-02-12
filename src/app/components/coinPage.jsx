import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import CoinCard from "./coinCard";
import { CandlestickChart } from "react-native-wagmi-charts";
import { useGetChartDataQuery } from "../api/api";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import appsFlyer from "react-native-appsflyer";

export default CoinPage = ({ route }) => {
  const { coinName } = route.params;

  useFocusEffect(() => {
    appsFlyer.logEvent(
      "Navigate to " + coinName,
      {},
      (res) => {
        console.log(res);
      },
      (err) => {
        console.error(err);
      }
    );
  });

  return (
    <View style={styles.container}>
      <Chart coinName={coinName} />
      <CoinCard coinName={coinName} />
    </View>
  );
};

function Chart({ coinName }) {
  const [starttime, setStarttime] = useState(() => {
    var d = new Date();
    d.setMonth(d.getMonth() - 1);
    return d.getTime();
  });
  const [endtime, setEndtime] = useState(new Date().getTime());

  const { width, height } = useWindowDimensions();

  const { data, isLoading, error } = useGetChartDataQuery({
    starttime,
    endtime,
    ticker: coinName,
  });
  if (error) return null;
  if (isLoading) return <ActivityIndicator style={styles.chart} />;

  // Вообще надо бы менять интервал, но кроме 1 часа я рабочих не нашел.
  // С данными на целый месяц все тормозит.
  var topPrice = 0;
  var minPrice = Infinity;
  const chartData = Object.entries(data).map(([timestamp, item]) => {
    topPrice = Math.max(topPrice, item.high);
    minPrice = Math.min(minPrice, item.low);
    return {
      timestamp,
      ...item,
    };
  });

  if (!chartData || !chartData[0]) return <View style={styles.chart} />;
  return (
    <CandlestickChart.Provider data={chartData}>
      <CandlestickChart height={400} style={styles.chart}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.priceLabelContainer}>
            <Text style={styles.label}>{topPrice.toFixed()}</Text>
            <Text style={styles.label}>{minPrice.toFixed()}</Text>
          </View>
          <CandlestickChart.Candles
            width={width - styles.priceLabelContainer.width}
          />
        </View>
        <View
          style={[
            styles.dateLabelContainer,
            { width: width - styles.priceLabelContainer.width },
          ]}
        >
          <Text style={styles.label}>
            {new Date(starttime).toLocaleDateString("ru-RU")}
          </Text>
          <Text style={styles.label}>
            {new Date(endtime).toLocaleDateString("ru-RU")}
          </Text>
        </View>
      </CandlestickChart>
    </CandlestickChart.Provider>
  );
}

const labelWidth = 50;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  chart: {
    marginHorizontal: -15,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 400 + labelWidth,
    marginBottom: 15,
  },
  priceLabelContainer: {
    width: labelWidth,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#fff",
    borderRightColor: "#ddd",
    borderWidth: 2,
  },
  dateLabelContainer: {
    position: "absolute",
    bottom: 0,
    height: labelWidth,
    marginLeft: labelWidth,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#fff",
    borderTopColor: "#ddd",
    borderWidth: 2,
  },
  label: {
    fontWeight: "bold",
  },
});
