import { ScrollView, Text, View } from "react-native";
import VideoCard from "./VideoCard";

const Videos = ({ videos, error }) => {
  return (
    <View className="relative p-2">
      <Text className="text-white text-xl font-bold py-2">Trailers & More</Text>
      <ScrollView className="flex" horizontal>
        {(videos || Array(5).fill(null))?.map((video, index) => (
          <VideoCard key={video?.key || index} video={video} />
        ))}
        {error && <Text className="text-red-500">{error}</Text>}
      </ScrollView>
    </View>
  );
};

export default Videos;
