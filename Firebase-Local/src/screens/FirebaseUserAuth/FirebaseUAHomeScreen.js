import React, {useState, useEffect} from 'react';
import {
 Text,
 StyleSheet,
 View,
 Button,
} from "react-native";
import * as firebase from "firebase";

const FirebaseUAHomeScreen = ({navigation}) =>
{

	const [email, setemail] = useState("")
	const [name, setname] = useState("")


	useEffect(() => {
		checkAuth()
	}, [])


	const checkAuth = () => {
		firebase.auth().onAuthStateChanged(authenticate => {
			if (authenticate)
			{
				setemail(authenticate.email)
				setname(authenticate.displayName)
			}
			else
			{ navigation.replace("FirebaseUALogin") }
		});
	}

	const signOutUser = () => {
		firebase
		.auth()
		.signOut()
		.then(() => console.log("Sign Out Successful")) // Sign-out successful.
		//navigation.replace('SignIn') //No need to call this since already onAuthStateChange takes care of that
		
		// An error happened.
		.catch(error => alert(error.message))
	};

	return (
  <View style={styles.containerView}>
   		<Text style={styles.text}>FirebaseUAHomeScreen</Text>
   		<Text style={styles.text}>{name}</Text>
		<Text style={styles.text}>{email}</Text>
		<Button
			title='SignOut'
			onPress = {()=> signOutUser()}
		/>
  </View>
 );
};

const styles = StyleSheet.create({
	containerView:
	{
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: 
	{
		fontSize: 30,
	},
});

export default FirebaseUAHomeScreen;