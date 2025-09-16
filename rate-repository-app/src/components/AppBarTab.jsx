import { View, Pressable } from "react-native";
import Text from "./Text";

const AppBarTab = () => {
  return (
    <View>
      <Pressable onPress={() => Alert.alert("you pressed")}>
        <Text color="textAppBar">Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
