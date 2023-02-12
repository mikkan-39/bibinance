import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import { useGetPopularCoinsQuery } from "../api/api";
import MiniCard from "./miniCard";

export default Roller = () => {
  const { data: popularCoins, error } = useGetPopularCoinsQuery();

  if (error) return <Text style={styles.roller}>Произошла ошибка.</Text>;
  if (popularCoins)
    return (
      <FlatList
        style={styles.roller}
        horizontal={true}
        contentContainerStyle={styles.rollerContent}
        data={popularCoins}
        keyExtractor={(coin) => coin.symbol}
        // Да, так при любом чихе в данных все карточки рендерятся,
        // но в любом случае мы обновляем курс всех валют разом.
        renderItem={(coin) => <MiniCard coinName={coin.item.symbol} />}
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
});
