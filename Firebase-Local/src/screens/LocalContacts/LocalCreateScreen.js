import React, { useState } from "react";
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

const LocalCreateScreen = ({ navigation }) => {

const [fname, setfname] = useState("")
const [lname, setlname] = useState("");
const [email, setemail] = useState("");
const [phone, setphone] = useState("");
const [address, setaddress] = useState("");

    const saveContact = async () => {
     if (
      fname !== "" &&
      lname !== "" &&
      phone !== "" &&
      email !== "" &&
      address !== ""
     ) { //create contact JSON object
      var contact = {
       fname: fname,
       lname: lname,
       phone: phone,
       email: email,
       address: address,
      };
      await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(contact)) //Converting JSON object to string
       .then(() => navigation.goBack())
       .catch(error => console.log(error));
     }
     else
     {
        Alert.alert("All fields are required !");
     }
    };



 return (
  <TouchableWithoutFeedback
   onPress={() => Keyboard.dismiss}
  >
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

export default LocalCreateScreen;
