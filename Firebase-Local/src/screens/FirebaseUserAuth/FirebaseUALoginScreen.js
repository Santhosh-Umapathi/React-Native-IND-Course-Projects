import React, {useState} from 'react';
import {
 Text,
 StyleSheet,
 View,
 Button,
 TextInput,
 KeyboardAvoidingView,
 ScrollView,
} from "react-native";
import * as firebase from "firebase";

const FirebaseUALoginScreen = ({navigation}) =>
{

	const [email, setemail] = useState("");
 	const [password, setpassword] = useState("");

	const signInUser = (email, password) => {
		firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(() => navigation.replace("FirebaseUAHome"))
		.catch(error => alert(error.message))
	};
	
	return (
  <ScrollView>
   <KeyboardAvoidingView behavior="position" enabled>
    <View style={styles.containerView}>
     <Text style={{ fontSize: 50, marginBottom: 20, marginLeft: 10 }}>
      Sign In
     </Text>
     <View>
      <View style={styles.cardStyle}>
       <Text style={styles.labelStyle}>Email</Text>
       <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
        onChangeText={(email) => setemail(email)}
        value={email}
        style={{ height: 30, borderColor: "black", borderWidth: 1 }}
       />
      </View>

      <View style={styles.cardStyle}>
       <Text style={styles.labelStyle}>Password</Text>
       <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={(password) => setpassword(password)}
        value={password}
        style={{ height: 30, borderColor: "black", borderWidth: 1 }}
       />
      </View>

      <Button
       title="SignIn"
       style={styles.buttonStyle}
       onPress={() => signInUser(email, password)}
      />
      <View
       style={{
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
       }}
      >
       <Text style={{ fontSize: 15 }}> Don't have an Account? </Text>
       <Button
        title="sign up"
        onPress={() => {
         navigation.navigate("FirebaseUASignUp");
        }}
       />
      </View>
     </View>
    </View>
   </KeyboardAvoidingView>
  </ScrollView>
 );
    }
  

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    marginTop: 30,
  },
  cardStyle: {
  },
  labelStyle: {
    paddingBottom: 5,
    fontSize: 20
  },
  buttonStyle: {
    marginHorizontal: 50,
    marginTop: 30,
    backgroundColor: "#badc57"
  }
});

export default FirebaseUALoginScreen;