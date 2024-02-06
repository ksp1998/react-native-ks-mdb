import { FlatList, Text, View } from "react-native";
import { useAxios } from "../utlils/hooks";
import Card from "./Card";

const CardsContainerRow = ({ endpoint, title }) => {
  const { data, error } = useAxios(endpoint);

  return (
    <View className="relative p-2">
      <Text className="text-white text-xl font-bold py-2">{title}</Text>
      <FlatList
        horizontal
        data={data?.results || Array(20).fill(null)}
        renderItem={({ item: record }) => <Card record={record} />}
        keyExtractor={(record, index) => record?.id || index}
      />
      <Text className="text-red-500">{error}</Text>
    </View>
  );
};

export default CardsContainerRow;
