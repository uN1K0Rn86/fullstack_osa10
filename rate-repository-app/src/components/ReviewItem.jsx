import Text from "./Text";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import { formatDate } from "../utils/helpers";
import theme from "../theme";
import { openURL } from "expo-linking";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  subContainer: {
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
  subSubContainer: {
    flexDirection: "column",
    flex: 1,
  },
  button: {
    backgroundColor: theme.colors.primary,
    margin: 5,
    alignItems: "center",
    padding: 5,
    borderRadius: 2,
    flexGrow: 1,
  },
});

const RatingBadge = ({ rating }) => {
  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  );
};

const ReviewItem = ({ review, refetch }) => {
  const date = formatDate(review.createdAt);

  const [deleteReview] = useDeleteReview();

  const handleDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteReview(review.id);
              refetch();
            } catch (e) {
              console.log(e);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <RatingBadge rating={review.rating} />
        <View style={styles.subSubContainer}>
          {review.repository ? (
            <Text fontWeight="bold">{review.repository.fullName}</Text>
          ) : (
            <Text fontWeight="bold">{review.user.username}</Text>
          )}
          <Text>{date}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {review.repository && (
        <View style={[styles.subContainer, { justifyContent: "space-evenly" }]}>
          <Pressable
            style={styles.button}
            onPress={() => openURL(review.repository.url)}
          >
            <Text color="textAppBar">View repository</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={() => handleDelete()}
          >
            <Text color="textAppBar">Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
