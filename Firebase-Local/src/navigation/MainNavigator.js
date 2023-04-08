import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';

//Local Contacts
import LocalHomeScreen from "../screens/LocalContacts/LocalHomeScreen";
import LocalEditScreen from "../screens/LocalContacts/LocalEditScreen";
import LocalCreateScreen from "../screens/LocalContacts/LocalCreateScreen";
import LocalViewScreen from "../screens/LocalContacts/LocalViewScreen";

//Firebase Contacts
import FirebaseHomeScreen from "../screens/FirebaseContacts/FirebaseHomeScreen";
import FirebaseEditScreen from "../screens/FirebaseContacts/FirebaseEditScreen";
import FirebaseCreateScreen from "../screens/FirebaseContacts/FirebaseCreateScreen";
import FirebaseViewScreen from "../screens/FirebaseContacts/FirebaseViewScreen";

//Random User API
import RandomUserScreen from '../screens/RandomUserAPI/RandomUserScreen';

//Firebase User Auth
import FirebaseUserAuthScreen from '../screens/FirebaseUserAuth/FirebaseUserAuthScreen';
import FirebaseUAHomeScreen from "../screens/FirebaseUserAuth/FirebaseUAHomeScreen";
import FirebaseUALoginScreen from "../screens/FirebaseUserAuth/FirebaseUALoginScreen";
import FirebaseUASignUpScreen from "../screens/FirebaseUserAuth/FirebaseUASignUpScreen";

//Firebase Message
import FirebaseMessage from "../screens/FirebaseMessage/FirebaseMessage";

const MainNavigator = createStackNavigator(
 {
  Home: HomeScreen,
  //Local Contacts
  LocalHome: LocalHomeScreen,
  LocalEdit: LocalEditScreen,
  LocalCreate: LocalCreateScreen,
  LocalView: LocalViewScreen,
  //Firebase Contacts
  FirebaseHome: FirebaseHomeScreen,
  FirebaseEdit: FirebaseEditScreen,
  FirebaseCreate: FirebaseCreateScreen,
  FirebaseView: FirebaseViewScreen,
  //Random User API
  RandomUser: RandomUserScreen,
  //Firebase User Auth
  FirebaseUserAuth: FirebaseUserAuthScreen,
  FirebaseUAHome: FirebaseUAHomeScreen,
  FirebaseUALogin: FirebaseUALoginScreen,
  FirebaseUASignUp: FirebaseUASignUpScreen,
  //FirebaseMessage
  FirebaseMessage: FirebaseMessage,
 },
 {
  initialRouteName: "FirebaseUserAuth",
  defaultNavigationOptions: {
   headerTintColor: "white", //Header button colors
   headerStyle: {
    backgroundColor: "lightblue", // header bg color
   },
   headerTitleStyle: {
    color: "black", // header font color
   },
  },
 }
);

export default createAppContainer(MainNavigator);