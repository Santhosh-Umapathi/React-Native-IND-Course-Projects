import React, {useState, useEffect} from 'react';
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 ScrollView,
 Linking,
 Alert,
 Platform,
 ActivityIndicator,
 Image,
 Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase";

const FirebaseViewScreen = ({navigation}) =>
{
 const [fname, setfname] = useState("");
 const [lname, setlname] = useState("");
 const [email, setemail] = useState("");
 const [phone, setphone] = useState("");
 const [address, setaddress] = useState("");
 const [imageUrl, setimageUrl] = useState("");
 const [isLoading, setisLoading] = useState(true);

 const key = navigation.getParam("key");

 useEffect(() => {
  getContact(key);
 }, []);

	const getContact = async (key) =>
	{
		let contactRef = firebase.database().ref().child(key);
		
		await contactRef.on("value", (dataSnapshot) => {
			if (dataSnapshot.val()) {
				contactValue = dataSnapshot.val();
				setfname(contactValue.fname);
				setlname(contactValue.lname);
				setphone(contactValue.phone);
				setemail(contactValue.email);
				setaddress(contactValue.address);
				setimageUrl(contactValue.imageUrl);
				setisLoading(false);
			}
		});
	};

 const deleteContact = (key) => {
  Alert.alert(
   "Delete Contact",
   `${fname} ${lname}`,
   [
    { text: "Cancel", onPress: () => console.log("Cancel pressed") },
    {
     text: "OK",
     onPress: async () => {
      let contactRef = firebase.database().ref().child(key);
      await contactRef.remove((error) => {
       if (!error) { navigation.goBack() }
      });
     },
    },
   ],
   { cancelable: false }
  );
 };

 const editContact = (key) => {
  navigation.navigate("FirebaseEdit", { key: key });
 };

 //Call Action based on Platform OS
 const callAction = (phone) => {
  let phoneNumber = phone;

  if (Platform.OS !== "android") {
   phoneNumber = `telpromt:${phone}`;
  } //iOS
  else {
   phoneNumber = `tel:${phone}`;
  } //Android

  Linking.canOpenURL(phoneNumber) //Check if supported
   .then((supported) => {
    if (!supported) {
     Alert.alert("Phone number is Invalid");
    } else {
     return Linking.openURL(phoneNumber);
    } //Opens Call screen
   })
   .catch((error) => console.log(error));
 };

 //SMS action based on Platform OS
 const smsAction = (phone) => {
  let phoneNumber = phone;
  phoneNumber = `sms:${phone}`; //iOS & Android
  Linking.canOpenURL(phoneNumber) //Check if supported
   .then((supported) => {
    if (!supported) {
     Alert.alert("Phone number is not available");
    } else {
     return Linking.openURL(phoneNumber);
    }
   })
   .catch((error) => console.log(error));
 };

 if (isLoading) {
  return (
   <View
    style={{
     flex: 1,
     alignContent: "center",
     justifyContent: "center",
    }}
   >
    <ActivityIndicator size="large" color="#B83227" />
    <Text style={{ textAlign: "center" }}>Contact loading please wait..</Text>
   </View>
  );
 }

 return (
  <ScrollView style={styles.container}>
   <View style={styles.contactIconContainer}>
    <Image
     style={styles.contactIcon}
     source={
      imageUrl === "empty"
       ? require("../../../assets/splash.png")
       : { uri: imageUrl }
     }
    />
    <View style={styles.nameContainer}>
     <Text style={styles.name}>
      {fname} {lname}
     </Text>
    </View>
   </View>
   <View style={styles.infoContainer}>
    <View>
     <View>
      <Text style={styles.infoText}>Phone</Text>
     </View>
     <View>
      <Text style={styles.infoText}>{phone}</Text>
     </View>
    </View>
    <View>
     <View>
      <Text style={styles.infoText}>Email</Text>
     </View>
     <View>
      <Text style={styles.infoText}>{email}</Text>
     </View>
    </View>
    <View>
     <View>
      <Text style={styles.infoText}>Address</Text>
     </View>
     <View>
      <Text style={styles.infoText}>{address}</Text>
     </View>
    </View>
   </View>
   <View style={styles.actionContainer}>
    <View style={styles.actionButton} bordered>
     <TouchableOpacity
      onPress={() => smsAction(phone)}
     >
      <Entypo name="message" size={50} color="#B83227" />
     </TouchableOpacity>
    </View>
    <View style={styles.actionButton} bordered>
     <TouchableOpacity
      onPress={() => callAction(phone)}
     >
      <Entypo name="phone" size={50} color="#B83227" />
     </TouchableOpacity>
    </View>
   </View>

   <View style={styles.actionContainer}>
    <View style={styles.actionButton} bordered>
     <TouchableOpacity
      onPress={() => editContact(key)}
     >
      <Entypo name="edit" size={30} color="#B83227" />
      <Text style={styles.actionText}>Edit</Text>
     </TouchableOpacity>
    </View>
    <View style={styles.actionButton} bordered>
     <TouchableOpacity
      onPress={() => deleteContact(key)}
     >
      <Entypo name="trash" size={30} color="#B83227" />
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
  alignItems: "center",
  justifyContent: "center",
 },
 contactIcon: {
  // to create a square box both height and width should be same
  height: Dimensions.get("window").width,
  width: Dimensions.get("window").width,
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
  alignItems: "center",
 },
 actionText: {
  color: "#B83227",
  fontWeight: "900",
 },
});

export default FirebaseViewScreen;