import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import CoinCard from "./coinCard";
import { CandlestickChart } from "react-native-wagmi-charts";
import { useGetChartDataQuery } from "../api/api";
import { useState } from "react";

export default CoinPage = ({ route }) => {
  const { coinName } = route.params;

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

  const { data, isLoading, error } = useGetChartDataQuery({
    starttime,
    endtime,
    ticker: coinName,
  });
  if (error) return null;
  if (isLoading) return <ActivityIndicator style={styles.chart} />;

  // Вообще надо бы менять интервал, но кроме 1 часа я рабочих не нашел.
  // С данными на целый месяц все тормозит.
  const chartData = Object.entries(data).map(([timestamp, item]) => ({
    timestamp,
    ...item,
  }));

  return (
    <CandlestickChart.Provider data={chartData}>
      <CandlestickChart height={400} style={styles.chart}>
        <CandlestickChart.Candles />
        <View style={styles.dateLabelContainer}>
          <Text style={styles.date}>
            {new Date(starttime).toLocaleDateString("ru-RU")}
          </Text>
          <Text style={styles.date}>
            {new Date(endtime).toLocaleDateString("ru-RU")}
          </Text>
        </View>
      </CandlestickChart>
    </CandlestickChart.Provider>
  );
}

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
    height: 430,
    marginBottom: 15,
  },
  dateLabelContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontWeight: "bold",
  },
});
