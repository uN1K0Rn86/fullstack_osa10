import { View, Image, StyleSheet } from "react-native";
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
});

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem">
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
    </View>
  );
};

export default RepositoryItem;
