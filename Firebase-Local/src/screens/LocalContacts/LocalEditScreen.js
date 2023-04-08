import React, { useState, useEffect } from "react";
import {
 View,
 Text,
 TextInput,
 StyleSheet,
 Button,
 Keyboard,
 AsyncStorage,
 Alert,
 TouchableWithoutFeedback,
 ScrollView,
} from "react-native";

const LocalEditScreen = ({ navigation }) => {

const [fname, setfname] = useState(null);
const [lname, setlname] = useState(null);
const [email, setemail] = useState(null);
const [phone, setphone] = useState(null);
const [address, setaddress] = useState(null);
const [key, setkey] = useState(null);

const contactKey = navigation.getParam("key");

useEffect(() => {
 getContact(contactKey);
}, []);

//Get Contact Info
const getContact = async (key) => {
 await AsyncStorage.getItem(key)
  .then((contactjsonString) => {
   var contact = JSON.parse(contactjsonString); //Converting string into JSON object
   //contact["key"] = key; //Setting key to JSON object, if state was JSON object, so can merge all details with one call to this.setState
   setfname(contact.fname);
   setlname(contact.lname);
   setemail(contact.email);
   setphone(contact.phone);
   setaddress(contact.address);
   setkey(key);
  })
  .catch((error) => console.log(error));
};

    //Update Contact
    const saveContact = async () => {
     if (
      fname !== "" &&
      lname !== "" &&
      phone !== "" &&
      email !== "" &&
      address !== ""
     ) {//create contact JSON object
        var contact = {
         fname: fname,
         lname: lname,
         phone: phone,
         email: email,
         address: address,
        }; //Converting JSON object to string
        await AsyncStorage.mergeItem(contactKey, JSON.stringify(contact))
         .then(() => navigation.navigate('LocalHome'))
         .catch((error) => console.log(error));
       }
     else { Alert.alert("All fields are required !") }
    };



 return (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
   <ScrollView style={styles.container}>
    <View>
     <View style={styles.inputItem}>
      <Text>First Name</Text>
      <TextInput
       autoCorrect={false}
       autoCapitalize="none"
       keyboardType="default"
       onChangeText={(fname) => setfname(fname)}
       value={fname}
      />
     </View>
     <View style={styles.inputItem}>
      <Text>Last Name</Text>
      <TextInput
       autoCorrect={false}
       autoCapitalize="none"
       keyboardType="default"
       onChangeText={(lname) => setlname(lname)}
       value={lname}
      />
     </View>
     <View style={styles.inputItem}>
      <Text>Email</Text>
      <TextInput
       autoCorrect={false}
       autoCapitalize="none"
       keyboardType="default"
       onChangeText={(email) => setemail(email)}
       value={email}
      />
     </View>
     <View style={styles.inputItem}>
      <Text>Phone</Text>
      <TextInput
       autoCorrect={false}
       autoCapitalize="none"
       keyboardType="default"
       onChangeText={(phone) => setphone(phone)}
       value={phone}
      />
     </View>
     <View style={styles.inputItem}>
      <Text>Address</Text>
      <TextInput
       autoCorrect={false}
       autoCapitalize="none"
       keyboardType="default"
       onChangeText={(address) => setaddress(address)}
       value={address}
      />
     </View>
    </View>

    <Button style={styles.button} title="save" onPress={() => saveContact()} />

    <View style={styles.empty} />
   </ScrollView>
  </TouchableWithoutFeedback>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fff",
  margin: 10,
  height: 500,
 },
 inputItem: {
  margin: 10,
 },
 button: {
  backgroundColor: "lightblue",
  marginTop: 40,
  marginHorizontal: 50,
 },
 buttonText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 20,
 },
 empty: {
  height: 500,
  backgroundColor: "#FFF",
 },
});

export default LocalEditScreen;
