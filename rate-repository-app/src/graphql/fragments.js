import { gql } from "@apollo/client";

export const REPOSITORIES_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    description
    ownerAvatarUrl
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
  }
`;
