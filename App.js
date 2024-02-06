import { NavigationContainer } from "@react-navigation/native";
import store from "./src/store";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import TabNavigation from "./src/screens/TabNavigation";
import Header from "./src/components/Header";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#020716" />

      <NavigationContainer>
        <Header />
        <TabNavigation />
      </NavigationContainer>
    </Provider>
  );
}
