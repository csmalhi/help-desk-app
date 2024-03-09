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
    <View style={[styles.container]}>
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
  container: {
    padding: 20,
    paddingTop: 80,
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
