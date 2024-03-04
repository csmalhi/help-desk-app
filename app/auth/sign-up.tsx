import React, { useState } from "react";
import { StatusBar, Switch, StyleSheet, Text, TextInput, Button, View, } from "react-native";
import {auth, db} from '../../firebase'
import { Link } from "@react-navigation/native";
import UserService from "../../services/user.service";
import { router } from "expo-router";

const SignUpComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setisAdmin] = useState(false);
  const toggleSwitch = () => setisAdmin(previousState => !previousState);

  const signUp = (email: string, password: string) => {
    UserService.signUp(auth, db, router, email, password, isAdmin)
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
      <Text>Admin</Text>
      <Switch
        trackColor={{false: '#767577', true: '#5080ff'}}
        thumbColor={isAdmin ? '#e53d1b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isAdmin}
      />
      <Button title={'Sign Up'}
        onPress={() => signUp(email, password)}
      ></Button>
      <Text>Already have an account?</Text>
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
  }
});

export default SignUpComponent;
