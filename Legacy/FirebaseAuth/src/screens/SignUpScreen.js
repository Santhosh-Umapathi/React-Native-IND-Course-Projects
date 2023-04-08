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

export default class SignInScreen extends Component {
  static navigationOptions = {
    title: "Sign Up"
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name:""
    };
  }

  signUpUser = (name, email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((authenticate) => {
        authenticate.user.updateProfile({ displayName: name })
          .then(() => {this.props.navigation.replace('Home')})
          .catch((error) => {alert(error.message);})})
    .catch((error) => {alert(error.message)})
  }
  

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="position" enabled>
          <View style={styles.containerView}>
            <Text style={{ fontSize: 50, marginBottom: 20, marginLeft: 10 }}>
              Sign Up
            </Text>
            <Form>
              <Item floatingLabel style={styles.cardStyle}>
                <Label style={styles.labelStyle}>Name</Label>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={name => {
                    this.setState({ name });
                  }}
                  value={this.state.name}
                />
              </Item>

              <Item floatingLabel style={styles.cardStyle}>
                <Label style={styles.labelStyle}>Email</Label>
                <Input
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  onChangeText={email => {
                    this.setState({ email });
                  }}
                  value={this.state.email}
                />
              </Item>

              <Item floatingLabel style={styles.cardStyle}>
                <Label style={styles.labelStyle}>Password</Label>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  onChangeText={password => {
                    this.setState({ password });
                  }}
                  value={this.state.password}
                />
              </Item>

              <Button primary full rounded style={styles.buttonStyle} onPress={() => {
                this.signUpUser(this.state.name, this.state.email, this.state.password);
              }
              }>
                <Text style={{ fontSize: 20 }}>Sign Up</Text>
              </Button>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontSize: 15 }}> Already have an Account? </Text>
                <Button transparent onPress={() => {this.props.navigation.goBack();}
                }>
                  <Text style={{ color: "green", fontSize: 15 }}>Sign In</Text>
                </Button>
              </View>
            </Form>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
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
    marginTop: 30,
    backgroundColor: "#badc57"
  }
});
