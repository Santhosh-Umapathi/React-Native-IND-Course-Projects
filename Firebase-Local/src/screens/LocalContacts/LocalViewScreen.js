import React, {useState, useEffect} from 'react';
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 ScrollView,
 Linking,
 Platform,
 Alert,
 AsyncStorage,
} from "react-native";
import { Entypo } from "@expo/vector-icons";


const LocalViewScreen = ({navigation}) =>
{
 const [fname, setfname] = useState("A");
 const [lname, setlname] = useState("A");
 const [email, setemail] = useState("A");
 const [phone, setphone] = useState("A");
 const [address, setaddress] = useState("A");
 const [key, setkey] = useState("A");

 const contactKey = navigation.getParam("key");

	useEffect(() => {
   		getContact(contactKey)
 	}, []);

//Get Contact Info
const getContact = async (key) => {
  await AsyncStorage.getItem(key)
   .then(contactjsonString => {
	   var contact = JSON.parse(contactjsonString); //Converting string into JSON object
    //contact["key"] = key; //Setting key to JSON object, if state was JSON object, so can merge all details with one call to this.setState
	setfname(contact.fname)
	setlname(contact.lname)
	setemail(contact.email)
	setphone(contact.phone)
	setaddress(contact.address)
	setkey(key)  
   })
   .catch((error) => console.log(error));
};

//Call Action based on Platform OS
const callAction = phone =>
{
	let phoneNumber = phone;

	if (Platform.OS !== "android")
	{ phoneNumber = `telpromt:${phone}` } //iOS
	else { phoneNumber = `tel:${phone}` } //Android

	Linking.canOpenURL(phoneNumber) //Check if supported
	.then(supported => {
		if (!supported) { Alert.alert("Phone number is Invalid") }
		else { return Linking.openURL(phoneNumber) }//Opens Call screen
	})
	.catch(error => console.log(error))
};
	
//SMS action based on Platform OS
const smsAction = phone =>
{
	let phoneNumber = phone;
	phoneNumber = `sms:${phone}`; //iOS & Android
	Linking.canOpenURL(phoneNumber) //Check if supported
	.then(supported => {
		if (!supported)
		{ Alert.alert("Phone number is not available") }
		else { return Linking.openURL(phoneNumber) }
	})
	.catch(error => console.log(error))
};
	
//Go To Edit Screen
const editContact = key =>
{ navigation.navigate("LocalEdit", { key: key }) }
	
	//Delete Contact
const deleteContact = key =>
{
  Alert.alert("Delete Contact ?", `${fname} ${lname}`, [
   {
    text: "Cancel",
    onPress: () => console.log("cancel tapped"),
   },
   {
    text: "OK",
    onPress: async () => {
     await AsyncStorage.removeItem(key) //Delete an item from AsyncStorage
      .then(() => navigation.goBack())
      .catch(error => console.log(error))
    }
   }
  ]);
 };
	
	

 return (
  <ScrollView style={styles.container}>
   <View style={styles.contactIconContainer}>
    <Text style={styles.contactIcon}>{fname[0].toUpperCase()}</Text>
    <View style={styles.nameContainer}>
     <Text style={styles.name}>
      {fname} {lname}
     </Text>
    </View>
   </View>

   <View style={styles.infoContainer}>
    <View>
     <View>
      <Text style={styles.infoText}>Phone - {phone}</Text>
     </View>
    </View>

    <View>
     <View bordered>
      <Text style={styles.infoText}>Email - {email}</Text>
     </View>
    </View>
    <View>
     <View bordered>
      <Text style={styles.infoText}>Address - {address}</Text>
     </View>
    </View>
   </View>

   <View style={styles.actionContainer}>
    <View style={styles.actionButton} bordered>
     <TouchableOpacity
      onPress={() => smsAction(phone)}
     >
      <Entypo name="message" size={50} color="lightblue" />
      <Text style={styles.actionText}>Message</Text>
     </TouchableOpacity>
    </View>

    <View style={styles.actionButton} bordered>
     <TouchableOpacity
      onPress={() => callAction(phone)}
     >
      <Entypo name="phone" size={50} color="lightblue" />
      <Text style={styles.actionText}>Call</Text>
     </TouchableOpacity>
    </View>
   </View>

   <View style={styles.actionContainer}>
    <View style={styles.actionButton} bordered>
     <TouchableOpacity
      onPress={() => editContact(key)}
     >
      <Entypo name="edit" size={50} color="lightblue" />
      <Text style={styles.actionText}>Edit</Text>
     </TouchableOpacity>
    </View>

    <View style={styles.actionButton} bordered>
     <TouchableOpacity
      onPress={() => deleteContact(key)}
     >
      <Entypo name="trash" size={50} color="lightblue" />
      <Text style={styles.actionText}>Delete</Text>
     </TouchableOpacity>
    </View>
   </View>
  </ScrollView>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fff",
 },
 contactIconContainer: {
  height: 200,
  backgroundColor: "lightblue",
  alignItems: "center",
 },
 contactIcon: {
  fontSize: 100,
  fontWeight: "bold",
  color: "#fff",
 },
 nameContainer: {
  width: "100%",
  height: 70,
  padding: 10,
  backgroundColor: "rgba(255,255,255,0.5)",
  justifyContent: "center",
  position: "absolute",
  bottom: 0,
 },
 name: {
  fontSize: 24,
  color: "#000",
  fontWeight: "900",
 },
 infoText: {
  fontSize: 18,
  fontWeight: "300",
 },
 actionContainer: {
  flexDirection: "row",
 },
 actionButton: {
  flex: 1,
  justifyContent: "center",
  alignSelf: "center",
 },
 actionText: {
  color: "black",
  alignSelf: "center",
 },
 infoContainer: {
  flexDirection: "column",
 },
});

export default LocalViewScreen;