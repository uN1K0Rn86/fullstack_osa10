import Text from "./Text";
import { View, StyleSheet } from "react-native";
import { formatDate } from "../utils/helpers";
import theme from "../theme";

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

const ReviewItem = ({ review }) => {
  const date = formatDate(review.createdAt);
  return (
    <View style={styles.container}>
      <RatingBadge rating={review.rating} />
      <View style={styles.subContainer}>
        {review.repository ? (
          <Text fontWeight="bold">{review.repository.fullName}</Text>
        ) : (
          <Text fontWeight="bold">{review.user.username}</Text>
        )}
        <Text>{date}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
