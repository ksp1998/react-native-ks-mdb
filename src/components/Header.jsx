import { Pressable, View } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

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
