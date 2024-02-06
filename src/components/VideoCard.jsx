import { Linking, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

const VideoCard = ({ video }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() =>
        Linking.openURL(`https://www.youtube.com/watch?v=${video?.key}`)
      }
    >
      <View className="mr-2 w-[48vw]">
        <View className="relative">
          <View className="w-full rounded-lg overflow-hidden aspect-[16/9] bg-gray-900 group-hover:opacity-60 duration-300">
            {!!video?.key && (
              <Image
                className="w-full h-full object-cover rounded-lg aspect-[16/9]"
                source={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`}
                alt={video?.name}
              />
            )}

            <View className="absolute top-1/2 left-1/2 -translate-x-8 -translate-y-8 z-10">
              <Image
                className="w-16 h-16"
                source={require("../../images/ic-play.svg")}
              />
            </View>
          </View>
        </View>

        <Text className="text-white text-[15px] font-bold py-2">
          {video?.name}
        </Text>
        {!video && <Text className="h-7 bg-gray-900 rounded-lg"></Text>}
      </View>
    </TouchableOpacity>
  );
};

export default VideoCard;
