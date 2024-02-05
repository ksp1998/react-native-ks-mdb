import { useSelector } from "react-redux";
import RatingProgress from "./RatingProgress";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

const Card = ({ record, mediaType, fitToScreen = false }) => {
  const navigation = useNavigation();
  const { genres, conf } = useSelector((state) => state.tmdb);
  const rating = Number(record?.vote_average);

  const imageSrc = record?.poster_path
    ? `${conf?.images?.base_url}/w300/${record?.poster_path}`
    : record
    ? require("../../images/no-poster.png")
    : "";

  return (
    <View className={`m-[1vw] ${fitToScreen ? "w-[30vw]" : "w-[35vw]"}`}>
      <Pressable
        onPress={() => {
          navigation.navsigate("Details", {
            mediaType:
              record?.media_type ||
              mediaType ||
              (record?.title ? "movie" : "tv"),
            id: record?.id,
          });
        }}
      >
        <View className="relative">
          <View className="w-full bg-gray-900 rounded-lg overflow-hidden aspect-[2/3]">
            <Image
              className="w-full aspect-[2/3] rounded-lg"
              source={imageSrc}
            />
          </View>

          <View className="-translate-y-[24px] mx-2 rounded-full flex justify-center items-start">
            <RatingProgress rating={rating} radius={24} />
          </View>
        </View>

        <View className="-translate-y-[8px] flex flex-col gap-2">
          <Text className="text-white text-lg font-bold line-clamp-1 text-ellipsis">
            {record?.title || record?.name || (
              <Text className="min-h-7 bg-gray-800 rounded-lg animate-pulse"></Text>
            )}
          </Text>
          <Text className="text-sm text-gray-400 font-semibold">
            {record ? (
              record?.release_date || record?.first_air_date
            ) : (
              <Text className="min-h-5 bg-gray-800 rounded-lg animate-pulse"></Text>
            )}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Card;
