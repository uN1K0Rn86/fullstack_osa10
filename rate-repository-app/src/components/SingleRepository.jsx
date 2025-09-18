import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPO_INFO } from "../graphql/queries";
import Text from "./Text";
import { ScrollView, FlatList, View, StyleSheet } from "react-native";
import { ItemSeparator } from "./RepositoryList";
import theme from "../theme";
import { formatDate } from "../utils/helpers";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    gap: 5,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  subContainer: {
    flexDirection: "column",
    flex: 1,
  },
});

const RatingBadge = ({ rating }) => {
  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  );
};

const RepositoryInfo = ({ repository }) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <RepositoryItem item={repository} showGitHubButton={true} />
    </ScrollView>
  );
};

const ReviewItem = ({ review }) => {
  const date = formatDate(review.createdAt);
  return (
    <View style={styles.container}>
      <RatingBadge rating={review.rating} />
      <View style={styles.subContainer}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text>{date}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_REPO_INFO, {
    variables: { id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  console.log(data);

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
