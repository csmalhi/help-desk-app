import React from "react";
import { StatusBar, StyleSheet, Text, Button, View, } from "react-native";
import { Link } from "@react-navigation/native";
import { auth } from '../../firebase'
import UserService from "../../services/user.service";

type Props = {
  navigation: any;
}

const VerifyEmailComponent: React.FC<Props> = ({ navigation }) => {
  const sendVerification = () => {
    UserService.verifyEmail(auth, navigation)
  }

  return (
    <View style={[styles.container]}>
      <Button title={'Send Verification Email'}
        onPress={() => sendVerification()}
      ></Button>
      <Text>Please verify your email address.</Text>
      <Link to={'/auth/sign-n'}>Go to Sign In</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    padding: 5,
    paddingTop: 40,
    height: 600,
    width: "100%",
    backgroundColor: "#fff",
  }
});

export default VerifyEmailComponent;
