import { useContext, useState } from "react";
import { useDebounce } from "use-debounce";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import SortingContext from "../contexts/SortingContext";
import RepositorySort from "./RepositorySort";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  navigate,
  filterText,
  setFilterText,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <RepositorySort filterText={filterText} setFilterText={setFilterText} />
      }
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repos/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [sortingPrinciple] = useContext(SortingContext);
  const [filterText, setFilterText] = useState("");
  const [debouncedText] = useDebounce(filterText, 500);

  const sortOptions = {
    latest: { orderBy: "CREATED_AT", orderDirection: "DESC" },
    highest: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
    lowest: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  };

  const variables = {
    ...(sortOptions[sortingPrinciple] ?? sortOptions.latest),
    first: 6,
    searchKeyword: debouncedText,
  };

  const { repositories, fetchMore, loading, error } =
    useRepositories(variables);
  const navigate = useNavigate();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      navigate={navigate}
      filterText={filterText}
      setFilterText={setFilterText}
    />
  );
};

export default RepositoryList;
