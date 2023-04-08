import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

//TODO: import four screens
import HomeScreen from "./screens/HomeScreen";
import AddNewContact from './screens/AddNewContact';
import ViewContact from "./screens/ViewContact";
import EditContact from "./screens/EditContact";

//TODO: import firebase
import * as firebase from 'firebase';

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Add: { screen: AddNewContact },
    View: { screen: ViewContact },
    Edit: { screen: EditContact }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#B83227"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);

//TODO: Initialize Firebase
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

export default App;
