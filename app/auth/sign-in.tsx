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
    <View style={[styles.media]}>
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

export default SignInComponent;
