import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import * as firebase from "firebase";
import { Button, Input, Form, Label, Item, Icon } from "native-base";

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: "Home"
        //headerShown:false
    };
    
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            uid:""
        };
    }

    componentDidMount()
    {
        firebase.auth().onAuthStateChanged((results) => {
            if (results)
            {
                this.setState({
                    email: results.email,
                    name: results.displayName,
                    uid:results.uid
                })
            }
            else
            {
                this.props.navigation.replace('SignIn')     
            }
            
        }
        )
    }

    signOutUser = () => {
        firebase
          .auth()
          .signOut()
          .then(() => {
                        console.log("Sign Out Successful"); // Sign-out successful.
                        //this.props.navigation.replace('SignIn') //No need to call this since already onAuthStateChange takes care of that
                      })
          // An error happened.
          .catch(error => {alert(error.message);});
    };
    

    
    render() {
        return (
            <View style={styles.containerView}>
                
            <Text style={{ fontSize: 40, margin: 20, alignSelf: "center" }}>
                    FireBase Auth App
            </Text>
                
            <Text style={{ fontSize: 20, marginLeft: 10, marginBottom: 10 }}>
              Hello, {this.state.name}
            </Text>
                
            <Text style={{ fontSize: 20, marginLeft: 10, marginBottom: 10 }}>
              Signed In as: {this.state.email}
            </Text>
                
            <Text style={{ fontSize: 20, marginLeft: 10, marginBottom: 10 }}>
              UiD: {this.state.uid}
            </Text>
                
            <Button
              primary
              full
              rounded
              style={styles.buttonStyle}
              onPress={() => {
                this.signOutUser();
              }}
            >
              <Text style={{ fontSize: 20 }}>Sign Out</Text>
            </Button>
          </View>
        );}
}
    
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    marginTop: 30
    //justifyContent: "center"
    //alignItems: 'center'
  },
  cardStyle: {
    //flexDirection: "row",
    //margin: 10,
    alignItems: "center"
    //marginBottom: 0
  },
  labelStyle: {
    paddingBottom: 5,
    fontSize: 20
  },
  buttonStyle: {
    marginHorizontal: 50,
    marginTop: 60,
    backgroundColor: "#badc57"
  }
});