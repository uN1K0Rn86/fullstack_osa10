import { TextInput, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import * as yup from "yup";

import theme from "../theme";
import { useFormik } from "formik";
import useSignUp from "../hooks/useSignUp";

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
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters long")
    .max(30, "Username cannot be more than 30 characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(50, "Password cannot be more than 30 characters long")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

const SignUp = () => {
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password } = values;
    await signUp({ username, password });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          formik.touched.username &&
            formik.errors.username &&
            styles.errorBorder,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text color="error">{formik.errors.username}</Text>
      )}

      <TextInput
        style={[
          styles.textInput,
          formik.touched.password &&
            formik.errors.password &&
            styles.errorBorder,
        ]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text color="error">{formik.errors.password}</Text>
      )}

      <TextInput
        style={[
          styles.textInput,
          formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation &&
            styles.errorBorder,
        ]}
        placeholder="Confirm password"
        secureTextEntry
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text color="error">{formik.errors.passwordConfirmation}</Text>
        )}

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color="textAppBar">Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
