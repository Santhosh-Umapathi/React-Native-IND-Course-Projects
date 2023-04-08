import React, {useState, useEffect} from 'react';
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 FlatList,
 AsyncStorage,
} from "react-native";
import { Entypo } from "@expo/vector-icons";


const LocalHomeScreen = ({navigation}) =>
{

	const [data, setdata] = useState([])

  useEffect(() => {
    getAllContact(); // When app loads

		navigation.addListener("willFocus", () =>
		{
   			getAllContact(); //when return to this screen
  	});
	}, [])


	const getAllContact = async () =>
	{
		await AsyncStorage.getAllKeys() //Getting all keys
		.then(keys => {return AsyncStorage.multiGet(keys) //Getting values of each key
			.then(result => {setdata(result.sort(function (a, b) 
				{
				if (JSON.parse(a[1]).fname < JSON.parse(b[1]).fname)
				{ return -1 }
				if (JSON.parse(a[1]).fname > JSON.parse(b[1]).fname)
				{ return 1 }
				return 0;
				}))
			})
			.catch((error) => console.log(error));
		})
		.catch((error) => console.log(error));
 	};




	return (
  <View style={styles.container}>
   <FlatList
    data={data}
    keyExtractor={item => item[0].toString()} //"key"date item passed as key
    renderItem={({ item }) => {
     contact = JSON.parse(item[1]); //Convert back to json object
     return (
      <TouchableOpacity
       onPress={() => {
        navigation.navigate("LocalView", {key: item[0].toString()})
       }}
      >
       <View style={styles.listItem}>
        <View style={styles.iconContainer}>
         <Text style={styles.contactIcon}>
          {contact.fname[0].toUpperCase()} {/* first letter of fname */}
         </Text>
        </View>
        <View style={styles.infoContainer}>
         <Text style={styles.infoText}>
          {contact.fname} {contact.lname}
         </Text>
         <Text style={styles.infoText}>{contact.phone}</Text>
        </View>
       </View>
      </TouchableOpacity>
     );
    }}
   />

   <TouchableOpacity
    	style={styles.floatButton}
    	onPress={() => {navigation.navigate("LocalCreate");}}
   >
    	<Entypo name="plus" size={30} color="#fff" />
   </TouchableOpacity>
   
  </View>
 );
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
 iconContainer: {
  width: 50,
  height: 50,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "lightblue",
  borderRadius: 100,
 },
 contactIcon: {
  fontSize: 28,
  color: "#fff",
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
  bottom: 30,
  right: 20,
  height: 60,
  backgroundColor: "lightblue",
  borderRadius: 100,
 },
});

export default LocalHomeScreen;