import { createStackNavigator } from "@react-navigation/stack";
import TradingPage from "./components/tradingPage";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="TradingPage">
      <Stack.Screen name="TradingPage" component={TradingPage} />
    </Stack.Navigator>
  );
}
