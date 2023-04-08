import React, { useState, useEffect } from "react";
import {
 View,
 StyleSheet,
 Text,
 TouchableWithoutFeedback,
 Keyboard,
 KeyboardAvoidingView,
 Image,
 TouchableOpacity,
 ActivityIndicator,
    ScrollView,
    Button,
 TextInput
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";


const FirebaseEditScreen = ({ navigation }) => {

const [fname, setfname] = useState("");
const [lname, setlname] = useState("");
const [email, setemail] = useState("");
const [phone, setphone] = useState("");
const [address, setaddress] = useState("");
const [image, setimage] = useState("empty");
const [imageDownloadUrl, setimageDownloadUrl] = useState("empty");
const [isUploading, setisUploading] = useState(false);
 const [isLoading, setisLoading] = useState(true);

    const key = navigation.getParam('key')

    useEffect(() => {
     getContact(key);
    }, []);

const getContact = async (key) => {
 let contactRef = firebase.database().ref().child(key);

 await contactRef.on("value", (dataSnapshot) => {
  if (dataSnapshot.val()) {
   contactValue = dataSnapshot.val();
   setfname(contactValue.fname);
   setlname(contactValue.lname);
   setphone(contactValue.phone);
   setemail(contactValue.email);
   setaddress(contactValue.address);
   setimageDownloadUrl(contactValue.imageUrl);
   setisLoading(false);
  }
 });
};
    
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
    
    const updateContact = async (key) => {
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

      if (image !== "empty") {
       const downloadUrl = await uploadImageAsync(image,storageRef);
       setimageDownloadUrl(downloadUrl);
      }
      var contact = {
       fname: fname,
       lname: lname,
       phone: phone,
       email: email,
       address: address,
       imageUrl: imageDownloadUrl,
      };
      await dbReference.child(key).set(contact, error => {
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
      <View
       style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
       <ActivityIndicator size="large" color="#B83227" />
       <Text style={{ textAlign: "center" }}>
        Contact Updateing please wait..
       </Text>
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
         ? require("../../../assets/splash.png")
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
       <Text>Phone</Text>
       <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="number-pad"
        onChangeText={(phone) => setphone(phone)}
        value={phone}
       />
      </View>
      <View style={styles.inputItem}>
       <Text>Email</Text>
       <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(email) => setemail(email)}
        value={email}
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

     <Button style={styles.button} title="Update" onPress={() => updateContact()} />
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
 inputItem: {
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
 button: {
  backgroundColor: "#B83227",
  marginTop: 40,
 },
 buttonText: {
  color: "#fff",
  fontWeight: "bold",
 },
});

export default FirebaseEditScreen;
