import { View, StyleSheet, TextInput, Pressable } from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";

import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    gap: 5,
  },
  textInput: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
  errorBorder: {
    borderColor: "#d73a4a",
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required("Rating must be a number between 0 and 100"),
  text: yup.string().optional(),
});

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const review = {
      ...values,
      rating: Number(values.rating),
    };
    console.log(review);
    try {
      const data = await createReview(review);
      console.log(data);
      navigate(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      text: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          formik.touched.ownerName &&
            formik.errors.ownerName &&
            styles.errorBorder,
        ]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text color="error">Repository owner name is required</Text>
      )}

      <TextInput
        style={[
          styles.textInput,
          formik.touched.repositoryName &&
            formik.errors.repositoryName &&
            styles.errorBorder,
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text color="error">Repository name is required</Text>
      )}

      <TextInput
        style={[
          styles.textInput,
          formik.touched.rating && formik.errors.rating && styles.errorBorder,
        ]}
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text color="error">Rating must be between 0 and 100</Text>
      )}

      <TextInput
        style={[
          styles.textInput,
          formik.touched.text && formik.errors.text && styles.errorBorder,
        ]}
        placeholder="Review"
        value={formik.values.text}
        multiline={true}
        onChangeText={formik.handleChange("text")}
      />

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color="textAppBar">Create review</Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;
