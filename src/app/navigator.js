import { createStackNavigator } from "@react-navigation/stack";
import TradingPage from "./components/tradingPage";
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
        }}
      />
    </Stack.Navigator>
  );
}
