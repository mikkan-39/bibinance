import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

export default function TradingPage() {
  const data = [
    {
      id: "1",
      title: "First Item",
    },
    {
      id: "2",
      title: "Second Item",
    },
    {
      id: "3",
      title: "Third Item",
    },
  ];
  const Header = () => {
    return (
      <View style={styles.headerView}>
        <Text style={styles.sectionLabel}>Популярное</Text>
        <FlatList
          style={styles.roller}
          horizontal={true}
          contentContainerStyle={styles.rollerContent}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <View style={styles.miniCoin} />}
        />
        <Text style={styles.sectionLabel}>Все криптовалюты</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={Header}
        renderItem={(item) => <View style={styles.card} />}
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
  roller: {
    margin: 10,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  rollerContent: { alignItems: "stretch" },
  card: {
    height: 100,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  miniCoin: {
    width: 75,
    margin: 10,
    backgroundColor: "#999",
    borderRadius: 5,
  },
});
