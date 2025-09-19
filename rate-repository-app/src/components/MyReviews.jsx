import { useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import Text from "./Text";
import { ME } from "../graphql/queries";
import { ItemSeparator } from "./RepositoryList";
import ReviewItem from "./ReviewItem";

const MyReviews = () => {
  const { loading, error, data, refetch } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
    },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data.me.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;
