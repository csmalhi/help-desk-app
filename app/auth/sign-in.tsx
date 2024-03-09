import React, { useState } from "react";
import { StyleSheet, View, } from "react-native";
import { Link } from "@react-navigation/native";
import { auth, db } from '../../firebase'
import UserService from "../../services/user.service";
import { router } from "expo-router";
import { Button, TextInput, Text } from "react-native-paper";

type Props = {
  navigation: any;
}

const SignInComponent: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = () => {
    UserService.signIn(auth, db, email, password, router)
  }

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        label="Email"
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        label="Password"
        secureTextEntry={true}
        style={styles.input}
      />
      <Button mode="contained" onPress={signIn} style={styles.button}>
        Sign in
      </Button>
      <Link to={'/auth/forgot-password'} style={styles.link}>Forgot Password?</Link>
      <Text variant="labelMedium">Don't have an account?</Text>
      <Link to={'/auth/sign-up'} style={styles.link}>Go to Sign Up</Link>
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

export default SignInComponent;
