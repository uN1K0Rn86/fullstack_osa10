import { StyleSheet, View } from "react-native";
import Button from "./Button";
import { useContext } from "react";
import SortingContext from "../contexts/SortingContext";
import { Searchbar } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

const RepositorySort = ({ filterText, setFilterText }) => {
  const [sortingPrinciple] = useContext(SortingContext);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Filter by name or owner"
        onChangeText={setFilterText}
        value={filterText}
      />
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
