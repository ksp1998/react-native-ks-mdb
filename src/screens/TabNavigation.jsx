import { Image } from "expo-image";
import Home from "./Home";
import Movies from "./Movies";
import Shows from "./Shows";
import Search from "./Search";
import Details from "./Details";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useEffect } from "react";
import { TMDB_API_BASE_URL, fetchRecordFromApi } from "../utlils";
import { setGenres, setTMDBConf } from "../store/slices/tmdbSlice";
import { useDispatch } from "react-redux";

export const screens = [
  {
    name: "Home",
    icon: {
      default: require("../../images/ic-home.svg"),
      active: require("../../images/ic-home-fill.svg"),
    },
  },
  {
    name: "Movies",
    icon: {
      default: require("../../images/ic-movie.svg"),
      active: require("../../images/ic-movie-fill.svg"),
    },
  },
  {
    name: "Shows",
    icon: {
      default: require("../../images/ic-show.svg"),
      active: require("../../images/ic-show-fill.svg"),
    },
  },
  {
    name: "Search",
    icon: {
      default: require("../../images/ic-search.svg"),
      active: require("../../images/ic-search-fill.svg"),
    },
  },
  {
    name: "Details",
    icon: {
      default: require("../../images/ic-search.svg"),
      active: require("../../images/ic-search-fill.svg"),
    },
  },
];

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      fetchRecordFromApi(`${TMDB_API_BASE_URL}/configuration`)
        .then((response) => dispatch(setTMDBConf(response)))
        .catch((error) => console.log("fetchRecordFromApi() Error: ", error));

      let allGenres = {};

      let response = await fetchRecordFromApi(
        `${TMDB_API_BASE_URL}/genre/movie/list`
      );
      response?.genres?.map((genre) => (allGenres[genre?.id] = genre?.name));
      allGenres.movie = response?.genres;

      response = await fetchRecordFromApi(`${TMDB_API_BASE_URL}/genre/tv/list`);
      response?.genres?.map((genre) => (allGenres[genre?.id] = genre?.name));
      allGenres.tv = response?.genres;

      dispatch(setGenres(allGenres));
    })();
  }, [dispatch]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const screen = screens.find((item) => item.name === route.name);
          const iconPath = focused ? screen.icon.active : screen.icon.default;

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
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
