import React, { Component} from "react";
import {
     StyleSheet,
     Text,
     View,
     TouchableOpacity,
     FlatList,
     AsyncStorage
} from "react-native";
import { Card } from "native-base";
import { Entypo } from "@expo/vector-icons";

export default class HomeScreen extends Component
{
     constructor(props)
     {
          super(props);
          this.state =
          {
               data: []
          };
     }
  
     static navigationOptions =
     {
          title: "Contacts"
     };
  
componentWillMount()
{
     const { navigation } = this.props;
     navigation.addListener("willFocus", () =>
     {
          this.getAllContact();
     });
}
  
     //TODO: get All contacts
     getAllContact = async () =>
     {
          await AsyncStorage.getAllKeys() // Getting all items
          .then(keys => {
               return AsyncStorage.multiGet(keys) //Getting values of items
               .then(result => {
                    this.setState({
                         data: result.sort(function (a, b)
                         {
                              if (JSON.parse(a[1]).fname < JSON.parse(b[1]).fname)
                              {
                                   return -1;
                              }
                              if (JSON.parse(a[1]).fname > JSON.parse(b[1]).fname)
                              {
                                   return 1;
                              }
                              return 0;
                         })
                    });
               })
               .catch(error => {
                    console.log(error);
               });
          })
          .catch(error => {
               console.log(error);
          });
     };
  
  render() {
     return (
       <View style={styles.container}>
         <FlatList
           data={this.state.data}
           keyExtractor={item => item[0].toString()} //"key"date item passed as key
           renderItem={({ item }) => {
             contact = JSON.parse(item[1]); //Convert back to json object 
             return (
               <TouchableOpacity
                 onPress={() => {
                   this.props.navigation.navigate("View", {
                     key: item[0].toString(),
                   });
                 }}
               >
                 <Card style={styles.listItem}>
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
                 </Card>
               </TouchableOpacity>
             );
           }}
         />

         <TouchableOpacity
           style={styles.floatButton}
           onPress={() => {
             this.props.navigation.navigate("Add");
           }}
         >
           <Entypo name="plus" size={30} color="#fff" />
         </TouchableOpacity>
       </View>
     );
          }
     }
     
     const styles = StyleSheet.create({
          container: {
               flex: 1,
               backgroundColor: "#fff"
          },
          listItem: {
               flexDirection: "row",
               padding: 20
          },
          iconContainer: {
               width: 50,
               height: 50,
               alignItems: "center",
               justifyContent: "center",
               backgroundColor: "lightblue",
               borderRadius: 100
          },
          contactIcon: {
               fontSize: 28,
               color: "#fff"
          },
          infoContainer: {
               flexDirection: "column"
          },
          infoText: {
               fontSize: 16,
               fontWeight: "400",
               paddingLeft: 10,
               paddingTop: 2
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
               borderRadius: 100
          }
     });
