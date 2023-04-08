import React, {useState, useEffect} from 'react';
import {
 Text,
 StyleSheet,
 View,
 TouchableOpacity,
 Button,
 TextInput,
 ActivityIndicator,
 Image,
 FlatList,
} from "react-native";

const RandomUserScreen = ({navigation}) =>
{
 	const [isLoading, setisLoading] = useState(true);
	const [data, setdata] = useState([]);
	

	useEffect(() =>
	{
		getAllUsers();
	}, [])

 	//API Call to fetch data
	const getAllUsers = () =>
	{
		return fetch("https://randomuser.me/api/?results=50")
		.then(response => response.json()) //Converting response into JSON
		.then(responseJSON =>
		{
			setisLoading(false)
			setdata(...data, responseJSON.results);
			//setdata(data.concat(responseJSON.results)) //Adding/merging data into array
		})
		.catch(error => console.log(error))
	};

	//Loading 
	if (isLoading)
	{
		return <View style={styles.containerView}>
   			<ActivityIndicator size="large" color="lightgreen" />
  		</View>;
	}

 return (
  <View style={styles.containerView}>
   <Text style={{ fontSize: 50, alignSelf: "center", marginBottom: 10 }}>
    {" "}
    User API{" "}
   </Text>
   <FlatList
    data={data}
    keyExtractor={item => item.email}
    renderItem={({ item }) => (
     <View>
      <View>
       <View style={{ alignItems: "stretch" }}>
        <Image
         source={{ uri: item.picture.medium }}
         style={styles.profilepic}
        />
       </View>
       <View style={styles.userInfo}>
        <Text style={{ fontSize: 25 }}>
         {item.name.first} {item.name.last}
        </Text>
        <Text style={{ fontSize: 18, color: "gray" }}>
         {item.email} {item.phone}
        </Text>
       </View>
      </View>
     </View>
    )}
   />
  </View>
 );
};

const styles = StyleSheet.create({
 containerView: {
  flex: 1,
  justifyContent: "center",
  marginTop: 80,
 },
 profilepic: {
  flex: 2,
  height: 100,
  width: 100,
  marginEnd: 10,
  borderRadius: 100,
 },
 userInfo: {
  flex: 5,
  flexDirection: "column",
 },
});

export default RandomUserScreen;