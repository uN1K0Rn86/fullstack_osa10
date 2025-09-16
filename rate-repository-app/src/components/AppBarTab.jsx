import { View, Pressable, Alert, StyleSheet } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
  },
});

const AppBarTab = ({ title, route }) => {
  return (
    <View style={styles.container}>
      <Link to={route}>
        <Text color="textAppBar">{title}</Text>
      </Link>
    </View>
  );
};

export default AppBarTab;
