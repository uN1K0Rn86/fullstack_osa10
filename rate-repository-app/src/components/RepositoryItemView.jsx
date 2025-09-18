import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPO_INFO } from "../graphql/queries";
import Text from "./Text";
import { View, StyleSheet, ScrollView } from "react-native";

const RepositoryItemView = () => {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_REPO_INFO, {
    variables: { id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <RepositoryItem item={data.repository} showGitHubButton={true} />
    </ScrollView>
  );
};

export default RepositoryItemView;
