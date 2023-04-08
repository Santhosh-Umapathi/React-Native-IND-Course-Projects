import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator } from 'react-native';

import * as firebase from 'firebase'

const FirebaseUserAuthScreen = ({navigation}) =>
{

	//Loading Screen
	useEffect(() => {
		checkAuth()
	}, [])


	//Check Authentication
	const checkAuth = () =>
	{
		firebase.auth().onAuthStateChanged(authenticate =>
		{
			if (authenticate)
			{ navigation.replace("FirebaseUALogin") }
			else
			{ navigation.replace("Home") }
		});
	}
	

  return (
   <View style={{ flex: 1, justifyContent: "center" }}>
    	<ActivityIndicator size="large" color="#badc57" />
   </View>
  );

};



export default FirebaseUserAuthScreen;