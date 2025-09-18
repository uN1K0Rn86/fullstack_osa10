import { View, Image, StyleSheet, Pressable } from "react-native";
import { openURL } from "expo-linking";
import Text from "./Text";
import Subheading from "./Subheading";
import theme from "../theme";
import ItemAttribute from "./ItemAttribute";

const styles = StyleSheet.create({
  imageSize: {
    height: 50,
    width: 50,
  },
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  subContainer: {
    flexDirection: "column",
    flex: 1,
    paddingLeft: 10,
  },
  languageBox: {
    alignSelf: "flex-start",
    flexShrink: 1,
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    margin: 5,
    alignItems: "center",
    padding: 5,
    borderRadius: 8,
  },
});

const RepositoryItem = ({ item, showGitHubButton }) => {
  const handlePress = () => {
    openURL(item.url);
  };
  return (
    <View testID="repositoryItem" style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <Image
          style={styles.imageSize}
          source={{
            uri: item.ownerAvatarUrl,
            styles,
          }}
        />
        <View style={styles.subContainer}>
          <Subheading>{item.fullName}</Subheading>
          <Text>{item.description}</Text>
          <View style={styles.languageBox}>
            <Text color="textAppBar">{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.container, { justifyContent: "space-evenly" }]}>
        <ItemAttribute attribute="Stars" value={item.stargazersCount} />
        <ItemAttribute attribute="Forks" value={item.forksCount} />
        <ItemAttribute attribute="Reviews" value={item.reviewCount} />
        <ItemAttribute attribute="Rating" value={item.ratingAverage} />
      </View>
      {showGitHubButton && (
        <Pressable onPress={() => handlePress()} style={styles.button}>
          <Text color="textAppBar">View on GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
