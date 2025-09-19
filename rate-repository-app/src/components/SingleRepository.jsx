import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPO_INFO } from "../graphql/queries";
import Text from "./Text";
import { ScrollView, FlatList, View, StyleSheet } from "react-native";
import { ItemSeparator } from "./RepositoryList";
import ReviewItem from "./ReviewItem";

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
  const { loading, error, data, refetch } = useQuery(GET_REPO_INFO, {
    fetchPolicy: "cache-and-network",
    variables: { id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data.repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
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
