import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "./useSignIn";
import { useNavigate } from "react-router-native";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        user: { username, password },
      },
    });

    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return [signUp, result];
};

export default useSignUp;
