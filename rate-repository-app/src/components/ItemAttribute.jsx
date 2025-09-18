import { StyleSheet, View } from "react-native";
import Text from "./Text";
import Subheading from "./Subheading";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const renderedValue = (value) => {
  if (value > 999) {
    const rounded = Math.round(value / 100) / 10;
    return `${rounded}k`;
  }

  return value.toString();
};

const ItemAttribute = ({ attribute, value }) => {
  const valueToRender = renderedValue(value);

  return (
    <View style={styles.container}>
      <Text fontWeight="bold">{valueToRender}</Text>
      <Text color="textSecondary">{attribute}</Text>
    </View>
  );
};

export default ItemAttribute;
