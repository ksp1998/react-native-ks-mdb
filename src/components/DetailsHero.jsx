import { useSelector } from "react-redux";
import useAxios from "../utlils/hooks/useAxios";
import { TMDB_API_BASE_URL } from "../utlils";
import RatingProgress from "./RatingProgress";
import _404 from "../components/404";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";

const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
};

const DetailsHero = ({ trailer, crew }) => {
  const { id, mediaType } = useRoute().params;
  const {
    data: media,
    loading,
    error,
  } = useAxios(`${TMDB_API_BASE_URL}/${mediaType}/${id}`);
  const conf = useSelector((state) => state.tmdb.conf);

  const directors = crew?.filter((cr) => cr.job === "Director");
  const writers = crew?.filter((cr) =>
    ["Screenplay", "Story", "Writer"].includes(cr?.job)
  );

  if (!loading && error) {
    return <_404 />;
  }

  return (
    <>
      <View className="absolute top-0 w-full h-[800px]">
        <Image
          className="w-full h-full"
          source={`${conf?.images?.base_url}/original/${media?.backdrop_path}`}
        />
        <LinearGradient
          colors={["#02061799", "#020617"]}
          className="absolute top-0 h-full w-full"
        ></LinearGradient>
      </View>

      <View className="relative py-4">
        <View className="flex flex-col gap-8">
          <View className="self-center rounded-lg overflow-hidden aspect-[2/3] bg-gray-800 w-[75vw]">
            <Image
              className="aspect-[2/3] rounded-lg"
              source={
                media?.poster_path
                  ? `${conf?.images?.base_url}/w780/${media?.poster_path}`
                  : !loading
                  ? require("../../images/no-poster.png")
                  : ""
              }
              alt=""
            />
          </View>

          <View className="flex-grow flex flex-col gap-y-4 px-4 z-10">
            {!loading && (
              <Text className="text-white text-3xl font-extrabold">
                {media?.name || media?.title} (
                {new Date(
                  media?.release_date || media.first_air_date
                ).getFullYear()}
                )
              </Text>
            )}
            {loading && <Text className="h-10 bg-gray-800 rounded-lg"></Text>}

            {media?.tagline && (
              <Text className="text-gray-300 text-xl italic font-bold">
                {media?.tagline}
              </Text>
            )}
            {loading && <Text className="h-6 bg-gray-800 rounded-lg"></Text>}

            <View className="flex flex-row flex-wrap gap-1">
              {media?.genres?.map(
                (genre, index) =>
                  genre?.name && (
                    <Text
                      key={genre?.id ?? index}
                      className="text-gray-300 px-2 py-1 bg-green-700 text-sm rounded-md"
                    >
                      {genre?.name}
                    </Text>
                  )
              )}
              {loading && (
                <View className="h-7 w-24 bg-gray-800 rounded-lg"></View>
              )}
              {loading && (
                <View className="h-7 w-24 bg-gray-800 rounded-lg"></View>
              )}
            </View>

            {media && (
              <View className="flex flex-row items-center">
                <RatingProgress
                  rating={media?.vote_average}
                  radius={32}
                  circleColor="transparent"
                  titleStyle={{ fontSize: 18, fontWeight: "bold" }}
                />

                <TouchableOpacity
                  className="pl-3 flex flex-row gap-x-2 justify-center items-center"
                  activeOpacity={0.75}
                  onPress={() =>
                    Linking.openURL(
                      `https://www.youtube.com/watch?v=${trailer?.key}`
                    )
                  }
                >
                  <Image
                    className="w-16 h-16"
                    source={require("../../images/ic-play.svg")}
                  />
                  <Text className="text-white">Watch Trailer</Text>
                </TouchableOpacity>
              </View>
            )}

            {media?.overview && (
              <View className="flex flex-col gap-2">
                <Text className="text-white text-2xl font-bold">Overview</Text>
                <Text className="text-gray-300 text-base font-semibold">
                  {media?.overview}
                </Text>
              </View>
            )}

            {loading && <Text className="h-24 bg-gray-800 rounded-lg"></Text>}

            <View className="flex flex-col gap-y-3 pb-4 border-b-2 border-gray-800">
              {media?.status && (
                <View className="flex flex-row">
                  <Text className="text-white font-bold">Status: </Text>
                  <Text className="text-gray-300 font-bold">
                    {media?.status}
                  </Text>
                </View>
              )}
              {(media?.release_date || media?.first_air_date) && (
                <View className="flex flex-row">
                  <Text className="text-white font-bold">Release Date: </Text>
                  <Text className="text-gray-300 font-bold">
                    {media?.release_date || media?.first_air_date}
                  </Text>
                </View>
              )}
              {media?.runtime && (
                <View className="flex flex-row">
                  <Text className="text-white font-bold">Runtime: </Text>
                  <Text className="text-gray-300 font-bold">
                    {toHoursAndMinutes(media?.runtime)}
                  </Text>
                </View>
              )}
            </View>

            {!!directors?.length && (
              <View className="flex flex-row pb-4 border-b-2 border-gray-800 font-bold">
                <Text className="text-white">Director: </Text>
                <Text className="text-gray-300">
                  {directors.map((director) => director.name).join(", ")}
                </Text>
              </View>
            )}

            {!!writers?.length && (
              <View className="flex flex-row pb-4 border-b-2 border-gray-800 font-bold">
                <Text className="text-white">Writer: </Text>
                <Text className="text-gray-300">
                  {writers.map((writer) => writer.name).join(", ")}
                </Text>
              </View>
            )}

            {!!media?.created_by?.length && (
              <View className="flex flex-row pb-4 border-b-2 border-gray-800 font-bold">
                <Text className="text-white">Creator: </Text>
                <Text className="text-gray-300">
                  {media?.created_by?.map((creator) => creator.name).join(", ")}
                </Text>
              </View>
            )}
          </View>

          {loading && (
            <View className="flex flex-col gap-y-4 px-4 z-10">
              <View className="h-16 flex-grow bg-gray-800 rounded-lg"></View>
              <View className="h-8 flex-grow bg-gray-800 rounded-lg"></View>
              <View className="h-8 flex-grow bg-gray-800 rounded-lg"></View>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default DetailsHero;
