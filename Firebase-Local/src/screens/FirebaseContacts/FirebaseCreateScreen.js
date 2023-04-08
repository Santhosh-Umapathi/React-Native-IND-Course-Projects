import React, { useState } from "react";
import {
 View,
 StyleSheet,
 Text,
 TouchableWithoutFeedback,
 TouchableOpacity,
 Keyboard,
 KeyboardAvoidingView,
 ScrollView,
 ActivityIndicator,
    Image,
 Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { TextInput } from "react-native-gesture-handler";


const FirebaseCreateScreen = ({ navigation }) => {

    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");
    const [image, setimage] = useState("empty");
    const [imageDownloadUrl, setimageDownloadUrl] = useState("empty");
    const [isUploading, setisUploading] = useState(false);

 const uploadImageAsync = async (uri, storageRef) => {
  const parts = uri.split(".");
  const fileExtenstion = parts[parts.length - 1];

  //create blob
  const blob = await new Promise((resolve, reject) => {
   const xhr = new XMLHttpRequest();
   xhr.onload = function () {
    resolve(xhr.response);
   };
   xhr.onerror = function (e) {
    console.log(e);
    reject(new TypeError("Network request failed"));
   };
   xhr.responseType = "blob";
   xhr.open("GET", uri, true);
   xhr.send(null);
  });

  //upload part
  const ref = storageRef
   .child("ContactImages")
   .child(Math.floor(Math.random() * 100) + "." + fileExtenstion);
  const snapshot = await ref.put(blob);

  //close blob
  blob.close();
  return await snapshot.ref.getDownloadURL();
 };

    const saveContact = async () => {
     if (
      fname !== "" &&
      lname !== "" &&
      phone !== "" &&
      email !== "" &&
      address !== ""
     ) {
      setisUploading(true)
      const dbReference = firebase.database().ref();
      const storageRef = firebase.storage().ref();

      if (image !== "empty") 
      {
       const downloadUrl = await uploadImageAsync(image,storageRef)
        setimageDownloadUrl(downloadUrl)
        setisUploading(false);
      }

      //save all values to an object
      var contact = {
       fname: fname,
       lname: lname,
       phone: phone,
       email: email,
       address: address,
       imageUrl: imageDownloadUrl,
      };

      await dbReference.push(contact, (error) => {
       if (!error) { return navigation.goBack() }
      });
     }
    };

    const pickImage = async () => {
     let result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.2,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
     });
     if (!result.cancelled) {
      setimage(result.uri);
     }
    };

   

if (isUploading) {
 return (
  <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
   <ActivityIndicator size="large" color="#B83227" />
   <Text style={{ textAlign: "center" }}>Contact Uploading please wait..</Text>
  </View>
 );
}


 return (
  <KeyboardAvoidingView
   // keyboardVerticalOffset={Header.HEIGHT + 20} // adjust the value here if you need more padding
   style={{ flex: 1 }}
   behavior="padding"
  >
   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <ScrollView style={styles.container}>
     <TouchableOpacity onPress={() => pickImage()}>
      <Image
       source={
        image === "empty"
         ? require('../../../assets/splash.png')
         : { uri: image }
       }
       style={styles.imagePicker}
      />
     </TouchableOpacity>

     <View>
      <View style={styles.inputItem}>
       <Text>First Name</Text>
       <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
        onChangeText={fname => setfname(fname)}
       />
      </View>
      <View style={styles.inputItem}>
       <Text>Last Name</Text>
       <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
        onChangeText={lname => setlname(lname)}
       />
      </View>
      <View style={styles.inputItem}>
       <Text>Phone</Text>
       <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="number-pad"
        onChangeText={phone => setphone(phone)}
       />
      </View>
      <View style={styles.inputItem}>
       <Text>Email</Text>
       <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={email => setemail(email)}
       />
      </View>
      <View style={styles.inputItem}>
       <Text>Address</Text>
       <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
        onChangeText={address => setaddress(address)}
       />
      </View>
     </View>

     <Button
      style={styles.button}
      title = "Save"
      onPress={() => saveContact()}
     />
    </ScrollView>
   </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fff",
  margin: 10,
 },
 imagePicker: {
  justifyContent: "center",
  alignSelf: "center",
  width: 100,
  height: 100,
  borderRadius: 100,
  borderColor: "#c1c1c1",
  borderWidth: 2,
 },
 inputItem: {
  margin: 10,
 },
 button: {
  backgroundColor: "#B83227",
  marginTop: 40,
 },
 buttonText: {
  color: "#fff",
  fontWeight: "bold",
 },
});

export default FirebaseCreateScreen;
