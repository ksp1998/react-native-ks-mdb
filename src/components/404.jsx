import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

const _404 = () => {
  const navigation = useNavigation();

  return (
    <View className="p-5 h-[75vh] flex flex-col justify-center items-center gap-2">
      <Text className="mb-4 text-[6rem] font-extrabold text-red-300">404</Text>
      <Text className="mb-4 text-2xl font-bold text-gray-200 text-center">
        Oops! Looks like you're lost.
      </Text>

      <View className="mt-4 text-xl font-semibold text-gray-200 text-center">
        <Text className="text-gray-200">Let's get you back </Text>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigation.navigate("Home")}
        >
          <Text className="text-green-300">Home</Text>
        </TouchableOpacity>
        .
      </View>
    </View>
  );
};

export default _404;
