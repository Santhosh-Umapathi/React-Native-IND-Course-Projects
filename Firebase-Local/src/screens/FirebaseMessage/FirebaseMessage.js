import React, {useState, useEffect} from 'react';
import {
 View,
 Text,
 TextInput,
 StyleSheet,
 Button,
KeyboardAvoidingView,
 FlatList
} from "react-native";
import * as firebase from "firebase";


const FirebaseMessage = ({navigation}) =>
{

	const [message, setmessage] = useState('')
	const [messagelist, setmessagelist] = useState([])


	useEffect(() => {
		fetchMessages()
	}, [])

const sendMessage = (message) => {
	//creating new object in firebase
	var databaseRef = firebase.database().ref("message_list");
	//Sending message to firebase
	var newMessage = databaseRef.push();
	newMessage.set({
		text: message,
		time: Date.now(),
	});
	setmessage('')
};

	const fetchMessages = () =>
	{		
		var databaseRef = firebase.database().ref("message_list");
		databaseRef.on("value", (dataSnapshot) =>
		{
			if (dataSnapshot.val())
			{
				var messageList = Object.values(dataSnapshot.val());
				setmessagelist(messageList.reverse()) //Calling update messages
			}
			else
			{ console.log("Error while fetching messages") }
		});
	}





	return (
  <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
   <View>
    <Text style={{ fontSize: 40, alignSelf: "center" }}>Message Board</Text>
   </View>

   <View style={styles.listContainer}>
    <FlatList
     data={messagelist}
     inverted
     keyExtractor={item => item.time.toLocaleDateString}
     renderItem={({ item }) => {
      return (
       <View style={styles.listItem}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timeText}>
         {new Date(item.time).toLocaleDateString}
        </Text>
       </View>
      );
     }}
    ></FlatList>
   </View>

   <View style={styles.inputContainer}>
	<TextInput
	style={{paddingLeft: 5}}
     onChangeText={text => setmessage(text) }
     value={message}
    />
    <Button
     title = 'send'
     style={{ backgroundColor: "orange" }}
     onPress={() => sendMessage(message)}
    />
   </View>
  </KeyboardAvoidingView>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  margin: 2,
  backgroundColor: "white",
 },
 header: {
  backgroundColor: "#2B2B52",
  alignItems: "center",
  height: 40,
  justifyContent: "center",
 },
 headerText: {
  paddingHorizontal: 10,
  color: "#FFF",
  fontSize: 20,
 },
 listContainer: {
  flex: 1,
  padding: 5,
 },
 listItem: {
  padding: 10,
 },
 messageText: {
  fontSize: 20,
 },
 timeText: {
  fontSize: 10,
 },
 inputContainer: {
	 flexDirection: "row",
	 justifyContent: 'space-between',
  padding: 5,
  borderWidth: 2,
  borderRadius: 15,
  borderColor: "orange",
  color: "#fff",
  marginBottom: 40,
 },
});

export default FirebaseMessage;