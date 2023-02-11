import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useGetIconImageQuery, useGetIconLinksQuery } from "../api/api";

export default IconComponent = ({ coinName, style: passedStyle }) => {
  const { link, isLoading, error } = useGetIconLinksQuery(undefined, {
    selectFromResult: ({ data, isLoading, error }) => ({
      link: data && data[coinName] && data[coinName].cg,
      isLoading,
      error,
    }),
  });
  if (isLoading)
    return <ActivityIndicator style={[styles.iconPlaceholder, passedStyle]} />;
  if (!link || error)
    return <View style={[styles.iconPlaceholder, passedStyle]} />;
  return (
    <Image
      style={[styles.icon, passedStyle]}
      source={{ uri: `https://dev.exnode.ru/-cache-icons-${link}` }}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    height: "100%",
    aspectRatio: 1,
    //borderColor: "#3f3",
    //borderWidth: 1,
    borderRadius: 5,
    marginRight: 20,
  },
  iconPlaceholder: {
    height: "100%",
    aspectRatio: 1,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 20,
  },
});
