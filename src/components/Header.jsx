import { Pressable, View } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { TMDB_API_BASE_URL, fetchRecordFromApi } from "../utlils";
import { setGenres, setTMDBConf } from "../store/slices/tmdbSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigation = useNavigation();

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
    <View className="w-full" style={{ backgroundColor: "#020617" }}>
      <View className="p-2 flex justify-center items-center">
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../../images/logo-title.svg")}
            className="w-36 h-10"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
