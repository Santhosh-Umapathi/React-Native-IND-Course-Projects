import React, { Component } from 'react';
import { Text, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import * as firebase from "firebase";
import { FlatList } from 'react-native-gesture-handler';
import { Card, Button, Input, Icon } from 'native-base';

export default class HomeScreen extends Component {
    
    constructor(props)
    {
        super(props)
        this.state = {
            message: '',
            messageList: []
        }
    }    
    
    sendMessage = (message) => {
        //creating new object in firebase
        var databaseRef = firebase.database().ref("message_list");
        //Sending message to firebase
        var newMessage = databaseRef.push();
        newMessage.set({
            text: message,
            time: Date.now()
        });
        this.setState({
            message: ''
        });
    }

    updateMessages = (messageList) =>
    {
        this.setState({messageList})
    }

    componentWillMount()
    {
        var self = this; // since deep inside callback

        var databaseRef = firebase.database().ref("message_list");
        databaseRef.on("value", (dataSnapshot) => {
            if (dataSnapshot.val()) {
                var messageList = Object.values(dataSnapshot.val());
                self.updateMessages(messageList.reverse()); //Calling update messages
            }
            else {
                console.log('Error while fetching messages')
            }
        });
    }
      
    
    render() {
        return (
          <KeyboardAvoidingView
            behavior="padding"
            enabled
            style={styles.container}
          >
            <View>
              <Text style={{ fontSize: 40, alignSelf: "center" }}>
                Message Board
              </Text>
            </View>

            <View style={styles.listContainer}>
              <FlatList
                data={this.state.messageList}
                inverted
                keyExtractor={item => item.time}
                renderItem={({ item }) => {
                  return (
                    <Card style={styles.listItem}>
                      <Text style={styles.messageText}>{item.text}</Text>
                      <Text style={styles.timeText}>
                        {new Date(item.time).toLocaleDateString}
                      </Text>
                    </Card>
                  );
                }}
              ></FlatList>
            </View>

            <View style={styles.inputContainer}>
              <Input
                onChangeText={text => {
                  this.setState({ message: text });
                }}
                value={this.state.message}
              />
              <Button
                primary
                rounded
                icon
                style={{ backgroundColor: "orange" }}
                onPress={() => {
                  this.sendMessage(this.state.message);
                }}
              >
                <Icon name="arrow-forward" />
              </Button>
            </View>
          </KeyboardAvoidingView>
        );
        }
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            margin: 2,
            backgroundColor: "white"
        },
        header: {
            backgroundColor: "#2B2B52",
            alignItems: "center",
            height: 40,
            justifyContent: "center"
        },
        headerText: {
            paddingHorizontal: 10,
            color: "#FFF",
            fontSize: 20
        },
        listContainer: {
            flex: 1,
            padding: 5
        },
        listItem: {
            padding: 10
        },
        messageText: {
            fontSize: 20
        },
        timeText: {
            fontSize: 10
        },
        inputContainer: {
            flexDirection: "row",
            padding: 5,
            borderWidth: 2,
            borderRadius: 15,
            borderColor: "orange",
            color: "#fff",
            marginBottom: 40
        }
    });
