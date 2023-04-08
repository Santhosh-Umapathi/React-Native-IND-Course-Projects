import React, {useState, useEffect} from 'react';
import {
 StyleSheet,
 TouchableOpacity,
 Text,
 View,
 FlatList,
 Image,
 ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase";

const FirebaseHomeScreen = ({navigation}) =>
{
 const [data, setdata] = useState([]);
 const [isLoading, setisLoading] = useState(true);
 const [isListEmpty, setisListEmpty] = useState(false);

 useEffect(() => {
  getAllContact();
 }, []);

 const getAllContact = () => {
  let contactRef = firebase.database().ref();
  contactRef.on("value", (dataSnapshot) => {
   if (dataSnapshot.val()) {
    let contactResult = Object.values(dataSnapshot.val());
    let contactKey = Object.keys(dataSnapshot.val());
    contactKey.forEach((value, key) => {
     contactResult[key]["key"] = value;
    });
    setdata(
     // sort array by fname and set it to data state
     contactResult.sort((a, b) => {
      var nameA = a.fname.toUpperCase(); // ignore upper and lowercase
      var nameB = b.fname.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
       return -1;
      }
      if (nameA > nameB) {
       return 1;
      } // names must be equal
      return 0;
     })
    );
    setisListEmpty(false);
   } else {
    setisListEmpty(true);
   }
   setisLoading(false);
  });
 };

 // if its loading show ActivityIndicator
 if (isLoading) {
  return (
   <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
    <ActivityIndicator size="large" color="#B83227" />
    <Text style={{ textAlign: "center" }}>Contacts loading please wait..</Text>
   </View>
  );
 }
	
 //loading is completed and no contact found
 else if (isListEmpty) {
  return (
   <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
    <Entypo style={{ alignSelf: "center" }} name="plus" size={35} />
    <Text style={{ textAlign: "center" }}>No Contacts please Add</Text>
    <TouchableOpacity
     onPress={() => navigation.navigate("FirebaseCreate")}
     style={styles.floatButton}
    >
     <Entypo name="plus" size={30} color="#fff" />
    </TouchableOpacity>
   </View>
  );
 }	
else{
 return (
  <View style={styles.container}>
   <FlatList
    data={data}
    renderItem={({ item }) => {
     return (
      <TouchableOpacity
       onPress={() => navigation.navigate("FirebaseView", {key: item.key})}
      >
       <View style={styles.listItem}>
        <View>
         <Image
          style={styles.contactIcon}
          source={
           item.imageUrl === "empty"
            ? require("../../../assets/splash.png")
            : { uri: item.imageUrl }
          }
         />
        </View>
        <View style={styles.infoContainer}>
         <Text style={styles.infoText}>
          {item.fname} {item.lname}
         </Text>
         <Text style={styles.infoText}>{item.phone}</Text>
        </View>
       </View>
      </TouchableOpacity>
     );
    }}
   />

   <TouchableOpacity
    onPress={() => navigation.navigate("FirebaseCreate")}
    style={styles.floatButton}
   >
    <Entypo name="plus" size={30} color="#fff" />
   </TouchableOpacity>
  </View>
 );}
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fff",
 },
 listItem: {
  flexDirection: "row",
  padding: 20,
 },
 contactIcon: {
  width: 60,
  height: 60,
  borderRadius: 100,
 },
 infoContainer: {
  flexDirection: "column",
 },
 infoText: {
  fontSize: 16,
  fontWeight: "400",
  paddingLeft: 10,
  paddingTop: 2,
 },
 floatButton: {
  borderWidth: 1,
  borderColor: "rgba(0,0,0,0.2)",
  alignItems: "center",
  justifyContent: "center",
  width: 60,
  position: "absolute",
  bottom: 10,
  right: 10,
  height: 60,
  backgroundColor: "#B83227",
  borderRadius: 100,
 },
});

export default FirebaseHomeScreen;