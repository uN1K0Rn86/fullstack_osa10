import { View, Pressable, Alert } from "react-native";
import Text from "./Text";

const AppBarTab = ({ title }) => {
  return (
    <View>
      <Pressable onPress={() => Alert.alert("you pressed")}>
        <Text color="textAppBar">{title}</Text>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
