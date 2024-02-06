import { useSelector } from "react-redux";
import { FlatList, Text, View } from "react-native";
import { Image } from "expo-image";

const Cast = ({ cast, error }) => {
  const conf = useSelector((state) => state.tmdb.conf);

  return (
    <View className="relative p-2">
      <Text className="text-white text-xl font-bold py-2">Top Cast</Text>

      <FlatList
        horizontal
        data={cast || Array(10).fill(null)}
        keyExtractor={(member, index) => `${member?.id}-${index}`}
        renderItem={({ item: member }) => (
          <View className="mx-1 w-[24vw]">
            <View className="rounded-full overflow-hidden aspect-square bg-gray-900">
              <Image
                className="w-full aspect-square object-cover rounded-lg"
                source={
                  member?.profile_path
                    ? `${conf?.images?.base_url}/w300/${member?.profile_path}`
                    : require("../../images/no-avatar.png")
                }
                alt={member?.name}
              />
            </View>
            <View className="flex flex-col gap-1.5 py-2">
              {member && (
                <Text className="text-[12px] text-center font-bold text-white">
                  {member?.name}
                </Text>
              )}
              {!member && (
                <View className="h-5 bg-gray-900 rounded-lg animate-pulse"></View>
              )}

              {member && (
                <Text className="text-[10px] text-center text-gray-50">
                  {member?.character}
                </Text>
              )}
              {!member && (
                <Text className="h-4 bg-gray-900 rounded-lg animate-pulse"></Text>
              )}
            </View>
          </View>
        )}
      />

      {error && <Text className="text-red-500">{error}</Text>}
    </View>
  );
};

export default Cast;
