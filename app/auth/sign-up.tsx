import React, { useState } from "react";
import { StyleSheet, View, } from "react-native";
import { auth, db } from '../../firebase'
import { Link } from "@react-navigation/native";
import UserService from "../../services/user.service";
import { router } from "expo-router";
import { Button, TextInput, Text, Switch } from "react-native-paper";

const SignUpComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setisAdmin] = useState(false);
  const toggleSwitch = () => setisAdmin(previousState => !previousState);

  const signUp = () => {
    UserService.signUp(auth, db, router, email, password, isAdmin)
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
      <Text variant="labelLarge" style={styles.switchLabel}>Admin</Text>
      <Switch value={isAdmin} onValueChange={toggleSwitch} />
      <Button mode="contained" onPress={signUp} style={styles.button}>
        Sign up
      </Button>
      <Text variant="labelMedium">Already have an account?</Text>
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
  switchLabel: {
    marginTop: 20,
    marginBottom: 5
  },
  button: {
    marginVertical: 40
  },
  link: {
    textDecorationLine: 'underline',
    marginBottom: 20
  }
});

export default SignUpComponent;
