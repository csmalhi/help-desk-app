import React, { useState } from "react";
import { StatusBar, StyleSheet, Text, Button, View, TextInput, } from "react-native";
import { Link } from "@react-navigation/native";
import {auth} from '../../firebase'
import UserService from "../../services/user.service";

type Props = {
  navigation: any;
}

const ForgotPasswordComponent: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('')

  const sendPasswordReset = () => {
    UserService.forgotPassword(auth, email)
  }

  return (
    <View style={[styles.media]}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />
      <Button title={'Send Password Reset Email'}
        onPress={() => sendPasswordReset()}
      ></Button>
      <Text>Please verify your email address.</Text>
      <Link to={'/auth/sign-in'}>Go to Sign In</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingTop: 10,
  },
  media: {
    marginTop: StatusBar.currentHeight || 0,
    padding: 5,
    paddingTop: 40,
    height: 600,
    width: "100%",
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    borderRadius: 5
  },
});

export default ForgotPasswordComponent;
