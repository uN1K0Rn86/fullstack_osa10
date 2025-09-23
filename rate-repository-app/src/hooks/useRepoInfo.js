import { useQuery } from "@apollo/client";
import { GET_REPO_INFO } from "../graphql/queries";

const useRepoInfo = (variables) => {
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_REPO_INFO, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    data,
    fetchMore: handleFetchMore,
    loading,
    error,
    refetch,
  };
};

export default useRepoInfo;
