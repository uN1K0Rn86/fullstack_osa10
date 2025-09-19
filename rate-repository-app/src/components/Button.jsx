import { Pressable, StyleSheet, View } from "react-native";
import { useContext } from "react";
import Text from "./Text";
import theme from "../theme";
import SortingContext from "../contexts/SortingContext";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
  },
  button: {
    padding: 5,
    borderRadius: 8,
    backgroundColor: theme.colors.secondary,
  },
});

const Button = ({ status, text, type }) => {
  const [sortingPrinciple, dispatch] = useContext(SortingContext);
  const buttonStyle = [
    styles.button,
    status === "active" && { backgroundColor: theme.colors.primary },
  ];

  const onClick = () => {
    dispatch({ type });
    console.log("pressed");
  };

  return (
    <Pressable style={buttonStyle} onPress={() => onClick()}>
      <Text color="textAppBar">{text}</Text>
    </Pressable>
  );
};

export default Button;
