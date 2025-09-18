import { View, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import Text from "./Text";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 20,
    paddingBottom: 20,
    backgroundColor: theme.colors.appBarBackground,
  },
  signOut: {
    paddingLeft: 10,
  },
});

const AppBar = () => {
  const { loading, error, data, refetch } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const signOut = async () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
      },
      {
        text: "Sign out",
        onPress: async () => {
          await authStorage.removeAccessToken();
          await apolloClient.resetStore();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title={"Repositories"} route="/" />
        {!data.me ? (
          <AppBarTab title={"Sign In"} route="/signin" />
        ) : (
          <Pressable onPress={() => signOut()} style={styles.signOut}>
            <Text color="textAppBar">Sign out</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
