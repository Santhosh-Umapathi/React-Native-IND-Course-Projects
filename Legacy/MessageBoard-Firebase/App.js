import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import * as firebase from "firebase";


// Your web app's Firebase configuration
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


const MainNavigator = createStackNavigator(
{
  Home: HomeScreen,
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
  title: 'Home',
  headerTintColor: 'white', //Header button colors
  headerStyle: {
    backgroundColor: 'orange' // header bg color
    },
  headerTitleStyle: 
  {
    color: 'black' // header font color
  }
    }
      }
  );
export default createAppContainer(MainNavigator);