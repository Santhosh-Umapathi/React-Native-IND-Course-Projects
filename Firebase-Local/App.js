import React from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import { enableScreens } from "react-native-screens";
enableScreens();

import * as firebase from 'firebase';

// Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyALZnvasq7k0l5GpcNCdr9jpcZujcfuEfU",
    authDomain: "react-native-bootcamp-2a81d.firebaseapp.com",
    databaseURL: "https://react-native-bootcamp-2a81d.firebaseio.com",
    projectId: "react-native-bootcamp-2a81d",
    storageBucket: "react-native-bootcamp-2a81d.appspot.com",
    messagingSenderId: "642693045643",
    appId: "1:642693045643:web:b1a1b7101f8d07929ca38e",
    measurementId: "G-EZ8KFKQTRC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



export default function App()
{

return(
  <MainNavigator />
);
}