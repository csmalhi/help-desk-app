import React, { useState } from "react";
import { StyleSheet, Text, View, } from "react-native";
import { Link } from "@react-navigation/native";
import {auth} from '../../firebase'
import UserService from "../../services/user.service";
import { Button, TextInput } from "react-native-paper";

type Props = {
  navigation: any;
}

const ForgotPasswordComponent: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('')

  const sendPasswordReset = () => {
    UserService.forgotPassword(auth, email)
  }

  return (
    <View style={[styles.container]}>
      <Text>Please verify your email address</Text>
      <TextInput
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        label="Email"
        style={styles.input}
      />
      <Button mode="contained" onPress={sendPasswordReset} style={styles.button}>
        Send Password Reset Email
      </Button>
      <Link to={'/auth/sign-in'} style={styles.link}>Go to Sign In</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 40
  },
  link: {
    textDecorationLine: 'underline',
    marginBottom: 20
  }
});

export default ForgotPasswordComponent;
