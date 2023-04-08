import React, { Component } from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';

export default class LoadingScreen extends Component {

  static navigationOptions = {
    headerShown: false,
    title: "Load"
  }

  componentDidMount()
  {
    firebase.auth().onAuthStateChanged((authenticate) => {
      if (authenticate)
      {
        this.props.navigation.replace('Home')
      }
      else
      {
        this.props.navigation.replace('SignIn')
      }
    })
  }



    render() {
        return (
          <View style={{flex: 1, justifyContent:'center'}}>
            <ActivityIndicator size="large" color="#badc57" />
          </View>
        );
            }
    }
const styles = StyleSheet.create({});