import { createStackNavigator } from "@react-navigation/stack";
import TradingPage from "./components/tradingPage";
import CoinPage from "./components/coinPage";
import SubscribeButton from "./components/subscribeButton";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="TradingPage">
      <Stack.Screen
        name="TradingPage"
        component={TradingPage}
        options={{
          title: "Курсы",
          headerRight: () => SubscribeButton(),
          headerStyle: {
            shadowColor: "#999",
            shadowRadius: 10,
            shadowOpacity: 0.5,
          },
        }}
      />
      <Stack.Screen
        name="CoinPage"
        component={CoinPage}
        options={{
          title: "Подробности",
        }}
      />
    </Stack.Navigator>
  );
}
