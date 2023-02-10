import { Feather } from "@expo/vector-icons";
import { Alert, Pressable } from "react-native";
import registerForPushNotificationsAsync from "../registerForPush";

export default SubscribeButton = () => {
  return (
    <Pressable
      onPress={() => {
        Alert.alert(
          "Уведомления о курсе",
          "Хотите подписаться на уведомления о курсе?",
          [
            {
              text: "Потом",
            },
            {
              text: "Хочу",
              isPreferred: true,
              onPress: () => {
                registerForPushNotificationsAsync().then((token) =>
                  console.log(token)
                );
              },
            },
          ]
        );
      }}
      style={{ marginRight: 10 }}
    >
      <Feather name="bell" size={24} color="black" />
    </Pressable>
  );
};
