import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import StackNavigator from "./src/app/navigator";
import * as Notifications from "expo-notifications";
import { api } from "./src/app/api/api";
import { StatusBar } from "expo-status-bar";
// import appsFlyer from "react-native-appsflyer";

// console.disableYellowBox = true;
// appsFlyer.initSdk(
//   {
//     devKey: "9KHnEGpn7agiNCnHVcURQa",
//     isDebug: false,
//     appId: "1345306344",
//   },
//   (result) => {
//     console.log(result);
//   },
//   (error) => {
//     console.error(error);
//   }
// );

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  store.dispatch(
    api.util.prefetch("getIconLinks", undefined, { force: false })
  );
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}
