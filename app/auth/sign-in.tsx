import React, { useState } from "react";
import { StatusBar, StyleSheet, Text, TextInput, Button, View, } from "react-native";
import { Link } from "@react-navigation/native";
import { auth, db } from '../../firebase'
import UserService from "../../services/user.service";
import { router } from "expo-router";

type Props = {
  navigation: any;
}

const SignInComponent: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = (email: string, password: string) => {
    UserService.signIn(auth, db, email, password, router)
  }

  return (
    <View style={[styles.container]}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
      />
      <Button title={'Sign In'}
        onPress={() => signIn(email, password)}
      ></Button>
      <Link to={'/auth/forgot-password'}>Forgot Password?</Link>
      <Text>Don't have an account?</Text>
      <Link to={'/auth/sign-up'}>Go to Sign Up</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 2,
    paddingTop: 80
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    borderRadius: 5
  },
});

export default SignInComponent;
