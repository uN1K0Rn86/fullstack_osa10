import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { ScrollView, FlatList } from "react-native";
import { ItemSeparator } from "./RepositoryList";
import ReviewItem from "./ReviewItem";
import useRepoInfo from "../hooks/useRepoInfo";

const RepositoryInfo = ({ repository }) => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ marginBottom: 10 }}
    >
      <RepositoryItem item={repository} showGitHubButton={true} />
    </ScrollView>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const first = 6;
  const { data, loading, error, fetchMore } = useRepoInfo({ id, first });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data.repository.reviews.edges.map((edge) => edge.node);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={data.repository} />
      )}
    />
  );
};

export default SingleRepository;
