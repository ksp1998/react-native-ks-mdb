import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Header } from "./src/components";
import { Home, Movies, Search, Shows } from "./src/screens";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from "expo-image";

export const screens = [
  {
    name: "Home",
    icon: {
      default: require("./images/ic-home.svg"),
      active: require("./images/ic-home-fill.svg"),
    },
  },
  {
    name: "Movies",
    icon: {
      default: require("./images/ic-movie.svg"),
      active: require("./images/ic-movie-fill.svg"),
    },
  },
  {
    name: "Shows",
    icon: {
      default: require("./images/ic-show.svg"),
      active: require("./images/ic-show-fill.svg"),
    },
  },
  {
    name: "Search",
    icon: {
      default: require("./images/ic-search.svg"),
      active: require("./images/ic-search-fill.svg"),
    },
  },
];

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Header />
        <Tab.Navigator
          backgroundColor="red"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              const screen = screens.find((item) => item.name === route.name);
              const iconPath = focused
                ? screen.icon.active
                : screen.icon.default;

              return <Image source={iconPath} width={24} height={24} />;
            },
            // headerBackground: "#FF0000",
            // headerStyle: { backgroundColor: "#020716" },
            tabBarStyle: {
              backgroundColor: "#020716",
              borderColor: "lightgray",
              borderTopWidth: 0.5,
            },
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Movies" component={Movies} />
          <Tab.Screen name="Shows" component={Shows} />
          <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
