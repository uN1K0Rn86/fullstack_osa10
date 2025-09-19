import { StyleSheet, View } from "react-native";
import Button from "./Button";
import { useContext } from "react";
import SortingContext from "../contexts/SortingContext";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 5,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

const RepositorySort = () => {
  const [sortingPrinciple] = useContext(SortingContext);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Button
          status={sortingPrinciple === "latest" && "active"}
          text="Latest review"
          type="LATEST"
        />
        <Button
          status={sortingPrinciple === "highest" && "active"}
          text="Highest rating"
          type="HIGHEST"
        />
        <Button
          status={sortingPrinciple === "lowest" && "active"}
          text="Lowest rating"
          type="LOWEST"
        />
      </View>
    </View>
  );
};

export default RepositorySort;
