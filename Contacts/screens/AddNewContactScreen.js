import React,{Component} from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  AsyncStorage,
  Alert,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";

import { Form, Item, Input, Label, Button } from "native-base";

export default class AddNewContactScreen extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      address: ""
    };
  }

  static navigationOptions = {
    title: "Contacts"
  };

  saveContact = async () => {
    if (
      this.state.fname !== "" &&
      this.state.lname !== "" &&
      this.state.phone !== "" &&
      this.state.email !== "" &&
      this.state.address !== ""
    ) {
      //create contact JSON object
      var contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address
      };

      await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(contact)) //Converting JSON object to string
        .then(() => { this.props.navigation.goBack(); })
        .catch(error => { console.log(error); });
    } else {
      Alert.alert("All fields are required !");
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss;
        }}
      >
        <ScrollView style={styles.container}>
          <Form>
            <Item style={styles.inputItem}>
              <Label>First Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={fname => this.setState({ fname })}
                value={this.state.fname}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Last Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={lname => this.setState({ lname })}
                value={this.state.lname}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Phone</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="number-pad"
                onChangeText={phone => this.setState({ phone })}
                value={this.state.phone}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Address</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={address => this.setState({ address })}
                value={this.state.address}
              />
            </Item>
          </Form>
          <Button
            style={styles.button}
            full
            rounded
            onPress={() => {this.saveContact();}}
          >
            <Text style={styles.buttonText}>Save</Text>
          </Button>
          <View style={styles.empty} />
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    height: 500
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "lightblue",
    marginTop: 40,
    marginHorizontal: 50
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  },
  empty: {
    height: 500,
    backgroundColor: "#FFF"
  }
});
