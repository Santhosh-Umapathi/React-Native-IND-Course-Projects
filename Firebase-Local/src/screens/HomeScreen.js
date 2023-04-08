import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button  } from 'react-native';

const HomeScreen = ({navigation}) =>
{


	return (
  <View style={styles.containerView}>
   <Text style={styles.text}>HomeScreen</Text>

   <Button
    title="Local Contacts"
    onPress={() => navigation.navigate("LocalHome")}
   />

   <Button
    title="Firebase Contacts"
    onPress={() => navigation.navigate("FirebaseHome")}
   />

   <Button
    title="Random User Api"
    onPress={() => navigation.navigate("RandomUser")}
   />

   <Button
    title="Firebase User Auth"
    onPress={() => navigation.navigate("FirebaseUALogin")}
   />

   <Button
    title="Firebase Message"
    onPress={() => navigation.navigate("FirebaseMessage")}
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

export default HomeScreen;