import { useSelector } from "react-redux";
import useAxios from "../utlils/hooks/useAxios";
import { useEffect, useState } from "react";
import { TMDB_API_BASE_URL } from "../utlils";
import { Pressable, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

const Hero = () => {
  const navigation = useNavigation();
  const genres = useSelector((state) => state.tmdb.genres);
  const baseUrl = useSelector((state) => state.tmdb.conf?.images?.base_url);
  const { data } = useAxios(`${TMDB_API_BASE_URL}/movie/upcoming`);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setMovie(data?.results?.[parseInt(Math.random() * 20)] ?? {});
  }, [data?.results]);

  useEffect(() => {
    const timer = setInterval(() => {
      setMovie(data?.results?.[parseInt(Math.random() * 20)] ?? {});
    }, 10000);
    return () => clearInterval(timer);
  }, [data?.results, movie]);

  return (
    <View className="relative h-[50vh]">
      <Pressable
        onPress={() => {
          navigation.navigate("Details", {
            mediaType: "movie",
            id: movie?.id,
          });
        }}
        className="relative w-full h-full"
      >
        <Image
          className="w-full h-full duration-300"
          source={`${baseUrl}/original/${movie?.backdrop_path}`}
        />

        <LinearGradient
          colors={["#02061700", "#020617CC", "#020617"]}
          className="absolute top-0 h-full w-full"
        ></LinearGradient>
      </Pressable>

      <View className="absolute bottom-0 p-4 flex flex-col gap-3 w-[min(100%,500px)]">
        <Text className="text-white text-3xl font-bold">
          {movie?.title || (
            <View className="min-h-12 bg-gray-800 animate-pulse rounded-lg"></View>
          )}
        </Text>
        <View className="flex items-start">
          {movie?.title && (
            <Text className="text-white w-auto px-2 py-1 text-sm lg:text-base bg-green-700 font-semibold rounded-md">
              New Release
            </Text>
          )}
          {movie?.adult && (
            <Text className="text-white w-max px-2 py-1 bg-gray-900 font-semibold rounded-md">
              18+
            </Text>
          )}
        </View>
        <Text
          className="text-white line-clamp-2 text-ellipsis font-semibold"
          numberOfLines={4}
        >
          {movie?.title && movie?.overview}
        </Text>
        {!movie?.title && (
          <View className="min-h-20 bg-gray-800 animate-pulse rounded-lg"></View>
        )}

        <View className="flex flex-row items-start gap-1">
          {movie?.genre_ids?.map(
            (genreId) =>
              genres[genreId] && (
                <Text
                  key={genreId}
                  className="text-white px-4 py-1 bg-gray-900 rounded-md"
                >
                  {genres[genreId]}
                </Text>
              )
          )}
          {!movie?.title && (
            <>
              <View className="min-h-5 bg-gray-800 animate-pulse rounded-lg"></View>
              <View className="min-h-5 bg-gray-800 animate-pulse rounded-lg"></View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Hero;
